import {test, expect} from '@playwright/test'
import {readFile} from 'node:fs/promises'

const commands = [
  ['toggleHeaderCell', 'table-header-cell', '表頭儲存格'],
  ['goToPreviousCell', 'table-cell-previous', '上一個儲存格'],
  ['insertInlineMath', 'inline-math', '行內公式'],
  ['insertBlockMath', 'block-math', '區塊公式'],
  ['acceptSuggestion', 'accept-change', '接受修訂'],
  ['acceptAllSuggestions', 'accept-all-changes', '接受全部修訂'],
  ['unresolveThread', 'message-reopen', '重新開啟討論'],
]

for (const locale of ['', '/tw']) {
  test(`writing controls can be found and downloaded by Tiptap command in ${locale || '/en'}`, async ({page}) => {
    await page.goto(`${locale}/icons?size=16&corner=rounded`)
    await expect(page.locator('astro-island[ssr]')).toHaveCount(0)
    const search = page.getByRole('searchbox', {name: locale ? '搜尋圖示' : 'Search icons', exact: true})
    for (const [query, name, label] of commands) {
      await search.fill(query)
      await page.getByRole('button', {name: locale ? label : name.replaceAll('-', ' '), exact: true}).click()
      const dialog = page.getByRole('dialog')
      await expect(dialog.locator('.master-cell svg')).toHaveCount(9)
      const expected = await dialog.locator('textarea').inputValue()
      const event = page.waitForEvent('download')
      await dialog.getByRole('link', {name: locale ? '下載 SVG' : 'Download SVG', exact: true}).click()
      const file = await event
      expect(file.suggestedFilename()).toBe(name + '.svg')
      expect(await readFile((await file.path())!, 'utf8')).toContain(expected)
      await page.keyboard.press('Escape')
    }
  })
}
