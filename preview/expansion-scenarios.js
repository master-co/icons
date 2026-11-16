export const expansionScenarios=[
  ['workspace-tools','偏好與回饋','lightbulb'],['knowledge','知識庫','book-open'],
  ['mailbox','郵件處理','reply'],['data-studio','資料工作台','chart-gantt'],
  ['canvas','畫布工具','frame'],['media','影音工作室','music'],
  ['fulfillment','倉儲與配送','package-open'],['developer','開發與服務','git-pull-request'],
];
export function expansionPanels({g,head,row,toolbar}){
 const action=(icon,label,task='select')=>`<button class="button" data-expansion-action="${task}">${g(icon,16)}${label}</button>`;
 const toggle=(icon,label)=>`<button class="button" data-expansion-toggle aria-pressed="false">${g(icon,16)}${label}</button>`;
 const group=(pairs,key)=>`<div class="scene-toolbar" data-expansion-group="${key}">${pairs.map(([icon,label],i)=>`<button class="button" data-expansion-choice="${icon}" aria-pressed="${i===0}">${g(icon,16)}${label}</button>`).join('')}</div>`;
 const card=(title,body)=>`<section class="scene-card"><h4>${title}</h4>${body}</section>`;
 const columns=(...parts)=>`<div class="scene-columns">${parts.join('')}</div>`;
 return {
  'workspace-tools':()=>head('工作偏好與回饋','設定快捷操作，並回報這次工作體驗。')+columns(
   card('工作環境',row('languages','顯示語言','繁體中文 / English')+row('zap','快速操作','常用指令與最近使用項目')+
    toolbar([toggle('power','啟用工作區'),action('wrench','設定工具'),action('locate','定位目前工作')])+
    row('command','指令選單','⌘ K')+row('backspace','移除所選項目','Backspace')+row('keyboard-return','送出輸入','Enter')),
   card('體驗回饋',row('lightbulb','分享改善建議','讓團隊知道哪些流程可以更好')+group([['smile','滿意'],['frown','需要改善']],'mood')+
    group([['thumbs-up','有幫助'],['thumbs-down','沒有幫助']],'helpfulness')+row('target','本週目標','完成 3 次設計檢視')+
    row('award','完成里程碑','第一份產品規格')+row('badge-check','已認證工作區','團隊資料已確認')+
    toolbar([action('life-buoy','取得協助'),toggle('sparkles','智慧建議')]))),
  knowledge:()=>head('團隊知識庫','閱讀手冊、整理筆記與待補資訊。')+columns(
   card('文件與收藏',row('book','產品手冊','共 12 篇文章')+row('book-open','設計原則','最近閱讀：今天')+
    row('notebook','研究筆記','4 則新筆記')+toolbar([action('bookmark-plus','收藏本篇','bookmark-add'),action('bookmark-minus','取消收藏','bookmark-remove')])+
    '<p id="knowledge-bookmark" role="status">尚未收藏</p>'),
   card('最新資訊',row('newspaper','產品更新','11 月工作區改版')+row('sticky-note','會議便條','記得確認命名規範')+
    row('file-question','未分類資料','等待補上文件類型')+'<article class="scene-document" contenteditable="true" role="textbox" aria-label="知識庫筆記">每個操作應有清楚的名稱，讓團隊能在相同的語意上協作。</article>')),
  mailbox:()=>head('專案郵件','處理設計檢視邀請與團隊更新。',action('mail-plus','撰寫郵件','compose'))+
   `<label class="scene-input">${g('mail-search',20)}<input id="expansion-mail-query" aria-label="搜尋郵件" placeholder="搜尋郵件標題"></label>`+
   columns(card('收件匣',`<div id="expansion-mail-list">${row('message-text','設計檢視邀請','Mia · 今天 10:30')}${row('message-check','交付內容已確認','Alex · 昨天 16:20')}${row('rss','產品更新摘要','團隊訂閱 · 每週一')}</div>`),
    card('回覆',toolbar([action('reply','回覆','reply'),action('reply-all','全部回覆','reply-all'),action('forward','轉寄','forward')])+
     '<p id="mail-recipient">選取回覆方式</p><textarea class="expansion-textarea" aria-label="郵件草稿" placeholder="撰寫回覆內容…"></textarea>')),
  'data-studio':()=>head('資料工作台','整理銷售資料，調整表格結構與分析視圖。')+
   toolbar([action('table-row-add','新增列','row-add'),action('table-column-add','新增欄','column-add'),action('table-row-delete','刪除末列','row-remove'),action('table-column-delete','刪除末欄','column-remove')])+
   toolbar([action('table-cells-merge','合併首列前兩格','cells-merge'),action('table-cells-split','拆分儲存格','cells-split'),action('panel-left-close','收起資料欄','panel-left-close'),action('panel-left-open','展開資料欄','panel-left-open'),action('panel-right-close','收起分析欄','panel-right-close'),action('panel-right-open','展開分析欄','panel-right-open')])+
   `<div class="scene-table-wrap"><table class="scene-table" id="expansion-data-table"><tbody>${[['商品','本月','上月'],['Studio Notebook','128','96'],['Desk Calendar','64','48']].map(c=>'<tr>'+c.map(t=>'<td>'+t+'</td>').join('')+'</tr>').join('')}</tbody></table></div>`+
   columns(card('分析方式',group([['chart-bar-horizontal','橫向長條'],['chart-bar-stacked','分類堆疊'],['chart-scatter','關聯散佈'],['chart-gantt','交付時程']],'chart')+'<p id="expansion-chart-mode" role="status">目前：橫向長條</p>'+row('chart-bar-horizontal','Studio Notebook','128 筆訂單')+row('chart-bar-horizontal','Desk Calendar','64 筆訂單')),
    card('追蹤項目',toolbar([toggle('list-collapse','折疊清單'),action('list-plus','加入追蹤','tracking-add'),action('list-minus','移除追蹤','tracking-remove')])+
     `<label class="scene-input">${g('list-search',16)}<input id="expansion-track-query" aria-label="搜尋追蹤項目" placeholder="搜尋追蹤項目"></label><div id="expansion-tracking">${row('list','本月銷售','追蹤中')}</div>`)),
  canvas:()=>head('設計畫布','選擇工具、形狀與排列方式。')+
   group([['hand','平移'],['lasso','自由選取'],['selection','框選'],['scissors','剪下'],['ruler','量測'],['magnet','吸附'],['pipette','取色'],['paint-bucket','填色']],'tool')+
   columns(card('主畫板',`<div class="expansion-canvas" id="expansion-canvas">${g('frame',24)}<p>首頁 / 版面草稿</p><div id="expansion-canvas-shape">${g('component',24)}</div></div>`),
    card('形狀與構圖',group([['triangle','三角形'],['diamond','菱形'],['hexagon','六角形']],'shape')+
     toolbar([toggle('contrast','提高對比'),toggle('blend','混合圖層'),action('distribute-horizontal','水平均分'),action('distribute-vertical','垂直均分')])+
     '<p id="expansion-tool-status" role="status">目前工具：平移</p>')),
  media:()=>head('影音工作室','檢視專案配樂與遠端簡報設定。')+columns(
   card('播放佇列',row('music','Morning Focus','專案配樂 · 03:42')+row('audio-waveform','語音備註','設計檢視 · 00:48')+
    toolbar([action('rewind','倒轉 10 秒','rewind'),action('fast-forward','快轉 10 秒','fast-forward'),toggle('shuffle','隨機播放'),toggle('repeat-one','單曲循環')])+
    '<p id="expansion-playhead" data-seconds="48" role="status">播放位置：48 秒</p>'),
   card('會議設定',toolbar([toggle('subtitles','顯示字幕'),toggle('video-off','關閉攝影機'),toggle('screen-share','分享畫面')])+
    row('volume-low','播放音量','低音量')+'<label>音量 <input type="range" min="0" max="100" value="25" aria-label="播放音量"></label>')),
  fulfillment:()=>head('倉儲與配送','核對商品識別、包裹狀態及配送地點。')+columns(
   card('商品與訂單',row('barcode','Studio Notebook','商品碼：NB-1042')+row('qr-code','出貨單','掃描查看訂單明細')+
    toolbar([action('scan-barcode','掃描條碼'),action('calculator','計算數量')])+row('landmark','付款機構','已確認轉帳資料')+
    toolbar([action('shopping-cart-plus','加入訂單','cart-add'),action('shopping-cart-check','確認訂單','cart-confirm')])+
    '<p id="fulfillment-cart" data-count="1" role="status">1 件商品</p>'),
   card('包裹與路線',row('package-open','包裝工作台','待封箱')+toolbar([action('package-check','確認包裹','package-check'),action('package-return','建立退貨','package-return')])+
    '<p id="fulfillment-package" role="status">包裹待確認</p>'+row('map-pinned','配送地點','台北市中山區')+row('route','配送路線','倉庫 → 集貨站 → 收件地址')+
    toolbar([action('compass','查看方位'),action('navigation','開始導航'),action('signpost','路線指引')]))),
  developer:()=>head('開發與服務','管理程式庫、資料與部署環境。')+columns(
   card('程式庫',row('folder-code','工作區原始碼','main / workspace')+row('git-commit','最近提交','改善設定頁面')+
    toolbar([action('git-pull-request','建立合併請求'),action('git-compare','比較版本'),action('git-fork','建立分叉')])+
    row('file-json','workspace.json','工作區設定')+group([['brackets','陣列'],['variable','變數'],['regex','正規表示式']],'syntax')+
    row('puzzle','擴充功能','已安裝 3 個整合')),
   card('服務狀態',row('cloud-check','雲端連線','已同步')+toolbar([toggle('cloud-off','離線模式'),action('cloud-sync','立即同步','cloud-sync')])+
    toolbar([action('database-backup','建立備份','database-backup'),action('database-search','搜尋資料'),action('server-cog','主機設定')])+
    row('hard-drive-upload','上傳備份','最近一次：今天 09:30')+row('hard-drive-download','下載快照','本機保留 7 天')+
    '<p id="expansion-service-status" role="status">服務運作正常</p>')),
 };
}

// Review-only local state: no messages, orders or deployments are sent.
export function handleExpansionClick(event,g){
 const q=s=>document.querySelector(s),status=q('#scenario-status');
 const toggle=event.target.closest('[data-expansion-toggle]');
 if(toggle){const active=toggle.getAttribute('aria-pressed')!=='true';toggle.setAttribute('aria-pressed',String(active));status.textContent=toggle.textContent.trim()+'：'+(active?'已啟用':'已停用');if(toggle.textContent.trim()==='折疊清單')q('#expansion-tracking').hidden=active;return;}
 const choice=event.target.closest('[data-expansion-choice]');
 if(choice){const group=choice.closest('[data-expansion-group]');for(const b of group.querySelectorAll('button'))b.setAttribute('aria-pressed',String(b===choice));
  const label=choice.textContent.trim(),kind=group.dataset.expansionGroup;
  if(kind==='shape')q('#expansion-canvas-shape').innerHTML=g(choice.dataset.expansionChoice,24);
  if(kind==='tool')q('#expansion-tool-status').textContent='目前工具：'+label;
  if(kind==='chart')q('#expansion-chart-mode').textContent='目前：'+label;
  status.textContent='已選取：'+label;return;
 }
 const button=event.target.closest('[data-expansion-action]');if(!button)return;const action=button.dataset.expansionAction;
 if(action==='bookmark-add'||action==='bookmark-remove')q('#knowledge-bookmark').textContent=action==='bookmark-add'?'已收藏本篇':'尚未收藏';
 if(['compose','reply','reply-all','forward'].includes(action)){q('#mail-recipient').textContent={compose:'新的郵件草稿',reply:'收件者：Mia', 'reply-all':'收件者：Mia、設計團隊',forward:'轉寄：請填寫新收件者'}[action];q('.expansion-textarea').focus();}
 if(action.startsWith('panel-')){const panels=document.querySelectorAll('[data-scenario-screen="data-studio"] .scene-columns .scene-card');panels[action.includes('left')?0:1].hidden=action.endsWith('close');}
 const table=q('#expansion-data-table');
 if(action==='row-add'){const r=table.tBodies[0].insertRow();for(let i=0;i<table.rows[0].cells.length;i++)r.insertCell().textContent=i===0?'新項目':'—';}
 if(action==='row-remove'&&table.rows.length>1)table.deleteRow(-1);
 if(action==='column-add')for(const r of table.rows)r.insertCell().textContent='—';
 if(action==='column-remove')for(const r of table.rows)if(r.cells.length>1)r.deleteCell(-1);
 if(action==='cells-merge'){const r=table.rows[0];if(r.cells.length>1&&r.cells[0].colSpan===1){r.cells[0].dataset.original=r.cells[0].textContent;r.cells[0].dataset.second=r.cells[1].textContent;r.cells[0].textContent+=' / '+r.cells[1].textContent;r.cells[0].colSpan=2;r.deleteCell(1);}}
 if(action==='cells-split'){const r=table.rows[0],c=r.cells[0];if(c.colSpan===2){c.colSpan=1;r.insertCell(1).textContent=c.dataset.second;c.textContent=c.dataset.original;}}
 if(action==='tracking-add')q('#expansion-tracking').insertAdjacentHTML('beforeend',`<div class="scene-row"><span class="scene-item">${g('list',20)}新增追蹤</span></div>`);
 if(action==='tracking-remove')q('#expansion-tracking .scene-row:last-child')?.remove();
 if(action==='rewind'||action==='fast-forward'){const p=q('#expansion-playhead');p.dataset.seconds=Math.max(0,Number(p.dataset.seconds)+(action==='rewind'?-10:10));p.textContent='播放位置：'+p.dataset.seconds+' 秒';}
 if(action==='cart-add'){const p=q('#fulfillment-cart');p.dataset.count=Number(p.dataset.count)+1;p.textContent=p.dataset.count+' 件商品';}
 if(action==='cart-confirm')q('#fulfillment-cart').textContent+=' · 訂單已確認';
 if(action==='package-check'||action==='package-return')q('#fulfillment-package').textContent=action==='package-check'?'包裹已確認':'退貨草稿已建立';
 if(action==='cloud-sync'||action==='database-backup')q('#expansion-service-status').textContent=action==='cloud-sync'?'模擬同步完成':'模擬備份已建立';
 status.textContent='已選取：'+button.textContent.trim();
}
export function handleExpansionInput(event){
 const target=event.target;if(!['expansion-mail-query','expansion-track-query'].includes(target.id))return;
 const list=document.querySelector(target.id==='expansion-mail-query'?'#expansion-mail-list':'#expansion-tracking'),query=target.value.trim().toLowerCase();
 for(const row of list.children)row.hidden=!row.textContent.toLowerCase().includes(query);
}
