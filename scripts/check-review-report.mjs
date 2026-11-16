import {chromium,webkit} from '@playwright/test';
import {resolve,dirname} from 'node:path';import{pathToFileURL,fileURLToPath}from'node:url';import{access,writeFile}from'node:fs/promises';import assert from 'node:assert/strict';
const file=resolve('docs/review/ui-v1/index.html'),results=[];
for(const [engine,type] of [['chromium',chromium],['webkit',webkit]]){
 const b=await type.launch(),page=await b.newPage({viewport:{width:1280,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(pathToFileURL(file).href);
 assert.equal(await page.locator('#records>details').count(),392);
 await page.locator('input').fill('database-backup');assert.equal(await page.locator('#records>details:visible').count(),1);await page.locator('#expand').click();assert.match(await page.locator('#database-backup .compare').textContent(),/本期新繪，無舊稿/);
 await page.locator('input').fill('clipboard-pen');await page.locator('#expand').click();assert.equal(await page.locator('#clipboard-pen .compare section').nth(2).locator('svg').count(),3);assert.equal(await page.locator('#clipboard-pen .native svg').count(),9);
 await page.locator('#theme').click();assert.equal(await page.locator('body').getAttribute('class'),'dark');
 await page.setViewportSize({width:390,height:960});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 const hrefs=await page.locator('a').evaluateAll(xs=>xs.map(x=>x.getAttribute('href')));let checked=0;for(const href of new Set(hrefs)){if(/^(https?:|#)/.test(href))continue;await access(resolve(dirname(file),decodeURIComponent(href.split('#')[0])));checked++;}
 assert.deepEqual(errors,[]);results.push({engine,records:392,localLinks:checked,search:true,beforeAndNew:true,nineVariants:true,theme:true,mobileNoOverflow:true,errors});await b.close();
}
await writeFile(`docs/review/${process.argv[2]||'craft-03'}/report-check.json`,JSON.stringify(results,null,2)+'\n');console.log(results);
