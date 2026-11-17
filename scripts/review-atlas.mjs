import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {chromium} from '@playwright/test';
import {context} from '../packages/icons/src/geometry.mjs';
import {renderSvg} from '../packages/icons/src/runtime.mjs';
const id=process.argv[2];
const {batch}=await import(`../packages/icons/src/atlas/${id}.mjs`);
const root=`docs/review/atlas-01/${id}`;await mkdir(root,{recursive:true});
const sha=s=>createHash('sha256').update(s).digest('hex');
const refs=[],svgs={};
const {reference}=await import('./lib/atlas-reference.mjs');
for(const entry of batch)for(const [key,lib] of [['referenceA','lucide'],['referenceB','tabler']]){
 const ref=await reference(entry.name,entry[key],lib);refs.push(ref.record);svgs[entry.name+'-'+key]=ref.svg(24);
}
const defs=Object.fromEntries(batch.map(e=>[e.name,{name:e.name,direction:'fixed',variants:Object.fromEntries([16,20,24].map(size=>[size,Object.fromEntries(['sharp','soft','rounded'].map(corner=>{const g=context(size,corner);return [corner,{nodes:e.draw(g),strokeWidth:g.stroke}]}))]))}]));
await writeFile(`${root}/definitions.json`,JSON.stringify(defs));
await writeFile(`${root}/references.json`,JSON.stringify({references:refs},null,2));
const glyph=(name,size,corner,display=size)=>renderSvg(defs[name],{size:display,opticalSize:size,corner});
const html=`<!doctype html><meta charset="utf-8"><title>Atlas ${id}</title><style>*{box-sizing:border-box}body{margin:0;padding:24px;font:12px system-ui;background:#fafafa;color:#242426}body.dark{background:#171719;color:#e4e4e7}h1{font-size:20px;margin:0 0 8px}p{color:#888;margin:0 0 20px}.row{display:grid;grid-template-columns:160px 52px 52px repeat(9,48px) 64px 160px;align-items:center;min-height:72px;border-bottom:1px solid #8884}.row>div{display:flex;justify-content:center;align-items:center}.row>span{font-size:10px}svg{display:block;flex-shrink:0}.text{gap:8px;font-size:14px;color:#888}.refs{opacity:.85}.label{font-size:10px}.header{min-height:32px}small{display:block;color:#888;margin-top:3px}</style><h1>Atlas ${id} · 10 concepts</h1><p>Sources · sharp 16/20/24 · soft 16/20/24 · rounded 16/20/24 · 16px × 3 diagnostic · native text</p><div class="row header"><b>Concept</b><span>Source A</span><span>Source B</span>${['sharp','soft','rounded'].flatMap(c=>[16,20,24].map(s=>`<span>${c} ${s}</span>`)).join('')}<span>3×</span><span>Low contrast / text</span></div>${batch.map(e=>`<div class="row"><b>${e.name}<small>${e.label}</small></b><div class="refs">${svgs[e.name+'-referenceA']}</div><div class="refs">${svgs[e.name+'-referenceB']}</div>${['sharp','soft','rounded'].flatMap(c=>[16,20,24].map(s=>`<div>${glyph(e.name,s,c)}</div>`)).join('')}<div>${glyph(e.name,16,'soft',48)}</div><div class="text">${glyph(e.name,16,'soft')}<span>${e.label}</span></div></div>`).join('')}`;
await writeFile(`${root}/review.html`,html);
const browser=await chromium.launch();
for(const dpr of [1,2]){
 const page=await browser.newPage({viewport:{width:1010,height:900},deviceScaleFactor:dpr});await page.setContent(html);
 for(const theme of ['light','dark']){await page.evaluate(t=>document.body.className=t,theme);await page.screenshot({path:`${root}/${theme}-${dpr}x.png`,fullPage:true});}
 await page.close();
}await browser.close();
console.log(`Built and rendered ${batch.length} × 9 masters: ${root}`);
