# Stroke width 02：尺寸範圍與粗線寬修正

2026-11-17。採用確認後的線寬範圍，完成 31 顆圖示精修及 392 顆全庫複查。

| 光學母版 | 最小線寬 | 最大線寬 | 間距 |
| --- | --- | --- | --- |
| 16px | 0.75 | 1.5 | 0.25 |
| 20px | 1 | 2 | 0.25 |
| 24px | 1.25 | 2.5 | 0.25 |

網站與離線工具的 slider 隨母版改變上下限。切換尺寸或讀取舊 URL 時，超出範圍的線寬會校正到最近邊界；尺寸比較會標示各母版實際使用的線寬。32／48／64px 使用 24px 母版及其範圍，線條隨顯示尺寸縮放。SVG、JSX、單檔下載及 ZIP 均與畫面一致。

## 修正結果

以相同的有效範圍比較修改前後；16px／2.5 等範圍外組合不納入本輪驗收。

| 檢查 | 修正前 | 修正後 |
| --- | --- | --- |
| 自動渲染案例 | 35,280 | 35,280 |
| 越界案例（DPR 1／2） | 51，涉及 9 顆 | 0 |
| 內孔減少訊號（DPR 2） | 181，涉及 22 顆 | 0 |
| 空白圖示 | 0 | 0 |
| 預設母版 nodes 改變 | — | 0／3,528 |

內孔檢查比較各母版原定線寬與更粗線寬的封閉負空間數量。開放間隙另外透過目視及語意位置探針檢查：fingerprint、barcode、eye、user-cog、server-cog、sliders 在三尺寸、三角型的最大線寬共 54 組，均通過。

全部 392 顆均檢視各尺寸上限線寬的淺色／深色總覽；31 顆修改圖示另以原生尺寸、放大圖及既有參考庫做前後對照。有效範圍內未再發現需修正的越界、內孔消失或粗線黏合。中間各檔線寬完成自動矩陣檢查，包含 sharp／soft／rounded、DPR 1／2；全矩陣另輸出 100 張明暗檢查圖。

## 圖稿調整

| 圖示或家族 | 調整 |
| --- | --- |
| file 家族、invoice | 增加摺角負空間，調整摺角局部線重；audio、question、json 內容避開摺角；archive 拉鍊環與齒列重新留白 |
| pencil、clipboard-pen | 拉開筆尾分隔，內移越界筆尖 |
| fingerprint | 保留三層指紋，增加開放通道間距 |
| send、mouse-pointer、navigation、triangle、zap | 內收造成越界的尖角與端點 |
| laptop、puzzle、package-return | 修正底座、凸榫與回轉箭頭的邊界 |
| shopping-cart 家族、usb、accessibility | 控制小型輪心、端點及頭部的局部線重，保留內孔 |

精修只在高於母版原定線寬的自訂圖稿生效。全部 3,528 組預設母版 nodes 與修正前相同；361 顆的有效範圍圖稿也未改動。

## 證據

- [摘要](review/stroke-width-02/summary.json)、[392 顆逐顆紀錄](review/stroke-width-02/ledger.json)、[修正前旗標](review/stroke-width-02/before-flags.json)、[修正後旗標](review/stroke-width-02/flags.json)。每顆 90 個渲染案例，修改組合附前後 SHA-256。
- 前後對照：[第一組](review/stroke-width-02/changed-final/01.html)、[第二組](review/stroke-width-02/changed-final/02.html)、[第三組](review/stroke-width-02/changed-final/03.html)。同目錄保留明暗 PNG。
- 全庫上限線寬總覽：[1–96](review/stroke-width-02/all-max/1-light.png)、[97–192](review/stroke-width-02/all-max/2-light.png)、[193–288](review/stroke-width-02/all-max/3-light.png)、[289–384](review/stroke-width-02/all-max/4-light.png)、[385–392](review/stroke-width-02/all-max/5-light.png)。同目錄保留深色版本。
- 工具截圖：[桌面淺色](review/stroke-width-02/ui-desktop-light.png)、[桌面深色](review/stroke-width-02/ui-desktop-dark.png)、[手機淺色](review/stroke-width-02/ui-mobile-light.png)、[手機深色](review/stroke-width-02/ui-mobile-dark.png)。
- [修改前 nodes](review/stroke-width-02/before-changed-nodes.json) 保留實際更動的組合；[參考來源](review/stroke-width-02/references.json) 記錄既有參考庫的網址、版本及用途，僅供比較，授權見 [第三方聲明](../THIRD_PARTY_NOTICES.md)。

## 驗證與重現

```sh
bun run build
node scripts/review-strokes.mjs work/stroke-width-02/final
node scripts/check-stroke-clearance.mjs
node scripts/check-stroke-parity.mjs
bun run validate
bun run test
bun run type-check
bun run test:site --project=chromium --project=webkit
```

本輪 build、套件 36 項測試、型別檢查、UI contract、完整性驗證通過。網站 Chromium／WebKit 共 34 項測試通過，包含上下限、尺寸切換、URL 校正、尺寸比較、程式碼及下載。離線工具的線寬與重設另以兩個瀏覽器檢查；桌面與手機明暗模式皆無水平溢出。

自訂版在原生線寬的 3,528 組像素比對最大相對 alpha 差異為 2.595%，通過既有 4% 門檻。全庫檢查腳本遇到越界、空白或內孔減少會以非零狀態退出，完整矩陣及 metrics 可用上述命令重新產生於 `work/stroke-width-02/final/`。
