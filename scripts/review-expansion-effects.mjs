// Final effect/low-contrast comparison; rendering alone never approves a design.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {chromium,webkit} from '@playwright/test';
import {createElement} from 'react';import{renderToStaticMarkup}from'react-dom/server';
import {renderSvg} from '../src/runtime.mjs';import {catalog} from '../src/catalog.mjs';
import * as react from '../dist/react/index.js';
const defs=JSON.parse(await readFile('dist/definitions.json')),out='docs/review/craft-03';await mkdir(out,{recursive:true});
const names=['selection','ticket','file-archive','chart-area','file-question'];
const css='body{margin:0;padding:24px;font:13px system-ui;background:#fafafa;color:#27272a}h1{font-size:22px}article{display:grid;grid-template-columns:150px repeat(3,1fr);border-top:1px solid #888;padding:14px 0;gap:18px}section>div{display:flex;gap:16px;height:30px;align-items:center}.low{opacity:.55}small{width:72px}.dark{background:#18181b;color:#f4f4f5}svg{flex:none}';
const rows=names.map(name=>{const component=catalog.find(x=>x.name===name).component;return `<article><h2>${name}</h2>${['sharp','soft','rounded'].map(c=>`<section><b>${c}</b>${[16,20,24].map(s=>`<div><small>${s}px SVG/R</small>${renderSvg(defs[name],{size:s,corner:c})}${renderToStaticMarkup(createElement(react[component],{size:s,corner:c}))}</div>`).join('')}<div class="low"><small>16px · 55%</small>${renderSvg(defs[name],{size:16,corner:c})}專案 Project</div></section>`).join('')}</article>`}).join('');
const html=`<!doctype html><meta charset="utf-8"><style>${css}</style><h1>效果與低對比 · SVG／React</h1><p>逐筆效果保留，平切段落、透明度及小尺寸內孔。</p>${rows}`;
await writeFile(out+'/effects.html',html);
for(const[engine,type]of[['chromium',chromium],['webkit',webkit]])for(const dpr of[1,2]){
 const b=await type.launch(),p=await b.newPage({viewport:{width:1320,height:1000},deviceScaleFactor:dpr});await p.setContent(html);
 for(const theme of['light','dark']){await p.locator('body').evaluate((el,t)=>el.classList.toggle('dark',t==='dark'),theme);await p.screenshot({path:`${out}/effects-${engine}-${dpr}x-${theme}.png`,fullPage:true});}
 await b.close();
}
console.log('Rendered five effect/low-contrast subjects across both engines and DPRs; pending visual inspection.');
