// Render current geometry for manual cross-family review; does not approve it.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {catalog,conceptCount} from '../packages/icons/src/catalog.mjs';
import {renderSvg,escapeXml as esc} from '../packages/icons/src/runtime.mjs';
const cycle=process.argv[2]||'craft-03',out=`docs/review/${cycle}`,defs=JSON.parse(await readFile('dist/definitions.json'));
const ledger=JSON.parse(await readFile('docs/refinement-ledger.json'));
await mkdir(out+'/overview',{recursive:true});
const names=[...catalog].sort((a,b)=>a.concept.localeCompare(b.concept)||a.name.localeCompare(b.name)).map(x=>x.name);
const css=`*{box-sizing:border-box}body{margin:0;padding:28px;font:13px/1.5 system-ui;background:#fafafa;color:#27272a}h1{font-size:24px;margin:0 0 6px}p{color:#71717a;margin:0 0 22px}.grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px}.cell{padding:12px 8px;border:1px solid #d4d4d8;min-width:0}.samples{display:flex;align-items:center;gap:18px;height:34px}.name{display:block;font-size:11px;margin-top:8px;white-space:nowrap}.dark{background:#18181b;color:#f4f4f5}.dark .cell{border-color:#52525b}.dark p{color:#a1a1aa}nav{margin:20px 0}a{color:inherit;margin-right:16px}.pairs{display:grid;grid-template-columns:1fr 1fr;gap:20px}.pair{border-top:1px solid #a1a1aa;padding:16px 0}.pair h2{font-size:15px;margin:0 0 16px}.compare{display:flex;gap:48px;align-items:center}.compare section{min-width:180px}.large svg{width:72px;height:72px}.large{display:flex;gap:22px;align-items:center}.large small{font-size:11px;color:#71717a}.pair .samples{margin-top:12px}.caption{margin-top:12px;max-width:480px;font-size:12px}`;
const cells=part=>part.map(name=>`<div class="cell"><div class="samples">${[16,20,24].map(size=>renderSvg(defs[name],{size})).join('')}</div><span class="name">${name}</span></div>`).join('');
const wrap=(title,body)=>`<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><title>${title}</title><style>${css}</style><h1>${title}</h1>${body}</html>`;
const browser=await chromium.launch(),page=await browser.newPage({viewport:{width:1320,height:900},deviceScaleFactor:1});
for(let i=0;i<7;i++){
 const part=names.slice(i*56,(i+1)*56),html=wrap(`Master Icons · 全庫並排 ${i+1} / 7`,`<p>按基本概念相鄰排列 · 每顆原生 16 / 20 / 24px · 預設 soft · ${part.length} 顆</p><div class="grid">${cells(part)}</div>`);
 await writeFile(`${out}/overview/page-${i+1}.html`,html);await page.setContent(html);
 for(const theme of['light','dark']){await page.locator('body').evaluate((el,t)=>el.classList.toggle('dark',t==='dark'),theme);await page.screenshot({path:`${out}/overview/page-${i+1}-${theme}.png`,fullPage:true});}
}
const html=wrap('Master Icons · 全庫跨家族並排',`<p>${catalog.length} 個命名圖稿 / ${conceptCount} 個基本概念 · 每顆原生 16 / 20 / 24px · 以概念排列</p><button onclick="document.body.classList.toggle('dark')">切換明暗</button><nav>${Array.from({length:7},(_,i)=>`<a href="overview/page-${i+1}-light.png">分頁 ${i+1}</a>`).join('')}</nav><div class="grid">${cells(names)}</div>`);
await writeFile(`${out}/families.html`,html);await page.setContent(html);await page.locator('body').evaluate(el=>el.classList.add('dark'));await page.screenshot({path:`${out}/families-dark.png`,fullPage:true});
const selected=process.argv[3]?.split(',')||['copy','eye-off','clipboard-pen','calendar-clock','mail-check','user-cog','package','hard-drive'];
let pairs='';
for(const name of selected){const focusCorner=['keyboard-return','file'].includes(name)?'rounded':['languages','italic','globe','chart-donut','coins','clipboard-pen','compass'].includes(name)?'sharp':'soft';const r=ledger.icons.find(x=>x.name===name),before=JSON.parse(await readFile(r.change.before.path))[name];pairs+=`<article class="pair"><h2>${name}</h2><div class="compare">${[[before,'Before'],[defs[name],'Master']].map(([d,label])=>`<section><div class="large">${renderSvg(d,{size:24,corner:focusCorner})}<small>${label}<br>24px ${focusCorner} · 3× 診斷</small></div><div class="samples">${[16,20,24].map(size=>renderSvg(d,{size})).join('')}</div></section>`).join('')}</div><div class="caption">${esc(r.change.reason)}</div></article>`;}
const summary=wrap('Master Icons · 精修前後',`<p>${esc(ledger.reviewSummary)} 此處列出 ${selected.length} 個案例。下排為原生 16 / 20 / 24px soft，上排用於看清切口與接點。</p><div class="pairs">${pairs}</div>`);
await writeFile(`${out}/summary.html`,summary);await page.setContent(summary);await page.screenshot({path:`${out}/summary.png`,fullPage:true});
await browser.close();console.log(`Rendered ${names.length} drawings and ${selected.length} before/after examples; manual inspection required.`);
