import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {draw} from '../packages/icons/src/drawings.mjs';
import {context} from '../packages/icons/src/geometry.mjs';
import {renderSvg,strokeRanges} from '../packages/icons/src/runtime.mjs';

const cycle=process.argv[2]??'navigation-01';
const groups=JSON.parse(await readFile(`docs/review/${cycle}/scope.json`));
const definitions=Object.fromEntries(await Promise.all(Object.values(groups).flat().map(async name=>[
  name,Object.values(await import(`../packages/icons/dist/data/${name}.js`))[0],
])));
const cases=[];
for(const name of Object.values(groups).flat())for(const size of [16,20,24])for(const corner of ['sharp','soft','rounded']){
  const g=context(size,corner);
  for(const width of [...new Set([g.stroke,...strokeRanges[size]])]){
    const variable=width!==g.stroke;
    const nodes=draw(name,{...g,stroke:width,...variable?{variableStroke:true}:{}});
    const direct={name,variants:{[size]:{[corner]:{nodes,strokeWidth:width}}}};
    cases.push({name,size,corner,width,
      authored:renderSvg(direct,{size,corner}),
      generated:renderSvg(definitions[name],{size,corner,...variable?{strokeWidth:width}:{}}),
    });
  }
}
const browser=await chromium.launch();
try{
  const page=await browser.newPage();
  const results=await page.evaluate(async cases=>{
    const scale=8,pad=4;
    async function raster(svg,size){
      svg=svg.replace(/width="[^"]+"/,`width="${(size+pad*2)*scale}"`).replace(/height="[^"]+"/,`height="${(size+pad*2)*scale}"`).replace(/viewBox="[^"]+"/,`viewBox="${-pad} ${-pad} ${size+pad*2} ${size+pad*2}"`);
      const img=new Image();img.src='data:image/svg+xml;base64,'+btoa(svg);await img.decode();
      const canvas=document.createElement('canvas');canvas.width=canvas.height=(size+2*pad)*scale;
      const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0);return {data:ctx.getImageData(0,0,canvas.width,canvas.height).data,w:canvas.width};
    }
    const results=[];
    for(const c of cases){
      const a=await raster(c.authored,c.size),b=await raster(c.generated,c.size);
      let differing=0,ink=0,clipped=0;
      const on=new Set();
      for(let i=0;i<a.data.length;i+=4){
        if(a.data[i+3]!==b.data[i+3])differing++;
        if(a.data[i+3]<32)continue;
        const p=i/4,x=p%a.w,y=Math.floor(p/a.w);ink++;on.add(p);
        if(x<pad*scale||y<pad*scale||x>=(pad+c.size)*scale||y>=(pad+c.size)*scale)clipped++;
      }
      const components=[];
      while(on.size){const first=on.values().next().value,stack=[first];on.delete(first);let count=0;
        while(stack.length){const p=stack.pop();count++;for(const d of [-a.w-1,-a.w,-a.w+1,-1,1,a.w-1,a.w,a.w+1])if(on.delete(p+d))stack.push(p+d);}
        components.push(count);
      }
      const alpha=(x,y)=>a.data[(Math.floor((y+pad)*scale)*a.w+Math.floor((x+pad)*scale))*4+3];
      const shaft=['arrow-right','arrow-left','arrow-up','arrow-down','arrow-up-left','arrow-up-right','arrow-down-left','arrow-down-right', 'move-horizontal','move-vertical','move-diagonal-up-right','move-diagonal-down-right'].includes(c.name)?alpha(c.size/2,c.size/2)>100:null;
      const hole=c.name.startsWith('arrow-big-')?alpha(c.size/2,c.size/2)===0:null;
      results.push({name:c.name,size:c.size,corner:c.corner,width:c.width,differing,ink,clipped,components:components.length,shaft,hole});
    }
    return results;
  },cases);
  for(const r of results){
    const id=`${r.name}/${r.size}/${r.corner}/${r.width}`;
    assert.equal(r.differing,0,`${id}: direct / generated paint mismatch`);
    assert.ok(r.ink>0,`${id}: empty`);assert.equal(r.clipped,0,`${id}: clipped`);
    if(r.shaft!==null)assert.equal(r.shaft,true,`${id}: missing central shaft`);
    if(r.hole!==null)assert.equal(r.hole,true,`${id}: filled vote-arrow hole`);
    if(/^chevrons-(left|right|up|down)$/.test(r.name))assert.equal(r.components,2,`${id}: double chevrons merged or broken`);
  }
  await writeFile(`docs/review/${cycle}/geometry-checks.json`,JSON.stringify({status:'passed',engine:'chromium',browserVersion:browser.version(),rasterScale:8,cases:results.length,results},null,2)+'\n');
  console.log(`${results.length} navigation paint checks passed: native/min/max widths, direct/build parity, bounds, shafts, holes and separate chevrons.`);
}finally{await browser.close();}
