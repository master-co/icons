# 通用介面與商務圖示 · 驗證紀錄

2026-11-16，0.1.0-alpha.0。工程驗證、Codex 設計目視及使用者最終定案分開記錄。

## 範圍與相容性

- 原始 48 名稱完整保留；其全部九組幾何與本期開始前保存的最新版本一致，包含 user、users、bell、bell-off 的既有精修。
- 本期明確清單新增 162，合計 210 個命名圖稿、147 個基本概念、1,890 份 SVG。方向、開關、狀態與搜尋別名不灌入基本概念數。
- 驗證名稱為 core-names.json 與 ui-scope.json 的精確聯集；沒有恢復舊擴充配方，也沒有改成最低數量門檻。
- 九組 SVG、動態／固定 React、型別及無障礙 API 維持相容。RTL 僅鏡射左右 arrow、左右 chevron、左右雙 chevron、undo／redo。

## 工程結果

| 檢查 | 結果 |
| --- | --- |
| pnpm check | 通過：SVG 結構、有限座標、九組完整性、名稱／匯出、重複幾何、授權、來源 checksum、10 個 API／幾何／SSR／tree shaking 測試及 TypeScript |
| 每顆審查完整性 | 210 筆具個別理由、兩份來源、效果判斷及證據；驗證器拒絕未審查、幾何 hash 改變、來源改變或證據 hash 不符 |
| 原始48保留 | 432 組 native master 與真實前稿一致 |
| 來源 | 420 份當期對照及 48 份歷史對照 checksum 通過；固定 commit，原稿與授權同存 |
| SVG／React | 所有 210 × 9 幾何一致；實際 ticket 虛線與 chart-area opacity 序列化一致 |
| 套件消費端 | 實際 pnpm pack 後驗證資料、runtime、動態／固定 React、SVG subpath、虛線／透明度及 notices；4,232 個套件檔案，排除比較原稿與預覽 |
| 可重現建置 | 4,763 個生成檔在 UTC 與 Asia/Taipei 建置逐位元一致 |
| Skill | v0.3.0 驗證通過；版本化來源與已安裝 master-icons 完全一致 |

## 瀏覽器與預覽

Chromium／WebKit × DPR 1／2 的 20 個瀏覽器測試通過。每組皆解析及 rasterize 1,890 份 SVG，合計 7,560 次檢查，無空白或裁切；此數值不代表美感評分。

已檢查搜尋、分類、尺寸／圓角、鍵盤、圖示詳情、SVG／ZIP 下載、明暗、390／768／1440 寬度，以及 file:// 離線運作。來源頁的 18 頁、全部 210 顆皆在本地服務與離線模式載入；原始 48 顆提供真實前稿，162 顆新稿明示無舊稿。

八個情境：Dashboard、資料表與篩選、設定表單、檔案管理、內容編輯器、訊息／客服、訂單／結帳、訂閱／帳單。四組瀏覽器均測試明暗及桌面／手機配置、導覽與主要操作；保留 Chromium DPR 1 的 32 張情境截圖。資料表在手機使用局部橫向捲動，頁面本身沒有橫向溢出。

Firefox 本輪已嘗試啟動，失敗訊息為 `Could not find profile folder`，程序退出碼 1；未進入渲染測試，因此明確列為**未驗證**。完整啟動訊息見 [Firefox 紀錄](review/ui-v1/final-visuals/firefox.json)。CI 保留 Firefox 測試，不把此環境問題視為通過。

## 設計目視

[逐顆審查報告](review/ui-v1/index.html) 包含全部個別判斷。分為 4 批原始圖示及 17 批新稿，每批 8–12 顆；來源並列、九組原生輸出、淺底／深底、文字旁與 55% 前景均已開圖檢視。八個情境的桌面／手機明暗截圖亦已檢視。

本期可見修整包含 dashboard 短面板內孔、images 山線與圓角接點、shield 曲線轉折、quote 真實圓角，以及 shopping-cart 16px 輪子的實心化。16px 在表格列線、圖表分界、音量聲波、建築窗點、紙箱膠帶、斜線遮擋碎段等處減少細節；沒有為了增加差異而強改原始48。

效果逐顆記錄。ticket 採撕線虛線，16px 兩段、20／24px 三段；chart-area 以 20% 透明度表達面積，保留完整實線邊界。兩者另有 SVG／React 九組並列、淺底／深底及低對比證據；未新增連續漸層、mask 或公開效果參數。

目前紀錄為 48 顆「保留原稿」、162 顆「新繪目視通過」，由 Codex 檢視，**不等於使用者最終定案**。尚未進行獨立使用者辨識率或偏好實驗；不宣稱比其他圖庫更易辨識。套件維持 private alpha，未發布 npm、提交 Git 或推送遠端。

## 證據與重現

- [逐顆機器可讀紀錄](refinement-ledger.json)：來源、判斷、效果、前稿 hash、九組幾何 hash、證據 hash、審查與使用者狀態。
- [批次清單](review/ui-v1/batches.json)：每批來源並列與原生明暗 PNG／HTML。
- [四組 raster metrics](review/ui-v1/chromium-1x-raster.json)：同目錄另有 Chromium 2x、WebKit 1x／2x。
- `node scripts/review-ui-batch.mjs batch-id name,name` 僅重新渲染至 work，不批准設計。
- `node scripts/review-report.mjs` 僅呈現既有判斷，不變更審查狀態。
- `pnpm test:browser --project='chromium-*' --project='webkit-*'` 可重跑本機已通過的四組；具可用 Firefox 的環境執行完整 `pnpm test:browser`。
