import { mkdir, readFile, writeFile, readdir, cp, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { zipSync, strToU8 } from 'fflate';
import {contentCache,writeIfChanged} from '../../../scripts/lib/content-cache.mjs';
import {lockGeneration} from '../../../scripts/lib/generation-lock.mjs';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const repo=resolve(root,'../..');
process.chdir(root);
await lockGeneration(repo);
const {sizes,corners,context,specifications,reviewedStroke}=await import('../src/geometry.mjs');
const {publishedNodes}=await import('../src/simplify.mjs');
const {draw}=await import('../src/drawings.mjs');
const {catalog,pilot,categories,conceptCount}=await import('../src/catalog.mjs');
const {renderSvg,strokeWidths,strokeRanges}=await import('../src/runtime.mjs');
const {preservedNotices,adaptedSources}=await import('../src/provenance.mjs');
const {brandNotice}=await import('../src/brands.mjs');
const started=performance.now();
// Release/reproducibility builds remain unconditional; dev opts into this cache.
const cache=process.argv.includes('--cache')&&!process.env.TURBO_HASH ? await contentCache({
  inputs:['packages/icons/src','packages/icons/scripts','packages/icons/package.json','scripts/lib/content-cache.mjs','scripts/lib/generation-lock.mjs','scripts/lib/brand-ink.mjs','references/manifest.json','LICENSE','THIRD_PARTY_NOTICES.md','licenses','bun.lock'].map(path=>resolve(repo,path)),
  outputs:['dist','icons','LICENSE','THIRD_PARTY_NOTICES.md','licenses'].map(path=>resolve(root,path)),
  file:resolve(repo,'work/cache/icons.json'),force:process.argv.includes('--force')
}) : undefined;
if(cache?.hit){console.log(`Icons: content cache hit (${Math.round(performance.now()-started)}ms)`);process.exit(0);}
if(!cache)await rm(resolve(repo,'work/cache/icons.json'),{force:true});
const directories=new Set();
const emitted=new Set();
const incremental=cache||process.argv.includes('--incremental');
const archiveSvg=process.argv.includes('--archive-svg');
const put=async(path,body)=>{const file=resolve(root,path),dir=dirname(file);emitted.add(file);if(incremental){await writeIfChanged(file,body);return;}if(!directories.has(dir)){await mkdir(dir,{recursive:true});directories.add(dir);}await writeFile(file,body);};
const hash=body=>createHash('sha256').update(body).digest('hex');
const references=JSON.parse(await readFile(resolve(repo,'references/manifest.json'),'utf8'));
const upstream=references.references.filter(x=>x.library==='Hugeicons Free');
const definitions={};
const inventory=[];
const license=await readFile(resolve(repo,'LICENSE'),'utf8');
const licenseFiles={};
for(const name of (await readdir(resolve(repo,'licenses'))).sort()){
  const path='licenses/'+name;
  licenseFiles[path]=await readFile(resolve(repo,path),'utf8');
}
const sourceNotice=name=>licenseFiles[adaptedSources[name].licenseFile].replace(/--/g,'—');
const bundleNotices={
  LICENSE:strToU8(license),
  'THIRD_PARTY_NOTICES.md':strToU8(await readFile(resolve(repo,'THIRD_PARTY_NOTICES.md'),'utf8')),
  ...Object.fromEntries(Object.entries(licenseFiles).map(([path,body])=>[path,strToU8(body)])),
};
const bundles=Object.fromEntries(sizes.flatMap(size=>corners.map(corner=>[`${size}-${corner}`,{...bundleNotices}])));

// npm CDNs serve these same SVG bytes individually. Carry the upstream terms
// with the drawing when it needs them. Master’s general MIT license ships once.
function artworkNotice(entry){
  const adapted=adaptedSources[entry.name];
  if(adapted){
    if(adapted.standaloneNotice)return adapted.standaloneNotice;
    const credit=adapted.license.includes('Apache') ? `${adapted.reference}\n${adapted.modifications}\n\n` : '';
    return credit+sourceNotice(entry.name).trim();
  }
  if(preservedNotices[entry.name])return licenseFiles['licenses/hugeicons-MIT.txt'].trim();
  return entry.source?.notice??'';
}
if(!incremental)await rm(resolve(root,'dist'),{recursive:true,force:true});
// icons/ is generated and checked in for plain SVG consumers.
if(!incremental&&!archiveSvg)await rm(resolve(root,'icons'),{recursive:true,force:true});
for(const entry of catalog){
  const variants={};
  // Published geometry refits Boolean outlines to lines and arcs; review snapshots below keep the raw export.
  const published=nodes=>publishedNodes(entry,nodes);
  for(const size of sizes){variants[size]={};for(const corner of corners){
    const ctx=context(size,corner);
    const strokes={};
    const [min,max]=strokeRanges[size];
    for(const stroke of strokeWidths.filter(width=>width>=min&&width<=max)){
      strokes[stroke]={nodes:published(draw(entry.name,{...ctx,stroke,variableStroke:true})),strokeWidth:stroke};
    }
    variants[size][corner]={nodes:published(draw(entry.name,ctx)),strokeWidth:ctx.stroke,strokes};
  }}
  const definition={name:entry.name,direction:entry.direction,variants};
  // Review snapshots keep the masters' shape and hashes at the weights they were
  // reviewed at. The native stroke and the extra widths belong to the published
  // modules; changing either must not rewrite art evidence.
  definitions[entry.name]={...definition,variants:Object.fromEntries(sizes.map(size=>[size,Object.fromEntries(corners.map(corner=>{
    const stroke=reviewedStroke[size];
    return [corner,{nodes:draw(entry.name,{...context(size,corner),stroke}),strokeWidth:stroke}];
  }))]))};
  const dataName=entry.component.replace(/Icon$/,'');
  // The dynamic definition assembles the nine fixed masters instead of repeating
  // their geometry, which would double the published package.
  const masters=sizes.flatMap(size=>corners.map(corner=>({size,corner,binding:`m${size}${corner}`})));
  const assembled=`{name:${JSON.stringify(entry.name)},direction:${JSON.stringify(entry.direction)},variants:{${sizes.map(size=>`${JSON.stringify(String(size))}:{${corners.map(corner=>`${JSON.stringify(corner)}:v(m${size}${corner})`).join(',')}}`).join(',')}}}`;
  await put(`dist/data/${entry.name}.js`,masters.map(({size,corner,binding})=>`import { master as ${binding} } from './${size}/${corner}/${entry.name}.js';`).join('\n')+
    `\nconst v = ({ size, opticalSize, corner, ...master }) => master;\nexport const ${dataName} = /* @__PURE__ */ (() => (${assembled}))();\n`);
  await put(`dist/data/${entry.name}.d.ts`,`import type { IconDefinition } from '../runtime.js';\nexport const ${dataName}: IconDefinition;\n`);
  const notice=artworkNotice(entry);
  const header=notice ? `<!--\n${notice.replaceAll('--','—')}\n-->\n` : '';
  for(const size of sizes)for(const corner of corners){
    const svg=header+renderSvg(definition,{size,opticalSize:size,corner})+'\n';
    if(!archiveSvg)await put(`icons/${size}/${corner}/${entry.name}.svg`,svg);
    bundles[`${size}-${corner}`][`${entry.name}.svg`]=strToU8(svg);
    inventory.push({name:entry.name,opticalSize:size,corner,path:`icons/${size}/${corner}/${entry.name}.svg`,sha256:hash(svg)});
    const {strokes,...native}=variants[size][corner];
    const nativePath=`native/${size}/${corner}/${entry.name}`;
    await put(`dist/data/${nativePath}.js`,`export const master = ${JSON.stringify({...native,opticalSize:size,corner,size})};\n`);
    await put(`dist/data/${nativePath}.d.ts`,`import type { ResolvedIcon } from '../../../../runtime.js';\nexport const master: Omit<ResolvedIcon, 'strokes'>;\n`);
    const head=`import { master as native } from '../../${nativePath}.js';\n`;
    await put(`dist/data/${size}/${corner}/${entry.name}.js`,head+`export const master = { ...native, strokes: ${JSON.stringify(strokes)} };\n`);
    await put(`dist/data/${size}/${corner}/${entry.name}.d.ts`,`import type { ResolvedIcon } from '../../../runtime.js';\nexport const master: ResolvedIcon;\n`);
  }
}
await put('dist/index.js',catalog.map(x=>`export { ${x.component.replace(/Icon$/,'')} } from './data/${x.name}.js';`).join('\n')+'\nexport * from "./runtime.js";\n');
await put('dist/index.d.ts',`import type { IconDefinition } from './runtime.js';\nexport * from './runtime.js';\n`+catalog.map(x=>`export const ${x.component.replace(/Icon$/,'')}: IconDefinition;`).join('\n')+'\n');
await put('dist/runtime.js',await readFile(resolve(root,'src/runtime.mjs'),'utf8'));
await put('dist/runtime.d.ts',await readFile(resolve(root,'src/runtime.d.ts'),'utf8'));
for(const extension of ['mjs','d.ts'])await put(`dist/presentation.${extension==='mjs'?'js':extension}`,await readFile(resolve(root,`src/presentation.${extension}`),'utf8'));
const provenance=catalog.map(entry=>{
  if(entry.category==='brands')return {...entry,source:{...entry.source,notice:brandNotice(entry)},variants:9};
  if(adaptedSources[entry.name])return {...entry,license:adaptedSources[entry.name].adapterLicense??entry.license,source:{...adaptedSources[entry.name],notice:sourceNotice(entry.name)},variants:9};
  const ref=preservedNotices[entry.name]?upstream.find(x=>x.name===entry.name):undefined;
  if(preservedNotices[entry.name]&&!ref)throw new Error(`Missing preserved source: ${entry.name}`);
  return {...entry,source:ref?{kind:'study-redraw',copyright:preservedNotices[entry.name],reference:ref.url,license:'MIT',author:'Hugeicons',commit:ref.commit,modifications:'Reconstructed native-size geometry, three corner profiles, optical spacing and detail reductions; not an automatic path conversion.'}:{kind:'authored',author:'Master and contributors'},variants:9};
});
const result={schemaVersion:1,conceptCount,iconCount:catalog.length,sizes,corners,specifications,pilot,categories,icons:provenance,inventory};
await put('dist/catalog.json',JSON.stringify(result,null,2)+'\n');
await put('dist/definitions.json',JSON.stringify(definitions)+'\n');
for(const [key,files] of Object.entries(bundles)) await put(`dist/downloads/master-icons-${key}.zip`,zipSync(files,{level:9,mtime:new Date(2026,10,16)}));
console.log(`Built @master/icons: ${catalog.length} icons × ${sizes.length} sizes × ${corners.length} corners = ${inventory.length} SVGs and shared geometry.`);

for (const file of ['LICENSE','THIRD_PARTY_NOTICES.md']) await cp(resolve(repo,file),resolve(root,file));
await cp(resolve(repo,'licenses'),resolve(root,'licenses'),{recursive:true});
if(incremental)for(const folder of archiveSvg?['dist']:['dist','icons'])for(const entry of await readdir(resolve(root,folder),{recursive:true,withFileTypes:true})){
  const file=resolve(entry.parentPath,entry.name);
  if(entry.isFile()&&!emitted.has(file))await rm(file);
}
await cache?.commit();
console.log(`Icons: generated in ${((performance.now()-started)/1000).toFixed(2)}s`);
