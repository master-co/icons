// Integrate an explicit, already inspected batch decision file. This performs
// consistency checks and records decisions; it never infers visual approval.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {isDeepStrictEqual} from 'node:util';
import {context} from '../packages/icons/src/geometry.mjs';
import {conceptOf} from '../packages/icons/src/concepts.mjs';
import {atlasEntries} from '../packages/icons/src/atlas/index.mjs';
import {reference} from './lib/atlas-reference.mjs';
const json=async p=>JSON.parse(await readFile(p,'utf8'));
const put=(p,v)=>writeFile(p,JSON.stringify(v,null,2)+'\n');
const sha=x=>createHash('sha256').update(x).digest('hex');
const input=await json(process.argv[2]);
assert.equal(input.reviewer,'Codex (AI)');
assert.equal(input.visualInspectionComplete,true);
const {batch}=await import(`../packages/icons/src/atlas/${input.batch}.mjs`);
assert.deepEqual(input.decisions.map(x=>x.name).sort(),batch.map(x=>x.name).sort());
const root=await json('docs/refinement-ledger.json'),current=await json('references/current.json');
const family=await json(input.familyRoot+'/definitions.json');
const before=input.baseline?await json(input.baseline):{};
const sourceMeta={
 'Lucide Lab':['Lucide Icons and Contributors','ISC','licenses/lucide.txt','Copyright (c) 2026 Lucide Icons and Contributors'],
 Lucide:['Lucide Icons and Contributors','ISC','licenses/lucide.txt','Copyright (c) 2026 Lucide Icons and Contributors'],
 Tabler:['Paweł Kuna','MIT','licenses/tabler.txt','Copyright (c) 2020-2026 Paweł Kuna'],
 Phosphor:['Phosphor Icons','MIT','licenses/phosphor.txt','Copyright (c) 2023 Phosphor Icons'],
 'Hugeicons Free':['Hugeicons','MIT','licenses/hugeicons-MIT.txt','Copyright (c) 2025 Hugeicons'],
 Iconoir:['Luca Burgio','MIT','licenses/iconoir.txt','Copyright (c) 2021 Luca Burgio'],
};
// These individual authors come from the pinned MDI meta.json, preserved with
// the music and tool reviews. Its notice has no per-icon copyright year; retain
// the exact author attribution rather than inventing a copyright statement.
const mdiAuthors={violin:'Google',saxophone:'Google',trumpet:'Michael Irigoyen',saw:'Michael Irigoyen'};
const metaFor=(library,name)=>{
 if(library!=='Material Design Icons')return sourceMeta[library];
 assert.ok(mdiAuthors[name],'Record the pinned individual MDI author first: '+name);
 const file=name==='saw'?'licenses/mdi-tool-adaptations.txt':'licenses/mdi-music-adaptations.txt';
 return [mdiAuthors[name],'Apache-2.0',file,`${name==='saw'?'hand-saw':name}: ${mdiAuthors[name]}`];
};
const names=new Set([...root.icons.map(x=>x.name),...batch.map(x=>x.name)]);
const provenance=await json('packages/icons/src/atlas-provenance.json'),records=[],references=[];
const evidence=async path=>({path,sha256:sha(await readFile(path))});
for(const decision of input.decisions){
 assert.ok(!root.icons.some(r=>r.name===decision.name),'Refinements must preserve an existing review separately: '+decision.name);
 const e=batch.find(e=>e.name===decision.name);assert.ok(atlasEntries.some(x=>x.name===e.name),'Add the reviewed module to atlas/index.mjs');
 for(const key of ['sourceObservation','reason'])assert.ok(decision[key]?.length>20,e.name+': missing individual '+key);
 assert.ok(decision.confusableWith.length&&decision.confusableWith.every(n=>names.has(n)),e.name+': unknown confusion concept');
 const variants=Object.fromEntries([16,20,24].map(s=>[s,Object.fromEntries(['sharp','soft','rounded'].map(c=>{const g=context(s,c);return[c,{nodes:e.draw(g),strokeWidth:g.stroke}]}))]));
 assert.deepEqual(variants,family[e.name].variants,e.name+': stale family geometry');
 const group=await json(decision.groupRoot+'/definitions.json');assert.deepEqual(variants,group[e.name].variants,e.name+': stale individual evidence');
 // State drawings can inherit an adapted parent in addition to the two state comparisons.
 const refs=await Promise.all([reference(e.name,e.referenceA,'lucide'),reference(e.name,e.referenceB,'tabler'),...(decision.additionalReferences||[]).map(spec=>reference(e.name,spec,'lucide'))]).then(a=>a.map(r=>r.record));references.push(...refs);
 const combinations=['light','dark'].flatMap(theme=>[1,2].map(dpr=>({theme,dpr,evidence:`${input.familyRoot}/${input.batch}-${theme}-${dpr}x.png`})));
 assert.deepEqual(input.inspectedCombinations.map(x=>`${x.theme}/${x.dpr}`).sort(),combinations.map(x=>`${x.theme}/${x.dpr}`).sort(),'Record only combinations actually viewed');
 const paths=[decision.groupRoot+'/review.html',decision.groupRoot+'/definitions.json',decision.groupRoot+'/light-1x.png',input.familyRoot+'/definitions.json',input.familyRoot+'/'+input.batch+'.html',...combinations.map(x=>x.evidence)];
 const meta=decision.adaptedFrom?metaFor(decision.adaptedFrom,e.name):null;
 const origin=decision.adaptedFrom?{kind:'adapted-redraw',library:decision.adaptedFrom,license:meta[1],licenseFile:meta[2]}:{kind:'independent-construction'};
 const r={name:e.name,purpose:e.label,recognitionCues:e.cues,confusableWith:decision.confusableWith,sourceObservation:decision.sourceObservation,references:refs,status:'visually-reviewed-candidate',effects:decision.effects||input.effects,change:{kind:before[e.name]?(isDeepStrictEqual(variants,before[e.name].variants)?'retained':'modified'):'new',before:before[e.name]?{path:input.baseline,variantsSha256:sha(JSON.stringify(before[e.name].variants))}:null,reason:decision.reason},visualReview:{reviewer:input.reviewer,sizes:[16,20,24],corners:['sharp','soft','rounded'],themes:['light','dark'],dpr:[1,2],variantsSha256:sha(JSON.stringify(variants)),evidence:await Promise.all(paths.map(evidence)),inspectedCombinations:combinations,remainingCombinations:[]},designOrigin:origin,remaining:decision.remaining||[]};
 for(const effect of ['dashes','opacity','gradients'])assert.ok(typeof r.effects?.[effect]?.used==='boolean'&&r.effects[effect].reason.length>8);
 records.push(r);
 if(decision.adaptedFrom){const ref=refs.find(r=>r.library===decision.adaptedFrom);assert.ok(ref);const [author,license,licenseFile,copyright]=meta;assert.ok((await readFile(licenseFile,'utf8')).includes(copyright));provenance[e.name]={kind:'adapted-redraw',author,library:ref.library,license,licenseFile,copyright,commit:ref.commit,reference:ref.url,modifications:decision.reason};}
}
const manifest=`references/${input.cycle}/manifest.json`;
assert.ok(!current.manifests.includes(manifest),'Batch already integrated');
await mkdir(`references/${input.cycle}`,{recursive:true});
await put(`docs/review/${input.cycle}/ledger.json`,{schemaVersion:2,reviewer:input.reviewer,userApproval:'pending',icons:records});
await put(manifest,{references});
await put('packages/icons/src/atlas-provenance.json',provenance);
await put('packages/icons/src/atlas-scope.json',atlasEntries.map(({name,label,category,categoryLabel})=>({name,label,category,categoryLabel})));
const previousConcepts=new Set(root.icons.map(r=>conceptOf[r.name]||r.name));
root.baseConcepts+=new Set(records.map(r=>conceptOf[r.name]||r.name).filter(n=>!previousConcepts.has(n))).size;
root.icons.push(...records);root.namedDrawings=root.icons.length;root.reviewedNames=root.icons.map(r=>r.name);root.scope='Craft 05 retained review plus individually reviewed Atlas additions';root.reviewCycle+=' + '+input.cycle;root.additions.names.push(...batch.map(e=>e.name));await put('docs/refinement-ledger.json',root);
current.manifests.push(manifest);if(input.baseline&&!current.additionalBefore.includes(input.baseline))current.additionalBefore.push(input.baseline);await put('references/current.json',current);
let notices=await readFile('THIRD_PARTY_NOTICES.md','utf8');notices+=`\n\n## Atlas ${input.batch}\n\nIndividual comparisons and changes: \`docs/review/${input.cycle}/ledger.json\`. Pinned source originals and checksums: \`${manifest}\`.\n\n`;
for(const library of [...new Set(records.map(r=>r.designOrigin.library).filter(Boolean))]){const group=records.filter(r=>r.designOrigin.library===library);notices+=`- Adapted ${library} constructions: ${group.map(r=>'`'+r.name+'`').join(', ')}. ${group[0].designOrigin.license}; ${group[0].designOrigin.licenseFile}.\n`;}
const independent=records.filter(r=>r.designOrigin.kind==='independent-construction');if(independent.length)notices+=`- Independent construction: ${independent.map(r=>'`'+r.name+'`').join(', ')}.\n`;
for(const ref of references.filter(r=>r.library==='OpenMoji'))notices+=`\nComparison only: unmodified OpenMoji ${ref.sourceName} by OpenMoji contributors, CC BY-SA 4.0; ${ref.url}. Full terms: licenses/openmoji-CC-BY-SA-4.0.txt. This original is not Master product geometry.\n`;
await writeFile('THIRD_PARTY_NOTICES.md',notices);
console.log(`Integrated ${records.length} explicit decisions; Atlas total ${atlasEntries.length}.`);
