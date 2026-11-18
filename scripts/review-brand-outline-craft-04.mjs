import {brands} from '../packages/icons/src/brands.mjs';
import {renderSvg,strokeRanges} from '../packages/icons/src/runtime.mjs';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
const folder='docs/review/brand-outline-craft-04';
await mkdir(folder+'/screenshots',{recursive:true});
const defs=JSON.parse(await readFile('packages/icons/dist/definitions.json'));
const weighted={};
for(const b of brands.filter(b=>b.styleOf))weighted[b.name]=Object.values(await import(pathToFileURL(resolve(`packages/icons/dist/data/${b.name}.js`)).href))[0];
const old=JSON.parse(await readFile('docs/review/brand-outline-craft-04/before/definitions.json'));
const svg=(b,size,strokeWidth)=>renderSvg(strokeWidth===undefined?defs[b.name]:weighted[b.name],{size,strokeWidth});
const style=`body{margin:0;background:#fafafa;color:#27272a;font:13px system-ui}article{padding:24px;width:960px}h1{font-size:20px}.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}.row{height:40px;display:flex;align-items:center;gap:24px}.row small{width:54px}.large svg{width:64px;height:64px}.large{display:flex;gap:20px}section{border-bottom:1px solid #8885;padding-bottom:14px}svg{flex:none}@media(prefers-color-scheme:dark){body{background:#18181b;color:#fafafa}}`;
const blocks=[];
for(let batch=0;batch<3;batch++)blocks.push(`<article id="batch-${batch+1}"><h1>線寬正規化 · ${batch+1}/3</h1><div class="grid">${brands.filter(b=>b.styleOf).slice(batch*6,batch*6+6).map(b=>`<section><h3>${b.label}</h3><div class="row"><small>前稿</small>${[16,20,24].map(size=>renderSvg(old[b.name],{size})).join('')}</div><div class="row"><small>修正稿</small>${[16,20,24].map(s=>svg(b,s)).join('')}</div>${[16,20,24].map(s=>`<div class="row"><small>${s}px 範圍</small>${[strokeRanges[s][0],undefined,strokeRanges[s][1]].map(w=>svg(b,s,w)).join('')}</div>`).join('')}<div class="large">${renderSvg(old[b.styleOf],{size:24})}${svg(b,24)}</div></section>`).join('')}</div></article>`);
await writeFile(folder+'/index.html',`<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><title>品牌線寬校準</title><style>${style}</style><p style="padding:24px">每列依序為原生 16／20／24 px；範圍列依序為最細／預設／最粗。下方為原標誌與修正稿放大診斷。<a href="decisions.md">逐顆紀錄</a></p>${blocks.join('')}</html>`);
const browser=await chromium.launch();try{for(const theme of ['light','dark'])for(const dpr of [1,2]){const page=await browser.newPage({viewport:{width:1008,height:1000},deviceScaleFactor:dpr,colorScheme:theme});for(let i=0;i<blocks.length;i++){await page.setContent(`<html lang="zh-Hant"><meta charset="utf-8"><style>${style}</style>${blocks[i]}</html>`);await page.evaluate(()=>document.fonts.ready);await page.locator('article').screenshot({path:`${folder}/screenshots/batch-${i+1}-${theme}-${dpr}.png`});}await page.close();}}finally{await browser.close()}
