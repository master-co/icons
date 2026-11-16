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
test('original 48 names and all unreviewed masters remain compatible',async()=>{
 const original=JSON.parse(await readFile('references/ui-v1/master-before.json'));
 const baseline=JSON.parse(await readFile('references/craft-01/master-before.json'));
 for(const [name,definition]of Object.entries(original))assert.deepEqual(baseline[name].variants,definition.variants,name);
 for(const name of Object.keys(original))if(name!=='chart-bar')assert.deepEqual(defs[name].variants,original[name].variants,name);
 for(const size of[20,24])assert.deepEqual(defs['chart-bar'].variants[size],original['chart-bar'].variants[size]);
});
test('real semantic paint effects survive SVG and React across all sizes',()=>{
 for(const size of[16,20,24]){
  const ticket=renderSvg(defs.ticket,{size}),area=renderSvg(defs['chart-area'],{size});
  assert.match(renderSvg(defs['file-archive'],{size}),/stroke-dasharray=/);
  assert.match(ticket,/stroke-dasharray=/);assert.match(area,/opacity="0.2"/);
  assert.doesNotMatch(ticket+area,/<defs|gradient|mask/);
 }
});

test('the saved 280 baseline preserves the 210 drawings before organization',async()=>{
 const before=JSON.parse(await readFile('references/organization-01/master-before.json'));
 const baseline=JSON.parse(await readFile('references/craft-01/master-before.json'));
 assert.equal(Object.keys(before).length,210);
 for(const [name,definition]of Object.entries(before))assert.deepEqual(baseline[name],definition,name);
});

test('the saved 280 baseline preserves all 220 pre-productivity definitions',async()=>{
 const before=JSON.parse(await readFile('references/productivity-01/master-before.json'));
 const baseline=JSON.parse(await readFile('references/craft-01/master-before.json'));
 assert.equal(Object.keys(before).length,220);
 for(const [name,definition]of Object.entries(before))assert.deepEqual(baseline[name],definition,name);
});

test('only explicitly reviewed refinements differ from the complete baseline',async()=>{
 const firstPass=JSON.parse(await readFile('references/craft-02/master-before.json'));
 const rounds=[
  ['craft-01',firstPass,['chart-bar','contact','mouse-pointer','usb','accessibility','file-audio','file-archive','timer','user-cog','handshake','indent-increase','indent-decrease','megaphone','ticket']],
  ['craft-02',JSON.parse(await readFile('references/clearance-01/master-before.json')),['highlighter','phone-off']],
  ['clearance-01',JSON.parse(await readFile('references/layers-01/master-before.json')),['phone-off','mail-x','file-lock','folder-lock']],
  ['layers-01',defs,['layers']],
 ];
 for(const[cycle,after,names]of rounds){
  const before=JSON.parse(await readFile(`references/${cycle}/master-before.json`));
  const decisions=JSON.parse(await readFile(`docs/review/${cycle}/decisions.json`));
  const expected=names.sort();
  const changed=Object.keys(before).filter(name=>JSON.stringify(after[name])!==JSON.stringify(before[name])).sort();
  assert.deepEqual(changed,expected,cycle);
  assert.deepEqual(decisions.filter(x=>x.kind==='modified').map(x=>x.name).sort(),expected,cycle);
  for(const d of decisions)if(d.kind==='retained')assert.deepEqual(after[d.name],before[d.name],cycle+'/'+d.name);
 }
});

test('semantic perforations retain flat ends independently of frame corner styles',()=>{
 for(const name of['ticket','file-archive'])for(const size of[16,20,24])for(const corner of['sharp','soft','rounded']){
  const dashed=defs[name].variants[size][corner].nodes.filter(([,a])=>a['stroke-dasharray']);
  assert.equal(dashed.length,1);assert.equal(dashed[0][1]['stroke-linecap'],'butt');
  const markup=renderToStaticMarkup(createElement(icons[catalog.find(x=>x.name===name).component],{size,corner}));
  assert.match(markup,/stroke-linecap="butt"/);
 }
});

test('every productivity drawing appears in a labelled product scenario',async()=>{
 const scope=JSON.parse(await readFile('src/productivity-scope.json'));
 const {scenarios,scenarioMarkup}=await import('../preview/scenarios.js');
 const used=new Set();
 for(const[id]of scenarios)scenarioMarkup(name=>{assert.ok(defs[name],name);used.add(name);return '<svg></svg>';},id);
 for(const{name}of scope)assert.ok(used.has(name),'Missing real-context placement: '+name);
});
