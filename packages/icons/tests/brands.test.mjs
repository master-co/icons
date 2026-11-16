import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {unzipSync,strFromU8} from 'fflate';
import brands from '../src/brands.json' with {type:'json'};
import {brandCatalog} from '../src/brands.mjs';
import {catalog} from '../src/catalog.mjs';
import {draw} from '../src/drawings.mjs';
import {context} from '../src/geometry.mjs';
import {renderSvg} from '../src/runtime.mjs';
const defs=JSON.parse(await readFile('packages/icons/dist/definitions.json'));

test('requested additions are exported and only the explicit ChatGPT identity alias shares geometry',()=>{
 const names=['openai','chatgpt','microsoft','linkedin','slack','cursor','supabase','vite',"vue-js","javascript","bun","github-copilot","hugging-face","aws","firebase","postgresql","microsoft-teams","outlook","google-meet","canva","dribbble","wordpress","dcard","shopee"].map(n=>'brand-'+n);
 for(const name of names)assert.ok(defs[name],name);
 assert.deepEqual(defs['brand-chatgpt'].variants,defs['brand-openai'].variants);
 assert.equal(catalog.find(b=>b.name==='brand-chatgpt').concept,'brand-openai');
 assert.equal(new Set(brands.map(b=>JSON.stringify(defs[b.name].variants))).size,87);
 for(const b of brands.slice(64))for(const size of [16,20,24]){
  assert.ok(b.optical[size].extent>0 && b.optical[size].extent<=size-2,b.name+': native whitespace');
 }
});

test('88 named brands retain their pinned source contours and discoverable metadata',async()=>{
 assert.equal(brands.length,88);
 assert.equal(new Set(brands.map(b=>b.name)).size,88);
 assert.ok(brands.some(b=>b.name==='brand-master'));
 for(const b of brands){
  const original=await readFile(b.source.localPath);
  assert.equal(createHash('sha256').update(original).digest('hex'),b.source.sha256,b.name);
  for(const path of b.paths)assert.ok(original.toString().includes(`d="${path}"`),b.name+': contour is from preserved source');
  if(b.source.originalPath)assert.equal(createHash('sha256').update(await readFile(b.source.originalPath)).digest('hex'),b.source.originalSha256,b.name+': original raster');
  const entry=brandCatalog.find(e=>e.name===b.name);
  assert.equal(entry.direction,'fixed');assert.equal(entry.category,'brands');
  assert.ok(entry.keywords.includes(b.label));
 }
});

test('brand silhouettes preserve identity under corner, stroke and RTL controls',()=>{
 for(const b of brands)for(const size of [16,20,24]){
  const expected=draw(b.name,context(size,'soft'));
  assert.deepEqual(expected.map(([,a])=>a.d),b.paths,b.name+': compact SVG number grammar must survive exactly');
  for(const corner of ['sharp','soft','rounded'])for(const stroke of [.75,1.25,2.5]){
   const actual=draw(b.name,{...context(size,corner),stroke,variableStroke:true});
   assert.deepEqual(actual,expected,`${b.name}/${size}/${corner}/${stroke}`);
   for(const [tag,a]of actual){assert.equal(tag,'path');assert.equal(a.fill,'currentColor');assert.equal(a.stroke,'none');}
  }
  assert.equal(renderSvg(defs[b.name],{size}),renderSvg(defs[b.name],{size,direction:'rtl'}),b.name);
  assert.match(renderSvg(defs[b.name],{size,label:b.label}),/role="img"/);
 }
});

test('single SVGs, catalog and all nine downloadable archives preserve brand provenance',async()=>{
 const catalog=JSON.parse(await readFile('packages/icons/dist/catalog.json'));
 for(const b of brands){
  const entry=catalog.icons.find(e=>e.name===b.name);
  assert.equal(entry.source.sha256,b.source.sha256,b.name);
  assert.equal(entry.source.kind,b.source.kind);
 }
 for(const size of [16,20,24])for(const corner of ['sharp','soft','rounded']){
  const zip=unzipSync(await readFile(`packages/icons/dist/downloads/master-icons-${size}-${corner}.zip`));
  assert.ok(zip['licenses/simple-icons-CC0.txt']);assert.ok(zip['licenses/simple-icons-DISCLAIMER.md']);assert.ok(zip['licenses/openai-brand.txt']);assert.ok(zip['licenses/brand-additions.txt']);
  for(const b of brands){
   const svg=await readFile(`packages/icons/icons/${size}/${corner}/${b.name}.svg`,'utf8');
   assert.equal(strFromU8(zip[b.name+'.svg']),svg);
   assert.ok(svg.includes(b.source.reference));assert.match(svg,/does not grant trademark rights/);
  }
 }
});

test('new brand artwork terms and trace provenance survive single-file exports',async()=>{
 for(const name of ['javascript','github-copilot','vue-js','microsoft-teams','outlook','dcard']){
  const svg=await readFile('packages/icons/icons/16/soft/brand-'+name+'.svg','utf8');
  assert.match(svg,/licenses\/brand-additions.txt/);
  if(name==='javascript')assert.match(svg,/Christopher Williams/);
  if(name==='github-copilot')assert.match(svg,/Copyright/);
  if(name==='vue-js')assert.match(svg,/Evan You/);
  if(name==='dcard')assert.match(svg,/Not the original vector master/);
 }
});
