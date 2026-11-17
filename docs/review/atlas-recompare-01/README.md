# Atlas 310 · 完稿後來源審美回比

本輪只處理 `packages/icons/src/atlas-scope.json` 的 310 顆新增圖示，使用 master-icons 0.5.11。每顆重新比較固定版本的成熟來源；改稿後再與來源並列，不能承接前輪通過標記。既有 480 顆名稱在本輪範圍之外。

本輪 **310 / 310 顆**已完成逐項目視與來源回比，目前有 140 顆精修、170 顆採用本輪開始前的圖稿。每顆的審美決策、來源版本和對照圖可由 [逐項紀錄](ledger.json) 查閱。審稿人為 Codex（AI），使用者定案狀態見逐項紀錄。

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

## 第八批：雨、雪、雷、霧

四顆共用同一個開放雲母型，先一起修輪廓，再分別判斷降水訊號。原稿近對稱三瓣雲偏帽形；Lucide大左雲團接小右雲瓣更成熟，因此沿既有改作關係合併左側與頂冠，保留開放雲底。

| 圖示 | 個別取捨 | 完稿回比 |
| --- | --- | --- |
| cloud-rain | 保留三道錯落直雨線，不採Tabler短碎線。 | 雲形主次更自然，16px雨線仍可分辨。 |
| cloud-snow | 第一候選仍像五點骰子，第二候選改成20／24六點錯列，16保留三點並錯開高度。 | 雪點更有下落節奏，沒有擠入雲腔或黏成塊。 |
| cloud-lightning | 保留既有閃電尺度和折返，只修共用雲形。 | 雲與閃電的張力更協調，sharp折返與自然雲曲面各自成立。 |
| cloud-fog | 第一候選霧帶仍太置中，第二候選改為長短與左右錯位。 | 霧帶更有漂移感，16px仍有清楚垂直間隙。 |

`08-precipitation-before/`、`08-precipitation-candidate-1/`、`08-precipitation-candidate-2/` 保存真實前稿及兩輪候選。每顆最新稿均查看明暗DPR1全圖與明暗DPR2原生區，包含三尺寸、三角型、兩份來源與低對比文字。

## 第九批：晴時多雲、夜間多雲

| 圖示 | 來源勝點及回修 | 完稿回比 |
| --- | --- | --- |
| cloud-sun | 合併前景雲左小瓣與頂冠；第二輪將太陽三道光芒統一長度和放射半徑。 | 主雲團更完整，光芒由散點變為短射線，雲日之間仍有透明間距。 |
| cloud-moon | 與cloud-sun共用較完整的低雲，保留月牙本身並重算避讓。 | 月牙內凹與月尖仍清楚，雲體增大沒有吞掉夜間訊號。 |

`09-sky-before/`、`09-sky-candidate-1/`、`09-sky-candidate-2/` 保存前稿、只修雲形的候選與光芒回修稿。兩顆皆完成最新稿的明暗DPR1全圖、明暗DPR2原生區與55%文字檢視。共用母型只作用於本輪六顆天氣圖，未更動範圍外既有cloud圖示。

`08-09-native/` 核對六顆建置後圖稿，108個raster cases無空白或裁切；實際查看 native-1-light-1x、native-1-dark-1x、context-light-1x。其餘生成截圖不列為已查看。

## 第十批：日出、日落、風、雪花

| 圖示 | 來源取捨及回修 | 完稿回比 |
| --- | --- | --- |
| sunrise | 依Lucide／Tabler的放射構造，將斜光芒移到太陽圓心的45度射線。 | 光芒與半日關係更完整，上箭頭和日冠保持分離；不額外加入貼近地平線的短橫。 |
| sunset | 與sunrise共用校正後的光芒，保留向下箭頭與日冠間距。 | 原生小尺寸的下降方向仍清楚，光芒不再像左右散置的斜點。 |
| wind | 吸收Lucide較小、較開放的捲尾，半徑由2.5／3／2.5收為2／2.5／2，回彎由270度縮至約217度。 | 水平氣流成為主體，近封閉圓圈的厚重感消退，三段切向承接保留。 |
| snowflake | 保留六向主枝與單層分叉，不增加來源的中央六角環。 | 明暗16px仍可辨認分叉；主枝實接與開放枝間空白成立。 |

`10-weather-before/`、`10-weather-candidate-1/` 保存真實前稿及最新候選。四顆各自查看明暗DPR1全圖、明暗DPR2原生區、三尺寸三角型、來源回比與55%文字。`10-native/` 建置後72個raster cases無空白或裁切，實際查看 native-1-light-1x、native-1-dark-1x、context-light-1x。

## 第十一批：葉子、幼苗、松樹

| 圖示 | 來源取捨及回修 | 完稿回比 |
| --- | --- | --- |
| leaf | 保留飽滿葉腹、斜向葉尖和單一延伸莖脈，不改成Tabler較方的上緣。 | 三尺寸葉腹與內脈空白完整；來源為不同合理葉型，沒有需要增加側脈的優勢。 |
| sprout | 先縮小左葉，再依Lucide微彎莖的姿態回修；最後處理sharp莖端穿過地面的微小凸刺。 | 大小葉有清楚主次，彎莖與地面實接，葉孔保持開放。 |
| tree-pine | 第一候選只收底部造成下層過陡；第二輪重排三層為9／12／17寬，延長樹冠並縮短樹幹。 | 枝層斜率與凹口節奏一致，較直立的剪影仍保留針葉特徵。 |

`11-plants-before/`、`11-plants-candidate-1/`、`11-plants-candidate-2/`、`11-plants-final/` 保留前稿、比例候選、曲莖及枝層候選、接點修正後稿。三顆最新稿均查看明暗DPR1全圖與明暗DPR2原生區，涵蓋來源、三尺寸、三角型與55%文字。

`11-native/` 建置後54個raster cases無空白或裁切；實際查看 native-1-light-1x、native-1-dark-1x、context-light-1x。其餘生成截圖不列為已查看。

## 第十二批：闊葉樹、花朵、仙人掌

| 圖示 | 來源取捨及回修 | 完稿回比 |
| --- | --- | --- |
| tree-deciduous | 參考Tabler較高的分枝配置，提高主幹及20／24的枝叉；第二輪合併雙枝的中央接角。 | 枝叉離開冠底，樹冠上下空間較均衡；16仍省略雙枝。 |
| flower | 兩來源花心較明確，將現稿花心半徑由2增為2.5。 | 中心孔更清楚，仍與六瓣保有間距；不加入來源的密集內線。 |
| cactus | 採用Phosphor肉質側枝構造，將兩臂與主莖合為連續輪廓；第二輪修四個接肩曲面。 | 主莖與側枝體量一致，16px枝內及枝間通道仍清楚，sharp也保留自然曲面。 |

`12-nature-before/`、`12-nature-candidate-1/`、`12-nature-candidate-2/` 保存前稿與兩輪候選。每顆最新稿查看明暗DPR1全圖、明暗DPR2原生區，包含三尺寸三角型、兩份來源與55%文字。`12-native/` 的54個raster cases無空白或裁切，實際查看 native-1-light-1x、native-1-dark-1x、context-light-1x。

仙人掌保留原有Tabler改作歷史，新增Phosphor改作來源。`licenses/cactus-sources.txt` 含兩份完整MIT條款；已核對九個SVG、共用套件license及catalog雙來源欄位，validate亦核對九個ZIP。原來源及前稿保存在本輪baseline，沒有因重畫而抹除歸屬。

## 第十三批：山脈、雪山、波浪、水滴

| 圖示 | 來源取捨及回修 | 完稿回比 |
| --- | --- | --- |
| mountain | 保留Lucide式高低雙峰，不加入Phosphor的太陽或額外分界。 | 谷口、尖峰與共用山腳在原生三尺寸成立。 |
| mountain-snow | 保留雙峰內單道曲線雪界，不改為Tabler單峰的折線雪帽。 | 雪線與谷口、山腳保持空間，接邊沒有穿出山體。 |
| waves | 採納Tabler較長週期的起伏，每道由兩組短波改為一組寬波峰及波谷。 | 16px不再像碎鋸齒；三線間距、切線連續和三尺寸流動感均成立。 |
| droplet | 保留現有對稱弧肩、尖端與圓腹，不追隨來源不同的收頸／直錐比例。 | 原生小尺寸內孔完整，圓腹相切和閉合尖端沒有可見缺陷。 |

`13-landscape-before/`、`13-landscape-candidate-1/` 保存真實前稿與最新回比。四顆均查看明暗DPR1全圖、明暗DPR2原生區及55%文字；三顆未修改也以本輪新畫面作保留判斷。波浪已從獨立構造更新為Tabler改作，補上來源、完整MIT條款和notices；前稿及舊分類保留在baseline。

`13-native/` 建置後72個raster cases無空白或裁切；實際查看 native-1-light-1x、native-1-dark-1x、context-light-1x。其餘生成截圖不列為已查看。

## 第十四批：貓、狗、魚

| 圖示 | 來源勝點及回修 | 完稿回比 |
| --- | --- | --- |
| cat | 沿Lucide三角鼻與較寬貓頰回修；第一輪改鼻形，第二輪稍增頰寬並修順控制柄。 | 鼻部具有方向性，圓頰與尖耳比例較自然，不增加鬍鬚或表情。 |
| dog | 先將窄直下頰改為較寬圓頰，再將雙眼下移到13.5。 | 眼鼻形成較集中分組，垂耳與臉型層次完整，16px仍分得開。 |
| fish | 沿Tabler修長魚身的優點收窄魚腹，尾鰭同步略收。 | 身尾比例較舒展，魚眼和鰓線仍清楚，不增加Lucide的背腹鰭。 |

`14-animals-before/`、`14-animals-candidate-1/`、`14-animals-candidate-2/` 保存前稿和兩輪候選。三顆最新稿皆查看明暗DPR1全圖、明暗DPR2原生區，涵蓋兩來源、三尺寸、三角型和55%文字。

`14-native/` 建置後54個raster cases無空白或裁切；實際查看 native-1-light-1x、native-1-dark-1x、context-light-1x。首次validate遇到輸出目錄正在替換，確認建置已停止後重跑，全7,110個SVG及14項測試通過；未把中途檔案數當成最終結果。

## 第十五批：鳥、兔子、烏龜

| 圖示 | 來源取捨及回修 | 完稿回比 |
| --- | --- | --- |
| bird | 沿Lucide較短的喙回修，sharp額外回收尖端；雙足末端統一到22。 | 喙成為從屬特徵，尖角不過長，站立落點一致。 |
| rabbit | 保留Phosphor式正面長耳與圓頰，不加入內耳和口鼻細線。 | 原生耳孔、耳根及眼鼻分組清楚，與貓狗正面分類圖一致。 |
| turtle | 沿Lucide的前伸頭頸與寬短足，重建低拱背甲和部件接合。 | 低矮動物體量更完整，16仍省略甲紋，足孔與頭部空腔維持。 |

`15-creatures-before/`、`15-creatures-candidate-1/`、`15-creatures-candidate-2/` 保存前稿與候選。最新稿逐顆查看明暗DPR1全圖、明暗DPR2原生區及55%文字。`15-native/` 建置後54個raster cases無空白或裁切；實際查看 native-1-light-1x、native-1-dark-1x、context-light-1x。完整validate及14項回歸測試通過。

## 第十六批：蝸牛、蝴蝶、蜜蜂

| 圖示 | 來源勝點與回修 | 完稿回比 |
| --- | --- | --- |
| snail | 第一輪只修頸根小圓角，使用者指出仍無一體感。重新開啟並重畫頭頸至腹足的連續曲線，頸部逐漸展開接入身體。 | 直管與硬水平折點消除，圓頭、斜頸和腹足連為完整身形；觸角按新頭部收口。 |
| butterfly | 使用者偏好Phosphor。撤回分叉觸角候選，進一步靠齊來源的大上翼、小圓下翼及短身比例。 | 翼根收束與上下翼主次更完整；20／24保留短內折線，16省略。 |
| bee | 兩來源長翅的方向感比原稿小圓耳狀翅片清楚；兩輪拉長雙翼為斜上伸的圓端翼片。 | 翅片長軸更明確，16翼孔與條紋腹部仍分開；保留獨立繪製的正面構造。 |

`16-invertebrates-before/` 與三個候選保存過程；蝴蝶、蜜蜂最新證據在 `16-invertebrates-candidate-3/`，蝸牛最新證據在 `16-snail-candidate-4/`。各顆皆實際查看明暗DPR1全圖、明暗DPR2原生區與55%文字。`16-snail-reopened.json` 完整保存使用者指出問題時的舊決策和global紀錄，未覆寫原先證據。

蝴蝶繼續如實歸屬Phosphor改作，未因重繪而抹除MIT來源。`16-feedback/comparison.html`／`comparison.png` 整理蝴蝶與蝸牛的前稿、最新候選及來源，放大圖下另列原生16／20／24，已實際查看。來源偏好及缺陷回饋不等同使用者對最新候選的批准。

## 第十七批：掌印

沿Tabler斜向趾墊的優點，將四個圓趾改為左右鏡像的橢圓：內趾傾斜12度、側趾25度。掌墊和中心間距保留；16使用實心橢圓，20／24保留內孔。最新稿逐顆與Lucide／Tabler比較，趾墊的長軸和向外展開姿態比正圓自然，掌趾之間仍有空間。

`17-paw-before/` 與 `17-paw-candidate-1/` 保存前稿及最新候選。明暗DPR1全圖、明暗DPR2原生區與55%文字皆已實際查看。

`16-17-native/` 一起核對這四顆建置後圖稿，72個raster cases無空白或裁切；實際查看 native-1-light-1x、native-1-dark-1x、context-light-1x。全7,110個SVG的validate、範圍一致性和14項回歸測試通過。

## 第十八批：蘋果、櫻桃、葡萄

| 圖示 | 來源取捨及回修 | 完稿回比 |
| --- | --- | --- |
| apple-fruit | 保留現有雙肩、收腹、底凹和短彎梗，不加入Tabler高光短線。 | 與Lucide／Tabler比較，三尺寸果形及梗身承接完整，無需為差異而重畫。 |
| cherry | 沿Tabler的果葉關係補回橫向葉片，雙果改為大小及高度錯落，重畫共梗。 | 葉、梗、果形成完整櫻桃；16葉孔與雙果間距仍清楚。 |
| grape | 第一輪拉近放大六果，第二輪沿Tabler補上頂端葉片及短梗，重分配果串空間。 | 六個分散小圓變為連貫果串，三尺寸保留六個果孔；後方墨線不侵入前果空腔。 |

`18-fruit-before/`、`18-fruit-candidate-1/`、`18-fruit-candidate-2/` 保存前稿及兩輪候選。最新稿逐顆查看明暗DPR1全圖、明暗DPR2原生區與55%文字；蘋果雖未修改，也完成本輪新回比。櫻桃與葡萄繼續保留Tabler改作及MIT歸屬。

## 第十九批：柑橘切片、香蕉、胡蘿蔔

| 圖示 | 來源勝點及回修 | 完稿回比 |
| --- | --- | --- |
| citrus | 第一輪恢復16px果皮環並將果肉改三瓣；第二輪擴大內外半徑各1單位，20／24維持四瓣。 | 皮環在小尺寸保留果種特徵，果瓣留白更舒展，共用直徑只畫一次。 |
| banana | 沿Tabler短直果梗與梗下展肩回修，內外曲面切向接回梗壁。 | 梗與彎果腹層級更明確，不添加Lucide剝皮狀態的多餘果皮線。 |
| carrot | 沿兩來源錯落根紋的優點，將20／24第二道根紋移到右側中段，16仍保留單道。 | 兩側墨量更均衡，尖端空間釋出，根紋收於外殼內。 |

`19-produce-before/`、`19-produce-candidate-1/`、`19-produce-candidate-2/` 保存前稿與兩輪候選。三顆最新稿均查看明暗DPR1全圖、明暗DPR2原生區、三角型與55%文字；香蕉比較明記Lucide為剝皮姿態，沒有把不同狀態的細節當作必要新增。

`18-19-native/` 核對這六顆建置後圖稿，108個raster cases無空白或裁切；實際查看 native-1-light-1x、native-1-dark-1x、context-light-1x。`18-19-overview/comparison.html`／`comparison.png` 為六顆前後概覽，已實際查看。全7,110個SVG的validate、範圍一致性與14項回歸測試通過。

## 第二十批：玉米、蘑菇、雞蛋

| 圖示 | 來源取捨與回修 | 完稿回比 |
| --- | --- | --- |
| corn | 參考來源穗葉主次，將寬花瓣狀苞葉改為狹長下收曲面；16改二列二排，20／24二列三排。 | 長穗與分列穗粒更明確，sharp葉尖另回收以補償斜接延伸；各粒孔及葉間空腔仍清楚。 |
| mushroom | 採納Hugeicons弧形蓋緣與下展菌柄，保留Tabler閉合簡潔構造；第二輪修蓋唇及柄底曲面。 | 菌蓋與菌柄有自然收放，16仍有寬蓋與柄內孔，不增加斑點和雙層蓋緣。 |
| egg | 保留上窄下寬的連續卵形，不改成Lucide較寬的圓底或添加裂紋。 | 三尺寸頂冠、側腹、圓底連續；來源比例差異未形成需要回修的勝點。 |

`20-harvest-before/`、`20-harvest-candidate-1/`、`20-harvest-candidate-2/` 保存前稿及兩輪候選。三顆最新稿都查看明暗DPR1全圖、明暗DPR2原生區與55%文字；雞蛋雖保留，也完成本輪新比較。

蘑菇保留Tabler改作歷史，新增Hugeicons實際採納來源。`licenses/mushroom-sources.txt` 包含兩份完整MIT條款，來源及修改如實寫入provenance和notices。

## 第二十一批：小麥

舊稿三枚大穀粒仍像幼苗；Lucide成對穀粒沿斜莖排列的構造更能表達麥穗，因此重畫為七粒斜麥穗。三對穀粒共用母型和莖節，頂粒及短莖形成完整收束。第二輪在soft／rounded的粒尖和頂粒轉角加入實際圓弧，按原生半徑換算；sharp保留穀粒尖端。莖的墨線限制於各粒空腔之外，保持相接而不穿孔。

`21-wheat-before/`、`21-wheat-candidate-1/`、`21-wheat-candidate-2/` 保存三粒前稿、七粒候選及實際圓角回修。最新稿已與Lucide／Tabler在明暗DPR1／2、三尺寸三角型及55%文字回比，16仍可分辨七個粒孔；此次選擇較完整的麥穗，不固守舊三粒比例。

當前七粒構造明記為Lucide改作，原Tabler三粒稿及歸屬保存在baseline及baseSource。`licenses/wheat-sources.txt` 含原Tabler及新增Lucide完整條款，provenance及notices明確區分當前來源與歷史來源。

`20-21-native/` 核對這四顆建置後圖稿，72個raster cases無空白或裁切；實際查看 native-1-light-1x、native-1-dark-1x、context-light-1x。`20-21-overview/comparison.html`／`comparison.png` 為前後概覽，已實際查看。18個蘑菇與小麥SVG均含完整雙來源條款，套件license及catalog歷史欄位亦已核對；全validate另核對九個ZIP。範圍一致性與14項回歸測試通過。

## 第二十二批：咖啡杯、汽水杯、酒杯

| 圖示 | 來源取捨與回修 | 完稿回比 |
| --- | --- | --- |
| coffee | 沿Lucide杯身構造，圓腹改為相切圓弧收至短平底；第二輪拉長蒸氣並舒展曲率，杯口加入實際微圓。 | 蒸氣較像上升筆畫、杯底有落點；16單筆、20／24雙筆，杯孔與把手孔保持清楚。 |
| cup-soda | 保留Lucide方向的彎吸管、收底杯身與單道水面，沒有移植Tabler帶蓋器型。 | 原生三尺寸吸管接杯緣、杯底與水面空腔都清楚，本次比較沒有需要回修的勝點。 |
| wine | 沿Phosphor圓腹高腳杯略收杯口與杯腹，上提杯底以延長杯腳，降低酒面起伏。 | 杯腹與杯腳比例更均衡，16兩個杯內空腔清楚，soft／rounded杯口有實際曲線過渡。 |

`22-drinks-before/`、`22-drinks-candidate-1/`、`22-drinks-candidate-2/` 保存前稿及兩輪候選。三顆最新稿均查看明暗DPR1全圖、明暗DPR2原生區、三角型及55%文字；汽水杯的保留決策同樣基於本輪新比較。

## 第二十三批：啤酒杯、牛奶盒、飲料瓶

| 圖示 | 來源取捨與回修 | 完稿回比 |
| --- | --- | --- |
| beer | 沿Lucide改作重畫中央主泡、側泡及淺波形下緣，杯身稍收窄；第二輪統一泡沫、杯紋和杯身中軸。 | 泡沫有主次並自然承接杯身，16保留單道杯紋，20／24雙道，三個主要空腔仍可辨。 |
| milk | 依Hugeicons紙盒重排封口帶、三角側折、斜頂及寬正面；Lucide奶瓶作同概念不同器型比較。 | 封口與折面比舊幾何屋頂明確，16封口帶內隙清楚，20／24波形限制於正面。 |
| bottle | 沿Tabler改作收窄短瓶頸，重畫切向銜接直頸與直壁的圓肩，底部圓弧接平底。 | 頸肩展開自然，仍與Lucide長頸酒瓶有器型區別；16瓶口內隙及液面兩側空腔保留。 |

`23-containers-before/`、`23-containers-candidate-1/`、`23-containers-candidate-2/` 保存前稿及候選。三顆最新稿均查看明暗DPR1全圖、明暗DPR2原生區、三角型與55%文字。五顆改稿沿各自既有改作來源更新修改紀錄，沒有移除歷史歸屬或新增未實際採用的作者。

`22-23-native/` 核對這六顆建置後圖稿，108個raster cases無空白或裁切；實際查看native-1-light-1x、native-1-dark-1x、context-light-1x。`22-23-overview/comparison.html`／`comparison.png` 為六顆前後概覽，已實際查看。全7,110個SVG的validate、範圍一致性及14項回歸測試通過。

## 第二十四批：茶壺、煮水壺、水杯

| 圖示 | 來源取捨與回修 | 完稿回比 |
| --- | --- | --- |
| teapot | 採納OpenMoji圓頂壺蓋與短蓋鈕，重新安排壺嘴與把手曲面，保留寬圓壺腹。 | 蓋、嘴與腹部形成完整器形，16蓋內隙及把手孔仍可見，壺嘴下緣沒有舊直折點。 |
| kettle | 保留獨立頂把器型，將平頂改為圓肩並重排提把兩腳；第二輪以淺凹曲線接入短嘴。 | 壺肩與提把一體，嘴根不再出現第一輪尖V形凹口；16提把孔與壺腹清楚分開。 |
| glass-water | 沿Iconoir改作將波形水面改為與杯口同軸淺弧，只留液面前緣。 | 杯口、水面與底弧方向一致，三尺寸內孔清楚，沒有完整液面雙線造成的擁擠。 |

`24-vessels-before/`、`24-vessels-candidate-1/`、`24-vessels-candidate-2/` 保存前稿及兩輪候選。三顆最新稿均查看明暗DPR1全圖、明暗DPR2原生區、三角型與55%文字。

茶壺此次由獨立稿轉為OpenMoji部分構造改作，原獨立稿及分類保存在baseline與previousDesign。**茶壺圖稿及本次修改採CC-BY-SA-4.0，不適用一般MIT授權。** 根README、notices、provenance明記此例外，`licenses/teapot-openmoji-CC-BY-SA-4.0.txt` 包含來源、修改說明、adapter license及完整條款。九個SVG、核心套件及ZIP保留完整條款；五個框架套件從核心套件引用圖稿，並附來源與授權連結，不複製圖稿或整套licenses目錄。

## 第二十五批：烹飪鍋

舊稿方形鍋身與頂部方把像盒子，Lucide的寬鍋身與微掀斜蓋更有烹飪姿態。本輪沿既有Lucide改作直接靠近此構造，鍋身加寬並降低高度，橫向鍋緣兼作持握位置；斜蓋與蓋把共用斜率，蓋把實際墨線在蓋緣上方收口。沒有加Phosphor的三道蒸氣。

`25-pot-before/`、`25-pot-candidate-1/` 保存真實前稿與最新稿。已與Lucide／Phosphor重新在原生16／20／24、三角型、明暗DPR1／2及55%文字比較；16鍋蓋和鍋緣保持可見間隔，蓋把孔清楚，sharp端帽沒有穿出蓋緣下側。

`24-25-native/` 核對建置後四顆圖稿，72個raster cases無空白或裁切；實際查看native-1-light-1x、native-1-dark-1x、context-light-1x。`24-25-overview/comparison.html`／`comparison.png` 為四顆對照，已目視並附茶壺歸屬。完整validate、範圍一致性及14項回歸測試通過。

## 第二十六批：餐具、湯碗、沙拉

餐刀延長刀刃並圓收刀跟；湯碗重畫舒展蒸氣與連續碗腹到底足的承接，第二輪校正鏡像及實際口沿微圓；沙拉改為斜向菜葉及短平底碗，16px省略葉脈。沿各自既有Lucide／Tabler改作更新修改紀錄。

`26-table-before/`、`26-table-candidate-1/`、`26-table-candidate-2/` 保存前稿及候選。三顆最新稿均重新與來源比較，查看明暗DPR1全圖、明暗DPR2原生區、三角型與55%文字。

## 第二十七批：三明治、披薩、漢堡

三明治依Lucide厚麵包與垂落起司構造回修，第二輪將尖V形起司改為自然圓收並依遮擋裁切下層麵包；披薩保留Tabler直立器型，配料改為兩個錯落圓點並實作餅皮端點微圓；漢堡收近層距、增厚下麵包並保留短平底，第二輪補齊實際角型。

`27-fast-food-before/`、`27-fast-food-candidate-1/`、`27-fast-food-candidate-2/` 保存前稿及候選。三顆最新稿均完成與兩份來源的三尺寸回比，實際查看明暗DPR1全圖、明暗DPR2原生區及55%文字。

`26-27-native/` 核對六顆建置圖稿，108個raster cases無空白或裁切；實際查看native-1-light-1x、native-1-dark-1x、context-light-1x。`26-27-overview/comparison.png` 已目視。全SVG validate、310顆範圍檢查及14項回歸測試通過。另逐一核對這六顆及蝸牛的315個可變描邊快取變體，與當前幾何完全相同。

蝸牛的頭頸承接修正版維持 `16-snail-candidate-4/`，本次重新查看其明暗DPR1／2，並確認原始碼、已建置圖稿及保存候選一致。`16-snail-transition/comparison.png` 另將先前candidate-3與修正版並列，保留真正修改前形狀。

## 第二十八批：冰淇淋、蛋糕、餅乾

| 圖示 | 來源取捨與回修 | 完稿回比 |
| --- | --- | --- |
| ice-cream | 沿Lucide改作收薄冰球底緣，略收整體寬度並拉長甜筒；sharp尖端保持內收。 | 上下比例更舒展，原生16甜筒內孔保持完整；未加入Phosphor斜紋造成密集內孔。 |
| cake | 沿Tabler糖霜圓垂節奏，將斜波改為兩道切線連續的下垂圓弧。 | 糖霜更有附著及垂落感，單燭、燭火間隙與上下糕體空腔仍清楚。 |
| cookie | 沿Lucide巧克力粒的自然錯落重排粒位，保留圓餅及雙咬口。 | 打散舊水平及近直列排列，16仍為三粒，20／24四粒；未增加外部碎屑。 |

`28-desserts-before/` 與 `28-desserts-candidate-1/` 保存前稿和最新候選。三顆最新稿各查看明暗DPR1全圖、明暗DPR2原生區，涵蓋16／20／24、三角型與55%文字情境；改稿後再次與兩份固定來源並列。provenance沿既有改作歸屬更新修改說明。

## 第二十九批：麵包

保留既有單片吐司輪廓。現稿的圓肩、側壁收口、分角型底部與完整內腔在原生尺寸成立；Phosphor重疊吐司的厚度線會增加內部訊號，Tabler較緊湊肩部亦未形成需要回修的優勢。`29-bread-before/`、`29-bread-reviewed/` 保存本輪新比較；四張明暗DPR1／2均已目視，保留決策未沿用舊結論。

`28-29-native/` 核對建置後四顆圖稿，72個raster cases無空白或裁切；實際查看native-1-light-1x、native-1-dark-1x、context-light-1x。`28-29-overview/comparison.png` 已目視。全SVG validate、310顆範圍檢查及14項回歸測試通過；180個可變描邊快取變體與當前幾何完全相同。

## 第三十批：床、沙發、扶手椅

| 圖示 | 來源取捨與回修 | 完稿回比 |
| --- | --- | --- |
| bed | 沿Lucide橫向比例收短床柱與腳，縮窄枕部。 | 床墊主次更明確，16枕部內孔仍清楚，沒有加入Tabler躺臥人物狀態。 |
| sofa | 降低靠背、放寬背部，扶手到座面加入實際微圓。 | 雙格靠背與座面比例更協調，16兩個背孔清楚，背線在前座外收口。 |
| armchair | 共用座椅母型，單座由16增寬至18，背部落在扶手中心。 | 比例更接近Lucide的休息椅，保留單片背與短腳，未加Phosphor內扶手分線。 |

`30-seating-before/`、`30-seating-candidate-1/` 保存真實前稿及改稿。三顆各查看明暗DPR1全圖、明暗DPR2原生區，包含三角型、原生16／20／24、55%文字與來源回比。共享seat僅影響sofa與armchair，兩者均逐顆檢視；sharp另省略零長度Q，不以此清理代替比例修整。

## 第三十一批：檯燈、書桌

檯燈沿既有Phosphor改作放寬並加深燈罩，縮短燈桿、收窄底座，維持共同中軸與實際罩角。書桌放寬腳距與抽屜側壁、降低抽屜高度及整體高度，把手依新中心重排；16仍省略把手，20／24保留清楚間隔。

`31-workspace-before/`、`31-workspace-candidate-1/` 保存前稿與改稿。兩顆完成與兩份固定來源的原生三尺寸回比，查看明暗DPR1全圖、明暗DPR2原生區及55%文字。未採用來源的其他器型細節，provenance保留既有歸屬並更新本輪修改。

`30-31-native/` 核對五顆建置圖稿，90個raster cases無空白或裁切；實際查看native-1-light-1x、native-1-dark-1x、context-light-1x。`30-31-overview/comparison.png` 已目視。完整validate、310顆範圍檢查及14項回歸測試通過；225個可變描邊快取變體與當前幾何完全相同。

## 第三十二批：開門、關門、柵欄

開門原稿上下邊同向傾斜，門板與直立門框不協調；沿Lucide改作重畫向鉸鏈端收束的透視，並與關門共用門框及門檻位置。關門經本輪新比較後保留，框角、把手和門檻已清楚。柵欄沿Tabler較細長直板的優點，板寬由6收至5，尖頂略降、腳部略收，維持前橫板及清楚遮擋。

`32-boundaries-before/`、`32-boundaries-candidate-1/` 保存前稿及本輪稿。三顆均重新與兩份來源在原生16／20／24並列，實際查看明暗DPR1全圖、明暗DPR2原生區、三角型及55%文字。

## 第三十三批：浴缸、蓮蓬頭

浴缸保留現有圓腹、拱形龍頭與支腳，兩來源未呈現需要替換的構造優勢，沒有增加毛巾框。蓮蓬頭沿Lucide較小弧罩及外伸出水緣回修，接管按新罩面收口；20／24水點改為沿出水方向排列的七點，16保留四點。

`33-bathroom-before/`、`33-bathroom-candidate-1/` 保存前稿及本輪稿。兩顆皆完成同尺寸來源回比與明暗DPR1／2目視，含三角型及55%文字。`32-33-native/` 核對五顆建置圖稿，90個raster cases無空白或裁切；實際查看native-1-light-1x、native-1-dark-1x、context-light-1x。`32-33-overview/comparison.png` 已目視。

本次初跑validate及範圍檢查遇到建置資料格式擴充：各原生variant新增strokes，舊驗證器將這些衍生欄位算進原生審稿雜湊，誤報品牌／圖稿變更。新增`scripts/lib/native-variants.mjs`，僅在原生審稿比較中剔除strokes，保留nodes、strokeWidth與其他原生欄位。已確認路徑及原生線寬變更仍可檢出，沒有改寫審稿hash或baseline。重跑完整validate與範圍檢查通過；範圍外480顆原生幾何不變。14項回歸測試通過，225個可變描邊變體與當前幾何一致。

## 第三十四至三十六批：家電九顆

冰箱調整上下門比例並將上把手改成短線；洗衣機以抽屜線與旋轉內線交代控制區及滾筒；微波爐降低機身高度，保留觀察窗與側控鈕。冷氣機沿 Iconoir 的下收機殼修整出風結構。烤箱與風扇完成來源回比後保留。

吸塵器提高機肩、展開後壁，輪心向內移，改善輪子與筒身的比例；吹風機以圓機腹順接漸窄風嘴，保留握柄和電線；熨斗僅按角型修整後跟，保留既有平底及把手。吹風機新增 Phosphor 構造的改作記錄，同時保留 Hugeicons 來源歷史及兩份完整 MIT 條款。

前稿與最新候選保存在 `34-appliances-before/`、`34-appliances-candidate-1/`、`35-climate-before/`、`35-climate-candidate-1/`、`36-appliances-before/`、`36-appliances-candidate-1/`。每顆最新稿皆重新與兩份固定來源在 16／20／24px 並列，已查看明暗 DPR1 全圖及明暗 DPR2 原生區。

`34-36-native/` 核對九顆建置後輸出，162 個 raster cases 無空白／裁切；實際查看 native-1-light-1x、native-1-dark-1x、context-light-1x。`36-overview/comparison.png` 已查看。405 個可變描邊變體與目前原始幾何一致。

## 第三十七至三十九批：暖氣機與服飾六顆

暖氣機第一候選只拉長熱氣，回比後仍不如來源整體；第二候選沿 Lucide 的頂部開口構造重畫，延長雙熱氣、提高機身及格柵，保留三列格柵與雙腳。最新證據在 `37-heater-candidate-2/`，前稿及第一候選保持。

長褲沿 Phosphor 縮窄腰頭、展開褲管並補回弧形口袋；比較兩個候選後，確認16px口袋仍可辨，三尺寸都保留。上衣與洋裝在重新比較肩袖、收腰和裙襬後保留。證據在 `38-clothing-candidate-2/`。

外套原本的 Tabler jacket 實為無袖背心，改用同一固定 Lucide 版本的 Lab jacket 作長袖外套對照，再與 OpenMoji 並列；保留現有 V 領長袖款式，沒有沿用兩份參考圖稿。舊來源保存於 `39-clothing-before/coat-previous-references.json`，原 `references/atlas-craft-08/manifest.json` 不變；目前來源入口改用 `references/atlas-recompare-01/clothing-current-manifest.json`，同步解決首次驗證的 stale source comparison。襪子20／24的懸空後跟內線接回足底，16維持簡化；鞋底高度4減至3，並修整底部兩端實際角型。最新證據在 `39-clothing-candidate-1/`。

七顆各自完成最新稿與兩份固定來源的16／20／24、三角型、明暗DPR1／2回比。`37-39-native/` 建置後126個raster cases無空白或裁切，實際查看native-1-light-1x、native-1-dark-1x、context-light-1x；`37-39-overview/comparison.png` 已查看。315個可變描邊變體與當前原稿一致。建置、完整validate、Atlas及回比一致性檢查通過；範圍外480顆不變。

## 第四十至四十一批：眼鏡、太陽眼鏡、手錶、雨傘

眼鏡沿 Lucide 延長鏡腳上端的彎曲過渡、略降高度並向內收束，鼻橋改成半圓弧；圓鏡框維持，鼻橋與鏡腳按鏡框外部收口。手錶沿 Phosphor 將矩形錶帶改成端窄、向錶殼展開的梯形，保留錶面與指針。太陽眼鏡的平頂雙框與鏡片斜線、雨傘的傘面與傘骨均在新一輪來源回比後保留。

前稿與最新稿在 `40-accessories-before/`、`40-accessories-candidate-1/`、`41-umbrella-before/`、`41-umbrella-candidate-1/`。四顆皆重新與兩份固定來源在16／20／24、三角型、明暗DPR1／2並列並實際查看。`40-41-native/` 建置後72個raster cases無空白或裁切，已查看native-1-light-1x、native-1-dark-1x、context-light-1x；`40-41-overview/comparison.png` 已查看。180個可變描邊變體與目前原稿一致。建置、完整validate及兩項Atlas檢查通過。

## 第四十二至四十三批：醫療用品六顆

聽診器將耳端階梯轉折改成連續彎管；針筒增加向針頭收窄的肩部與出口。膠囊完成 Lucide／Tabler 回比後保留既有輪廓及分界。

口罩放寬罩面、收淺下巴，改善過尖的盾形比例；OK 繃增加四孔點徑，改善原生小尺寸與低對比辨識；體溫計放大感溫球及內部液球，保持底端位置與管內留白。

前稿與最新稿在 `42-medical-before/`、`42-medical-candidate-1/`、`43-medical-before/`、`43-medical-candidate-1/`。六顆各自完成最新稿與兩份固定來源的16／20／24、三角型、明暗DPR1／2回比。`42-43-native/` 建置後108個raster cases無空白或裁切，已查看native-1-light-1x、native-1-dark-1x、context-light-1x；`42-43-overview/comparison.png` 已查看。270個可變描邊變體與目前原稿一致。建置、完整validate及兩項Atlas檢查通過，範圍外480顆保持不變。

## 第四十四至四十五批：醫院、救護車、心跳、急救箱

醫院沿 Phosphor 的接地構造放寬入口，主樓與側翼共用單一外伸地面，避免底線重疊；較粗描邊時依端帽包絡收回地面右端，原生預設外觀不變。心跳沿 Lucide 的主峰節奏，改為淺谷後陡升主峰，維持完整心形和內線收口。救護車的車廂、前窗、輪孔，以及急救箱的提把、箱體與十字留白，均在來源回比後保留。

前稿與最新稿在 `44-medical-before/`、`44-medical-candidate-1/`、`45-first-aid-before/`、`45-first-aid-candidate-1/`。四顆皆完成兩份固定來源、16／20／24、三角型、明暗DPR1／2及55%文字的目視回比。`44-45-native/` 建置後72個raster cases無空白或裁切，已查看native-1-light-1x、native-1-dark-1x、context-light-1x；`44-45-overview/comparison.png` 已查看。

粗描邊檢視發現目前巢狀SVG遮罩的子節點被Atlas helper的normalize丟棄，造成內部細節及側翼消失。保留 `44-hospital-weights/` 的缺陷證據，將helper改為遞迴保留及正規化children；修正後的最大支援線寬明暗目視在 `44-hospital-weights-fixed/`。新增測試涵蓋310顆的三尺寸、三角型最大線寬遮罩定義與子節點保留，另驗證醫院地面端帽在畫布內。兩項新測試及14項既有輪廓／接點／繪製／避讓回歸測試通過。180個本批可變描邊變體與最新原稿一致。原生幾何與已查看候選一致，完整validate及Atlas檢查通過，範圍外480顆原生幾何保持不變。

## 第四十六至四十七批：骨頭、牙齒、大腦、肺、耳朵

骨頭保留既有Lucide輪廓，雙瓣骨端與細長骨幹在三尺寸仍連續清楚。牙齒沿Tabler較短且圓順的根端回修，重畫齒身到雙根的收束，保留牙冠及短冠線。大腦沿Tabler將每側腦葉整理成上中下三段自然弧面，中央縱裂接回上下，16省略短上腦迴、20／24保留。

肺吸收Hugeicons的內緣收腰與飽滿下腹，保留Tabler式中央氣管與分岔，氣道按新接點收口。新增Tabler與Hugeicons雙來源改作記錄，原Tabler來源保存在baseSource；兩份完整MIT條款存於 `licenses/lungs-sources.txt`，已核對核心套件、SVG及五個依賴核心資料的框架套件來源聲明，完整validate也檢查9份下載ZIP。耳朵完成Lucide／Tabler回比後保留現有耳輪、耳垂與內耳折曲。

前稿與最新稿在 `46-anatomy-before/`、`46-anatomy-candidate-1/`、`47-anatomy-before/`、`47-anatomy-candidate-1/`。每顆完成兩份固定來源、16／20／24、三角型、明暗DPR1／2及55%文字的目視回比。`46-47-native/` 建置後90個raster cases無空白或裁切，已查看native-1-light-1x、native-1-dark-1x、context-light-1x。`46-47-weights/` 的最大支援線寬明暗畫面與 `46-47-overview/comparison.png` 均已查看。225個可變描邊變體與最新原稿一致。建置、完整validate及兩項Atlas檢查通過，範圍外480顆原生幾何不變。

## 第四十八至五十批：關懷、人物姿態與行動輔具

關懷圖示沿Phosphor的掌底走向縮短水平平段，指端至掌根改用較緩斜線，再以短曲線接回手腕；保留心形、拇指與袖口，按新掌形重算遮擋收口。站立圖示的雙臂各內收1個母型單位，總臂展由17減至15，維持中軸、頭肩留白與雙腿。步行圖示沿Phosphor提高髖部接點與膝部，縮短大腿並延長小腿，髖點精確落在斜軀幹上，擺臂及頭部保持。

輪椅完成Hugeicons／Tabler回比後保留，推把、扶手、座架與大小輪的承接及空腔成立。拐杖沿Tabler收窄腋托與雙側支架，延長直段後再收束到中央桿，握桿同步縮短，改善杯形比例。OpenMoji為前臂拐杖的另一器型，只用於同概念比較，沒有沿用其圖稿。

前稿與最新稿在 `48-hand-heart-before/`、`48-hand-heart-candidate-1/`、`49-people-before/`、`49-people-candidate-1/`、`50-mobility-before/`、`50-mobility-candidate-1/`。每顆完成兩份固定來源、16／20／24、三角型、明暗DPR1／2及55%文字的目視回比。`48-50-native/` 建置後90個raster cases無空白或裁切，已查看native-1-light-1x、native-1-dark-1x、context-light-1x。`48-50-weights/` 最大支援線寬明暗畫面及 `48-50-overview/comparison.png` 均已查看。225個可變描邊變體與最新原稿一致。建置、完整validate及兩項Atlas檢查通過，範圍外480顆原生幾何不變。

## 第五十一至五十二批：運動器材與球類

啞鈴沿既有Hugeicons改作補強握持結構：20／24由單線握桿改成微收腰的雙側曲線，短軸端與兩端配重保持；16保留單線，避免擠出細小內縫。較粗描邊會同步展開握把，維持中央留白。壺鈴與籃球分別完成Hugeicons／MDI、Phosphor／Tabler回比後保留，握孔、鈴腹與球面分片的比例已成立。

足球保留先前使用者選定的簡潔五角分片；網球拍保留四點網面及按尺寸簡化的拍喉，不重新加入密網格。排球與Lucide／Phosphor回比後保留三向旋轉分帶，原生16的白色通道仍可讀。

前稿與最新稿在 `51-sports-before/`、`51-sports-candidate-1/`、`52-ball-sports-before/`、`52-ball-sports-candidate-1/`。每顆完成兩份固定來源、16／20／24、三角型、明暗DPR1／2及55%文字的目視回比。`51-52-native/` 建置後108個raster cases無空白或裁切，已查看native-1-light-1x、native-1-dark-1x、context-light-1x。`51-52-weights/` 最大支援線寬明暗畫面及 `51-52-overview/comparison.png` 均已查看。270個可變描邊變體與最新原稿一致。建置、完整validate及兩項Atlas檢查通過，範圍外480顆原生幾何不變。

## 第五十三至五十四批：棒球、球洞、游泳與跑步

棒球完成Phosphor／Tabler回比後保留：鏡射弧線上的四段縫線仍有清楚分隔，平切收筆避免額外針腳聚成黑結。高爾夫球洞完成Hugeicons／Tabler回比後保留，寬洞口、旗面內孔與桿端周圍的留白成立。游泳完成Phosphor／Tabler回比後保留屈臂、前方頭部與兩層水波；來源的伸臂姿態屬另一動作階段，沒有據此更換既有構造。

跑步原稿膝部與屈臂折線偏硬，Phosphor的連續跨步及擺臂更舒展。第一候選先改雙腿；第二候選再統一擺臂曲線，保留前傾軀幹、頭部位置及髖部共接。最新稿頭肩與雙腿留白保持，三角型均保留人體的結構曲線。Phosphor新增改作來源與原Tabler來源一併記入provenance；`licenses/running-sources.txt` 包含兩份完整MIT授權，已驗證SVG及核心套件隨附內容。

前稿與最新稿在 `53-sports-before/`、`53-sports-candidate-1/`、`54-running-before/`、`54-running-candidate-1/`、`54-running-candidate-2/`。四顆最新稿均已查看兩份來源、16／20／24、三角型、明暗DPR1／2及55%文字。`53-54-native/` 建置後72個raster cases無空白或裁切，已查看native-1-light-1x、native-1-dark-1x、context-light-1x。`53-54-weights/` 最大支援線寬明暗畫面與 `53-54-overview/comparison.png` 均已查看。180個可變描邊變體與最新原稿一致。建置、完整validate及兩項Atlas檢查通過，範圍外480顆原生幾何不變。

## 第五十五至五十六批：望遠鏡、照明與戶外工具

雙筒望遠鏡沿Phosphor的較寬、緊湊目鏡比例，將兩側目鏡各外展0.5、起點下移0.5，頂冠降低並放寬；按新位置重新求斜筒與圓物鏡的切點，頂冠控制柄沿斜筒方向承接。鏡面半徑、中央連橋與主體鏡射關係保持。手電筒完成Lucide／Phosphor回比後保留寬燈頭、曲肩與單筆開關；斧頭完成Lucide／Tabler回比後保留弧刃、收頸斧背及長握柄。

鏟子完成Lucide／Tabler回比後保留共軸D形握孔、桿身與收尖曲面。十字鎬沿既有Lucide改作縮短兩側曲臂、內收外鼓弧腹，端部回彎及內側曲線同步重畫；保持對角鏡射、中央接座與握柄。魚鉤完成Lucide／Hugeicons回比後保留直立J形、穿線眼及開放彎腹，不因來源朝向差異更換構造。

前稿與最新稿在 `55-outdoor-before/`、`55-outdoor-candidate-1/`、`56-tools-before/`、`56-tools-candidate-1/`。六顆最新稿均已查看兩份來源、16／20／24、三角型、明暗DPR1／2及55%文字。`55-56-native/` 建置後108個raster cases無空白或裁切，已查看native-1-light-1x、native-1-dark-1x、context-light-1x。`55-56-weights/` 最大支援線寬明暗畫面與 `55-56-overview/comparison.png` 均已查看。270個可變描邊變體與最新原稿一致。建置、完整validate及兩項Atlas檢查通過，範圍外480顆原生幾何不變。

## 第五十七至五十八批：營火、足跡、健行與獨木舟

營火完成Phosphor／Tabler回比後保留單層偏斜火焰與交叉木柴，不加入會壓縮火腹空白的內層火心。足跡完成Lucide／Phosphor回比後保留錯落高度、左右足弓與整合鞋跟分界，不增加鞋底紋理或額外斷口。

健行沿既有Phosphor改作調整前腿：膝與腳由x14收至x13，膝點由y17提高至16.5，縮短大腿、延長小腿，增加與杖身的間距；頭、背包、髖部、後腿與手臂保持。獨木舟保留雙尖狹長船身與雙槳構造，soft／rounded將兩端船殼曲線短截，以切線交點控制微圓曲線承接；sharp保留尖角。這是細微角型幾何修正，不是船身比例重畫。

前稿與最新稿在 `57-outdoor-before/`、`57-outdoor-candidate-1/`、`58-kayak-before/`、`58-kayak-candidate-1/`。四顆最新稿均已查看兩份來源、16／20／24、三角型、明暗DPR1／2及55%文字。`57-58-native/` 建置後72個raster cases無空白或裁切，已查看native-1-light-1x、native-1-dark-1x、context-light-1x。`57-58-weights/` 最大支援線寬明暗畫面與 `57-58-overview/comparison.png` 均已查看。180個可變描邊變體與最新原稿一致。建置、完整validate及兩項Atlas檢查通過，範圍外480顆原生幾何不變。

## 第五十九至六十批：科學與實驗器材

原子完成Lucide／Phosphor回比後保留雙軌道與中央核點，四側空腔及核點間距成立。錐形燒瓶沿既有Lucide改作補上獨立肩部圓弧：瓶頸與斜壁以24母型半徑2相切承接，三角型均保留玻璃肩部曲面；平底角型、瓶口及液面維持。圓底燒瓶保留Hugeicons式連續收肩與飽滿圓腹，液面仍用水平線。

試管完成Lucide／Phosphor回比後保留直立管身、半圓底與低液面。顯微鏡將弧臂末端控制點改為與底座同高，使末段水平接回底座，鏡筒與載物台保持。天文望遠鏡重新以共同正交軸推算前後端面與鏡環，保留漸寬鏡筒及三腳架，依新外殼重算內線與立桿收口。

前稿與最新稿在 `59-science-before/`、`59-science-candidate-1/`、`60-lab-before/`、`60-lab-candidate-1/`。六顆最新稿均已查看兩份來源、16／20／24、三角型、明暗DPR1／2及55%文字。`59-60-native/` 建置後108個raster cases無空白或裁切，已查看native-1-light-1x、native-1-dark-1x、context-light-1x。`59-60-weights/` 最大支援線寬明暗畫面與 `59-60-overview/comparison.png` 均已查看。270個可變描邊變體與最新原稿一致。建置、完整validate及兩項Atlas檢查通過，範圍外480顆原生幾何不變。

## 第六十一至六十二批：DNA、軌道、火箭與衛星

DNA完成Lucide／Tabler回比後保留直立雙曲線及四組橫向連結，中央不加入細碎橫線，曲線穿越及連結收口成立。軌道完成Lucide／Hugeicons回比後保留單衛星、開放圓弧與較小中心天體；不增加第二顆衛星，維持右上開口及中央留白。

火箭沿既有Phosphor改作收窄肩腹：左側兩個曲線控制柄的x由5／5改為6／5.5，右側鏡射；尖首、底寬、窗點、側翼與尾端短線保持，側翼依新箭體重算承接。最新稿上半部較修長，三尺寸仍可辨側翼孔及窗點。衛星完成Lucide／Tabler回比後保留共軸機體、對稱板面與單一訊號弧，不增加板面格紋或第二層訊號。

前稿與最新稿在 `61-science-before/`、`61-science-candidate-1/`、`62-satellite-before/`；衛星未修改，before即本輪最新回比證據。四顆均已查看兩份來源、16／20／24、三角型、明暗DPR1／2及55%文字。`61-62-native/` 建置後72個raster cases無空白或裁切，已查看native-1-light-1x、native-1-dark-1x、context-light-1x。`61-62-weights/` 最大支援線寬明暗畫面與 `61-62-overview/comparison.png` 均已查看。180個可變描邊變體與最新原稿一致。建置、完整validate及兩項Atlas檢查通過，範圍外480顆原生幾何不變。

## 第六十三至六十六批：數學字形與運算符號

π完成Lucide／Phosphor回比後保留左彎頂橫、雙腳與單向曲尾；Σ完成Lucide／Tabler回比後保留中央折入、上下橫及右側短直收筆。無限符號保留連續雙圓腹及中央交叉，不採Phosphor的斷口。根號保留sharp鉤點上移的斜接補償，soft／rounded仍用實際微圓。等號與不等號保留共用雙橫母型，不等號的斜筆維持語意上的實接。

除號保留按尺寸調整的實心點與對稱點距；正負號保留加號、下橫及清楚間距。分數沿既有Tabler改作收窄分母2的上半部：弧頂寬由6收至5，兩端從y16.5降至17，最高點維持y15，右肩連續接入斜筆。分子1、分數線及底橫位置保持，分母較直立而不壓縮分數線周圍留白。函數方框完成Lucide／Tabler回比後保留微斜ƒ主幹、開放曲尾與中腰橫筆，未加入較密的回鉤。

最新回比證據在 `63-math-before/`、`64-equations-before/`、`65-arithmetic-candidate-1/`、`66-function-before/`；未修改項目的before即本輪最新稿。分數真實前稿另保存在 `65-arithmetic-before/`。十顆均已查看兩份來源、16／20／24、三角型、明暗DPR1／2及55%文字。`63-66-native/` 建置後180個raster cases無空白或裁切，已查看native-1-light-1x、native-1-dark-1x、context-light-1x。`63-66-weights/` 最大支援線寬明暗畫面、`63-66-overview/comparison.png` 及分數單顆對照均已查看。450個可變描邊變體與最新原稿一致。建置、完整validate及兩項Atlas檢查通過，範圍外480顆原生幾何不變。

## 第六十七至六十八批：教育用品與學習工具

學士帽沿既有Lucide改作下移帽冠1個母型單位，流蘇起點同步下移，帽身下緣保持；帽身露出較少，整體更扁平，sharp兩側尖角的墨線補償仍保留。校舍依Lucide／Hugeicons的屋簷構造，沿原山牆斜率向兩側各延伸2個母型單位，依外殼裁切承接；圓窗、拱門、側翼與單一地面保持。簡報架完成Lucide／Phosphor回比後保留橫向幕面、頂桿及從幕底中央分出的支腳。

黑板沿既有Phosphor改作收短板面高度：頂緣y4改為5、底托y20改為19，板面由18×16改為18×14；板擦與右側收筆同步上移，維持右側開口間距。算盤完成Hugeicons／Tabler回比後保留兩排各兩珠、錯位配置與開放支架，不增加較密的第三珠。書籤書本完成Hugeicons／Phosphor回比後保留連續書脊、下緣頁邊與封面內V形書籤，不增加斷口或第二層頁線。

前稿與最新稿在 `67-education-before/`、`67-education-candidate-1/`、`68-learning-before/`、`68-learning-candidate-1/`。六顆均已查看兩份來源、16／20／24、三角型、明暗DPR1／2及55%文字。`67-68-native/` 建置後108個raster cases無空白或裁切，已查看native-1-light-1x、native-1-dark-1x、context-light-1x。`67-68-weights/` 最大支援線寬明暗畫面及 `67-68-overview/comparison.png` 均已查看。270個可變描邊變體與最新原稿一致。建置、完整validate及兩項Atlas檢查通過，範圍外480顆原生幾何不變。

## 第六十九至七十批：書架、證書、地球儀與鉛筆尺規

書架完成Lucide／Hugeicons回比後保留三道不同高度的直立書脊與一冊斜書，不增加封閉書框及標籤。畢業證書完成Phosphor／Hugeicons回比後保留橫向紙張、右下圓章與V形緞帶，文字與圓章之間的避讓保持。地球儀完成Phosphor／Tabler回比後保留完整圓球、外側半圓支架與底座，不增加經緯線。

鉛筆尺規沿既有Lucide改作，將尺端兩道刻度各沿尺身向內移動1.5個x／y母型單位。刻度離開端角後，兩端留白更清楚；刻度長度、方向及鉛筆與尺身的交叉構造保持。Lucide與Tabler來源的刻度也較遠離尺端，此次只調整位置，不更換器型。

最新回比證據在 `69-education-before/`、`70-pencil-ruler-candidate-1/`；前三顆未修改，before即本輪最新稿。鉛筆尺規真實前稿另保存在 `70-pencil-ruler-before/`。四顆均已查看兩份來源、16／20／24、三角型、明暗DPR1／2及55%文字。`69-70-native/` 建置後72個raster cases無空白或裁切，已查看native-1-light-1x、native-1-dark-1x、context-light-1x。`69-70-weights/` 最大支援線寬明暗畫面及 `69-70-overview/comparison.png` 均已查看。180個可變描邊變體與最新原稿一致。建置、完整validate及兩項Atlas檢查通過，範圍外480顆原生幾何不變。

## 第七十一至七十二批：弦樂、鍵盤與管樂器

木吉他沿既有Lucide改作修順琴頭：兩側由直角台階改成對稱曲肩，連續收進斜琴頸；頂端依角型保留實際微圓，琴身及琴橋不變。鋼琴保留翼狀琴身與四條短鍵；Lucide為完整同器型來源，Tabler僅有鍵盤構造，不能當成第二份完整翼琴輪廓證據。鼓完成Hugeicons／Lucide回比後保留橢圓鼓面、連續桶身及單支鼓棒，不增加較密的雙棒與額外張力桿。

小提琴沿既有MDI改作，將上琴腹左右各內收1個母型單位，總寬13改為11，保留13寬的下琴腹；肩部及內腰控制柄同步調整，中央琴頸、腰部最窄點與琴橋保持。上小下大的比例較明確。小號完成MDI／OpenMoji回比後保留曲面喇叭口、單圈迴轉管及兩個按鍵；薩克斯風保留MDI式緊湊直立姿態及較開放的下彎內孔，不換成OpenMoji的細長斜管。

前稿與最新稿在 `71-music-before/`、`71-music-candidate-1/`、`72-instruments-before/`、`72-instruments-candidate-1/`。六顆均已查看兩份來源、16／20／24、三角型、明暗DPR1／2及55%文字，鋼琴的第二來源限制如上。`71-72-native/` 建置後108個raster cases無空白或裁切，已查看native-1-light-1x、native-1-dark-1x、context-light-1x。`71-72-weights/` 最大支援線寬明暗畫面及 `71-72-overview/comparison.png` 均已查看。270個可變描邊變體與最新原稿一致。建置、完整validate及兩項Atlas檢查通過，範圍外480顆原生幾何不變。吉他及小提琴仍沿既有改作來源，未新增授權關係。

## 第七十三至七十四批：節拍器、電吉他、唱片與電子琴

節拍器完成Phosphor／Lucide回比後保留梯形機殼、底座分界及斜擺桿，不增加配重小孔與側面斷口。電吉他沿既有Lucide改作修順內凹肩部兩端，以對稱短曲面替代硬折尖點；琴身下腹、實心琴頭及琴橋保持，sharp也保留物體曲面。

黑膠唱片採納Phosphor較完整的音軌弧線，將兩段半徑6的對向音軌由45度延長為90度，外圈與中心孔維持。保留原Lucide改作歷史並新增Phosphor來源，ISC與MIT完整條款合存於 `licenses/vinyl-record-sources.txt`；已核對九個SVG、核心套件授權檔與catalog雙來源欄位，完整validate亦核對九個下載ZIP。

電子琴保留短顯示線、單控制點及四條短鍵，三尺寸的面板與鍵區仍有清楚分隔。Lucide是完整電子琴來源；Phosphor僅為琴鍵構造參考，不作第二份完整電子琴輪廓的證據。

前稿與最新稿在 `73-music-before/`、`73-music-candidate-1/`、`74-keyboard-before/`；電子琴未改，before即本輪最新回比證據。四顆均已查看來源、16／20／24、三角型、明暗DPR1／2及55%文字，電子琴的第二來源限制如上。`73-74-native/` 建置後72個raster cases無空白或裁切，已查看native-1-light-1x、native-1-dark-1x、context-light-1x。`73-74-weights/` 最大支援線寬明暗畫面及 `73-74-overview/comparison.png` 均已查看。180個可變描邊變體與最新原稿一致。建置、完整validate及兩項Atlas檢查通過，範圍外480顆原生幾何不變。

## 第七十五至七十六批：媒體設備與錄音載體

收音機完成Phosphor／Hugeicons回比後保留長斜天線、寬機身與左右面板分組；電視完成Lucide／Hugeicons回比後保留橫向螢幕及對稱雙天線。投影機沿既有Lucide改作將鏡頭圓心由(8,12)下移至(8,13)，半徑3.5不變，讓鏡頭略嵌入機身；三道光線以新鏡頭圓心在0與正負30度、半徑8至10之間放射，機身接合依新鏡頭重算。

喇叭完成Phosphor／Lucide回比後保留大小單體及垂直分組，不在大單體內加中心點。底片捲盤沿Phosphor在20／24一般線寬恢復四個半徑1.5的圓孔，16保留實心孔點。第一輪最大線寬會把孔壓成針孔，因此孔內直徑不足1個原生像素時也改用同尺寸原有實心點；預設線寬與來源並列圖完全一致，最新粗線寬另存於 `75-76-weights-2/`，第一輪畫面及回修前來源亦保留。

卡帶沿既有Lucide改作，將機身由20×18收為20×16，頂底各內收1；雙捲軸及相連帶線下移1，梯形底端接回新底緣，左右軸距保持。較橫向的機身讓軸孔和帶口分組更集中，三尺寸空腔仍可讀。

前稿與最新稿在 `75-media-before/`、`75-media-candidate-1/`、`76-audio-before/`、`76-audio-candidate-1/`。六顆均已查看兩份來源、16／20／24、三角型、明暗DPR1／2及55%文字。`75-76-native/` 建置後108個raster cases無空白或裁切，已查看native-1-light-1x、native-1-dark-1x、context-light-1x；捲盤粗線寬回修不改預設幾何。`75-76-weights-2/` 最新最大線寬明暗畫面及 `75-76-overview/comparison.png` 均已查看。270個可變描邊變體與最新原稿一致。建置、完整validate及兩項Atlas檢查通過，範圍外480顆原生幾何不變。

## 第七十七至七十八批：底片、場記板、播客與天線

底片完成Lucide／Phosphor回比後保留左右各四格齒孔、中央兩格影像與共用框線；Phosphor橫向走片是另一合理方向，未據此換向。場記板沿既有Lucide改作，以拍板的長軸和垂直軸重新定位兩道斜紋，中心線在板寬中段等分長度，上下緣沿長軸偏移2個母型單位；三段留白較均勻、斜度較舒展，板身、鉸接及下板保持。

播客完成Hugeicons／Iconoir回比後保留單層開放圓弧、膠囊麥克風與水平底腳，不增加人物或第二圈廣播弧。天線完成Tabler／Lucide回比後保留等距且漸長的五個振子與連續中央支桿，不改成Lucide的斜向投影姿態。

前稿與最新稿在 `77-film-before/`、`77-film-candidate-1/`、`78-antenna-before/`；天線未修改，before即本輪最新回比證據。四顆均已查看兩份來源、16／20／24、三角型、明暗DPR1／2及55%文字。`77-78-native/` 建置後72個raster cases無空白或裁切，已查看native-1-light-1x、native-1-dark-1x、context-light-1x。`77-78-weights/` 最大支援線寬明暗畫面及 `77-78-overview/comparison.png` 均已查看。180個可變描邊變體與最新原稿一致。建置、完整validate及兩項Atlas檢查通過，範圍外480顆原生幾何不變。

## 第七十九批：鐵鎚、螺絲起子與電鑽

螺絲起子沿既有Phosphor改作方向，把握柄頸部兩個凹直角改成0.8單位短弧，保留外側防滑肩部、握槽、細桿和整體比例。物體本身的握柄曲面亦保留在sharp。Phosphor／MDI完稿回比後，選擇保留帶肩部握柄，不採實心刀桿。provenance追加本次修改，未新增實際採用來源。

鐵鎚完成Lucide／Phosphor回比後保留彎背鎚頭、短頸與同軸握柄；端面短線交代工作面，並非裝飾。電鑽完成Hugeicons／Lucide回比後保留共同邊界的機頭、後傾握柄與電池座；16px省略扳機，20／24保留開放彎線，不增加回接線或通風孔。

真實前稿與可編輯母型在 `79-tools-before/`，最新三顆回比與決策在 `79-tools-candidate-1/`。每顆已查看16／20／24、三角型、兩份來源、明暗DPR1／2及55%文字。建置後 `79-native/` 的54個raster cases無空白或裁切，已查看原生明暗及文字情境；`79-weights/` 明暗最大線寬和 `79-overview/comparison.png` 均已查看。135個可變描邊變體與原稿一致。build:icons、build:review、完整validate、Atlas幾何及回比一致性檢查通過，範圍外480顆不變。

## 第八十至八十二批：手鋸、捲尺、工具箱與其餘工具

手鋸沿既有MDI改作修正握柄的長短邊夾角：後緣改為(6.25,20)與(2.25,15)，使長邊向量(4,5)和短邊向量(-3.75,3)垂直，將向下拖長的斜菱形孔改為矩形握孔。鋸背、三個粗齒和柄刃共用分界保持。完稿與MDI／OpenMoji回比後保留粗齒，不採密集細齒。

捲尺保留三筆刻度，位置由x6、11、16改為6、12、18，改善左密右疏；捲面與尺帶輪廓不變。Hugeicons為同器型軟尺來源，MDI是硬殼鋼捲尺，只列構造參考，不宣稱兩份同器型原稿。工具箱完成Lucide／Phosphor回比後保留斜肩箱蓋、提把與雙扣鎖，避免改成平頂後削弱與公事包的差異。

油漆滾筒沿Lucide改作方向，把支架三個轉折從通用微小角型改成24母型1.5單位半徑並按尺寸縮放，sharp同樣保留彎製金屬桿的弧段；滾筒與握柄位置不變。安全帽完成Lucide／Phosphor回比後保留提前收筆的短脊與較高帽簷孔，瑞士刀完成Hugeicons／Lucide回比後保留水平膠囊柄、寬間隔的刀刃與疏螺旋。螺帽完成Phosphor／Tabler回比後保留同心圓孔、直六角邊與微圓轉角。三個修改均追加provenance說明，未新增實際採用來源。

真實前稿及可編輯母型在 `80-tools-before/`、`81-tools-before/`、`82-nut-before/`；最新回比與決策在 `80-tools-candidate-1/`、`81-tools-candidate-1/` 及未修改的 `82-nut-before/`。七顆均已查看16／20／24、三角型、兩份固定來源、明暗DPR1／2及55%文字。建置後 `80-82-native/` 的126個raster cases無空白或裁切，已查看原生明暗及文字情境；`80-82-weights/` 明暗最大線寬及 `80-82-overview/comparison.png` 均已查看。315個可變描邊變體與原稿一致。build:icons、build:review、完整validate、Atlas幾何與回比一致性檢查通過，範圍外480顆不變。

## 第八十三至八十四批：工廠、起重機與工程車

吊車沿既有Hugeicons改作，把吊臂頂端的急折改為24母型1單位半徑並按尺寸縮放；sharp同樣保留構造弧段，消除斜接形成的突出尖頭。最大線寬檢視另發現吊鉤開口過窄，因此當描邊換算24母型大於2時，把回收弧由270度縮短為240度，維持開放鉤口。一般線寬圖稿未受這項光學修正影響。

堆高機沿Lucide改作，在斜支撐末端加入L15.4343 10.4343 Q16 11 16 11.8，轉成垂直切線再接入門架，移除sharp端帽伸到門架右側的小凸角；車身、輪胎和貨叉保持。兩個修改均追加provenance說明，未新增實際採用來源。

工廠完成Lucide／Phosphor回比後保留一體煙囪與鋸齒屋頂、疏朗三點窗；塔式起重機完成Phosphor／Hugeicons回比後保留單線水平吊臂、斜頂架和兩個塔身空腔。倉庫完成Lucide／Phosphor回比後保留雙坡屋頂及單道捲門分界；挖土機完成Tabler／Hugeicons回比後保留折臂姿態、圓腹鏟斗與膠囊履帶。

真實前稿及可編輯母型在 `83-industrial-before/`、`84-industry-before/`，六顆最新標準線寬回比與決策在 `83-industrial-candidate-1/`、`84-industry-candidate-1/`。每顆已查看16／20／24、三角型、兩份來源、明暗DPR1／2及55%文字。建置後 `83-84-native/` 的108個raster cases無空白或裁切，已查看原生明暗和文字情境；標準線寬幾何在後續鉤口修正中未變，最終一致性檢查仍核對相同雜湊。

`83-84-weights/` 保存首次最大線寬圖稿；鉤口回修後的 `83-84-weights-2/` 明暗總覽與吊車來源並列在DPR1／2皆已查看，個別結論及證據雜湊在該目錄 `review.json`。270個可變描邊變體與最新原稿一致。`83-84-overview/comparison.png` 為標準線寬前後圖，`junctions.png` 保存鉤口回修前的sharp接點診斷，最新粗線鉤口以weights-2為準。最後重新執行build:icons、build:review、完整validate、Atlas幾何與回比一致性檢查均通過，範圍外480顆不變。

## 第八十五至八十六批：貨櫃、機械手臂、施工圍欄與磚牆

施工圍欄保留兩筆45度斜紋，將各斜紋在板高中線的交點改為板寬的三分之一與三分之二；因此端點移離板角，改善左上角墨量及板面留白不均。板面與支柱的位置、大小不變。與Lucide／Tabler完稿回比後，保留兩筆較疏斜紋，不增回第三筆。provenance追加本次修改，未新增實際採用來源。

貨櫃完成Lucide／Phosphor回比後保留共邊三面透視，16px一道壓紋、20／24兩道；側面壓紋保持裁在側面內。機械手臂完成Lucide／MDI回比後保留單圈鉸點、寬夾爪口及平端接底座的支柱。磚牆完成Phosphor／Lucide回比後保留橫向比例、三個等高磚層與二、三、二格錯縫排列，避免增加窄小空腔。

真實前稿及可編輯母型在 `85-industry-before/`、`86-wall-before/`；最新回比與決策在 `85-industry-candidate-1/` 和未修改的 `86-wall-before/`。四顆均已查看16／20／24、三角型、兩份來源、明暗DPR1／2及55%文字。建置後 `85-86-native/` 的72個raster cases無空白或裁切，已查看原生明暗與文字情境；`85-86-weights/` 最大線寬明暗圖及 `85-86-overview/comparison.png` 均已查看。180個可變描邊變體與最新原稿一致。build:icons、build:review、完整validate、Atlas幾何及回比一致性檢查均通過，範圍外480顆不變。

## 第八十七至八十八批：能源與電池

| 圖示 | 判斷與改動 | 完稿回比 |
| --- | --- | --- |
| solar-panel | 精修。上下邊各自三等分，讓三欄沿梯形保持同比例展開；原先底邊六、八、六改為等寬。16px兩格維持。 | 與Lucide／Phosphor回比，三欄較均衡，兩側近端空腔更充足；太陽和板面仍明確分層。 |
| wind-turbine | 保留同母型旋轉120度的三片長葉、輪轂及塔柱。 | Tabler長葉姿態集中，Hugeicons動態弧是另一種表現；原生三尺寸葉片內孔與輪轂仍可分辨，不增加周邊弧線。 |
| battery-full / battery-low / battery-medium | 保留Lucide式三格電量序列及共用外殼；16px電量線較短。 | 與Lucide／Phosphor比較，滿電三格留白比四格寬，低／中電量始終佔用同一序列的前一／二格。 |
| battery-warning | 保留置於殼體中心的短筆與獨立圓點，閉合外殼與電量系列一致。 | Phosphor內置驚嘆號適合完整共用殼體；未採Lucide上下開口的構造。三尺寸上下筆點保持分離。 |

真實前稿與可編輯母型在 `87-energy-before/`、`88-batteries-before/`。最新回比及逐項決策在 `87-energy-candidate-1/` 和未修改的 `88-batteries-before/`。六顆每顆均已實際查看三尺寸、三角型、兩份來源、明暗DPR1／2及55%文字。

`87-88-native/` 的108個raster cases無空白或裁切，已查看native-1-light-1x、native-1-dark-1x、context-light-1x。`87-88-weights/` 最大線寬明暗圖及 `87-88-overview/comparison.png` 已查看，270個可變描邊變體與原稿一致。build:icons、build:review、完整validate、Atlas及回比一致性檢查均通過；範圍外480顆幾何不變。

## 第八十九至九十批：能源設備

| 圖示 | 判斷與改動 | 完稿回比 |
| --- | --- | --- |
| car-battery | 精修。負極右移0.5單位，左右符號中心為x8與x16，兩側距外殼的空間一致。 | 採Lucide既有對稱配置；與Lucide／Phosphor回比，短接點和極性符號在16px保持清楚，不增加矩形接頭小孔。 |
| charging-station | 精修。充電端斜線與垂直電纜之間補半徑2的相切圓弧，sharp亦保留電纜本體曲面。 | Lucide原稿的轉接更自然，回修後上下電纜同屬圓滑線纜；三尺寸維持機身、顯示帶與閃電的區別。 |
| transmission-tower | 保留尖冠、單道橫擔、漸寬塔腳及一組X斜撐。 | 與Hugeicons／MDI比較，一組斜撐在小尺寸留下較完整空腔，底腳接地，橫擔和塔身相連。 |
| power-socket | 保留單層面板與對稱雙圓孔。 | Tabler的雙孔面板在原生尺寸已成立；不增加MDI歐式凹槽的框中框。此為雙圓孔器型，並非所有地區插座的寫實通用外觀。 |

真實前稿與母型在 `89-energy-before/`、`90-socket-before/`；最新回比及決策在 `89-energy-candidate-1/` 和未修改的 `90-socket-before/`。四顆均實際查看三尺寸、三角型、兩份來源、明暗DPR1／2及55%文字。

`89-90-native/` 的72個raster cases無空白或裁切，已查看native-1-light-1x、native-1-dark-1x、context-light-1x。`89-90-weights/` 最大線寬明暗圖與 `89-90-overview/comparison.png` 已目視，180個可變描邊變體與原稿一致。建置、完整validate、Atlas及回比一致性檢查通過；範圍外480顆幾何不變。

## 第九十一至九十四批：監視、消防、門禁與安全

| 圖示 | 回比判斷 |
| --- | --- |
| cctv | 依 Lucide 前端微圓的優點重建共同斜軸上的鏡身。後蓋相切接直壁，前角依角型修改。保留同軸鏡口和折臂。 |
| siren | 保留 Phosphor 式圓頂和三道光。罩內短弧與外殼在小尺寸分離。 |
| alarm-smoke | 保留雙層感測殼與 Lucide 式緩曲煙線，三股在小尺寸仍有留白。 |
| fire-extinguisher | 保留圓肩、閥頸、支夾和軟管。與 Lucide／Phosphor 回比，軟管通道疏朗。 |
| fire-hydrant | 採 Tabler 的微圓接頭，soft、rounded 在接頭外側加入依角型變化的實際圓弧，保持根部折角與接地底座。 |
| vault | 保留 Lucide 式四向轉輪和四側均衡留白，中央輪孔清楚。 |
| key-square | 參照 Lucide 與 Hugeicons 平行短頸的構造，重算末齒與握頭交點。 |
| scan-face | 保留四個同樣的框角、對稱眼點與嘴弧，五官和框角分開。 |
| seat-belt | 保留帶條與腰帶的共同結點，以及斜帶前後的真透明避讓。 |
| safety-pin | 保留 Lucide Lab 式雙平行針身和較大的彈簧圈，扣頭與針桿交接清楚。 |

`91-security-before/`、`92-fire-before/`、`93-access-before/` 及 `94-safety-before/` 保存真實前稿與原稿模組。最新回比及逐項判斷見 `91-security-candidate-1/`、`92-fire-candidate-1/`、`93-access-candidate-1/` 及未修改的 `94-safety-before/`。已實際查看三尺寸、三角型、兩來源、明暗 DPR1／2 與 55% 文字。

`91-92-native/` 和 `93-94-native/` 共 180 個光柵案例，無空白或裁切。兩組皆查看原生明暗與文字情境、最大線寬明暗圖和前後對照。450 個可變描邊變體與當前原稿一致。建置、完整驗證、Atlas 與回比一致性檢查通過，範圍外 480 顆幾何維持原樣。

## 第九十五批：天平、法槌與印章

天平沿用 Lucide 的等高雙盤，將兩側橫樑曲段接到和吊點共用的水平切點。與 Lucide／Phosphor 回比，吊點承接更平順，左右秤盤與底座比例維持一致。法槌保留 Lucide 式略外伸的槌面和長柄，印章保留圓頭收腰握柄與獨立印痕。逐顆判斷在 `95-commerce-candidate-1/`，真實前稿及可編輯母型在 `95-commerce-before/`。

三顆已查看三尺寸、三角型、兩來源、明暗 DPR1／2 與 55% 文字。`95-native/` 的 54 個光柵案例無空白或裁切，原生明暗及文字情境已查看。`95-weights/` 最大線寬明暗和 `95-overview/comparison.png` 已查看，135 個可變描邊變體與原稿一致。建置、完整驗證、Atlas 及回比一致性檢查通過。

## 第九十六至九十八批：購物與交易

| 圖示 | 回比判斷 |
| --- | --- |
| shopping-basket | 保留 Lucide 式開放雙提把和籃口，兩條對稱短籃條比完整格網疏朗。 |
| basket-check、basket-plus | Hugeicons 的完整雙籃條較清楚。現稿保留 Lucide 籃形與家族符號，將籃條成對往左收，讓勾號和加號的透明避讓區避開籃條。第二候選清理了第一次調整時 sharp 加號旁仍被削到的籃條。 |
| bag-check、bag-plus | 與 Tabler／Hugeicons 回比後保留拱形提把、乾淨袋身與分離的右下狀態符號，以延續既有購物袋母型。 |
| cash-register | 延續 Phosphor 的斜面鍵盤和錢櫃，將顯示器置中，對齊鍵盤和錢櫃的中軸。 |
| receipt-dollar | 保留 Hugeicons 式上下短桿和既有鋸齒收據外緣，原生尺寸的貨幣字形仍有清楚留白。 |

前稿見 `96-basket-before/`、`97-bag-before/` 和 `98-register-before/`。逐顆最新回比見 `96-basket-candidate-2/`、`97-bag-before/` 及 `98-register-candidate-1/`。購物籃狀態除各自的兩份來源，亦在同批的購物籃母型比較中查看 Lucide 原稿，證據見 `supplemental-sources.json`。三尺寸、三角型、明暗 DPR1／2 與文字情境皆實際查看。

`96-98-native/` 的 126 個光柵案例無空白或裁切，已查看原生明暗及文字圖。`96-98-weights/` 的 315 個可變描邊變體與原稿一致，已查看最粗線寬明暗圖及 `96-98-overview/comparison.png`。完整建置、驗證及 Atlas 範圍檢查通過。

## 第九十九至一百批：電話與通訊設備

來電、撥出、未接及通話四種狀態都保留共用話筒。和各自的 Lucide、Tabler、Hugeicons 或 Phosphor 原稿回比後，保留來電與撥出的反向斜箭、等臂叉號和兩道同心弧。信箱採 Phosphor 兩端肩部曲率一致的構造觀察，將靠右肩部改成和前門相同的相切圓弧，保留 Lucide 式收起的側旗。衛星天線保留同一斜軸上的盤面、饋源與雙弧。

`99-phone-before/` 和 `100-mail-before/` 保存真實前稿。`99-phone-before/` 與 `100-mail-candidate-1/` 保存六顆最新判斷及來源回比，三尺寸、三角型、明暗 DPR1／2 和文字情境均實際查看。`99-100-native/` 的 108 個光柵案例無空白或裁切，已查看原生明暗與文字圖。`99-100-weights/` 的 270 個可變描邊變體與原稿一致，最大線寬明暗圖及 `99-100-overview/comparison.png` 已查看。完整建置及驗證通過。

## 第一百零一至一百零四批：訊息與資料圖表

四個訊息狀態保留原稿。喜愛和輸入中使用共同對話框及內置心形、三點。鎖定和搜尋保留右下徽標與按實際墨線計算的透明避讓，16px 仍能分辨框尾、鎖梁及鏡頭。

瀑布圖讓相鄰兩根柱共用累計接點，第三柱回升後由同一高度進入第四柱。組合圖從四個等距取樣位置生成折線與直柱，使兩序列逐點對齊。兩顆修改後分別回比 MDI／Hugeicons 及 Lucide／Hugeicons 原稿。其餘八張圖表回比後保留，分別檢查雷達圖的軸與分區、K 線圖的柱孔與影線、氣泡圖的三圈、網路圖的節點與軸、直方圖的峰和四柱、桑基圖的交錯流線、平滑曲線的峰谷，以及鐘形曲線的對稱兩尾。

`101-message-before/`、`102-charts-before/`、`103-charts-before/` 與 `104-charts-before/` 保存真實前稿。最新逐項回比與決策位於 `101-message-before/`、`102-charts-candidate-1/`、`103-charts-before/` 與 `104-charts-candidate-1/`。三尺寸、三角型、明暗 DPR1／2 及 55% 文字均實際查看。

`101-native/`、`102-103-native/` 與 `104-native/` 共 252 個光柵案例，無空白或裁切，已查看原生明暗與文字圖。三組前後對照與最粗線寬明暗圖已查看，630 個可變描邊變體與當前原稿相同。建置、完整驗證、Atlas 範圍及回比一致性檢查通過。

## 第一百零五至一百零七批向量與幾何

貝茲曲線對照 Phosphor 的空心圓節點與 Tabler 在弧肩上方的留白，降低拱頂，讓中央節點下緣承接兩側曲線。16、20、24px 都能分辨水平控制桿與弧肩。其餘九顆保留。向量矩形維持空心方點，樣條曲線和向量多邊形保留圓節點。五邊形及八邊形保留等邊，橢圓形維持水平長軸。圓錐的斜壁切入橢圓底面，圓柱保留完整頂面，角錐的稜線止於外框。

[向量前後對照](105-overview/comparison.png)與[平面及立體幾何前後對照](106-107-overview/comparison.png)可查看放大稿及三個原生尺寸。逐項回比放在 `105-vector-candidate-1/`、`106-flat-before/`、`107-solids-before/`，向量改稿前的圖和程式保存在 `105-vector-before/`。

兩組原生渲染共 180 個光柵案例，未檢出空白或裁切。450 個線寬變體與當前原稿一致，亦已查看兩組最大線寬的明暗圖。

## 第一百零八至一百一十三批版面、時間與慶祝

縮圖清單參考 Hugeicons 的長短文字線，每列第二筆縮短兩個單位，保留縮圖位置和左對齊。子母畫面沿 Lucide 的主窗開口構圖，以連續路徑畫主窗，讓其兩端按角型收尾並與前窗保留等距空隙。派對拉炮參考 Tabler 散點和短線的節奏，以一枚圓紙屑替代上方直線。三顆改稿均重新並列兩款固定來源，在 16px、最粗描邊及灰階文字情境檢查留白。

其餘 27 顆回比後保留。版面檢查欄寬、分界和拆分箭翼。日曆與鬧鐘檢查共用母型內的狀態符號。慶祝與遊戲檢查切面、獎章環孔、把手及按鈕。逐項來源與決策位於下表對應目錄，三次改稿前的圖和程式存於同編號的 `-before` 目錄。

| 圖示組 | 前後對照 | 逐項來源回比 |
| --- | --- | --- |
| 版面與拆分 | [對照圖](108-overview/comparison.png) | [決策](108-layout-candidate-1/decisions.json) |
| 面板與對焦 | [對照圖](109-overview/comparison.png) | [決策](109-panels-candidate-1/decisions.json) |
| 日曆狀態 | [對照圖](110-overview/comparison.png) | [決策](110-calendar-before/decisions.json) |
| 時間與鬧鐘 | [對照圖](111-overview/comparison.png) | [決策](111-time-before/decisions.json) |
| 寶石與獎章 | [對照圖](112-overview/comparison.png) | [決策](112-awards-before/decisions.json) |
| 慶祝與遊戲 | [對照圖](113-overview/comparison.png) | [決策](113-games-candidate-1/decisions.json) |

六組原生渲染共 540 個光柵案例，未檢出空白或裁切。逐組查看原生明暗圖、文字情境和最大線寬，核對 1,350 個線寬變體。

## 第一百一十四批依使用者指定恢復前稿

胡蘿蔔、心跳、購物籃完成、新增購物籃、貝茲曲線及波浪已恢復為本輪開始前的圖稿。三種尺寸與三種轉角共 54 個變體逐一與基準一致，兩個購物籃狀態均使用原先的通風線位置與徽標避讓。

[還原前後原生對照](114-native/native-1-light-1x.png)以 A 表示撤回的精修稿，以 B 表示還原後的稿。固定來源回比與決策在 [114-user-restore](114-user-restore/decisions.json)，撤回稿的審稿紀錄與來源歸屬存於 [superseded.json](114-user-restore/superseded.json)。

## 驗證與範圍

全輪核對 620 份固定來源 SVG 和 1,240 張逐項對照證據。建置包含 790 個名稱與 7,110 個 SVG，Atlas 幾何檢查涵蓋 310 顆，60 個測試通過。最終檢查核對 Atlas 的 13,950 個線寬變體、兩份審稿紀錄的一致性，以及範圍外 480 顆的幾何基準。結果見 [一致性報告](consistency.json) 和 [驗證紀錄](verification.json)。

## 審稿基準

- 真實前稿：`references/atlas-recompare-01/master-before.json`（310顆）。
- 範圍外基準：`references/atlas-recompare-01/outside-scope-before.json`（480顆）。
- 可編輯來源與舊ledger：同一references目錄的`source-before/`、`previous-refinement-ledger.json`及`previous-atlas-provenance.json`。
- 逐項狀態：本目錄`ledger.json`；修改項目的最新審稿也更新到`docs/refinement-ledger.json`，原紀錄完整保存在本輪基準。

生成比較：`node scripts/review-atlas-recompare.mjs BATCH NAME NAME`。每個候選用新批次名稱，腳本拒絕覆寫已存在的證據。實際查看並寫下逐項判斷後，用 `node scripts/record-atlas-recompare.mjs PATH/decisions.json` 登錄；它只檢查人工填入的決策與圖稿一致，不自行作美感判斷。核對：`node scripts/check-atlas-recompare.mjs`。不要重建本輪baseline或將待比對項目自動升級。

## 蝸牛頭身承接再次回修

依使用者指出頭身仍生硬的回饋，降低頭冠、放寬斜頸，讓頭部外緣連續展開至腹足；螺旋保持。真實前稿保存於 `16-snail-feedback-before/`，舊判斷完整保存在 `16-snail-feedback-reopened.json`。最新來源回比、前後圖及逐項決策在 `16-snail-feedback-candidate-1/`。已目視三尺寸、三角型、明暗 DPR1／2，並查看建置後原生明暗及文字情境。18 個 raster cases 無空白／裁切；建置、validate、Atlas 與回比一致性檢查通過。此為 AI 製作候選，尚未取得使用者定案。
