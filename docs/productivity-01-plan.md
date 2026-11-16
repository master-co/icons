# Productivity 01：常見產品工作流程補齊

本輪新增 60 個命名圖稿，以六個各 10 顆的審查批次完成。保留此前 220 顆的全部幾何；不恢復已刪除配方。方向與狀態併入既有概念統計，別名不增加圖稿。

所有圖稿先比較兩份固定版本原稿，再用自家可讀的原生幾何繪製。三尺寸 × 三圓角、明暗、55% 前景色、文字並排逐組檢查；目視檢查與建置成功分開記錄。

## 製作順序與重點

### productivity-01 · 裝置與互動

輸入裝置與顯示裝置有清楚差異；16px 減少按鍵，USB端點不得黏合。

| 名稱 | 用途 |
| --- | --- |
| keyboard | 鍵盤 |
| mouse | 滑鼠 |
| mouse-pointer | 游標 |
| touchpad | 觸控板 |
| tablet | 平板 |
| laptop | 筆記型電腦 |
| bluetooth | 藍牙 |
| usb | USB連線 |
| cast | 投放螢幕 |
| accessibility | 無障礙 |

### productivity-02 · 系統與工作流程

處理器保留引腳但減數；記憶體接點與內孔分開，分支線準確接到節點邊界。

| 名稱 | 用途 |
| --- | --- |
| server | 伺服器 |
| hard-drive | 硬碟 |
| cpu | 處理器 |
| memory-stick | 記憶體 |
| network | 網路拓樸 |
| workflow | 工作流程 |
| git-branch | 版本分支 |
| git-merge | 合併分支 |
| braces | 結構化資料 |
| webhook | Webhook |

### productivity-03 · 進階文字編輯

標記、擦除、筆刷不可只換角度；縮排方向固定，細小數字需辨識。

| 名稱 | 用途 |
| --- | --- |
| text | 文字 |
| wrap-text | 自動換行 |
| highlighter | 螢光標記 |
| eraser | 橡皮擦 |
| paintbrush | 筆刷 |
| palette | 調色盤 |
| indent-increase | 增加縮排 |
| indent-decrease | 減少縮排 |
| subscript | 下標 |
| superscript | 上標 |

### productivity-04 · 檔案類型與傳輸

與既有file／folder共用框架，類型標記需保留折角和穩定空隙。

| 名稱 | 用途 |
| --- | --- |
| file-code | 程式檔案 |
| file-image | 圖片檔案 |
| file-video | 影片檔案 |
| file-audio | 音訊檔案 |
| file-archive | 壓縮檔案 |
| folder-minus | 移除資料夾 |
| folder-check | 已確認資料夾 |
| folder-x | 拒絕資料夾 |
| folder-up | 上傳資料夾 |
| folder-down | 下載資料夾 |

### productivity-05 · 排程與剪貼簿

日曆保留綁定及表頭，時鐘／筆不得壓住母型；剪貼簿夾頭與紙框共用原生位置。

| 名稱 | 用途 |
| --- | --- |
| calendar-plus | 新增排程 |
| calendar-minus | 移除排程 |
| calendar-x | 取消排程 |
| calendar-clock | 排程時間 |
| calendar-range | 日期範圍 |
| timer | 計時器 |
| clipboard-list | 工作清單 |
| clipboard-copy | 複製到剪貼簿 |
| clipboard-x | 取消剪貼簿項目 |
| clipboard-pen | 編輯剪貼簿 |

### productivity-06 · 協作與帳戶狀態

訊息尾巴、郵件斜線和通知輪廓維持家族關係；帳戶徽記清楚遮擋，不以白底覆蓋。

| 名稱 | 用途 |
| --- | --- |
| message-plus | 新增對話 |
| message-circle-question | 對話提問 |
| message-circle-warning | 對話警示 |
| mail-check | 已確認郵件 |
| mail-x | 拒收郵件 |
| bell-ring | 響鈴通知 |
| user-x | 移除使用者 |
| user-cog | 帳戶設定 |
| megaphone | 公告 |
| handshake | 協作 |

## 來源、效果與完成條件

來源由 references/current.json 註冊，原稿、commit、checksum及授權各自保留。references/productivity-01/master-before.json 是新增前真實220顆快照，新概念不得虛構前稿。

逐顆記錄輪廓／細節／曲線選擇以及虛線、透明度採用或不採用理由；主要輪廓不得靠淡化掩飾缺陷。保留現有ticket虛線與chart-area透明度規則。

完成包含逐項審稿、九組輸出、來源比較、情境畫面、API／型別／套件消費／tree shaking／可重現建置，以及Chromium與WebKit的DPR1／2全組合。Firefox若仍啟動失敗，記為未驗證。維持alpha，使用者最終設計定案另記，不發布或推送。
