# Layers 01 · 單顆精修驗證

2026-11-16，private alpha。依使用者指定的 Lucide 方向精修 layers，九組母版均更新；其餘279顆精確保留，包含 Clearance 01 的四顆試作。仍為280名稱／182基本概念／2,520份SVG。前輪紀錄見 [Clearance 01](validation-clearance-01.md)。

- build／validate：全庫SVG、名稱、匯出、重複幾何、來源checksum、前後稿及目視證據hash通過。
- 17項Node測試、SVG／React全九組一致、tree shaking、歷史精修範圍及TypeScript通過。
- Chromium／WebKit DPR 1／2 的32項流程測試通過；包括全庫10,080組raster、本地與離線來源及前稿載入、下載、桌面與手機情境。
- layers 另檢視兩份固定來源、真實前稿、三尺寸三角型、明暗、55%前景與文字／同排圖示；[前後圖](review/layers-01/summary.png)、[原生深色](review/layers-01/native-webkit-2x-dark.png)。
- 消費端套件與UTC／Asia/Taipei可重現建置通過，詳見本輪日誌。
- Skill v0.5.1 驗證通過；專案與已安裝副本一致。新增判斷針對重複物體的可見輪廓及結構曲線，不將個案偏好推廣為全庫更尖或更圓。

Firefox 沿用既有啟動失敗的未驗證狀態，本輪未重試。沒有新增效果或公開API；layers 由獨立原生曲線繪製，依有意借鑑的Lucide構造保留ISC notice。SVG／React套件、SVG單檔與ZIP均保留授權。

只有layers的中央目視紀錄更新；[前輪紀錄](review/layers-01/previous-review.json)保留。前次把「三層、分離、等距」當成足夠理由的不足，已記入[設計教訓](layers-01.md)。使用者最終設計定案仍待檢視。

[瀏覽器](review/layers-01/browser-tests.log) · [套件](review/layers-01/package.log) · [可重現性](review/layers-01/reproducible.log)。未發布npm或推送遠端。
