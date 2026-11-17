# 使用端圖示對照

以下判斷以 2026-11-18 本機 checkout 的呼叫位置為準。圖庫名稱和程式碼引用數是靜態資料，不能換算成實際顯示次數。

| 使用端需求 | 現有圖示 | 適用情境 |
| --- | --- | --- |
| file-down／file-pen／file-stack | download／pencil／layers | Haoban 有文字的匯出 CSV、建立修訂草稿與文件份數說明。純圖示的文件修訂可再評估 file-pen。 |
| circle-dollar-sign／octagon-alert／search-x | banknote／alert-triangle／search | 每月收入、垃圾信檢舉統計和附文字的查無結果狀態。 |
| monitor-smartphone | app-window | 安裝 App 按鈕可藉標籤說明動作。跨裝置相容性仍缺少同框的桌機與手機。 |
| wand／forms／plug-connected | sparkles／text-cursor／plug | 自動操作提示、輸入提示及 MCP 工具種類。需要顯示連線狀態時可再補接合的插頭。 |
| Undo02／Undo03 | rotate-left／undo | 對照環形與折返輪廓，依復原、重設或沖銷的操作逐處選用。兩個來源圖形都曾用於財務介面；payment-reversal 可留給專屬沖銷入口。 |
| Settings02／Settings05 | settings／sliders | 全域設定與媒體、區塊的局部調整。 |
| Globe／Globe02 | globe-stand／globe | 帶底座的地球儀與網格地球。 |
| Receipt／ReceiptText | receipt／invoice | 請款單與電子發票並列。 |
| ChartColumn／ChartColumnIncreasing／ChartBarBig／ChartNoAxesCombined | chart-bar／chart-bar-increasing／chart-bar-horizontal／chart-combo | 報表總覽、報價成效、專案貢獻和收款分析。 |
| hand-move／writing／message-square-quote | mouse-pointer／pencil／quote | 滑入提示、部落格導覽、引文命令。 |
| 二／三／四欄 | layout-columns | 欄數由命令文字說明。純圖示選擇器可再補三欄及四欄。 |
| player-play-filled／player-pause-filled、已投票實心狀態 | 使用端現有實心圖 | Master CSS 有 6 與 4 處實心播放／暫停匯入。這批只提供描邊 UI 圖。 |

既有等義名稱可搜尋 language、device-desktop、corner-down-left、test-pipe、color-picker、stack-2、browser、layout-sidebar、Pulse01、Office、ArrowExpand01 與 SourceCode。搜尋詞指向現有名稱，框架用既有名稱匯入。

## 實際情境的定位

| 專案 | 原始碼 |
| --- | --- |
| Haoban | `apps/web/src/features/workspace-navigation.svelte.ts`、`workspace-icon.components/WorkspaceIcon.svelte`、`calendar-client.components/CalendarClient.svelte`、`app-install.svelte.ts`；`packages/ui/src/components/feedback.svelte.ts`、`packages/editor/src/commands.svelte.ts` |
| Master UI | `packages/ui/components/{input,compare,kanban,vote}.css`、`packages/ui/frameworks/svelte/{Gradient,Player}.svelte` |
| Master | `packages/internal-site/src/docs-shell/components/InteractingIndicator.astro` |
| Master CSS | `site/content/components/LintExplorer.svelte`、`site/content/guide/layout-system/content.tw.mdx` |
