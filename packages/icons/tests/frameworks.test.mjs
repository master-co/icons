import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { h as vueElement } from 'vue';
import { renderToString as renderVue } from 'vue/server-renderer';
import { h as preactElement } from 'preact';
import { render as renderPreact } from 'preact-render-to-string';
import { render as renderSvelte } from 'svelte/server';
import { experimental_AstroContainer } from 'astro/container';
import { Search, ArrowRight, Ticket, DatabaseBackup, renderSvg } from '../dist/index.js';
import { bundle, importBundle } from './helpers/framework-build.mjs';

const sizes = [16, 20, 24];
const corners = ['sharp', 'soft', 'rounded'];
const definitions = { Search, ArrowRight, Ticket, DatabaseBackup };
const normalize = html => html.replace(/<!--[\s\S]*?-->/g, '').replace(/\s*>\s*</g, '><').trim()
  .replace(/><\/(circle|line|path|rect|ellipse)>/g, '/>');
const geometry = html => {
  const svg = normalize(html);
  return svg.slice(svg.indexOf('>') + 1, svg.lastIndexOf('</svg>'));
};

for (const framework of ['vue', 'preact', 'svelte', 'astro']) {
  test(`${framework}: public entry, all fixed masters, SSR geometry, accessibility and isolation`, async () => {
    const native = framework === 'svelte' || framework === 'astro';
    const root = dirname(fileURLToPath(import.meta.resolve(`@master/icons-${framework}`)));
    let entry = `export { SearchIcon, ArrowRightIcon, TicketIcon, DatabaseBackupIcon } from '@master/icons-${framework}';\n`;
    entry += `export { SearchIcon as PublicFixed } from '@master/icons-${framework}/16/soft';\n`;
    entry += `export { ${native?'default':'SearchIcon'} as Direct } from '@master/icons-${framework}/icons/search';\n`;
    entry += `export { ${native?'default':'SearchIcon'} as DirectFixed } from '@master/icons-${framework}/16/soft/search';\n`;
    for (const size of sizes) for (const corner of corners) {
      const path = resolve(root, `${size}/${corner}/search.${native ? framework : 'js'}`);
      entry += `export { ${native ? 'default' : 'SearchIcon'} as Fixed${size}${corner} } from ${JSON.stringify(path)};\n`;
    }
    const result = await bundle(entry);
    const icons = await importBundle(result);
    const astro = framework === 'astro' ? await experimental_AstroContainer.create() : null;
    const render = async (component, props = {}) => {
      if (framework === 'vue') return renderVue(vueElement(component, props));
      if (framework === 'preact') return renderPreact(preactElement(component, props));
      if (framework === 'svelte') return (await renderSvelte(component, { props })).body;
      return astro.renderToString(component, { props });
    };

    for (const [name, definition] of Object.entries(definitions)) {
      for (const size of sizes) for (const corner of corners) {
        const props = { size, corner };
        const html = await render(icons[`${name}Icon`], props);
        assert.equal(geometry(html), geometry(renderSvg(definition, props)), `${name}/${size}/${corner}`);
        assert.match(html, new RegExp(`viewBox="0 0 ${size} ${size}"`));
      }
    }
    for (const size of sizes) for (const corner of corners) {
      const html = await render(icons[`Fixed${size}${corner}`], { size: 40 });
      assert.equal(geometry(html), geometry(renderSvg(Search, { size: 40, opticalSize: size, corner })));
      assert.match(html, /width="40"/);
      assert.match(html, new RegExp(`viewBox="0 0 ${size} ${size}"`));
    }
    assert.equal(normalize(await render(icons.PublicFixed)), normalize(await render(icons.Fixed16soft)));
    assert.equal(normalize(await render(icons.Direct)), normalize(await render(icons.SearchIcon)));
    assert.equal(normalize(await render(icons.DirectFixed)), normalize(await render(icons.PublicFixed)));
    assert.match(await render(icons.SearchIcon), /aria-hidden="true"/);
    const props = { size: 32, opticalSize: 16, corner: 'rounded', 'aria-label': 'Search', class: 'icon', 'data-test': 'search' };
    const named = await render(icons.SearchIcon, props);
    assert.match(named, /viewBox="0 0 16 16"/);
    assert.match(named, /width="32"/);
    assert.match(named, /role="img"/);
    assert.match(named, /class="icon"/);
    assert.match(named, /data-test="search"/);
    assert.doesNotMatch(named, /aria-hidden|opticalSize|corner=|direction=|master=/);
    assert.doesNotMatch(await render(icons.SearchIcon, { 'aria-labelledby': 'caption' }), /aria-hidden/);
    const escaped = await render(icons.SearchIcon, { label: 'A" <search> & B' });
    assert.match(escaped, /&quot;/);
    assert.match(escaped, /&amp;/);
    assert.match(await render(icons.ArrowRightIcon, { size: 16, direction: 'rtl' }), /translate\(16 0\) scale\(-1 1\)/);
    assert.doesNotMatch(await render(icons.SearchIcon, { direction: 'rtl' }), /scale\(-1/);
    if (framework === 'vue') {
      assert.match(await render(icons.SearchIcon, { 'optical-size': 16 }), /viewBox="0 0 16 16"/);
    }

    const fixed = await bundle(`export { SearchIcon } from '@master/icons-${framework}/16/soft';`);
    const retained = Object.keys(Object.values(fixed.metafile.outputs)[0].inputs);
    assert.ok(retained.some(path => path.includes('/data/16/soft/search.js')));
    assert.ok(!retained.some(path => /\/data\/search.js$|\/calendar\.|\/24\/|\/20\//.test(path)));
    assert.doesNotMatch(fixed.outputFiles[0].text, /Missing |variants|opticalSizes/);
    const imports = Object.values(fixed.metafile.outputs)[0].imports.map(item => item.path);
    for (const other of ['react', 'vue', 'preact', 'svelte', 'astro'].filter(name => name !== framework)) {
      assert.ok(!imports.some(path => path === other || path.startsWith(`${other}/`)), `unexpected dependency: ${other}`);
    }
    if (framework === 'svelte') {
      const client = await bundle(`export { SearchIcon } from '@master/icons-svelte/16/soft';`, { browser: true });
      assert.doesNotMatch(client.outputFiles[0].text, /Missing |variants|opticalSizes/);
    }
  });
}
