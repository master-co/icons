# Craft 03／Expansion 01 · 工程與目視驗收

2026-11-16，private alpha。392 個命名圖稿／244 個基本概念／3,528 份 SVG。前輪結果保存於 [Layers 01](validation-layers-01.md)，不得當作本輪新增圖稿的驗收證據。

已執行：建置及精確範圍驗證通過；全部 3,528 SVG hash、784 份目前來源 checksum、392 顆審查及圖稿 hash、名稱與匯出、重複幾何通過。全九組 SVG／React 一致、原始48相容性、歷史精修範圍、tree shaking 及 TypeScript 通過。另有4項針對接縫、資料庫留白、環內碎屑與尖角越界的回歸檢查通過。

主代理及獨立子代理的逐顆目視紀錄已完成；21個情境頁已接入，112個新增名稱均有實際標籤與使用位置。本輪 Chromium／WebKit DPR 1／2 共36項流程已通過（首輪32項通過；補充資料庫中文搜尋別名後，相關4項重跑通過）。全庫14,112次SVG渲染沒有檢出裁切。21個情境在明暗與1280/390寬度通過；調整搜尋欄間距後另重跑4項情境流程通過。完整23項Node測試與型別通過，7,873檔案的消費端套件通過，8,790個輸出於UTC與台北時區逐位元一致。Firefox本輪重試仍因 Could not find profile folder 無法啟動，列為未驗證。

目視收尾完成：主代理實看全庫392顆按概念並排的14張明暗原生總覽，及五個效果／低對比案例在兩瀏覽器、DPR 1／2的8張證據。獨立子代理逐張實看21情境的84張桌面／手機明暗截圖，發現手機訂單表的更多操作欄被水平溢出遮住；已將顧客姓名移至訂單號下方，保留金額與狀態。修後四張重新目視確認，兩瀏覽器DPR 1／2的全情境流程另重跑4項通過，並加入操作按鈕完整位於可見容器的檢查。

392筆離線逐顆報告在Chromium與WebKit實際開啟，搜尋、修改前／新繪區別、九組圖稿、明暗、手機無橫向溢出及276個不同本地連結均通過。八個前後稿總覽與報告桌面／手機畫面已目視確認。全九組逐顆審查仍以中央ledger及原始批次證據為準，不以並排總覽代替。

[跨家族目視](review/craft-03/cross-family-review.json) · [效果目視](review/craft-03/effects-review.json) · [情境獨立目視](review/craft-03/scenario-visual-review.json) · [離線逐顆報告檢查](review/craft-03/report-check.json) · [手機表格修後流程](review/craft-03/browser-table-layout.log)。

已知限制：Firefox啟動未成功，因此不宣稱其渲染已驗證；volume-low在16px與通用volume同稿，不應用這對圖示區分高／低音量。55%前景的效果檢查只代表所測背景，非任意低對比配色的無障礙保證。

Skill 0.5.2 的結構驗證通過，專案及本機安裝副本完全一致。這項驗證不代替圖稿或skill行為品質的審查。

不以建置或數量達標自動批准設計。使用者最終定案待確認；未發布 npm 或推送遠端。

[核心檢查](review/craft-03/core-checks.log) · [搜尋流程修後](review/craft-03/browser-search.log) · [情境流程修後](review/craft-03/browser-contexts.log) · [Firefox](review/craft-03/firefox.log) · [消費端](review/craft-03/package.log) · [可重現建置](review/craft-03/reproducible.log)。

離線交付實測：[交付檔案驗證](review/craft-03/delivery-check.json)。實際輸出目錄的11,389個檔案逐項驗證checksum；SVG目錄及完整ZIP各3,528份、React套件7,873檔案相符。Chromium／WebKit DPR1／2以file://開啟交付圖庫與報告，搜尋、來源原稿、九組圖稿、單檔下載、修後手機操作及276個本地報告連結通過，未發出網路請求。完整ZIP另以CRC及交付manifest逐項核對。
