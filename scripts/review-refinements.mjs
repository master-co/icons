import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {chromium,webkit,firefox} from '@playwright/test';
import {renderSvg} from '../src/runtime.mjs';
import {beforeDefinitions} from './lib/review-data.mjs';
const out='docs/review/craft-01',defs=JSON.parse(await readFile('dist/definitions.json')),before=await beforeDefinitions();
const decisions=JSON.parse(await readFile(out+'/decisions.json')),changed=decisions.filter(x=>x.kind==='modified');
await mkdir(out,{recursive:true});
const css=`*{box-sizing:border-box}body{font:13px -apple-system,sans-serif;background:#fafafa;color:#27272a;padding:24px;margin:0}h1{font-size:21px}h2{font:12px monospace}article{display:grid;grid-template-columns:170px repeat(3,1fr) 130px;border-top:1px solid #999;min-height:158px;align-items:center;gap:20px}section>div{display:flex;align-items:center;gap:24px;height:33px}small{font-size:10px}section small{width:35px}.dark{background:#18181b;color:#f4f4f5}.low{opacity:.55}.diagnostic{display:flex;gap:12px}svg{flex:none}`;
const pages=[];
for(let i=0;i<changed.length;i+=7){const group=changed.slice(i,i+7);pages.push(`<!doctype html><meta charset="utf-8"><style>${css}</style><h1>Craft 01 · 精修前／後 · ${i+1}–${i+group.length}</h1><p>每對依序真實前稿／目前。三尺寸 × 三圓角；右欄為 24 母版的 2× 診斷圖。原生文字列為 55% 前景。</p>${group.map(({name})=>`<article><header><h2>${name}</h2><p class="low">${renderSvg(defs[name],{size:16})} 專案 Project</p></header>${['sharp','soft','rounded'].map(c=>`<section><b>${c}</b>${[16,20,24].map(size=>`<div><small>${size}px</small>${renderSvg(before[name],{size,corner:c})}${renderSvg(defs[name],{size,corner:c})}</div>`).join('')}</section>`).join('')}<div class="diagnostic">${renderSvg(before[name],{size:48,opticalSize:24})}${renderSvg(defs[name],{size:48,opticalSize:24})}</div></article>`).join('')}`);}
for(const[i,html]of pages.entries())await writeFile(`${out}/refined-${i+1}.html`,html);
try{const b=await firefox.launch({timeout:15000});await b.close();await writeFile(out+'/firefox.json',JSON.stringify({status:'launch-passed-full-suite-not-yet-run'}));}catch(e){await writeFile(out+'/firefox.json',JSON.stringify({status:'unverified-launch-failed',message:e.message},null,2));}
for(const[engine,type]of[['chromium',chromium],['webkit',webkit]])for(const dpr of[1,2]){
 const b=await type.launch(),page=await b.newPage({viewport:{width:1440,height:1000},deviceScaleFactor:dpr});
 for(const[i,html]of pages.entries()){
  await page.setContent(html);await page.screenshot({path:`${out}/refined-${i+1}-${engine}-${dpr}x-light.png`,fullPage:true});
  await page.locator('body').evaluate(e=>e.classList.add('dark'));await page.screenshot({path:`${out}/refined-${i+1}-${engine}-${dpr}x-dark.png`,fullPage:true});
 }
 await b.close();
}
const b=await chromium.launch(),page=await b.newPage({viewport:{width:1200,height:900}});
const focused=['indent-increase','indent-decrease','megaphone','handshake','ticket'];
const summary=`<!doctype html><meta charset="utf-8"><style>${css}article{grid-template-columns:200px 1fr 1fr;min-height:125px}.samples{display:flex;align-items:center;gap:32px}</style><h1>Master Icons · 本輪重點精修</h1><p>左：修改前　右：目前　｜　16 / 24px 原生，48px 診斷</p>${focused.map(name=>`<article><h2>${name}</h2>${[before,defs].map(set=>`<div class="samples">${[16,24,48].map(size=>renderSvg(set[name],{size,opticalSize:size===16?16:24})).join('')}</div>`).join('')}</article>`).join('')}`;
await writeFile(out+'/summary.html',summary);await page.setContent(summary);await page.screenshot({path:out+'/summary.png',fullPage:true});await page.locator('body').evaluate(e=>e.classList.add('dark'));await page.screenshot({path:out+'/summary-dark.png',fullPage:true});await b.close();
console.log('Rendered '+changed.length+' refinement comparisons; no review statuses changed.');
