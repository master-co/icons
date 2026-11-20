import assert from 'node:assert/strict';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { gzipSync } from 'node:zlib';
import { createElement as reactElement } from 'react';
import { renderToStaticMarkup as renderReact } from 'react-dom/server';
import { h as vueElement } from 'vue';
import { renderToString as renderVue } from 'vue/server-renderer';
import { h as preactElement } from 'preact';
import { render as renderPreact } from 'preact-render-to-string';
import { render as renderSvelte } from 'svelte/server';
import { experimental_AstroContainer } from 'astro/container';
import { bundle, importBundle, repo } from './framework-build.mjs';

export const frameworkNames = ['react', 'vue', 'preact', 'svelte', 'astro'];

export async function checkPackedNativeFrameworks(consumer) {
  const astro = await experimental_AstroContainer.create();
  const renderers = {
    react: (component, props) => renderReact(reactElement(component, props)),
    vue: (component, props) => renderVue(vueElement(component, props)),
    preact: (component, props) => renderPreact(preactElement(component, props)),
    svelte: async (component, props) => (await renderSvelte(component, { props })).body,
    astro: (component, props) => astro.renderToString(component, { props }),
  };

  const source = [];
  for (const framework of frameworkNames) {
    const pkg = `@master/icons-${framework}`;
    const path = `${pkg}/native/16/soft/search`;
    const native = await bundle(`export { default } from '${path}';`, { resolveDir: consumer });
    const fixed = await bundle(`export { ${framework === 'svelte' || framework === 'astro' ? 'default' : 'SearchIcon as default'} } from '${pkg}/16/soft/search';`, { resolveDir: consumer });
    const dataPaths = Object.keys(native.metafile.inputs)
      .map(input => input.replaceAll('\\', '/'))
      .filter(input => input.includes('/@master/icons/dist/data/'));
    assert.equal(dataPaths.length, 1, `${path} must use only its native geometry`);
    assert.ok(dataPaths[0].endsWith('/data/native/16/soft/search.js'), dataPaths[0]);
    assert.doesNotMatch(native.outputFiles[0].text, /Unavailable strokeWidth/);
    const [nativeModule, fixedModule] = await Promise.all([importBundle(native), importBundle(fixed)]);
    const props = { size: 32, label: 'Search' };
    const nativeMarkup = await renderers[framework](nativeModule.default, { ...props, strokeWidth: 1.5 });
    const fixedMarkup = await renderers[framework](fixedModule.default, props);
    assert.equal(nativeMarkup, fixedMarkup, `${path} must produce the original drawing at its requested display size`);
    assert.match(nativeMarkup, /viewBox="0 0 16 16"/);
    assert.match(nativeMarkup, /aria-label="Search"/);
    assert.match(nativeMarkup, /stroke-width="1"/);
    assert.match(await renderers[framework](fixedModule.default, { ...props, strokeWidth: 1.5 }), /stroke-width="1.5"/);
    const gzipBytes = result => gzipSync(result.outputFiles[0].contents, { level: 9 }).length;
    const nativeBytes = gzipBytes(native);
    const fixedBytes = gzipBytes(fixed);
    assert.ok(nativeBytes < fixedBytes, `${path} must omit the optional strokes from the fixed bundle`);
    console.log(`${pkg} Search, minified and gzip: fixed ${fixedBytes} bytes, native ${nativeBytes} bytes.`);

    source.push(
      `import ${framework}Icon, { type NativeIconProps as ${framework}Props } from '${path}';`,
      `const ${framework}Valid: ${framework}Props = { size: 32, label: 'Search' };`,
      '// @ts-expect-error Native imports omit the custom width option.',
      `const ${framework}Stroke: ${framework}Props = { strokeWidth: 1.5 };`,
      '// @ts-expect-error Native props also omit the SVG stroke-width attribute.',
      `const ${framework}SvgStroke: ${framework}Props = { 'stroke-width': 1.5 };`,
      '// @ts-expect-error Only names in the icon catalog resolve.',
      `import ${framework}Typo from '${pkg}/native/16/soft/serach';`,
    );
  }
  const typeFile = resolve(consumer, 'native-icons.mts');
  await writeFile(typeFile, source.join('\n') + '\n');
  for (const [module, resolution] of [['ESNext', 'Bundler'], ['NodeNext', 'NodeNext']]) {
    execFileSync(process.execPath, [
      resolve(repo, 'node_modules/typescript/bin/tsc'), '--noEmit', '--strict',
      '--skipLibCheck', '--module', module, '--moduleResolution', resolution, typeFile,
    ], { cwd: consumer, stdio: 'inherit' });
  }
  console.log('All five packed native adapters render and resolve exact TypeScript entry names.');
}

export async function checkPackedFrameworks(consumer) {
  const frameworkNames = ['vue', 'preact', 'svelte', 'astro'];
  const source = frameworkNames.flatMap(framework => [
    `export { SearchIcon as ${framework}, BellOffIcon as ${framework}Masked } from '@master/icons-${framework}';`,
    `export { SearchIcon as ${framework}Fixed } from '@master/icons-${framework}/16/soft';`,
  ]).join('\n');
  const icons = await importBundle(await bundle(source, { resolveDir: consumer }));
  const astro = await experimental_AstroContainer.create();
  const renderers = {
    vue: (component, strokeWidth) => renderVue(vueElement(component, { size: 32, label: 'Search', strokeWidth })),
    preact: (component, strokeWidth) => renderPreact(preactElement(component, { size: 32, label: 'Search', strokeWidth })),
    svelte: async (component, strokeWidth) => (await renderSvelte(component, { props: { size: 32, label: 'Search', strokeWidth } })).body,
    astro: (component, strokeWidth) => astro.renderToString(component, { props: { size: 32, label: 'Search', strokeWidth } }),
  };
  for (const framework of frameworkNames) {
    for (const fixed of [false, true]) {
      const html = await renderers[framework](icons[`${framework}${fixed ? 'Fixed' : ''}`]);
      assert.match(html, new RegExp(`viewBox="0 0 ${fixed ? 16 : 24} ${fixed ? 16 : 24}"`));
      assert.match(html, /aria-label="Search"/);
      assert.match(html, /width="32"/);
      const custom=await renderers[framework](icons[`${framework}${fixed ? 'Fixed' : ''}`],2);
      assert.match(custom,new RegExp(`stroke-width="${fixed?1.5:2}"`));
    }
    const masked=await renderers[framework](icons[framework+'Masked'],2);
    assert.match(masked,/<mask /);
    assert.doesNotMatch(masked,/strokeWidth=/);
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
  import { SearchIcon, BellOffIcon } from '@master/icons-svelte';
  import { ArrowRightIcon } from '@master/icons-svelte/16/soft';
  import NativeSearchIcon from '@master/icons-svelte/native/16/soft/search';
</script>
<SearchIcon size={20} corner="rounded" label="Svelte search" />
<NativeSearchIcon label="Svelte native search" />
<ArrowRightIcon size={32} direction="rtl" />
<BellOffIcon strokeWidth={2} />
`);
  await writeFile(resolve(consumer, 'src/pages/index.astro'), `
---
import { SearchIcon, BellOffIcon } from '@master/icons-astro';
import { ArrowRightIcon } from '@master/icons-astro/16/soft';
import NativeSearchIcon from '@master/icons-astro/native/16/soft/search';
import Consumer from '../Consumer.svelte';
---
<html lang="en"><head><title>Framework package smoke test</title></head><body>
<SearchIcon size={20} corner="rounded" label="Astro search" class:list={['icon', { active: true }]} />
<NativeSearchIcon label="Astro native search" />
<ArrowRightIcon size={32} direction="rtl" />
<BellOffIcon strokeWidth={2} />
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
  assert.match(html, /aria-label="Astro native search"/);
  assert.match(html, /aria-label="Svelte native search"/);
  assert.match(html, /class="icon active"/);
  assert.match(html, /translate\(16 0\) scale\(-1 1\)/);
  assert.match(html, /astro-island/);
  assert.match(html, /stroke-width="2"/);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
  assert.equal(new Set(ids).size,ids.length);
  console.log('Packed Vue, Preact, Svelte and Astro: generic/fixed SSR and real Astro + Svelte consumer build passed.');
}
