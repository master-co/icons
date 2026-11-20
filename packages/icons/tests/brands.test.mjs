import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {unzipSync,strFromU8} from 'fflate';
import {brands,brandCatalog,brandEnvelopes} from '../src/brands.mjs';
import {catalog} from '../src/catalog.mjs';
import {draw} from '../src/drawings.mjs';
import {context,specifications,reviewedStroke} from '../src/geometry.mjs';
import {renderSvg,strokeRanges} from '../src/runtime.mjs';
const defs=JSON.parse(await readFile('packages/icons/dist/definitions.json'));

test('requested additions are exported and only the explicit ChatGPT identity alias shares geometry',()=>{
 const names=['openai','chatgpt','microsoft','linkedin','slack','cursor','supabase','vite',"vue-js","javascript","bun","github-copilot","hugging-face","aws","firebase","postgresql","microsoft-teams","outlook","google-meet","canva","dribbble","wordpress","dcard","shopee"].map(n=>'brand-'+n);
 for(const name of names)assert.ok(defs[name],name);
 assert.deepEqual(defs['brand-chatgpt'].variants,defs['brand-openai'].variants);
 assert.equal(catalog.find(b=>b.name==='brand-chatgpt').concept,'brand-openai');
 assert.equal(catalog.find(b=>b.name==='brand-wechat-outline').concept,'brand-wechat');
 assert.equal(new Set(brandCatalog.map(b=>b.aliasOf || b.styleOf || b.name)).size,88);
 assert.equal(new Set(brands.map(b=>JSON.stringify(defs[b.name].variants))).size,brands.length-1);
 for(const b of brands.slice(64))for(const size of [16,20,24]){
  const extent=b.optical?.[size]?.extent??brandEnvelopes[b.profile][[16,20,24].indexOf(size)];
  assert.ok(extent>0 && extent<=size-2,b.name+': native whitespace');
 }
});

test('brand exports retain their pinned source contours and discoverable metadata',async()=>{
 assert.equal(brands.filter(b=>b.styleOf).length,18);
 assert.equal(new Set(brands.map(b=>b.name)).size,brands.length);
 assert.ok(brands.some(b=>b.name==='brand-master'));
 for(const b of brands){
  const original=await readFile(b.source.localPath);
  assert.equal(createHash('sha256').update(original).digest('hex'),b.source.sha256,b.name);
  if(b.name==='brand-html5'){
   const paths=[...original.toString().matchAll(/<path\b[^>]*\bd="([^"]+)"/g)].map(m=>m[1].replace(/\s+/g,' '));
   assert.equal(paths.length,6,'Official source has four wordmark paths and two shield paths');
   assert.deepEqual(b.paths,[paths.slice(4).join(' ')],'HTML5 only joins original shield paths without redrawing');
  }else for(const path of b.paths)assert.ok(original.toString().includes(`d="${path}"`),b.name+': contour is from preserved source');
  if(b.source.originalPath)assert.equal(createHash('sha256').update(await readFile(b.source.originalPath)).digest('hex'),b.source.originalSha256,b.name+': original artwork');
  if(b.source.authoringPath)assert.equal(createHash('sha256').update(await readFile(b.source.authoringPath)).digest('hex'),b.source.authoringSha256,b.name+': editable source');
  for(const optical of b.source.opticalSources??[]){
   const svg=await readFile(optical.path,'utf8');
   assert.equal(createHash('sha256').update(svg).digest('hex'),optical.sha256,b.name+': optical source');
   assert.equal(b.outlineSvgs[optical.size],svg,b.name+': native authoring geometry');
  }
  if(b.source.identitySource)assert.equal(createHash('sha256').update(await readFile(b.source.identitySource.localPath)).digest('hex'),b.source.identitySource.sha256,b.name+': original brand reference');
  const entry=brandCatalog.find(e=>e.name===b.name);
  if(b.fillRule)assert.equal(b.fillRule,'evenodd',b.name+': baked rings require evenodd ink');
  assert.equal(entry.direction,'fixed');assert.equal(entry.category,'brands');
  assert.ok(entry.keywords.includes(b.label));
 }
});

test('original marks stay fixed while outlines vary weight without changing brand corners or RTL',()=>{
 for(const b of brands)for(const size of [16,20,24]){
  const expected=draw(b.name,context(size,'soft'));
  if(!b.styleOf)assert.deepEqual(expected.map(([,a])=>a.d),b.paths,b.name+': compact SVG number grammar must survive exactly');
  assert.deepEqual(defs[b.name].variants[size].soft.nodes,draw(b.name,{...context(size,'soft'),stroke:reviewedStroke[size]}),b.name+': review snapshot must match the drawing at its reviewed weight');
  for(const corner of ['sharp','soft','rounded'])for(const stroke of [strokeRanges[size][0],specifications[size].stroke,strokeRanges[size][1]]){
   const actual=draw(b.name,{...context(size,corner),stroke,variableStroke:true});
   if(!b.styleOf||stroke===specifications[size].stroke)assert.deepEqual(actual,expected,`${b.name}/${size}/${corner}/${stroke}`);
   else{
    assert.notDeepEqual(actual,expected,b.name+': outline weight must change the actual ink');
    assert.deepEqual(actual,draw(b.name,{...context(size,'soft'),stroke,variableStroke:true}),b.name+': brand corners stay fixed');
   }
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
   if(b.source.licenseFile)assert.equal(strFromU8(zip[b.source.licenseFile]),await readFile(b.source.licenseFile,'utf8'),b.name+': exact brand license in ZIP');
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


test('outlines appear directly in the list and only identity aliases are deduplicated', async()=>{
 const {collectionCards}=await import('../../../scripts/lib/collection-cards.mjs');
 const cards=collectionCards(brandCatalog);
 assert.equal(cards.length,106);
 const expected=['wechat','github','gitlab','discord','youtube','facebook','linkedin','mastodon','reddit','spotify','soundcloud','pinterest','tiktok','twitch','vimeo','patreon','telegram','line'];
 assert.deepEqual(brands.filter(b=>b.styleOf).map(b=>b.styleOf).sort(),expected.map(n=>'brand-'+n).sort());
 for(const slug of expected){
  const name='brand-'+slug,outline=name+'-outline';
  const card=cards.find(b=>b.name===name);
  assert.equal(card.outline.name,outline);
  assert.equal(card.outline.component,brandCatalog.find(b=>b.name===outline).component);
  const outlineCard=cards.find(b=>b.name===outline);
  assert.equal(outlineCard.mark.name,name);
  assert.equal(outlineCard.outline.name,outline);
  assert.equal(card.keywords.includes(outline),false,'exact outline search must not also match its mark');
  assert.notDeepEqual(defs[name].variants,defs[outline].variants);
  assert.equal(catalog.find(b=>b.name===outline).concept,name);
  for(const size of [16,20,24])for(const corner of ['sharp','soft','rounded']){
   const output=renderSvg(defs[outline],{size,corner});
   const b=brands.find(b=>b.name===outline);
   if(b.fillRule)assert.match(output,/fill-rule="evenodd"/);
  }
 }
 assert.equal(cards.filter(c=>c.keywords.includes('ChatGPT')).length,1);
 assert.equal(cards.find(c=>c.name==='brand-master').outline,undefined,'Master keeps its original mark only');
 assert.equal(defs['brand-master-outline'],undefined);
});

test('inside brand ink preserves exterior bounds and the transparent centre',async()=>{
 const {bakeBrandSvg}=await import('../../../scripts/lib/brand-ink.mjs');
 const {pathKit:P}=await import('../src/occlusion.mjs');
 const {d,fillRule,bounds}=bakeBrandSvg('<svg fill="none" stroke="currentColor" stroke-width="2"><path data-ink="inside" d="M2 2H22V22H2Z"/></svg>');
 assert.deepEqual(bounds,[2,2,20,20]);
 const ink=P.FromSVGString(d);
 try{
  if(fillRule==='evenodd')ink.setFillType(P.FillType.EVENODD);
  const hasInk=(x,y)=>{
   const probe=P.FromSVGString(`M${x-.1} ${y-.1}h.2v.2h-.2Z`),overlap=ink.copy();
   try{overlap.op(probe,P.PathOp.INTERSECT);return overlap.toSVGString()!==''}
   finally{overlap.delete();probe.delete()}
  };
  assert.equal(hasInk(1,12),false,'ink cannot expand the brand silhouette');
  assert.equal(hasInk(3,12),true,'inside edge remains visible');
  assert.equal(hasInk(12,12),false,'the centre remains transparent');
 }finally{ink.delete()}
});

test('outline knockout follows the expanded foreground ink at each weight',async()=>{
 const {bakeBrandSvg}=await import('../../../scripts/lib/brand-ink.mjs');
 const {pathKit:P}=await import('../src/occlusion.mjs');
 const svg='<svg fill="none" stroke="currentColor" stroke-width="2"><path id="back" d="M2 10H22"/><path d="M12 5V15" data-cut="back" data-clearance="1"/></svg>';
 const hasInk=(ink,x,y)=>{
  const probe=P.FromSVGString(`M${x-.05} ${y-.05}h.1v.1h-.1Z`),overlap=ink.copy();
  try{overlap.op(probe,P.PathOp.INTERSECT);return overlap.toSVGString()!==''}
  finally{probe.delete();overlap.delete()}
 };
 for(const weight of [1,2]){
  const result=bakeBrandSvg(svg,{weight}),ink=P.FromSVGString(result.d);
  try{
   if(result.fillRule==='evenodd')ink.setFillType(P.FillType.EVENODD);
   assert.equal(hasInk(ink,12,10),true,'foreground must remain');
   assert.equal(hasInk(ink,8,10),true,'distant backdrop must remain');
   assert.equal(hasInk(ink,9.5,10),weight===1,'the cut moves with the foreground edge');
   assert.equal(hasInk(ink,weight===1?10.5:9.5,10),false,'clearance is genuinely transparent');
  }finally{ink.delete()}
 }
 const pinterest=brands.find(b=>b.name==='brand-pinterest-outline');
 assert.match(pinterest.outlineSvg,/data-cut="left-loop"/);
});
