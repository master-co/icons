import { test, expect } from '@playwright/test';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { unzipSync, strFromU8 } from 'fflate';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { catalog as sourceCatalog } from '../../packages/icons/src/catalog.mjs';
const conceptCount=sourceCatalog.length;

test('search, presets, accessible detail, downloads, keyboard and responsive layouts',async({page},info)=>{
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await page.goto('/');await expect(page.locator('.icon-card')).toHaveCount(Math.min(96,conceptCount));
  await expect(page.locator('#pagination')).toBeVisible();
  await expect(page.locator('#concept-count')).toHaveText(await page.evaluate(count=>count.toLocaleString(),conceptCount));
  await page.getByRole('searchbox').fill('通知');await expect(page.locator('.icon-card')).toHaveCount(5);
  await page.getByRole('searchbox').fill('搜尋');await expect(page.locator('.icon-card')).toHaveCount(13);
  expect(await page.locator('.icon-card').evaluateAll(cards=>cards.map(c=>c.dataset.icon).sort())).toEqual(['brand-google','brand-perplexity','calendar-search','database-search','file-search','folder-search','list-search','mail-search','message-search','search','search-selection','search-x','tab-search']);
  await page.locator('input[name="size"][value="16"]').check();
  await page.locator('input[name="corner"][value="rounded"]').check();
  await page.locator('.icon-card[data-icon="search"]').click();await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('#detail-large svg')).toHaveAttribute('viewBox','0 0 16 16');
  const downloaded=page.waitForEvent('download');await page.locator('#download-icon').click();
  const file=await downloaded;expect(file.suggestedFilename()).toBe('search-16-rounded.svg');
  const svg=await readFile(await file.path(),'utf8');expect(svg).toContain('Copyright (c) 2025 Hugeicons');expect(svg).toContain('viewBox="0 0 16 16"');
  await page.keyboard.press('Escape');await expect(page.getByRole('dialog')).not.toBeVisible();
  await page.getByRole('searchbox').fill('');
  await page.locator('#tab-library').focus();await page.keyboard.press('ArrowRight');
  await expect(page.locator('#tab-optical')).toHaveAttribute('aria-selected','true');
  await expect(page.locator('.optical-card svg')).toHaveCount(216);
  await page.locator('#page-next').click();await expect(page.locator('#page-info')).toContainText('第 2');
  await expect(page.locator('.optical-card')).toHaveCount(24);
  await page.locator('#page-previous').click();await expect(page.locator('#page-info')).toContainText('第 1');
  await page.locator('#tab-reference').click();await expect(page.locator('.reference-table tbody tr')).toHaveCount(12);
  await expect(page.locator('.reference-table tbody svg')).toHaveCount(48);
  await page.locator('#tab-context').click();await page.locator('.scenario-picker [data-scenario=files]').click();await page.getByRole('button',{name:'新增草稿'}).click();
  await expect(page.locator('#demo-files tr')).toHaveCount(4);
  await page.locator('#tab-library').click();
  const zipDownload=page.waitForEvent('download');await page.locator('#download-set').click();
  const zip=unzipSync(await readFile(await (await zipDownload).path()));
  expect(Object.keys(zip).filter(x=>x.endsWith('.svg'))).toHaveLength(conceptCount);
  expect(strFromU8(zip.LICENSE)).toContain('MIT License');
  for(const width of [390,768,1440]){
    await page.setViewportSize({width,height:1000});
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  }
  await page.locator('#theme-toggle').click();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
  await page.screenshot({path:info.outputPath('gallery-dark.png'),fullPage:true});
  expect(errors).toEqual([]);
});

test('all SVG presets parse and rasterize without clipping at this DPR',async({page},info)=>{
  test.setTimeout(300000);
  await page.goto('/');
  const result=await page.evaluate(async()=>{
    const {definitions,catalog}=await fetch('/dist/preview/data.json').then(r=>r.json());
    const {renderSvg}=await import('/dist/runtime.js');
    const failures=[],metrics=[];const ratio=devicePixelRatio,pad=4;
    for(const item of catalog.inventory){
      const size=item.opticalSize;
      const svg=renderSvg(definitions[item.name],{size,corner:item.corner});
      const doc=new DOMParser().parseFromString(svg,'image/svg+xml');
      if(doc.querySelector('parsererror')){failures.push(item.path+': parse');continue;}
      // Extend the viewBox to reveal strokes that a normal SVG viewport clips.
      const outer=doc.documentElement;outer.setAttribute('viewBox',`-${pad} -${pad} ${size+pad*2} ${size+pad*2}`);
      outer.setAttribute('width',String((size+pad*2)*ratio));outer.setAttribute('height',String((size+pad*2)*ratio));outer.setAttribute('color','#000');
      const img=new Image();img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(doc));await img.decode();
      const canvas=document.createElement('canvas');canvas.width=canvas.height=(size+pad*2)*ratio;const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0);
      const pixels=ctx.getImageData(0,0,canvas.width,canvas.height).data;let count=0,minX=Infinity,minY=Infinity,maxX=-1,maxY=-1;
      for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++)if(pixels[(y*canvas.width+x)*4+3]>8){count++;minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);}
      if(!count||minX<pad*ratio||minY<pad*ratio||maxX>=(size+pad)*ratio||maxY>=(size+pad)*ratio)failures.push({path:item.path,bounds:[minX,minY,maxX,maxY],count});
      metrics.push({name:item.name,size,corner:item.corner,bounds:[minX/ratio-pad,minY/ratio-pad,(maxX+1)/ratio-pad,(maxY+1)/ratio-pad],inkPixels:count});
    }
    return {dpr:ratio,count:catalog.inventory.length,failures,metrics};
  });
  await mkdir('work/quality',{recursive:true});
  await writeFile(`work/quality/${info.project.name}-raster.json`,JSON.stringify(result));
  await info.attach('raster-metrics',{body:JSON.stringify(result,null,2),contentType:'application/json'});
  expect(result.count).toBe(conceptCount*9);expect(result.failures).toEqual([]);
});

test('standalone review works without a server and retains comparison / ZIP export',async({page})=>{
  await page.goto(pathToFileURL(resolve('dist/preview.html')).href);
  await expect(page.locator('.icon-card')).toHaveCount(Math.min(96,conceptCount));
  await page.locator('#tab-reference').click();await expect(page.locator('.reference-table tbody svg')).toHaveCount(48);
  const downloaded=page.waitForEvent('download');await page.locator('#download-set').click();
  const zip=unzipSync(await readFile(await (await downloaded).path()));
  expect(Object.keys(zip).filter(x=>x.endsWith('.svg'))).toHaveLength(conceptCount);
});

test('adapted redraw downloads preserve upstream notices in valid SVG and ZIP files',async({page})=>{
 for(const url of ['/',pathToFileURL(resolve('dist/preview.html')).href]){
  await page.goto(url);
  // Wait for initialization before typing: the static HTML search field exists
  // before the module loads its catalog and attaches the input listener.
  await expect(page.locator('.icon-card')).toHaveCount(Math.min(96,conceptCount));
  for(const name of['megaphone','handshake']){
   await page.getByRole('searchbox').fill(name);await page.locator(`.icon-card[data-icon="${name}"]`).click();
   const pending=page.waitForEvent('download');await page.locator('#download-icon').click();
   const source=await readFile(await(await pending).path(),'utf8');
   expect(source).toContain('ISC License');expect(source).toContain('Copyright (c) 2026 Lucide Icons and Contributors');
   expect(await page.evaluate(svg=>new DOMParser().parseFromString(svg,'image/svg+xml').querySelector('parsererror')?.textContent||'',source)).toBe('');
   await page.keyboard.press('Escape');
  }
  const pending=page.waitForEvent('download');await page.locator('#download-set').click();
  const zip=unzipSync(await readFile(await(await pending).path()));
  expect(strFromU8(zip['licenses/lucide.txt'])).toContain('ISC License');
  for(const name of['megaphone','handshake'])expect(strFromU8(zip[name+'.svg'])).toContain('ISC License');
 }
});
