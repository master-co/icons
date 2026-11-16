# Brands 02 · 新增八個品牌名稱

2026-11-17。新增 OpenAI、ChatGPT、Microsoft、LinkedIn、Slack、Cursor、Supabase、Vite。品牌分類合計 **72 個匯出名稱、71 個獨立輪廓、648 份 SVG**；全庫為 **464 個名稱、315 個基本概念、4,176 份 SVG**。

[八個新增圖示的原生尺寸對照](review/brands-01/sheet-5.html) · [完整品牌圖庫](review/brands-01/index.html) · [逐項判斷](review/brands-01/decisions.json)

## 來源與識別

OpenAI 採官方 [2025 Logo 資產](https://cdn.openai.com/brand/OpenAI-Logos-2025.zip)中的黑色 monoblossom，保留原始路徑。OpenAI 與 ChatGPT 各有獨立匯出與搜尋名稱，共用 Blossom；`brand-chatgpt` 的 `aliasOf` 與概念均指向 `brand-openai`，不把同一輪廓算成兩個新設計。

Cursor 採目前的立方體標誌，Vite 採新版階梯閃電，Supabase 保留閃電輪廓。這三項源自固定版本 Simple Icons；Microsoft、LinkedIn、Slack 採 Simple Icons v12.4.0 保存的輪廓並核對官方品牌頁，來源紀錄明確標為歷史版本。全部原稿、雜湊與連結在 `references/brands-02/`、`packages/icons/src/brands.json` 與 [第三方聲明](../THIRD_PARTY_NOTICES.md)。OpenAI 品牌資產另附自己的來源與條款聲明，不歸入 Simple Icons 的 CC0。

## 小尺寸校正

| 名稱 | 16 / 20 / 24px 畫布中的最大佔幅 | 判斷 |
| --- | --- | --- |
| OpenAI、ChatGPT | 13.5 / 16.75 / 20 | 以原稿實際墨線範圍定位，避免把 721px 畫布既有大留白再縮入圖示；保留六瓣交織與內孔。 |
| Microsoft | 14 / 16 / 20 | 偶數佔幅讓外邊緣對齊整數座標；四格與中央十字縫保持原比例。 |
| LinkedIn | 14 / 16 / 20 | 方框對齊整數座標，16px 略放大以保留 i 圓點與 n 字腹，未改原有角型。 |
| Slack | 14 / 17 / 20 | 密集短筆與圓點需要稍大佔幅，保留各部件間原有間隔。 |
| Cursor | 14 / 17 / 20 | 16px 從 13 增至 14，20px 從 16.5 增至 17，讓立方體內部三角留白更清楚。 |
| Supabase、Vite | 13.5 / 16.5 / 20 | 對照檢查兩個閃電剪影，保持 Supabase 的雙段轉折與 Vite 的階梯缺口。 |

原稿輪廓、負空間與寬高比不變。光學設定只控制等比例佔幅和定位；三角型、線寬、RTL 都不改品牌識別。OpenAI 原稿外圍 clip rectangles 未切到墨線，輸出省略多餘 clip，以避免實例 ID 相撞。

## 使用

```tsx
import {
  BrandOpenaiIcon, BrandChatgptIcon, BrandMicrosoftIcon, BrandLinkedinIcon,
  BrandSlackIcon, BrandCursorIcon, BrandSupabaseIcon, BrandViteIcon,
} from '@master/icons/react';

<BrandOpenaiIcon size={16} label="OpenAI" />
<BrandChatgptIcon size={20} label="ChatGPT" />
```

命名沿用專案既有 PascalCase 規則；其他框架和固定尺寸入口亦提供相同名稱。SVG 使用 `brand-openai.svg`、`brand-chatgpt.svg` 等檔名。

本輪檢查原生三尺寸、三角型、淺／深背景、55% 前景色及 DPR 1 / 2。16px 的 Blossom 與 Slack 細節仍依賴足夠對比；未透過描邊加粗改變原稿。既有 64 個品牌的幾何與審查雜湊保持不變。

## 本輪驗證

- 圖示、網站及離線審稿頁建置通過；44 項套件測試、框架型別檢查與封裝消費端驗證通過。
- 驗證 4,176 份 SVG、來源與審查雜湊、9 組下載包；品牌獨立 ZIP 的 648 份 SVG 逐檔回讀一致。
- Chromium／WebKit 各驗證八個新增名稱在 16px 搜尋與開啟，以及英文／繁中下載、線寬輪廓不變、窄螢幕明暗頁面，共 6 項瀏覽器測試通過。
- 離線圖庫顯示 72 個名稱，OpenAI／ChatGPT 的原稿對照均可用，無頁面錯誤。
- Firefox 延續上一輪的本機啟動限制，本輪未重試；未宣稱 Firefox 通過。
