// Compare explorer masks with fixed package artwork at its native stroke.
// A 4% alpha-area threshold catches missing components while allowing edge AA.
// Build assets first with `bun run build:review`.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {renderSvg} from '../packages/icons/src/runtime.mjs';
import {strokeDefinition} from './lib/stroke-width.mjs';
const defs=JSON.parse(await readFile('work/stroke-assets/definitions.json'));
const cases=Object.entries(defs).flatMap(([name,d])=>[16,20,24].flatMap(size=>['sharp','soft','rounded'].map(corner=>({name,size,corner,svgs:[renderSvg(d,{size,corner}),renderSvg(strokeDefinition(d,{16:1.25,20:1.5,24:1.75}[size]),{size,corner})]}))));
const b=await chromium.launch();const p=await b.newPage();
const result=await p.evaluate(async cases=>{
 const out=[];
 for(const {svgs,...entry} of cases){
 const arrays=[];for(const svg of svgs){const img=new Image();img.src='data:image/svg+xml,'+encodeURIComponent(svg);await img.decode();const c=document.createElement('canvas');c.width=c.height=entry.size*4;const x=c.getContext('2d');x.drawImage(img,0,0,c.width,c.height);arrays.push(x.getImageData(0,0,c.width,c.height).data);}
 let delta=0,area=0;for(let i=3;i<arrays[0].length;i+=4){delta+=Math.abs(arrays[0][i]-arrays[1][i])/255;area+=arrays[0][i]/255;}
 out.push({...entry,delta:delta/16,ratio:delta/Math.max(1,area)});
 }return out;
},cases);
result.sort((a,b)=>b.ratio-a.ratio);await mkdir('work/stroke-width',{recursive:true});await writeFile('work/stroke-width/parity.json',JSON.stringify(result));await b.close();
const failed=result.filter(x=>x.ratio>.04);console.log(JSON.stringify({masters:result.length,maximumRelativeAlphaDifference:result[0].ratio,failed},null,2));
if(failed.length)process.exitCode=1;
