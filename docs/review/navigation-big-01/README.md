# Navigation · 四向寬箭頭

2026-11-19，依 master-icons 0.5.20 完成。新增 `arrow-big-left`、`arrow-big-right`；重新檢查並保留 `arrow-big-up`、`arrow-big-down`。四向、三尺寸、三角型共 36 份 SVG，其中 18 份為新增。

前輪把寬箭頭用途限縮為上下投票，因此沒有補左右。使用者指出 `arrow big` 後，本輪按其原意補齊既有圖形家族。這兩顆是方向變體，共用 `arrow-big-up` 概念與 `wideArrow()` 母型，沒有新增獨立命令概念。一般箭頭仍可完成相同方向操作；寬箭頭供既有封閉輪廓語言使用。

[互動總覽](../navigation-01/index.html) 已整合四向；[來源與前後對照](01-wide-arrows-final/review.html) 同時展示原生 16／20／24、三角型及低對比文字。原上下稿保留，左右由同母型旋轉，沒有分別調出不一致的肩寬或尖端。四向為固定的物理方向，RTL 不反轉。

## 來源與工藝

每顆對照 Lucide、Tabler 的既有固定 commit 原稿，保留原 viewBox 和筆畫。完整資產、checksum、commit 與角色見 [comparison.json](../../../references/navigation-big-01/comparison.json)。新增四筆來源登錄於 manifest，僅作比較；圖稿使用既有 Master 母型，沒有複製外部 path。

Master 保留較寬箭翼與方整箭身。soft 的微圓肩角不吞掉凹口，rounded 增加轉角過渡；16px 的內孔仍清楚。三尺寸沿用獨立的 tip／shoulder／wing／stem 參數，四向共享這些尺寸調整。封閉輪廓已完整表達方向，不加虛線、透明度或漸層。

搜尋詞已接到新圖，普通 `arrow-left/right` 不再以 `arrow-big-left/right` 作替代名稱；原投票搜尋詞保留。五種框架輸出均包含新方向。

## 驗證

- 已實際查看四份來源對照終稿：明暗 × DPR 1／2，包含三尺寸、三角型及低對比文字。逐顆紀錄與截圖雜湊見 [decisions.json](decisions.json)。
- [原生審稿](native/review.html)：72 個 raster cases，0 空白、0 裁切。獨立的 before 與來源對照保存在上方對照頁；skill 的通用頁僅呈現 current。
- [幾何檢查](geometry-checks.json)：108 組原生／最細／最粗筆寬，檢查生成與直接繪製像素一致、外界及內孔。
- 精確比較此前全部 944 個圖稿的 variants hash，均未改變，新增左右兩顆後全庫為 946 顆、733 個概念。
- 套件測試與資產驗證結果見 [validation.json](validation.json)。

AI 目視審稿狀態為 visually-reviewed-candidate；尚未記錄維護者定案。歷史審稿與截圖保留，不覆寫前輪證據。
