// Source-preserving review sheets; this script never assigns visual approval.
import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {comparisonReferences} from './lib/review-data.mjs';
import {draw} from '../packages/icons/src/drawings.mjs';
import {context} from '../packages/icons/src/geometry.mjs';
import {renderSvg} from '../packages/icons/src/runtime.mjs';

const [batch, list] = process.argv.slice(2);
if (!batch || !list) throw new Error('Usage: node scripts/review-committed-craft.mjs BATCH NAME,NAME');
const names = list.split(',');
const root = 'docs/review/committed-craft-01';
const before = JSON.parse(await readFile('references/committed-craft-01/master-before.json'));
for (const name of names) if (!before[name]) throw new Error(`Outside committed scope: ${name}`);
const refs = (await comparisonReferences()).references.filter(r => names.includes(r.name));
const out = `${root}/${batch}`;
await mkdir(out, {recursive:true});
await writeFile(`${out}/sources.json`, JSON.stringify(refs,null,2)+'\n');
const definitions = Object.fromEntries(names.map(name => [name, {name, variants:Object.fromEntries([16,20,24].map(s => [s,Object.fromEntries(['sharp','soft','rounded'].map(c => [c,{nodes:draw(name,context(s,c)),strokeWidth:context(s,c).stroke}]))]))}]));
await writeFile(`${out}/definitions.json`,JSON.stringify(definitions,null,2)+'\n');
const glyph = (def,s,c='soft',display=s) => renderSvg(def,{size:display,opticalSize:s,corner:c});
const css = `*{box-sizing:border-box}body{margin:0;padding:16px;color:#27272a;background:#fafafa;font:12px system-ui}h1{font-size:18px}article{display:grid;grid-template-columns:130px 230px 115px 300px 300px;border-top:1px solid #ccc;min-height:166px}section{padding:10px;display:flex;flex-direction:column;justify-content:center;gap:10px}svg{flex-shrink:0}.row{display:flex;align-items:center;gap:18px;min-height:26px}.row small{width:48px;font-size:10px}.source svg{width:100%;height:100%}.source{display:inline-flex;flex-shrink:0}.dark{background:#18181b;color:#f4f4f5}.low{opacity:.55}.label{overflow-wrap:anywhere}`;
const browser = await chromium.launch();
try {
 for(let offset=0;offset<names.length;offset+=6){
  let rows='';
  for(const name of names.slice(offset,offset+6)){
   let sources='';
   for(const r of refs.filter(r=>r.name===name)){
    const svg=(await readFile(r.localPath,'utf8')).replace(/<!--[\s\S]*?-->/g,'');
    sources+=`<small>${r.library} · ${r.sourceName} (${r.match})</small><div class="row">${[16,20,24,48].map(s=>`<span class="source" style="width:${s}px;height:${s}px">${svg}</span>`).join('')}</div>`;
   }
   const def=definitions[name];
   const matrix=dark=>`<section class="${dark?'dark':''}">${['sharp','soft','rounded'].map(c=>`<div class="row"><small>${c}</small>${[16,20,24].map(s=>glyph(def,s,c)).join('')}${glyph(def,24,c,48)}</div>`).join('')}<div class="row low">${glyph(def,16)}<span>專案 Project · 55%</span></div></section>`;
   rows+=`<article><section class="label"><b>${name}</b></section><section>${sources}</section><section>${glyph(before[name],16)}${glyph(before[name],24,'soft',48)}<small>Task-start baseline</small></section>${matrix(false)}${matrix(true)}</article>`;
  }
  const html=`<!doctype html><meta charset="utf-8"><title>${batch}</title><style>${css}</style><h1>${batch} · ${offset+1}–${Math.min(offset+6,names.length)}</h1><p>Sources: original strokes / viewBox at 16,20,24,48 CSS px. Master: 16,20,24 native + 24 at 2× diagnosis. Light / dark / 55% text.</p>${rows}`;
  const stem=`${out}/${1+offset/6}`;
  await writeFile(`${stem}.html`,html);
  for(const dpr of [1,2]){
   const page=await browser.newPage({viewport:{width:1107,height:1000},deviceScaleFactor:dpr});
   await page.setContent(html);
   await page.screenshot({path:`${stem}-dpr${dpr}.png`,fullPage:true});
   await page.close();
  }
 }
} finally {await browser.close();}
console.log(out);
