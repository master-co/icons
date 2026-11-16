# Clearance 01：遮擋輪廓避讓試作

使用者要求：切口應沿穿越物／前景徽標的外緣一致向外擴，而不是任意縮短線段或挖去右下矩形。本輪先改四顆供檢視，基準為 `025fb009`；其他圖稿未套用新幾何。

專業定義是 **外輪廓等距淨空（offset-contour knockout clearance）**：先取得前景的實際描邊區域，按法向等距外擴，再從背景墨線作布林差集。斜線、×、−使用筆畫聯集；鎖頭等封閉物件包含內部剪影，不能讓背景線從鎖梁孔穿出。切口服從遮擋物，不另外加圓端帽侵入淨空。內置符號與必要結構連接不強行裁切。

| 試作 | 變更 |
| --- | --- |
| phone-off | 從完整 phone 母型裁切，四個切面平行於斜線外擴邊界；保留聽筒曲線 |
| mail-x | 恢復完整信封後，沿 × 兩臂裁切，取消預挖的矩形缺角 |
| file-lock | 按鎖梁與鎖體整體剪影裁切，紙張側邊不穿過鎖孔 |
| folder-lock | 同一鎖頭、同一淨空，背景資料夾只移除實際需要避讓的範圍 |

共同淨空：原生 16／20／24 分別 0.75／1／1.25px，三種圓角使用同一距離。這是待使用者確認的試作值。藍色診斷範圍只出現在審查圖，產品圖稿為單色真透明負空間。

## 全庫盤點與下一步

[280 項盤點](review/clearance-01/scope-audit.json) 區分首批試作、待依新契約精修、層次待判斷、無碰撞符號與必要結構接觸。這是全庫構造篩查，不是宣稱其餘圖稿已通過新契約。user-minus／calendar-minus／folder-minus 等目前屬分離或內置符號，不為減號額外挖洞。

待依新契約複核：bell-off、eye-off、filter-clear、microphone-off、wifi-off、pin-off、mail-check、user-cog、folder-search、file-search、calendar-clock、clipboard-pen、clipboard-copy、clipboard-paste、battery-charging、cloud-upload、cloud-download、external-link。users、copy、images、tags、messages、layers、coins 另須先判斷前後層次與刻意接觸。

## 製作與驗證方式

保留原生母型、前景及共用淨空函式，以製作端 PathKit 1.0.0 展開描邊、外擴與差集，輸出普通填色 path；消費端不包含 WASM、mask、背景色補丁或新效果 API。既有 size／opticalSize／corner／color／RTL／無障礙介面維持不變。這四顆的裁切背景是固定原生線寬輪廓；任意 CSS／React strokeWidth 覆寫不能重新計算其背景淨空，請使用既有尺寸／角型母版。沒有宣稱支援任意重新描邊。

[Skia PathKit 原始 API 文件](https://skia.googlesource.com/skia/+/02f72022c58ad0d3655c139ee26fbd5b05574b6e/site2/docs/user/modules/pathkit.md) 提供描邊展開與路徑差集；本專案在較大計算尺度處理曲線後回到原生座標，避免小圖的曲線近似誤差侵入淨空。測試直接檢查禁入區及 phone-off 四個平行切面，不只測是否輸出成功。

完整條文已寫入 master-icons v0.5.0 的契約及工藝參考，並同步已安裝副本。待使用者檢視這四顆後再推廣其餘相關圖示；不把全庫自動標記通過。
