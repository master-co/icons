// Source-preserving comparison only. The reviewer records aesthetic decisions
// separately after opening these images; rendering never grants approval.
import {readFile,writeFile,mkdir,readdir,access} from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {draw} from '../packages/icons/src/drawings.mjs';
import {context} from '../packages/icons/src/geometry.mjs';
import {renderSvg} from '../packages/icons/src/runtime.mjs';
import {reference} from './lib/atlas-reference.mjs';
const [batch,...names]=process.argv.slice(2);
if(!batch||!names.length||names.length>12)throw Error('Use a named batch and 1–12 icons');
const root=`docs/review/atlas-recompare-01/${batch}`;
try{await access(root);throw Error('Evidence exists; use a new candidate name');}catch(e){if(e.code!=='ENOENT')throw e;}
const before=JSON.parse(await readFile('references/atlas-recompare-01/master-before.json'));
const entries=[];
for(const file of await readdir('packages/icons/src/atlas'))if(/^\d.*\.mjs$/.test(file))entries.push(...(await import(`../packages/icons/src/atlas/${file}`)).batch);
const definitions={},sources=[],renders=[];
const glyph=(def,s,c,display=s)=>renderSvg(def,{size:display,opticalSize:s,corner:c});
await mkdir(root,{recursive:true});
for(const name of names){
 const entry=entries.find(e=>e.name===name);
 if(!entry||!before[name])throw Error('Outside fixed task scope: '+name);
 const def={name,variants:Object.fromEntries([16,20,24].map(s=>[s,Object.fromEntries(['sharp','soft','rounded'].map(c=>[c,{nodes:draw(name,context(s,c)),strokeWidth:context(s,c).stroke}]))]))};
 definitions[name]=def;
 const refs=await Promise.all([reference(name,entry.referenceA,'lucide'),reference(name,entry.referenceB,'tabler')]);
 sources.push(...refs.map(r=>r.record));
 const html=`<!doctype html><meta charset="utf-8"><title>${batch}: ${name}</title><style>
 *{box-sizing:border-box}body{margin:0;padding:24px;font:14px/20px system-ui;background:#fafafa;color:#27272a}body.dark{background:#18181b;color:#f4f4f5}
 h1{font-size:18px;margin:0 0 8px}h2{font-size:14px;margin:0 0 8px}p{margin:0 0 16px}small{font-size:11px}
 svg{display:block;flex-shrink:0}.sources{display:flex;gap:32px;margin-bottom:24px}.source{width:480px}.strip{display:flex;align-items:center;gap:24px;height:64px}
 .masters{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}.native{display:grid;grid-template-columns:40px 40px 40px 40px 40px;align-items:center;gap:16px;height:48px}.heading{height:24px}
 .zoom{display:flex;align-items:center;gap:32px;margin-top:16px}.zoom>div{display:flex;align-items:center;gap:12px}.context{display:flex;align-items:center;gap:16px;opacity:.55;height:44px}
 </style><h1>${name} · ${entry.label} · ${batch}</h1><p>Sources retain original geometry/strokes. A = task-start drawing; B = current candidate.</p>
 <div class="sources">${refs.map(r=>`<section class="source"><h2>${r.record.library} · ${r.record.sourceName} · ${r.record.match}</h2><div class="strip">${[16,20,24,48].map(s=>r.svg(s)).join('')}<small>16 / 20 / 24 / 48 CSS px</small></div></section>`).join('')}</div>
 <div class="masters">${['sharp','soft','rounded'].map(c=>`<section><h2>${c}</h2><div class="native heading"><small>px</small><small>Src 1</small><small>Src 2</small><small>A</small><small>B</small></div>${[16,20,24].map(s=>`<div class="native"><small>${s}</small>${refs[0].svg(s)}${refs[1].svg(s)}${glyph(before[name],s,c)}${glyph(def,s,c)}</div>`).join('')}</section>`).join('')}</div>
 <div class="zoom"><div><small>A · 24 × 4</small>${glyph(before[name],24,'soft',96)}</div><div><small>B · 24 × 4</small>${glyph(def,24,'soft',96)}</div><div><small>B · 16 × 4</small>${glyph(def,16,'soft',64)}</div><div><small>B sharp · 24 × 4</small>${glyph(def,24,'sharp',96)}</div></div>
 <div class="context">${[16,20,24].map(s=>`<span>${glyph(def,s,'soft')}</span><span style="font-size:${s===16?14:s===20?16:18}px">${entry.label} Project</span>`).join('')}<small>55%</small></div>`;
 renders.push({name,html});await writeFile(`${root}/${name}.html`,html);
}
await writeFile(`${root}/definitions.json`,JSON.stringify(definitions,null,2)+'\n');
await writeFile(`${root}/sources.json`,JSON.stringify(sources,null,2)+'\n');
const browser=await chromium.launch();
try{for(const {name,html} of renders)for(const dpr of [1,2]){
 const page=await browser.newPage({viewport:{width:1080,height:580},deviceScaleFactor:dpr});await page.setContent(html);
 const bad=await page.locator('.native svg').evaluateAll(nodes=>nodes.filter(n=>{const r=n.getBoundingClientRect();return r.width!==+n.getAttribute('width')||r.height!==+n.getAttribute('height')||r.x*devicePixelRatio%1||r.y*devicePixelRatio%1}).length);
 if(bad)throw Error(`${name}: ${bad} native glyphs off grid or scaled`);
 for(const theme of ['light','dark']){
  await page.evaluate(t=>document.body.className=t,theme);
  await page.screenshot({path:`${root}/${name}-${theme}-${dpr}x.png`,fullPage:true});
  await page.locator('.masters').screenshot({path:`${root}/${name}-native-${theme}-${dpr}x.png`});
 }
 await page.close();
}}finally{await browser.close();}
console.log(root);
