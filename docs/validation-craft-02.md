# Craft 02 · 獨立複審與驗證紀錄

2026-11-16，0.1.0-alpha.0。前輪見 [Craft 01](validation-craft-01.md)。依使用者要求，由子代理獨立逐顆重新目視 280 個命名圖稿；追加精修 highlighter、phone-off，其餘 278 顆保留。沒有新增名稱，仍為 182 個基本概念與 2,520 份 SVG。

| 檢查 | 結果 |
| --- | --- |
| build / validate | 2,520 份 SVG 結構、hash、名稱及匯出、九組完整性、重複幾何、來源 checksum、前後幾何及證據 hash、九組授權 ZIP 通過 |
| API、React、tree shaking | 15 個 Node 測試通過；280 × 九組 SVG／React 一致，固定入口 tree shaking、無障礙、顯式 RTL 相容 |
| 歷史與精修範圍 | Craft 01 的 14 顆精修與 Craft 02 的 2 顆精修各自對應真實前稿及明確清單；本輪其餘 278 顆精確相同，原始 48 本輪未改 |
| TypeScript | pnpm test:types 通過 |
| 固定來源 | 560 份當期及 48 份歷史比較 checksum 通過；來源與適用授權保留 |
| Chromium／WebKit DPR 1／2 | 完整 32 項瀏覽器測試通過；10,080 次全組合 raster 無空白／裁切 |
| 離線及本地流程 | 全部 24 頁、280 顆來源／Master／真實前稿可載入；單 SVG 與 ZIP 的 notices 完整，下載 SVG 可解析 |
| 實際情境 | 13 頁、52 張桌面／390px 手機明暗畫面；手機導覽與工具列無頁面溢位，既有互動通過 |
| 套件消費 | 5,633 個封裝檔案；實際消費端資料、runtime、固定／動態 React、SVG subpath 及 notices 通過 |
| 可重現建置 | UTC 與 Asia/Taipei 的 6,311 個輸出逐位元相同 |
| 製作 skill | master-icons v0.4.1 驗證通過，版本化與已安裝副本一致 |

Firefox 再次啟動失敗，訊息為 `Could not find profile folder`，仍列為未驗證：[啟動紀錄](review/craft-02/firefox.json)。

## 目視與獨立審查

子代理實際開啟全部 28 批的來源／前稿／九組明暗並列畫面，再開啟兩批修正後畫面。逐顆用途、保留／修改理由、兩份固定來源、效果判斷、前後 hash 及實際目視證據 hash 均保存於 [獨立審查紀錄](review/craft-02/agent-review.json)。[原始檢視圖](review/craft-02/inspection/initial/core-01.png) 與其餘同目錄圖稿保留；高光筆及關閉通話的修正圖分別為 [編輯工具](review/craft-02/inspection/revised/productivity-03.png)、[客服家族](review/craft-02/inspection/revised/ui-13.png)。

主代理另核對兩顆精修的原生 A/B、三尺寸三角型、明暗、55% 前景與鄰近概念，覆蓋 Chromium／WebKit DPR 1／2：[原生前後](review/craft-02/refined-1-chromium-2x-dark.png)、[家族並排](review/craft-02/families-webkit-2x-dark.png)。手機編輯器工具列也重新檢視。完整來源、九組及本輪理由見 [280 顆審查報告](review/ui-v1/index.html)。

兩顆均不新增虛線或透明度；平切筆尖以幾何表達，關閉通話以真實切口保留斜線。ticket／file-archive 的平切虛線與 chart-area 的 0.2 透明面積精確保留前輪版本，SVG／React 測試再次通過；效果目視沿用 [前輪淺底](review/craft-01/effects-chromium-1x-light.png)、[前輪深底](review/craft-01/effects-webkit-2x-dark.png)，不冒稱本輪新增效果圖。

[瀏覽器紀錄](review/craft-02/browser-tests.log) · [套件](review/craft-02/package.log) · [可重現性](review/craft-02/reproducible.log)。

使用者已肯定前輪 indent-increase、indent-decrease、megaphone、handshake、ticket，本輪精確保留。其他圖稿仍為目視候選；工程通過、獨立複審及使用者最終定案分開記錄。維持 private alpha，未發布 npm 或推送遠端。
