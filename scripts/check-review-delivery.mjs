// Verify the files actually handed off, including file:// interaction.
import{readFile,writeFile,access}from'node:fs/promises';import{resolve,join,dirname}from'node:path';import{pathToFileURL}from'node:url';import{createHash}from'node:crypto';import assert from'node:assert/strict';
import{chromium,webkit,expect}from'@playwright/test';import{unzipSync}from'fflate';import{execFileSync}from'node:child_process';
const out=resolve(process.argv[2]||''),result=process.argv[3]||'work/delivery-check.json';if(!process.argv[2])throw new Error('Provide the delivered folder.');
const hash=b=>createHash('sha256').update(b).digest('hex'),json=async p=>JSON.parse(await readFile(p));
const manifest=await json(join(out,'delivery-manifest.json')),catalog=await json('dist/catalog.json');
for(const f of manifest.files){const b=await readFile(join(out,f.path));assert.equal(b.length,f.bytes,f.path);assert.equal(hash(b),f.sha256,f.path);}
assert.deepEqual(await json(join(out,'dist/catalog.json')),catalog);
assert.equal(hash(await readFile(join(out,'dist/definitions.json'))),hash(await readFile('dist/definitions.json')));
for(const f of catalog.inventory)assert.equal(hash(await readFile(join(out,f.path))),f.sha256,f.path);
const zip=unzipSync(await readFile(join(out,'master-icons-all-svg.zip')));assert.equal(Object.keys(zip).filter(p=>p.endsWith('.svg')).length,3528);
for(const f of catalog.inventory)assert.equal(hash(zip[f.path]),f.sha256,f.path+' zip');
assert.equal(hash(await readFile(join(out,'master-icons-alpha.tgz'))),hash(await readFile('work/master-icons-alpha.tgz')));
const packageEntries=execFileSync('tar',['-tzf',join(out,'master-icons-alpha.tgz')],{encoding:'utf8'}).trim().split('\n');assert.equal(packageEntries.length,7873);
const browsers=[];
for(const[engine,type]of[['chromium',chromium],['webkit',webkit]])for(const dpr of[1,2]){
 const b=await type.launch(),p=await b.newPage({viewport:{width:1280,height:960},deviceScaleFactor:dpr}),errors=[],network=[];p.on('pageerror',e=>errors.push(e.message));await p.route(/^https?:/,route=>{network.push(route.request().url());return route.abort();});
 await p.goto(pathToFileURL(join(out,'preview.html')).href);await expect(p.locator('#concept-count')).toHaveText('392');await expect(p.locator('.icon-card')).toHaveCount(96);
 await p.getByRole('searchbox').fill('搜尋');await expect(p.locator('.icon-card')).toHaveCount(6);await p.getByRole('searchbox').fill('database-backup');
 await p.locator('input[name=size][value="16"]').check();await p.locator('input[name=corner][value=rounded]').check();await p.locator('.icon-card').click();await expect(p.locator('#detail-large svg')).toHaveAttribute('viewBox','0 0 16 16');
 const download=p.waitForEvent('download');await p.locator('#download-icon').click();const asset=await download;assert.equal(asset.suggestedFilename(),'database-backup-16-rounded.svg');assert.match(await readFile(await asset.path(),'utf8'),/viewBox="0 0 16 16"/);await p.keyboard.press('Escape');
 await p.locator('#tab-reference').click();await expect(p.locator('.reference-table tbody tr')).toHaveCount(1);await expect(p.locator('.reference-table tbody svg')).toHaveCount(4);
 await p.getByRole('searchbox').fill('');await p.locator('#tab-context').click();await p.locator('.scenario-picker [data-scenario=table]').click();await p.setViewportSize({width:390,height:960});
 for(const theme of['light','dark']){await p.evaluate(t=>document.documentElement.dataset.theme=t,theme);const wrap=await p.locator('.scene-order-table').evaluate(el=>el.parentElement.getBoundingClientRect().toJSON());for(const action of await p.locator('#scene-orders [data-context-action=details]').all()){const r=await action.boundingBox();assert.ok(r.x>=wrap.x&&r.x+r.width<=wrap.right+.5);}await expect(p.locator('.scene-mobile-nav')).toBeVisible();}
 await p.goto(pathToFileURL(join(out,'docs/review/ui-v1/index.html')).href);await expect(p.locator('#records>details')).toHaveCount(392);await p.locator('input').fill('database-backup');await p.locator('#expand').click();await expect(p.locator('#database-backup .native svg')).toHaveCount(9);
 const links=await p.locator('a').evaluateAll(xs=>xs.map(x=>x.getAttribute('href')));let count=0;for(const href of new Set(links)){if(/^(https?:|#)/.test(href))continue;await access(resolve(out,'docs/review/ui-v1',decodeURIComponent(href.split('#')[0])));count++;}
 assert.deepEqual(network,[]);assert.deepEqual(errors,[]);browsers.push({engine,dpr,offlineGallery:true,names:392,sourceOriginals:true,nineVariants:true,svgDownload:true,mobileActions:true,reportLocalLinks:count,networkRequests:0,errors});await b.close();
}
const data={date:'2026-11-16',manifestSha256:hash(await readFile(join(out,'delivery-manifest.json'))),filesVerified:manifest.files.length,svgFilesVerified:3528,svgZipFilesVerified:3528,packageFilesVerified:packageEntries.length,browsers,status:'passed',limits:['Firefox remains unverified; see docs/validation.md.','This verifies artifact integrity and flows; visual decisions are separately documented.']};await writeFile(result,JSON.stringify(data,null,2)+'\n');console.log(data);
