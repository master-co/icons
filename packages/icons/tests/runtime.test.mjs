import test from 'node:test';
import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { build } from 'esbuild';
import { renderSvg, resolveIcon, getOpticalSize, Search, ArrowRight, Calendar, FileText, Trash, Database, Square } from '../dist/index.js';
import { SearchIcon } from '@master/icons-react';
import { SearchIcon as SmallSearch } from '@master/icons-react/16/soft';
import { SearchIcon as DirectSearch } from '@master/icons-react/icons/search';
import { SearchIcon as DirectSmallSearch } from '@master/icons-react/16/soft/search';

test('optical selection has explicit boundaries and rejects invalid input',()=>{
  for(const [size,expected] of [[12,16],[16,16],[17.99,16],[18,20],[21.99,20],[22,24],[48,24]])assert.equal(getOpticalSize(size),expected);
  assert.equal(getOpticalSize(32,16),16);
  for(const size of [0,-1,NaN,Infinity,'16'])assert.throws(()=>getOpticalSize(size));
  assert.throws(()=>getOpticalSize(16,18));
  assert.throws(()=>resolveIcon(Search,{corner:'round'}));
  assert.throws(()=>renderSvg(Search,{direction:'auto'}));
});
test('dense small masters remove detail and corner profiles alter actual geometry',()=>{
  for(const icon of [Calendar,FileText,Trash,Database])assert.ok(icon.variants[16].soft.nodes.length<icon.variants[24].soft.nodes.length,icon.name);
  assert.equal(Square.variants[24].sharp.nodes[0][1].rx,0);
  assert.ok(Square.variants[24].soft.nodes[0][1].rx<Square.variants[24].rounded.nodes[0][1].rx);
});
test('SVG escaping, decorative defaults, and opt-in directional policy',()=>{
  assert.match(renderSvg(Search),/aria-hidden="true"/);
  const named=renderSvg(Search,{label:'A" <search> & B'});
  assert.match(named,/aria-label="A&quot; &lt;search&gt; &amp; B"/);
  assert.doesNotMatch(named,/aria-hidden/);
  assert.match(renderSvg(ArrowRight,{size:16,direction:'rtl'}),/translate\(16 0\) scale\(-1 1\)/);
  assert.doesNotMatch(renderSvg(Search,{direction:'rtl'}),/scale\(-1/);
});
test('React exports match SVG geometry, preserve a11y and consume design props',()=>{
  assert.equal(DirectSearch,SearchIcon);
  assert.equal(DirectSmallSearch,SmallSearch);
  const render=(component,props)=>renderToStaticMarkup(createElement(component,props));
  assert.equal(render(SearchIcon,{size:16}),render(SmallSearch));
  const markup=render(SearchIcon,{size:20,corner:'rounded',opticalSize:16,'aria-label':'搜尋',className:'icon'});
  assert.match(markup,/viewBox="0 0 16 16"/);
  assert.match(markup,/width="20"/);
  assert.match(markup,/role="img"/);
  assert.doesNotMatch(markup,/aria-hidden|opticalSize|corner=/);
  const children=svg=>svg.slice(svg.indexOf('>')+1,svg.lastIndexOf('</svg>')).replace(/><\/(circle|line|path|rect|ellipse)>/g,'/>');
  assert.equal(children(render(SearchIcon,{size:16})),children(renderSvg(Search,{size:16})));
});
test('static React imports tree shake unrelated icons and unused optical masters',async()=>{
  const result=await build({stdin:{contents:"export { SearchIcon } from '@master/icons-react/16/soft';",resolveDir:process.cwd()},bundle:true,format:'esm',minify:true,write:false,metafile:true,external:['react']});
  const retained=Object.values(result.metafile.outputs)[0].inputs;
  assert.ok(Object.keys(retained).some(x=>x.endsWith('/16/soft/search.js')));
  assert.ok(!Object.keys(retained).some(x=>x.endsWith('/calendar.js')||x.endsWith('/data/search.js')||x.includes('/24/')));
  assert.doesNotMatch(result.outputFiles[0].text,/getOpticalSize|Missing |variants/);
  assert.ok(result.outputFiles[0].contents.length<5000);
});
