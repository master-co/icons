# Craft 03 與 Expansion 01

本輪以 `13587b62` 為真實修改前基準。既有 280 個命名圖稿逐顆重新審查；112 個新增命名圖稿按 12 個明確家族繪製，沒有恢復已刪除的倉促擴充稿。現在共 392 個命名圖稿／244 個基本概念／3,528 份 SVG，仍為 private alpha。

## 原有圖稿的審查

獨立子代理初輪精修 22 顆、保留 258 顆。主代理重新檢視這 22 顆，修正 clipboard-pen 的 sharp 筆尖超出畫布問題。擴充稿的獨立複核又發現 package 母型內線接角微凸；同類檢查也修正 hard-drive 機殼接縫。因此最終為既有 280 顆中精修 24 顆、保留 256 顆。

原始 48 個名稱全部保留，本輪只有 copy、bell-off 的幾何改動，其他原始圖稿保持既有精修結果。來源及真實前稿保存在 references/craft-03/master-before.json；中間版本與獨立判斷均保留，沒有將新繪稿偽裝成修改前版本。

- [獨立逐顆審查](review/craft-03/agent-review.json)
- [主代理 22 顆交叉檢視](review/craft-03/root-review.json)
- [兩個母型的追加修正](review/craft-03/root-junctions.json)
- [完整中央紀錄](refinement-ledger.json)

## 新增圖稿與來源

[缺口分析及邊界](expansion-01-plan.md)以 Dashboard、App、Web 與常見商務為範圍。固定九個圖庫的調查版本，從適合的原稿逐顆選取兩份來源；112 顆共 224 份對照，全庫共 784 份目前對照。研究目錄數是所選 SVG 款式或符號索引項目，不能當作各圖庫含所有樣式的行銷總數。

來源名字並非語意保證。本輪修正了 diamond 寶石／菱形、forward 快轉／轉寄、分布工具按導線方向命名等不相符映射。結構參考均明確標記，普通圖庫介面不加逐顆來源標籤；原稿授權在比較資產及 notices 中保留。

全部 112 顆完成主代理及獨立子代理檢視。獨立複核找到 paint-bucket、shuffle、screen-share 的 sharp 端帽微凸，以及 package-check、package-return 繼承的母型接縫；五顆均已修正並再次確認。逐顆證據與最後的全庫跨瀏覽器、跨家族及實際情境驗收分別留存，詳見本輪驗證。

- [批次與逐顆紀錄](review/expansion-01/batches.json)
- [01–04 獨立複核](review/expansion-01/independent-first-four.json)
- [05–07 獨立複核](review/expansion-01/independent-next-three.json)
- [08–10 獨立複核及修正](review/expansion-01/independent-eight-to-ten.json)
- [11–12 及母型修後複核](review/expansion-01/independent-last-two.json)

## 可延伸的工藝判斷

結構內線、箭桿接點需要相接，不能套用徽標避讓。外殼倒角後，要以實際外輪廓重新約束內線收口，避免端帽越過原始頂點。package 使用外殼內部的墨跡交集；hard-drive 建立共同機殼，避免兩個獨立倒角物件產生凸耳。

前景狀態則繼續使用外輪廓等距淨空。循環徽標的內孔不留下後方殘線，放大鏡及齒輪也保留完整占用剪影。資料庫曲線在布林聯集時曾誤填上層空間，已改為先正規化各筆實際描邊區域，再裁切；新增回歸檢查避免同類錯誤。

clipboard-pen 的中心線未越界，sharp 的實際尖角卻超出約 0.22–0.24px，說明邊界檢查必須包含描邊及 miter。圖稿向內移動後已檢視九組原生明暗。

這些教訓已寫入 `master-icons` skill 0.5.2，專案與本機已安裝副本一致。虛線、透明度／漸淡的語意判斷仍保留；本輪 selection 用平切分段表示選取範圍，其餘新增稿沒有因裝飾而增加透明度。volume-low 在16px與既有通用 volume 重合已明記；通用 volume 不應作為高音量狀態使用。

## 驗收狀態

工程結果以 [本輪驗證](validation.md) 為準。21 個情境頁包含原有13頁與新增8頁，新增112個名稱均有帶標籤的使用位置。圖稿工程通過、Codex目視檢查、使用者最終定案分開記錄。未發布 npm 或推送遠端。

最後情境複核修正了手機訂單表的操作欄裁切：顧客姓名改排在訂單號下，保留付款、金額及完整更多按鈕。這是呈現層缺陷，沒有為適應錯誤容器而縮小或重畫圖示。
