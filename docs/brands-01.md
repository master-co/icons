# Brands 01 · 首批 64 個品牌與平台

後續已補上八個名稱，目前為 72 個品牌名稱、648 份 SVG；詳見 [Brands 02](brands-02.md)。下方保留首批製作紀錄，圖庫與審稿索引已更新為完整集合。

2026-11-17。新增 64 個品牌，包含 Master；總庫為 456 個名稱、308 個基本概念、4,104 份 SVG。本批 64 × 3 尺寸 × 3 相容角型入口 = 576 份 SVG。角型入口保留同一品牌輪廓，不計為九種重新設計。

[總覽與逐組對照](review/brands-01/index.html) · [逐顆判斷](review/brands-01/decisions.json) · [渲染證據](review/brands-01/evidence.json)

## 製作

63 個品牌沿用固定版本 Simple Icons 的向量識別輪廓；Master 採既有品牌庫的 small mark。這是品牌資產整合與尺寸調校，不宣稱重新原創這些 Logo。原稿、官方來源連結、SHA-256、版本與修改方式保存在 `packages/icons/src/brands.json` 與 `references/brands-01/`。

保留原稿比例、曲線、負空間與字形，使用 `currentColor` 實心路徑。按密度及寬高比選擇尺寸佔幅，16px 比例略大以保留細節。Master 使用原有小尺寸版本的較寬接縫，單色輸出移除僅用於漸層的重複覆片。npm 與 Stripe 經並排檢查縮小佔幅，避免與相鄰品牌重量失衡。

品牌路徑不受 sharp / soft / rounded 或線寬控制變形，也不做 RTL 鏡射。原始緊縮路徑語法必須完整保留；原有數字正規化會破壞相鄰小數及 arc flags，已針對品牌路徑修正並加入回歸測試。

## 使用

```tsx
import { BrandMasterIcon, BrandGithubIcon, BrandFigmaIcon } from '@master/icons/react';

<BrandMasterIcon size={20} label="Master" />
<BrandGithubIcon size={16} />
<BrandFigmaIcon size={24} />
```

同時提供 JavaScript、React、Vue、Svelte、Preact、Astro 與固定尺寸入口。網站新增「品牌與平台 / Brands & platforms」，支援正式品牌名稱、英文代稱與中文搜尋詞；`brand-x` 與既有關閉用的 `x` 不衝突。

## 檢查與限制

已檢查來源並排、16 / 20 / 24、三種角型、明暗背景、文字旁與 55% 前景色，並產生 DPR 1 / 2 的 16 張審稿圖。逐顆判斷記錄實際觀看範圍；這不是人類辨識率研究。

Zoom、Go 的橫向字標在 16px 字高很小，Epic Games 的細字也不適合作為唯一識別線索，應搭配品牌名稱。Figma 的官方單色線框與 Shopify 提把等細節在低對比小尺寸較弱；沒有為增加重量而更改品牌輪廓。

來源聲明與 Simple Icons 的 CC0／免責文件隨單檔 SVG、套件和下載 ZIP 保留；程式碼授權不授予品牌商標權。詳見 [THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md)。

重新產生審稿：`node scripts/review-brands.mjs`（先建置圖示）。重新產生圖片不會自動批准設計；`decisions.json` 是另存的目視判斷，驗證器會核對圖稿雜湊。

## 本輪工程結果

- 圖示、離線審稿頁與正式網站建置通過。
- `bun run test`：43 項通過，包含品牌來源完整性、角型／線寬／RTL 輪廓不變、SVG 與九組 ZIP notices。
- 套件與網站型別檢查通過；英文／繁中翻譯 audit 通過。
- `bun run validate`：456 個名稱、4,104 份 SVG、來源與審查雜湊、9 組 ZIP 驗證通過。
- `bun run check:package`：封裝消費端、React、Vue、Svelte、Preact、Astro 驗證通過。
- 品牌網站流程：Chromium／WebKit × 英文／繁中，4 項通過；包含 64 項分類、搜尋別名、鍵盤開啟與關閉、九母版、帶來源 SVG 下載、線寬不改輪廓、390px 明暗頁面無橫向溢出。
- 離線圖庫：64 品牌與 Master 原稿比較表通過，無頁面錯誤。
- Firefox 嘗試啟動失敗（本機 Nightly 回報 `Could not find profile folder`），本輪未完成 Firefox 驗證。網站測試使用獨立 4356 連接埠，避免既有 4321 preview 無回應的影響；暫停的自動建置監看程序已恢復。

獨立 SVG 封裝：`node scripts/package-brands.mjs` → `work/master-icons-brands.zip`，含 576 份 SVG、來源聲明及授權文件，已逐檔回讀比對。
