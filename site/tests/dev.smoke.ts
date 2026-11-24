import {test,expect} from '@playwright/test'

test('Master favicons are served as static assets',async({request})=>{
 for(const [path,type] of [['/favicon.svg','image/svg+xml'],['/favicon.ico','image/']]){
  const response=await request.get(path)
  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toContain(type)
  expect((await response.body()).length).toBeGreaterThan(0)
 }
})

// Islands hydrated on visibility, such as the homepage workbench, stay server-rendered until scrolled to.
test('development language switching stays responsive in both directions',async({page})=>{
 const errors:string[]=[]
 page.on('pageerror',error=>errors.push(error.message))
 for(const path of ['','/icons','/guide/svg']){
  const suffix=path==='/icons'?'?size=20&corner=rounded&q=search&view=library':'?locale-test=1#locale-test'
  await page.goto(`/tw${path}${suffix}`)
  for(const locale of ['en','tw','en']){
   await expect(page.locator('astro-island[ssr]:not([client="visible"])')).toHaveCount(0)
   const language=page.locator('select').filter({has:page.locator('option[value="en"]')}).first()
   await language.selectOption(locale)
   const expectedPath=`${locale==='tw'?'/tw':''}${path||(locale==='en'?'/':'')}`
   await expect(page).toHaveURL(url=>url.pathname===expectedPath)
   await expect(page.locator('html')).toHaveAttribute('lang',locale==='tw'?'zh-TW':'en')
   await expect(path==='/icons'?page.getByTestId('icon-grid'):page.locator('main h1')).toBeVisible()
   await expect(page.locator('astro-island[ssr]:not([client="visible"])')).toHaveCount(0)
   const url=new URL(page.url())
   if(path==='/icons'){
    expect(url.searchParams.get('q')).toBe('search')
    expect(url.searchParams.get('size')).toBe('20')
   }else{
    expect(url.search).toBe('?locale-test=1')
    expect(url.hash).toBe('#locale-test')
   }
  }
 }
 expect(errors).toEqual([])
})

test('development server resolves Master Site routes on first and repeated requests',async({request})=>{
 for(let pass=0;pass<2;pass++){
  for(const locale of ['','/tw']){
   for(const route of ['/','/icons','/guide/getting-started','/guide/svg']){
    const url=locale+(route==='/'?'':route)||'/'
    const response=await request.get(url)
    expect(response.status(),`${url}, pass ${pass}`).toBe(200)
    const html=await response.text()
    expect(html).toContain(route==='/icons'?'data-testid="icon-grid"':'<h1')
    expect(html).not.toContain('Unexpectedly unable to find a component instance')
   }
  }
 }
})

test('development explorer hydrates and filters in both languages',async({page})=>{
 const errors:string[]=[]
 page.on('pageerror',error=>errors.push(error.message))
 for(const [locale,label] of [['','Search icons'],['/tw','搜尋圖示']]){
  await page.goto(`${locale}/icons`)
  await expect(page.locator('astro-island[ssr]:not([client="visible"])')).toHaveCount(0)
  const input=page.getByRole('searchbox',{name:label,exact:true})
  await input.fill('no-icon-with-this-name')
  await expect(page.getByTestId('result-count')).toContainText('0')
  await input.fill('search')
  await expect(page.getByTestId('icon-grid').getByRole('link')).not.toHaveCount(0)
 }
 expect(errors).toEqual([])
})

test('icon aliases permanently redirect to the canonical page in both languages',async({request})=>{
 for(const prefix of ['','/tw']){
  const response=await request.get(prefix+'/icons/brand-chatgpt',{maxRedirects:0})
  expect(response.status()).toBe(301)
  expect(response.headers().location).toBe(prefix+'/icons/brand-openai')
  expect((await request.get(prefix+'/icons/brand-openai')).status()).toBe(200)
 }
})

test('development serves the crawl entrypoints and the guide share image',async({request})=>{
 expect((await (await request.get('/robots.txt')).text())).toContain('/sitemap.xml')
 const sitemap=await request.get('/sitemap.xml')
 expect(sitemap.headers()['content-type']).toContain('xml')
 expect(await sitemap.text()).toContain('/tw/icons/search</loc>')
 const image=await request.get('/api/og-image?pathname=/guide/react')
 expect(image.headers()['content-type']).toContain('image/png')
})
