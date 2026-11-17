import {test,expect} from '@playwright/test'

test('Master favicons are served as static assets',async({request})=>{
 for(const [path,type] of [['/favicon.svg','image/svg+xml'],['/favicon.ico','image/']]){
  const response=await request.get(path)
  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toContain(type)
  expect((await response.body()).length).toBeGreaterThan(0)
 }
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
  await expect(page.locator('astro-island[ssr]')).toHaveCount(0)
  const input=page.getByRole('searchbox',{name:label,exact:true})
  await input.fill('no-icon-with-this-name')
  await expect(page.getByTestId('result-count')).toContainText('0')
  await input.fill('search')
  await expect(page.getByTestId('icon-grid').locator('button')).not.toHaveCount(0)
 }
 expect(errors).toEqual([])
})
