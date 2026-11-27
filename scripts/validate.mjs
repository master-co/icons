import {archiveHeader,loadArtworkNotices} from '../packages/icons/scripts/artwork-notices.mjs';
import {comparisonReferences as loadComparisonReferences} from './lib/review-data.mjs';
import {nativeVariants} from './lib/native-variants.mjs';
import assert from 'node:assert/strict';
import {isDeepStrictEqual} from 'node:util';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { unzipSync, strFromU8 } from 'fflate';
import { catalog, conceptCount } from '../packages/icons/src/catalog.mjs';
import { preservedNotices, adaptedSources } from '../packages/icons/src/provenance.mjs';
import { drawings } from '../packages/icons/src/drawings.mjs';
import {strokeWidthsFor} from './lib/stroke-width.mjs';
import {context,reviewedStroke,sizes,corners} from '../packages/icons/src/geometry.mjs';
import {brandCatalog} from '../packages/icons/src/brands.mjs';
import {brands as brandSources} from '../packages/icons/src/brands.mjs';
const json = async file => JSON.parse(await readFile(file,'utf8'));
const sha = data => createHash('sha256').update(data).digest('hex');
const manifest = await json('dist/catalog.json');
const definitions = await json('dist/definitions.json');
const coreNames=await json('packages/icons/src/core-names.json');
assert.equal(coreNames.length,48);
const expansionScope=await json('packages/icons/src/expansion-scope.json');
const expansionBaseline=await json('references/craft-03/master-before.json');
const atlasScope=await json('packages/icons/src/atlas-scope.json');
const productScope=await json('packages/icons/src/product-scope.json');
const studioScope=await json('packages/icons/src/studio-scope.json');
const writerScope=await json('packages/icons/src/writer-scope.json');
const workbenchScope=await json('packages/icons/src/workbench-scope.json');
const operationsScope=await json('packages/icons/src/operations-scope.json');
const navigationScope=await json('packages/icons/src/navigation-scope.json');
const scope=[...await json('packages/icons/src/ui-scope.json'),...await json('packages/icons/src/organization-scope.json'),...await json('packages/icons/src/productivity-scope.json'),...expansionScope,...atlasScope,...productScope,...studioScope,...writerScope,...workbenchScope,...operationsScope,...navigationScope,...brandCatalog];
assert.deepEqual(catalog.map(x=>x.name).sort(),[...coreNames,...scope.map(x=>x.name)].sort(),'Exact original + approved UI scope');
assert.equal(manifest.conceptCount,conceptCount);
const names=new Set(catalog.map(x=>x.name));
for(const entry of catalog)assert.ok(names.has(entry.concept),entry.name+": missing canonical concept");
const total=catalog.length*9;
assert.equal(new Set(catalog.map(x=>x.component)).size,catalog.length);
assert.deepEqual(Object.keys(drawings).sort(),catalog.map(x=>x.name).sort());
assert.equal(new Set(catalog.map(x=>x.name)).size,catalog.length);
assert.equal(manifest.inventory.length,total);
assert.equal((await readdir('packages/icons/icons',{recursive:true})).filter(x=>x.endsWith('.svg')).length,total);
const {standaloneHeaders,credits,licenseFiles}=await loadArtworkNotices();
const packageReadme=await readFile('packages/icons/README.md','utf8');
assert.ok(packageReadme.includes(credits),'missing artwork credits in package README');
const geometries=new Map();
for(const entry of catalog){
  const key=JSON.stringify(definitions[entry.name].variants[24].sharp.nodes.map(n=>JSON.stringify(n)).sort());
  if(entry.aliasOf){
    const canonical=catalog.find(x=>x.name===entry.aliasOf);
    assert.ok(canonical && canonical.category==='brands' && entry.category==='brands');
    assert.equal(entry.concept,canonical.concept);
    assert.deepEqual(definitions[entry.name].variants,definitions[entry.aliasOf].variants,entry.name+': alias geometry must match');
    assert.equal(geometries.get(key),entry.aliasOf,entry.name+': alias must follow its canonical mark');
  }else{assert.ok(!geometries.has(key),`Duplicate geometry: ${entry.name} / ${geometries.get(key)}`);geometries.set(key,entry.name);}
}
const arity={M:2,L:2,H:1,V:1,C:6,S:4,Q:4,T:2,A:7,Z:0};
const validTags = new Set(['path','line','rect','circle','ellipse']);
for(const item of manifest.inventory){
  const source = await readFile('packages/icons/'+item.path,'utf8');
  assert.equal(sha(source),item.sha256,item.path);
  assert.doesNotMatch(source,/Copyright \(c\) 2026 Master and contributors/);
  assert.match(source,/stroke="currentColor"/);
  assert.match(source,new RegExp(`viewBox="0 0 ${item.opticalSize} ${item.opticalSize}"`));
  assert.doesNotMatch(source,/NaN|Infinity|undefined|<script|<image|<foreignObject|\son\w+=|\shref=/);
  const master = definitions[item.name].variants[item.opticalSize][item.corner];
  assert.ok(master.strokeWidth>0 && master.nodes.length>0);
  const brand=brandSources.find(b=>b.name===item.name);
  if(brand?.styleOf)assert.deepEqual(master.nodes,drawings[item.name]({...context(item.opticalSize,item.corner),stroke:reviewedStroke[item.opticalSize]}),item.path+': stale calibrated brand outline');
  for(const [tag,attrs] of master.nodes){
    assert.ok(validTags.has(tag),tag);
    if(tag==='path'&&item.name.startsWith('brand-')){
      // SVG allows compact arc flags (e.g. 00-4); the outline parser below
      // and PathKit do not. Check exact source identity plus browser evidence.
      if(!brand.styleOf)assert.ok(brand.paths.includes(attrs.d),item.path+': altered original brand contour');
    }
    if(tag==='path'&&!item.name.startsWith('brand-'))for(const m of attrs.d.matchAll(/([a-df-z])([^a-df-z]*)/gi)){
      const c=m[1].toUpperCase(),values=m[2].match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi)||[];
      assert.ok(c in arity,item.path+': unknown path command');
      assert.ok(arity[c]?(values.length>=arity[c]&&values.length%arity[c]===0):values.length===0,item.path+': invalid path arguments');
    }
    for(const value of Object.values(attrs))if(typeof value==='number')assert.ok(Number.isFinite(value));
  }
  if(preservedNotices[item.name])assert.ok(source.includes(preservedNotices[item.name]));
  if(adaptedSources[item.name])assert.ok(source.includes(adaptedSources[item.name].copyright),item.path);
  assert.equal(source.slice(0,source.indexOf('<svg')),standaloneHeaders.get(item.name),item.path+': standalone header');
}
const references = await json('references/manifest.json');
assert.equal(references.references.length,48);
for(const ref of references.references){
  assert.match(ref.commit,/^[a-f0-9]{40}$/);
  assert.equal(sha(await readFile(ref.localPath)),ref.sha256,ref.localPath);
}
const uiRefs=await loadComparisonReferences();
const uiCatalog=catalog.filter(x=>x.category!=='brands');
assert.ok(uiRefs.references.length>=uiCatalog.length*2);
for(const entry of uiCatalog){
  const refs=uiRefs.references.filter(r=>r.name===entry.name);
  assert.ok(refs.length>=2,entry.name+': requires at least two comparisons');
  assert.ok(new Set(refs.map(r=>r.library)).size>=2,entry.name+': requires distinct source libraries');
  assert.equal(new Set(refs.map(r=>r.url)).size,refs.length,entry.name+': duplicate source');
}
// Brands use the actual identity source, not unrelated outline-library proxies.
const brandReview=await json('docs/review/brands-01/evidence.json');
const brandDecisions=await json('docs/review/brands-01/decisions.json');
assert.deepEqual(brandReview.icons.map(x=>x.name).sort(),brandCatalog.map(x=>x.name).sort());
assert.deepEqual(brandDecisions.icons.map(x=>x.name).sort(),brandCatalog.map(x=>x.name).sort());
for(const entry of brandCatalog){
  const decision=brandDecisions.icons.find(x=>x.name===entry.name);
  assert.equal(decision.status,'visually-reviewed-candidate');
  assert.equal(decision.variantsSha256,sha(JSON.stringify(nativeVariants(definitions[entry.name].variants))),entry.name+': stale brand decision');
  assert.equal(sha(await readFile(entry.source.localPath)),entry.source.sha256,entry.name+': source changed');
  if(entry.source.originalPath)assert.equal(sha(await readFile(entry.source.originalPath)),entry.source.originalSha256,entry.name+': original raster changed');
  assert.equal(brandReview.icons.find(x=>x.name===entry.name).variantsSha256,sha(JSON.stringify(nativeVariants(definitions[entry.name].variants))),entry.name+': stale brand review');
}
for(const evidence of brandReview.evidence)assert.equal(sha(await readFile(evidence.path)),evidence.sha256,evidence.path);
for(const ref of uiRefs.references){assert.match(ref.commit,/^[a-f0-9]{40}$/);assert.equal(sha(await readFile(ref.localPath)),ref.sha256,ref.localPath);}
// A successful build cannot approve a drawing or silently reuse a stale review.
const ledger=await json('docs/refinement-ledger.json');
assert.equal(ledger.schemaVersion,2);
assert.deepEqual(ledger.icons.map(x=>x.name).sort(),uiCatalog.map(x=>x.name).sort(),'Every UI drawing needs an individual review; brands have their own source ledger');
const verifiedEvidence=new Set();
const reviewBaselines=new Map();
for(const record of ledger.icons){
  assert.equal(record.status,'visually-reviewed-candidate',record.name+': awaiting visual review');
  assert.equal(record.visualReview.variantsSha256,sha(JSON.stringify(nativeVariants(definitions[record.name].variants))),record.name+': geometry changed since review');
  if(record.change.kind==='new'){
    assert.equal(record.change.before,null,record.name+': new drawings must not fabricate a previous master');
    assert.ok([...expansionScope,...atlasScope,...productScope,...studioScope,...writerScope,...workbenchScope,...operationsScope,...navigationScope].some(r=>r.name===record.name),record.name+': not in approved new scope');
    assert.ok(!(record.name in expansionBaseline),record.name+': existing drawing misclassified as new');
  }else{
    const path=record.change.before.path;
    if(!reviewBaselines.has(path))reviewBaselines.set(path,await json(path));
    const before=reviewBaselines.get(path);
    assert.equal(record.change.before.variantsSha256,sha(JSON.stringify(before[record.name].variants)),record.name+': incorrect before master');
    const changed=!isDeepStrictEqual(nativeVariants(definitions[record.name].variants),before[record.name].variants);
    assert.equal(record.change.kind,changed?'modified':'retained',record.name+': decision does not describe actual change');
  }
  assert.ok(record.change.reason.length>20,record.name+': missing individual decision');
  for(const key of ['purpose','recognitionCues','sourceObservation'])assert.ok(record[key]?.trim().length>0,record.name+': '+key);
  assert.ok(record.confusableWith.length>0 && record.confusableWith.every(n=>names.has(n)));
  assert.deepEqual(record.references,uiRefs.references.filter(r=>r.name===record.name),record.name+': stale source comparison');
  for(const effect of ['dashes','opacity','gradients'])assert.ok(typeof record.effects[effect].used==='boolean' && record.effects[effect].reason.length>8);
  assert.ok(record.visualReview.evidence.length>=4);
  for(const evidence of record.visualReview.evidence){
    if(verifiedEvidence.has(evidence.path+'#'+evidence.sha256))continue;
    assert.equal(sha(await readFile(evidence.path)),evidence.sha256,record.name+': changed review evidence');
    verifiedEvidence.add(evidence.path+'#'+evidence.sha256);
  }
}
const archiveHeaders = new Map(catalog.map(({name}) => [name, archiveHeader(name)]));
const archiveDocs = {
  'README.md': packageReadme,
  LICENSE: await readFile('LICENSE','utf8'),
  'THIRD_PARTY_NOTICES.md': await readFile('THIRD_PARTY_NOTICES.md','utf8'),
  ...licenseFiles,
};
let archiveCount = 0;
async function checkArchive(path, prefixes = ['']) {
  const zip = unzipSync(await readFile(path));
  for (const [name, text] of Object.entries(archiveDocs)) {
    assert.ok(zip[name], path + ': missing ' + name);
    assert.equal(strFromU8(zip[name]), text, path + ': ' + name);
  }
  assert.equal(Object.keys(zip).filter(name => name.endsWith('.svg')).length, prefixes.length * catalog.length, path);
  for (const prefix of prefixes) for (const [name, header] of archiveHeaders) {
    const file = prefix + name + '.svg';
    assert.ok(zip[file], path + ': missing ' + file);
    const svg = strFromU8(zip[file]);
    assert.equal(svg.indexOf('<svg'), header.length, path + ': unexpected header in ' + file);
    assert.ok(svg.startsWith(header), path + ': incorrect header in ' + file);
  }
  archiveCount++;
}
for (const size of sizes) {
  const widths = strokeWidthsFor(size);
  for (const corner of corners) {
    const path = 'dist/downloads/master-icons-' + size + '-' + corner;
    await checkArchive(path + '.zip');
    for (const width of widths) await checkArchive(path + '-stroke-' + width + '.zip');
  }
  const prefixes = corners.flatMap(corner => widths.map(width => corner + '/stroke-' + width + '/'));
  await checkArchive('work/stroke-assets/release/master-icons-' + size + '-strokes.zip', prefixes);
}
console.log(`Validated ${conceptCount} base concepts / ${catalog.length} named drawings, ${total} SVG hashes, geometry, notices, 48 historical + ${uiRefs.references.length} current pinned references, and ${archiveCount} licensed ZIPs.`);
