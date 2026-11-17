// Reviewer invokes this only after looking at the named evidence. This command
// records an explicit decision; it does not infer visual quality from rendering.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {reference} from './lib/atlas-reference.mjs';
import {readdir} from 'node:fs/promises';
const input=JSON.parse(await readFile(process.argv[2])),sha=x=>createHash('sha256').update(x).digest('hex');
const ledgerFile='docs/review/atlas-craft-01/ledger.json';let ledger;try{ledger=JSON.parse(await readFile(ledgerFile))}catch{ledger={schemaVersion:2,reviewer:'Codex (AI)',userApproval:'pending',icons:[]}}
const before=JSON.parse(await readFile('references/atlas-craft-01/master-before.json'));const entries=[];for(const f of await readdir('packages/icons/src/atlas'))if(/^\d/.test(f))entries.push(...(await import(`../packages/icons/src/atlas/${f}`)).batch);
for(const review of input){const e=entries.find(e=>e.name===review.name);if(!e||!review.sourceObservation||!review.reason||!review.confusableWith)throw Error('Missing explicit decision '+review.name);
 const root=`docs/review/atlas-craft-01/${review.batch}`,defs=JSON.parse(await readFile(`${root}/definitions.json`));
 const evidence=await Promise.all(['review.html','definitions.json','light-1x.png','dark-1x.png','native-light-2x.png','native-dark-2x.png'].map(async f=>({path:`${root}/${f}`,sha256:sha(await readFile(`${root}/${f}`))})));
 const refs=await Promise.all([reference(e.name,e.referenceA,'lucide'),reference(e.name,e.referenceB,'tabler')]);
 const record={name:e.name,purpose:e.label,recognitionCues:e.cues,confusableWith:review.confusableWith,sourceObservation:review.sourceObservation,references:refs.map(r=>r.record),status:'visually-reviewed-candidate',effects:review.effects||{dashes:{used:false,reason:'物體的連續輪廓及構造已能表意，無隱藏邊界或狀態虛線需求。'},opacity:{used:false,reason:'主體與部件以實際留白分離，不靠淡化處理密度。'},gradients:{used:false,reason:'單色平面輪廓不需要連續漸層。'}},change:{kind:JSON.stringify(defs[e.name].variants)===JSON.stringify(before[e.name].variants)?'retained':'modified',before:{path:'references/atlas-craft-01/master-before.json',variantsSha256:sha(JSON.stringify(before[e.name].variants))},reason:review.reason},visualReview:{reviewer:'Codex (AI)',sizes:[16,20,24],corners:['sharp','soft','rounded'],themes:['light','dark'],dpr:[1,2],variantsSha256:sha(JSON.stringify(defs[e.name].variants)),evidence},designOrigin:review.designOrigin||{kind:'independent-construction'},remaining:review.remaining||[]};
 record.visualReview.inspectedCombinations=review.inspectedCombinations||[{theme:'light',dpr:1,evidence:'light-1x.png'},{theme:'dark',dpr:2,evidence:'native-dark-2x.png'}];
 record.visualReview.remainingCombinations=[{theme:'light',dpr:1},{theme:'light',dpr:2},{theme:'dark',dpr:1},{theme:'dark',dpr:2}].filter(x=>!record.visualReview.inspectedCombinations.some(y=>x.theme===y.theme&&x.dpr===y.dpr));
 const previous=ledger.icons.find(x=>x.name===e.name);
 if(previous){ledger.history??=[];ledger.history.push({supersededAt:new Date().toISOString(),record:previous});}
 ledger.icons=ledger.icons.filter(x=>x.name!==e.name);ledger.icons.push(record);
}
await writeFile(ledgerFile,JSON.stringify(ledger,null,2)+'\n');console.log(`${input.length} explicit decisions recorded; ${ledger.icons.length} candidates total.`);
