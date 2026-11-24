import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {catalog} from '../src/catalog.mjs';
import {renderSvg} from '../src/runtime.mjs';

const json=async p=>JSON.parse(await readFile(p));
const hash=x=>createHash('sha256').update(x).digest('hex');
const root='docs/review/navigation-01';
const defs=await json('packages/icons/dist/definitions.json');
const review=await json(`${root}/decisions.json`);

test('navigation-01 preserves every previous drawing outside its exact reviewed change set',async()=>{
  const scope=await json(`${root}/change-scope.json`),raw=await readFile(scope.baseline),before=JSON.parse(raw);
  assert.equal(hash(raw),scope.baselineSha256);
  assert.deepEqual(scope.added.toSorted(),['chevrons-down','chevrons-up']);
  assert.deepEqual(scope.modified.toSorted(),['chevrons-left','chevrons-right']);
  const nextInventory=await json('references/navigation-big-01/inventory-before.json');
  assert.deepEqual(Object.keys(nextInventory).sort(),[...Object.keys(before),...scope.added].sort());
  assert.deepEqual(Object.keys(before).filter(n=>hash(JSON.stringify(before[n].variants))!==nextInventory[n]).sort(),scope.modified.toSorted());
  assert.equal(Object.keys(before).length,scope.previousCount);
  assert.equal(Object.keys(nextInventory).length,scope.currentCount);
  const evidence=new Set();
  for(const item of review.items){
    assert.equal(hash(JSON.stringify(defs[item.name].variants)),item.visualReview.variantsSha256,item.name);
    assert.equal(item.status,'visually-reviewed-candidate');
    const saved=await json(`${root}/${item.visualReview.batch}-final/definitions.json`);
    assert.deepEqual(saved[item.name].variants,defs[item.name].variants,item.name);
    for(const ref of item.visualReview.evidence){
      if(evidence.has(ref.path))continue;
      assert.equal(hash(await readFile(ref.path)),ref.sha256,ref.path);evidence.add(ref.path);
    }
  }
});

test('direction variants are discoverable in navigation and share semantic families',()=>{
  const entries=new Map(catalog.map(x=>[x.name,x]));
  for(const item of review.items)if(item.name!=='sort-unsorted')assert.equal(entries.get(item.name).category,'navigation',item.name);
  for(const group of [
    ['arrow-right','arrow-left','arrow-up','arrow-down','arrow-up-right','arrow-up-left','arrow-down-right','arrow-down-left'],
    ['chevron-right','chevron-left','chevron-up','chevron-down'],
    ['chevrons-right','chevrons-left','chevrons-up','chevrons-down'],
    ['arrow-right-to-line','arrow-left-to-line','arrow-up-to-line','arrow-down-to-line'],
    ['move-horizontal','move-vertical','move-diagonal-up-right','move-diagonal-down-right'],
    ['arrow-big-up','arrow-big-right','arrow-big-down','arrow-big-left'],['chevrons-up-down','chevrons-left-right'],
  ])for(const name of group)assert.equal(entries.get(name).concept,entries.get(group[0]).concept,name);
  for(const direction of ['up','down']){
    const name=`chevrons-${direction}`;
    assert.ok(entries.get(name).keywords.includes(`page-${direction}`));
    assert.ok(!entries.get(`chevron-${direction}`).keywords.includes(name),'double-chevron query must not redirect to a single step');
    assert.equal(renderSvg(defs[name],{direction:'rtl'}),renderSvg(defs[name]),'vertical paging is fixed in RTL');
  }
  assert.ok(entries.get('sort-unsorted').keywords.includes('arrow-up-down'));
  assert.ok(!entries.has('arrow-up-down'),'existing vertical exchange drawing is reused');
});


test('wide arrows preserve the previous inventory and expose four reviewed physical directions',async()=>{
  const root='docs/review/navigation-big-01';
  const scope=await json(`${root}/change-scope.json`),raw=await readFile(scope.baselineInventory),before=JSON.parse(raw);
  assert.equal(hash(raw),scope.baselineSha256);
  assert.deepEqual(scope.added.toSorted(),['arrow-big-left','arrow-big-right']);
  const readingBefore=await json('references/reading-documents-01/master-before.json');
  assert.deepEqual(Object.keys(defs).sort(),[...Object.keys(before),...scope.added,'bars','book-read','contract'].sort());
  const current=name=>name==='menu'?'bars':name;
  const changed=Object.keys(before).filter(name=>hash(JSON.stringify(defs[current(name)].variants))!==before[name]);
  assert.deepEqual(changed.sort(),['file-text','home','images']);
  for(const name of changed)assert.equal(hash(JSON.stringify(readingBefore[name].variants)),before[name],name);
  const saved=await json(`${root}/01-wide-arrows-final/definitions.json`);
  const decisions=await json(`${root}/decisions.json`);
  const evidence=new Set();
  for(const item of decisions.items){
    assert.deepEqual(saved[item.name].variants,defs[item.name].variants);
    assert.equal(hash(JSON.stringify(defs[item.name].variants)),item.visualReview.variantsSha256);
    assert.equal(renderSvg(defs[item.name],{direction:'rtl'}),renderSvg(defs[item.name]));
    for(const ref of item.visualReview.evidence){
      if(evidence.has(ref.path))continue;
      assert.equal(hash(await readFile(ref.path)),ref.sha256,ref.path);evidence.add(ref.path);
    }
  }
  for(const direction of ['left','right']){
    const wide=catalog.find(x=>x.name===`arrow-big-${direction}`),ordinary=catalog.find(x=>x.name===`arrow-${direction}`);
    assert.equal(wide.category,'navigation');
    assert.ok(wide.keywords.includes(`block-arrow-${direction}`));
    assert.ok(!ordinary.keywords.includes(`arrow-big-${direction}`));
  }
});

test('menu exposes two independent horizontal paths at every native size',()=>{
  assert.equal(catalog.find(entry=>entry.name==='bars').concept,'menu');
  for(const size of [16,20,24])for(const corner of ['sharp','soft','rounded']){
    const paths=defs.menu.variants[size][corner].nodes;
    assert.equal(paths.length,2);
    for(const [tag,{d}] of paths){
      assert.equal(tag,'path');
      assert.match(d,/^M[\d.]+ ([\d.]+)L[\d.]+ \1$/);
    }
  }
});
