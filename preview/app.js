import {handleExpansionClick,handleExpansionInput} from './expansion-scenarios.js';
import {handleProductivityClick} from './productivity-scenarios.js';
import {scenarioMarkup,scenarios} from './scenarios.js';
import { renderSvg, escapeXml } from '/dist/runtime.js';
import { zipSync, strToU8, strFromU8, decompressSync } from 'fflate';

const $=selector=>document.querySelector(selector);
const embedded=globalThis.MASTER_ICONS_PAYLOAD;
const data=embedded ? JSON.parse(strFromU8(decompressSync(Uint8Array.from(atob(embedded),c=>c.charCodeAt(0))))) : globalThis.MASTER_ICONS_DATA ?? await fetch('/dist/preview/data.json').then(r=>{if(!r.ok)throw new Error('圖示資料載入失敗');return r.json();});
globalThis.MASTER_ICONS_DATA=data;
const {catalog,definitions,references,license}=data;
const iconByName=new Map(catalog.icons.map(x=>[x.name,x]));
const params=new URLSearchParams(location.search);
const valid=(value,values,fallback)=>values.includes(value)?value:fallback;
const state={scenario:valid(params.get('scenario'),scenarios.map(x=>x[0]),'dashboard'),corner:valid(params.get('corner'),catalog.corners,'soft'),size:valid(Number(params.get('size')),catalog.sizes,24),view:valid(params.get('view'),['library','optical','context','reference'],'library'),category:valid(params.get('category'),['all','pilot',...catalog.categories.map(c=>c.id)],'all'),query:params.get('q')||'',selected:null,page:Math.max(1,Number(params.get('page'))||1)};
const cornerLabels={sharp:'直角',soft:'微圓',rounded:'圓潤'};
const glyph=(name,size=state.size,corner=state.corner,display=size)=>renderSvg(definitions[name],{size:display,opticalSize:size,corner});
let revision=0,toastTimer,objectUrl;
const referenceCache=new Map(Object.entries(data.inlineReferences || {}));
const meta=name=>iconByName.get(name);

function announce(message){const t=$('#toast');t.textContent=message;t.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('visible'),2200);}
// Coalesce rapid page changes so WebKit's History API rate limit cannot
// interrupt rendering while someone pages through the full reference set.
let lastUrlWrite=-Infinity,urlTimer;
function updateUrl(){
  if(location.protocol==='file:')return;
  const q=new URLSearchParams({corner:state.corner,size:String(state.size),view:state.view});
  if(state.category!=='all')q.set('category',state.category);
  if(state.query)q.set('q',state.query);
  if(state.page>1)q.set('page',state.page);
  if(state.view==='context')q.set('scenario',state.scenario);
  const search='?'+q;
  clearTimeout(urlTimer);
  if(location.search===search)return;
  const write=()=>{history.replaceState(null,'',search);lastUrlWrite=performance.now();};
  const wait=350-(performance.now()-lastUrlWrite);
  if(wait>0)urlTimer=setTimeout(write,wait);
  else write();
}
function filtered(pilotOnly=false){const q=state.query.toLocaleLowerCase().trim();return catalog.icons.filter(x=>(!pilotOnly||x.pilot)&&(state.category==='all'||state.category==='pilot'&&x.pilot||x.category===state.category)&&(!q||`${x.name} ${x.label} ${x.keywords.join(' ')}`.toLocaleLowerCase().includes(q)));}
function renderCategories(){const all=[{id:'all',label:'全部圖示',count:catalog.icons.length},{id:'pilot',label:'代表圖示',count:catalog.icons.filter(x=>x.pilot).length},...catalog.categories.map(c=>({...c,count:catalog.icons.filter(x=>x.category===c.id).length}))];$('#categories').innerHTML=all.map(c=>`<button type="button" data-category="${c.id}" aria-pressed="${state.category===c.id}"><span>${c.label}</span><span>${c.count}</span></button>`).join('');}
function pageItems(list,limit){const pages=Math.max(1,Math.ceil(list.length/limit));state.page=Math.min(state.page,pages);$('#pagination').hidden=!['library','optical','reference'].includes(state.view)||pages===1;$('#page-info').textContent=`第 ${state.page} / ${pages} 頁 · 共 ${list.length.toLocaleString()} 項`;$('#page-previous').disabled=state.page===1;$('#page-next').disabled=state.page===pages;updateUrl();return list.slice((state.page-1)*limit,state.page*limit);}
function renderLibrary(){const list=filtered();pageItems(list,96);$('#result-count').textContent=`${list.length} 個圖示 · ${state.size}px · ${cornerLabels[state.corner]}`;$('#icon-grid').innerHTML=list.length?pageItems(list,96).map(x=>`<button type="button" class="icon-card" data-icon="${x.name}" aria-label="${x.label}，${x.name}"><span>${glyph(x.name)}</span><span class="icon-name">${x.name}</span></button>`).join(''):'<div class="empty">沒有符合的圖示。試試「通知」、「搜尋」或英文名稱。</div>';}
function renderOptical(){const list=filtered();pageItems(list,24);$('#optical-count').textContent=`${list.length.toLocaleString()} 個命名圖示 · 每頁 24 項`;$('#optical-grid').innerHTML=list.length?pageItems(list,24).map(x=>`<article class="optical-card"><h3>${x.name}</h3>${catalog.corners.map(c=>`<div class="optical-row"><span>${cornerLabels[c]}</span>${catalog.sizes.map(s=>`<div class="glyph">${glyph(x.name,s,c)}</div>`).join('')}</div>`).join('')}<div class="optical-row optical-labels"><span>PX</span><span class="glyph">16</span><span class="glyph">20</span><span class="glyph">24</span></div></article>`).join(''):'<div class="empty">沒有符合的圖示。</div>';}
function renderContext(){$('#context-examples').innerHTML=scenarioMarkup(glyph,state.scenario);}
function sanitizeReference(text){
  if(/^data:image\/png;base64,[A-Za-z0-9+/]+={0,2}$/.test(text)){
    const image=document.createElement('img');image.src=text;image.width=image.height=state.size;
    image.alt='';image.setAttribute('aria-hidden','true');image.style.objectFit='contain';
    return image.outerHTML;
  }
  const doc=new DOMParser().parseFromString(text,'image/svg+xml');
  const svg=doc.documentElement;
  if(svg.localName!=='svg'||doc.querySelector('parsererror'))throw new Error('Invalid reference SVG');
  if(!svg.hasAttribute('fill'))svg.setAttribute('fill','currentColor');
  const tags=new Set(['svg','g','path','rect','circle','ellipse','line','polyline','polygon']);
  const attributes=new Set(['xmlns','viewBox','d','x','y','width','height','rx','ry','r','cx','cy','x1','x2','y1','y2','points','fill','stroke','stroke-width','stroke-linecap','stroke-linejoin','stroke-miterlimit','fill-rule','clip-rule','opacity','transform']);
  for(const node of [svg,...svg.querySelectorAll('*')]){
    if(!tags.has(node.localName)){node.remove();continue;}
    for(const attr of [...node.attributes])if(!attributes.has(attr.name))node.removeAttribute(attr.name);
    for(const attr of ['stroke','fill']){const value=node.getAttribute(attr);if(value&&value!=='none')node.setAttribute(attr,'currentColor');}
  }
  svg.setAttribute('width',String(state.size));svg.setAttribute('height',String(state.size));svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');
  return new XMLSerializer().serializeToString(svg);
}
async function renderReference(ticket){
  const list=pageItems(filtered(),12);
  $('#reference-table').innerHTML='<div class="empty">載入固定版本的參考圖稿…</div>';
  try{
    const refs=list.flatMap(icon=>references.references.filter(r=>r.name===icon.name));
    await Promise.all(refs.map(async ref=>{if(!referenceCache.has(ref.localPath)){const r=await fetch('/dist/'+ref.localPath);if(!r.ok)throw new Error('來源圖稿讀取失敗');referenceCache.set(ref.localPath,ref.mediaType==='image/png'?'data:image/png;base64,'+btoa(Array.from(new Uint8Array(await r.arrayBuffer()),b=>String.fromCharCode(b)).join('')):await r.text());}}));
    if(ticket!==revision)return;
    const cell=ref=>`<td><a href="${ref.url}" target="_blank" rel="noopener">${sanitizeReference(referenceCache.get(ref.localPath))}<small>${ref.library}<br>${ref.sourceName}<br>${ref.match==='exact'?'同語意':'構造參考'}</small></a></td>`;
    $('#reference-table').innerHTML=list.length?`<table class="reference-table"><thead><tr><th>圖示 / ${state.size}px</th><th>來源 A</th><th>來源 B</th><th>本期修改前</th><th>Master</th></tr></thead><tbody>${list.map(icon=>`<tr><th scope="row">${icon.name}</th>${references.references.filter(r=>r.name===icon.name).map(cell).join('')}${icon.category==='brands'?'<td><small>保留品牌識別輪廓</small></td>':''}<td>${data.before?.[icon.name]?renderSvg(data.before[icon.name],{size:state.size,corner:state.corner}):'<small>本期新增<br>無舊稿</small>'}</td><td>${glyph(icon.name)}</td></tr>`).join('')}</tbody></table>`:'<div class="empty">沒有符合的圖示。</div>';
  }catch(error){if(ticket===revision)$('#reference-table').innerHTML=`<div class="empty">${escapeXml(error.message)}。重新整理可再次載入。</div>`;}
}
function render(){
  const ticket=++revision;updateUrl();renderCategories();$('#concept-count').textContent=catalog.icons.length.toLocaleString();$('#pagination').hidden=!['library','optical','reference'].includes(state.view);
  document.querySelectorAll('[data-view]').forEach(tab=>{const active=tab.dataset.view===state.view;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;$('#panel-'+tab.dataset.view).hidden=!active;});
  document.querySelector(`input[name="corner"][value="${state.corner}"]`).checked=true;
  document.querySelector(`input[name="size"][value="${state.size}"]`).checked=true;
  const zipName=`master-icons-${state.size}-${state.corner}.zip`;
  $('#download-set').href=data.inlineDownloads?.[zipName] || `/dist/downloads/${zipName}`;
  $('#download-set').download=zipName;
  $('#download-set').setAttribute('aria-label',`下載 ${state.size}px ${cornerLabels[state.corner]}，${catalog.icons.length} 個 SVG`);
  $('.search').hidden=state.view==='context';$('.categories').hidden=state.view==='context';
  $('.library-layout').style.gridTemplateColumns=state.view==='context'?'1fr':'';
  if(state.view==='library')renderLibrary();
  if(state.view==='optical')renderOptical();
  if(state.view==='context')renderContext();
  if(state.view==='reference')renderReference(ticket);
  if(state.selected)renderDetail();
}
function iconNotice(entry){const source=entry.source;return license.trim().replace('Copyright (c) 2026 Master and contributors',`Copyright (c) 2026 Master and contributors${source.copyright&&!source.notice?'\n'+source.copyright:''}`)+(source.notice?'\n\n'+source.notice.trim():'');}
function svgWithLicense(name){return `<!--\n${iconNotice(meta(name))}\n-->\n${glyph(name)}\n`;}
function renderDetail(){const entry=meta(state.selected);$('#dialog-title').textContent=entry.label;$('#dialog-name').textContent=entry.name;$('#dialog-category').textContent=entry.categoryLabel;$('#detail-large').innerHTML=glyph(entry.name,state.size,state.corner,state.size*4);$('#detail-sizes').innerHTML=catalog.sizes.map(s=>`<div><span class="glyph">${glyph(entry.name,s)}</span><small>${s}px 原生</small></div>`).join('');$('#detail-corners').innerHTML=catalog.corners.map(c=>`<div><span class="glyph">${glyph(entry.name,state.size,c)}</span><small>${cornerLabels[c]}</small></div>`).join('');$('#detail-code').textContent=glyph(entry.name).replace(/></g,'>\n<');if(objectUrl)URL.revokeObjectURL(objectUrl);objectUrl=URL.createObjectURL(new Blob([svgWithLicense(entry.name)],{type:'image/svg+xml'}));$('#download-icon').href=objectUrl;$('#download-icon').download=`${entry.name}-${state.size}-${state.corner}.svg`;}

async function copy(text){try{await navigator.clipboard.writeText(text);announce('已複製');}catch{$('#detail-code').textContent=text;const range=document.createRange();range.selectNodeContents($('#detail-code'));const sel=getSelection();sel.removeAllRanges();sel.addRange(range);announce('無法直接存取剪貼簿，已選取內容，可手動複製。');}}

$('#search').value=state.query;
$('#search').addEventListener('input',event=>{state.query=event.target.value;state.page=1;render();});
document.addEventListener('change',event=>{if(event.target.name==='corner'){state.corner=event.target.value;render();}if(event.target.name==='size'){state.size=Number(event.target.value);render();}});
document.addEventListener('click',event=>{
  const scenario=event.target.closest('[data-scenario]');if(scenario){state.scenario=scenario.dataset.scenario;render();}
  const tab=event.target.closest('[data-view]');if(tab){state.view=tab.dataset.view;state.page=1;render();}
  const category=event.target.closest('[data-category]');if(category){state.category=category.dataset.category;state.page=1;render();}
  const icon=event.target.closest('[data-icon]');if(icon){state.selected=icon.dataset.icon;renderDetail();$('#icon-dialog').showModal();}
  const nav=event.target.closest('[data-demo-nav]');if(nav){document.querySelectorAll('[data-demo-nav]').forEach(n=>n.removeAttribute('aria-current'));nav.setAttribute('aria-current','page');announce(`已選取${nav.textContent.trim()}`);}
  const demo=event.target.closest('[data-demo]');if(demo){if(demo.dataset.demo==='新增草稿'){$('#demo-files').insertAdjacentHTML('afterbegin',`<tr><td><span class="file-label">${glyph('file',16)}未命名草稿</span></td><td><span class="demo-status">草稿</span></td></tr>`);}else if(demo.dataset.demo==='已套用篩選'){demo.setAttribute('aria-pressed',String(demo.getAttribute('aria-pressed')!=='true'));const active=demo.getAttribute('aria-pressed')==='true';document.querySelectorAll('#demo-files tr').forEach(row=>row.hidden=active&&!row.textContent.includes('已同步'));}else copy('Design principles');announce(demo.dataset.demo);}
});
$('.tabs').addEventListener('keydown',event=>{const tabs=[...document.querySelectorAll('[data-view]')],index=tabs.indexOf(document.activeElement);if(index<0)return;let next;if(event.key==='ArrowRight')next=(index+1)%tabs.length;else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=tabs.length-1;else return;event.preventDefault();state.view=tabs[next].dataset.view;state.page=1;render();tabs[next].focus();});
document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();if(state.view==='context'){state.view='library';render();}$('#search').focus();}});
$('#dialog-close').addEventListener('click',()=>$('#icon-dialog').close());
$('#icon-dialog').addEventListener('close',()=>{state.selected=null;if(objectUrl){URL.revokeObjectURL(objectUrl);objectUrl=null;}});
$('#icon-dialog').addEventListener('click',event=>{if(event.target===$('#icon-dialog')){const r=event.target.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)event.target.close();}});
$('#copy-svg').addEventListener('click',()=>copy(svgWithLicense(state.selected)));
$('#copy-react').addEventListener('click',()=>{const entry=meta(state.selected);copy(`import { ${entry.component} } from '@master/icons-react/${state.size}/${state.corner}';\n\n<${entry.component} />`);});
let theme='light';try{theme=localStorage.getItem('master-icons-theme')||'light';}catch{}
function setTheme(value){theme=value;document.documentElement.dataset.theme=theme;$('#theme-toggle').setAttribute('aria-label',theme==='light'?'切換至深色模式':'切換至淺色模式');try{localStorage.setItem('master-icons-theme',theme);}catch{}}
setTheme(theme);$('#theme-toggle').addEventListener('click',()=>setTheme(theme==='light'?'dark':'light'));
$('#hero-icons').innerHTML=['home','folder','calendar','settings','search','heart','bell','star'].map(name=>glyph(name,24,'soft')).join('');
document.querySelectorAll('[data-symbol]').forEach(el=>el.innerHTML=glyph(el.dataset.symbol,16,'soft'));
render();

$('#page-previous').addEventListener('click',()=>{state.page--;render();$('#workspace').scrollIntoView({block:'start'});});
$('#page-next').addEventListener('click',()=>{state.page++;render();$('#workspace').scrollIntoView({block:'start'});});
$('#download-set').addEventListener('click',async event=>{
  if(!embedded)return;
  event.preventDefault();if(event.currentTarget.getAttribute('aria-busy')==='true')return;
  const button=event.currentTarget,size=state.size,corner=state.corner;
  button.setAttribute('aria-busy','true');announce('正在打包完整圖庫…');
  await new Promise(resolve=>setTimeout(resolve,40));
  try{
    const files={LICENSE:strToU8(license),'THIRD_PARTY_NOTICES.md':strToU8(data.thirdPartyNotices)};
    for(const [name,text]of Object.entries(data.upstreamLicenses))files['licenses/'+name]=strToU8(text);
    for(const entry of catalog.icons)files[entry.name+'.svg']=strToU8('<!--\n'+iconNotice(entry)+'\n-->\n'+renderSvg(definitions[entry.name],{size,opticalSize:size,corner})+'\n');
    const url=URL.createObjectURL(new Blob([zipSync(files,{level:6,mtime:new Date(2026,10,16)})],{type:'application/zip'}));
    const a=document.createElement('a');a.href=url;a.download=`master-icons-${size}-${corner}.zip`;a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);announce(`已打包 ${catalog.icons.length.toLocaleString()} 個 SVG`);
  }catch(error){announce('下載失敗：'+error.message);}finally{button.removeAttribute('aria-busy');}
});

document.addEventListener('click',event=>{
 const control=event.target.closest('[data-context-action]');
 if(control){
  const action=control.dataset.contextAction,status=$('#scenario-status');
  const report=text=>{status.textContent=text;};
  if(action==='password'){const input=$('#scene-password'),visible=input.type==='password';input.type=visible?'text':'password';control.innerHTML=glyph(visible?'eye-off':'eye',20);control.setAttribute('aria-label',visible?'隱藏密碼':'顯示密碼');}
  else if(action==='switch'){const on=control.getAttribute('aria-checked')!=='true';control.setAttribute('aria-checked',String(on));control.innerHTML=glyph(on?'toggle-on':'toggle-off',24);}
  else if(action==='filter'){const active=control.getAttribute('aria-pressed')!=='true';control.setAttribute('aria-pressed',String(active));document.querySelectorAll('#scene-orders tr').forEach(row=>row.hidden=active&&row.dataset.paid!=='true');report(active?'顯示 2 筆已付款訂單':'顯示全部 3 筆訂單');}
  else if(action==='sort'){const body=$('#scene-orders'),desc=control.dataset.desc!=='true';control.dataset.desc=String(desc);[...body.rows].sort((a,b)=>(Number(a.dataset.amount)-Number(b.dataset.amount))*(desc?-1:1)).forEach(r=>body.append(r));control.innerHTML=glyph(desc?'sort-descending':'sort-ascending',16)+'依金額排序';report(desc?'金額由高至低':'金額由低至高');}
  else if(action==='quantity-minus'||action==='quantity-plus'){const el=$('#scene-quantity'),n=Math.max(1,Number(el.value)+(action==='quantity-plus'?1:-1));el.value=String(n);$('#scene-total').textContent='$'+(n*640).toLocaleString();report(`商品數量：${n}`);}
  else if(action==='new-folder'){$('#demo-files').insertAdjacentHTML('afterbegin',`<tr><td><span class="scene-item">${glyph('folder',20)}未命名資料夾</span></td><td>空資料夾</td></tr>`);report('已建立資料夾');}
  else if(action==='organization'){state.scenario='organization';render();}
  else if(action==='org-pin'||action==='org-unpin'){
   const main=$('[data-context-action="org-pin"][aria-pressed]'),active=action==='org-unpin'?false:main.getAttribute('aria-pressed')!=='true';
   main.setAttribute('aria-pressed',String(active));main.innerHTML=glyph(active?'pin':'pin-off',16)+(active?'已釘選':'釘選工作區');status.textContent=active?'工作區已釘選。':'已取消釘選工作區。';
  }
  else if(action==='file-view'){const active=control.getAttribute('aria-pressed')!=='true';control.setAttribute('aria-pressed',String(active));$('#demo-files').classList.toggle('scene-file-grid',active);}
  else if(action==='csv'){const rows=[['訂單','金額'],...[...$('#scene-orders').rows].filter(r=>!r.hidden).map(r=>[r.cells[1].textContent,r.dataset.amount])];const url=URL.createObjectURL(new Blob(['\uFEFF'+rows.map(r=>r.join(',')).join('\n')],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='orders-demo.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);report('已匯出目前顯示的訂單');}
  else if(action==='refresh')report('總覽已更新');
  else if(action==='checkout')report('示範訂單已確認，未產生實際付款。');
  else report('已選取：'+(control.getAttribute('aria-label')||control.textContent.trim()));
 }
 const format=event.target.closest('[data-context-format]');if(format){const active=format.getAttribute('aria-pressed')!=='true';format.setAttribute('aria-pressed',String(active));const el=$('.scene-document'),name=format.dataset.contextFormat;const styles={bold:['fontWeight','700'],italic:['fontStyle','italic'],underline:['textDecoration','underline'],strikethrough:['textDecoration','line-through'],'align-center':['textAlign','center'],'align-left':['textAlign','left']};if(styles[name])el.style[styles[name][0]]=active?styles[name][1]:'';$('#scenario-status').textContent=`已${active?'啟用':'停用'}${format.getAttribute('aria-label')}`;}
});
document.addEventListener('change',event=>{if(event.target.matches('[data-select-all]'))document.querySelectorAll('#scene-orders input[type=checkbox]').forEach(x=>x.checked=event.target.checked);});
document.addEventListener('submit',event=>{
 if(event.target.id==='scene-settings'){event.preventDefault();$('#scenario-status').textContent='工作空間設定已儲存於此示範畫面。';}
 if(event.target.id==='scene-chat'){event.preventDefault();const input=event.target.querySelector('input');$('#scene-conversation').insertAdjacentHTML('beforeend',`<div class="scene-message outgoing"><small>Aron · 剛剛</small><p>${escapeXml(input.value)}</p><span class="scene-item">${glyph('check',16)}已傳送</span></div>`);input.value='';$('#scenario-status').textContent='示範回覆已加入對話。';}
});

function filterOrganization(){
 const query=$('#org-query');if(!query)return;
 const scope=$('[data-org-scope][aria-pressed="true"]').dataset.orgScope,q=query.value.trim().toLowerCase();let count=0;
 for(const row of document.querySelectorAll('[data-org-kind]')){row.hidden=!((scope==='all'||row.dataset.orgKind===scope)&&row.dataset.orgName.toLowerCase().includes(q));if(!row.hidden)count++;}
 $('#org-search-status').textContent=count+' 個項目';
}
document.addEventListener('input',event=>{if(event.target.id==='org-query')filterOrganization();});
document.addEventListener('click',event=>{
 const scope=event.target.closest('[data-org-scope]');if(scope){for(const b of document.querySelectorAll('[data-org-scope]'))b.setAttribute('aria-pressed',String(b===scope));filterOrganization();}
 const layout=event.target.closest('[data-org-layout]');if(layout){for(const b of document.querySelectorAll('[data-org-layout]'))b.setAttribute('aria-pressed',String(b===layout));$('.org-board').dataset.layout=layout.dataset.orgLayout;}
});

document.addEventListener('click',event=>handleProductivityClick(event,glyph));

document.addEventListener('click',event=>handleExpansionClick(event,glyph));
document.addEventListener('input',handleExpansionInput);
