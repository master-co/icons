# 製作流程與 repository 接入

## 找到真實原始碼

讀使用者指定 checkout 的 package.json 與 AGENTS.md。Master Icons 目前的可編輯入口：

| 路徑 | 職責 |
| --- | --- |
| packages/icons/src/drawings.mjs / packages/icons/src/families/ | 家族模組入口、概念母型、原生座標、細節簡化 |
| packages/icons/src/geometry.mjs | 原生尺寸、線寬與輪廓工具 |
| packages/icons/src/catalog.mjs | 名稱、搜尋詞、分類與方向政策 |
| packages/icons/src/provenance.mjs（若存在） | 明確的既有第三方聲明，與審稿分組分開 |
| packages/icons/src/runtime.mjs、packages/icons/src/react.mjs | SVG / React 輸出語意 |
| scripts/build.mjs | 生成 SVG、固定／動態入口、ZIP、預覽 |
| preview/ | 互動審查介面 |
| references/ | 外部比較圖稿，不是待自動轉換的來源資料夾 |

packages/icons/icons/ 與 packages/icons/dist/ 是套件生成結果，根 dist/ 是審稿輸出。改原始幾何並重新建置，不直接修 SVG 後忘記回寫。若專案結構改了，依實際結構調整，不建立第二套競爭管線。

## 作者工作

用既有 path / line / rect / circle / contour 組合，v(small, medium, large) 表示各原生尺寸選值。密集結構需要時用尺寸分支。盡量讓家族共用輪廓函式；不要只是複製 SVG 字串。保持幾何是可審閱資料，不把大批原始 path 埋進不可讀的程式。

kebab-case 名稱是穩定 API；中英同義詞放搜尋詞，不自動產生重複 exports。功能性左右箭頭與語言方向的鏡射分開定義；不要對所有圖形加全域 scaleX(-1)。原生 icon 沒有點擊目標尺寸，消費端另處理。

SVG 使用 currentColor、保留 viewBox，沒有腳本、外部引用、嵌入圖像或依賴白色背景的遮蓋。必要遮擋先用路徑幾何；若要引入 mask / clipPath，確認當前 serializer 支援與多個實例 ID 不碰撞，不強行套入不支援的 schema。

新增圖示時檢查 catalog、九組合、命名、搜尋、export、來源處理及預覽數量。原始 48 名稱固定於 core-names.json；通用介面清單在 ui-scope.json；後續授權批次使用獨立清單（例如 organization-scope.json）。驗證所有明確清單的精確聯集，不使用無上限最低數量門檻。別名不新增圖稿，方向與狀態另計命名數。

## 生成與檢查的比例

- 幾何或分類修改：build、validate、原生圖稿及家族目視檢查；執行專案要求的相關測試。
- runtime / React / aria / RTL：加測真正的消費方式、SSR / mount / ref、props 與狀態；只測此次可能影響的公開行為。
- 生成器、exports、授權封裝：再查可重現性、實際 tarball、靜態入口 tree shaking 與 notices。
- 只改研究文字：檢查內容與連結；不為低影響文件變更重跑全部 browser tests。

常用命令以 package.json 為準：bun run build、bun run validate、bun run check、bun run test:browser、bun run check:reproducible、bun run check:package。沒有執行的項目不可寫通過；當機或環境不支援不可當成功。

## Skill 與成果維護

此 skill 的版本化來源是 skills/master-icons。個人安裝通常在 ~/.codex/skills/master-icons；修改來源後同步完整 skill 並驗證一致，不只改其中一份。不要把 work/ 的測試草稿、暫時生成的圖示或 node_modules 打包進 skill。

本期每顆先定義語意、辨識線索與混淆概念，再比較至少兩份固定來源；僅有家族或結構參考時標明。以自家幾何發展候選後完成三尺寸、三圓角、明暗及文字審查。研究可以引用原則；不要把「看過同類圖示」自動變成 `source=某圖庫`。具體來源規則見 authorship.md。

後續批次把來源存入獨立目錄，由 references/current.json 列出使用中的 manifest 與本輪真實前稿；不要覆寫舊來源、幾何證據或自動重設已審查狀態。只新增本批紀錄，舊圖修改時才更新其審查。
