import {expect, test} from '@playwright/test'
import {readFile} from 'node:fs/promises'
import scope from '../../packages/icons/src/studio-scope.json' with {type:'json'}

for (const [index, family] of ['interface', 'canvas', 'editor'].entries()) {
  test(`studio ${family} commands have searchable names and nine downloadable masters`, async ({page}) => {
    const entries = scope.slice(index * 36, (index + 1) * 36)
    await page.goto('/icons?size=16')
    await expect(page.locator('astro-island[ssr]')).toHaveCount(0)
    const search = page.getByRole('searchbox', {name: 'Search icons', exact: true})
    for (const {name} of entries) {
      await search.fill(name)
      await page.getByRole('button', {name: name.replaceAll('-', ' '), exact: true}).click()
      const dialog = page.getByRole('dialog')
      await expect(dialog.locator('.master-cell svg')).toHaveCount(9)
      const source = await page.request.get(`/icons/16/soft/${name}.svg`)
      expect(source.ok()).toBe(true)
      expect(await source.text()).toContain(await dialog.locator('textarea').inputValue())
      await page.keyboard.press('Escape')
    }
  })
}

test('studio synonyms open the same SVG in both explorer languages', async ({page}) => {
  for (const [base, query, label, button] of [
    ['', 'exclusive-or', 'boolean exclude', 'Download SVG'],
    ['/tw', '排除重疊', '布林排除', '下載 SVG'],
  ]) {
    await page.goto(`${base}/icons?size=16&q=${encodeURIComponent(query)}`)
    await page.getByRole('button', {name: label, exact: true}).click()
    const dialog = page.getByRole('dialog')
    const pending = page.waitForEvent('download')
    await dialog.getByRole('link', {name: button, exact: true}).click()
    const download = await pending
    expect(download.suggestedFilename()).toBe('boolean-exclude.svg')
    expect(await readFile((await download.path())!, 'utf8')).toContain(await dialog.locator('textarea').inputValue())
  }
})
