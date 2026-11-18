# Master Icons

微圓、簡約，為 Dashboard、App 與 Web 介面設計的 SVG 圖示。

Master Icons 著重輪廓、比例、留白與小尺寸的細節取捨。目前為 **0.1.0-alpha.0**。本次新增候選已依實際用途重新選圖及重製，包含 **924 個命名圖示、8,316 份 SVG**。重製紀錄見 [逐顆重製與收錄紀錄](docs/review/rebuild-01/index.html)。



## 設計與輸出

- **原生光學尺寸**：16、20、24 各自配置線寬與座標，密集圖形可在小尺寸減少或重排細節。
- **三種角型**：預設 soft 微圓，可選 sharp 或 rounded。角型按構造調整；圓形與部分簡單筆畫可能共用幾何。
- **單色輪廓**：使用 `currentColor` 配合文字與介面配色，涵蓋導覽、表單、檔案、編輯、媒體、帳戶及常見商務操作。
- **SVG 與框架元件**：提供 JavaScript、React、Vue、Svelte、Preact、Astro 入口，以及固定尺寸／角型入口，供應用按需匯入。

圖庫仍在 alpha 階段，圖形與 API 可能調整。這些設計取向不代表所有圖示、顯示尺寸或背景都已達到相同完成度；各批已執行的檢查與限制見 [驗證紀錄](docs/validation.md) 及對應批次報告，報告僅涵蓋其記載的版本與範圍。

品牌分類包含 89 個品牌與平台名稱，包含 Master、GitHub、Figma、Instagram、LINE、YouTube、Claude、OpenAI、ChatGPT、Microsoft、LinkedIn、Slack、Cursor、Supabase、Vite 等。品牌使用單色實心輪廓、個別尺寸留白，三種角型保留相同標誌；不隨描邊設定變形。來源紀錄見 [第三方聲明](THIRD_PARTY_NOTICES.md)。

## 本地開始使用

開發環境需要 Node.js 24+ 與 Bun 1.4.4。圖示套件的 Node.js 要求為 22+；框架及網站另有自己的工具鏈需求。

```sh
bun install --frozen-lockfile
bun run dev              # 雙語網站：http://127.0.0.1:4321
# 或另開終端執行審稿介面
bun run dev:review       # http://127.0.0.1:4173
```

網站提供英文與 `/tw` 繁中版，包含搜尋、分類、尺寸與角型預覽、程式碼複製及下載。網站設定與開發方式見 [網站文件](site/README.md)。

`@master/icons` 目前在此 repository 中標記為 private alpha。以下範例供本地 workspace 或套件封裝使用，不表示已發布至 npm。可執行 `bun run check:package` 產生並驗證 核心及各框架的 `work/master-icons*-alpha.tgz`。

## 使用圖示

SVG 位於 `packages/icons/icons/{16|20|24}/{sharp|soft|rounded}/`。Inline SVG 可繼承文字顏色；以 `<img>` 載入外部 SVG 不會繼承頁面的 `currentColor`。

```tsx
import { SearchIcon } from '@master/icons-react';
import { SearchIcon as SmallSearch } from '@master/icons-react/16/soft';

export function SearchExamples() {
  return <>
    <SearchIcon size={20} corner="rounded" label="搜尋" />
    <button aria-label="搜尋"><SmallSearch /></button>
  </>;
}
```

一般入口中，每個圖示包含九份圖稿；固定入口只包含選定的尺寸與角型。未使用的圖示可由支援 tree shaking 的打包工具移除。React 入口支援 React 18 / 19；其他框架提供相同名稱及固定入口，例如 `@master/icons-svelte/16/soft`。每個框架有獨立的 `@master/icons-*` 套件，只依賴共用核心與自己的框架 peer，使用方式與差異見 [套件文件](packages/icons/README.md)。

也可直接產生 SVG 字串：

```js
import { Search, renderSvg } from '@master/icons';

const svg = renderSvg(Search, { size: 20, corner: 'soft', label: '搜尋' });
```

| 選項 | 預設 | 行為 |
| --- | --- | --- |
| `size` | `24` | 顯示尺寸，接受正有限數字 |
| `opticalSize` | `auto` | 選擇最近的 16 / 20 / 24 母版；18、22 的邊界取較大者 |
| `corner` | `soft` | `sharp` / `soft` / `rounded` |
| `color` | `currentColor` | 繼承文字顏色 |
| `label` | 無 | 無標籤時 `aria-hidden`；有標籤時 `role="img"` |
| `direction` | `ltr` | `rtl` 僅鏡射左右箭頭、左右 chevron、雙 chevron 及 undo / redo |

固定入口不接受 `corner` / `opticalSize`；`size` 只改顯示大小。CSS 寬高變動也不會切換光學母版。其他顯示尺寸使用既有母版縮放，沒有額外專用圖稿；斜線與曲線仍會有反鋸齒。圖示按鈕的可存取名稱與點擊範圍由介面提供。

## 開發與驗證

```sh
bun run build                  # 套件、審稿與網站
bun run check                  # 建置、資產驗證、套件測試與型別檢查
bun x --no-install playwright install chromium firefox webkit
bun run test:browser            # 圖庫與 file:// 離線流程
bun run test:site               # 網站流程
bun run test:site:dev           # 開發伺服器路由
bun run test:site:hmr           # 隔離環境中的 HMR 回歸
bun run test:frameworks:browser # Vue／Svelte／Preact 瀏覽器測試
bun run test:turbo              # 任務圖、快取失效與產物還原回歸
bun run check:reproducible
bun run check:package
```

可分別使用 `build:icons`、`build:review`、`build:site`；Turbo 會自動先完成各自需要的上游任務。網站只建置核心、Svelte 與 Astro，`build:icons` 才建置全部六個套件。根目錄 `dist/preview.html` 是可離線開啟的審稿頁，保留來源與前後稿比較；上游比較原稿不放入正式網站或圖示套件。

任務與產物快取由根目錄 `turbo.json` 管理。核心完成後，各框架可平行建置；網站與審稿頁共用一次 stroke 素材生成。未變更的任務命中 `.turbo/cache/`，缺少的產物會從快取還原。來源、生成器、授權、相關依賴與 Node.js 版本會影響快取，網站建置另追蹤 `PUBLIC_URL`。dev 伺服器與瀏覽器測試不快取；來源監看觸發 Turbo 重新判斷生成任務，普通頁面編輯仍使用 Vite HMR。

核心的 `generate` 任務快取幾何、型別與 ZIP；`build` 每次從 ZIP 同步納入 Git 的 SVG，保留未變更檔案的時間。這個同步步驟不快取，避免 Turbo 將已追蹤的生成輸出反向計入生成任務的雜湊。跨框架測試的依賴位於 `tests/` workspace，避免根套件的內部依賴使所有任務一同失效。

`bun run build:icons --force` 可強制重跑套件建置；`bun run turbo run prepare-site --filter=@master/icons-site --force` 可重跑網站素材及其上游。刪除 `.turbo/` 可清除本地任務快取。`check:reproducible` 刻意執行兩次不使用任務快取的建置，驗證跨時區輸出一致。CI 使用 GitHub Actions cache 保存 Turbo 快取；未啟用需要外部帳號的遠端快取。

| 路徑 | 用途 |
| --- | --- |
| `packages/icons/` | 共用幾何原始碼、runtime、SVG 與整合測試 |
| `packages/icons-{react,vue,svelte,preact,astro}/` | 各框架獨立套件、元件來源與生成產物 |
| `site/` | 雙語網站 |
| `preview/` | 審稿介面與使用情境 |
| `tests/` | 跨套件測試 workspace、框架依賴與審稿瀏覽器測試 |
| `skills/master-icons/` | 版本化製作與審查 skill |
| `references/` | 固定版本的比較資產與歷史基準 |
| `docs/` | 設計規範、研究、決策與審查證據 |
| `scripts/` | 建置協調、驗證與審稿工具 |
| `dist/` | 生成的審稿與離線輸出，不納入版本控制 |

## 貢獻與製作方法

新增或精修圖示前，請閱讀 [設計規範](docs/design-system.md) 與 [master-icons skill](skills/master-icons/SKILL.md)。Skill 記錄製作契約、來源比較、光學處理與審查步驟，可供貢獻者閱讀，也可由支援 skill 的工具以 `$master-icons` 使用。

製作流程包含 AI 輔助的幾何編寫與圖稿檢查。審查紀錄分別記載工程結果、圖稿目視及審查者；AI 的檢查紀錄不代表維護者已逐顆定案。

每項變更需說明用途與具體問題，保存真實前稿，並在三尺寸、三角型、明暗背景、文字旁與同家族中比較。必要時可使用虛線、透明度及逐筆漸淡；不能以效果掩飾輪廓缺陷。`chart-area` 目前維持純輪廓。來源比較與逐項判斷可在 [審查報告](docs/review/ui-v1/index.html) 查看，已知限制以 [驗證紀錄](docs/validation.md) 為準。

建置後可產生局部審稿畫面：

```sh
node skills/master-icons/scripts/render-review.mjs --repo . --icons user,users,bell,bell-off --out work/detail-review
```

## 來源與授權

設計過程研究 Lucide、Tabler、Heroicons、Phosphor、Radix、Feather、Iconoir 與 Hugeicons Free 等開源圖庫，並在 Master 的幾何系統中製作與精修。研究比較與具體改作分別保留紀錄。

Master 自行製作的程式碼與介面圖稿採用 [MIT License](LICENSE)；涉及上游素材的部分同時保留其適用聲明。目前保留 12 顆 Hugeicons Free 研究重繪的 MIT notices，以及 `megaphone`、`handshake`、`layers` 三顆 Lucide 改作的 ISC 與相關上游聲明。名稱、固定版本、修改方式及授權詳見 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

`teapot` 茶壺圖稿沿用 OpenMoji 的壺蓋構造，該圖稿及本專案對它的修改採 **CC BY-SA 4.0**，不適用一般 MIT 授權；完整來源、修改與條款見 [茶壺聲明](licenses/teapot-openmoji-CC-BY-SA-4.0.txt)。

品牌資產另列來源：採用 Simple Icons、官方向量及註明來源的 Dcard 點陣轉描，Master 標誌使用自有素材；相關聲明與品牌使用資訊見 [品牌來源](THIRD_PARTY_NOTICES.md#brand-silhouettes--brands-01)。品牌資產與 Master 的程式碼授權分開記載；Vue、JavaScript、Copilot、Teams／Outlook 與 Dcard 的個別聲明見 [新增批次](docs/brands-03.md)。

`references/` 中的比較原稿屬於各上游專案，保留各自授權，且不納入圖示套件。適用於改作圖稿的 notices 則隨單檔 SVG、套件及 ZIP 提供。Master Icons 與上述參考專案沒有隸屬或背書關係。
