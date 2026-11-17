import assert from 'node:assert/strict';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { h as vueElement } from 'vue';
import { renderToString as renderVue } from 'vue/server-renderer';
import { h as preactElement } from 'preact';
import { render as renderPreact } from 'preact-render-to-string';
import { render as renderSvelte } from 'svelte/server';
import { experimental_AstroContainer } from 'astro/container';
import { bundle, importBundle, repo } from './framework-build.mjs';

export async function checkPackedFrameworks(consumer) {
  const frameworkNames = ['vue', 'preact', 'svelte', 'astro'];
  const source = frameworkNames.flatMap(framework => [
    `export { SearchIcon as ${framework} } from '@master/icons-${framework}';`,
    `export { SearchIcon as ${framework}Fixed } from '@master/icons-${framework}/16/soft';`,
  ]).join('\n');
  const icons = await importBundle(await bundle(source, { resolveDir: consumer }));
  const astro = await experimental_AstroContainer.create();
  const renderers = {
    vue: component => renderVue(vueElement(component, { size: 32, label: 'Search' })),
    preact: component => renderPreact(preactElement(component, { size: 32, label: 'Search' })),
    svelte: async component => (await renderSvelte(component, { props: { size: 32, label: 'Search' } })).body,
    astro: component => astro.renderToString(component, { props: { size: 32, label: 'Search' } }),
  };
  for (const framework of frameworkNames) {
    for (const fixed of [false, true]) {
      const html = await renderers[framework](icons[`${framework}${fixed ? 'Fixed' : ''}`]);
      assert.match(html, new RegExp(`viewBox="0 0 ${fixed ? 16 : 24} ${fixed ? 16 : 24}"`));
      assert.match(html, /aria-label="Search"/);
      assert.match(html, /width="32"/);
    }
  }

  // Real Astro + Svelte consumer: exercise package exports and framework tooling,
  // including Svelte client compilation, against the extracted npm archive.
  await mkdir(resolve(consumer, 'src/pages'), { recursive: true });
  await writeFile(resolve(consumer, 'astro.config.mjs'), `
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
export default defineConfig({ integrations: [svelte()], devToolbar: { enabled: false } });
`);
  await writeFile(resolve(consumer, 'src/Consumer.svelte'), `
<script>
  import { SearchIcon } from '@master/icons-svelte';
  import { ArrowRightIcon } from '@master/icons-svelte/16/soft';
</script>
<SearchIcon size={20} corner="rounded" label="Svelte search" />
<ArrowRightIcon size={32} direction="rtl" />
`);
  await writeFile(resolve(consumer, 'src/pages/index.astro'), `
---
import { SearchIcon } from '@master/icons-astro';
import { ArrowRightIcon } from '@master/icons-astro/16/soft';
import Consumer from '../Consumer.svelte';
---
<html lang="en"><head><title>Framework package smoke test</title></head><body>
<SearchIcon size={20} corner="rounded" label="Astro search" class:list={['icon', { active: true }]} />
<ArrowRightIcon size={32} direction="rtl" />
<Consumer client:load />
</body></html>
`);
  execFileSync(process.execPath, [resolve(repo, 'node_modules/astro/bin/astro.mjs'), 'build', '--root', consumer], {
    cwd: consumer, stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 4 * 1024 * 1024,
    env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
  });
  const html = await readFile(resolve(consumer, 'dist/index.html'), 'utf8');
  assert.match(html, /aria-label="Astro search"/);
  assert.match(html, /aria-label="Svelte search"/);
  assert.match(html, /class="icon active"/);
  assert.match(html, /translate\(16 0\) scale\(-1 1\)/);
  assert.match(html, /astro-island/);
  console.log('Packed Vue, Preact, Svelte and Astro: generic/fixed SSR and real Astro + Svelte consumer build passed.');
}
