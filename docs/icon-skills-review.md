# Icon skills 查核與 Master Icons skill

查核日期：2026-11-16。檢查範圍為本機已安裝的 skills、OpenAI curated 清單、公開搜尋及可實際讀取的上游 SKILL.md。這不是全球所有 skill 的窮舉，也沒有把 skill 的自我描述當作品質認證。

## 結論

確實有專門做 icon 的 skill，但這次沒有找到可以直接取代 Master Icons 製作規範的現成版本。現有較完整的候選各有不同目標：一般 SVG 入門、JetBrains 特定規範、圖示與圖片交付。Master 所需的中立造型、微圓輪廓、原生 16 / 20 / 24、三種幾何角型、家族工藝和可執行審稿，適合形成獨立 skill。

因此新增 `master-icons`，以本專案需求自行撰寫，沒有拷貝社群 skill 的整段規則或加入其執行依賴。外部 skill 本輪只查核，沒有安裝。

## 已安裝與官方目錄

| 項目 | 實際範圍 | 是否直接適用 |
| --- | --- | --- |
| master-design | 介面細節、幾何、文字、圖示接入與視覺驗證 | 適合介面中的 icon 關係；不是完整圖稿製作規範 |
| master-css-home-icons | Master CSS 首頁的玻璃 WebP 圖示、材質與透視 | 特定首頁插畫語言；不適用此平面操作圖示庫 |
| imagegen | 點陣圖生成與編修 | 本案需要可編輯向量幾何，不能替代 SVG 作者流程 |
| OpenAI curated skills | 本次以官方 list-skills 腳本取得當時的可安裝清單；含 Figma、Playwright 等工具工作流 | 本次清單沒有獨立 icon 工藝 skill；不能推論所有實驗或未公開項目都沒有 |

官方目錄：[openai/skills curated](https://github.com/openai/skills/tree/main/skills/.curated)。本機 skill 的實際檔案位於個人 skills 目錄；新 skill 的版本化來源為本 repo 的 `skills/master-icons/`。

## 社群候選實際閱讀結果

| 候選 | 確認具有的內容 | 對 Master 的適用性與限制 |
| --- | --- | --- |
| [ArnavPuri / icon-design](https://github.com/ArnavPuri/designskills/blob/main/skills/icon-design/SKILL.md) | SVG 模板、keyline、光學位移、數個尺寸、文字搭配、無障礙與截圖檢視 | 最接近一般 SVG 作者指南。但部分建議如把 non-scaling-stroke 當小尺寸替代、固定 optical 位移、偏好現成圖庫，不能直接套入 Master 的三母版與新圖庫目標 |
| [Kilo / icon-jetbrains](https://github.com/Kilo-Org/kilocode/blob/main/.kilo/skills/icon-jetbrains/SKILL.md) | 明確角色尺寸、端帽溢出、半像素、縮放後重檢、light/dark 配對與特定 palette | 工藝細節很具體；但禁止 currentColor、固定色盤與 JetBrains loader 的要求是平台規則，與本案 Web SVG 不同 |
| [jpoindexter / iconography-and-imagery](https://github.com/jpoindexter/design-and-ai-skills/blob/main/design-system-skills/iconography-and-imagery/SKILL.md) | 網格、光學尺寸、可變字型軸、SVG 交付、文字與圖片性能 | 可作設計系統知識索引；範圍有大量圖片工作，部分固定數值與「通用慣例」需要按場景驗證，不是 Master 的逐圖工藝規範 |
| [OpenLabor / Icon Design](https://github.com/OpenLabor/openlabor/blob/main/skills_archive/icon-design/SKILL.md) | 一致網格、描邊、小尺寸、品牌、SVG/PNG 等幾條原則 | 原始檔很短，缺幾何診斷、原生光學母版與驗證流程；不足以單獨使用 |
| ScarletFish / icon-design | 搜尋索引能找到介紹 | 讀取其索引所指 GitHub SKILL.md 時回傳 404；內容與可安裝性未確認，不作推薦依據 |

「中立」「工藝」「細節」多是 skill 的內容維度，不是穩定的分類標籤。此次查核中，沒有看到一個已驗證且專門為「中立微圓、多光學尺寸圖庫」建立的完整現成 skill。這個結論只限上述查核範圍。

## 新 skill 的具體能力

入口只保留適用範圍、路由、製作順序與核心判斷。細節分為五份 reference：造型工藝、光學幾何、製作流程、審稿證據、來源處理。

它要求先辨識概念與可見缺陷，檢查負空間、端帽、切線、齒根、尖端、內孔與母型關係；使用 16 / 20 / 24 原生圖稿與三種真實角型；允許無角圖形共用幾何；不以任意固定偏移或全域加細描邊代替判斷。

附帶 `scripts/render-review.mjs`，讀取已建置的 Master 資料，生成離線審稿頁、明暗與 DPR 1 / 2 圖稿、放大診斷、文字情境及 raster metrics。支援真實舊 build 作 A/B；沒有 baseline 時明確標示，不能捏造 before。數值只用來找空圖／裁切與診斷，不評分美感。

## 來源政策調整

獨立幾何製作不因為研究過某圖庫就自動列該圖庫為作者。圖示詳細介面移除逐顆來源文字；比較頁的外部 SVG 繼續獨立標示。既有初版 12 個保守 study-redraw notices 保留為歷史，不因顯示調整而宣稱從未參考。是否引用／衍生依實際作品與過程判斷，不能只看是不是用程式生成。

實作同時把 legacy notices 從 pilot 審稿分類中分離，避免未來新增代表圖示時自動被加上競品版權。相關授權條件見 [MIT 原文](https://opensource.org/license/mit)。

## 本輪驗證與安裝

版本化來源：skills/master-icons。個人可發現安裝：~/.codex/skills/master-icons。兩份內容已逐檔比較一致；下個回合可用 `$master-icons`。

- skill-creator 的 quick_validate：來源與安裝版本均通過；所有相對 reference 連結存在。
- 實際審查 search、file-text、calendar、settings、folder、bell-off：產生 12 張截圖，108 個 raster case，沒有空圖或裁切；已打開原生明暗與放大圖檢視。
- 原生圖稿的顯示尺寸與 device pixel 起點另有檢查，避免審稿版面自己產生額外分數位移。
- A/B 測試使用明確標為 synthetic 的故意裁切 baseline：36 個 case 中，正確只報出 A 的 search/16/soft 在 DPR 1、2 的兩個缺陷並回傳非零；沒有把它當真實修改前圖稿交付。
- 安裝版本的腳本會拒絕不存在的 icon 名稱。
- 專案 pnpm check、可重現建置與實際 package 消費測試通過；Chromium / WebKit DPR 1 的六個既有流程通過；詳細介面實際確認不再顯示逐顆來源。

這驗證了 skill 的結構、審查工具與本輪接入；不是對未來所有繪製結果的美感保證。本輪未修改圖示幾何，也沒有發布或提交 Git。
