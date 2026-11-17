// Record an explicit, manually written review after the named evidence was
// inspected. This validates consistency; it never produces aesthetic decisions.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {isDeepStrictEqual} from 'node:util';
import {draw} from '../packages/icons/src/drawings.mjs';
import {context} from '../packages/icons/src/geometry.mjs';
import {catalog} from '../packages/icons/src/catalog.mjs';
const json=async p=>JSON.parse(await readFile(p,'utf8'));
const put=(p,v)=>writeFile(p,JSON.stringify(v,null,2)+'\n');
const sha=x=>createHash('sha256').update(x).digest('hex');
const root='docs/review/atlas-recompare-01',input=await json(process.argv[2]);
assert.equal(input.reviewer,'Codex (AI)');
assert(input.decisions.length&&input.decisions.length<=12);
assert.equal(new Set(input.decisions.map(d=>d.name)).size,input.decisions.length);
assert.deepEqual(input.viewedSuffixes.map(s=>s.replace(/^native-/,'')).sort(),['dark-1x','dark-2x','light-1x','light-2x']);
const names=new Set(catalog.map(x=>x.name));
for(const d of input.decisions)assert(d.confusableWith?.length>0&&d.confusableWith.every(n=>names.has(n)),d.name+': unknown confusable concept');
const batch=`${root}/${input.batch}`,ledger=await json(root+'/ledger.json');
const global=await json('docs/refinement-ledger.json'),defs=await json(batch+'/definitions.json'),refs=await json(batch+'/sources.json');
assert.equal(input.baseline,ledger.baseline);
const before=await json(input.baseline);
for(const d of input.decisions){
 const item=ledger.items.find(x=>x.name===d.name);assert(item,'Outside fixed scope: '+d.name);
 assert.equal(item.status,'pending-comparison','Preserve an existing decision before superseding it: '+d.name);
 for(const key of ['purpose','recognitionCues','defect','sourceObservation','reason','postComparison'])assert(d[key]?.length>12,key);
 for(const key of ['dashes','opacity','gradients'])assert(typeof d.effects?.[key]?.used==='boolean'&&d.effects[key].reason.length>8,key);
 const variants=JSON.parse(JSON.stringify(Object.fromEntries([16,20,24].map(s=>[s,Object.fromEntries(['sharp','soft','rounded'].map(c=>[c,{nodes:draw(d.name,context(s,c)),strokeWidth:context(s,c).stroke}]))]))));
 assert.deepEqual(variants,defs[d.name].variants,'Stale viewed drawing: '+d.name);
 const changed=!isDeepStrictEqual(variants,before[d.name].variants);
 assert.equal(d.decision,changed?'refined':'retained');
 const evidence=await Promise.all(input.viewedSuffixes.map(async suffix=>{
  const path=`${batch}/${d.name}-${suffix}.png`,bytes=await readFile(path);
  assert.equal(bytes.subarray(1,4).toString(),'PNG');return {path,sha256:sha(bytes)};
 }));
 const old=global.icons.find(x=>x.name===d.name);assert(old);
 assert.deepEqual(old.references,refs.filter(x=>x.name===d.name),'Changed references require an explicit provenance update');
 const record={...old,purpose:d.purpose,recognitionCues:d.recognitionCues,confusableWith:d.confusableWith,sourceObservation:d.sourceObservation,effects:d.effects,userApproval:'pending',change:{kind:changed?'modified':'retained',before:{path:input.baseline,variantsSha256:sha(JSON.stringify(before[d.name].variants))},reason:d.reason},visualReview:{reviewer:input.reviewer,date:input.date,skillVersion:ledger.skillVersion,sizes:[16,20,24],corners:['sharp','soft','rounded'],themes:['light','dark'],dpr:[1,2],variantsSha256:sha(JSON.stringify(variants)),evidence,inspectedCombinations:input.viewedSuffixes,remainingCombinations:[],postDrawingSourceComparison:d.postComparison},remaining:d.remaining};
 global.icons[global.icons.findIndex(x=>x.name===d.name)]=record;
 Object.assign(item,{status:'visually-reviewed',decision:d.decision,defect:d.defect,purpose:d.purpose,confusableWith:d.confusableWith,sourceObservation:d.sourceObservation,reason:d.reason,postComparison:d.postComparison,effects:d.effects,references:record.references,batch:input.batch,beforeHash:record.change.before.variantsSha256,afterHash:record.visualReview.variantsSha256,evidence,reviewer:input.reviewer,userApproval:'pending',remaining:d.remaining});
}
ledger.reviewed=ledger.items.filter(x=>x.status==='visually-reviewed').length;ledger.remaining=ledger.items.length-ledger.reviewed;
await put(root+'/ledger.json',ledger);await put('docs/refinement-ledger.json',global);
console.log(JSON.stringify({reviewed:ledger.reviewed,remaining:ledger.remaining}));
