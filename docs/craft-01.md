# Craft 01：現有 280 顆逐項審查

2026-11-16。範圍是基準 commit `674242d8` 的全部 280 個命名圖稿（182 個基本概念），沒有新增概念、變體名稱或公開 API。原始 48 個名稱仍是相容性基準；本輪依使用者授權精修其中有明確問題的圖稿，不再把「保留歷史圖稿」解讀成禁止任何修正。

按原有 28 組、每組 8–12 顆逐項檢視兩份固定版本原稿、原生 16／20／24 × sharp／soft／rounded、明暗背景、文字旁與 55% 前景色。來源保留自身描邊；沒有把對照資產改細來製造優勢。未改圖稿也寫下各自的保留理由。這是 Codex 設計審查候選，並非使用者最終定案。

## 精修結果

| 圖稿 | 問題與處理 | 影響尺寸 |
| --- | --- | --- |
| chart-bar | 柱內寬 0.75px 太窄；柱寬由 2 增到 2.5px，間距由 2.5 調為 2.25px，內寬成為 1.25px | 16 |
| contact | 頭肩間的可見空隙過小；頭部上移並略縮，保留書冊與肩線 | 16／20／24 |
| mouse-pointer | 尾線起點偏離凹口 0.5 個構造單位；改為同一交點 | 16／20／24 |
| usb | 微小終端孔脆弱；16px 圓／方終端改實心，左支線接回圓周 | 16；支線三尺寸 |
| accessibility | 頭部小孔太小；16px 改實心頭部，保留輪椅輪廓 | 16 |
| file-audio | 空心符頭增加無用微孔；採慣用實心符頭並保留符桿接合 | 16／20／24 |
| file-archive | 16px 拉環孔與齒軌過密；加寬、上移拉環，縮短齒軌並局部使用 1px 描邊及相應虛線間隔 | 16；平切端帽三尺寸 |
| timer | 側按鈕的近似起點與圓周不一致；由圓心、半徑求精確 45° 交點 | 16／20／24 |
| user-cog | 16px 齒輪孔徑約 0.48px；同步擴大齒根、外徑及內孔，孔徑約 1.22px | 16／20／24 |
| handshake | 依使用者指定發展 Lucide 的曲面構造；重畫包覆拇指、手掌起伏、圓弧指節與袖口，16px 縮短內指縫 | 16／20／24 |
| megaphone | 依使用者指定發展 Lucide 的弧形擴音口與彎握柄，局部角型和物體曲面分開 | 16／20／24 |
| ticket | 撕線固定平切端帽，維持短矩形段；外框仍依角型變化 | 16／20／24 |
| indent-increase | 依使用者指定參考 Tabler 的行長關係；中行向右內縮，讓文字與箭頭共同表達增加縮排 | 16／20／24 |
| indent-decrease | 中行向左伸出，與左箭頭共同表達減少縮排，保留與箭尾的負空間 | 16／20／24 |

其餘 266 顆保留幾何。改動選擇以實際缺陷為依據，不設定修改數量配額。原始 48 顆中只有 chart-bar 的 16px 三圓角變更。檔名、React 匯出、RTL 集合、基本概念數均不變。

## 證據與歷史

- 真實前稿：`references/craft-01/master-before.json`，280 顆、九組合完整定義。
- 前輪逐項紀錄：`docs/refinement-ledger-before-craft-01.json`；歷史來源與圖稿未移除。
- 本輪逐項判斷：`docs/review/craft-01/decisions.json`；目前完整紀錄：`docs/refinement-ledger.json`。
- 每批來源／前後／原生證據：`docs/review/ui-v1/craft-*/`；報告 `docs/review/ui-v1/index.html`。
- 14 顆修正的跨瀏覽器原生前後稿、效果與家族並排：`docs/review/craft-01/`。

虛線和透明度逐顆重新評估。ticket 的撕線、file-archive 的齒軌保留虛線；chart-area 的次要面積保留 20% 透明度。其餘圖稿本輪不新增效果；沒有以透明度隱藏輪廓缺陷。file-archive 的較細線寬只用於 16px 齒軌，主外框及拉環維持既有主描邊。

技能更新聚焦三種可重複判斷：孔洞是否承載語意、描邊後的可見空隙，以及接點應接合還是留白。細節見版本化 skill 的 `references/optical-geometry.md`、`references/craft.md` 及 `references/review.md`，同步安裝副本。驗證與尚未驗證項目另見 `docs/validation.md`。

`megaphone`／`handshake` 明確記為 Lucide-informed adapted-redraw，重寫幾何仍保守保留 ISC 來源與授權；單檔 SVG、離線下載、九組 ZIP 與 React 套件皆帶適用 notices。其他比較不因此變成衍生圖稿。
