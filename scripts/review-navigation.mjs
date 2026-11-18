// Native review evidence only. Viewing and decisions are recorded separately.
import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {draw} from '../packages/icons/src/drawings.mjs';
import {context} from '../packages/icons/src/geometry.mjs';
import {renderSvg} from '../packages/icons/src/runtime.mjs';
import {referenceMarkup} from './lib/review-data.mjs';

const [stage, batch, cycle='navigation-01'] = process.argv.slice(2);
if (!stage || !batch) throw Error('Usage: node scripts/review-navigation.mjs STAGE BATCH');
const root=`docs/review/${cycle}`;
const groups=JSON.parse(await readFile(`${root}/scope.json`));
const names=groups[batch];
if (!names) throw Error(`Unknown batch: ${batch}`);
const baseline=JSON.parse(await readFile(`references/${cycle}/master-before.json`));
const refs=JSON.parse(await readFile(`references/${cycle}/comparison.json`)).references;
const definitions={};
for (const name of names) {
  try { definitions[name]={name,variants:Object.fromEntries([16,20,24].map(s=>[s,Object.fromEntries(['sharp','soft','rounded'].map(c=>[c,{nodes:draw(name,context(s,c)),strokeWidth:context(s,c).stroke}]))]))}; }
  catch(e) { if(stage!=='before')throw e; }
}
const out=`${root}/${batch}-${stage}`;
await mkdir(out); // Never silently replace an earlier candidate or its evidence.
await writeFile(`${out}/definitions.json`,JSON.stringify(definitions,null,2)+'\n');
const glyph=(def,s,c='soft',display=s)=>renderSvg(def,{size:display,opticalSize:s,corner:c});
const css=`*{box-sizing:border-box}body{margin:0;padding:16px;background:#fafafa;color:#27272a;font:12px/20px system-ui}body.dark{background:#18181b;color:#f4f4f5}h1{font:600 18px/24px system-ui;margin:0 0 8px}p{margin:0 0 16px}article{display:grid;grid-template-columns:150px 210px 160px 340px;border-top:1px solid #8885;min-height:168px}section{padding:8px;display:flex;flex-direction:column;justify-content:center;gap:8px}.row{display:flex;align-items:center;gap:12px;height:52px}.source-row{height:28px}.row small{width:48px;flex-shrink:0}svg{display:block;flex-shrink:0}.source{display:inline-flex;flex-shrink:0}.source svg{width:100%;height:100%}.label{overflow-wrap:anywhere}.low{color:#71717a}.dark .low{color:#a1a1aa}.contexts{display:flex;gap:24px;margin-top:20px}.context{display:flex;align-items:center;gap:8px}`;
let rows='';
for(const name of names){
  let sources='';
  for(const ref of refs.filter(r=>r.name===name)){
    const svg=await referenceMarkup(ref);
    sources+=`<small>${ref.library} · ${ref.match??'exact'}</small><div class="row source-row">${[16,20,24,48].map(s=>`<span class="source" style="width:${s}px;height:${s}px">${svg}</span>`).join('')}</div>`;
  }
  const d=definitions[name],b=baseline[name];
  rows+=`<article><section class="label"><b>${name}</b></section><section>${sources}</section><section>${b?`<div class="row">${[16,20,24].map(s=>glyph(b,s)).join('')}</div>${glyph(b,24,'soft',48)}`:'New — no previous master'}<small>Task-start baseline</small></section><section>${d?['sharp','soft','rounded'].map(c=>`<div class="row"><small>${c}</small>${[16,20,24].map(s=>glyph(d,s,c)).join('')}${glyph(d,24,c,48)}</div>`).join('')+'<div class="row low">'+glyph(d,16)+'<span style="font-size:14px">移動 Move</span>'+glyph(d,20)+'<span style="font-size:16px">方向</span>'+glyph(d,24)+'<span style="font-size:18px">24px</span></div>':'Not drawn'}</section></article>`;
}
const html=`<!doctype html><meta charset="utf-8"><title>Navigation ${batch} ${stage}</title><style>${css}</style><h1>${batch} · ${stage}</h1><p>Sources: original viewBox/strokes at CSS 16 / 20 / 24; 48px diagnostic. Master: native 16 / 20 / 24, 24 at 2×; before is soft. Low-contrast text: 14 / 16 / 18px.</p>${rows}`;
await writeFile(`${out}/review.html`,html);
const browser=await chromium.launch();
try{for(const dpr of [1,2]){
  const page=await browser.newPage({viewport:{width:892,height:900},deviceScaleFactor:dpr});
  await page.setContent(html);
  for(const theme of ['light','dark']){
    await page.evaluate(t=>document.body.className=t,theme);
    await page.screenshot({path:`${out}/${theme}-${dpr}x.png`,fullPage:true});
  }
  await page.close();
}}finally{await browser.close();}
console.log(out);
