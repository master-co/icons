import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {catalog} from '../src/catalog.mjs';
import * as icons from '../dist/react/index.js';
import {renderSvg} from '../dist/runtime.js';
const defs=JSON.parse(await readFile('dist/definitions.json'));
const children=svg=>svg.slice(svg.indexOf('>')+1,svg.lastIndexOf('</svg>')).replace(/><\/(circle|line|path|rect|ellipse)>/g,'/>');
test('all named React exports match authored SVG for every optical and corner master',()=>{
 for(const entry of catalog)for(const size of [16,20,24])for(const corner of ['sharp','soft','rounded']){
  const markup=renderToStaticMarkup(createElement(icons[entry.component],{size,corner}));
  assert.equal(children(markup),children(renderSvg(defs[entry.name],{size,corner})),`${entry.name}/${size}/${corner}`);
 }
});
test('RTL changes only the approved navigation set, preserving geometry transforms',()=>{
 const mirrors=new Set(['arrow-left','arrow-right','chevron-left','chevron-right','chevrons-left','chevrons-right','undo','redo']);
 for(const entry of catalog){const ltr=renderSvg(defs[entry.name]),rtl=renderSvg(defs[entry.name],{direction:'rtl'});assert.equal(ltr!==rtl,mirrors.has(entry.name),entry.name);}
});
test('original 48 native masters retain the latest pre-expansion refinements exactly',async()=>{
 const before=JSON.parse(await readFile('references/ui-v1/master-before.json'));
 for(const [name,definition]of Object.entries(before))assert.deepEqual(defs[name].variants,definition.variants,name);
});
test('real semantic paint effects survive SVG and React across all sizes',()=>{
 for(const size of[16,20,24]){
  const ticket=renderSvg(defs.ticket,{size}),area=renderSvg(defs['chart-area'],{size});
  assert.match(renderSvg(defs['file-archive'],{size}),/stroke-dasharray=/);
  assert.match(ticket,/stroke-dasharray=/);assert.match(area,/opacity="0.2"/);
  assert.doesNotMatch(ticket+area,/<defs|gradient|mask/);
 }
});

test('the previous 210 drawings remain unchanged in the organization batch',async()=>{
 const before=JSON.parse(await readFile('references/organization-01/master-before.json'));
 assert.equal(Object.keys(before).length,210);
 for(const [name,definition]of Object.entries(before))assert.deepEqual(defs[name],definition,name);
});

test('all previous 220 definitions remain unchanged in the productivity batch',async()=>{
 const before=JSON.parse(await readFile('references/productivity-01/master-before.json'));
 assert.equal(Object.keys(before).length,220);
 for(const [name,definition]of Object.entries(before))assert.deepEqual(defs[name],definition,name);
});

test('every productivity drawing appears in a labelled product scenario',async()=>{
 const scope=JSON.parse(await readFile('src/productivity-scope.json'));
 const {scenarios,scenarioMarkup}=await import('../preview/scenarios.js');
 const used=new Set();
 for(const[id]of scenarios)scenarioMarkup(name=>{assert.ok(defs[name],name);used.add(name);return '<svg></svg>';},id);
 for(const{name}of scope)assert.ok(used.has(name),'Missing real-context placement: '+name);
});
