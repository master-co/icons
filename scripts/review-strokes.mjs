import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {chromium} from '@playwright/test';
import {renderSvg} from '../packages/icons/src/runtime.mjs';
import {strokeWidths,strokeWidthsFor,strokeDefinition} from './lib/stroke-width.mjs';
const out=resolve(process.argv[2]||'work/stroke-width/review');await mkdir(out,{recursive:true});
const defs=JSON.parse(await readFile(process.env.STROKE_DEFINITIONS||'work/stroke-assets/definitions.json','utf8'));
const names=Object.keys(defs),sizes=[16,20,24],corners=['sharp','soft','rounded'];
const browser=await chromium.launch();
const rows=[];
const glyph=(name,size,corner,width)=>renderSvg(strokeDefinition(defs[name],width),{size,corner});
for(const dpr of (process.env.STROKE_REVIEW_FAST?[2]:[1,2])){
 const page=await browser.newPage({viewport:{width:1440,height:1300},deviceScaleFactor:dpr});
 for(let start=0;start<names.length;start+=16){
  const batch=names.slice(start,start+16),id=String(start/16+1).padStart(2,'0');
  const html=`<!doctype html><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;padding:16px;background:#fff;color:#27272a;font:11px system-ui}h1{font-size:15px;margin:0 0 12px}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.card{border:1px solid #ccc;padding:6px}.name{font-weight:600;margin-bottom:4px}.row{display:grid;grid-template-columns:54px repeat(8,1fr);height:28px;align-items:center;text-align:center}.row span{font-size:9px}.row svg{justify-self:center}.dark{background:#18181b;color:#f4f4f5}.dark .card{border-color:#444}</style><h1>Stroke review ${id} · native 16/20/24 · sharp/soft/rounded · DPR ${dpr} · columns: ${strokeWidths.join(' / ')}</h1><div class="grid">${batch.map(name=>`<div class="card"><div class="name">${name}</div><div class="row"><span>px / corner</span>${strokeWidths.map(w=>`<span>${w}</span>`).join('')}</div>${sizes.flatMap(s=>corners.map(c=>`<div class="row"><span>${s} ${c.slice(0,1)}</span>${strokeWidths.map(w=>strokeWidthsFor(s).includes(w)?glyph(name,s,c,w):'<span>—</span>').join('')}</div>`)).join('')}</div>`).join('')}</div>`;
  if(dpr===1)await writeFile(`${out}/sheet-${id}.html`,html);
  await page.setContent(html);
  for(const theme of (process.env.STROKE_REVIEW_FAST?[]:['light','dark'])){
   await page.locator('body').evaluate((el,t)=>el.className=t,theme);
   await page.screenshot({path:`${out}/sheet-${id}-${theme}-${dpr}x.png`,fullPage:true});
  }
  const cases=batch.flatMap(name=>sizes.flatMap(size=>corners.flatMap(corner=>strokeWidthsFor(size).map(width=>({name,size,corner,width,svg:glyph(name,size,corner,width)})))));
  rows.push(...await page.evaluate(async cases=>{
   const results=[],dpr=devicePixelRatio,pad=4;
   for(const {svg,...item} of cases){
    const doc=new DOMParser().parseFromString(svg,'image/svg+xml');
    if(doc.querySelector('parsererror'))throw Error(item.name);
    const root=doc.documentElement,extent=(item.size+pad*2)*dpr;
    root.setAttribute('viewBox',`-${pad} -${pad} ${item.size+pad*2} ${item.size+pad*2}`);root.setAttribute('width',extent);root.setAttribute('height',extent);root.setAttribute('color','#000');
    const img=new Image();img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(doc));await img.decode();
    const canvas=document.createElement('canvas');canvas.width=canvas.height=extent;
    const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0);const pixels=ctx.getImageData(0,0,extent,extent).data;
    let minX=Infinity,minY=Infinity,maxX=-1,maxY=-1,mass=0;
    for(let y=0;y<extent;y++)for(let x=0;x<extent;x++){const a=pixels[(y*extent+x)*4+3];mass+=a/255;if(a>8){minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);}}
    // Count enclosed negative spaces at 50% alpha as a screening signal only.
    const seen=new Uint8Array(extent*extent);let holes=0;
    for(let i=0;i<seen.length;i++)if(!seen[i]&&pixels[i*4+3]<128){
     let edge=false,area=0;const queue=[i];seen[i]=1;
     for(let k=0;k<queue.length;k++){const p=queue[k],x=p%extent,y=Math.floor(p/extent);area++;if(x===0||y===0||x===extent-1||y===extent-1)edge=true;
      for(const n of [x>0?p-1:-1,x<extent-1?p+1:-1,y>0?p-extent:-1,y<extent-1?p+extent:-1])if(n>=0&&!seen[n]&&pixels[n*4+3]<128){seen[n]=1;queue.push(n);}}
     if(!edge&&area>=dpr*dpr/2)holes++;
    }
    results.push({...item,dpr,empty:mass===0,clipped:mass>0&&(minX<pad*dpr||minY<pad*dpr||maxX>=(item.size+pad)*dpr||maxY>=(item.size+pad)*dpr),bounds:[minX/dpr-pad,minY/dpr-pad,(maxX+1)/dpr-pad,(maxY+1)/dpr-pad],inkArea:mass/dpr/dpr,holes});
   }return results;
  },cases));
  console.log(`DPR ${dpr}: ${Math.min(start+16,names.length)}/${names.length}`);
 }
 await page.close();
}
await writeFile(`${out}/metrics.json`,JSON.stringify(rows));
const clips=rows.filter(r=>r.clipped||r.empty),losses=[];
for(const name of names)for(const size of sizes)for(const corner of corners){
 const group=rows.filter(r=>r.name===name&&r.size===size&&r.corner===corner&&r.dpr===2);
 const base=group.find(r=>r.width===({16:1.25,20:1.5,24:1.75})[size]);
 for(const item of group)if(item.width>base.width&&item.holes<base.holes)losses.push({...item,baseHoles:base.holes});
}
await writeFile(`${out}/flags.json`,JSON.stringify({cases:rows.length,clips,holeLosses:losses},null,2));
await writeFile(`${out}/index.html`,`<!doctype html><title>Stroke width review</title><h1>392 icons · size-specific width ranges · 9 masters · DPR 1/2</h1>${Array.from({length:25},(_,i)=>{const id=String(i+1).padStart(2,'0');return `<p><a href="sheet-${id}.html">Sheet ${id}</a> ${['light','dark'].flatMap(t=>[1,2].map(d=>`<a href="sheet-${id}-${t}-${d}x.png">${t} ${d}×</a>`)).join(' · ')}</p>`}).join('')}`);
await browser.close();console.log(JSON.stringify({cases:rows.length,clips:clips.length,holeLosses:losses.length}));

if(clips.length||losses.length)process.exitCode=1;
