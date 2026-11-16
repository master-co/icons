# Craft 04 · 工程與目視驗證

2026-11-16 · private alpha。392個命名圖稿、244個基本概念、3,528份SVG；49顆精修，沒有新增名稱。前輪完整結果保存於 [Craft 03](validation-craft-03.md)。

本輪 pnpm check 通過：精確名稱集合、來源checksum、全部SVG結構與hash、逐顆審查hash、重複幾何、React／SVG九組一致、無障礙／RTL、tree shaking與TypeScript。27項Node測試通過，新增回歸檢查涵蓋箭尖局部收口且不破壞折返路線、A橫槓／包蓋分界不越界、扳手反射對稱及精修範圍。既有虛線及逐筆透明度序列化測試保留。

Chromium／WebKit DPR1／2共36項瀏覽器流程通過；3,528×4＝14,112次圖稿渲染未檢出裁切。離線圖庫、來源、下載、搜尋、21情境的桌面／手機明暗流程通過。7,873檔案消費端套件與SVG／React入口通過；8,791個建置輸出在UTC與Asia/Taipei時區逐位元一致。

目視：五批49顆逐顆來源對照、前後稿、九母版、明暗、文字旁與55%前景均已實看；另實看7顆相近接縫並保留。效果頁檢視Chromium1x淺底與WebKit2x深底，chart-area已無填面、ticket平切撕線仍保留。情境複核工作偏好桌面淺底、開發服務桌面深底、檔案手機淺底及Dashboard手機深底。其餘情境有流程與截圖，未宣稱本輪重新目視全84張或全392顆。參見 [實看紀錄](review/craft-04/visual-followup.json)。

逐顆離線報告在Chromium、WebKit通過搜尋、明暗、九母版、前稿與新稿區別、手機版面及296個本地連結檢查。Skill0.5.3結構驗證通過，專案與已安裝副本同步。

限制：Firefox沿用前輪profile啟動失敗，這次未重試，仍未驗證。volume-low在16px與通用volume同稿的限制保留。55%前景檢查不代表任意低對比配色的無障礙保證。Codex目視與使用者最終定案分開記錄。

[核心檢查](review/craft-04/core-checks.log) · [瀏覽器](review/craft-04/browser-tests.log) · [消費端](review/craft-04/package.log) · [可重現建置](review/craft-04/reproducible.log) · [離線報告](review/craft-04/report-check.json)。

未發布npm、未推送遠端。
