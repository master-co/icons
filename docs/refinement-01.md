> 範圍更新：此文件記錄回退至最初 48 個時的四顆精修。以下四顆精修保留；其餘擴充圖稿已刪除，文末的擴充待辦已取消。

# 精修 01：人物與通知家族

2026-11-16。製作契約已允許必要的虛線、透明度與漸淡；虛線和逐筆透明度的 React 屬性已補齊序列化與測試。漸層 defs / mask 尚未提供實作。

本輪實際修改 user、users、bell、bell-off，共四個命名圖稿、36 份尺寸／圓角 SVG。其餘 2,192 項在本輪逐顆精修紀錄中仍為待比對；先前整庫掃圖不視為已完成逐顆來源研究。

| 圖稿 | 觀察與修改 |
| --- | --- |
| user | 參考 Lucide / Tabler 的頭身層次與 Hugeicons / Iconoir 的弧形肩線，增加頭部比例，修整肩部曲率與頸部留白 |
| users | 與 user 共用人物構圖，調整副人物輪廓、主副間距；Lucide / Tabler 有同語意對照，其餘為母型參考 |
| bell | 參考 Lucide 的外展鐘口與 Iconoir 的流暢外輪廓；將直側壁接鐘口的折轉改為連續曲線，調整鐘舌大小與間隔 |
| bell-off | 參考 Lucide / Tabler 的斷線處理；第一候選仍有缺口過大問題，第二次補回鐘頂、左側壁與鐘口，維持斜線間隙 |

參考採固定 commit 的原始圖稿，展示保留原描邊，統一使用 currentColor。新增四份 Lucide / Tabler 對照資產附 SHA-256，來源見 references/refinement-01/manifest.json；既有對照見 references/manifest.json。具體圖形自行以原生幾何重建，既有保守 notices 保留。

A/B 的 A 為修改前保存的真實 definitions，B 為本輪候選。檢查原生 16 / 20 / 24、三圓角、明暗與文字情境；產生 12 張細節截圖，舊／新兩組共 144 個 DPR 1 / 2 raster 案例。目視檢查來源並列、原生淺色、深色文字情境及第二次 bell-off 調整。未將偏好判斷標為用戶定案。

逐顆進度與每顆引用存於 refinement-ledger.json。下一批優先處理膨脹構圖及細節擁擠的 brain、pineapple、keyboard、cpu，再依家族展開；這些項目目前尚未精修。
