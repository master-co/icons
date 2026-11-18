// Compare the frozen previous outline with actual package output, at native sizes.
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {chromium} from '@playwright/test';
import {renderSvg} from '../packages/icons/src/runtime.mjs';
const folder='docs/review/brand-outline-craft-02';
await mkdir(`${folder}/screenshots`,{recursive:true});
const defs=JSON.parse(await readFile('packages/icons/dist/definitions.json'));
const before=JSON.parse(await readFile(`${folder}/before/definitions.json`));
const manifest=JSON.parse(await readFile('references/brand-outlines/authoring/manifest.json'));
const labels=Object.fromEntries(JSON.parse(await readFile('packages/icons/src/brands.json')).map(b=>[b.name,b.label]));
const sizes=[16,20,24],glyph=(name,size)=>renderSvg(defs[name],{size});
const groups=[['wechat','discord'],['github','gitlab','mastodon','reddit'],['youtube','spotify','soundcloud','telegram','line'],['facebook','linkedin','pinterest'],['tiktok','twitch','vimeo','patreon']];
const row=(label,body)=>`<div class="row"><small>${label}</small>${sizes.map(size=>`<div>${body(size)}</div>`).join('')}</div>`;
const batches=groups.map((names,i)=>`<article id="batch-${i+1}"><h1>曲線與比例 · ${i+1}/5</h1><p class="intro">每列依序為原生 16／20／24 px；右側 64px 只檢查曲線。採用稿為套件實際輸出。</p><div class="grid">${names.map(name=>{
 const item=manifest.find(m=>m.name===name),id='brand-'+name,outline=id+'-outline';
 return `<section><h2>${labels[id]}</h2><div class="comparison"><div>${row('原標誌',s=>glyph(id,s))}${row('前稿',s=>renderSvg(before[outline],{size:s}))}${row('採用',s=>glyph(outline,s))}</div><div class="diagnostic">${glyph(id,24)}${glyph(outline,24)}</div></div><p><b>修正：</b>${item.defect}</p><p>${item.observation}</p><div class="labels muted">${sizes.map(s=>`<span>${glyph(outline,s)} ${labels[id]}</span>`).join('')}</div></section>`;
 }).join('')}</div></article>`).join('');
const overview=`<article id="overview"><h1>18 個品牌線條版本 · 曲線與比例精修</h1><p class="intro">原標誌保留為預設，同一張品牌卡切換線條版。Master 依使用者最新決定，只提供原標誌。</p><div class="overview">${manifest.map(item=>`<div>${glyph('brand-'+item.name+'-outline',24)}<span>${labels['brand-'+item.name]}</span></div>`).join('')}</div></article>`;
const social=[['通訊聯絡',['wechat','telegram','whatsapp','line']],['作品集',['instagram','dribbble','github','ko-fi']],['Master 專案',['master','github','gitlab']],['社群檔案',['facebook','linkedin','mastodon','reddit','discord','bluesky']],['影片與音樂',['youtube','tiktok','twitch','vimeo','spotify','soundcloud']],['收藏與支持',['pinterest','patreon','ko-fi']]];
const scenes=social.map(([title,names])=>`<section><h2>${title}</h2>${sizes.map(size=>`<div class="scene"><small>${size}px 原版</small>${names.map(n=>glyph('brand-'+n,size)).join('')}</div><div class="scene"><small>${size}px 採用</small>${names.map(n=>glyph(defs['brand-'+n+'-outline']?'brand-'+n+'-outline':'brand-'+n,size)).join('')}</div>`).join('')}</section>`).join('');
const style=`*{box-sizing:border-box}body{font:13px/1.5 system-ui;color:#27272a;background:#fafafa;margin:0}article{padding:28px;width:1040px;max-width:100%}h1{font-size:22px;margin:0 0 6px}h2{font-size:15px;margin:0 0 8px}.intro{margin:0 0 24px;color:#62626a}.grid{display:grid;grid-template-columns:1fr 1fr;gap:28px}section{border-bottom:1px solid #8885;padding-bottom:16px}.comparison{display:flex;gap:24px;align-items:center}.row{display:flex;align-items:center;gap:24px;min-height:36px}.row small{width:42px}.row>div{width:24px;display:flex;justify-content:center}.row svg{flex:none}.diagnostic{display:flex;gap:12px}.diagnostic svg{width:64px;height:64px}p{font-size:12px;max-width:80ch;margin:10px 0 0}.overview{display:grid;grid-template-columns:repeat(6,1fr);gap:32px 20px;padding:12px 0}.overview>div{display:flex;align-items:center;gap:10px}.scenes{display:grid;grid-template-columns:1fr 1fr;gap:24px}.scene{display:flex;align-items:center;gap:16px;height:40px}.scene small{min-width:70px}.scene svg{flex:none}footer{padding:28px}a{color:inherit}.labels{display:flex;gap:24px;align-items:center;margin-top:20px}.labels span{display:flex;gap:8px;align-items:center}.muted{opacity:.55}@media(prefers-color-scheme:dark){body{background:#18181b;color:#f4f4f5}.intro{color:#aaaab4}}`;
const html=`<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Master 品牌線條版 · 第二輪精修</title><style>${style}</style>${overview}${batches}<article id="scenes"><h1>實際連結列</h1><p class="intro">相同按鈕間距與尺寸；保留原標誌的品牌直接混排。Master 未製作公開線條版本。</p><div class="scenes">${scenes}</div><h2 style="margin-top:24px">Telegram 與一般傳送</h2><div class="labels">${sizes.map(s=>`<span>${glyph('brand-telegram-outline',s)}${glyph('send',s)} ${s}px</span>`).join('')}</div></article><footer><a href="decisions.md">逐顆修正與檢查紀錄</a> · <a href="../brand-outlines/social.html">前一輪審稿</a><p>這是 Master 的圖示詮釋，並非品牌官方核准素材。線條以固定墨形輸出；全站角型與筆畫設定不改變品牌幾何。</p></footer></html>`;
await writeFile(`${folder}/index.html`,html);
const browser=await chromium.launch();
try{
 for(const theme of ['light','dark'])for(const dpr of [1,2]){
  const page=await browser.newPage({viewport:{width:1040,height:900},deviceScaleFactor:dpr,colorScheme:theme});
  await page.goto(pathToFileURL(resolve(folder,'index.html')).href);
  const fragments=await page.locator('article').evaluateAll(articles=>Object.fromEntries(articles.map(a=>[a.id,a.outerHTML])));
  for(const id of ['overview',...groups.map((_,i)=>`batch-${i+1}`),'scenes']){
   // Render each sheet in isolation; tall preceding sheets must not affect the clip.
   await page.setContent(`<html lang="zh-Hant"><meta charset="utf-8"><style>${style}</style>${fragments[id]}</html>`);
   await page.evaluate(()=>document.fonts.ready);
   await page.locator('#'+id).screenshot({path:`${folder}/screenshots/${id}-${theme}-${dpr}.png`});
  }
  await page.close();
 }
}finally{await browser.close()}
console.log('Rendered 18 brands, five comparison batches and six link rows at DPR 1/2 in light/dark.');
