# 專案與文件組織批次 · 驗證紀錄

2026-11-16，0.1.0-alpha.0。前一期詳見 [通用介面驗證](validation-ui-v1.md)。

本批依 [規劃](organization-01-plan.md) 完成10個命名圖稿：kanban、list-tree、folder-tree、layers、pin、pin-off、folder-search、file-search、folder-lock、file-lock。原有210個的全部九組幾何與本批開始前快照完全相同。

總計220個命名圖稿、151個基本概念、1,980 SVG。釘選開關、搜尋和權限變體不重複計入基本概念；資料夾階層歸入一般階層概念。名稱驗證仍要求原始48、通用介面162、本批10的精確聯集。

| 檢查 | 本輪結果 |
| --- | --- |
| pnpm check | 通過 SVG結構／hash、名稱與匯出、九組完整性、重複幾何、來源checksum、審查證據hash、11個API／SSR／tree shaking／幾何測試、TypeScript |
| 固定來源 | 440份當期比較（先前420＋新增20）與48份歷史比較均驗證；每顆兩份同語意原稿 |
| 原有圖稿 | 新增測試驗證上一輪210顆完整definition（含方向）未改變；原始48的精修仍保留 |
| Chromium／WebKit DPR1／2 | 24項瀏覽器測試通過，含1,980×4＝7,920次全組合raster檢查，無空白／裁切 |
| 來源預覽 | 本地服務與file://全部19頁、220顆可載入；210顆真實本輪前稿、10顆新稿明示無舊稿 |
| 實際情境 | 原八頁加上專案組織，共九頁；明暗、桌面／390px手機、導覽與工具列通過。新增範圍搜尋、零結果、看板／清單、釘選及取消釘選操作測試 |
| 套件消費端 | 實際tarball的資料、SVG subpath、固定／動態React及新FolderSearch／PinOff匯出通過 |
| 可重現性 | UTC與Asia/Taipei連續建置的全部輸出逐位元一致 |
| Skill | master-icons v0.3.1驗證通過；安裝版與版本化來源一致 |

Firefox已重新嘗試啟動，仍因 `Could not find profile folder` 退出；本輪列為未驗證，[完整紀錄](review/organization-01/firefox.json)。

## 目視與設計判斷

10顆已逐一對照固定版本的Lucide與Tabler／Hugeicons原稿；查看三尺寸×三圓角、明暗、文字旁、低對比與家族排列。來源觀察、混淆概念、修改及效果判斷見 [逐顆報告](review/ui-v1/index.html#kanban) 與 [本批決策](review/organization-01/decisions.json)。

第一輪發現kanban的16px窄孔，以及file-lock鎖梁靠近折角；已加寬小尺寸卡框、下移共用鎖梁並縮短文件右框。原候選真實保存在 [第一輪畫面](review/organization-01/iteration-1/native.png) 及同目錄原始繪製模組；不以此冒充使用者原圖。

pin-off沿用pin母型，斜線周圍用幾何切口表示遮擋；搜尋與鎖定狀態沿用既有file／folder原生尺寸。16px移除鎖孔點，以保留內孔。layers保留完整頂層與下層露邊，不畫被遮住的線。

逐顆評估後，本批沒有使用虛線、透明度或漸淡：沒有暫時邊界的語意，且低對比圖層需要保留各層輪廓。相關規則與既有ticket／chart-area效果仍保留。

專案組織四張桌面／手機明暗畫面均已檢視，檔案管理新增入口亦已檢查。既有圖稿採不變性驗證，不把未修改的210顆重新冒記為本輪重繪。

所有220筆個別審查仍是Codex目視候選，使用者最終設計定案待確認；維持private alpha，未發布npm或推送遠端。
