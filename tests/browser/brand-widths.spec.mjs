import {test,expect} from '@playwright/test';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {renderSvg,strokeRanges,strokeWidths} from '../../packages/icons/src/runtime.mjs';
const brands=JSON.parse(await readFile('packages/icons/src/brands.json'));
// Quiet sections of each primary contour, away from corners, caps and joins.
// Measure real exported ink across the contour's normal, not its SVG width label.
const probes={wechat:.25,github:.5,gitlab:.25,discord:.25,youtube:.5,facebook:.025,linkedin:.1,mastodon:.1,reddit:.5,spotify:.5,soundcloud:.15,pinterest:.5,tiktok:.05,twitch:.15,vimeo:.25,patreon:.5,telegram:.5,line:.25};

test('all brand outline exports have the requested native primary stroke width',async({page},testInfo)=>{
 const cases=[];
 for(const [slug,fraction] of Object.entries(probes)){
  const name=`brand-${slug}-outline`,brand=brands.find(b=>b.name===name);
  const definition=Object.values(await import(pathToFileURL(resolve(`packages/icons/dist/data/${name}.js`)).href))[0];
  for(const size of [16,20,24])for(const width of strokeWidths.filter(w=>w>=strokeRanges[size][0]&&w<=strokeRanges[size][1])){
   cases.push({name,size,width,fraction,source:brand.outlineSvg,svg:renderSvg(definition,{size,strokeWidth:width})});
  }
 }
 const measurements=await page.evaluate(cases=>{
  const parser=new DOMParser(),ctx=document.createElement('canvas').getContext('2d');
  return cases.map(item=>{
   const source=parser.parseFromString(item.source,'image/svg+xml').querySelector('path');
   const length=source.getTotalLength()*item.fraction,pt=source.getPointAtLength(length),p0=source.getPointAtLength(length-.01),p1=source.getPointAtLength(length+.01);
   const tangent=Math.hypot(p1.x-p0.x,p1.y-p0.y),nx=-(p1.y-p0.y)/tangent,ny=(p1.x-p0.x)/tangent;
   const svg=parser.parseFromString(item.svg,'image/svg+xml').documentElement;
   document.body.replaceChildren(document.importNode(svg,true));
   const path=document.querySelector('svg path'),matrix=path.transform.baseVal.consolidate().matrix;
   const ink=new Path2D();ink.addPath(new Path2D(path.getAttribute('d')),new DOMMatrix([matrix.a,matrix.b,matrix.c,matrix.d,matrix.e,matrix.f]));
   const x=matrix.a*pt.x+matrix.c*pt.y+matrix.e,y=matrix.b*pt.x+matrix.d*pt.y+matrix.f;
   const runs=[];let start;
   for(let t=-4;t<=4;t+=.005){
    const inside=ctx.isPointInPath(ink,x+nx*t,y+ny*t,path.getAttribute('fill-rule')||'nonzero');
    if(inside&&start===undefined)start=t;
    if(!inside&&start!==undefined){runs.push([start,t]);start=undefined;}
   }
   if(start!==undefined)runs.push([start,4]);
   const nearest=runs.sort((a,b)=>Math.abs((a[0]+a[1])/2)-Math.abs((b[0]+b[1])/2))[0];
   return {name:item.name,size:item.size,requested:item.width,measured:nearest?+(nearest[1]-nearest[0]).toFixed(3):0};
  });
 },cases);
 await mkdir('work/brand-outline-craft-04',{recursive:true});
 await writeFile(`work/brand-outline-craft-04/widths-${testInfo.project.name}.json`,JSON.stringify(measurements,null,2)+'\n');
 for(const m of measurements)expect(Math.abs(m.measured-m.requested),JSON.stringify(m)).toBeLessThan(.025);
});

test('bubble clearance and native SoundCloud bars remain separate at every supported width',async({page})=>{
 const cases=[];
 for(const slug of ['wechat','soundcloud']){
  const name=`brand-${slug}-outline`,definition=Object.values(await import(pathToFileURL(resolve(`packages/icons/dist/data/${name}.js`)).href))[0];
  for(const size of [16,20,24])for(const width of strokeWidths.filter(w=>w>=strokeRanges[size][0]&&w<=strokeRanges[size][1]))cases.push({slug,size,width,svg:renderSvg(definition,{size,color:'#000',strokeWidth:width})});
 }
 const measured=await page.evaluate(async cases=>{
  const results=[],factor=32;
  for(const item of cases){
   const image=new Image();image.src='data:image/svg+xml,'+encodeURIComponent(item.svg);await image.decode();
   const canvas=document.createElement('canvas');canvas.width=canvas.height=item.size*factor;
   const ctx=canvas.getContext('2d');ctx.drawImage(image,0,0,canvas.width,canvas.height);
   const {data}=ctx.getImageData(0,0,canvas.width,canvas.height),seen=new Uint8Array(canvas.width*canvas.height),areas=[];
   for(let i=0;i<seen.length;i++){
    if(seen[i]||data[i*4+3]<128)continue;
    const queue=[i];seen[i]=1;let area=0;
    while(queue.length){const at=queue.pop();area++;const x=at%canvas.width,y=Math.floor(at/canvas.width);
     for(const next of [x>0?at-1:-1,x<canvas.width-1?at+1:-1,y>0?at-canvas.width:-1,y<canvas.height-1?at+canvas.width:-1])if(next>=0&&!seen[next]&&data[next*4+3]>=128){seen[next]=1;queue.push(next);}
    }
    if(area>factor*factor*.1)areas.push(area/(factor*factor));
   }
   results.push({slug:item.slug,size:item.size,width:item.width,components:areas.length});
  }
  return results;
 },cases);
 for(const item of measured)expect(item.components,JSON.stringify(item)).toBe(item.slug==='wechat'?6:item.size===16?4:5);
});
