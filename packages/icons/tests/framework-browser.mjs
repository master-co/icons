import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToString as reactSSR } from 'react-dom/server';
import { ArrowRightIcon as ReactArrow, BellOffIcon as ReactBell } from '@master/icons-react';
import { SearchIcon as ReactFixed } from '@master/icons-react/16/soft';
import { createServer } from 'node:http';
import { chromium } from '@playwright/test';
import { h as vueElement } from 'vue';
import { renderToString as renderVue } from 'vue/server-renderer';
import { h as preactElement } from 'preact';
import { render as renderPreact } from 'preact-render-to-string';
import { render as renderSvelte } from 'svelte/server';
import { ArrowRightIcon as VueArrow, BellOffIcon as VueBell } from '@master/icons-vue';
import { SearchIcon as VueFixed } from '@master/icons-vue/16/soft';
import { ArrowRightIcon as PreactArrow, BellOffIcon as PreactBell } from '@master/icons-preact';
import { SearchIcon as PreactFixed } from '@master/icons-preact/16/soft';
import { ArrowRight, renderSvg } from '../dist/index.js';
import { bundle, importBundle } from './helpers/framework-build.mjs';

const initial = { size: 16, label: 'Next', class: 'icon' };
const fixture = new URL('./native/Browser.svelte', import.meta.url).pathname;
const entries = {
  react: `
    import { createElement as h, createRef } from 'react';
    import { hydrateRoot } from 'react-dom/client';
    import { flushSync } from 'react-dom';
    import { ArrowRightIcon, BellOffIcon } from '@master/icons-react';
    import { SearchIcon as Fixed } from '@master/icons-react/16/soft';
    const ref = createRef();
    const tree = ({class:className,...rest}) => { const options={...rest,className}; return h('div', null, [h(ArrowRightIcon, {...options, key:'arrow', ref, onClick:()=>window.clicks++}), h(Fixed,{size:40,key:'fixed'}), h(BellOffIcon,{...options,key:'bell1'}), h(BellOffIcon,{...options,key:'bell2'})]); };
    const root = hydrateRoot(document.querySelector('#app'), tree(${JSON.stringify(initial)}));
    window.icons = {update: next => flushSync(()=>root.render(tree(next))), getElement:()=>ref.current};
  `,
  vue: `
    import { createSSRApp, h, reactive, nextTick } from 'vue';
    import { ArrowRightIcon, BellOffIcon } from '@master/icons-vue';
    import { SearchIcon as Fixed } from '@master/icons-vue/16/soft';
    const options = reactive(${JSON.stringify(initial)});
    const app = createSSRApp({ render: () => h('div', [
      h(ArrowRightIcon, { ...options, onClick: () => window.clicks++ }), h(Fixed, { size: 40 }), h(BellOffIcon, options), h(BellOffIcon, options)
    ]) });
    app.mount('#app');
    window.icons = { update: async next => {
      for (const key of Object.keys(options)) delete options[key];
      Object.assign(options, next); await nextTick();
    }, getElement: () => document.querySelector('svg') };
  `,
  preact: `
    import { h, hydrate, render, createRef } from 'preact';
    import { ArrowRightIcon, BellOffIcon } from '@master/icons-preact';
    import { SearchIcon as Fixed } from '@master/icons-preact/16/soft';
    const ref = createRef();
    const target = document.querySelector('#app');
    const tree = options => h('div', null, [h(ArrowRightIcon, { ...options, ref, onClick: () => window.clicks++ }), h(Fixed, { size: 40 }), h(BellOffIcon, options), h(BellOffIcon, options)]);
    hydrate(tree(${JSON.stringify(initial)}), target);
    window.icons = { update: next => render(tree(next), target), getElement: () => ref.current };
  `,
  svelte: `
    import { hydrate, tick } from 'svelte';
    import Consumer from ${JSON.stringify(fixture)};
    const instance = hydrate(Consumer, { target: document.querySelector('#app'), props: { onclick: () => window.clicks++ } });
    window.icons = { update: async next => { instance.update(next); await tick(); }, getElement: () => instance.getElement() };
  `,
};

for (const framework of Object.keys(entries)) {
  test(`${framework}: hydrate, update geometry, forward events and preserve SVG refs`, async () => {
    let html;
    if (framework === 'react') { const {class:className,...rest}=initial; const reactInitial={...rest,className}; html = reactSSR(createElement('div', null, [createElement(ReactArrow, {...reactInitial,key:'arrow'}), createElement(ReactFixed,{size:40,key:'fixed'}), createElement(ReactBell,{...reactInitial,key:'bell1'}), createElement(ReactBell,{...reactInitial,key:'bell2'})])); }
    if (framework === 'vue') html = await renderVue(vueElement('div', [vueElement(VueArrow, initial), vueElement(VueFixed, { size: 40 }), vueElement(VueBell, initial), vueElement(VueBell, initial)]));
    if (framework === 'preact') html = renderPreact(preactElement('div', null, [preactElement(PreactArrow, initial), preactElement(PreactFixed, { size: 40 }), preactElement(PreactBell, initial), preactElement(PreactBell, initial)]));
    if (framework === 'svelte') {
      const { default: Consumer } = await importBundle(await bundle(`export { default } from ${JSON.stringify(fixture)};`));
      html = (await renderSvelte(Consumer)).body;
    }
    const client = await bundle(`window.clicks = 0; ${entries[framework]}`, { browser: true, external: false });
    const server = createServer((req, res) => {
      res.setHeader('Content-Type', req.url === '/client.js' ? 'application/javascript' : 'text/html');
      res.end(req.url === '/client.js' ? client.outputFiles[0].text : `<!doctype html><div id="app">${html}</div><script>window.originalSvg = document.querySelector('svg')</script><script type="module" src="/client.js"></script>`);
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    let browser;
    try {
      browser = await chromium.launch();
      const page = await browser.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (['error', 'warning'].includes(message.type())) errors.push(message.text()); });
      await page.goto(`http://127.0.0.1:${server.address().port}`);
      await page.waitForFunction(() => window.icons?.getElement() instanceof SVGSVGElement, undefined, { timeout: 5000 });
      assert.deepEqual(errors, []);
      assert.equal(await page.evaluate(() => window.icons.getElement() instanceof SVGSVGElement), true, 'SVG ref must resolve after hydration');
      assert.equal(await page.evaluate(() => window.originalSvg === document.querySelector('svg')), true, 'hydration must reuse SVG');
      const svg = page.locator('svg').first();
      assert.equal(await svg.getAttribute('class'), 'icon');
      assert.equal(await svg.getAttribute('viewBox'), '0 0 16 16');
      await svg.click();
      assert.equal(await page.evaluate(() => window.clicks), 1);
      const options = { size: 32, opticalSize: 20, corner: 'rounded', direction: 'rtl', color: 'red', strokeWidth: 2, 'aria-labelledby': 'caption', class: 'updated' };
      await page.evaluate(next => window.icons.update(next), options);
      assert.equal(await svg.getAttribute('viewBox'), '0 0 20 20');
      assert.equal(await svg.getAttribute('width'), '32');
      assert.equal(await svg.getAttribute('color'), 'red');
      assert.equal(await svg.getAttribute('aria-hidden'), null);
      assert.equal(await svg.getAttribute('aria-label'), null);
      assert.equal(await svg.getAttribute('aria-labelledby'), 'caption');
      assert.equal(await svg.getAttribute('class'), 'updated');
      assert.equal(await svg.locator(':scope > g').getAttribute('transform'), 'translate(20 0) scale(-1 1)');
      const expected = renderSvg(ArrowRight, options).match(/<path d="([^"]+)"/)[1];
      assert.equal(await svg.locator('path').first().getAttribute('d'), expected);
      assert.equal(await svg.locator('path').first().evaluate(element => element.namespaceURI), 'http://www.w3.org/2000/svg');
      assert.equal(await page.locator('svg').nth(1).getAttribute('viewBox'), '0 0 16 16');
      assert.equal(await page.locator('svg').nth(1).getAttribute('width'), '40');
      assert.equal(await page.evaluate(() => window.icons.getElement() === document.querySelector('svg')), true);
      await svg.click();
      assert.equal(await page.evaluate(() => window.clicks), 2);
      assert.equal(await svg.getAttribute('stroke-width'), '2');
      const maskState = async () => page.evaluate(() => {
        const icons = [...document.querySelectorAll('svg')].slice(2);
        const ids = icons.flatMap(icon => [...icon.querySelectorAll('[id]')].map(node => node.id));
        return {ids, unique: new Set(ids).size === ids.length, valid: icons.every(icon => [...icon.querySelectorAll('*')].every(node => node.namespaceURI === 'http://www.w3.org/2000/svg') && [...icon.querySelectorAll('[mask]')].every(node => [...icon.querySelectorAll('[id]')].some(target => `url(#${target.id})` === node.getAttribute('mask'))))};
      });
      const before = await maskState();
      assert.ok(before.ids.length >= 2); assert.ok(before.unique); assert.ok(before.valid);
      await page.evaluate(next => window.icons.update({...next}), options);
      assert.deepEqual(await maskState(), before, 'mask scopes stay stable on repeated updates');
      await page.evaluate(() => window.icons.update({ size: 24 }));
      assert.equal(await svg.getAttribute('aria-hidden'), 'true');
      assert.equal(await svg.locator(':scope > g').count(), 0);
      assert.equal(await svg.getAttribute('viewBox'), '0 0 24 24');
      assert.deepEqual(errors, []);
    } finally {
      await browser?.close();
      await new Promise(resolve => server.close(resolve));
    }
  });
}
