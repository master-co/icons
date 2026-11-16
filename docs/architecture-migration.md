# Bun workspace 與正式網站整合

2026-11-16 完成。本輪只調整架構、網站與工具接線，沒有重新設計圖稿。

## 結構

- `packages/icons`：private alpha 圖示套件，保留 SVG、JS、React、catalog 與既有公開 exports。
- `site`：Master Site 0.2.14、Master CSS 2.1.5、Master UI 0.0.8、Astro 7.4.2、Svelte 5.57.2、Vite 8.3.5。英文與 `/tw` 共 16 個靜態頁面。
- `preview`：獨立審稿 workspace，保留完整來源、前後比較、情境與離線交付。

使用 Bun 1.4.4、Node.js 24 以上；本機預設與 `.nvmrc` 使用 Node.js 26，CI 驗證 24 與 26。TypeScript 使用與 master-ui 一致的 6.0.3，因 Astro 檢查器需要 TypeScript 的 JavaScript programmatic API，不能使用原有的 TypeScript 7 原生編譯器。圖示套件的 Node.js >=22 契約不變。

正式網站依賴套件生成資料；審稿輸出額外讀取儲存庫的研究快照與證據。根 `scripts/build.mjs` 保留為既有研究腳本的協調入口。歷史研究、快照與審查紀錄未改寫。文件的共用版型透過本地薄封裝顯式載入 reading 樣式，並提供頁尾主題與語言控制。

## 相容性證據

遷移基準取自工作區當時內容（HEAD `5413d054c620f65735a2389ac7e273173e8dc073`），保存在本機 `work/migration-baseline`。逐檔 SHA-256 比對結果：

| 項目 | 檔案數 | 結果 |
| --- | ---: | --- |
| 圖稿來源 | 50 | 位元組相同 |
| SVG | 3,528 | 位元組相同 |
| 套件生成輸出 | 4,348 | 位元組相同 |

套件的 name、version、private、exports、peerDependencies、peerDependenciesMeta 與 engines 均保持相同。封裝後的消費端可使用資料、runtime、動態／固定 React、SVG 子路徑及授權文件；不包含比較素材或審稿工具。

## 本機驗證

- Bun frozen lockfile 安裝通過。
- 套件建置、來源／授權／圖稿驗證、27 項 Node 測試、TypeScript 通過。
- Astro 與 Svelte 型別檢查：零錯誤、零警告。
- 16 個雙語頁面靜態建置成功。
- 六篇指南與兩組介面資源完成獨立英繁複核及 rendered 檢查；`site/i18n/reviews.json` 記錄指紋，audit 通過。建置不自動核准翻譯。
- 正式網站：Chromium、WebKit 共 14 項測試通過，涵蓋搜尋、URL／分類／分頁、尺寸／圓角、九母版詳情、手動複製退路、SVG／ZIP、無 JavaScript、載入失敗重試、窄螢幕、減少動態效果、語言／主題／文件搜尋。
- 審稿工具：Chromium、WebKit 在 1×／2× 共 36 項測試通過，包含全圖庫繪製、明暗／桌面／手機、來源與前後比較、file:// 離線情境及 ZIP 授權。
- UTC 與 Asia/Taipei 兩次建置共 13,139 份輸出位元組相同。
- `git diff --check` 通過。
- Node.js 24.22.3 與 26.13.1 各通過兩項開發伺服器回歸測試：每次建立獨立空白 Vite 快取，驗證英繁路由重複請求與探索器 hydration／搜尋。

開發模式曾在空白 Vite 快取啟動時出現 `Unexpectedly unable to find a component instance for route /[...path]`；單純升級 Node 無法解決。網站在 Astro／SSR 環境排除 Svelte 的依賴預先編譯，避免首次最佳化期間使 Astro 的開發環境註冊失效，瀏覽器端預先編譯維持啟用。回歸指令為 `bun run test:site:dev`，已加入 CI。

Firefox 在這台 Mac 啟動時回報 `Could not find profile folder`，未能進行本機驗證。CI 保留 Chromium、Firefox、WebKit 全部測試，沒有靜默略過 Firefox；遠端 CI 尚未執行。沒有部署網站或發布 npm 套件。

本機畫面與測試證據位於 `work/site-*.png`、`work/translation-review/`、`work/migration-baseline/result.json`。開發與驗證指令見根 README 及 `site/README.md`。
