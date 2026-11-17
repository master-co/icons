# Atlas 310 · 完稿後來源審美回比

本輪只處理 `packages/icons/src/atlas-scope.json` 的 310 顆新增圖示，使用 master-icons 0.5.11。每顆重新比較固定版本的成熟來源；改稿後再與來源並列，不能承接前輪通過標記。既有 480 顆名稱在本輪範圍之外。

目前 **20 / 310 顆**完成本輪目視與回比：14 顆精修、6 顆保留，290 顆仍待比對。交通與旅行20顆已全部完成本輪個別回比。這是 Codex（AI）的製作審稿紀錄，尚未取得使用者對本輪圖稿的批准。

## 第一批：汽車、公車、列車

| 圖示 | 來源勝點及回修 | 完稿回比 |
| --- | --- | --- |
| car | Lucide的車頭肩線較自然。把擋風玻璃到引擎蓋的直接折點改為短曲線，保留既有Tabler改作的窗帶與輪距。 | 16／20／24的車頂仍清楚，sharp肩點較柔順，窗孔與輪孔沒有變密。這是細微輪廓改善，非整顆重設。 |
| bus | 小尺寸的窗帶分組比窗數更重要。16px改成兩個寬窗，20／24px保留三窗。 | 與Lucide／Tabler原稿同尺寸比較，16px亮點不再密集，長車廂、高窗帶及車頭依然成立。 |
| train | Phosphor的平頂圓肩比原稿通用半圓頂更有車廂形態。重塑頂冠與肩部，保留下收車鼻、雙燈和軌腳。 | 寬頂到下收車鼻的層次較明確；保留全寬前窗，不增加來源的多餘框線。選擇一般車廂器型，沒有追隨Lucide的高速列車U形窄窗。 |

`01-vehicles-before/` 為修改前並列；`01-vehicles-candidate-1/` 為最新稿及逐項判斷。每顆四張 light／dark × DPR1／2 畫面均已實際查看，包含原生三尺寸、三角型與55%文字情境。`decisions.json` 記錄缺陷、來源優勢、具體改動、完稿回比和效果判斷。

`01-native/` 是建置後的原生家族檢視，54個raster cases無空白或裁切；實際查看 native-1-light-1x、native-1-dark-1x、context-light-1x。其餘生成圖不額外計入已查看證據。

## 第二批：電車、自行車、機車

| 圖示 | 來源勝點及回修 | 完稿回比 |
| --- | --- | --- |
| tram | 保留既有Phosphor式全寬前窗與T形集電桿。Lucide雙窗是另一種器型，不因其多一筆便加入窗柱。 | 三尺寸的桿件、窗帶、燈點和軌腳分層清楚；與已修列車的集電結構和方車廂差異仍成立。 |
| bicycle | 原稿車架偏高、輪徑小；放大輪徑、微收輪距、上移輪心。第一候選仍有尖折車把，第二次依Phosphor彎管優點修成連續曲線與短下彎。 | 與Phosphor／Iconoir同尺寸回比，大輪支承與車把管形更自然，輪孔維持開放；不增加細曲柄及後三角底邊。 |
| motorcycle | Phosphor輪身比例較穩定。輪半徑由3增為3.5，輪距略收；底盤、油箱與前叉的共同點改由軸線求交。 | 保留既有流線車身，較大輪子改善支承感；不加入Tabler中央較密的內交叉。 |

修改前、只調輪徑的候選及第二次車把回修分別保存在 `02-cycles-before/`、`02-cycles-candidate-1/`、`02-cycles-final/`。最新批次逐顆查看 light-1x、dark-1x 全圖，以及 native-light-2x、native-dark-2x 原生區；DPR2裁圖保持原始像素，包含全部尺寸／角型與來源A/B。

`02-native/` 建置後原生檢視涵蓋54個raster cases，無空白或裁切；實際查看 native-1-light-1x、native-1-dark-1x、context-light-1x。

## 第三批：滑板車、飛機、直升機

| 圖示 | 來源勝點及回修 | 完稿回比 |
| --- | --- | --- |
| scooter | 保留Phosphor改作的長斜立管、低踏板與寬輪距。Tabler直立管與短踏板是另一種緊湊器型。 | 原生三尺寸輪孔與中央開放區清楚，後輪與踏板實接；沒有為器型差異而增加線條。 |
| plane | 來源的後掠輪廓較俐落。機身寬由4微收至3.6，翼尖厚由2.5減至2，保持對稱俯視姿態。 | 主翼端部較輕，16px仍有連續機身內孔；20／24px的收束比例更清楚。 |
| helicopter | 吸收Lucide窗線轉彎、Tabler較橫向的整體比例；重整座艙前腹，略縮上下支架。 | 前艙向前延伸、下腹收束更自然；雙支柱及窗孔維持清楚，sharp也保留結構窗線曲面。 |

`03-flight-before/`、`03-flight-candidate-1/`、`03-flight-final/` 保存真實前稿、直升機候選及加入飛機微調的最新稿。逐顆查看明暗DPR1全圖與明暗DPR2原生區，包含同尺寸來源、三角型及低對比文字。`03-native/` 建置後54個raster cases無空白或裁切，實際查看 native-1-light-1x、native-1-dark-1x、context-light-1x。

## 第四批：帆船、輪船、船錨

| 圖示 | 來源勝點及回修 | 完稿回比 |
| --- | --- | --- |
| sailboat | Lucide偏置桅杆和大小帆比近等分三角更自然。桅杆左移、右帆向外延伸。 | 大小雙帆更有方向感，16px左帆孔仍清楚，帆底到甲板間距維持。 |
| ship | Lucide船腹的曲面比原稿多邊形更像船殼。改成左右鏡像的連續圓腹，第二次校正控制柄切線。 | sharp也保留船殼曲面；中脊、甲板與水面留白仍成立。 |
| anchor | 保留大環孔、橫桿及回鉤；Tabler大環與Lucide傳統錨爪的優點已有表達。 | 三尺寸環孔及兩臂空白清楚，尖鉤屬合理構造，不把主臂拉成折線。 |

`04-marine-before/`、`04-marine-candidate-1/`、`04-marine-final/` 保存前稿、第一候選與校正控制柄後的稿件。逐顆查看明暗DPR1全圖及明暗DPR2原生區，包含兩份來源、三尺寸、三角型與低對比文字。

`04-native/` 建置後54個raster cases無空白或裁切；實際查看 native-1-light-1x、native-1-dark-1x、context-light-1x。

## 第五批：行李箱、後背包、帳篷

| 圖示 | 來源勝點及回修 | 完稿回比 |
| --- | --- | --- |
| luggage | 兩來源的直立箱身比原稿近方形更自然。箱體由14×13改為12×14，拉桿接點同步提高。 | 小尺寸箱腔清楚，20／24保留直向箱紋；不增加貫穿拉桿及小輪孔。 |
| backpack | Lucide開口訊號更完整，兩來源袋身較直立。先補上方開口，再收窄主袋及前袋。 | 提把、開口、前袋分層清楚，圓肩保留，沒有增加前袋第二道線。 |
| tent | Lucide交叉營柱沿同一條軸線延伸，比原稿近似角度更連貫。 | 重新推算頂端延伸，帳門與布面不變；屬細微結構精修。 |

`05-camping-before/`、`05-camping-candidate-1/`、`05-camping-final/` 保存前稿、第一候選與後背包比例回修後的最新稿。逐顆查看明暗DPR1全圖及明暗DPR2原生區，包含來源回比和低對比文字。

`05-native/` 建置後54個raster cases無空白或裁切；實際查看 native-1-light-1x、native-1-dark-1x、context-light-1x。

## 第六批：露營車、加油機、交通錐

| 圖示 | 來源勝點及回修 | 完稿回比 |
| --- | --- | --- |
| caravan | 來源圓肩車殼比原稿右上直角自然。右肩改成結構曲面，sharp亦保留。 | 左右車殼形態更一致，側窗及輪孔未縮小，不增加車門或升頂線。 |
| fuel | 保留窄泵身與寬油管迴圈。Tabler額外槍口內孔會增加16px密度。 | 三尺寸顯示區、泵身及回彎油管層次清楚，未見需要回修的比例差距。 |
| traffic-cone | Tabler窄冠比原稿寬平頂更有錐形。平頂由5收至3，警示帶依新殼裁切。 | 窄冠向寬底收放更明確，小尺寸上區與警示帶仍清楚；維持平面底板。 |

`06-road-before/` 保存前稿；`06-road-candidate-1/` 是此次通過AI目視的最新候選，未另複製相同稿件為final。每顆已查看明暗DPR1全圖、明暗DPR2原生區與低對比文字。

## 第七批：交通號誌、道路

| 圖示 | 來源取捨 | 完稿回比 |
| --- | --- | --- |
| traffic-light | Phosphor是兩燈方殼，Tabler是三燈膠囊殼；保留三燈方殼及按尺寸分配細節。 | 16px實心點、20／24燈環與短支架均有清楚分組，不為較疏兩燈器型刪除第三燈。 |
| road | 延續Tabler開放路緣和三段中線，不增加Phosphor的地平線。 | 三尺寸路緣與中線留白完整，分段標線有實際道路語意。 |

兩顆皆保留幾何，`07-signals-before/` 即本輪最新稿的回比證據，A/B相同屬實際保留決策。明暗DPR1全圖、明暗DPR2原生區及低對比文字均已查看，沒有以舊通過紀錄代替新檢視。

`06-07-native/` 一起核對這五顆建置後圖稿，90個raster cases無空白或裁切；實際查看 native-1-light-1x、native-1-dark-1x、context-light-1x。其餘生成截圖不列為已查看。

## 驗證與範圍

建置790個名稱及7,110個SVG，審稿建置、完整validate和14項輪廓／接點／繪製／避讓回歸測試通過。Atlas幾何檢查涵蓋310顆，沒有名稱碰撞、重複圖形或越界。工程檢查不代替尚待完成的290顆美感回比。

`consistency.json` 核對本輪狀態、來源與已查看證據雜湊、最新圖稿與建置一致性；本輪以外480顆幾何完全不變。此檔只證明範圍與紀錄一致，不自動判斷美感。

## 繼續方式

下一組從 cloud-rain、cloud-snow、cloud-lightning 等天氣圖示接續，先查看共用雲形與來源，再決定保留或回修；共用母型改動須檢視所有受影響名稱，不能只核對其中一顆。已完成項目仍可因新的具體問題回修，必須保留現有候選，不覆寫證據。

- 真實前稿：`references/atlas-recompare-01/master-before.json`（310顆）。
- 範圍外基準：`references/atlas-recompare-01/outside-scope-before.json`（480顆）。
- 可編輯來源與舊ledger：同一references目錄的`source-before/`、`previous-refinement-ledger.json`及`previous-atlas-provenance.json`。
- 逐項狀態：本目錄`ledger.json`；修改項目的最新審稿也更新到`docs/refinement-ledger.json`，原紀錄完整保存在本輪基準。

生成比較：`node scripts/review-atlas-recompare.mjs BATCH NAME NAME`。每個候選用新批次名稱，腳本拒絕覆寫已存在的證據。實際查看並寫下逐項判斷後，用 `node scripts/record-atlas-recompare.mjs PATH/decisions.json` 登錄；它只檢查人工填入的決策與圖稿一致，不自行作美感判斷。核對：`node scripts/check-atlas-recompare.mjs`。不要重建本輪baseline或將待比對項目自動升級。
