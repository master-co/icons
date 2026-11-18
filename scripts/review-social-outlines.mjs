import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {chromium} from '@playwright/test';
import {renderSvg} from '../packages/icons/src/runtime.mjs';
const folder='docs/review/brand-outlines';
await mkdir(`${folder}/social`,{recursive:true});
const defs=JSON.parse(await readFile('packages/icons/dist/definitions.json'));
const manifest=JSON.parse(await readFile('references/brand-outlines/authoring/manifest.json'));
const labels=Object.fromEntries(JSON.parse(await readFile('packages/icons/src/brands.json')).map(b=>[b.name,b.label]));
const sizes=[16,20,24];
const samples=manifest.some(item=>item.name==='wechat')?manifest:[{name:'wechat',observation:'TDesign 雙氣泡線條版。'},...manifest];
const glyph=(name,size)=>renderSvg(defs[name],{size});
const candidate=async name=>{
 const paths=name==='wechat'?['references/brand-outlines/wechat.svg']:name==='telegram'?[`${folder}/telegram-round-nose.svg`]:[`${folder}/candidates/social-v1/${name}.svg`,`${folder}/candidates/social-v1/${name}-v2.svg`];
 for(const path of paths)try{return await readFile(path,'utf8')}catch{}
};
const svgAt=(svg,size)=>svg.replace(/<\?xml[^>]*>/g,'').replace(/\s(?:width|height)="[^"]+"/g,'').replace(/<svg\b/,`<svg width="${size}" height="${size}" `).replace(/fill="black"/g,'fill="currentColor"');
const row=(label,body)=>`<div class="row"><small>${label}</small>${sizes.map(body).join('')}</div>`;
let batches='';
for(let group=0;group<2;group++){
 let cards='';
 for(const item of samples.slice(group*9,group*9+9)){
  const draft=await candidate(item.name);
  cards+=`<section><h2>${labels['brand-'+item.name]}</h2>${row('原標誌',size=>glyph('brand-'+item.name,size))}${draft?row('前稿',size=>svgAt(draft,size)):''}${row('採用',size=>glyph('brand-'+item.name+'-outline',size))}<p>${item.observation}</p></section>`;
 }
 batches+=`<article class="batch" id="batch-${group+1}"><h1>社群線條版 · ${group+1}/2</h1><p class="intro">每列由左至右為原生 16／20／24 px。前稿保留當時的佔幅；採用稿為套件實際輸出。</p><div class="grid">${cards}</div></article>`;
}
const social=[
 ['通訊聯絡',['wechat','telegram','whatsapp','line']],
 ['作品集',['instagram','dribbble','github','ko-fi']],
 ['Master 專案',['master','github','gitlab']],
 ['社群檔案',['facebook','linkedin','mastodon','reddit','discord','bluesky']],
 ['影片與音樂',['youtube','tiktok','twitch','vimeo','spotify','soundcloud']],
 ['收藏與支持',['pinterest','patreon','ko-fi']],
];
const scenes=social.map(([title,names])=>`<section><h2>${title}</h2>${sizes.map(size=>`<div class="scene"><small>${size}px 原版</small>${names.map(name=>glyph('brand-'+name,size)).join('')}</div><div class="scene"><small>${size}px 採用</small>${names.map(name=>glyph(defs['brand-'+name+'-outline']?'brand-'+name+'-outline':'brand-'+name,size)).join('')}</div>`).join('')}</section>`).join('');
const overview=`<article id="overview"><h1>18 個品牌線條版本</h1><p class="intro">保留原標誌，同一張品牌卡切換。</p><div class="overview">${samples.map(item=>`<div>${glyph('brand-'+item.name+'-outline',24)}<span>${labels['brand-'+item.name]}</span></div>`).join('')}</div></article>`;
const style=`*{box-sizing:border-box}body{font:13px/1.5 system-ui;color:#27272a;background:#fafafa;margin:0}article{padding:24px;max-width:1100px}h1{font-size:22px;margin:0 0 6px}h2{font-size:15px;margin:0 0 6px}.intro{margin:0 0 20px;color:#62626a}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px 24px}section{border-bottom:1px solid #8885;padding-bottom:12px}.row{display:flex;align-items:center;gap:28px;min-height:36px}.row small{width:54px}.row svg{flex:none}p{font-size:12px;max-width:80ch;margin:10px 0 0}.overview{display:grid;grid-template-columns:repeat(6,1fr);gap:28px}.overview>div{display:flex;align-items:center;gap:10px}.scenes{display:grid;grid-template-columns:1fr 1fr;gap:24px}.scene{display:flex;align-items:center;gap:16px;height:40px}.scene small{min-width:70px}.scene svg{flex:none}footer{padding:24px}a{color:inherit}.labels{display:flex;gap:24px;align-items:center;margin-top:20px}.labels span{display:flex;gap:8px;align-items:center}@media(prefers-color-scheme:dark){body{background:#18181b;color:#f4f4f5}.intro{color:#aaaab4}}`;
const html=`<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Master 社群品牌線條版</title><style>${style}</style>${overview}${batches}<article id="scenes"><h1>實際連結列</h1><p class="intro">各排使用一致尺寸與間距；已有線條感或保留原標誌的品牌直接混排。</p><div class="scenes">${scenes}</div><div class="labels">${['github','telegram','line','youtube'].map(name=>`<span>${glyph('brand-'+name+'-outline',16)} ${labels['brand-'+name]}</span>`).join('')}</div><h2 style="margin-top:20px">Telegram 與一般傳送</h2><div class="labels">${sizes.map(size=>`<span>${glyph('brand-telegram-outline',size)}${glyph('send',size)} ${size}px</span>`).join('')}</div></article><footer><a href="decisions.md">每個品牌的收錄理由</a> · <a href="index.html">第一階段候選與 Master 退稿</a><p>線條圖為第三方圖庫或 Master 的圖示詮釋。原標誌保留為預設；所有版本共用一張品牌卡。</p></footer></html>`;
await writeFile(`${folder}/social.html`,html);
const browser=await chromium.launch();
try{
 for(const theme of ['light','dark'])for(const dpr of [1,2]){
  const page=await browser.newPage({viewport:{width:1100,height:900},deviceScaleFactor:dpr,colorScheme:theme});
  await page.goto(pathToFileURL(resolve(folder,'social.html')).href);
  for(const id of ['overview','batch-1','batch-2','scenes'])await page.locator('#'+id).screenshot({path:`${folder}/social/${id}-${theme}-${dpr}.png`});
  await page.close();
 }
}finally{await browser.close()}
