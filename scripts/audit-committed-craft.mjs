// Consistency audit of manually reviewed evidence. This does not judge beauty
// or turn generated screenshots into visual approval.
import assert from 'node:assert/strict';
import {readFile, writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {isDeepStrictEqual} from 'node:util';
import {basename} from 'node:path';
import {catalog} from '../packages/icons/src/catalog.mjs';
import {draw} from '../packages/icons/src/drawings.mjs';
import {context} from '../packages/icons/src/geometry.mjs';
import {draw as originalDraw} from '../references/committed-craft-01/source-before/drawings.mjs';
import {context as originalContext} from '../references/committed-craft-01/source-before/geometry.mjs';

const root='docs/review/committed-craft-01';
const json=async p=>JSON.parse(await readFile(p,'utf8'));
const hash=x=>createHash('sha256').update(x).digest('hex');
const variants=(name,drawFn=draw,contextFn=context)=>JSON.parse(JSON.stringify(
  Object.fromEntries([16,20,24].map(size=>[size,Object.fromEntries(
    ['sharp','soft','rounded'].map(corner=>[corner,{
      nodes:drawFn(name,contextFn(size,corner)),strokeWidth:contextFn(size,corner).stroke,
    }]),
  )])),
));
const ledger=await json(`${root}/ledger.json`);
const before=await json('references/committed-craft-01/master-before.json');
const built=await json('dist/definitions.json');
const committed=execFileSync('git',['ls-tree','-r','--name-only',ledger.baselineCommit,'packages/icons/icons/24/soft'],{encoding:'utf8'})
  .trim().split('\n').map(p=>basename(p,'.svg')).sort();
const expected=committed.filter(name=>!name.startsWith('brand-'));
assert.deepEqual(ledger.excludedBrands.slice().sort(),committed.filter(n=>n.startsWith('brand-')));
assert.deepEqual(Object.keys(before).sort(),expected);
assert.deepEqual(ledger.items.map(x=>x.name).sort(),expected);
assert.equal(new Set(ledger.items.map(x=>x.name)).size,expected.length);
assert.equal(ledger.reviewed,expected.length);
assert.equal(ledger.remaining,0);

const batches=new Map(),evidence=new Map(),referenceFiles=new Map(),items=[];
for(const item of ledger.items){
  const {name}=item;
  assert.equal(item.status,'visually-reviewed',name);
  assert.match(item.reviewer,/AI/);
  assert.deepEqual(item.sizes,[16,20,24]);
  assert.deepEqual(item.corners,['sharp','soft','rounded']);
  assert.deepEqual(item.backgrounds,['light','dark']);
  assert.match(item.lowContrast,/55%/);
  assert.ok(item.observation.length>30 && item.effects.length>20,name);
  let batch=batches.get(item.evidence);
  if(!batch){
    const prefix=`${root}/${item.evidence}`;
    batch={definitions:await json(`${prefix}/definitions.json`),sources:await json(`${prefix}/sources.json`),decisions:await json(`${prefix}/decisions.json`)};
    batches.set(item.evidence,batch);
  }
  assert.equal(batch.decisions.notes[name],item.observation,name+': individual decision');
  assert.deepEqual(batch.decisions.viewed,item.viewedEvidence);
  assert.ok(item.viewedEvidence.length>0);
  const now=variants(name),old=before[name].variants;
  assert.deepEqual(variants(name,originalDraw,originalContext),old,name+': preserved source baseline');
  assert.deepEqual(batch.definitions[name].variants,now,name+': stale viewed drawing');
  assert.deepEqual(built[name].variants,now,name+': stale build');
  const modified=!isDeepStrictEqual(now,old);
  assert.equal(item.decision,modified?'refined':'retained',name+': decision vs geometry');
  assert.equal(batch.decisions.modified.includes(name),modified);
  const refs=batch.sources.filter(r=>r.name===name);
  assert.ok(refs.length>=2,name+': source count');
  assert.ok(new Set(refs.map(r=>r.library)).size>=2,name+': source libraries');
  assert.deepEqual(item.references,refs.map(r=>({library:r.library,path:r.localPath,commit:r.commit,sha256:r.sha256,role:r.role})));
  for(const ref of refs){
    assert.match(ref.commit,/^[a-f0-9]{40}$/);
    assert.ok(ref.license && ref.url);
    if(!referenceFiles.has(ref.localPath))referenceFiles.set(ref.localPath,hash(await readFile(ref.localPath)));
    assert.equal(referenceFiles.get(ref.localPath),ref.sha256,ref.localPath);
  }
  const viewed=[];
  for(const file of item.viewedEvidence){
    const path=`${root}/${item.evidence}/${file}`;
    if(!evidence.has(path)){
      const bytes=await readFile(path);
      assert.equal(bytes.subarray(1,4).toString(),'PNG',path);
      evidence.set(path,hash(bytes));
    }
    viewed.push({path,sha256:evidence.get(path)});
  }
  items.push({name,decision:item.decision,batch:item.evidence,beforeSha256:hash(JSON.stringify(old)),currentSha256:hash(JSON.stringify(now)),references:refs.length,sourceMatchLimitations:refs.filter(r=>r.match!=='exact').map(r=>({library:r.library,sourceName:r.sourceName,match:r.match})),viewed});
}

// Ensure engineering evidence describes the current build, including additions
// outside this task. These additions are not visually approved here.
assert.deepEqual(Object.keys(built).sort(),catalog.map(x=>x.name).sort());
for(const {name} of catalog)assert.deepEqual(built[name].variants,variants(name),name+': current build');
const skipped=await json('references/committed-craft-01/skipped-new-files.json');
for(const [path,sha256] of Object.entries(skipped))assert.equal(hash(await readFile(path)),sha256,path+': skipped new file changed');
const report={
  date:new Date().toISOString(),status:'passed',reviewer:'Codex (AI)',
  limitation:'This checks scope, provenance and evidence consistency. Individual aesthetic observations were made manually; maintainer approval is not asserted.',
  baselineCommit:ledger.baselineCommit,skillVersion:ledger.skillVersion,
  committedGeneral:expected.length,refined:items.filter(x=>x.decision==='refined').length,retained:items.filter(x=>x.decision==='retained').length,
  excludedBrands:ledger.excludedBrands.length,reviewedBatches:batches.size,viewedComparisonImages:evidence.size,
  nativeVariants:expected.length*9,currentBuildNames:catalog.length,
  currentNewNamesOutsideScope:catalog.filter(x=>!committed.includes(x.name)).map(x=>x.name).sort(),
  originalSkippedSvgFilesChecked:Object.keys(skipped).length,originalSkippedSvgFilesChanged:0,
  preservedSourceBaselineReproduced:true,allViewedGeometryCurrent:true,allBuildGeometryCurrent:true,
  evidence:[...evidence].map(([path,sha256])=>({path,sha256})),items,
};
await writeFile(`${root}/completion-audit.json`,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({status:report.status,reviewed:report.committedGeneral,refined:report.refined,retained:report.retained,batches:report.reviewedBatches,viewedImages:report.viewedComparisonImages,nativeVariants:report.nativeVariants,buildNames:report.currentBuildNames,skippedNewNames:report.currentNewNamesOutsideScope.length,originalSkippedFiles:report.originalSkippedSvgFilesChecked},null,2));
