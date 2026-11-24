import {test, expect} from '@playwright/test'
import {readFile} from 'node:fs/promises'
// A copied SVG leads with only its third-party notice; files carry the full license header. Compare drawings.
const drawing=(text:string)=>text.slice(text.indexOf('<svg')).trim()

const commands = [
  ['toggleHeaderCell', 'table', '表格'],
  ['goToPreviousCell', 'arrow-left', '向左'],
  ['insertInlineMath', 'function-square', '函數'],
  ['insertBlockMath', 'function-square', '函數'],
  ['acceptSuggestion', 'check', '確認'],
  ['acceptAllSuggestions', 'check', '確認'],
  ['unresolveThread', 'rotate-left', '向左旋轉'],
]

for (const locale of ['', '/tw']) {
  test(`writing controls can be found and downloaded by Tiptap command in ${locale || '/en'}`, async ({page}) => {
    await page.goto(`${locale}/icons?size=16&corner=rounded`)
    await expect(page.locator('astro-island[ssr]')).toHaveCount(0)
    const search = page.getByRole('searchbox', {name: locale ? '搜尋圖示' : 'Search icons', exact: true})
    for (const [query, name, label] of commands) {
      await search.fill(query)
      await page.getByTestId('icon-grid').getByRole('link', {name: locale ? label : name.replaceAll('-', ' '), exact: true}).click()
      const dialog = page.getByRole('dialog')
      await expect(dialog.locator('.master-cell svg')).toHaveCount(9)
      const expected = drawing(await dialog.locator('textarea').inputValue())
      const event = page.waitForEvent('download')
      await dialog.getByRole('link', {name: locale ? '下載 SVG' : 'Download SVG', exact: true}).click()
      const file = await event
      expect(file.suggestedFilename()).toBe(name + '.svg')
      expect(await readFile((await file.path())!, 'utf8')).toContain(expected)
      await page.keyboard.press('Escape')
    }
  })
}
