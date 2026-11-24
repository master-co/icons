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
  await language.selectOption('tw')
  await expect(page).toHaveURL(/\/tw\/guide\/svg\?from=language#svg$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-TW')
  await page.locator('footer').getByRole('combobox', {name: '語言', exact: true}).selectOption('en')
  await expect(page).toHaveURL(/\/guide\/svg\?from=language#svg$/)
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
})
