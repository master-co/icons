import {test,expect} from '@playwright/test'
import {readFile,readdir} from 'node:fs/promises'
import {join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {locales,languageOf} from '@master/internal-site/common/locales.js'
import type {CatalogIcon} from '../components/catalog'

const out=fileURLToPath(new URL('../out/',import.meta.url))
const published=(name:string,size=24,corner='soft')=>readFile(new URL(`../../packages/icons/icons/${size}/${corner}/${name}.svg`,import.meta.url),'utf8')

test('built sitemap, canonical URLs, language pairs, sharing images and name indexes agree',async({request,browserName})=>{
 test.skip(browserName!=='chromium','One audit covers the shared static output')
 test.setTimeout(120000)
 const {icons}:{icons:CatalogIcon[]}=JSON.parse(await readFile(join(out,'catalog.json'),'utf8'))
 const canonicalIcons=icons.filter(icon=>!icon.aliasOf)
 const guideSlugs=(await readdir(join(out,'guide'))).filter(file=>file.endsWith('.html')).map(file=>file.slice(0,-5))
 const robots=await request.get('/robots.txt')
 expect(robots.headers()['content-type']).toContain('text/plain')
 const sitemapAddress=(await robots.text()).match(/^Sitemap: (.+)$/m)?.[1]
 const origin=new URL(sitemapAddress!).origin
 const sitemap=await request.get('/sitemap.xml')
 expect(sitemap.headers()['content-type']).toContain('xml')
 const urls=[...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(match=>match[1]).sort()
 const routes=['','/icons',...guideSlugs.map(slug=>'/guide/'+slug),...canonicalIcons.map(icon=>'/icons/'+icon.name)]
 const editions=locales.map(locale=>({lang:languageOf(locale),prefix:locale==='en'?'':'/'+locale}))
 const expected=editions.flatMap(({prefix})=>routes.map(route=>origin+((prefix+route)||'/'))).sort()
 expect(urls).toEqual(expected)

 const redirects=(await readFile(join(out,'_redirects'),'utf8')).split(/\r?\n/)
 const pngs=new Set<string>()
 for(const {prefix} of editions){
  const explorer=await readFile(join(out,prefix,'icons.html'),'utf8')
  const directory=explorer.match(/<details\b[^>]*class="[^"]*\bspecimen-directory\b[^"]*"[^>]*>[\s\S]*?<\/details>/)?.[0]??''
  const links=[...directory.matchAll(/<a [^>]*href="([^"]+)"/g)].map(match=>match[1]).sort()
  expect(links).toEqual(canonicalIcons.map(icon=>prefix+'/icons/'+icon.name).sort())
  const llms=await readFile(join(out,prefix,'llms.txt'),'utf8')
  expect(llms).toContain('https://icons.master.co'+prefix+'/icons.md')
  expect(llms).toContain('https://icons.master.co/catalog.json')
  const names=await readFile(join(out,prefix,'icons.md'),'utf8')
  for(const icon of icons){
   const destination=prefix+'/icons/'+(icon.aliasOf??icon.name)
   expect(names.includes(`[${icon.name}](https://icons.master.co${destination}) · \`${icon.component}\``),icon.name).toBe(true)
   if(icon.aliasOf){
    expect(redirects).toContain(`${prefix}/icons/${icon.name} ${destination} 301`)
   }
  }
  for(const route of routes){
   const path=prefix+route
   const html=await readFile(join(out,(path||'/index')+'.html'),'utf8')
   const head=html.slice(0,html.indexOf('</head>'))
   expect(head.includes(`rel="canonical" href="${origin}${path||'/'}"`),path).toBe(true)
   for(const {lang,prefix:other} of [...editions,{lang:'x-default',prefix:''}]){
    const target=(other+route)||'/'
    expect(head.includes(`hreflang="${lang}" href="${origin}${target}"`),path).toBe(true)
   }
   const image=head.match(/property="og:image" content="([^"]+)"/)?.[1]
   expect(image?.startsWith(origin+'/social/'),path).toBe(true)
   expect(head.includes(`name="twitter:image" content="${image}"`),path).toBe(true)
   pngs.add(new URL(image!).pathname)
   if(route.startsWith('/icons/')){
    expect(html.includes('data-icon-preview'),path).toBe(true)
    expect(html.includes('class="specimen-license"'),path).toBe(false)
    expect(html.includes('class="explorer-tile"')||html.includes('/catalog.json'),path).toBe(false)
   }
  }
 }
 for(const path of pngs){
  const png=await readFile(join(out,path))
  expect(png.subarray(0,8).toString('hex'),path).toBe('89504e470d0a1a0a')
 }
 expect(pngs.size).toBe(canonicalIcons.length+guideSlugs.length+1)
 const missing=await request.get('/icons/unknown-icon-for-seo-test')
 expect(missing.status()).toBe(404)
 expect(await missing.text()).toContain('noindex')
})

test('native links and icon details work without JavaScript',async({browser,baseURL})=>{
 const context=await browser.newContext({baseURL,javaScriptEnabled:false})
 try {
  const page=await context.newPage()
  await page.goto('/tw/icons')
  const heading=page.getByRole('heading',{level:1,name:'瀏覽 Master Icons'})
  expect((await heading.boundingBox())?.width).toBeLessThanOrEqual(1)
  const toggle=page.locator('.specimen-directory summary')
  await expect(toggle).toHaveText(/^[\d,]+ 個圖示$/)
  await toggle.focus()
  await page.keyboard.press('Enter')
  await page.locator('.specimen-directory a[href="/tw/icons/search"]').click()
  await expect(page.getByRole('heading',{level:1})).toHaveText('搜尋')
  const trail=page.getByRole('navigation',{name:'麵包屑導覽'}).getByRole('list')
  await expect(trail.getByRole('link')).toHaveCount(3)
  const current=trail.getByRole('link',{name:'搜尋',exact:true})
  await expect(current).toHaveAttribute('aria-current','page')
  await expect(current).toHaveAttribute('href','/tw/icons/search')
  await expect(page.locator('[data-icon-preview] svg')).toHaveAttribute('viewBox','0 0 24 24')
  await expect(page.getByRole('textbox',{name:'程式碼',exact:true})).toHaveValue(/SearchIcon.*@master\/icons-react\/24\/soft/)
  const action=page.waitForEvent('download')
  await page.getByRole('link',{name:'下載 SVG'}).click()
  expect(await readFile((await (await action).path())!,'utf8')).toBe(await published('search'))
 }finally{await context.close()}
})

test('regular click previews, modified click opens a new tab, detail controls copy and download',async({page,context})=>{
 await page.goto('/icons?q=arrow-left')
 const tile=page.locator('.explorer-tile[href="/icons/arrow-left"]')
 await expect(page.locator('astro-island[ssr]')).toHaveCount(0)
 const newPage=context.waitForEvent('page')
 await tile.click({modifiers:[process.platform==='darwin'?'Meta':'Control']})
 const tab=await newPage
 await expect(tab).toHaveURL(/\/icons\/arrow-left$/)
 await tab.close()
 await tile.focus()
 await page.keyboard.press('Enter')
 const dialog=page.getByRole('dialog',{name:'arrow-left'})
 const title=dialog.getByRole('heading',{name:'arrow-left'}).getByRole('link')
 await expect(title).toHaveAttribute('href','/icons/arrow-left')
 await expect(dialog.getByText('Icon details',{exact:true})).toHaveCount(0)
 await title.focus()
 await page.keyboard.press('Enter')
 await expect(page).toHaveURL(/\/icons\/arrow-left$/)
 await page.getByRole('combobox',{name:'Display size'}).selectOption('16')
 await page.getByRole('combobox',{name:'Corners'}).selectOption('rounded')
 await page.getByRole('slider',{name:/Stroke width/}).press('End')
 await page.getByRole('combobox',{name:'Code format'}).selectOption('vue')
 const text=page.getByRole('textbox',{name:'Code',exact:true})
 await expect(text).toHaveValue(/@master\/icons-vue\/16\/rounded/)
 await expect(text).toHaveValue(/:stroke-width="1.5"/)
 // Stub the OS clipboard so headless browsers exercise the same copy action.
 await page.evaluate(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:(value:string)=>{document.documentElement.dataset.copied=value;return Promise.resolve()}}}))
 await page.getByRole('button',{name:'Copy Vue'}).click()
 await expect(page.locator('html')).toHaveAttribute('data-copied',await text.inputValue())
 const selected=page.waitForEvent('download')
 await page.getByRole('link',{name:'Download SVG'}).click()
 expect(await readFile((await (await selected).path())!,'utf8')).toContain('stroke-width="1.5"')
 await expect(page.locator('astro-island[ssr]')).toHaveCount(0)
 await page.getByRole('combobox',{name:'Language',exact:true}).selectOption('tw')
 await expect(page).toHaveURL(/\/tw\/icons\/arrow-left$/)
 for(const theme of ['light','dark'] as const){
  await page.emulateMedia({colorScheme:theme})
  await page.setViewportSize({width:390,height:844})
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(390)
 }
})

test('a brand alias and outline expose their own component and artwork capabilities',async({page})=>{
 await page.goto('/tw/icons/brand-openai')
 await expect(page).toHaveURL(/\/tw\/icons\/brand-openai$/)
 await expect(page.getByText('BrandChatgptIcon',{exact:true})).toBeVisible()
 await expect(page.getByRole('slider')).toHaveCount(0)
 await page.goto('/icons/brand-github-outline')
 await expect(page.getByRole('slider',{name:/Stroke width/})).toBeEnabled()
 await expect(page.getByRole('textbox',{name:'Code',exact:true})).toHaveValue(/BrandGithubOutlineIcon/)
 await page.getByRole('link',{name:/GitHub · Monochrome mark/}).click()
 await expect(page).toHaveURL(/\/icons\/brand-github$/)
})

test('detail SVG copy and download preserve just the applicable artwork notice',async({page})=>{
 await page.addInitScript(()=>Object.defineProperty(navigator,'clipboard',{configurable:true,value:{
  writeText:async(text:string)=>{document.documentElement.dataset.copied=text}
 }}))
 for(const name of ['plus','megaphone','teapot','brand-vue-js']){
  await page.goto('/icons/'+name)
  await page.getByRole('combobox',{name:'Code format'}).selectOption('svg')
  const original=await published(name)
  const copy=page.getByRole('button',{name:'Copy SVG',exact:true})
  await copy.click()
  await expect(page.locator('html')).toHaveAttribute('data-copied',original.trimEnd())
  const link=page.getByRole('link',{name:'Download SVG',exact:true})
  expect(decodeURIComponent((await link.getAttribute('href'))!.split(',')[1])).toBe(original)
  if(name==='brand-vue-js')continue
  await page.getByRole('slider',{name:/Stroke width/}).press('End')
  await copy.click()
  const custom=await page.locator('html').getAttribute('data-copied')
  expect(custom).toContain('stroke-width="2.5"')
  expect(custom!.slice(0,custom!.indexOf('<svg'))).toBe(original.slice(0,original.indexOf('<svg')))
  expect(decodeURIComponent((await link.getAttribute('href'))!.split(',')[1])).toBe(custom+'\n')
 }
})
