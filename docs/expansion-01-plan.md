# Expansion 01：通用產品流程補齊

2026-11-16。以基準13587b62的280顆為出發點；與Craft 03逐顆複審同步進行。使用者授權一次完成大批擴充，內部仍分家族逐批來源比較、原生尺寸目視後才推進，沒有逐批批准門檻。

## 範圍判斷

從實際Dashboard、App、Web與商務流程出發，選定112個命名圖稿，分12批；這是需求清單的結果，不是最低數量目標。基本概念與必要狀態／方向分開統計。重複名稱或相同語意的同義詞進搜尋別名，不另畫。原始48名稱保持相容，既有圖示只有具體問題才由獨立審查精修。

| 批次 | 家族 | 補齊用途 | 圖示 |
| --- | --- | --- | --- |
| expansion-01 | 通用工具與快捷操作 | 設定頁的電源、語言、快捷鍵、支援與定位 | power、zap、lightbulb、life-buoy、languages、wrench、command、backspace、keyboard-return、locate |
| expansion-02 | 回饋與成果 | 回饋量表、驗證、里程碑與增強動作 | smile、frown、thumbs-up、thumbs-down、award、target、badge-check、sparkles |
| expansion-03 | 知識與閱讀 | 說明中心、筆記、公告與閱讀收藏 | book、book-open、notebook、sticky-note、newspaper、bookmark-plus、bookmark-minus、file-question |
| expansion-04 | 表格結構與面板 | 試算表列欄操作、儲存格與側邊面板 | table-row-add、table-column-add、table-row-delete、table-column-delete、table-cells-merge、table-cells-split、panel-left-close、panel-left-open、panel-right-close、panel-right-open |
| expansion-05 | 畫布編輯工具 | 畫布選取、平移、剪下、取色與吸附 | scissors、hand、lasso、selection、ruler、magnet、component、frame、pipette、paint-bucket |
| expansion-06 | 構圖與位置 | 構圖幾何、對齊分佈與地址路徑 | triangle、diamond、hexagon、contrast、blend、distribute-horizontal、distribute-vertical、compass、navigation、route、signpost、map-pinned |
| expansion-07 | 播放與會議 | 會議、音訊字幕與播放佇列 | music、audio-waveform、subtitles、fast-forward、rewind、shuffle、repeat-one、volume-low、video-off、screen-share |
| expansion-08 | 郵件與回覆 | 客服信箱與已處理對話 | reply、reply-all、forward、rss、mail-plus、mail-search、message-text、message-check |
| expansion-09 | 資料呈現與清單 | 報表圖形與清單維護 | chart-bar-horizontal、chart-bar-stacked、chart-scatter、chart-gantt、list-collapse、list-search、list-plus、list-minus |
| expansion-10 | 商品識別與履約 | 商品識別、計算、結帳確認與退貨 | barcode、qr-code、scan-barcode、calculator、landmark、package-open、package-check、package-return、shopping-cart-plus、shopping-cart-check |
| expansion-11 | 開發與整合 | 版本控制、資料語法與擴充模組 | git-commit、git-pull-request、git-compare、git-fork、brackets、regex、variable、file-json、folder-code、puzzle |
| expansion-12 | 服務與備份 | 雲端狀態、服務設定與備份傳輸 | cloud-check、cloud-off、cloud-sync、database-backup、database-search、server-cog、hard-drive-upload、hard-drive-download |

## 明確不擴充的範圍

- 不做品牌、國旗、商品插畫、完整交通工具、醫療或金融專業交易符號。landmark只表示一般金融機構；不加入加密幣／交易指標。
- 不建立同一概念的數種純造型版本。例如list-filter已可用filter與搜尋別名處理，不為湊數加入。
- 不把每個母型機械排列plus／minus／check／x／lock。只保留表格、客服、履約、同步等具體操作需要的狀態。
- 不恢復先前刪除圖稿；新清單即使同名也重新研究、原生繪製。

## 來源與設計策略

九套固定目錄見[來源版本](review/expansion-01/catalog-sources.json)，逐項兩份對照見[覆蓋矩陣](review/expansion-01/coverage.json)。精確字面命中只是探索線索，不把命名差異當缺口；例如key-return／keyboard-return、captions／subtitles會人工確認語意。

| 圖庫 | 本輪觀察與使用方式 |
| --- | --- |
| [Lucide](https://lucide.dev/icons/) | 通用操作與狀態家族作主要構造對照；layers的經驗要求觀察接點、母型及露邊，不只比較相同拓撲。 |
| [Tabler](https://tabler.io/icons) | 列欄操作、面板開合、客服及履約動作細分較多；採實際需要的子集，避免跟著大量排列狀態。 |
| [Heroicons](https://heroicons.com/) | 用其聚焦的產品操作檢查必要性；電源、閱讀、新聞、QR與驗證等可作完整同語意比較。其16／20是solid，不能冒稱可直接對照outline光學版。 |
| [Phosphor](https://phosphoricons.com/) | 語言、返回鍵、選取、表格、音訊與文字訊息有合適的構造差異；保存regular原稿，維持原本畫布及線寬。 |
| [Material Symbols](https://developers.google.com/fonts/docs/material_symbols) | 以固定codepoints核對設定、表格、同步、媒體控制的語意完整性；opsz設計原則作原生尺寸參考，不把字型命名直接轉成Master圖稿。 |
| [Radix](https://www.radix-ui.com/icons) | 15格線的hand、component、mix、shuffle可觀察小尺寸資訊取捨；不把填色輪廓直接當可調描邊。 |
| [Feather](https://feathericons.com/) | smile／frown、music、git-commit作簡潔基準；對照能辨識與有足夠工藝兩個層次，不能因圖元少就判為成熟。 |
| [Iconoir](https://iconoir.com/) | wrench、reply、forward、資料備份等保留較疏朗的替代構造供比較，不直接套更細線寬。 |
| [Hugeicons Free](https://github.com/hugeicons/hugeicons) | 回彎、徽標與履約等細節作比較；僅固定免費repository，與Pro分開。 |

以上是本輪選材判斷；沒有以圖庫數量或人氣作美感分數。逐顆製作仍需查看原稿、確認match角色、評估曲線與負空間，不能由矩陣直接標成通過。

## 製作與完成證據

每批8–12顆，同家族為主。每顆保存用途、易混淆概念、兩份固定原稿、具體來源差異、效果採用理由、九組圖稿及明暗／文字旁目視證據。新圖沒有虛構before；修改舊圖使用Craft 03真實基準。

工程檢查依原始48＋ui＋organization＋productivity＋expansion明確清單的精確聯集。新增SVG／React／型別、離線來源對照、情境頁、套件消費與可重現檢查；Chromium／WebKit DPR 1／2完整渲染，Firefox仍需如實報告。工程成功不自動批准設計；全部維持alpha，不發布npm或推送遠端。

## 本期完成紀錄

12批112個新增名稱均已完成來源比較、九組原生圖稿、主代理目視及獨立複核。既有280顆中精修24顆、保留256顆；全庫392個名稱、244個基本概念。完整結果見[逐顆報告](review/ui-v1/index.html)、[精修說明](craft-03.md)與[驗證](validation.md)。不將本期完成宣稱為所有產品需求的全集。
