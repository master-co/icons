# Navigation 01 · 2026-11-19

本輪依 master-icons 0.5.20，由 Codex（AI）製作、來源回比與目視檢查。30 顆方向圖示：新增 2 顆、精修 2 顆、保留 26 顆。維護者尚未定案；這不影響本輪已完成的圖稿、整合與工程驗證。

直接開啟 [互動審稿頁](index.html)，切換 16／20／24 與 sharp／soft／rounded。頁面不需網路，含真正可操作的逐行／逐頁／頂底控制及四組來源對照連結。完整逐顆理由、來源及實際查看的截圖在 [decisions.json](decisions.json)。

## 補齊與精修

- 新增 `chevrons-up`、`chevrons-down`，共 18 個原生 SVG。從同一 `doubleChevron()` 母型旋轉，並取用既有 `chevron()` 繪製函式；沒有另畫一套相似折角。
- `chevrons-right` 前稿偏左、`chevrons-left` 前稿偏右。保留翼長、角型與兩道折角的間距，右向母型在 24 單位構造中向右移 1，左向同步鏡射。新位置與單折角略朝前的光學位置一致。16px 實際移動為 2/3px；未改線寬。
- 八向單箭頭、四向單折角、四向邊界箭頭、四軸伸縮、雙向選擇器、交換和投票圖形重新與固定來源比對，保留幾何。具體保留理由逐顆記錄，並非由測試通過推定造型完成。
- 把原本落在 `navigation-extra` 的六顆方向圖示移入 `navigation`：`arrow-left/down`、`chevron-left/up`、`chevrons-left/right`。其餘操作圖示分類不變。
- 修正同母型的方向變體概念歸屬；新增上下雙折角搜尋詞，移除單折角上會誤導的雙折角名稱。公開 export 採 `ChevronsUpIcon`／`ChevronsDownIcon`；上下方向在 RTL 中固定。

## 收錄與替代判斷

**後續更新：** 使用者指出 `arrow big` 家族缺口後，已在 [navigation-big-01](../navigation-big-01/README.md) 補齊左右方向。以下表格保留前輪決策，寬箭頭不收錄的結論已由後續明確需求取代；互動總覽現含 32 顆、五組來源對照。

| 候選 | 實際控制項與替代結果 | 本輪決定 |
| --- | --- | --- |
| `chevrons-up/down` | 紀錄檢視器同時提供逐行（±1）、逐頁（±6）和頂底（0／54）。以單折角代替會讓同方向的逐行和逐頁圖形相同；以帶界線箭頭代替會與頂底混淆。互動頁可重現這六種操作。 | 收錄同方向雙折角，用於逐頁；不是一般 accordion 開合的必要圖示。 |
| `arrow-up-down` | 現有 `sort-unsorted` 已是左右錯列、各有箭桿的上下箭頭；`move-vertical` 是另一種同軸伸縮。 | 沿用既有圖稿與搜尋替代，不增加重複 export。 |
| `arrow-big-left/right` | 普通水平移動控制以 `arrow-left/right` 表示；沒有左右投票的獨立需求。 | 不為四向齊全增加裝飾性寬箭頭。 |
| 圓框／方框方向箭頭 | 邊界若屬於按鈕本身，由控制項提供即可。 | 保留既有單箭頭替代，不把容器樣式當新概念。 |

2026-11-18 的 rebuild 判斷只評估 accordion 的展開／收合，當時單折角替代成立。本輪的逐行、逐頁、到邊界並列情境增加了必要差異；舊判斷與舊證據保留，未把原本的 accordion 改寫成需要雙折角。

## 工藝與來源

來源使用 repository 既有固定 commit 的 Lucide、Tabler、Hugeicons Free、Iconoir 原稿。每顆兩個來源，保留原 viewBox、原描邊，按同 CSS 16／20／24 比較；48px 只供接點診斷。[比較清單](../../../references/navigation-01/comparison.json) 保留 checksum、資產路徑及來源角色，新增來源登錄在 [manifest](../../../references/navigation-01/manifest.json)，由 `references/current.json` 納入。

本次新圖使用既有 Master 母型與通用折角構造，外部素材僅用於比較，沒有複製來源 path。Lucide／Tabler 授權分別保存在 `licenses/lucide.txt`、`licenses/tabler.txt`；既有 Hugeicons 歷史聲明保留。

雙折角最需要保護的是兩條斜線之間的通道。新圖保留 7／24 的平移間距，sharp 頂點不黏合，soft 微圓不鈍化方向，rounded 仍保留兩個完整峰形。無虛線、透明度或漸層：兩筆承載同等方向資訊，以幾何留白分開即可。使用者介面的停用透明度屬控制項狀態，不是圖稿效果。

## 驗證與證據

- 三尺寸、三角型；Chromium 明暗、DPR 1／2、低對比文字與相鄰圖示。逐檔實際查看清單寫入 `decisions.json`；沒有將全部生成截圖自動標為看過。
- skill 的原生審稿腳本：72 個明暗 raster cases，0 空白、0 裁切，見 [native/report.json](native/report.json)。
- [幾何檢查](geometry-checks.json)：30 × 3 尺寸 × 3 角型 × 原生／最細／最粗線寬，共 810 組。直接繪製與生成套件的實際像素相同；檢查外界、箭桿中央、投票內孔及雙折角的兩個分離部分。這些數值不作審美評分。
- 保留本輪真實前稿與舊 ledger；精確比較既有 942 個圖稿，僅左右雙折角幾何改變，另外新增上下兩顆。歷史測試接到本輪 before，另以新測試嚴格檢查現在的全庫差異，沒有刪除舊版審查。
- build、資產與授權 ZIP、套件測試、型別及封裝結果見 [validation.json](validation.json)。

`before` 的早期比較頁有 48px 診斷列互相靠近的排版問題；`final` 已增加行高，原生 SVG 不受影響。保留早期畫面以追溯，最終頁與逐項 hash 確認是同一份保留／完稿幾何。

重新生成來源頁時需使用新的 stage 名稱，腳本不覆寫既有候選：

```sh
node scripts/review-navigation.mjs review-02 02-chevrons
node scripts/review-navigation-context.mjs
node scripts/check-navigation.mjs
node --test packages/icons/tests/navigation.test.mjs
```

本輪沒有進行真人辨識研究，也未宣稱跨瀏覽器視覺定案。
