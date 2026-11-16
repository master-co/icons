# 常見產品工作流程批次 · 驗證紀錄

2026-11-16，0.1.0-alpha.0。前批次見 [專案組織](validation-organization-01.md) 與 [通用介面](validation-ui-v1.md)。

依 [本輪規劃](productivity-01-plan.md) 完成60個命名圖稿，分為六組各10顆。新增31個基本概念及29個類型／狀態／方向圖稿，全庫共280個命名圖稿、182個基本概念、2,520份SVG。搜尋別名不增加圖稿。

原始48、通用介面162、專案組織10及本輪60以四份明確清單驗證精確聯集。此前220個完整definition（包括九組幾何及方向）均與本輪前快照相同。先前刪除的倉促擴充圖稿未恢復。

| 檢查 | 本輪結果 |
| --- | --- |
| build / validate | 通過2,520份SVG結構、hash、命名與匯出、九組完整性、重複幾何、來源checksum、審查幾何及證據hash、九組ZIP |
| API、React、tree shaking | 13個Node測試通過；全部280顆×九組SVG／React幾何一致；固定入口tree shaking、無障礙及顯式RTL集合保持相容 |
| TypeScript | pnpm test:types通過 |
| 固定來源 | 560份當期比較與48份歷史比較checksum通過；本輪120份來自固定版本Lucide、Tabler、Iconoir、Hugeicons Free原稿 |
| Chromium／WebKit DPR1／2 | 28項瀏覽器測試通過，含2,520×4＝10,080次全組合raster檢查，無空白／裁切；情境排版修正後相關16項再通過 |
| 來源預覽 | 本地與file://全部24頁、280顆可載入；220顆顯示真實本輪前稿，60顆明示無舊稿 |
| 實際情境 | 共13頁，新增裝置、整合、排程、團隊協作；擴充檔案與編輯器。所有新圖稿均有情境位置。52張桌面／390px手機明暗畫面，手機導覽與工具列無頁面溢位 |
| 新增互動 | 離線藍牙開關、回呼模擬、排程新增／移除、完成工作清除、清單編輯、團隊通知、對話新增、成員權限與移除訪客通過 |
| 實際套件消費 | 5,632個封裝檔案；資料、SVG subpath、固定／動態React、新FileArchive／Webhook／Handshake等匯出通過；比較原稿未混入圖示套件 |
| 可重現建置 | UTC與Asia/Taipei的6,309個輸出逐位元相同 |
| 製作skill | master-icons v0.3.1驗證通過，版本化與已安裝內容一致；既有輪廓、細節、曲線與效果規則完整保留 |

Firefox已再次嘗試，仍以 `Could not find profile folder` 結束，列為未驗證。見 [啟動紀錄](review/productivity-01/firefox.json)。

## 目視與修整

每組先並列固定來源，再繪製Master並檢查16／20／24、sharp／soft／rounded、明暗、文字與55%前景色。逐項用途、相近概念、來源觀察、選擇及效果判斷見 [60顆決策](review/productivity-01/decisions.json) 及 [全庫報告](review/ui-v1/index.html#keyboard)。

- memory-stick首稿的空心小晶片密度過高，改為短實線；16px兩筆，20／24三筆。保留 [首稿](review/productivity-01/iterations/systems-1/native.png) 及同目錄幾何。
- file-archive首稿短桿與方環誤似鎖頭，改為分段拉鍊齒軌與圓拉環；保留 [首稿](review/productivity-01/iterations/files-1/native.png) 及同目錄幾何。
- keyboard、cpu、palette、clipboard-list、clipboard-pen、handshake有明確16px細節減量。file／folder／calendar狀態共用原生母型；需外掛標記時以真實幾何缺口避讓，不以白底或淡化遮掩。
- [跨家族並排](review/productivity-01/families-dark.png) 檢查新舊圖稿的尺寸、重心及密度。情境審查修正了工作清單圖示與文字距離過大的排版問題。

file-archive採用虛線是為了表達分離的拉鍊齒；主要文件框保持實線。端帽沿用三種角型，段長與間距隨原生尺寸變化。以Chromium／WebKit DPR1／2查看SVG／React並列、九組輸出、明暗及55%前景色：[淺底](review/productivity-01/effects-chromium-1x-light.png)、[深底](review/productivity-01/effects-webkit-2x-dark.png)。既有ticket虛線及chart-area的0.2透明度仍保留。本輪其他59顆不使用虛線，60顆均未新增透明度或漸層；個別理由逐項記錄。

[完整瀏覽器紀錄](review/productivity-01/browser-tests.log) · [情境修正後紀錄](review/productivity-01/browser-context-tests.log) · [套件](review/productivity-01/package.log) · [可重現性](review/productivity-01/reproducible.log)。

280筆審查仍為Codex目視候選，使用者最終設計定案待確認。工程通過與設計定案分開；維持private alpha，未發布npm或推送遠端。
