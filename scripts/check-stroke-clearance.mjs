// Counter and open-channel regression probes, at the supported maximum weight.
// These independent semantic points catch merges that hole counts cannot see.
import {readFile} from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {renderSvg} from '../packages/icons/src/runtime.mjs';
import {strokeDefinition,strokeRanges} from './lib/stroke-width.mjs';
const defs=JSON.parse(await readFile('work/stroke-assets/definitions.json'));
const probes={fingerprint:[[4.75,11],[8.25,11],[15.75,11],[19.25,11]],barcode:[[6,12],[10,12],[14,12],[18,12]],eye:[[12,12]],'user-cog':[[17,17]],'server-cog':[[17,17]],sliders:[[8,6.5],[16,17.5]]};
const cases=Object.entries(probes).flatMap(([name,points])=>[16,20,24].flatMap(size=>['sharp','soft','rounded'].map(corner=>({name,size,corner,points:name==='sliders'?size===16?[[6*1.5,4.5*1.5],[10*1.5,11.5*1.5]]:size===20?[[7*1.2,5.5*1.2],[13*1.2,14.5*1.2]]:points:points,svg:renderSvg(strokeDefinition(defs[name],strokeRanges[size][1]),{size,corner})}))));
const browser=await chromium.launch(),page=await browser.newPage();
const failures=await page.evaluate(async cases=>{const failed=[];
 for(const {svg,points,...entry}of cases){const img=new Image();img.src='data:image/svg+xml,'+encodeURIComponent(svg);await img.decode();const canvas=document.createElement('canvas');canvas.width=canvas.height=entry.size*8;const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0,canvas.width,canvas.height);for(const [x,y]of points){const alpha=ctx.getImageData(Math.round(x*entry.size/24*8),Math.round(y*entry.size/24*8),1,1).data[3];if(alpha>16)failed.push({...entry,point:[x,y],alpha});}}
 return failed;
},cases);await browser.close();console.log(JSON.stringify({cases:cases.length,failures},null,2));if(failures.length)process.exitCode=1;
