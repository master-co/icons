import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';
import { renderSvg } from '../packages/icons/src/runtime.mjs';

const folder = 'docs/review/brand-outlines';
const definitions = JSON.parse(await readFile('packages/icons/dist/definitions.json'));
const sizes = [16, 20, 24];
const samples = {};
for (const file of ['master-perimeter', 'master-fold', 'master-ribbon', 'telegram-circle-refined', 'telegram-round-nose', 'telegram-circle', 'telegram-plane']) {
  samples[file] = await readFile(`${folder}/${file}.svg`, 'utf8');
}
const wechat = (await readFile('references/brand-outlines/wechat.svg', 'utf8')).replace('fill="black"', 'fill="currentColor"');
function glyph(name, size) {
  if (name === 'telegram-source') return `<img alt="Telegram" width="${size}" height="${size}" src="../../../references/brand-outlines/telegram-official.svg">`;
  if (samples[name]) return samples[name].replace('<svg ', `<svg width="${size}" height="${size}" `);
  if (name === 'wechat-source') return wechat.replace('width="24" height="24"', `width="${size}" height="${size}"`);
  if (name === 'wechat-fit') {
    const extent = {16:15, 20:18, 24:21}[size];
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><g transform="translate(${(size-extent)/2} ${(size-extent)/2}) scale(${extent/24})">${wechat}</g></svg>`;
  }
  return renderSvg(definitions[name], { size });
}
function row(title, names, captions = false) {
  return `<tr><th>${title}</th>${sizes.map(size => `<td><div>${names.map(name => `<span>${glyph(name,size)}${captions ? '<small>'+(name === 'brand-wechat-outline' ? 'WeChat' : 'Telegram')+'</small>' : ''}</span>`).join('')}</div></td>`).join('')}</tr>`;
}
const table = rows => `<table><thead><tr><th></th>${sizes.map(s=>`<th>${s} px</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table>`;
const wechatFinal = 'brand-wechat-outline';
const groups = [
  ['WeChat', '收錄線條版', '雙氣泡沿用騰訊圖稿。16px 的兩側各留 1px，眼點與前後氣泡之間仍有空隙。', [
    ['預設 · 單色','brand-wechat'], ['TDesign 來源','wechat-source'], ['試稿 · 寬 15／18／21','wechat-fit'], ['採用 · 寬 14／18／21',wechatFinal]]],
  ['Telegram', '採用原標誌', '獨立機身易讀成「傳送」。圓框稿保住身份，但 16px 的機尾和折線仍較原標誌擁擠。', [
    ['官方圖稿','telegram-source'], ['採用 · 單色','brand-telegram'], ['退稿 · 獨立紙飛機','telegram-plane'], ['對照 · 傳送','send'], ['退稿 · 圓框','telegram-circle'], ['退稿 · 減細折線','telegram-circle-refined'], ['退稿 · 圓鼻與弧翼','telegram-round-nose']]],
  ['Master', '採用原標誌', '原標誌的中央帶面下折，兩翼的弧底向外展開。封閉輪廓讓帶面變空；後兩稿把翼面拆成短鉤，丟失原形。', [
    ['採用 · 原標誌','brand-master'], ['退稿 · 完整輪廓','master-perimeter'], ['退稿 · 折面節線','master-fold'], ['退稿 · 放開接縫','master-ribbon']]],
  ['Snapchat', '沿用既有項目', '官方淺底 Ghost 有白色內部與黑框；深底另有白框用法。詳見下方官方素材入口。', [
    ['現有 · 單色','brand-snapchat']]],
];
const article = groups.map(([name, decision, note, entries]) => `<section><h2>${name} <small>${decision}</small></h2><p>${note}</p>${table(entries.map(([title,id])=>row(title,[id])))}</section>`).join('');
const contact = ['brand-wechat','brand-telegram','brand-whatsapp','brand-line'];
const scenes = table([
  row('通訊 · 修改前',contact),
  row('通訊 · 採用',[wechatFinal,...contact.slice(1)]),
  row('作品集 · 採用',['brand-instagram','brand-dribbble','brand-github','brand-ko-fi']),
  row('專案頁尾 · 採用',['brand-master','brand-github']),
  row('連結文字',[wechatFinal,'brand-telegram'],true)
]);
const style = `*{box-sizing:border-box}body{margin:0;padding:24px;font:14px/1.4 system-ui;color:#252528;background:#fafafa}h1{font-size:22px;margin:0 0 12px}h2{font-size:15px;margin:0}main{display:grid;grid-template-columns:1fr 1fr;gap:16px}table{border-collapse:collapse;width:100%;table-layout:fixed}th{text-align:left;font-size:11px;font-weight:500}thead{color:#666}td,th{height:32px;border-bottom:1px solid #8884}th:first-child{width:29%}td div,td span{display:flex;align-items:center;gap:8px}td span{justify-content:center;min-width:26px}svg{flex:none}small{font-size:12px}h2 small{margin-left:6px;font-weight:400}p{font-size:12px;max-width:54ch;margin:4px 0 8px}article{margin-top:16px}footer{margin-top:20px}a{color:inherit}article th:first-child{width:19%}@media(prefers-color-scheme:dark){body{background:#18181b;color:#f4f4f5}thead{color:#bbb}}`;
const html = `<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>品牌輪廓審稿</title><style>${style}</style><h1>第一階段品牌輪廓審稿</h1><p>此頁保留早期候選；Telegram 已在後續完成新方向。<a href="social.html">查看最新 18 個版本與整排比較</a>。</p><main>${article}</main><article><h2>實際連結列</h2>${scenes}</article><footer><a href="decisions.md">完整收錄理由</a> · <a href="https://help.snapchat.com/hc/en-us/articles/7012349890452-Snapchat-Ghost-Logo-Usage-Guidelines">Snapchat 官方素材</a></footer></html>`;
await writeFile(`${folder}/index.html`, html);
const browser = await chromium.launch();
try {
  for (const theme of ['light','dark']) for (const dpr of [1,2]) {
    const page = await browser.newPage({viewport:{width:900,height:760},deviceScaleFactor:dpr,colorScheme:theme});
    await page.goto(pathToFileURL(resolve(folder,'index.html')).href);
    await page.screenshot({path:`${folder}/${theme}-${dpr}.png`,fullPage:true});
    await page.close();
  }
} finally { await browser.close(); }
