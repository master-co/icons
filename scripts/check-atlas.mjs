import {readdir,writeFile} from 'node:fs/promises';
import {context} from '../packages/icons/src/geometry.mjs';
import {paintedRegion} from '../packages/icons/src/occlusion.mjs';
import {catalog} from '../packages/icons/src/catalog.mjs';
import {draw} from '../packages/icons/src/drawings.mjs';
import integratedScope from '../packages/icons/src/atlas-scope.json' with {type:'json'};
const entries=[];for(const f of await readdir('packages/icons/src/atlas'))if(/^\d/.test(f))entries.push(...(await import(`../packages/icons/src/atlas/${f}`)).batch);
const integrated=new Set(integratedScope.map(e=>e.name));
const existing=catalog.filter(e=>!integrated.has(e.name));
const seen=new Map(existing.map(e=>[JSON.stringify(draw(e.name,context(24,'sharp'))),e.name]));
const collisions=[],bounds=[],errors=[];
const seenNames=new Set(existing.map(e=>e.name));
for(const e of entries){if(seenNames.has(e.name))collisions.push(e.name);seenNames.add(e.name);const key=JSON.stringify(e.draw(context(24,'sharp')));if(seen.has(key))errors.push({name:e.name,error:'duplicate '+seen.get(key)});seen.set(key,e.name);
 for(const s of [16,20,24])for(const corner of ['sharp','soft','rounded']){const g=context(s,corner);try{const nodes=e.draw(g);if(/NaN|undefined|Infinity/.test(JSON.stringify(nodes)))throw Error('non-finite geometry');const ink=paintedRegion(nodes,g);try{const b=ink.computeTightBounds();bounds.push({name:e.name,size:s,corner,bounds:b});if(b.fLeft<0||b.fTop<0||b.fRight>s||b.fBottom>s)errors.push({name:e.name,size:s,corner,error:'clipped',bounds:b});}finally{ink.delete()}}catch(error){errors.push({name:e.name,size:s,corner,error:String(error)})}}
}
await writeFile('work/atlas-01/geometry-check.json',JSON.stringify({count:entries.length,collisions,errors,bounds},null,2));console.log(JSON.stringify({count:entries.length,collisions,errors},null,2));if(collisions.length||errors.length)process.exitCode=1;
