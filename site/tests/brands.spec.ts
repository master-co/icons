import {test,expect} from '@playwright/test'
import {readFile} from 'node:fs/promises'
test('requested brand additions can be found and opened at 16px',async({page})=>{
 await page.goto('/icons?category=brands&size=16')
 await expect(page.locator('astro-island[ssr]')).toHaveCount(0)
 for(const [label,slug]of [['OpenAI','openai'],['ChatGPT','chatgpt'],['Microsoft','microsoft'],['LinkedIn','linkedin'],['Slack','slack'],['Cursor','cursor'],['Supabase','supabase'],['Vite','vite'],["Vue.js", "vue-js"],["JavaScript", "javascript"],["Bun", "bun"],["GitHub Copilot", "github-copilot"],["Hugging Face", "hugging-face"],["AWS", "aws"],["Firebase", "firebase"],["PostgreSQL", "postgresql"],["Microsoft Teams", "microsoft-teams"],["Outlook", "outlook"],["Google Meet", "google-meet"],["Canva", "canva"],["Dribbble", "dribbble"],["WordPress", "wordpress"],["Dcard", "dcard"],["Shopee", "shopee"],["HTML5", "html5"]]){
  await page.getByRole('searchbox',{name:'Search icons',exact:true}).fill(label)
  await page.getByRole('button',{name:label,exact:true}).click()
  const dialog=page.getByRole('dialog'),code=dialog.locator('textarea')
  await expect(code).toHaveValue(/viewBox="0 0 16 16"/)
  const response=await page.request.get(`/icons/16/soft/brand-${slug}.svg`)
  expect(response.ok()).toBe(true)
  const source=await response.text()
  expect(source).toContain(await code.inputValue())
  await expect(dialog.locator('.master-cell svg')).toHaveCount(9)
  await page.keyboard.press('Escape')
 }
})
for(const locale of ['', '/tw'])test(`brands search, identity and download ${locale||'en'}`,async({page})=>{
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message))
 await page.goto(`${locale}/icons?category=brands`)
 await expect(page.locator('astro-island[ssr]')).toHaveCount(0)
 await expect(page.locator('.explorer-tile')).toHaveCount(89)
 const search=page.getByRole('searchbox',{name:locale?'搜尋圖示':'Search icons',exact:true})
 await search.fill('master css');await expect(page.locator('.explorer-tile')).toHaveCount(1)
 await expect(page.locator('.explorer-tile')).toHaveAccessibleName('Master')
 await page.locator('.explorer-tile').focus();await page.keyboard.press('Enter')
 const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible()
 await expect(dialog.locator('.master-cell svg')).toHaveCount(9)
 const code=dialog.locator('textarea');await expect(code).toHaveValue(/fill="currentColor" stroke="none"/)
 const download=page.waitForEvent('download');await dialog.getByRole('link',{name:locale?'下載 SVG':'Download SVG',exact:true}).click()
 const svg=await readFile((await(await download).path())!,'utf8')
 expect(svg).toContain('Brand artwork: Master');expect(svg).toContain(await code.inputValue())
 await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible()
 await search.fill('推特');await expect(page.locator('.explorer-tile')).toHaveCount(1)
 for(const [query,label]of [['蝦皮','Shopee'],['狄卡','Dcard'],['amazon web services','AWS']]){
  await search.fill(query);await expect(page.locator('.explorer-tile')).toHaveCount(1);await expect(page.locator('.explorer-tile')).toHaveAccessibleName(label)
 }
 await search.fill('Discord');await page.locator('.explorer-tile').click()
 await expect(code).toHaveValue(/<path /)
 await page.keyboard.press('Escape')
 for(const theme of ['light','dark']){
  await page.setViewportSize({width:1440,height:1000})
  await page.getByRole('combobox',{name:locale?'外觀':'Theme',exact:true}).selectOption(theme)
  await page.setViewportSize({width:390,height:844})
  expect(await page.evaluate(()=>document.documentElement.scrollWidth)).toBe(390)
  await expect(page.locator('.explorer-tile')).toBeVisible()
  await page.screenshot({path:`work/brands-source/site-${locale?'tw':'en'}-${theme}.png`,fullPage:true})
 }
 expect(errors).toEqual([])
})
