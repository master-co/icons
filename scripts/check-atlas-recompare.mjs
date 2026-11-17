// Verify the scope and freshness of explicit manual decisions. This cannot
// establish aesthetic quality or approve pending icons.
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {isDeepStrictEqual} from 'node:util';
import {draw} from '../packages/icons/src/drawings.mjs';
import {context} from '../packages/icons/src/geometry.mjs';
import {catalog} from '../packages/icons/src/catalog.mjs';
const json=async p=>JSON.parse(await readFile(p,'utf8'));
const sha=x=>createHash('sha256').update(x).digest('hex');
const root='docs/review/atlas-recompare-01';
const ledger=await json(`${root}/ledger.json`),scope=await json('packages/icons/src/atlas-scope.json');
const before=await json(ledger.baseline),outside=await json('references/atlas-recompare-01/outside-scope-before.json');
const built=await json('dist/definitions.json');
const variants=name=>JSON.parse(JSON.stringify(Object.fromEntries([16,20,24].map(s=>[s,Object.fromEntries(['sharp','soft','rounded'].map(c=>[c,{nodes:draw(name,context(s,c)),strokeWidth:context(s,c).stroke}]))]))));
assert.deepEqual(ledger.scope.slice().sort(),scope.map(x=>x.name).sort());
assert.deepEqual(Object.keys(before).sort(),ledger.scope.slice().sort());
assert.deepEqual(ledger.items.map(x=>x.name).sort(),ledger.scope.slice().sort());
assert.deepEqual([...Object.keys(before),...Object.keys(outside)].sort(),catalog.map(x=>x.name).sort());
const modified=[],retained=[],pending=[],refFiles=new Map(),images=new Map();
for(const item of ledger.items){
 const current=variants(item.name),changed=!isDeepStrictEqual(current,before[item.name].variants);
 assert.deepEqual(built[item.name].variants,current,`${item.name}: stale build`);
 if(item.status==='pending-comparison'){
   assert.equal(changed,false,`${item.name}: changed before its explicit review`);pending.push(item.name);continue;
 }
 assert.equal(item.status,'visually-reviewed');
 assert.equal(item.decision,changed?'refined':'retained');
 assert.equal(item.afterHash,sha(JSON.stringify(current)));
 assert.equal(item.beforeHash,sha(JSON.stringify(before[item.name].variants)));
 assert.ok(item.sourceObservation.length>30&&item.postComparison.length>30);
 const path=`${root}/${item.batch}`;
 const defs=await json(path+'/definitions.json'),decisions=await json(path+'/decisions.json');
 const decision=decisions.decisions.find(x=>x.name===item.name);assert(decision);
 assert.equal(decision.postComparison,item.postComparison);
 assert.deepEqual(defs[item.name].variants,current);
 assert.ok(new Set(item.references.map(r=>r.library)).size>=2);
 for(const ref of item.references){
  assert.match(ref.commit,/^[a-f0-9]{40}$/);assert(ref.license&&ref.url);
  if(!refFiles.has(ref.localPath))refFiles.set(ref.localPath,sha(await readFile(ref.localPath)));
  assert.equal(refFiles.get(ref.localPath),ref.sha256);
 }
 assert.equal(item.evidence.length,4);
 for(const evidence of item.evidence){
  const bytes=await readFile(evidence.path);assert.equal(bytes.subarray(1,4).toString(),'PNG');
  assert.equal(sha(bytes),evidence.sha256);images.set(evidence.path,evidence.sha256);
 }
 (changed?modified:retained).push(item.name);
}
for(const [name,def] of Object.entries(outside))assert.deepEqual(variants(name),def.variants,`${name}: outside-scope geometry changed`);
assert.equal(ledger.reviewed,modified.length+retained.length);assert.equal(ledger.remaining,pending.length);
const report={date:new Date().toISOString(),engineeringConsistency:'passed',visualReviewStatus:pending.length?'in-progress':'all-individual-decisions-recorded',scope:scope.length,reviewed:ledger.reviewed,remaining:pending.length,modified,retained,pending,outsideScopeUnchanged:Object.keys(outside).length,verifiedSourceFiles:refFiles.size,verifiedViewedImages:images.size,limitation:'Checks scope, hashes and explicit decision consistency; does not infer beauty or user approval.'};
await writeFile(`${root}/consistency.json`,JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({...report,pending:report.pending.length},null,2));
