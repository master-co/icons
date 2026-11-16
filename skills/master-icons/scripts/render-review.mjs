#!/usr/bin/env node
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';

const help = `Usage: node render-review.mjs --repo PATH --out PATH [--icons search,calendar] [--baseline PATH_TO_OLD_DIST] [--engine chromium|webkit|firefox]
Reads built Master Icons data. Outputs offline HTML, native light/dark PNGs at DPR 1/2, zoom/context PNGs and raster metrics. Does not build, install dependencies or edit source.`;
const args = process.argv.slice(2), options = {};
if (args.includes('--help')) { console.log(help); process.exit(0); }
for (let i = 0; i < args.length; i += 2) {
  const key = args[i]?.replace(/^--/, '');
  if (!['repo', 'out', 'icons', 'baseline', 'engine'].includes(key) || !args[i + 1] || args[i + 1].startsWith('--')) throw new Error(help);
  options[key] = args[i + 1];
}
if (!options.repo || !options.out) throw new Error(help);
const repo = resolve(options.repo), out = resolve(options.out);
const engineName = options.engine || 'chromium';
if (!['chromium', 'webkit', 'firefox'].includes(engineName)) throw new Error('Unsupported engine');
const readJson = async file => JSON.parse(await readFile(file, 'utf8'));
async function readBuild(dir) {
  try {
    const [catalog, definitions] = await Promise.all([readJson(join(dir, 'catalog.json')), readJson(join(dir, 'definitions.json'))]);
    return { catalog, definitions };
  } catch (error) { throw new Error(`Cannot read a Master Icons build in ${dir}. Run the repository build first. ${error.message}`); }
}
const current = await readBuild(join(repo, 'dist'));
const baseline = options.baseline ? await readBuild(resolve(options.baseline)) : null;
const names = [...new Set(options.icons ? options.icons.split(',').filter(Boolean) : current.catalog.pilot || current.catalog.icons.slice(0, 12).map(x => x.name))];
if (!names.length) throw new Error('Select at least one icon');
const { sizes, corners } = current.catalog;
for (const name of names) {
  for (const [label, build] of [['current', current], ...(baseline ? [['baseline', baseline]] : [])]) {
    if (!build.definitions[name]) throw new Error(`${label} is missing icon ${name}`);
    for (const size of sizes) for (const corner of corners) if (!build.definitions[name].variants[size]?.[corner]) throw new Error(`${label} is missing ${name}/${size}/${corner}`);
  }
}
const builtAt = (await stat(join(repo, 'dist/definitions.json'))).mtimeMs;
for (const file of ['src/drawings.mjs', 'src/geometry.mjs', 'src/catalog.mjs', 'src/runtime.mjs']) {
  if ((await stat(join(repo, file))).mtimeMs > builtAt) throw new Error(`${file} is newer than dist. Build before capturing review evidence.`);
}
const { renderSvg } = await import(pathToFileURL(join(repo, 'dist/runtime.js')).href);
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const versions = [...(baseline ? [['A', baseline]] : []), ['B', current]];
const glyph = (build, name, size, corner, display = size) => renderSvg(build.definitions[name], { size: display, opticalSize: size, corner });
const heading = `<h1>Master Icons · geometry review</h1><p>${baseline ? 'A = saved baseline · B = current' : 'B = current; no baseline supplied'} · ${names.length} concepts · native CSS pixels</p>`;
const sheets = [];
for (let start = 0; start < names.length; start += 12) {
  const batch = names.slice(start, start + 12);
  sheets.push(`<section data-sheet="native-${1 + start / 12}">${heading}<div class="grid">${batch.map(name => `<article><h2>${escape(name)}</h2><div class="row labels"><span></span>${sizes.map(s => `<span>${s}px</span>`).join('')}</div>${corners.map(corner => versions.map(([label, build]) => `<div class="row"><span>${label} · ${escape(corner)}</span>${sizes.map(s => `<div>${glyph(build, name, s, corner)}</div>`).join('')}</div>`).join('')).join('')}</article>`).join('')}</div></section>`);
}
sheets.push(`<section data-sheet="zoom">${heading}<h2>4× geometry inspection — not native-size evidence</h2><div class="grid">${names.map(name => `<article><h2>${escape(name)} · soft 16px × 4</h2><div class="zoom">${versions.map(([label, build]) => `<div><small>${label}</small>${glyph(build, name, 16, 'soft', 64)}</div>`).join('')}</div></article>`).join('')}</div></section>`);
sheets.push(`<section data-sheet="context">${heading}<h2>Native icon + real text · soft</h2><div class="grid">${names.map(name => `<article><h2>${escape(name)}</h2>${versions.map(([label, build]) => sizes.map(s => `<div class="text-example" style="font-size:${s === 16 ? 14 : s === 20 ? 16 : 18}px"><small>${label} ${s}px</small>${glyph(build, name, s, 'soft')}<span>專案 Project</span></div>`).join('')).join('')}</article>`).join('')}</div></section>`);
const html = `<!doctype html><html lang="zh-Hant" data-theme="light"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Master Icons review</title><style>
:root{color-scheme:light;--bg:#fafafa;--panel:#fff;--ink:#242426;--muted:#66666d;--border:#d8d8dc}html[data-theme=dark]{color-scheme:dark;--bg:#141416;--panel:#1c1c1f;--ink:#e9e9ed;--muted:#a0a0aa;--border:#39393f}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:14px/20px system-ui,sans-serif}nav{padding:16px 28px;display:flex;gap:16px}button{font:inherit;padding:8px 12px}section{padding:28px;width:1132px;max-width:100%;margin:auto}h1{font-size:22px;line-height:28px;letter-spacing:-.5px;margin:0 0 12px}p{margin:0 0 16px}p,small,.labels{color:var(--muted)}.grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}article{padding:16px;border:1px solid var(--border);border-radius:10px;background:var(--panel)}h2{font:12px/16px ui-monospace,monospace;margin:0 0 12px}.row{display:grid;grid-template-columns:86px repeat(${sizes.length},1fr);height:38px;align-items:center}.row>span{font:10px ui-monospace,monospace}.row>div{display:flex;align-items:center;justify-content:center}.labels{height:24px;text-align:center}svg{display:block;flex-shrink:0}.zoom{display:flex;gap:32px}.zoom small{display:block;margin-bottom:12px}.text-example{display:flex;gap:10px;align-items:center;height:40px}.text-example small{font:10px ui-monospace,monospace;min-width:38px}@media(max-width:720px){.grid{grid-template-columns:1fr}section{width:390px}}@media print{nav{display:none}section{break-after:page}}
</style><nav><button id="theme">Toggle light / dark</button><span>100% browser zoom · no CSS icon scaling</span></nav>${sheets.join('')}<script>document.getElementById('theme').onclick=()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==='light'?'dark':'light'};</script></html>`;
await mkdir(out, { recursive: true });
await writeFile(join(out, 'review.html'), html);
const report = { generatedAt: new Date().toISOString(), repo, baseline: options.baseline ? resolve(options.baseline) : null, names, sizes, corners, engine: engineName, browserVersion: null, screenshots: [], raster: [], sourceHashes: {}, status: 'html-only' };
for (const file of ['dist/catalog.json', 'dist/definitions.json', 'dist/runtime.js']) report.sourceHashes[file] = createHash('sha256').update(await readFile(join(repo, file))).digest('hex');
const saveReport = () => writeFile(join(out, 'report.json'), JSON.stringify(report, null, 2) + '\n');
let browser;
try {
  const requireFromRepo = createRequire(join(repo, 'package.json'));
  const playwright = requireFromRepo('@playwright/test');
  browser = await playwright[engineName].launch();
  report.browserVersion = browser.version();
  for (const dpr of [1, 2]) {
    const page = await browser.newPage({ viewport: { width: 1140, height: 1000 }, deviceScaleFactor: dpr });
    await page.setContent(html);
    await page.evaluate(() => document.fonts.ready);
    const layoutFailures = await page.locator('[data-sheet^="native-"] svg').evaluateAll(nodes => nodes.filter(node => {
      const box = node.getBoundingClientRect(), native = Number(node.getAttribute('width'));
      return Math.abs(box.width - native) > .001 || Math.abs(box.height - native) > .001 ||
        Math.abs(box.x * devicePixelRatio - Math.round(box.x * devicePixelRatio)) > .001 ||
        Math.abs(box.y * devicePixelRatio - Math.round(box.y * devicePixelRatio)) > .001;
    }).map(node => node.outerHTML));
    if (layoutFailures.length) throw new Error(`Native review placement is scaled or off the device grid (${layoutFailures.length} glyphs)`);
    for (const theme of ['light', 'dark']) {
      await page.evaluate(theme => { document.documentElement.dataset.theme = theme; }, theme);
      for (const section of await page.locator('[data-sheet]').all()) {
        const name = await section.getAttribute('data-sheet');
        const file = `${name}-${theme}-${dpr}x.png`;
        await section.screenshot({ path: join(out, file) });
        report.screenshots.push({ file, section: name, theme, dpr, magnification: name === 'zoom' ? 4 : 1 });
      }
    }
    const cases = versions.flatMap(([version, build]) => names.flatMap(name => sizes.flatMap(size => corners.map(corner => ({ version, name, size, corner, svg: glyph(build, name, size, corner) })))));
    const metrics = await page.evaluate(async cases => {
      const dpr = devicePixelRatio, pad = 4, results = [];
      for (const { svg, ...item } of cases) {
        const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
        if (doc.querySelector('parsererror')) throw new Error('Invalid SVG: ' + item.name);
        const root = doc.documentElement, extent = (item.size + pad * 2) * dpr;
        root.setAttribute('viewBox', `-${pad} -${pad} ${item.size + pad * 2} ${item.size + pad * 2}`);
        root.setAttribute('width', extent); root.setAttribute('height', extent); root.setAttribute('color', '#000');
        const img = new Image(); img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(doc)); await img.decode();
        const canvas = document.createElement('canvas'); canvas.width = canvas.height = extent;
        const context = canvas.getContext('2d'); context.drawImage(img, 0, 0);
        const pixels = context.getImageData(0, 0, extent, extent).data;
        let minX = Infinity, minY = Infinity, maxX = -1, maxY = -1, mass = 0, momentX = 0, momentY = 0;
        for (let y = 0; y < extent; y++) for (let x = 0; x < extent; x++) {
          const alpha = pixels[(y * extent + x) * 4 + 3] / 255;
          mass += alpha; momentX += (x + .5) * alpha; momentY += (y + .5) * alpha;
          if (alpha > 8 / 255) { minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y); }
        }
        results.push({ ...item, dpr, empty: mass === 0, clipped: mass > 0 && (minX < pad * dpr || minY < pad * dpr || maxX >= (item.size + pad) * dpr || maxY >= (item.size + pad) * dpr), bounds: mass ? [minX / dpr - pad, minY / dpr - pad, (maxX + 1) / dpr - pad, (maxY + 1) / dpr - pad] : null, inkArea: mass / (dpr * dpr), inkCentroid: mass ? [momentX / mass / dpr - pad, momentY / mass / dpr - pad] : null });
      }
      return results;
    }, cases);
    report.raster.push(...metrics);
    await page.close();
  }
  const defects = report.raster.filter(x => x.empty || x.clipped);
  report.status = defects.length ? 'structural-defects-found' : 'captured-visual-review-required';
  await saveReport();
  console.log(`${report.screenshots.length} screenshots; ${report.raster.length} raster cases; ${defects.length} empty/clipped. Inspect images: ${out}`);
  if (defects.length) process.exitCode = 1;
} catch (error) {
  report.status = 'capture-failed'; report.error = error.message; await saveReport();
  console.error(`HTML preserved at ${join(out, 'review.html')}; visual capture unverified. ${error.message}`);
  process.exitCode = 1;
} finally { if (browser) await browser.close(); }
