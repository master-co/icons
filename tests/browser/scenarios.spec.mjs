import {test,expect} from '@playwright/test';
import {mkdir} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {scenarios} from '../../preview/scenarios.js';
import {catalog} from '../../src/catalog.mjs';
import {beforeDefinitions} from '../../scripts/lib/review-data.mjs';
const ids=scenarios.map(x=>x[0]),before=await beforeDefinitions();
test('all contexts render in light/dark and desktop/mobile; controls and navigation work',async({page},info)=>{
 test.setTimeout(120000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/?view=context');
 await mkdir(`work/quality/scenarios/${info.project.name}`,{recursive:true});
 for(const theme of ['light','dark'])for(const width of[1280,390])for(const id of ids){
  await page.setViewportSize({width,height:960});
  await page.evaluate(theme=>document.documentElement.dataset.theme=theme,theme);
  await page.locator(`.scenario-picker [data-scenario="${id}"]`).click();
  await expect(page.locator('.scenario-screen')).toHaveAttribute('data-scenario-screen',id);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  if(width===390)await expect(page.locator('.scene-mobile-nav')).toBeVisible();
  if(info.project.name==='chromium-1x')await page.locator('.scenario-screen').screenshot({path:`work/quality/scenarios/${info.project.name}/${id}-${width}-${theme}.png`});
 }
 await page.locator('.scenario-picker [data-scenario="settings"]').click();
 await page.getByRole('button',{name:'顯示密碼',exact:true}).click();await expect(page.locator('#scene-password')).toHaveAttribute('type','text');
 await page.getByRole('switch').click();await expect(page.getByRole('switch')).toHaveAttribute('aria-checked','false');
 await page.getByRole('button',{name:'儲存變更'}).click();await expect(page.locator('#scenario-status')).toContainText('已儲存');
 await page.locator('.scenario-picker [data-scenario="table"]').click();await page.locator('[data-context-action=filter]').click();await expect(page.locator('#scene-orders tr:visible')).toHaveCount(2);
 await page.locator('[data-context-action=sort]').click();await expect(page.locator('#scene-orders tr').first()).toHaveAttribute('data-amount','2160');
 await page.locator('.scenario-picker [data-scenario="messages"]').click();await page.getByRole('textbox',{name:'回覆內容'}).fill('謝謝 <script>');await page.getByRole('button',{name:'傳送訊息'}).click();await expect(page.locator('.scene-message')).toHaveCount(3);await expect(page.locator('.scene-message').last()).toContainText('謝謝 <script>');
 await page.locator('.scenario-picker [data-scenario="orders"]').click();await page.getByRole('button',{name:'增加數量'}).click();await expect(page.locator('#scene-total')).toHaveText('$1,920');
 expect(errors).toEqual([]);
});
test('reference pagination covers new drawings, before masters and offline source originals',async({page})=>{
 for(const url of ['/?view=reference',pathToFileURL(resolve('dist/preview.html')).href+'?view=reference']){
  await page.goto(url);
  let compared=0;
  const pages=Math.ceil(catalog.length/12);
  for(let index=0;index<pages;index++){
   const entries=catalog.slice(index*12,(index+1)*12),rows=entries.length;
   await expect(page.locator('.reference-table tbody tr')).toHaveCount(rows);
   // Only actual saved masters are shown in the before column.
   await expect(page.locator('.reference-table tbody svg')).toHaveCount(entries.reduce((count,e)=>count+(before[e.name]?4:3),0));
   await expect(page.locator('#page-info')).toContainText(`第 ${index+1} / ${pages}`);
   compared+=rows;
   if(index<pages-1)await page.locator('#page-next').click();
  }
  expect(compared).toBe(catalog.length);
 }
 await page.getByRole('searchbox').fill('file-archive');await expect(page.locator('.reference-table tbody tr')).toHaveCount(1);await expect(page.locator('.reference-table tbody svg')).toHaveCount(4);await expect(page.locator('.reference-table')).not.toContainText('無舊稿');
});

test('organization scope search, layout and pin controls work offline',async({page})=>{
 await page.goto(pathToFileURL(resolve('dist/preview.html')).href+'?view=context&scenario=organization');
 await expect(page.locator('[data-org-kind]:visible')).toHaveCount(4);
 await page.locator('[data-org-scope="file"]').click();await expect(page.locator('[data-org-kind]:visible')).toHaveCount(2);
 await page.getByRole('textbox',{name:'搜尋專案內容'}).fill('規格');await expect(page.locator('[data-org-kind]:visible')).toHaveCount(1);
 await page.getByRole('textbox',{name:'搜尋專案內容'}).fill('不存在');await expect(page.locator('#org-search-status')).toHaveText('0 個項目');
 await page.locator('[data-org-layout="list"]').click();await expect(page.locator('.org-board')).toHaveAttribute('data-layout','list');
 await page.getByRole('button',{name:'取消釘選工作區',exact:true}).click();await expect(page.locator('[data-context-action="org-pin"]')).toHaveAttribute('aria-pressed','false');
 await page.getByRole('button',{name:'取消釘選工作區',exact:true}).click();await expect(page.locator('[data-context-action="org-pin"]')).toHaveAttribute('aria-pressed','false');
 await page.locator('[data-context-action="org-pin"]').click();await expect(page.locator('[data-context-action="org-pin"]')).toHaveAttribute('aria-pressed','true');
});


test('new productivity controls work in the delivered offline workspace',async({page})=>{
 await page.goto(pathToFileURL(resolve('dist/preview.html')).href+'?view=context&scenario=devices');
 const bluetooth=page.getByRole('button',{name:'藍牙連線',exact:true});
 await bluetooth.click();await expect(bluetooth).toHaveAttribute('aria-pressed','false');
 await page.locator('.scenario-picker [data-scenario=integrations]').click();
 await page.getByRole('button',{name:'測試回呼',exact:true}).click();await expect(page.locator('#webhook-result')).toContainText('1 次');
 await page.locator('.scenario-picker [data-scenario=schedule]').click();
 await page.getByRole('button',{name:'新增排程',exact:true}).click();await expect(page.locator('#schedule-events .scene-row')).toHaveCount(3);
 await page.getByRole('button',{name:'移除最後一筆',exact:true}).click();await expect(page.locator('#schedule-events .scene-row')).toHaveCount(2);
 await page.getByRole('button',{name:'清除完成項目',exact:true}).click();await expect(page.locator('#schedule-tasks .scene-row')).toHaveCount(1);
 await page.getByRole('button',{name:'編輯清單',exact:true}).click();await expect(page.locator('#schedule-tasks')).toHaveAttribute('contenteditable','true');
 await page.locator('.scenario-picker [data-scenario=team]').click();
 await page.getByRole('button',{name:'接收團隊通知',exact:true}).click();await expect(page.getByRole('button',{name:'接收團隊通知',exact:true})).toHaveAttribute('aria-pressed','false');
 await page.getByRole('button',{name:'新增對話',exact:true}).click();await expect(page.locator('#team-questions .scene-row')).toHaveCount(3);
 await page.getByRole('button',{name:'管理成員權限',exact:true}).click();await expect(page.locator('#team-permissions')).toBeVisible();
 await page.getByRole('button',{name:'移除訪客',exact:true}).click();await expect(page.locator('#team-guest .scene-row')).toHaveCount(0);
});
