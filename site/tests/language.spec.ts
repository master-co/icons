import {expect, test} from '@playwright/test'

test('the language selector accepts input once its navigation handler is ready', async ({page}) => {
  const {promise: scriptsReady, resolve: loadScripts} = Promise.withResolvers<void>()
  await page.route(/\.m?js(?:\?.*)?$/, async route => {
    await scriptsReady
    await route.continue()
  })

  const language = page.locator('footer').getByRole('combobox', {name: 'Language', exact: true})
  try {
    await page.goto('/guide/svg?from=language#svg', {waitUntil: 'commit'})
    await expect(language).toBeDisabled()
  } finally {
    loadScripts()
  }

  await expect(language).toBeEnabled()
  for (const [locale, lang] of [['tw','zh-TW'],['ja','ja'],['ko','ko'],['cn','zh-CN'],['en','en']]) {
    const select=page.locator('footer select').filter({has:page.locator('option[value="tw"]')})
    await select.selectOption(locale)
    const prefix=locale==='en'?'':'/'+locale
    await expect(page).toHaveURL(url=>url.pathname===prefix+'/guide/svg' && url.search==='?from=language' && url.hash==='#svg')
    await expect(page.locator('html')).toHaveAttribute('lang',lang)
  }
})

test('localized names and wrapped identifiers stay centered in the icon grid', async ({page})=>{
  await page.goto('/tw/icons?q=align-objects')
  const tile=page.locator('.explorer-tile[href="/tw/icons/align-objects-bottom"]')
  for (const width of [1440,390]) {
    await page.setViewportSize({width,height:900})
    await expect(tile.getByText('物件靠下',{exact:true})).toBeVisible()
    const offsets=await page.locator('.explorer-tile').evaluateAll(tiles=>tiles.flatMap(tile=>{
      const box=tile.getBoundingClientRect()
      const center=box.left+box.width/2
      return Array.from(tile.querySelectorAll('[lang],.explorer-name')).flatMap(label=>{
        const range=document.createRange()
        range.selectNodeContents(label)
        return Array.from(range.getClientRects(),line=>Math.abs(line.left+line.width/2-center))
      })
    }))
    expect(Math.max(...offsets)).toBeLessThan(1)
  }
})

test('translated names are searchable and link to the same localized drawing', async ({page})=>{
  for(const [locale,name] of [['ja','検索'],['ko','검색'],['cn','搜索']]){
    await page.goto(`/${locale}/icons`)
    const grid=page.getByTestId('icon-grid')
    const search=page.getByRole('searchbox')
    await expect(page.locator('astro-island[ssr]')).toHaveCount(0)
    await search.fill(name)
    const tile=grid.locator(`a[href="/${locale}/icons/search"]`)
    await expect(tile).toHaveAccessibleName(name)
    await tile.click()
    const detail=page.getByRole('dialog').getByRole('heading').getByRole('link')
    await expect(detail).toHaveAttribute('href',`/${locale}/icons/search`)
    await detail.click()
    await expect(page.getByRole('heading',{level:1})).toHaveText(name)
  }
})
