import uiScope from './ui-scope.json' with {type:'json'};
import organizationScope from './organization-scope.json' with {type:'json'};
import productivityScope from './productivity-scope.json' with {type:'json'};
import expansionScope from './expansion-scope.json' with {type:'json'};
import atlasScope from './atlas-scope.json' with {type:'json'};
import productScope from './product-scope.json' with {type:'json'};
import studioScope from './studio-scope.json' with {type:'json'};
import writerScope from './writer-scope.json' with {type:'json'};
const scope=[...uiScope,...organizationScope,...productivityScope,...expansionScope,...atlasScope,...productScope,...studioScope,...writerScope];
import {aliases} from './aliases.mjs';
import {conceptOf} from './concepts.mjs';
import {brandCatalog} from './brands.mjs';
const groups = [
  ['navigation','方向與移動',[
    ['arrow-right','向右','next forward 下一個'],['arrow-up','向上','up 上移'],
    ['chevron-right','右箭頭','next expand 展開'],['chevron-down','下箭頭','dropdown select 下拉'],
    ['arrow-up-right','右上','external link 外部連結'],['undo','復原','back history 返回'],
    ['download','下載','save export 儲存 匯出'],['upload','上傳','import 匯入']]],
  ['actions','基本操作',[
    ['plus','新增','add create 建立'],['minus','減少','remove 減去'],['check','確認','done tick 完成'],
    ['x','關閉','close cancel 取消'],['search','搜尋','find magnify 查找'],['filter','篩選','funnel 過濾'],
    ['more-horizontal','更多','ellipsis menu 選項'],['sliders','調整','adjust controls 設定']]],
  ['content','檔案與內容',[
    ['file','檔案','document 文件'],['file-text','文字檔案','document text 文件 文字'],
    ['folder','資料夾','directory 目錄'],['folder-plus','新增資料夾','directory create 建立'],
    ['calendar','日曆','date schedule 日期 排程'],['clipboard','剪貼簿','paste 貼上'],
    ['copy','複製','duplicate 拷貝'],['trash','刪除','delete bin 垃圾桶']]],
  ['communication','人物與通訊',[
    ['user','使用者','person account 帳號 人物'],['users','群組','people team 團隊'],
    ['mail','郵件','email envelope 信件'],['message','訊息','chat comment 聊天 留言'],
    ['bell','通知','notification alert 提醒'],['bell-off','關閉通知','notification mute 靜音'],
    ['lock','鎖定','secure private 安全 私人'],['unlock','解鎖','unsecure open 開啟']]],
  ['status','形狀與狀態',[
    ['circle','圓形','shape 圖形'],['square','方形','shape box 圖形'],['star','星星','rating favorite 評分 收藏'],
    ['heart','喜歡','favorite like 愛心'],['info-circle','資訊','information help 說明'],
    ['check-circle','成功','success done 完成'],['alert-triangle','警告','warning error 注意'],
    ['loader','載入','loading spinner progress 進度']]],
  ['interface','產品介面',[
    ['home','首頁','house dashboard 主頁'],['settings','設定','gear cog preferences 偏好'],
    ['grid','網格','layout tiles 版面'],['list','清單','rows menu 列表'],
    ['chart-bar','長條圖','chart analytics 統計'],['database','資料庫','storage 儲存'],
    ['code','程式碼','brackets developer 開發'],['terminal','終端機','console command 命令']]],
];
export const pilot = ['arrow-right','check','search','home','folder','file-text','calendar','settings','bell','user','heart','star'];
const core = groups.flatMap(([category,categoryLabel,icons])=>icons.map(([name,label,keywords])=>({
  name,label,category,categoryLabel,keywords:keywords.split(' '),pilot:pilot.includes(name),
  component:name.split('-').map(x=>x[0].toUpperCase()+x.slice(1)).join('')+'Icon',
  direction: ['arrow-right','chevron-right','undo'].includes(name)?'mirror':'fixed',
  license:'MIT',status:'alpha',
})));
const mirrored=new Set(['arrow-left','arrow-right','chevron-left','chevron-right','chevrons-left','chevrons-right','undo','redo']);
const extra=scope.map(entry=>({...entry,keywords:[...entry.name.split('-'),...(entry.keywords||[])],pilot:false,component:entry.name.split('-').map(x=>x[0].toUpperCase()+x.slice(1)).join('')+'Icon',license:'MIT',status:'alpha'}));
export const catalog=[...core,...extra,...brandCatalog].map(entry=>({...entry,direction:mirrored.has(entry.name)?'mirror':'fixed',keywords:[...new Set([...entry.keywords,...(aliases[entry.name]||[])])],concept:entry.aliasOf||conceptOf[entry.name]||entry.name}));
export const conceptCount=new Set(catalog.map(x=>x.concept)).size;
export const categories=[...new Map(catalog.map(x=>[x.category,{id:x.category,label:x.categoryLabel}])).values()];
