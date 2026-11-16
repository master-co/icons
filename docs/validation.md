# Craft 05 · 工程與目視驗證

2026-11-16 · private alpha。392 個命名圖稿、244 個基本概念、3,528 份 SVG；59 顆變更、333 顆保留，沒有新增名稱。前輪報告保存於 [Craft 04](validation-craft-04.md)。

## 本輪工程結果

- `bun run build`、`bun run validate`、`bun run test`、`bun run type-check` 通過。36 項 Node 測試通過；Astro、Svelte 與 TypeScript 無錯誤或警告。
- 驗證精確名稱集合、3,528 份 SVG 結構與 checksum、784 份固定來源、逐顆審查及前稿 hash、重複幾何、全部 React／SVG 九組一致、無障礙、RTL 與 tree shaking。
- 新增輪廓、內孔及相接測試，涵蓋閉合對稱、內部接縫、外接部件、徑向端帽、羅盤尖端與清單箭頭間距。以真實 Craft 05 前稿作負向對照，證明 11 個舊問題會觸發對應幾何檢查；沒有以偽造圖稿或單純快照替代。
- Chromium／WebKit DPR 1／2 共 36 項預覽流程通過；3,528 × 4＝14,112 次圖稿渲染未檢出裁切。涵蓋離線圖庫、兩份來源及真實前稿、搜尋、下載、九組選項與 21 個情境的桌面／手機明暗流程。
- 7,872 個檔案的消費端套件通過 data、runtime、動態／固定 React、SVG subpath 與 notices 檢查。13,141 個套件及離線預覽建置輸出在 UTC 與 Asia/Taipei 下逐位元一致。
- Astro 正式建置成功。這次既有 4321 預覽程序不回應，另啟 Astro preview 亦啟動逾時；沒有中斷使用者原有程序。改以隔離 4331 埠服務 `site/out` 靜態產物，僅在暫存副本改測試 base URL，完整 20 項 Chromium／WebKit 網站流程通過。此結果證明建置產物及瀏覽器流程，不代表 Astro preview 啟動問題已解決。
- 逐顆離線報告在 Chromium、WebKit 通過 392 項、搜尋、明暗、九母版、真實前稿、手機版面及 288 個本地連結檢查。
- Skill 0.5.4 結構驗證通過；專案與已安裝副本逐檔相同。

## 本輪實際目視範圍

49 批 × 8 顆，全部 392 顆重新查看兩份固定原稿、真實前稿與目前圖稿、16／20／24 × sharp／soft／rounded、淺底／深底、文字旁與 55% 前景。每顆個別理由及證據在 [ledger](refinement-ledger.json)；審查圖稿 hash 與目前原始碼再次核對一致，沒有沿用舊子代理的通過標記。

跨家族複核 7 張概念並排頁，覆蓋 392 顆原生三尺寸。八個核心情境各實看一張：Dashboard 桌面淺底、資料表手機深底、設定桌面深底、檔案手機淺底、編輯器桌面淺底、客服手機深底、訂單桌面深底、帳單手機淺底。其餘 76 張情境截圖保留作流程證據，不宣稱全數重新目視。見 [實看紀錄](review/craft-05/visual-followup.json)。

效果頁實看 Chromium 1x 淺底及 WebKit 2x 深底，SVG／React 成對及 55% 前景可辨。ticket／file-archive 使用 stroke-dasharray，selection 以分離的平切角段及中段表達視覺虛線；不能因沒有 dasharray 屬性誤判它沒有虛線。chart-area 保持純輪廓，本輪無圖稿使用逐筆透明度，允許必要時使用的契約仍保留。

## 已知限制

- Firefox 本輪重試仍因 `Could not find profile folder` 啟動失敗，未驗證。見 [探測紀錄](review/craft-05/firefox-probe.json)。
- Astro preview 啟動逾時未在本輪修復；網站以正式靜態產物完成驗證。
- volume-low 在 16px 與通用 volume 共用圖稿的既有簡化保持；20／24 的聲波數仍不同。
- 55% 前景檢查不保證任意配色均符合對比需求。Codex 目視紀錄與使用者最終設計定案分開，狀態仍為 alpha candidate。

[建置](review/craft-05/build.log) · [核心檢查](review/craft-05/core-checks.log) · [圖庫瀏覽器](review/craft-05/browser-tests.log) · [網站靜態流程](review/craft-05/site-static-tests.log) · [消費端](review/craft-05/package.log) · [可重現建置](review/craft-05/reproducible.log) · [離線報告](review/craft-05/report-check.json)。

本輪未發布 npm、未推送遠端、未建立 Git commit。
