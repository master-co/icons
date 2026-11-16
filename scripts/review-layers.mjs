// Render evidence only; this script never approves a drawing.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {chromium,webkit} from '@playwright/test';
import {renderSvg} from '../src/runtime.mjs';
const json=async p=>JSON.parse(await readFile(p,'utf8'));
const before=(await json('references/layers-01/master-before.json')).layers;
const definitions=await json('dist/definitions.json');
const current=definitions.layers;
const lucide=await readFile('references/organization-01/lucide-layers.svg','utf8');
const out='docs/review/layers-01';
await mkdir(out,{recursive:true});
const samples=(d,corner='soft')=>[16,20,24,80].map(size=>renderSvg(d,{size,opticalSize:size===80?24:size,corner})).join('');
const css=`*{box-sizing:border-box}body{margin:0;padding:28px;font:14px/1.5 -apple-system,sans-serif;background:#fafafa;color:#27272a}h1{font-size:24px}h2{font-size:14px}p{color:#71717a}.row{display:flex;align-items:center;gap:28px;padding:18px 0;border-top:1px solid #d4d4d8}.row b{width:155px}.source svg{width:100%;height:100%}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.card{padding:20px;border:1px solid #aaa;border-radius:8px}.native{display:flex;gap:20px;align-items:center;margin:18px 0}.low{opacity:.55}.dark{background:#18181b;color:#f4f4f5}.dark p{color:#a1a1aa}`;
const summary=`<!doctype html><meta charset="utf-8"><title>Master layers · 薄片構造精修</title><style>${css}</style><h1>layers · 保留曲線，修正堆疊構造</h1><p>16／20／24px 原生與 80px 診斷。上游保留自身描邊。</p><div class="row"><b>Lucide 原稿</b>${[16,20,24,80].map(size=>`<span class="source" style="width:${size}px;height:${size}px">${lucide}</span>`).join('')}</div><div class="row"><b>Master 修改前</b>${samples(before)}</div><div class="row"><b>Master 修正</b>${samples(current)}</div><p>三層維持共同側邊寬度；下層以短弧回收，與頂層呼應。局部角型不再讓頂層過度內縮。</p>`;
const native=`<!doctype html><meta charset="utf-8"><title>Layers 九組母版</title><style>${css}</style><h1>layers · 三尺寸與三種角型</h1><div class="grid">${['sharp','soft','rounded'].map(c=>`<section class="card"><h2>${c}</h2><div class="native">${[16,20,24].map(size=>renderSvg(current,{size,corner:c})).join('')}</div>${renderSvg(current,{size:80,opticalSize:24,corner:c})}<div class="native">${renderSvg(current,{size:16,corner:c})}圖層 Layers</div><div class="native low">${renderSvg(current,{size:16,corner:c})}次要資訊 55%</div></section>`).join('')}</div><h2>同排情境</h2><div class="native">${['layers','images','copy','folder'].map(n=>renderSvg(definitions[n],{size:20})).join('')}</div>`;
await writeFile(out+'/index.html',summary);await writeFile(out+'/native.html',native);
for(const [name,engine] of [['chromium',chromium],['webkit',webkit]])for(const dpr of [1,2]){
 const browser=await engine.launch(),page=await browser.newPage({viewport:{width:1000,height:600},deviceScaleFactor:dpr});
 for(const [label,html]of [['summary',summary],['native',native]]){
  await page.setContent(html);await page.screenshot({path:`${out}/${label}-${name}-${dpr}x-light.png`,fullPage:true});
  await page.locator('body').evaluate(e=>e.classList.add('dark'));await page.screenshot({path:`${out}/${label}-${name}-${dpr}x-dark.png`,fullPage:true});
 }
 await browser.close();
}
console.log('Layers evidence rendered; review status unchanged.');
