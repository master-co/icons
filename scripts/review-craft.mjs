import {referenceMarkup} from './lib/review-data.mjs';
// Compact, source-preserving inspection sheets. Rendering never approves an icon.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {comparisonReferences,beforeDefinitions} from './lib/review-data.mjs';
import {draw} from '../packages/icons/src/drawings.mjs';
import {context} from '../packages/icons/src/geometry.mjs';
import {renderSvg} from '../packages/icons/src/runtime.mjs';
const batches=JSON.parse(await readFile('docs/review/ui-v1/batches.json'));
const refs=(await comparisonReferences()).references,before=await beforeDefinitions();
const out=process.argv[2]||'work/craft-01/initial',only=process.argv[3];
await mkdir(out,{recursive:true});
const browser=await chromium.launch();
const page=await browser.newPage({viewport:{width:1500,height:1000},deviceScaleFactor:1});
const css=`*{box-sizing:border-box}body{margin:0;padding:16px;font:12px -apple-system,sans-serif;background:#fafafa;color:#27272a}h1{font-size:18px;margin:0 0 8px}p{margin:0 0 12px}article{display:grid;grid-template-columns:135px 240px 95px 1fr 1fr;min-height:128px;border-top:1px solid #bbb;align-items:stretch}section{padding:10px;border-right:1px solid #ddd;display:flex;flex-direction:column;justify-content:center;gap:8px}.sources>div{display:flex;align-items:center;gap:20px}.sources small{width:75px;font-size:9px;overflow-wrap:anywhere}.source{display:flex;width:36px;height:36px}.source svg{width:100%;height:100%}.matrix>div{display:flex;align-items:center;gap:20px;height:26px}.matrix small{width:48px;font-size:10px}.matrix .diagnostic{margin-left:auto}.dark{background:#18181b;color:#f4f4f5}.low{opacity:.55}.label{overflow-wrap:anywhere}.old{align-items:center}`;
for(const batch of batches.filter(b=>!only||b.id===only)){
 let rows='';
 for(const name of batch.names){
  const def={name,variants:{}};
  for(const size of[16,20,24]){def.variants[size]={};for(const c of['sharp','soft','rounded'])def.variants[size][c]={nodes:draw(name,context(size,c)),strokeWidth:context(size,c).stroke};}
  let sources='';
  for(const r of refs.filter(r=>r.name===name)){
   const svg=await referenceMarkup(r);
   sources+=`<div><small>${r.library}<br>${r.sourceName}<br>${r.match}</small><span class="source" style="width:16px;height:16px">${svg}</span><span class="source">${svg}</span></div>`;
  }
  const matrix=dark=>`<section class="matrix ${dark?'dark':''}">${['sharp','soft','rounded'].map(c=>`<div><small>${c}</small>${[16,20,24].map(size=>renderSvg(def,{size,corner:c})).join('')}${c==='soft'?`<span class="diagnostic">${renderSvg(def,{size:48,opticalSize:24})}</span>`:''}</div>`).join('')}<div class="low">${renderSvg(def,{size:16})}專案 Project · 55%</div></section>`;
  rows+=`<article><section class="label"><b>${name}</b></section><section class="sources">${sources}</section><section class="old">${renderSvg(before[name],{size:16})}${renderSvg(before[name],{size:48,opticalSize:24})}<small>實際修改前</small></section>${matrix(false)}${matrix(true)}</article>`;
 }
 const html=`<!doctype html><meta charset="utf-8"><title>${batch.id}</title><style>${css}</style><h1>${batch.id} · ${batch.names.length} 個圖稿</h1><p>原稿 16／36px（保留上游描邊）｜前稿 16／48px｜Master 16／20／24 × 三圓角、48px 診斷、文字旁與 55% 前景。渲染成功不等於目視通過。</p>${rows}`;
 await writeFile(`${out}/${batch.id}.html`,html);await page.setContent(html);await page.screenshot({path:`${out}/${batch.id}.png`,fullPage:true});
 console.log(batch.id);
}
await browser.close();
