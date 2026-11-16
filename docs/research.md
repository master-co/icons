> 初期研究紀錄。當期數字及 12 顆試作範圍保留供追溯；目前交付為280名稱／182基本概念，全部來源對照見 references/current.json 與 docs/review/ui-v1/index.html。

# Master Icons 圖庫研究與產品定位

研究日期：2026-11-16。此處區分官方規格、專案判斷與尚待驗證的主張。圖示數量會變動，且各站對概念、風格、尺寸與總 SVG 數的算法不同，因此不以宣傳數量排序。第一版有 48 個概念、432 個變體，不能拿 432 與別人的概念數直接比較。

## 市場比較

| 圖庫 | 官方規格與特色 | 優勢與適用情境（評估） | 對本案的限制／取捨（評估） | 授權與來源 |
| --- | --- | --- | --- | --- |
| Lucide | 24 格線、2 描邊、圓端點；有明確圓角、間距、共享幾何規範 | 通用 UI、覆蓋完整、貢獻規則成熟；工程接入方便 | 改 size 通常是縮放 24 圖稿；不是內建三種獨立光學母版與三種角型 | ISC，繼承 Feather 部分含 MIT；[設計規格](https://lucide.dev/contribute/icons/specification)、[授權](https://lucide.dev/license) |
| Tabler | 24 格線、outline 通常 2 描邊，另有 filled | 功能與垂直領域覆蓋廣；適合 dashboard、工具產品 | 多種特殊題材不能直接保證同一 UI 裡的密度一致；filled 不等於多字重 | MIT；[官方 repository](https://github.com/tabler/tabler-icons) |
| Heroicons | 24 outline（1.5）、24 solid、20 solid、16 solid；React / Vue | 核心介面範圍克制，多個小尺寸 solid 很實用 | 不能把 16 / 20 solid 說成有同尺寸 outline；圖種較聚焦 | MIT；[官方 repository](https://github.com/tailwindlabs/heroicons) |
| Phosphor | thin / light / regular / bold / fill / duotone 六種表現，有多平台套件 | 字重、狀態、個性選擇豐富；同一家族容易延伸 | 多字重增加審稿與體積；本案先追求單一 outline 的穩定。不可直接把來源畫布單位當 UI px 描邊 | MIT；[官方專案說明](https://github.com/phosphor-icons/homepage) |
| Material Symbols | outlined / rounded / sharp；FILL、wght、GRAD、opsz 四軸；opsz 20–48 | 尺寸、狀態、字重系統完整；字型分發成熟 | 既有 Material 語氣較強；20 起的光學軸不直接解決本案原生 16。多軸字型增加管線複雜度 | Apache-2.0；[官方指南](https://developers.google.com/fonts/docs/material_symbols) |
| Radix Icons | 15 × 15，React 套件；多為填色輪廓 | 密集桌面控制、文字旁的小圖示，克制而清晰 | 單一小格線不等於能任意放大；非整套可調 stroke 的線性模型 | MIT；[官方網站](https://www.radix-ui.com/icons)、[原始碼](https://github.com/radix-ui/icons) |
| Feather | 24 格線、2 描邊，簡單線性語言 | 小而易懂的基礎集合；一致性容易理解 | 概念範圍較少；新專案需自行補齊需求。發布頻率不能單獨證明品質或宣稱已停止維護 | MIT；[官方 repository](https://github.com/feathericons/feather) |
| Hugeicons | Free 為 Stroke Rounded；Pro 有更多風格與大量資產；圖稿／renderer 分離 | 柔和線條、比例講究，最接近本案預設氣質；可作起稿參考 | Free 與 Pro 的權利不可混用；不能把付費多風格搬成開源資產。相近氣質也增加辨識自身特色的難度 | Free MIT；Pro 另約；[授權 FAQ](https://hugeicons.com/docs/faqs/license-questions)、[Free SVG](https://github.com/hugeicons/hugeicons) |
| Iconoir | 24 格線、1.5 描邊，regular 與 solid | 輕盈、留白感好；適合精緻產品介面 | 較細線條在低對比、小尺寸需實際看；不是直接更改 stroke 就能保留所有空隙 | MIT；[官方 FAQ](https://iconoir.com/docs/faq)、[repository](https://github.com/iconoir-icons/iconoir) |
| Fluent System Icons | regular / filled 等風格；按圖示提供多個尺寸，含 16 / 20 / 24 等；有方向 metadata | 真正按尺寸管理資產；狀態、方向與套件工程成熟 | 每個圖示的可用尺寸、風格不同，不能假設完整笛卡兒積；品牌語言與工程規模較大 | MIT；[官方設計](https://fluent2.microsoft.design/iconography)、[repository](https://github.com/microsoft/fluentui-system-icons) |
| Carbon | 16 / 20 / 24 / 32，與文字配對的明確指引 | 企業介面與密集資料情境有具體規範 | 品牌語氣偏理性；需研究其尺度方法，不能假設單一線寬適合所有尺寸 | Apache-2.0；[官方指南](https://www.carbondesignsystem.com/building-blocks/foundations/icons/guidelines)、[repository](https://github.com/carbon-design-system/carbon) |
| Bootstrap Icons | 16 格線，SVG、sprite、字型與套件等輸出 | 直接實用，16px 基礎強；不必依賴 Bootstrap CSS | 輪廓／填色結構多樣，統一可變圓角不是現成能力 | MIT；[官方 repository](https://github.com/twbs/icons) |
| Remix Icon | line / fill 配對、廣泛介面與品牌題材 | 大量常見概念、狀態配對容易找 | 現行授權限制建立競爭圖庫，不能作本案素材來源；不能沿用舊的 Apache 印象 | Remix Icon License v1.0，2026-01；[現行條款](https://github.com/Remix-Design/RemixIcon/blob/master/License) |
| SF Symbols | 九種字重、三種尺度，與 San Francisco 字體整合 | 字體配對、光學一致性、狀態設計值得學習 | 平台與使用限制；不可視為一般 MIT 素材來源，也不適合直接移植成跨平台圖庫 | Apple 限制授權；[官方介紹](https://developer.apple.com/sf-symbols/)、[Xcode 條款](https://www.apple.com/legal/sla/docs/xcode.pdf) |
| Iconify | 多圖庫聚合與統一 API / metadata，不是單一繪製風格 | 搜尋、交付格式與框架整合可參考；未來分發管道 | 聚合不會自動統一比例、密度或授權；不能把平台軟體授權當作所有圖示授權 | 各集合各自授權；[官方文件](https://iconify.design/docs/) |

## 真正值得整合的能力

Lucide 值得學的是可執行的貢獻規範；Tabler 是分類與覆蓋；Heroicons 是產品 UI 的克制與小尺寸資產；Phosphor 是家族狀態一致性；Material 是光學與字重分離的思路；Radix 是小畫布資訊密度；Hugeicons / Iconoir 是曲線與留白；Fluent / Carbon 是原生尺寸和介面語境；Iconify 是分發方式。這些原則可以結合，直接混用各家的輪廓卻會帶來不同視覺重量。

「最全面」與「最漂亮」不是同一個目標。本案先把 48 個高頻概念做成可比較的樣本。用數千個自動轉換圖稿推出新庫，會把上游不一致、命名重複和授權差異一起帶進來。

## Master 的可成立定位

**給重視介面細節的產品團隊，一套預設微圓、在 16 / 20 / 24 下保持克制密度、可整套切換角型的 MIT 圖示。** 核心不是更多裝飾或更多參數，而是讓常見組合不用逐個手調。

| 能力 | 已實作 | 尚待證明 |
| --- | --- | --- |
| 三種圓角 | 實際框角、弧線與尖端預設，非僅改 linejoin | 使用者是否偏好 soft；三種風格在所有概念中的一致程度 |
| 三份光學圖稿 | 16 / 20 / 24 viewBox、線寬、座標；部分複雜圖示減少細節 | 真正辨識率、不同螢幕上的偏好與疲勞程度 |
| 簡潔工程 | 靜態 SVG、固定 React 入口、動態入口、tree shaking | 真實大型應用的效能與完整框架相容性 |
| 可追溯 | 固定上游 commit、原圖 checksum、授權、修改類型 | 後續擴增仍能保持同等來源紀律 |
| 一致性 | 共享母型、完整九組合、審查頁 | 設計師正式審定與長期維護品質 |

不能宣稱全球唯一：Material 已有三種樣式，Hugeicons Pro 有多風格，Fluent / Carbon 已有尺寸家族。合理的競爭優勢是把適合此品牌的取捨做得更集中、可見、易用，且建立品質維護方法。此階段這仍是產品假設。

## 授權與來源選擇

現行 Remix 條款第 3.2 條禁止以其圖示建立競爭圖庫，並列舉改描邊、圓角等表面修改；本案不採其素材。Hugeicons Free 的 MIT 與付費產品須分開處理；此起稿只保存 Free repository 中固定版本的 12 張研究圖稿，並保留版權與授權。[Remix 條款](https://github.com/Remix-Design/RemixIcon/blob/master/License)、[Hugeicons FAQ](https://hugeicons.com/docs/faqs/license-questions)

Master 12 個代表圖示採保守的 study-redraw 分類，保留 Hugeicons 聲明；其餘 36 個本地繪製。對照頁使用 Hugeicons Free、Tabler、Iconoir、Lucide 的原始圖稿，對照資產與 Master 輸出分開保存。細節見 THIRD_PARTY_NOTICES 與 references/manifest.json。這是本專案的來源政策，不是對所有第三方圖庫的通用法律結論。

## 比較方法與限制

預覽保留上游原始描邊與輪廓，只統一顏色與顯示尺寸，避免改變被比較的設計。12 個相同概念在同頁並列，每張來源連結指向固定 commit。Master 使用對應原生母版，上游 24 圖稿比例縮放；這個實驗回答的是這些具體圖稿在此尺寸的呈現，不代表上游沒有其他適用的小尺寸產品。

正式評估應另外加入 Heroicons 的小尺寸 solid、Radix 15、Fluent 原生小尺寸，並分清 outline / solid 的差異。本次尚未做這組完整盲測。不要拿 Master 原生 16 勝過某個縮小 24 的個案，推論它已勝過所有圖庫。

下一輪用搜尋、返回、資料夾、文件、通知、設定、警告等任務，記錄辨識正確率、完成時間、風格偏好；測試原生大小、DPR 1 / 2、兩種背景及文字搭配。先找退步案例，再決定是否擴至約 300 個概念。
