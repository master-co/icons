import {expect, test} from '@playwright/test'
import {readFile} from 'node:fs/promises'
import studio from '../../packages/icons/src/studio-scope.json' with {type:'json'}
import workbench from '../../packages/icons/src/workbench-scope.json' with {type:'json'}

const batches = [
  ...['interface', 'canvas', 'editor'].map((family, i) => ({label: 'studio ' + family, entries: studio.slice(i * 36, (i + 1) * 36)})),
  ...['interface', 'canvas', 'editor'].map((family, i) => ({label: 'workbench ' + family, entries: workbench.slice(i * 34, (i + 1) * 34)})),
]

for (const {label, entries} of batches) {
  test(`${label} commands have searchable names and nine downloadable masters`, async ({page}) => {
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
