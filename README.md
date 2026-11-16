# Master Icons

微圓、簡約、為介面原生尺寸設計的開源圖示。**0.1.0-alpha.0** 包含 **392 個命名圖示、244 個基本概念**；16 / 20 / 24 三尺寸與 sharp / soft / rounded 三圓角，共 **3,528 份 SVG**。

範圍由原始48個名稱，以及 `ui-scope.json` 的162顆、`organization-scope.json` 的10顆、`productivity-scope.json` 的60顆、`expansion-scope.json` 的112顆組成。Craft 04 針對使用者回饋及同類接點精修49顆，詳見 `docs/craft-04.md`。前輪 Craft 03 重新逐顆審查既有280顆：精修24顆、保留256顆；Expansion 01 的112個新增命名圖稿均完成來源並列、九母版明暗與獨立子代理複核。先前刪除的擴充圖稿未恢復。方向、開關與狀態不另算基本概念，搜尋別名不增加圖稿。套件維持 private alpha；工程檢查、設計目視與使用者定案分開記錄。本輪跨情境及瀏覽器驗收進度見 `docs/validation.md`。

Layers 精修與審查教訓見 [Layers 01](docs/layers-01.md)。前輪試作、逐項待辦與固定線寬限制見 [遮擋輪廓避讓](docs/clearance-01.md)。

## 開始使用

需要 Node.js 24 以上與 Bun 1.4.4；本機建議使用 Node.js 26 的最新修補版本。圖示套件本身仍支援 Node.js 22+。

```sh
bun install --frozen-lockfile
bun run dev              # 正式網站：http://127.0.0.1:4321
bun run dev:review       # 獨立審稿：http://127.0.0.1:4173
```

正式網站提供英文與 `/tw` 繁中版，包含圖示搜尋、分類、光學尺寸與圓角比較、SVG／React 複製、SVG／ZIP 下載，以及使用文件。Master Site 整合 Astro 7、Svelte 5、Master CSS 2 與 Master UI；網站 origin 可透過 `PUBLIC_URL` 設定，預設為本機。

```sh
bun run build             # 套件、審稿與正式網站
bun run build:icons       # 套件與九組 ZIP
bun run build:review      # 使用已建置套件產生審稿與離線頁
bun run build:site        # 使用已建置套件產生 site/out
bun run check             # 建置、資產驗證、套件測試與網站型別
bun x --no-install playwright install chromium firefox webkit
bun run test:browser      # 獨立審稿含 file:// 離線驗證
bun run test:site         # 雙語網站與互動驗證
bun run test:site:dev     # 實際開發伺服器路由驗證
bun run check:reproducible
bun run check:package
```

離線審稿頁 `dist/preview.html` 可直接開啟，保留來源與前後比較、全部情境及本地 ZIP 產生。正式網站不包含上游比較原稿或審查紀錄。剪貼簿權限不足時提供手動複製。

## SVG 與 React

SVG 位於 `packages/icons/icons/{16|20|24}/{sharp|soft|rounded}/`。使用 `currentColor`；以 `<img>` 引入外部 SVG 不會繼承頁面顏色，需要 inline SVG 或自行指定顏色。

以下為本地套件名稱，請用 workspace 接入，或 `bun run check:package` 後安裝產物。尚無公開 npm 安裝承諾。

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
| packages/icons/ | 圖稿來源、生成 SVG、JS／React 套件與套件測試 |
| site/ | Master Site + Astro／Svelte 的雙語正式網站 |
| preview/ | 獨立審稿 workspace，保留完整對照與情境 |
| scripts/ | 根建置協調、來源與證據驗證、審稿工具 |
| references/ | 固定 commit、SHA-256 的上游圖稿與歷史快照 |
| docs/ | 研究、規範、決策與審查證據 |
| dist/ | 審稿工具與離線交付，不納入版本控制 |

開發模式會監看圖稿來源並重新建置。套件建置不執行審稿介面建置；根 `scripts/build.mjs` 保留為既有研究腳本的協調入口。正式網站透過 `workspace:*` 引用本套件，其他 Master 依賴使用固定發布版本。詳見 [網站開發](site/README.md) 與 [架構遷移驗證](docs/architecture-migration.md)。

圖庫維持 alpha，持續接受語意與工藝審查。solid、多字重、Vue/Svelte、Iconify、Figma library 尚未實作。

## 授權

Master 圖示為 MIT。12 個代表圖示以 Hugeicons Free 為參考重構研究，保守保留其 MIT 來源聲明；另外377個由本專案繪製；megaphone、handshake及layers依Lucide構造重繪，保守保留其ISC來源及授權。完整來源與固定版本見 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。比較頁另含 Lucide、Tabler、Heroicons、Phosphor、Radix、Feather、Iconoir、Hugeicons Free 的原始圖稿及各自授權，比較原稿不進入 Master SVG / React 套件；適用的來源notices與授權隨套件交付。

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
