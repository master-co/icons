# Contributing

先穩定圖稿品質，再擴增數量。修改從 packages/icons/src 開始，packages/icons/icons 為生成輸出。

1. 在 packages/icons/src/ui-scope.json 明確核定新增名稱；packages/icons/src/catalog.mjs 與 packages/icons/src/aliases.mjs 管理搜尋詞、分類與方向。
2. 在 packages/icons/src/families/ 對應家族繪製母型；原始 48 位於 core.mjs。密集形狀按 16／20／24 調整細節，避免壓縮配方。
3. 檢查三種圓角，共用家族幾何，保留有意義的尖角。
4. 參考或衍生上游時，確認具體版本授權，保存原文、commit、路徑、checksum、修改說明。不要從付費圖庫或來源不明 SVG 拷貝。
5. 執行 bun run check、bun run test:browser；在原生尺寸、文字場景、明暗背景檢視，記錄截圖與理由。
6. bun run check:reproducible 確認生成可重現。提交 packages/icons/src、生成的 packages/icons/icons 與必要 notices，不提交 dist、node_modules。

原始 48 個名稱固定於 `packages/icons/src/core-names.json`，另有 `packages/icons/src/ui-scope.json` 的162個、`packages/icons/src/organization-scope.json` 的10個及 `packages/icons/src/productivity-scope.json` 的60個新稿。驗證器要求四份明確清單的精確聯集；不要恢復已刪除的大量擴充圖稿。修改須保存真實前稿，先完成兩份固定來源對照及原生明暗目視，再更新 `docs/refinement-ledger.json` 的理由、圖稿 hash 與證據。建置或審稿截圖工具不自動批准設計。

測試驗證完整性、公開 API、輸出安全性、打包、授權與使用流程，不為每個座標寫鏡像測試。外觀仍需人工審稿。

製作、精修與審稿使用 [Master Icons skill](skills/master-icons/SKILL.md)。pilot 是審稿分組；不能據此自動新增第三方版權。獨立製作與研究參考、實際引用的差別見 skill 的 authorship reference。
