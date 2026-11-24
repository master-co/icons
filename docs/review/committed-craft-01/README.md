# Committed icon refinement · skill 0.5.11

本輪以任務開始時的 HEAD `9fad7cbf` 名稱清單限定範圍，以當時工作樹圖稿作真實前稿。392 顆一般圖示逐顆重審；88 顆已提交品牌圖示不屬於 master-icons 的重設範圍。未提交的新圖示略過。先前 Craft／Atlas 的通過紀錄不代替本輪目視。

已完成 392 / 392 顆：377 顆保留，15 顆精修，沒有待比對項目。共 60 批逐項審稿，實際查看 92 張比較畫面；涵蓋 16／20／24px、sharp／soft／rounded、明暗背景及 55% 文字情境。審查者為 Codex（AI）；這是製作審稿紀錄，不聲稱維護者已定案。

15 顆修改集中在鏈節切線、小尺寸內部留白、上下標字形、清單增刪標記位置，以及音量層級辨識。`volume` 的 16px 原稿與 `volume-low` 完全相同，現已恢復雙聲波；所有修改名稱見 `change-scope.json`。

## 已完成批次

- `01-directions`：11 顆方向箭頭，保留比例、箭尖收口與雙箭翼間距。逐項理由見 `ledger.json`，來源及原生三尺寸／三角型／明暗／低對比並列見該目錄。
- `02-navigation-final`：10 顆導覽操作，保留 8 顆。`link` 將圓弧與斜邊修為相切曲線，兩個鏈節旋轉共用；`unlink` 同步母型，拉開提示線並恢復 16px 的四向斷開訊號。
- `02-link-native`：建置後的 `link`／`unlink` 原生、文字情境與放大診斷。36 個 raster cases 無空白或裁切。已實際查看的證據列在主 ledger；未查看的生成圖不視為新增目視覆蓋。
- `03-motion-final`：9 顆移動／回覆操作；`keyboard-return` 上移內箭頭並收短箭翼，增加鍵框下緣留白，其餘 8 顆保留。
- `04-status-final`：11 顆操作／狀態符號；`check-circle` 回收 16／20px 勾號右上端，增加勾與圈的空白，其餘 10 顆保留。
- `05-input-before`：10 顆表單控制、省略號與選單，全部保留；空白 checkbox／radio 的來源用途限制已逐項標記。
- `06-discovery-before`：11 顆搜尋、過濾、設定及掃描，全部保留；條碼平切筆畫與掃描框角的區別、QR 定位孔均按原生尺寸檢視。
- `03-04-native`：建置後的鍵帽與確認圓圈，36 個 raster cases 無空白或裁切。原生明暗、文字與放大圖已查看；鍵帽接點測試保留舊稿回轉路徑的比較，並新增實際箭翼到下框至少 1px 的檢查。
- `07-symbols-before`：10 顆基本形狀與象徵符號，保留；逐顆檢查尖角、凹口、曲線及小尺寸內孔。
- `08-text-before`：10 顆文字、對齊、縮排與分布工具，保留；保留內容行位移所承載的縮排語意。
- `09-type-candidate`：10 顆字形工具；上下標改為有腰部和起收筆的 x，與變數字形一致，其餘 8 顆保留。
- `10-lists-candidate`：10 顆清單與拖曳把手；新增／移除標記移至右側中央，內容行縮短，避免減號像底部文字斷線，其餘 8 顆保留。`list-minus` 第二份來源仍只有結構參考，補查固定 Phosphor 版本的同名資產回傳 404；沒有將限制改寫為同語意雙來源。
- `09-10-native`：建置後的上下標及清單操作，72 個 raster cases 無空白或裁切。原生明暗、文字與放大圖已查看；清單操作已納入既有前景淨空測試，14 項相關測試通過。
- `11-file-states-final`：8 顆文件與狀態；降低並壓短 `file-question` 的問號頭部，同時上收尾端，拉開折頁及下點間距，其餘 7 顆保留。
- `12-file-content-candidate`：6 顆內容文件；收窄 `file-code`／`file-json` 括號，保留中央通道，改善內符號貼側壁的感覺，其餘 4 顆保留。壓縮檔齒軌的語意虛線保留。
- `13-folders-candidate`：12 顆資料夾；`folder-up`／`folder-down` 收短下端，改善底框留白，其餘 10 顆保留。向下箭頭到下框的實際墨線距離為 sharp 0.991／1.148／1.138px（16／20／24）；soft 與 rounded 更寬。
- `14-document-actions-before`：11 顆剪貼簿、複製、封存、收件匣與刪除工具，全部保留，逐項記錄結構接合、前景避讓與小尺寸簡化。
- `11-13-native`：建置後的 5 顆精修圖，90 個 raster cases 無空白或裁切，原生明暗、文字情境及放大診斷已查看。

- `15-reading-before`：9 顆書本、便利貼與書籤，全部保留；記錄裝訂、頁面曲面及書籤凹口的小尺寸表現。
- `16-calendar-candidate`：8 顆日曆；縮小 `calendar-plus` 內十字，增加上方頁首留白，其餘 7 顆保留。
- `17-time-before`：9 顆時間、儀表及提醒，全部保留；確認指針、響鈴弧線及斷線避讓。
- `18-mail-before`：9 顆郵件、傳送、@ 與迴紋針，全部保留；檢查封口接點及右下狀態符號。
- `19-messages-before`：8 顆對話及引號，全部保留；矩形／圓形母型差異及來源策略逐項記錄。
- `20-people-before`：9 顆人物、通訊錄與無障礙，全部保留；檢查頭肩、齒輪內孔、帳戶狀態與輪椅支承。
- `21-security-before`：9 顆鎖、盾牌、鑰匙、指紋與眼睛，全部保留；檢查盾尖對稱、鎖梁開口及眼瞼避讓。
- `22-playback-before`：10 顆播放控制，全部保留；雙三角保持分離，循環／隨機箭路接點清楚。`stop` 的 Lucide square 仍只作構造參考。
- `23-audio-final`：9 顆音訊圖示；`volume` 在 16px 恢復外圈聲波，修正與 `volume-low` 完全相同的問題，其餘 8 顆保留。補入固定 Tabler 版本的雙波 `volume` 原稿，並更正舊單波來源為構造參考。
- `24-visual-media-before`：8 顆圖像、攝影及螢幕投放，全部保留；檢查山形接框、鏡頭接機身及狀態避讓。
- `25-devices-before`：8 顆螢幕及輸入裝置，全部保留；記錄螢幕支承、鍵盤減量及手機／平板比例。
- `16-23-native`：建置後兩顆精修圖，36 個 raster cases 無空白或裁切；原生明暗、文字及放大診斷已查看。

- `26-panels-before`：10 顆面板及等分版面，全部保留；確認開合方向、主區箭頭及共同分界收口。
- `27-tables-before`：7 顆表格操作，全部保留；增刪列／欄共用旋轉構造，合併／拆分用結果格線表意。
- `28-layout-before`：4 顆儀表板、格狀版面、看板及框架，全部保留；確認卡片內孔、欄間空白及框架外伸長度。
- `29-overlaps-before`：3 顆圖層、組件及混合，全部保留；逐項區分薄片前後、組件分離和圓形實際交集。
- `30-charts-before`：9 顆圖表，全部保留；確認堆疊柱孔洞、環圖／圓餅分界、散點及原生尺寸簡化。
- `31-analysis-before`：6 顆趨勢、排序及活動訊號，全部保留；確認箭桿接點、雙箭間距及折線張力。

- `32-connectivity-before`：9 顆連線、電源及電池，全部保留；確認無線訊號層次、斷線避讓及電量內孔。
- `33-cloud-before`：6 顆雲端狀態，全部保留；檢查雲朵曲線、狀態符號與輪廓間隙。
- `34-databases-before`：3 顆資料庫，全部保留；確認圓柱層次與備份／搜尋符號。
- `35-drives-before`：3 顆硬碟，全部保留；檢查磁碟機母型及上下傳箭頭。
- `36-servers-before`：2 顆伺服器，全部保留；確認機架間距與齒輪內孔。
- `37-chips-before`：2 顆處理器與記憶體，全部保留；確認引腳節奏與小尺寸減量。
- `38-graphs-before`：3 顆網路、流程及分享，全部保留；確認節點、連線與分支語意。
- `39-git-before`：6 顆 Git 操作，全部保留；確認分支曲線、節點內孔及合併方向。
- `40-development-before`：7 顆程式及鍵盤符號，全部保留；確認括號字形、終端游標及鍵帽留白。
- `41-writing-before`：3 顆書寫工具，全部保留；確認筆尖、筆身接合及工具差異。
- `42-color-tools-before`：3 顆色彩工具，全部保留；確認調色盤曲線、滴管及油漆桶開口。
- `43-editing-before`：6 顆裁切、選取及編輯工具，全部保留；選框斷線有語意用途，套索及尺規保留清楚辨識點。
- `44-direct-tools-before`：3 顆手掌、剪刀及游標，全部保留；確認手指負空間、剪刀鉸接及游標尖端。
- `45-tools-before`：3 顆扳手、磁鐵及拼圖，全部保留；確認開口、凹凸曲線及中立輪廓。
- `46-curved-symbols-before`：2 顆 bug／webhook，全部保留；確認曲線接合、內孔及三向平衡。
- `47-social-objects-before`：2 顆握手及擴音器，全部保留；握手的 Tabler heart-handshake 為語意變體，限制逐項記錄。
- `48-communications-before`：3 顆電話及 RSS，全部保留；確認聽筒彎曲、關閉斜線避讓及訊號間距。
- `49-reactions-before`：4 顆表情及拇指，全部保留；確認五官間距、嘴形與拇指輪廓。
- `50-recognition-before`：4 顆獎章、徽章、旗幟及救生圈，全部保留；確認凹口、徽章內勾及環形分區。
- `51-maps-before`：3 顆地圖及地球，全部保留；確認折頁分界、圖釘避讓與經緯曲線。
- `52-location-before`：7 顆定位及導航，全部保留；確認圖釘尖端、羅盤、路徑與指示方向。
- `53-labels-before`：5 顆固定、標籤及票券，全部保留；確認疊層與內孔，票券撕線保留語意虛線及尺寸調整。
- `54-light-before`：4 顆光線及明暗，全部保留；確認光芒間距、月牙與燈泡曲線；contrast 使用語意半填色。
- `55-places-before`：5 顆建築及公事包，全部保留；確認屋頂接牆、柱間空白及提把內孔。
- `56-logistics-before`：3 顆包裹及卡車，全部保留；確認箱體折面、開蓋及輪胎支承。
- `57-package-actions-before`：2 顆包裹狀態，全部保留；package-return 的 Tabler package-import 僅作構造參考，未宣稱同語意。
- `58-shopping-before`：5 顆購物及禮物，全部保留；確認輪子、提把、狀態符號及蝴蝶結內孔。
- `59-payments-before`：4 顆付款器物，全部保留；確認紙鈔、硬幣層次、卡片磁條及錢包開口。
- `60-office-before`：6 顆計算及辦公器物，全部保留；確認按鍵、票據裁口、紙張層次與磁碟內框。

## 可追溯性

`references/committed-craft-01/master-before.json` 保存全部 392 顆任務開始時的圖稿；`source-before/` 保存可編輯來源；`previous-link-reviews.json` 保留被新審查取代的兩筆歷史紀錄。初稿、一次過平的曲線試作及最終稿分別在 `02-navigation-before`、`02-navigation-candidate`、`02-navigation-final`，試作不作交付幾何。

`change-scope.json` 列出目前與任務開始不同的 15 顆，其餘 377 顆幾何不變。`skipped-integrity.json` 再次核對原有 2,250 個未追蹤 SVG 的 bytes 全部未改。標準 build 同時處理工作樹已有的新概念；本輪未研究、修改或審定這些新概念。各輪舊審查紀錄保存在 references 本輪目錄的 `previous-*-reviews.json`，文件與資料夾的舊紀錄為 `previous-file-folder-reviews.json`；日曆與音量的舊紀錄為 `previous-calendar-audio-reviews.json`。

來源均沿用 repository 已固定版本的原稿與授權資訊，保留原始 viewBox 和描邊。此次包括既有母型的切線／間距修正與音量狀態區分，未引入第三方 SVG 路徑。新增的 Tabler 音量來源及更正前來源紀錄保存在本輪 references 目錄，沿用 repository 已有的 MIT 授權資料。

## 完成核對

`completion-audit.json` 記錄最終一致性核對：392 顆的保存來源均能重現任務前稿；3,528 個原生尺寸／角型版本均與已查看批次的圖稿一致；目前建置的全部 790 個名稱也與可編輯來源一致。逐項來源均固定 commit、附授權並核對檔案雜湊；來源僅供構造或語意變體參考的限制保留在紀錄中。

原有 2,250 個未提交新圖示 SVG 檔案雜湊全部未變。目前另有 310 個名稱在任務基準 commit 之外，未納入本輪美感審查。最早兩批的 DPR 紀錄已在結案時重新查看四張畫面，補上明確檔名。

建置、驗證及 14 項相關測試已通過，15 顆修改的 270 個原生 raster cases 無空白或裁切，詳見 `verification.json` 及各 native 目錄。後續 157 顆保留決策沒有修改幾何，最終核對確認建置仍然相符。

重跑一致性核對：`node scripts/audit-committed-craft.mjs`。此檢查不代替人工目視，也不產生維護者批准。不要重新建立或覆寫任務開始的 baseline。

渲染指令：`node scripts/review-committed-craft.mjs BATCH NAME,NAME`。腳本只生成證據，不會自動批准圖稿。
