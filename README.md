# Master Icons

微圓、簡約、為介面原生尺寸設計的開源圖示。**0.1.0-alpha.0** 包含 **280 個命名圖示、182 個基本概念**；16 / 20 / 24 三尺寸與 sharp / soft / rounded 三圓角，共 **2,520 份 SVG**。

範圍由原始48個名稱、`src/ui-scope.json`的162顆、`src/organization-scope.json`的10顆及`src/productivity-scope.json`的60顆組成。前輪 Craft 01 精修14顆；本輪 Craft 02 由子代理再次獨立逐顆審查280顆，追加精修2顆、保留278顆，沒有新增名稱。先前刪除的擴充圖稿未恢復。方向、開關與狀態另計命名圖稿，搜尋別名不增計圖示。套件維持 private alpha；工程檢查、設計目視與使用者定案分開記錄。

## 開始使用

需要 Node.js 22+ 與 pnpm 12.15.0。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

開啟 <http://127.0.0.1:4173>。預覽每頁 96 顆，尺寸比較每頁 24 顆；包含搜尋、分類、原生尺寸／圓角對照、十三個實際情境、全部 280 顆的兩份上游原稿與修改前／後對照、單個 SVG 與整組 ZIP 下載。

```sh
pnpm build        # SVG、React、型別、目錄、9 組 ZIP、離線預覽
pnpm check        # build + 資產驗證 + API / tree shaking + TypeScript
pnpm exec playwright install chromium firefox webkit
pnpm test:browser
pnpm check:reproducible
pnpm check:package
```

`dist/preview.html` 可直接離線開啟。圖示與比較圖以壓縮資料內嵌；ZIP 依所選尺寸／圓角在本地產生；文件連結由同層的 Markdown 提供。剪貼簿權限不足時會選取文字供手動複製。

## SVG 與 React

SVG 位於 `icons/{16|20|24}/{sharp|soft|rounded}/`。使用 `currentColor`；以 `<img>` 引入外部 SVG 不會繼承頁面顏色，需要 inline SVG 或自行指定顏色。

以下為本地套件名稱，請用 workspace / `pnpm link` 接入，或 `pnpm pack --out work/master-icons-alpha.tgz` 後安裝產物。尚無公開 npm 安裝承諾。

```tsx
// 動態入口：只帶入用到的圖示，每個包含九份圖稿。
import { SearchIcon } from '@master/icons/react';
<SearchIcon size={16} />
<SearchIcon size={20} corner="rounded" label="搜尋" />

// 固定入口：只帶入一個尺寸與圓角。
import { SearchIcon as SmallSearch } from '@master/icons/react/16/soft';
<button aria-label="搜尋"><SmallSearch /></button>
```

React 18 / 19 peer range；使用 forwardRef，接受標準 SVG props。已測 React 18.3.1 / 19.3.1 的消費端 SSR、mount、ref 與事件；型別檢查使用 React 19。不含 context provider；全站使用相同固定入口即可統一風格。

```js
import { Search, renderSvg } from '@master/icons';
const svg = renderSvg(Search, { size: 20, corner: 'soft', label: '搜尋' });
```

| 選項 | 預設 | 行為 |
| --- | --- | --- |
| size | 24 | 正有限數字，顯示尺寸 |
| opticalSize | auto | 最近的 16 / 20 / 24 母版；18、22 邊界取較大者 |
| corner | soft | sharp / soft / rounded，真實幾何預設 |
| color | currentColor | 繼承文字顏色 |
| label | 無 | 無標籤時 aria-hidden；有標籤時 role=img |
| direction | ltr | rtl 僅鏡射 arrow-left/right、chevron-left/right、chevrons-left/right、undo/redo |

固定入口不接受 corner / opticalSize；size 只改顯示大小。CSS 改寬高不會觸發光學切換。建議用原生 16 / 20 / 24，其他大小尚無專用母版。「原生」不代表斜線完全沒有反鋸齒。

## 專案內容

| 路徑 | 用途 |
| --- | --- |
| src/drawings.mjs / src/families/ | 圖稿入口、原始核心與可讀的家族繪製模組 |
| src/core-names.json / src/ui-scope.json / src/organization-scope.json / src/productivity-scope.json / src/concepts.mjs | 原始 48、162+10+60名稱與概念分組 |
| src/geometry.mjs | 尺寸、線寬、幾何圓角工具 |
| src/catalog.mjs | 名稱、中英搜尋詞、分類、方向規則 |
| icons/ | 生成並納入版本控制的 SVG |
| preview/ | 審查介面 |
| references/ | 固定 commit、SHA-256 的上游圖稿；不打包成 Master 圖示 |
| dist/ | 生成的 JS、型別、manifest、ZIP、離線預覽；不納入版本控制 |
| docs/ | [研究](docs/research.md)、[規範](docs/design-system.md)、[決策](docs/decisions.md)、[驗證](docs/validation.md) |

圖庫維持 alpha，持續接受語意與工藝審查。solid、多字重、Vue/Svelte、Iconify、Figma library 尚未實作。

## 授權

Master 圖示為 MIT。12 個代表圖示以 Hugeicons Free 為參考重構研究，保守保留其 MIT 來源聲明；另外266個由本專案繪製；megaphone及handshake依Lucide構造重繪，保守保留其ISC來源及授權。完整來源與固定版本見 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。比較頁另含 Tabler、Iconoir、Lucide 的原始圖稿及各自授權，比較原稿不進入 Master SVG / React 套件；適用的來源notices與授權隨套件交付。

## 製作 skill

使用 `$master-icons` 製作與精修圖稿。完整版本化來源在 [skills/master-icons/SKILL.md](skills/master-icons/SKILL.md)，包含原生明暗審稿腳本；[skill 查核結果](docs/icon-skills-review.md) 說明現有候選與適用範圍。獨立製作不因研究參考而逐顆掛來源標籤；初版既有授權聲明與比較原圖仍保留。

## 製作與審稿

保留每顆修改前圖稿，逐顆參考成熟圖庫，在原生尺寸、明暗背景與文字旁檢視輪廓和間距。必要時允許虛線、透明度與漸淡；不能用效果掩蓋幾何缺陷。flat node 輸出支援虛線與逐筆透明度，漸層 defs / mask 尚未提供。

```sh
node scripts/review-catalog.mjs work/catalog-review
node skills/master-icons/scripts/render-review.mjs --repo . --icons user,users,bell,bell-off --out work/detail-review
```

逐顆判斷見 [離線審查報告](docs/review/ui-v1/index.html) 與 [審查紀錄](docs/refinement-ledger.json)。28 批圖稿均已查看來源並列、九組原生尺寸、明暗及文字場景；本輪2顆精修、278顆保留幾何；先前獲使用者肯定的五顆保留，全庫最終定案仍待確認。驗證器會拒絕缺少紀錄、圖稿已變更或證據不符的審查。Firefox 本機啟動失敗，列為未驗證。

前輪精修光學孔洞、頭肩留白、精確接點，以及使用者指定的縮排增減、擴音器、握手和票券撕線；本輪將這些教訓用於全庫複審，修正highlighter工作端及phone-off母型曲線。[本輪紀錄](docs/craft-02.md) · [前後稿](docs/review/craft-02/summary.png) · [前輪紀錄](docs/craft-01.md)。ticket與file-archive的虛線使用獨立的平切端帽，不受外框圓角預設影響；chart-area保留20%面積透明度。製作skill已更新至0.4.1，專案版與安裝版同步。
