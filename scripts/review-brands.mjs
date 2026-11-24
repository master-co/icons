import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {chromium} from '@playwright/test';
import {brandCatalog} from '../packages/icons/src/brands.mjs';
import {renderSvg,escapeXml as esc} from '../packages/icons/src/runtime.mjs';
const defs=JSON.parse(await readFile('packages/icons/dist/definitions.json'));
const out=resolve('docs/review/brands-01');await mkdir(out,{recursive:true});
const batchCount=Math.ceil(brandCatalog.length/16);
const sha=s=>createHash('sha256').update(s).digest('hex');
const glyph=(name,size,corner='soft')=>renderSvg(defs[name],{size,corner});
const style=`*{box-sizing:border-box}body{margin:0;padding:32px;font:13px/1.5 -apple-system,BlinkMacSystemFont,Arial,sans-serif;background:#fafafa;color:#27272a}body.dark{background:#18181b;color:#f4f4f5}h1{font-size:28px;font-weight:550;letter-spacing:-.8px;margin:0}p{opacity:.65}header{margin-bottom:28px}nav{display:flex;gap:16px;margin:16px 0}a{color:inherit}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0}.card{border-top:1px solid #8884;padding:20px 12px;min-width:0}.title{display:flex;justify-content:space-between;align-items:center;font-size:14px;font-weight:550}.title small{font-size:10px;opacity:.5;font-weight:400}.row{display:flex;align-items:center;gap:20px;height:38px}.row small{width:48px;font-size:10px;opacity:.5}.row svg{flex:none}.source{display:flex;align-items:center;gap:10px;margin:14px 0 8px;font-size:10px;opacity:.65}.source svg{height:32px;width:42px;fill:currentColor}.scene{display:flex;align-items:center;gap:8px;font-size:13px;margin-top:10px}.low{opacity:.55}.hero{display:grid;grid-template-columns:repeat(8,1fr);gap:0;margin-top:28px}.tile{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:15px;height:113px;border-top:1px solid #8883}.tile span{font-size:11px;opacity:.7}.hero svg{width:28px;height:28px}@media(max-width:600px){body{padding:20px}.grid{grid-template-columns:1fr}.hero{grid-template-columns:repeat(4,1fr)}}`;
const wrap=(title,body)=>`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>${style}</style><body><header><h1>${title}</h1><p>Brand silhouettes & documented raster trace · native 16 / 20 / 24 · currentColor · fixed identity across corners</p></header>${body}<script>if(new URLSearchParams(location.search).get('theme')==='dark')document.body.classList.add('dark')</script></body></html>`;
for(let batch=0;batch<batchCount;batch++){
 const cards=await Promise.all(brandCatalog.slice(batch*16,(batch+1)*16).map(async b=>{
  let src=(await readFile(b.source.localPath,'utf8')).replace(/fill="(?:black|#000000|#000)"/g,'fill="currentColor"');
  if(b.name==='brand-master')src=src.replace(/<defs>[\s\S]*?<\/defs>/,'').replace(/fill="url\([^"]+\)"/g,'fill="currentColor"');
  return `<article class="card" data-name="${b.name}"><div class="title">${esc(b.label)}<small>${b.profile}</small></div><div class="source">${b.source.originalPath?`<img alt="Archived original" width="32" height="32" src="../../../${b.source.originalPath}">`:''}${src}<span>${b.source.originalPath?'Archived raster / vector trace':'Source silhouette'}</span></div>${['sharp','soft','rounded'].map(c=>`<div class="row"><small>${c}</small>${[16,20,24].map(s=>glyph(b.name,s,c)).join('')}</div>`).join('')}<div class="scene">${glyph(b.name,16)}<span>Continue with ${esc(b.label)}</span></div><div class="scene low">${glyph(b.name,20)}<span>${esc(b.label)} connected</span></div></article>`;
 }));
 await writeFile(`${out}/sheet-${batch+1}.html`,wrap(`Brand collection / ${String(batch+1).padStart(2,'0')}`,`<main class="grid">${cards.join('')}</main>`));
}
await writeFile(`${out}/index.html`,wrap('Master Icons / Brands',`<p>${brandCatalog.length} named brands & platforms · ${brandCatalog.length*9} SVG assets · 2026-11-17</p><nav>${Array.from({length:batchCount},(_,i)=>i+1).map(i=>`<a href="sheet-${i}.html">Review ${i}</a>`).join('')}<a href="?theme=dark">Dark</a><a href="?theme=light">Light</a></nav><main class="hero">${brandCatalog.map(b=>`<div class="tile">${glyph(b.name,24)}<span>${esc(b.label)}</span></div>`).join('')}</main>`));
const additions=brandCatalog.filter(b=>b.source.localPath.startsWith('references/brands-03/'));
const additionsOut=resolve('docs/review/brands-03');await mkdir(additionsOut,{recursive:true});
await writeFile(`${additionsOut}/index.html`,wrap('Master Icons / 16 additions',`<p>${brandCatalog.length} brands in the collection · native 16 / 20 / 24 · monochrome SVG</p><nav><a href="../brands-01/sheet-5.html">Native sizes / 1</a><a href="../brands-01/sheet-6.html">Native sizes / 2</a><a href="../brands-01/index.html">Full collection</a></nav><main class="hero">${additions.map(b=>`<div class="tile">${glyph(b.name,24)}<span>${esc(b.label)}</span></div>`).join('')}</main>`));
const browser=await chromium.launch();
const evidence=[];
const browserErrors=[];
for(const dpr of [1,2]){
 const page=await browser.newPage({viewport:{width:1200,height:1200},deviceScaleFactor:dpr});
 page.on('pageerror',e=>browserErrors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')browserErrors.push(m.text())});
 for(const theme of ['light','dark'])for(let batch=1;batch<=batchCount;batch++){
  const count=Math.min(16,brandCatalog.length-(batch-1)*16);
  await page.setViewportSize({width:1200,height:Math.min(1200,175+Math.ceil(count/4)*290)});
  await page.goto(pathToFileURL(`${out}/sheet-${batch}.html`).href+'?theme='+theme);
  const bounds=await page.locator('.row svg').evaluateAll(svgs=>svgs.map(svg=>{
   const vb=svg.viewBox.baseVal;
   const bad=[...svg.querySelectorAll('path')].some(p=>{const b=p.getBBox(),m=p.getCTM();const a=new DOMPoint(b.x,b.y).matrixTransform(m),z=new DOMPoint(b.x+b.width,b.y+b.height).matrixTransform(m);return b.width<=0||b.height<=0||a.x<-.01||a.y<-.01||z.x>vb.width+.01||z.y>vb.height+.01});
   return bad;
  }));
  if(bounds.some(Boolean))throw new Error(`Clipped brand on sheet ${batch}`);
  const file=`sheet-${batch}-${theme}-${dpr}x.png`;
  await page.screenshot({path:`${out}/${file}`,fullPage:true});
  evidence.push({path:`docs/review/brands-01/${file}`,sha256:sha(await readFile(`${out}/${file}`))});
 }
 await page.close();
}
const page=await browser.newPage({viewport:{width:1200,height:1200},deviceScaleFactor:1});
await page.goto(pathToFileURL(`${out}/index.html`).href);await page.screenshot({path:`${out}/overview.png`,fullPage:true});
await page.setViewportSize({width:1200,height:450});await page.goto(pathToFileURL(`${additionsOut}/index.html`).href);await page.screenshot({path:`${additionsOut}/overview.png`,fullPage:true});
evidence.push({path:'docs/review/brands-03/overview.png',sha256:sha(await readFile(`${additionsOut}/overview.png`))});
await browser.close();
if(browserErrors.length)throw new Error(browserErrors.join('\n'));
await writeFile(`${out}/evidence.json`,JSON.stringify({date:'2026-11-17',icons:brandCatalog.map(b=>({name:b.name,variantsSha256:sha(JSON.stringify(defs[b.name].variants)),sourceSha256:b.source.sha256,sheet:Math.floor(brandCatalog.indexOf(b)/16)+1})),evidence,checks:{clippedPaths:0,renderedCombinations:brandCatalog.length*9,themes:['light','dark'],dpr:[1,2]},visualDecisions:'decisions.json'},null,2)+'\n');
console.log(`Rendered ${brandCatalog.length} brands, ${batchCount*4} native-size comparison sheets, overview and hashed evidence.`);
