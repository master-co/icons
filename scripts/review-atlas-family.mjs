import {readFile,writeFile,mkdir,readdir} from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {context} from '../packages/icons/src/geometry.mjs';
import {renderSvg} from '../packages/icons/src/runtime.mjs';
const root=process.argv[2]||'docs/review/atlas-craft-01/families';
await mkdir(root,{recursive:true});
const browser=await chromium.launch(),definitions={};
for(const file of (await readdir('packages/icons/src/atlas')).filter(x=>/^\d.*\.mjs$/.test(x)).sort()){
 if(process.argv.length>3&&!process.argv.slice(3).includes(file.replace('.mjs','')))continue;
 const {batch}=await import(`../packages/icons/src/atlas/${file}`),id=file.replace('.mjs','');
 for(const e of batch)definitions[e.name]={name:e.name,direction:'fixed',variants:Object.fromEntries([16,20,24].map(s=>[s,Object.fromEntries(['sharp','soft','rounded'].map(c=>{const g=context(s,c);return[c,{strokeWidth:g.stroke,nodes:e.draw(g)}]}))]))};
 const sizes=['sharp','soft','rounded'].flatMap(c=>[16,20,24].map(s=>({s,c})));
 const html=`<!doctype html><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;padding:24px;background:#fafafa;color:#27272a;font:14px/20px system-ui}body.dark{background:#18181b;color:#e4e4e7}h1{font:600 20px/28px system-ui;margin:0 0 8px}p{font:12px/20px system-ui;margin:0 0 20px;color:#888}.row{display:grid;grid-template-columns:176px repeat(9,64px) 208px;align-items:center;height:73px;border-bottom:1px solid #8884}.header{height:41px;font:11px/16px system-ui;color:#888}.cell{display:flex;align-items:center;justify-content:center}.label{font-weight:600}.label small{display:block;font:12px/16px system-ui;color:#888}.text{display:flex;align-items:center;gap:8px;color:#888;font:14px/20px system-ui}svg{display:block;flex-shrink:0}</style><h1>Atlas ${id} · family review</h1><p>Native CSS sizes · three corner profiles · low contrast text at 16px · candidate geometry</p><div class="row header"><div>Concept</div>${sizes.map(({s,c})=>`<div class="cell">${c}<br>${s}</div>`).join('')}<div>Low contrast / text</div></div>${batch.map(e=>`<div class="row"><div class="label">${e.name}<small>${e.label}</small></div>${sizes.map(({s,c})=>`<div class="cell">${renderSvg(definitions[e.name],{size:s,opticalSize:s,corner:c})}</div>`).join('')}<div class="text">${renderSvg(definitions[e.name],{size:16,opticalSize:16,corner:'soft'})}${e.label}</div></div>`).join('')}`;
 await writeFile(`${root}/${id}.html`,html);
 for(const dpr of [1,2]){
  const page=await browser.newPage({viewport:{width:1008,height:960},deviceScaleFactor:dpr});await page.setContent(html);
  const offgrid=await page.locator('svg').evaluateAll(nodes=>nodes.filter(n=>{const r=n.getBoundingClientRect();return r.width!==+n.getAttribute('width')||r.height!==+n.getAttribute('height')||r.x*devicePixelRatio%1||r.y*devicePixelRatio%1}).length);
  if(offgrid)throw Error(`${id}: ${offgrid} icons scaled or off pixel grid`);
  for(const theme of ['light','dark']){await page.evaluate(t=>document.body.className=t,theme);await page.screenshot({path:`${root}/${id}-${theme}-${dpr}x.png`,fullPage:true});}
  await page.close();
 }
}
await browser.close();await writeFile(`${root}/definitions.json`,JSON.stringify(definitions));
console.log(`${Object.keys(definitions).length} candidates rendered. No review state changed.`);
