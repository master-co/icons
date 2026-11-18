import {readFile,writeFile} from 'node:fs/promises';
import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import {renderSvg} from '../packages/icons/src/runtime.mjs';
const root='docs/review/navigation-01';
const groups=JSON.parse(await readFile(`${root}/scope.json`));
groups['04-motion']=groups['04-motion'].filter(name=>!name.startsWith('arrow-big-'));
groups['05-wide-arrows']=['arrow-big-up','arrow-big-right','arrow-big-down','arrow-big-left'];
const defs=JSON.parse(await readFile('packages/icons/dist/definitions.json'));
const controls=[['arrow-up-to-line','移到頂端','first'],['chevrons-up','向上翻頁','page-up'],['chevron-up','向上逐行','up'],['chevron-down','向下逐行','down'],['chevrons-down','向下翻頁','page-down'],['arrow-down-to-line','移到底端','last']];
const names=Object.values(groups).flat();
const svgs=Object.fromEntries(names.map(name=>[name,Object.fromEntries([16,20,24].flatMap(size=>['sharp','soft','rounded'].map(corner=>[`${size}-${corner}`,renderSvg(defs[name],{size,corner})])))]));
const html=`<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Navigation · 方向與移動</title><style>
*{box-sizing:border-box}body{margin:0;background:#fafafa;color:#27272a;font:14px/20px system-ui}body.dark{background:#18181b;color:#f4f4f5}main{max-width:960px;padding:32px;margin:auto}h1{line-height:36px;font-size:28px;font-weight:550;margin:0 0 8px}h2{line-height:24px;font-size:15px;margin:24px 0 12px}.muted,small{color:#71717a}.dark .muted,.dark small{color:#a1a1aa}.settings{display:flex;gap:18px;align-items:center;margin:20px 0}select,button{font:inherit;color:inherit;background:transparent;border:1px solid #8885;border-radius:6px;padding:6px 10px}button{cursor:pointer}button:hover{background:#8882}button:disabled{opacity:.35;cursor:default}.panel{border:1px solid #8884;border-radius:8px;padding:16px}.actions{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}.actions button{display:flex;gap:6px;align-items:center;height:36px;width:126px}.glyph{display:flex;align-items:center;justify-content:center;flex-shrink:0}svg{display:block;flex-shrink:0}.log{font:12px/24px ui-monospace,monospace;height:144px;overflow:hidden}.log div{display:flex;gap:16px}.log small{width:30px}.grid{display:grid;grid-template-columns:repeat(auto-fit,104px);gap:8px}.card{border:1px solid #8883;border-radius:6px;padding:10px 4px;text-align:center}.card .glyph{height:32px}.card small{display:block;font:10px/14px ui-monospace,monospace;overflow-wrap:anywhere;min-height:28px;margin-top:6px}nav{margin-top:24px;display:flex;flex-wrap:wrap;gap:16px}a{color:inherit}@media(max-width:700px){main{padding:20px}.actions button{font-size:12px}}
</style><main><h1>Navigation</h1><div class="muted">方向與移動 · 原生尺寸審稿</div><div class="settings"><label>尺寸 <select id="size"><option>16</option><option>20</option><option>24</option></select></label><label>角型 <select id="corner"><option>soft</option><option>sharp</option><option>rounded</option></select></label><button id="theme">切換明暗</button></div>
<h2>紀錄檢視器</h2><p class="muted">逐行、逐頁與移到邊界同時出現；雙折角保留「跨一頁」的差異。</p><section class="panel"><div class="actions">${controls.map(([name,label,action])=>`<button data-action="${action}"><span class="glyph" data-icon="${name}"></span>${label}</button>`).join('')}</div><div class="log" id="log"></div><small id="position" aria-live="polite"></small></section>
${Object.entries(groups).map(([batch,names])=>`<h2>${({'01-arrows':'八向箭頭','02-chevrons':'單折角與逐頁雙折角','03-boundaries':'邊界與雙向選擇器','04-motion':'伸縮與交換','05-wide-arrows':'四向寬箭頭'})[batch]}</h2><div class="grid">${names.map(name=>`<div class="card"><span class="glyph" data-icon="${name}"></span><small>${name}</small></div>`).join('')}</div>`).join('')}
<nav>${Object.keys(groups).map(batch=>`<a href="${batch==='05-wide-arrows'?'../navigation-big-01/01-wide-arrows-final':batch+'-final'}/review.html">${batch} 來源對照</a>`).join('')}<a href="native/review.html">原生檢查</a></nav><p class="muted">AI 輔助製作與目視檢查；維護者尚未定案。寬箭頭四向固定，導覽箭頭遵循既有 RTL 政策。</p></main>
<script>(()=>{const svgs=${JSON.stringify(svgs)};const size=document.querySelector('#size'),corner=document.querySelector('#corner');function paint(){for(const node of document.querySelectorAll('[data-icon]'))node.innerHTML=svgs[node.dataset.icon][size.value+'-'+corner.value]}size.onchange=corner.onchange=paint;document.querySelector('#theme').onclick=()=>document.body.classList.toggle('dark');let start=24;const count=60,visible=6;function log(){document.querySelector('#log').innerHTML=Array.from({length:visible},(_,i)=>'<div><small>'+String(start+i+1).padStart(2,'0')+'</small><span>專案紀錄 · 已儲存變更</span></div>').join('');document.querySelector('#position').textContent=(start+1)+'–'+(start+visible)+' / '+count;for(const b of document.querySelectorAll('[data-action]'))b.disabled=(['first','up','page-up'].includes(b.dataset.action)?start===0:start===count-visible)}for(const b of document.querySelectorAll('[data-action]'))b.onclick=()=>{start=Math.max(0,Math.min(count-visible,({first:0,last:count-visible,up:start-1,down:start+1,'page-up':start-visible,'page-down':start+visible})[b.dataset.action]));log()};paint();log();})();</script></html>`;
await writeFile(`${root}/index.html`,html);
const browser=await chromium.launch();
try{for(const dpr of [1,2]){
  const page=await browser.newPage({viewport:{width:960,height:1100},deviceScaleFactor:dpr});await page.setContent(html);
  for(const [action,expected] of [['page-down','31–36 / 60'],['down','32–37 / 60'],['page-up','26–31 / 60'],['up','25–30 / 60'],['first','1–6 / 60'],['last','55–60 / 60']]){
    await page.locator(`[data-action="${action}"]`).click();assert.equal(await page.locator('#position').textContent(),expected);
  }
  await page.setContent(html);
  assert.equal(await page.locator('svg').count(),names.length+controls.length,'All context and overview icons rendered');
  assert.equal(await page.locator('#position').textContent(),'25–30 / 60');
  for(const theme of ['light','dark']){
    await page.evaluate(t=>document.body.className=t,theme);
    await page.screenshot({path:`${root}/context-wide-${theme}-${dpr}x.png`,fullPage:true});
  }
  for(const size of [16,20,24])for(const corner of ['sharp','soft','rounded']){
    await page.selectOption('#size',String(size));await page.selectOption('#corner',corner);
    const wrong=await page.locator('svg').evaluateAll((nodes,size)=>nodes.filter(n=>n.getBoundingClientRect().width!==size||n.getBoundingClientRect().height!==size||n.getBoundingClientRect().x%1||n.getBoundingClientRect().y%1).length,size);
    assert.equal(wrong,0,'Native CSS sizes in the usage context');
  }
  await page.close();
}}finally{await browser.close();}
console.log('Offline navigation overview and scroll-context checks complete.');
