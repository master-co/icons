import assert from 'node:assert/strict'
import { cp, mkdir, mkdtemp, readFile, readdir, realpath, rm, symlink, writeFile } from 'node:fs/promises'
import { dirname, join, relative, sep } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dev } from 'astro'
import { chromium, expect } from '@playwright/test'

// Edit an isolated consumer, never the working tree or the user's running server.
const repo = fileURLToPath(new URL('../../', import.meta.url))
// Astro's virtual-script IDs require the consumer and package sources to share a
// filesystem ancestor. Keep the disposable consumer under the ignored work dir.
await mkdir(join(repo, 'work'), { recursive: true })
const fixture = await realpath(await mkdtemp(join(repo, 'work/dev-hmr-')))
const site = join(fixture, 'site')
let server, browser, starts = 0, publicUpdates = 0
let restarting = Promise.resolve()
const times = {}
try {
  await cp(join(repo, 'site'), site, { recursive: true, filter: path => !['out', '.astro', 'public', 'node_modules', '.agents', 'tests'].includes(relative(join(repo, 'site'), path).split(sep)[0]) })
  await writeFile(join(fixture, 'package.json'), JSON.stringify({ private: true, type: 'module', workspaces: ['site'] }))
  await symlink(join(repo, 'node_modules'), join(fixture, 'node_modules'), 'dir')
  await symlink(join(repo, 'packages'), join(fixture, 'packages'), 'dir')
  await symlink(join(repo, 'scripts'), join(fixture, 'scripts'), 'dir')
  await mkdir(join(site, 'public'))
  for(const entry of await readdir(join(repo,'site/public'),{withFileTypes:true})){
    await symlink(join(repo,'site/public',entry.name),join(site,'public',entry.name),entry.isDirectory()?'dir':'file')
  }
  server = await dev({
    root: pathToFileURL(site + '/'), server: { host: '127.0.0.1', port: 0 }, logLevel: 'error',
    vite: { cacheDir: join(fixture, 'vite-cache'), plugins: [{
      name: 'test:dev-updates', configureServer(current) {
        starts++
        const restart = current.restart.bind(current)
        current.restart = (...args) => (restarting = restart(...args))
      },
      hotUpdate({file}) { if(file.startsWith(join(site,'public')+sep)) publicUpdates++ }
    }] }
  })
  const origin = `http://127.0.0.1:${server.address.port}`
  browser = await chromium.launch()
  const page = await browser.newPage()
  const errors = [], iconModules = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('request', request => { if (request.url().includes('/packages/icons/dist/data/')) iconModules.push(request.url()) })
  await page.addInitScript(() => performance.setResourceTimingBufferSize(4000))
  const hydrated = () => expect(page.locator('astro-island[ssr]')).toHaveCount(0)
  async function visit(path) { await page.goto(origin + path); await hydrated() }
  async function edit(path, change) {
    const file = join(site, path)
    const source = await readFile(file, 'utf8')
    const next = change(source)
    assert.notEqual(next, source, `Edit must change ${path}`)
    await writeFile(file, next)
  }
  let start = performance.now()
  await visit('/icons')
  times.coldIconsMs = Math.round(performance.now() - start)
  await expect(page.locator('.explorer-icon svg')).toHaveCount(96)
  const visibleModules=iconModules.filter(url=>!/(?:\/data\/16\/soft\/)(?:x|copy|download|check)\.js(?:\?|$)/.test(url))
  assert.ok(new Set(visibleModules).size <= 96, 'Explorer must load only visible artwork and its four fixed control icons')
  // Let first-use dependency discovery settle before testing edits.
  await visit('/icons')
  await visit('/icons')
  const initialStarts = starts
  start = performance.now()
  await edit('styles/icons.css', source => source + '\n@layer components { .explorer-name { letter-spacing: 3.25px; } }\n')
  await expect(page.locator('.explorer-name').first()).toHaveCSS('letter-spacing', '3.25px')
  times.cssUpdateMs = Math.round(performance.now() - start)
  assert.equal(starts, initialStarts, 'CSS must not restart Vite')

  start = performance.now()
  await edit('components/Explorer.svelte', source => source.replace('<section class="explorer"', '<section data-hmr-probe="updated" class="explorer"'))
  await expect(page.locator('[data-hmr-probe="updated"]')).toHaveCount(1)
  times.svelteUpdateMs = Math.round(performance.now() - start)
  assert.equal(starts, initialStarts, 'Svelte must not restart Vite')

  await visit('/')
  start = performance.now()
  await edit('content/page.astro', source => source.replace('Master Icons / {t(', 'Updated icons / {t('))
  await expect(page.locator('.home-hero .eyebrow')).toContainText('Updated icons')
  await hydrated()
  times.pageUpdateMs = Math.round(performance.now() - start)
  assert.equal(starts, initialStarts, 'Page edits must not restart Vite')

  await visit('/tw/guide/svg')
  start = performance.now()
  await edit('content/guide/svg/content.tw.mdx', source => source + '\n\nMDX hot update verified.\n')
  await expect(page.getByText('MDX hot update verified.', { exact: true })).toBeVisible()
  times.mdxUpdateMs = Math.round(performance.now() - start)
  assert.equal(starts, initialStarts, 'MDX body edits must not restart Vite')
  await edit('content/guide/svg/content.tw.mdx', source => source.replace('title: "SVG 與 JavaScript"', 'title: "更新後的 SVG 標題"'))
  await expect(page.locator('h1')).toContainText('更新後的 SVG 標題')
  assert.equal(starts, initialStarts, 'Localized frontmatter must refresh without restarting Vite')
  assert.deepEqual(errors, [], 'Ordinary edits must not race hydration with a server restart')

  // Generated assets must not create one HMR operation per SVG. Only the
  // completed generation message should refresh the page and its data cache.
  const generated=join(site,'public/generation-probe')
  await mkdir(generated)
  await page.evaluate(()=>sessionStorage.setItem('generationLoads','0'))
  await page.addInitScript(()=>sessionStorage.setItem('generationLoads',String(Number(sessionStorage.getItem('generationLoads')||0)+1)))
  await Promise.all(Array.from({length:500},(_,index)=>writeFile(join(generated,`${index}.svg`),'<svg xmlns="http://www.w3.org/2000/svg"/>')))
  await new Promise(resolve=>setTimeout(resolve,600))
  assert.equal(publicUpdates,0,'Generated public assets must bypass Vite HMR hooks')
  assert.equal(await page.evaluate(()=>sessionStorage.getItem('generationLoads')),'0')
  const loaded=page.waitForEvent('load')
  process.emit('message',{type:'master-icons:generated'})
  await loaded
  await hydrated()
  assert.equal(await page.evaluate(()=>sessionStorage.getItem('generationLoads')),'1','Completed generation must reload once')
  assert.equal(starts,initialStarts,'Asset generation must not restart Vite')
  const generatedResponse=await fetch(origin+'/generation-probe/0.svg')
  assert.equal(generatedResponse.status,200,'New generated files must be served without restarting')
  assert.match(await generatedResponse.text(),/<svg/)
  await rm(join(generated,'0.svg'))
  assert.equal((await fetch(origin+'/generation-probe/0.svg')).status,404,'Removed assets must not be served from a stale inventory')

  // Route inventory changes still rebuild Astro's cached static paths.
  await page.close()
  const status = async path => {
    const response = await fetch(origin + path, { signal: AbortSignal.timeout(10000) })
    await response.arrayBuffer()
    return response.status
  }
  const restartAfter = async action => {
    const previous = starts
    await action()
    await expect.poll(() => starts, { timeout: 15000 }).toBeGreaterThan(previous)
    await restarting
  }
  const translated = join(site, 'content/guide/svg/content.tw.mdx')
  const translatedSource = await readFile(translated, 'utf8')
  await restartAfter(() => writeFile(translated, translatedSource.replace('---\n', '---\ndraft: true\n')))
  await expect.poll(() => status('/tw/guide/svg'), { timeout: 15000 }).toBe(404)
  await restartAfter(() => writeFile(translated, translatedSource))
  await expect.poll(() => status('/tw/guide/svg'), { timeout: 15000 }).toBe(200)
  const added = join(site, 'content/icons/hmr-check/page.astro')
  await mkdir(dirname(added), { recursive: true })
  await restartAfter(() => writeFile(added, '<h1>New route verified</h1>'))
  await expect.poll(() => status('/icons/hmr-check'), { timeout: 15000 }).toBe(200)
  await restartAfter(() => rm(dirname(added), { recursive: true }))
  await expect.poll(() => status('/icons/hmr-check'), { timeout: 15000 }).toBe(404)
  console.log(JSON.stringify({ ...times, iconDataRequests: iconModules.length, ordinaryEditRestarts: 0, generatedAssetHmrEvents:publicUpdates, generatedAssetReloads:1, routeInventoryChecks: 'passed' }, null, 2))
} catch (error) {
  console.error(error)
  throw error
} finally {
  await browser?.close()
  await server?.stop()
  await rm(fixture, { recursive: true, force: true })
}
