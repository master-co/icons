# Alpha 驗證紀錄

日期：2026-11-16。環境：macOS arm64、Node 26.13.0、pnpm 12.15.0、Playwright 1.65.1。

## 已通過

| 項目 | 結果與範圍 |
| --- | --- |
| pnpm check | 48 概念、432 SVG；完整組合、hash、幾何有限值、currentColor、授權聲明、48 份固定來源 checksum、9 組 licensed ZIP；5 個 API / SSR / tree shaking 測試與 TypeScript 檢查通過 |
| pnpm check:reproducible | 1,057 個 dist + icons 檔案，在 UTC 與 Asia/Taipei 兩次建置逐位元相同；ZIP 時間固定 |
| pnpm check:package | 實際 tarball 992 檔案；包含 432 SVG 與所需授權，不包含比較原圖、preview 或測試；解壓至獨立 consumer 後 root / runtime / React / 固定入口 / SVG subpath 可用 |
| Chromium 159.0.8154.6 | DPR 1、2，各 3 個流程，共 6 個測試通過 |
| WebKit 27.2 | DPR 1、2，同上，共 6 個測試通過；這是 Playwright WebKit，不等同實機 Safari 完整認證 |
| React 18.3.1 / 19.3.1 | 打包後的消費端 SSR；Chromium mount、SVG ref、尺寸及 click handler 通過。沒有完成所有 React minor、SSR 框架或 React Native 的測試 |

瀏覽器流程涵蓋中英文搜尋、切尺寸／圓角、modal、Escape、鍵盤 tab 切換、單 SVG 與 ZIP 下載、12 × 5 來源圖展示、示範新增項目、主題切換、390 / 768 / 1440 viewport 無整頁水平溢位。離線 HTML 另測圖示載入、來源比較、ZIP 下載。

Raster 檢查對每份 SVG 擴大 viewBox，避免先被原始 viewport 裁掉後誤判。每個引擎與 DPR 各檢查 432 份：可解析、非空、可見 alpha 不超出原始畫布。共 1,728 次圖稿 raster 檢查通過。這不會自動判定重心、辨識度、內部間距是否漂亮，也沒有窮舉每種瀏覽器與作業系統。

## 未通過／尚未執行

Firefox 的 6 個配置測試未能進入頁面。Playwright Firefox 1572 已安裝，但啟動即回報 `Could not find profile folder`；改用專案內 TMPDIR 後仍相同。這屬本次環境的啟動失敗，不能計為相容性通過。完整 `pnpm test:browser` 在此環境仍會因 Firefox 回傳非零；CI 保留 Firefox 配置，尚未執行遠端 CI。

可重現本次已通過的瀏覽器範圍：

```sh
pnpm exec playwright test --project=chromium-1x --project=chromium-2x --project=webkit-1x --project=webkit-2x
```

尚未完成螢幕閱讀器操作、實機觸控、Windows / Linux 視覺檢視、React Native、所有框架 SSR、不同語系方向任務與人類辨識率盲測。自動化不等於完整可及性認證。

## Bundle 測量

esbuild 0.28.2，單一 Search export，ESM bundle + minify，React external；gzip 使用 Node zlib 預設。包含使用該入口所需的共享 runtime，不包含 React 本體或消費端打包差異。

| 入口 | 未壓縮 bytes | gzip bytes |
| --- | ---: | ---: |
| Search data + renderSvg | 2,769 | 1,102 |
| React 動態九變體 SearchIcon | 3,245 | 1,240 |
| React 固定 16/soft SearchIcon | 1,743 | 903 |

這不是與其他圖庫的公平效能比較，也不是整個 npm tarball 體積。更多圖示會共用 runtime，不能用這個數值簡單乘以圖示數量。

## 目視檢查與已做修整

已檢視 Chromium DPR 1 的四張原生尺寸 contact sheets（48 × 9 組合）、預覽明暗畫面、390px 手機畫面、16px 上游對照與文字場景。瀏覽器截圖在 work/screenshots；自動化截圖與 raster metrics 在 test-results。它們是可重新產生的本地證據，不作為不可變的 golden baseline。

- more-horizontal 原本點徑過小，已獨立調整至 16 / 20 / 24 下的 1.7 / 2 / 2.2，避免過輕。
- file-text 減少 24px 內部線，增加左右留白；16px 留一行，20 / 24 留兩行。
- Hugeicons 對照箭頭選用有箭桿的 arrow-right-02；arrow-right-01 實際是 chevron，不適合此列直接比較。參考檔與固定 manifest 已同步。

接續人工審稿特別關注 bell-off 16px 斷線、settings 內孔、chart-bar 的窄柱、星星視覺面積及三種圓角的感受差異。以上是待驗證的設計點，不假裝全部已定案。

## 交付狀態

48 個 alpha 起稿、可編輯幾何、SVG / React 建置、離線及本地預覽、研究文件與測試均已建立。尚未公開 npm、提交 Git 或推送遠端。預覽可用 pnpm dev 重新啟動；獨立 dist/preview.html 不依賴伺服器。
