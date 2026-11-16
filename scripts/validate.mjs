import {comparisonReferences as loadComparisonReferences} from './lib/review-data.mjs';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { unzipSync, strFromU8 } from 'fflate';
import { catalog, conceptCount } from '../src/catalog.mjs';
import { preservedNotices, adaptedSources } from '../src/provenance.mjs';
import { drawings } from '../src/drawings.mjs';
const json = async file => JSON.parse(await readFile(file,'utf8'));
const sha = data => createHash('sha256').update(data).digest('hex');
const manifest = await json('dist/catalog.json');
const definitions = await json('dist/definitions.json');
const coreNames=await json('src/core-names.json');
assert.equal(coreNames.length,48);
const scope=[...await json('src/ui-scope.json'),...await json('src/organization-scope.json'),...await json('src/productivity-scope.json')];
assert.deepEqual(catalog.map(x=>x.name).sort(),[...coreNames,...scope.map(x=>x.name)].sort(),'Exact original + approved UI scope');
assert.equal(manifest.conceptCount,conceptCount);
const names=new Set(catalog.map(x=>x.name));
for(const entry of catalog)assert.ok(names.has(entry.concept),entry.name+": missing canonical concept");
const total=catalog.length*9;
assert.equal(new Set(catalog.map(x=>x.component)).size,catalog.length);
assert.deepEqual(Object.keys(drawings).sort(),catalog.map(x=>x.name).sort());
assert.equal(new Set(catalog.map(x=>x.name)).size,catalog.length);
assert.equal(manifest.inventory.length,total);
assert.equal((await readdir('icons',{recursive:true})).filter(x=>x.endsWith('.svg')).length,total);
const geometries=new Map();
for(const entry of catalog){
  const key=JSON.stringify(definitions[entry.name].variants[24].sharp.nodes.map(n=>JSON.stringify(n)).sort());
  assert.ok(!geometries.has(key),`Duplicate geometry: ${entry.name} / ${geometries.get(key)}`);geometries.set(key,entry.name);
}
const arity={M:2,L:2,H:1,V:1,C:6,S:4,Q:4,T:2,A:7,Z:0};
const validTags = new Set(['path','line','rect','circle','ellipse']);
for(const item of manifest.inventory){
  const source = await readFile(item.path,'utf8');
  assert.equal(sha(source),item.sha256,item.path);
  assert.match(source,/Permission is hereby granted/);
  assert.match(source,/stroke="currentColor"/);
  assert.match(source,new RegExp(`viewBox="0 0 ${item.opticalSize} ${item.opticalSize}"`));
  assert.doesNotMatch(source,/NaN|Infinity|undefined|<script|<image|<foreignObject|\son\w+=|\shref=/);
  const master = definitions[item.name].variants[item.opticalSize][item.corner];
  assert.ok(master.strokeWidth>0 && master.nodes.length>0);
  for(const [tag,attrs] of master.nodes){
    assert.ok(validTags.has(tag),tag);
    if(tag==='path')for(const m of attrs.d.matchAll(/([a-df-z])([^a-df-z]*)/gi)){
      const c=m[1].toUpperCase(),values=m[2].match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi)||[];
      assert.ok(c in arity,item.path+': unknown path command');
      assert.ok(arity[c]?(values.length>=arity[c]&&values.length%arity[c]===0):values.length===0,item.path+': invalid path arguments');
    }
    for(const value of Object.values(attrs))if(typeof value==='number')assert.ok(Number.isFinite(value));
  }
  if(preservedNotices[item.name])assert.ok(source.includes(preservedNotices[item.name]));
  if(adaptedSources[item.name]){assert.ok(source.includes(adaptedSources[item.name].copyright));assert.ok(source.includes('ISC License'));}
}
const references = await json('references/manifest.json');
assert.equal(references.references.length,48);
for(const ref of references.references){
  assert.match(ref.commit,/^[a-f0-9]{40}$/);
  assert.equal(sha(await readFile(ref.localPath)),ref.sha256,ref.localPath);
}
const uiRefs=await loadComparisonReferences();
assert.equal(uiRefs.references.length,catalog.length*2);
for(const entry of catalog)assert.equal(uiRefs.references.filter(r=>r.name===entry.name).length,2,entry.name);
for(const ref of uiRefs.references){assert.match(ref.commit,/^[a-f0-9]{40}$/);assert.equal(sha(await readFile(ref.localPath)),ref.sha256,ref.localPath);}
// A successful build cannot approve a drawing or silently reuse a stale review.
const ledger=await json('docs/refinement-ledger.json');
assert.equal(ledger.schemaVersion,2);
assert.deepEqual(ledger.icons.map(x=>x.name).sort(),[...names].sort(),'Every drawing needs an individual review');
const verifiedEvidence=new Set();
const reviewBaselines=new Map();
for(const record of ledger.icons){
  const path=record.change.before.path;
  if(!reviewBaselines.has(path))reviewBaselines.set(path,await json(path));
  const before=reviewBaselines.get(path);
  assert.equal(record.status,'visually-reviewed-candidate',record.name+': awaiting visual review');
  assert.equal(record.visualReview.variantsSha256,sha(JSON.stringify(definitions[record.name].variants)),record.name+': geometry changed since review');
  assert.equal(record.change.before.variantsSha256,sha(JSON.stringify(before[record.name].variants)),record.name+': incorrect before master');
  const changed=JSON.stringify(definitions[record.name].variants)!==JSON.stringify(before[record.name].variants);
  assert.equal(record.change.kind,changed?'modified':'retained',record.name+': decision does not describe actual change');
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
for(const name of await readdir('dist/downloads')){
  const zip = unzipSync(await readFile('dist/downloads/'+name));
  assert.equal(Object.keys(zip).filter(x=>x.endsWith('.svg')).length,catalog.length);
  assert.match(strFromU8(zip['licenses/hugeicons-MIT.txt']),/MIT/);
  assert.ok(zip.LICENSE && zip['THIRD_PARTY_NOTICES.md']);
  assert.ok(zip['licenses/lucide.txt']);
  for(const name of Object.keys(adaptedSources))assert.match(strFromU8(zip[name+'.svg']),/ISC License/);
}
console.log(`Validated ${conceptCount} base concepts / ${catalog.length} named drawings, ${total} SVG hashes, geometry, notices, 48 historical + ${uiRefs.references.length} current pinned references, and 9 licensed ZIPs.`);
