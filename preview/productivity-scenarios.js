export const productivityScenarios=[
  ['devices','裝置與互動','laptop'],['integrations','系統與整合','workflow'],
  ['schedule','排程與工作','calendar-clock'],['team','團隊協作','handshake'],
];
export function productivityPanels({g,head,row,toolbar,button,iconButton}) {
  const toggle=(icon,label,on=false)=>`<button class="button" data-productivity-toggle="${label}" aria-pressed="${on}">${g(icon,16)}${label}</button>`;
  const action=(icon,label,action)=>`<button class="button" data-productivity-action="${action}">${g(icon,16)}${label}</button>`;
  return {
    devices:()=>head('裝置與互動','管理工作環境、輸入裝置與輔助功能。')+
      `<div class="scene-columns"><section class="scene-card"><h4>${g('laptop',20)}我的裝置</h4>`+
      row('laptop','Studio Laptop','目前使用的裝置',g('check-circle',16))+
      row('tablet','工作平板','上次連線：今天')+row('keyboard','鍵盤','中文輸入 / 快捷鍵')+
      row('mouse','滑鼠','主要按鍵：左鍵')+row('touchpad','觸控板','輕點與捲動')+
      `</section><section class="scene-card"><h4>${g('bluetooth',20)}連線與操作</h4>`+
      row('bluetooth','藍牙','允許附近裝置配對',toggle('bluetooth','藍牙連線',true))+
      row('usb','USB裝置','沒有待處理的連線')+row('cast','螢幕投放','會議室顯示器',toggle('cast','投放螢幕'))+
      row('mouse-pointer','游標','標準大小')+row('accessibility','無障礙','輔助閱讀與鍵盤操作',toggle('accessibility','輔助導覽'))+`</section></div>`,
    integrations:()=>head('系統與整合','檢視主機資源、事件回呼與部署流程。',action('webhook','測試回呼','webhook'))+
      `<div class="scene-columns"><section class="scene-card"><h4>${g('server',20)}正式環境</h4>`+
      row('server','應用程式主機','運作正常',g('check-circle',16))+row('cpu','處理器','4 核心 / 使用率 28%')+
      row('memory-stick','記憶體','8 GB / 使用 3.2 GB')+row('hard-drive','儲存空間','64 GB / 剩餘 42 GB')+
      row('network','服務網路','3 個連線節點')+`</section><section class="scene-card"><h4>${g('workflow',20)}部署流程</h4>`+
      row('git-branch','功能分支','feature / workspace')+row('git-merge','合併至正式版本','最後合併：今天 10:32')+
      row('workflow','自動化流程','檢查 → 建置 → 部署')+row('braces','事件資料','JSON格式')+
      row('webhook','事件回呼','接收訂單與部署事件')+
      `<p id="webhook-result" class="scene-note" role="status">尚未測試</p></section></div>`,
    schedule:()=>head('本週排程','安排檢視時段與團隊工作。',action('calendar-plus','新增排程','schedule-add'))+
      toolbar([action('calendar-minus','移除最後一筆','schedule-remove'),action('calendar-x','取消今天排程','schedule-cancel'),toggle('timer','專注計時')])+
      `<div class="scene-columns"><section class="scene-card"><h4>${g('calendar-range',20)}11 月 16–20 日</h4><div id="schedule-events">`+
      row('calendar-clock','設計檢視','今天 14:00–15:00')+row('calendar-clock','產品同步','明天 10:00–10:30')+
      `</div></section><section class="scene-card"><h4>${g('clipboard-list',20)}本週工作</h4>`+
      toolbar([action('clipboard-copy','複製清單','task-copy'),action('clipboard-x','清除完成項目','task-clear'),toggle('clipboard-pen','編輯清單')])+
      `<div id="schedule-tasks"><div class="scene-row" data-task-done="true"><span class="scene-item">${g('check-circle',20)}整理設計回饋</span></div><div class="scene-row"><span class="scene-item">${g('clipboard-list',20)}準備下週規格</span></div></div></section></div>`,
    team:()=>head('團隊協作','回覆問題、確認邀請與管理成員。',action('message-plus','新增對話','team-message'))+
      `<div class="scene-columns"><section class="scene-card"><h4>${g('megaphone',20)}工作區公告</h4>`+
      row('megaphone','本週設計檢視','週三 14:00 / 全體成員')+
      `<div id="team-questions">`+row('message-circle-question','待回覆問題','介面命名需要確認')+row('message-circle-warning','需要處理','檔案權限尚未開啟')+`</div>`+
      row('bell-ring','團隊通知','新的對話與公告',toggle('bell-ring','接收團隊通知',true))+
      `</section><section class="scene-card"><h4>${g('handshake',20)}合作與成員</h4>`+
      row('handshake','共同協作','Master Studio / Product Team')+row('mail-check','Mia 的邀請','已接受')+row('mail-x','Alex 的邀請','已失效')+
      `<div id="team-guest">`+row('user','訪客 Kai','檢視者',action('user-x','移除訪客','team-remove'))+`</div>`+
      toggle('user-cog','管理成員權限')+`<p id="team-permissions" hidden>目前角色：管理員、編輯者、檢視者。</p></section></div>`,
  };
}

// Local interactions for the review workspace; no external services are called.
export function handleProductivityClick(event,g) {
  const toggle=event.target.closest('[data-productivity-toggle]'),action=event.target.closest('[data-productivity-action]');
  const status=document.querySelector('#scenario-status');
  if(toggle){
    const active=toggle.getAttribute('aria-pressed')!=='true',name=toggle.dataset.productivityToggle;
    toggle.setAttribute('aria-pressed',String(active));status.textContent=`${name}：${active?'已啟用':'已停用'}`;
    if(name==='管理成員權限')document.querySelector('#team-permissions').hidden=!active;
    if(name==='編輯清單'){const list=document.querySelector('#schedule-tasks');list.contentEditable=String(active);if(active)list.focus();}
  }
  if(!action)return;
  const name=action.dataset.productivityAction;
  if(name==='webhook'){const result=document.querySelector('#webhook-result'),count=Number(result.dataset.count||0)+1;result.dataset.count=count;result.textContent=`模擬回呼已完成：${count} 次`;}
  if(name==='schedule-add')document.querySelector('#schedule-events').insertAdjacentHTML('beforeend',`<div class="scene-row"><span class="scene-item">${g('calendar-clock',20)}新排程</span><small>待設定時間</small></div>`);
  if(name==='schedule-remove')document.querySelector('#schedule-events .scene-row:last-child')?.remove();
  if(name==='schedule-cancel'){const row=document.querySelector('#schedule-events .scene-row');if(row){row.innerHTML='<span class="scene-item">'+g('calendar-x',20)+'今天排程已取消</span>';row.dataset.cancelled='true';}}
  if(name==='task-clear')document.querySelectorAll('[data-task-done=true]').forEach(row=>row.remove());
  if(name==='task-copy'){
    const text=document.querySelector('#schedule-tasks').innerText;
    if(!navigator.clipboard?.writeText){status.textContent='瀏覽器不支援複製；可選取清單文字。';return;}
    navigator.clipboard.writeText(text).then(()=>{status.textContent='清單已複製';},()=>{status.textContent='瀏覽器未允許複製；可選取清單文字。';});return;
  }
  if(name==='team-remove')document.querySelector('#team-guest').replaceChildren();
  if(name==='team-message')document.querySelector('#team-questions').insertAdjacentHTML('beforeend',`<div class="scene-row"><span class="scene-item">${g('message-plus',20)}新的對話草稿</span></div>`);
  status.textContent='已執行：'+action.textContent.trim();
}
