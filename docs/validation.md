# Clearance 01 · 四顆試作驗證

2026-11-16，0.1.0-alpha.0。本輪只精修 phone-off、mail-x、file-lock、folder-lock；其餘 276 顆幾何精確保留。280 個命名圖稿、182 個基本概念、2,520 份 SVG。前輪完整獨立複審見 [Craft 02](validation-craft-02.md)。

| 檢查 | 結果 |
| --- | --- |
| build／validate | SVG 結構、2,520 份 checksum、名稱與匯出、重複幾何、560 當期＋48 歷史來源、逐項前後稿及證據 hash 通過 |
| Node／React／tree shaking | 17 項通過；全庫九組 SVG／React 相同，原始48及未修改276項保持相容 |
| 新契約幾何 | 四顆九組實際背景墨線不得侵入前景外擴禁入區；phone-off 四個切面與斜線外緣平行 |
| TypeScript | 通過 |
| Chromium／WebKit DPR 1／2 | 32 項通過，包括全庫 10,080 組 raster、來源／前稿、離線下載與情境流程 |
| 消費端套件 | 5,633 個封裝檔案；資料、runtime、固定／動態 React、SVG subpath 及 notices 通過 |
| 可重現建置 | UTC／Asia/Taipei 輸出逐位元一致；詳見本輪紀錄 |
| Skill | master-icons v0.5.0 驗證通過；版本化與已安裝副本一致 |

Firefox 沿用上輪啟動失敗的未驗證狀態，本輪未重試；[既有失敗紀錄](review/craft-02/firefox.json)。

四顆另有 Chromium／WebKit DPR 1／2 的前後、九組原生、明暗、55% 前景及棋盤透明背景畫面：[前後與淨空診斷](review/clearance-01/summary.png)、[九組深色](review/clearance-01/native-webkit-2x-dark.png)、[固定來源並列](review/ui-v1/clearance-01/comparison.png)。本輪不新增虛線或透明度效果；兩者的逐顆不採用理由已寫入紀錄。

[全庫新契約盤點](review/clearance-01/scope-audit.json) 是構造篩查，列出18顆待複核及7顆層次待判斷，不等於全部通過新契約。中央審查表只更新四顆，其他項目保留實際前輪基準、來源及目視證據。使用者最終定案仍待檢視。

背景裁切輸出為固定原生線寬的填色輪廓；任意 CSS／React strokeWidth 覆寫不能重新計算其背景淨空。尺寸、圓角、色彩及無障礙入口保持原有方式；詳見 [實作取捨](clearance-01.md)。製作端幾何工具不進入 SVG／React 消費端。

[瀏覽器紀錄](review/clearance-01/browser-tests.log) · [套件紀錄](review/clearance-01/package.log) · [可重現性](review/clearance-01/reproducible.log)。維持 private alpha，沒有發布 npm 或推送遠端。
