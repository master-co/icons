// Package a reviewable alpha workspace without publishing it.
// Usage: node scripts/package-review.mjs /absolute/output/directory
import{access,cp,mkdir,readFile,readdir,writeFile}from'node:fs/promises';
import{resolve,join,relative,isAbsolute}from'node:path';
import{createHash}from'node:crypto';import{zipSync}from'fflate';
const out=process.argv[2];if(!out||!isAbsolute(out))throw new Error('Provide an absolute output directory.');
await mkdir(out,{recursive:true});
for(const dir of['packages','site','dist','preview','tests','scripts','skills','references','licenses','docs'])await cp(dir,join(out,dir),{recursive:true,filter:source=>!source.split('/').some(part=>['node_modules','.astro','out','public','.categories','test-results','playwright-report'].includes(part))});
for(const file of['package.json','bun.lock','bunfig.toml','.nvmrc','playwright.config.mjs','README.md','LICENSE','THIRD_PARTY_NOTICES.md','.gitignore'])await cp(file,join(out,file));
for(const file of['preview.html','design-system.md','research.md'])await cp('dist/'+file,join(out,file));
await access('work/master-icons-alpha.tgz');await cp('work/master-icons-alpha.tgz',join(out,'master-icons-alpha.tgz'));
async function files(dir){const result=[];for(const e of await readdir(dir,{withFileTypes:true})){if(e.name==='.DS_Store')continue;const p=join(dir,e.name);if(e.isDirectory())result.push(...await files(p));else if(e.isFile())result.push(p);}return result.sort();}
const svg={};for(const p of await files('packages/icons/icons'))svg[p.replace('packages/icons/','')]=await readFile(p);
for(const p of['LICENSE','THIRD_PARTY_NOTICES.md',...await files('licenses')])svg[p.replace('packages/icons/','')]=await readFile(p);
const date=new Date('2026-11-16T00:00:00Z');await writeFile(join(out,'master-icons-all-svg.zip'),zipSync(svg,{level:9,mtime:date}));
const ledger=JSON.parse(await readFile('docs/refinement-ledger.json')),cycle=ledger.reviewCycle;
const handoff=`# Master Icons · ${cycle}

392個命名圖稿、244個基本概念、3,528份SVG。${ledger.reviewSummary}

- [離線圖庫](preview.html)：搜尋、三尺寸、三圓角、明暗、來源原稿及真實修改前版本，含21個情境頁。
- [逐顆報告](docs/review/ui-v1/index.html)：來源、判斷、前後稿及目視證據；各列標示最近一次實際審查。
- [精修案例](docs/review/${cycle}/summary.png) · [圖庫並排](docs/review/${cycle}/families.html) · [本輪修正](docs/${cycle}.md) · [驗證與限制](docs/validation.md)。
- [SVG全套](master-icons-all-svg.zip) · [SVG／React套件](master-icons-alpha.tgz)。仍為private alpha，沒有發布npm或推送遠端。
- 原生製作碼位於packages/icons/src/，版本化skill位於.agents/skills/icon-craft/。來源及授權繼續保留。

工程結果、Codex目視與使用者最終定案分開記錄；最終定案待確認。Firefox仍未驗證；詳細範圍以驗證報告為準。

離線圖庫與報告不需要安裝依賴。要本地開發請使用Node24與Bun 1.4.4，執行bun install、bun run check及bun run dev:review。
`;
await writeFile(join(out,'HANDOFF.md'),handoff);
await writeFile(join(out,'index.html'),`<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Master Icons · ${cycle}</title><style>body{max-width:800px;margin:64px auto;padding:0 24px;font:16px/1.8 system-ui;color:#27272a;background:#fafafa}h1{font-size:36px;letter-spacing:-1px}a{color:inherit}li{margin:14px 0}small{color:#71717a}</style><h1>Master Icons</h1><p>392 個命名圖稿 · 244 個基本概念 · 3,528 份 SVG</p><p>${ledger.reviewSummary}</p><ul><li><a href="preview.html">離線圖庫與 21 個使用情境</a></li><li><a href="docs/review/ui-v1/index.html">逐顆來源、前後稿與審查</a></li><li><a href="docs/review/${cycle}/summary.png">精修案例</a> · <a href="docs/review/${cycle}/families.html">圖庫並排</a></li><li><a href="master-icons-all-svg.zip">SVG 全套</a> · <a href="master-icons-alpha.tgz">SVG／React 套件</a></li><li><a href="HANDOFF.md">交付說明</a> · <a href="docs/validation.md">驗證與已知限制</a></li></ul><small>Alpha；Firefox 尚未驗證。工程通過與目視檢查不代表使用者最終定案。</small></html>`);
const manifest=[];for(const file of await files(out)){if(['delivery-manifest.json'].includes(relative(out,file)))continue;const body=await readFile(file);manifest.push({path:relative(out,file),bytes:body.length,sha256:createHash('sha256').update(body).digest('hex')});}
await writeFile(join(out,'delivery-manifest.json'),JSON.stringify({date:'2026-11-16',names:392,concepts:244,svgFiles:3528,files:manifest},null,2)+'\n');
console.log(`Packaged ${manifest.length} files at ${out}. Validate the actual delivered files before archiving.`);
