# 下一批：專案與文件組織

沿用上一輪的逐顆來源對照、8–12 顆小批製作與原生目視策略。本批為 10 個命名圖稿，清單固定在 src/organization-scope.json；原始48及上一期162保持原稿。

| 名稱 | 用途與必要線索 | 需區別 | 小尺寸與家族策略 |
| --- | --- | --- | --- |
| kanban | 專案工作流看板：三欄不等長卡列 | dashboard、layout-columns | 三欄保持間距，不加細碎卡片分割 |
| list-tree | 一般階層清單：一條主幹連接縮排列 | list | 16px 保留兩級分支 |
| folder-tree | 檔案目錄：資料夾節點及階層連線 | list-tree、folder | 兩個資料夾節點，限制凸耳密度 |
| layers | 圖層／疊層：完整頂層與下方露出的輪廓 | images、copy | 兩個下層露邊，不畫被遮住的邊 |
| pin | 釘選／置頂：針帽、肩部與針尖 | map-pin、bookmark | 中央針尖和針身連接清楚 |
| pin-off | 取消釘選：同母型加斜線 | pin、ban | 幾何切開遮擋，不用底色或透明遮蓋 |
| folder-search | 將搜尋限於資料夾 | folder、search | 保留原資料夾尺寸，右下為鏡片留開口 |
| file-search | 搜尋文件內容／檔案 | file、search | 保留折角，鏡片與紙面分離 |
| folder-lock | 私人或受限目錄 | folder、lock | 右下外置鎖，保留凸耳與主輪廓 |
| file-lock | 受限文件 | file、lock | 與 folder-lock 共用鎖，保留折角 |

來源沿用上一輪固定 commit 的 Lucide、Tabler、Hugeicons Free 原始 SVG，每顆兩份同語意對照。來源清單獨立存放 references/organization-01；本輪開始前的210顆九組圖稿存 master-before.json。不恢復舊配方。

先對照輪廓、比例、描邊密度、曲率與間距，再發展 Master 母型。每顆評估虛線、透明度／漸淡是否必要；釘選斜線使用真實切口，搜尋與鎖定不用淡化掩飾交疊。三尺寸、三圓角、明暗、低對比、文字及同族並排都需開圖檢視。

釘選開關歸為同概念；搜尋／權限狀態歸入 file／folder；folder-tree 歸入 list-tree 的階層概念。新增4個基本概念，預期總計220名稱／151基本概念／1,980 SVG。全部保持固定方向，不擴張 RTL 鏡射範圍。

接入既有檔案管理情境，加入範圍搜尋、目錄階層、釘選與權限；補上看板／圖層配置場景。完成個別紀錄後才通過驗證。執行完整結構、來源、React／型別、tree shaking、消費端與可重現建置，以及 Chromium／WebKit DPR1／2 全組合；Firefox另記實際結果。維持alpha，不發布或推送。
