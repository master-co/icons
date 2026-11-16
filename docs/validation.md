# Craft 01 · 驗證紀錄

2026-11-16，0.1.0-alpha.0。前輪紀錄保存在 [工作流程批次](validation-productivity-01.md)。本輪重新目視全部 280 個命名圖稿，精修 14 顆、保留 266 顆；基本概念仍為 182，九組輸出共 2,520 份 SVG。沒有新增名稱或公開 API。

| 檢查 | 結果 |
| --- | --- |
| build / validate | 2,520 份 SVG 結構、hash、名稱及匯出、九組完整性、重複幾何、來源 checksum、逐項前後幾何及證據 hash、九組授權 ZIP 通過 |
| API、React、tree shaking | 15 個 Node 測試通過；280 × 九組 SVG／React 一致，固定入口 tree shaking、無障礙、顯式 RTL 相容 |
| 歷史與精修範圍 | 真實 280 顆前稿保留；只有明確列出的 14 顆改動，其餘逐位元一致；原始 48 中只修改 chart-bar 的 16px |
| TypeScript | pnpm test:types 通過 |
| 固定來源 | 560 份當期及 48 份歷史比較 checksum 通過；megaphone／handshake 的 Lucide 角色更新為 adaptation-source |
| Chromium／WebKit DPR 1／2 | 原完整 28 項及新增授權下載 4 項均通過；10,080 次全組合 raster 無空白／裁切 |
| 離線及本地流程 | 全部 24 頁、280 顆來源／Master／真實前稿可載入；單 SVG 與 ZIP 中的 Lucide notices 完整，下載 SVG 可被 XML parser 解析 |
| 實際情境 | 13 頁、52 張桌面／390px 手機明暗畫面；手機導覽與工具列無頁面溢位，既有情境互動通過 |
| 套件消費 | 5,633 個封裝檔案；實際消費端資料、runtime、固定／動態 React、SVG subpath 及適用 notices 通過 |
| 可重現建置 | UTC 與 Asia/Taipei 的 6,310 個輸出逐位元相同 |
| 製作 skill | master-icons v0.4.0 驗證通過，版本化與已安裝副本相同 |

Firefox 再次啟動失敗，訊息為 `Could not find profile folder`，仍列為未驗證：[啟動紀錄](review/craft-01/firefox.json)。

## 目視證據

28 批逐顆檢查兩份固定來源、三尺寸三圓角、明暗背景、文字旁及 55% 前景色。每顆均有具體保留／修改理由，見 [280 顆決策](review/craft-01/decisions.json) 與 [完整來源及前後報告](review/ui-v1/index.html)。14 顆精修另有 Chromium／WebKit、DPR 1／2 的原生前後畫面；代表證據為 [第一組](review/craft-01/refined-1-webkit-2x-dark.png)、[第二組](review/craft-01/refined-2-chromium-2x-light.png)、[家族並排](review/craft-01/families-light.png)。

ticket 撕線與 file-archive 齒軌使用平切端帽，外框維持各自角型；16px 齒軌另調段長、間距及局部線寬。chart-area 保留 0.2 面積透明度。SVG／React、九組、明暗及 55% 前景的效果檢查見 [淺底](review/craft-01/effects-chromium-1x-light.png)、[深底](review/craft-01/effects-webkit-2x-dark.png)。其他圖示不因審查而機械加入效果。

[完整瀏覽器紀錄](review/craft-01/browser-tests.log) · [授權下載紀錄](review/craft-01/browser-notices.log) · [套件](review/craft-01/package.log) · [可重現性](review/craft-01/reproducible.log)。

使用者已肯定 indent-increase、indent-decrease、megaphone、handshake、ticket 的本輪修正。其餘仍為 Codex 目視候選；工程通過、目視審查及使用者最終定案分開記錄。維持 private alpha，未發布 npm 或推送遠端。
