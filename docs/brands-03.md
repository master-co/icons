# Brands 03 · 新增 16 個常用品牌

新增 Vue.js、JavaScript、Bun、GitHub Copilot、Hugging Face、AWS、Firebase、PostgreSQL、Microsoft Teams、Outlook、Google Meet、Canva、Dribbble、WordPress、Dcard 與 Shopee（蝦皮）。品牌分類目前為 **88 個名稱、87 個獨立輪廓、792 份 SVG**；本批新增 144 份 SVG。

[本批總覽](review/brands-03/index.html) · [完整圖庫](review/brands-01/index.html) · [第一組尺寸對照](review/brands-01/sheet-5.html) · [第二組尺寸對照](review/brands-01/sheet-6.html) · [逐項判斷](review/brands-03/decisions.json)

## 尺寸與留白

每項均檢查原生 16 / 20 / 24px、三種角型、明暗背景、55% 前景色及 DPR 1 / 2。三種角型和線寬不改品牌輪廓。既有 72 個品牌的幾何雜湊核對為未變。

| 品牌 | 16 / 20 / 24px 最大佔幅 | 調校重點 |
| --- | --- | --- |
| Vue.js | 14 / 17 / 20 | 下移 0.25px，平衡上端較重筆畫與下方尖端。 |
| JavaScript | 14 / 16 / 20 | 方框邊緣對齊整數座標，保留右下字形留白。 |
| Bun | 14 / 17.5 / 21 | 保留雙眼及頂部細線。 |
| GitHub Copilot | 14 / 17 / 20 | 保留雙眼、耳側和下方孔洞。 |
| Hugging Face | 14 / 17.5 / 21 | 保留臉部及雙手指縫，不額外加粗。 |
| AWS | 14 / 18 / 22 | 字標與微笑箭頭維持一體。 |
| Firebase | 13.5 / 16.5 / 20 | 保留火焰重疊白縫。 |
| PostgreSQL | 14 / 17.5 / 21 | 給象頭較大佔幅，保留象鼻與雙耳。 |
| Microsoft Teams、Outlook | 14 / 17 / 20 | 保留字母方塊及次要結構。 |
| Google Meet | 14 / 17 / 20 | 保留鏡頭、中心留白與分段白縫。 |
| Canva | 14 / 17 / 20 | 20／24px 較初稿縮小，降低圓盤視覺重量。 |
| Dribbble | 13.5 / 16.5 / 20 | 保留圓周與弧線交會處。 |
| WordPress | 14 / 17 / 20 | 保留外環及 W 字腹。 |
| Dcard | 14 / 16 / 20 | 保留 D、眼與笑口，方框採整數佔幅。 |
| Shopee | 13.5 / 16.5 / 20 | 保留提把及 S 字腹。 |

AWS、Canva 的字標與 PostgreSQL、Hugging Face 的密集細節在 16px 及低對比下仍有限制，建議搭配名稱。尺寸校正不等同人類辨識率測試，也不代表符合每個品牌的最小尺寸規範。

## 來源與版本

15 項沿用固定版本 Simple Icons 向量；AWS、Canva、Teams 與 Outlook 使用 v12.4.0 歷史版本，明確記錄版本，不宣稱是最新品牌重設稿。每個 SVG 原稿、來源連結與 SHA-256 保存在 `references/brands-03/`、`packages/icons/src/brands.json`。

Dcard 官方下載端本輪回傳 HTTP 403。採用 [Wikimedia Commons 固定頁面版本](https://commons.wikimedia.org/w/index.php?title=File:Dcard_Favicon_x520.png&oldid=887105692)保存的 2021-07-31 app 圖稿，作者標示為 Dcard。保留原始 512px PNG，以 VTracer 0.6.12 轉為曲線，統一藍色區及陰影、白區挖空，將變換寫入路徑後正規化到 24px。**這是有紀錄的轉描稿，不是官方原始向量。**

轉描可透過 `scripts/trace-dcard.py` 重現（額外工具 Pillow、VTracer 0.6.12；不加入套件執行期依賴）。

以原始藍色區遮罩和瀏覽器 512px 渲染做二值比對：交並比（IoU）**99.658%**，全畫布像素一致率 **99.746%**；差異 667 / 262,144 像素。這是形狀比對，不是品牌認證；數據及方法見 [轉描紀錄](review/brands-03/trace-fidelity.json)。[官方存檔規範](https://www.dcard.tw/brand/dcard_brand_guidelines.pdf)列出 app 標誌最小 48px，因此本庫 16／20／24px 輸出屬於光學預覽，不宣稱符合該最小尺寸。

## 使用與聲明

```tsx
import { BrandVueJsIcon, BrandGithubCopilotIcon, BrandDcardIcon } from '@master/icons/react';

<BrandVueJsIcon size={16} label="Vue.js" />
<BrandGithubCopilotIcon size={20} />
<BrandDcardIcon size={24} label="Dcard" />
```

正式品牌名稱、英文代稱與中文搜尋詞均接入既有分類；例如 `蝦皮` → Shopee、`狄卡` → Dcard、`amazon web services` → AWS。使用既有 JavaScript、React 與固定尺寸入口。

圖稿授權分開記載：Vue 保留 CC-BY-NC-SA-4.0 與額外許可；JavaScript 與 GitHub Copilot 保留上游 MIT 著作權；Teams／Outlook 保留 Microsoft Fabric 資產條款；Dcard 保留來源、轉描方式與品牌規範。完整文件在 `licenses/brand-additions.txt`，隨套件及每組 ZIP 交付；單檔 SVG 亦保留相關聲明。程式碼 MIT 或 Simple Icons CC0 不取代各品牌的圖稿條款與商標權。詳見 [第三方聲明](../THIRD_PARTY_NOTICES.md#brand-silhouettes--brands-03)。

獨立品牌下載包：執行 `node scripts/package-brands.mjs` 產生 `work/master-icons-brands.zip`。

## 驗證結果

- 圖示、離線審稿頁與正式網站建置通過；45 項套件測試通過。
- 框架型別檢查通過，Svelte 零錯誤、零警告；完整生成庫需以 8GB Node heap 執行原生框架型別檢查。
- Chromium／WebKit × 英文／繁中共 6 項流程通過：24 個近期新增名稱在 16px 搜尋／開啟、88 項分類、中文與 AWS 別名、鍵盤操作、九母版、下載內容一致、線寬輪廓不變、390px 明暗頁面無橫向溢出。
- 套件消費端通過 JavaScript、React、Vue、Preact、Svelte、Astro 與固定入口檢查；英文／繁中翻譯 audit 通過。
- 共用工作區全庫驗證通過：620 名稱、5,580 份 SVG、來源與判斷雜湊、9 組下載包。此總數包含同時進行的其他 UI 擴充；本批只新增 16 個品牌。
- 品牌 ZIP 的 792 份 SVG 逐檔回讀一致；Dcard 轉描可逐位元組重現。
- Firefox 未重試；延續前批的本機 profile 啟動限制，不列為通過。

完整檢查範圍、證據雜湊與紀錄見 [validation.json](review/brands-03/validation.json)。
