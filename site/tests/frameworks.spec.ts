import {test,expect} from '@playwright/test'
import {compile} from 'svelte/compiler'
import {parse,compileTemplate} from '@vue/compiler-sfc'
import {transform as transformAstro} from '@astrojs/compiler-rs'
import {transform} from 'esbuild'
import {codeSnippet,formats,formatLabels} from '../components/code-snippet'

test('framework snippets use native syntax and preserve custom geometry',async()=>{
 const svg='<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" stroke-width="2"><defs><mask id="cut"><rect width="24" height="24" fill="white" /></mask></defs><path mask="url(#cut)" fill-rule="evenodd" d="M2 2L22 22" /></svg>'
 for(const format of formats)for(const customStroke of [false,true]){
  const code=codeSnippet({format,component:'SearchIcon',size:64,opticalSize:24,corner:'rounded',svg,strokeWidth:customStroke?2:null})
  if(format==='svg'){expect(code).toBe(svg);continue}
  expect(code).toContain(`@master/icons-${format}/24/rounded`)
  expect(code).not.toContain('<svg')
  if(customStroke)expect(code).toContain(format==='vue'?':stroke-width="2"':'strokeWidth={2}')
  if(format==='svelte')expect(compile(code,{filename:'Icon.svelte',generate:'client'}).warnings).toEqual([])
  if(format==='astro')expect(transformAstro(code).diagnostics.filter(d=>d.severity==='error')).toEqual([])
  if(format==='vue'){
   const {descriptor,errors}=parse(code);expect(errors).toEqual([])
   expect(compileTemplate({source:descriptor.template!.content,filename:'Icon.vue',id:'snippet'}).errors).toEqual([])
  }
  if(format==='react'||format==='preact')await transform(code,{loader:'tsx'})
 }
})

for(const locale of ['', '/tw']){
 test(`${locale||'en'} framework selector copies matching component usage including custom strokes`,async({page})=>{
  const errors:string[]=[],svgRequests:string[]=[]
  page.on('pageerror',error=>errors.push(error.message))
  page.on('request',request=>{if(/\/(?:icons|strokes)\/.*\.svg(?:\?|$)/.test(request.url()))svgRequests.push(request.url())})
  await page.goto(`${locale}/icons?q=search&size=64&corner=rounded`)
  const tile=page.locator('.explorer-tile').filter({has:page.locator('.explorer-name',{hasText:/^search$/})})
  await expect(tile.locator('svg')).toHaveAttribute('width','64')
  await expect(tile.locator('svg')).toHaveAttribute('viewBox','0 0 24 24')
  await tile.focus();await page.keyboard.press('Enter')
  const dialog=page.locator('.explorer-dialog')
  await expect(dialog.locator('.master-cell svg')).toHaveCount(9)
  expect(await dialog.locator('.master-cell svg').evaluateAll(icons=>icons.every(svg=>[...svg.querySelectorAll('*')].every(node=>node.namespaceURI==='http://www.w3.org/2000/svg')))).toBe(true)
  const select=dialog.getByRole('combobox',{name:locale?'程式碼格式':'Code format',exact:true})
  const text=dialog.getByRole('textbox',{name:locale?'程式碼':'Code',exact:true})
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:(value:string)=>{(window as any).copiedCode=value;return Promise.resolve()}}}))
  for(const format of formats){
   await select.selectOption(format)
   const value=await text.inputValue()
   if(format==='svg')expect(value).toContain('width="64"')
   else expect(value).toContain(`@master/icons-${format}/24/rounded`)
   await dialog.getByRole('button',{name:locale?format==='svg'?'複製 SVG':`複製 ${formatLabels[format]} 用法`:`Copy ${formatLabels[format]}`,exact:true}).click()
   expect(await page.evaluate(()=>(window as any).copiedCode)).toBe(value)
  }
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:()=>Promise.reject(new Error('denied'))}}))
  await select.selectOption('vue')
  await dialog.getByRole('button',{name:locale?'複製 Vue 用法':'Copy Vue',exact:true}).click()
  await expect(text).toBeFocused()
  await expect(text).toHaveValue(/:size="64"/)
  await page.keyboard.press('Escape');await expect(tile).toBeFocused()
  await page.getByRole('slider',{name:locale?'線寬':'Stroke width',exact:true}).press('End')
  await expect(tile.locator('svg')).toHaveAttribute('stroke-width','2.5')
  await tile.click()
  await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:(value:string)=>{(window as any).copiedCode=value;return Promise.resolve()}}}))
  for(const format of formats.filter(value=>value!=='svg')){
   await select.selectOption(format)
   const code=await text.inputValue()
   expect(code).toContain(`@master/icons-${format}/24/rounded`)
   expect(code).not.toContain('<svg')
   expect(code).toContain(format==='vue'?':stroke-width="2.5"':'strokeWidth={2.5}')
   await dialog.getByRole('button',{name:locale?`複製 ${formatLabels[format]} 用法`:`Copy ${formatLabels[format]}`,exact:true}).click()
   expect(await page.evaluate(()=>(window as any).copiedCode)).toBe(code)
  }
  expect(svgRequests).toEqual([])
  expect(errors).toEqual([])
 })
}

test('inline custom masks stay scoped across collection and optical specimens',async({page})=>{
 await page.goto('/icons?q=bell-off&stroke=1.5&size=16&view=optical')
 const tile=page.locator('.explorer-tile').filter({has:page.locator('.explorer-name',{hasText:/^bell-off$/})})
 await expect(tile.locator('svg')).toHaveCount(3)
 await expect(tile.locator('mask').first()).toBeAttached()
 await tile.click()
 await expect(page.locator('.master-cell svg')).toHaveCount(9)
 const result=await page.evaluate(()=>{
  const icons=[...document.querySelectorAll('.explorer-icon svg,.master-cell svg')]
  const ids=icons.flatMap(svg=>[...svg.querySelectorAll('[id]')].map(node=>node.id))
  return {duplicates:ids.length-new Set(ids).size,missing:icons.flatMap(svg=>[...svg.querySelectorAll('[mask]')].filter(node=>!svg.querySelector(`[id="${node.getAttribute('mask')!.slice(5,-1)}"]`))).length,invalidNamespace:icons.flatMap(svg=>[...svg.querySelectorAll('*')].filter(node=>node.namespaceURI!=='http://www.w3.org/2000/svg')).length}
 })
 expect(result).toEqual({duplicates:0,missing:0,invalidNamespace:0})
})

test('homepage icons and drawings render without client JavaScript',async({browser,baseURL})=>{
 const context=await browser.newContext({javaScriptEnabled:false})
 const page=await context.newPage()
 await page.goto(`${baseURL}/`)
 await expect(page.locator('.icons-specimen svg')).toHaveCount(32)
 await expect(page.locator('.icons-plot')).toHaveCount(5)
 await expect(page.locator('.icons-plate .home-plate')).toHaveAttribute('aria-label',/camera icon drawn on its 24 px grid/)
 await expect(page.locator('[data-setup-prompt]').first()).toHaveAttribute('data-setup-prompt',/Set up Master Icons end to end/)
 await context.close()
})

test('the hero plate draws each specimen at its own setting',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'})
 await page.goto('/')
 const plate=page.locator('.icons-plate')
 await plate.getByRole('button',{name:'compass'}).click()
 await expect(plate.locator('.home-plate')).toHaveAttribute('aria-label',/compass icon drawn on its 20 px grid with rounded corners and a 1.5 stroke/)
 await expect(plate.getByRole('button',{name:'compass'})).toHaveAttribute('aria-pressed','true')
})

test('the styles bench carries one setting to every icon and its detail',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'})
 await page.goto('/')
 const bench=page.locator('#styles .home-bench')
 await bench.scrollIntoViewIfNeeded()
 await expect(bench.locator('.home-bench-play')).toHaveCount(0)
 await bench.getByRole('radio',{name:'Poster'}).check()
 await expect(bench.locator('.home-ui-layer')).toHaveClass(/home-style-poster/)
 const glyph=bench.locator('.home-ui-layer .home-glyph').first()
 await expect(glyph).toHaveAttribute('width','24')
 await expect(glyph).toHaveAttribute('stroke-linejoin','miter')
 await bench.getByRole('radio',{name:'Rounded'}).check()
 await expect(glyph).toHaveAttribute('stroke-linejoin','round')
 await expect(bench.locator('.home-ui-layer .window-title')).toHaveText('Poster · Custom')
 await bench.getByRole('radio',{name:'16'}).check()
 await expect(glyph).toHaveAttribute('width','16')
 await expect(bench.locator('.home-bench-value')).toHaveText('1.5')
 await expect(bench.locator('.home-bench-detail .home-plate')).toHaveAttribute('aria-label',/inbox icon drawn on its 16 px grid with rounded corners and a 1.5 stroke/)
 const search=await bench.locator('.home-ui-layer [data-slot="search"]').boundingBox()
 await page.mouse.move(search!.x+search!.width/2,search!.y+search!.height/2)
 await expect(bench.locator('.home-bench-detail-head')).toContainText('search')
 await expect(bench.locator('.home-bench-callout circle').first()).toBeAttached()
 const ids=await page.evaluate(()=>{const all=[...document.querySelectorAll('[id]')].map(node=>node.id);return all.filter((id,index)=>all.indexOf(id)!==index)})
 expect(ids).toEqual([])
})

test('modal specimens update preview and code while actions remain reachable on small screens',async({page})=>{
 await page.goto('/icons?q=search')
 const tile=page.locator('.explorer-tile').filter({has:page.locator('.explorer-name',{hasText:/^search$/})})
 await expect(tile.locator('svg')).toBeVisible()
 await tile.focus();await page.keyboard.press('Enter')
 const dialog=page.locator('.explorer-dialog')
 const preview=dialog.locator('[data-icon-preview] svg')
 await expect(preview).toHaveAttribute('width','96')
 await expect(preview).toHaveAttribute('viewBox','0 0 24 24')
 const master=dialog.getByRole('button',{name:'16 px · Rounded',exact:true})
 await master.focus();await page.keyboard.press('Space')
 await expect(master).toHaveAttribute('aria-pressed','true')
 await expect(preview).toHaveAttribute('viewBox','0 0 16 16')
 await expect(dialog.getByRole('combobox',{name:'Display size',exact:true})).toHaveValue('16')
 await expect(dialog.getByRole('combobox',{name:'Corners',exact:true})).toHaveValue('rounded')
 await dialog.getByRole('combobox',{name:'Code format',exact:true}).selectOption('astro')
 await expect(dialog.locator('textarea')).toHaveValue(/@master\/icons-astro\/16\/rounded/)
 await dialog.getByRole('combobox',{name:'Display size',exact:true}).selectOption('64')
 await expect(preview).toHaveAttribute('viewBox','0 0 24 24')
 await expect(dialog.locator('textarea')).toHaveValue(/size=\{64\}/)
 await dialog.getByRole('slider',{name:'Stroke width',exact:true}).press('End')
 await expect(preview).toHaveAttribute('stroke-width','2.5')
 await expect(dialog.locator('textarea')).toHaveValue(/strokeWidth=\{2.5\}/)
 await dialog.getByRole('button',{name:'Reset stroke',exact:true}).click()
 await expect(dialog.locator('textarea')).toHaveValue(/@master\/icons-astro\/24\/rounded/)
 for(const width of [390,320]){
  await page.setViewportSize({width,height:740})
  const before=await dialog.locator('.dialog-footer').boundingBox()
  expect(before!.y+before!.height).toBeLessThanOrEqual(740)
  const body=dialog.locator('.dialog-body')
  await body.evaluate(el=>{el.scrollTop=el.scrollHeight})
  const after=await dialog.locator('.dialog-footer').boundingBox()
  expect(Math.abs(before!.y-after!.y)).toBeLessThan(2)
  expect(await dialog.evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true)
  await expect(dialog.getByRole('button',{name:'Copy Astro',exact:true})).toBeInViewport()
  await expect(dialog.getByRole('button',{name:'Close',exact:true})).toBeInViewport()
 }
 await page.keyboard.press('Escape');await expect(tile).toBeFocused()
 await tile.click();await expect(dialog.locator('.texture')).toBeVisible()
 expect(await dialog.locator('.texture').evaluate(el=>getComputedStyle(el).backgroundImage)).not.toBe('none')
 await dialog.getByRole('button',{name:'Close',exact:true}).click()
 await expect(dialog).not.toBeVisible();await expect(tile).toBeFocused()
})
