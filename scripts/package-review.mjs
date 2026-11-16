// Package a reviewable alpha workspace without publishing it.
// Usage: node scripts/package-review.mjs /absolute/output/directory
import{access,cp,mkdir,readFile,readdir,writeFile}from'node:fs/promises';
import{resolve,join,relative,isAbsolute}from'node:path';
import{createHash}from'node:crypto';import{zipSync}from'fflate';
const out=process.argv[2];if(!out||!isAbsolute(out))throw new Error('Provide an absolute output directory.');
await mkdir(out,{recursive:true});
for(const dir of['src','icons','dist','preview','tests','scripts','skills','references','licenses','docs'])await cp(dir,join(out,dir),{recursive:true});
for(const file of['package.json','pnpm-lock.yaml','playwright.config.mjs','README.md','LICENSE','THIRD_PARTY_NOTICES.md','.gitignore'])await cp(file,join(out,file));
for(const file of['preview.html','design-system.md','research.md'])await cp('dist/'+file,join(out,file));
await access('work/master-icons-alpha.tgz');await cp('work/master-icons-alpha.tgz',join(out,'master-icons-alpha.tgz'));
async function files(dir){const result=[];for(const e of await readdir(dir,{withFileTypes:true})){if(e.name==='.DS_Store')continue;const p=join(dir,e.name);if(e.isDirectory())result.push(...await files(p));else if(e.isFile())result.push(p);}return result.sort();}
const svg={};for(const p of await files('icons'))svg[p]=await readFile(p);
for(const p of['LICENSE','THIRD_PARTY_NOTICES.md','licenses/hugeicons-MIT.txt','licenses/lucide.txt'])svg[p]=await readFile(p);
const date=new Date('2026-11-16T00:00:00Z');await writeFile(join(out,'master-icons-all-svg.zip'),zipSync(svg,{level:9,mtime:date}));
const handoff=`# Master Icons · Craft 03 / Expansion 01

本輪交付：392個命名圖稿、244個基本概念、3,528份SVG。既有280顆逐一審查，精修24顆、保留256顆；新增112顆分12個家族完成。

- 開啟 [離線圖庫](preview.html)：搜尋、三尺寸、三圓角、明暗、來源原稿／Master及真實修改前版本，並含21個情境頁。
- 開啟 [逐顆審查報告](docs/review/ui-v1/index.html)：392筆用途、來源觀察、效果判斷、前後稿與目視證據。
- [精修案例](docs/review/craft-03/summary.png)、[全庫並排](docs/review/craft-03/families.html)、[來源研究與範圍](docs/expansion-01-plan.md)、[完整驗證](docs/validation.md)。
- [SVG全套](master-icons-all-svg.zip)、[SVG／React套件](master-icons-alpha.tgz)。套件仍為private alpha，沒有發布npm或推送遠端。
- 原生製作碼在src/，版本化skill在skills/master-icons/；已安裝副本同步為0.5.2。實際沿用資產保留授權，對照資產未打入React套件。

原始48名稱與API相容。兩份固定版本來源／顆，明暗與九組圖稿證據可追溯；新繪112顆沒有虛構before。完整工作區也包含前輪歷史審查，入口與中央ledger指向本輪結果。

工程：23項Node測試、型別、消費端與tree shaking、可重現建置通過。Chromium／WebKit DPR1／2共14,112次圖稿渲染無裁切；36項瀏覽器流程通過，手機表格修後另重跑4項情境流程。21情境84張目視及修後4張複核完成。

限制：Firefox因profile啟動問題仍未驗證；volume-low與通用volume在16px同稿，不用作高低音量的成對狀態。工程通過、Codex目視與使用者最終定案分開記錄；仍待你的最終設計審定。

若要本地開發：安裝Node22以上與pnpm，執行pnpm install、pnpm check及pnpm dev。直接查看離線圖庫與報告不需安裝任何依賴。
`;
await writeFile(join(out,'HANDOFF.md'),handoff);
await writeFile(join(out,'index.html'),`<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Master Icons · 本輪交付</title><style>body{max-width:800px;margin:64px auto;padding:0 24px;font:16px/1.8 system-ui;color:#27272a;background:#fafafa}h1{font-size:36px;letter-spacing:-1px}a{color:inherit}li{margin:14px 0}small{color:#71717a}</style><h1>Master Icons</h1><p>392 個命名圖稿 · 244 個基本概念 · 3,528 份 SVG</p><p>精修 24 顆既有圖稿，新增 112 顆通用介面與商務圖示。Alpha。</p><ul><li><a href="preview.html">開啟離線圖庫與 21 個使用情境</a></li><li><a href="docs/review/ui-v1/index.html">查看逐顆來源、前後稿與審查</a></li><li><a href="docs/review/craft-03/summary.png">精修案例</a> · <a href="docs/review/craft-03/families.html">全庫並排</a></li><li><a href="master-icons-all-svg.zip">下載 SVG 全套</a> · <a href="master-icons-alpha.tgz">下載 SVG／React 套件</a></li><li><a href="HANDOFF.md">交付說明</a> · <a href="docs/validation.md">驗證與已知限制</a></li></ul><small>Firefox 尚未驗證。工程通過與目視檢查不代表使用者最終定案。</small></html>`);
const manifest=[];for(const file of await files(out)){if(['delivery-manifest.json'].includes(relative(out,file)))continue;const body=await readFile(file);manifest.push({path:relative(out,file),bytes:body.length,sha256:createHash('sha256').update(body).digest('hex')});}
await writeFile(join(out,'delivery-manifest.json'),JSON.stringify({date:'2026-11-16',names:392,concepts:244,svgFiles:3528,files:manifest},null,2)+'\n');
console.log(`Packaged ${manifest.length} files at ${out}. Validate the actual delivered files before archiving.`);
