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
const {sizes,corners,context,specifications}=await import('../src/geometry.mjs');
const {draw}=await import('../src/drawings.mjs');
const {catalog,pilot,categories,conceptCount}=await import('../src/catalog.mjs');
const {renderSvg}=await import('../src/runtime.mjs');
const {preservedNotices,adaptedSources}=await import('../src/provenance.mjs');
const {brandNotice}=await import('../src/brands.mjs');
const started=performance.now();
// Release/reproducibility builds remain unconditional; dev opts into this cache.
const cache=process.argv.includes('--cache') ? await contentCache({
  inputs:['packages/icons/src','packages/icons/scripts','packages/icons/package.json','scripts/lib/content-cache.mjs','scripts/lib/generation-lock.mjs','references/manifest.json','LICENSE','THIRD_PARTY_NOTICES.md','licenses','bun.lock'].map(path=>resolve(repo,path)),
  outputs:['dist','icons','LICENSE','THIRD_PARTY_NOTICES.md','licenses'].map(path=>resolve(root,path)),
  file:resolve(repo,'work/cache/icons.json'),force:process.argv.includes('--force')
}) : undefined;
if(cache?.hit){console.log(`Icons: content cache hit (${Math.round(performance.now()-started)}ms)`);process.exit(0);}
if(!cache)await rm(resolve(repo,'work/cache/icons.json'),{force:true});
const directories=new Set();
const emitted=new Set();
const put=async(path,body)=>{const file=resolve(root,path),dir=dirname(file);emitted.add(file);if(cache){await writeIfChanged(file,body);return;}if(!directories.has(dir)){await mkdir(dir,{recursive:true});directories.add(dir);}await writeFile(file,body);};
const hash=body=>createHash('sha256').update(body).digest('hex');
const references=JSON.parse(await readFile(resolve(repo,'references/manifest.json'),'utf8'));
const upstream=references.references.filter(x=>x.library==='Hugeicons Free');
const definitions={};
const inventory=[];
const license=await readFile(resolve(repo,'LICENSE'),'utf8');
const hugeLicense=await readFile(resolve(repo,'licenses/hugeicons-MIT.txt'),'utf8');
const lucideLicense=await readFile(resolve(repo,'licenses/lucide.txt'),'utf8');
// XML comments cannot contain '--'; only normalize the license separator.
const adaptedLicenses=Object.fromEntries(await Promise.all([...new Set(Object.values(adaptedSources).map(s=>s.licenseFile))].map(async path=>[path,await readFile(resolve(repo,path),'utf8')])));
const sourceNotice=name=>adaptedLicenses[adaptedSources[name].licenseFile].replace(/--/g,'—');
const notices=await readFile(resolve(repo,'THIRD_PARTY_NOTICES.md'),'utf8');
const brandLicenses=Object.fromEntries(await Promise.all(['simple-icons-CC0.txt','simple-icons-DISCLAIMER.md','openai-brand.txt','brand-additions.txt'].map(async name=>['licenses/'+name,strToU8(await readFile(resolve(repo,'licenses',name),'utf8'))])));
const bundles=Object.fromEntries(sizes.flatMap(s=>corners.map(c=>[`${s}-${c}`,{'LICENSE':strToU8(license),'licenses/hugeicons-MIT.txt':strToU8(hugeLicense),'licenses/lucide.txt':strToU8(lucideLicense),'THIRD_PARTY_NOTICES.md':strToU8(notices)}])));
for(const bundle of Object.values(bundles))Object.assign(bundle,brandLicenses,Object.fromEntries(Object.entries(adaptedLicenses).map(([path,body])=>[path,strToU8(body)])));
if(!cache)await rm(resolve(root,'dist'),{recursive:true,force:true});
// icons/ is generated and checked in for plain SVG consumers.
if(!cache)await rm(resolve(root,'icons'),{recursive:true,force:true});
for(const entry of catalog){
  const variants={};
  for(const size of sizes){variants[size]={};for(const corner of corners){
    const ctx=context(size,corner);
    variants[size][corner]={nodes:draw(entry.name,ctx),strokeWidth:ctx.stroke};
  }}
  const definition={name:entry.name,direction:entry.direction,variants};
  definitions[entry.name]=definition;
  const dataName=entry.component.replace(/Icon$/,'');
  await put(`dist/data/${entry.name}.js`,`export const ${dataName} = ${JSON.stringify(definition)};\n`);
  await put(`dist/data/${entry.name}.d.ts`,`import type { IconDefinition } from '../runtime.js';\nexport const ${dataName}: IconDefinition;\n`);
  for(const size of sizes)for(const corner of corners){
    const svg=renderSvg(definition,{size,opticalSize:size,corner});
    const notice='<!--\n'+license.trim().replace('Copyright (c) 2026 Master and contributors','Copyright (c) 2026 Master and contributors'+(preservedNotices[entry.name]?'\n'+preservedNotices[entry.name]:''))+(adaptedSources[entry.name]?'\n\n'+sourceNotice(entry.name).trim():'')+(entry.rendering==='brand-silhouette'?'\n\n'+brandNotice(entry):'')+'\n-->\n';
    await put(`icons/${size}/${corner}/${entry.name}.svg`,notice+svg+'\n');
    bundles[`${size}-${corner}`][`${entry.name}.svg`]=strToU8(notice+svg+'\n');
    inventory.push({name:entry.name,opticalSize:size,corner,path:`icons/${size}/${corner}/${entry.name}.svg`,sha256:hash(notice+svg+'\n')});
    const master={...variants[size][corner],opticalSize:size,corner,size};
    await put(`dist/data/${size}/${corner}/${entry.name}.js`,`export const master = ${JSON.stringify(master)};\n`);
    await put(`dist/data/${size}/${corner}/${entry.name}.d.ts`,`import type { ResolvedIcon } from '../../../runtime.js';\nexport const master: ResolvedIcon;\n`);
  }
}
await put('dist/index.js',catalog.map(x=>`export { ${x.component.replace(/Icon$/,'')} } from './data/${x.name}.js';`).join('\n')+'\nexport * from "./runtime.js";\n');
await put('dist/index.d.ts',`import type { IconDefinition } from './runtime.js';\nexport * from './runtime.js';\n`+catalog.map(x=>`export const ${x.component.replace(/Icon$/,'')}: IconDefinition;`).join('\n')+'\n');
await put('dist/runtime.js',await readFile(resolve(root,'src/runtime.mjs'),'utf8'));
await put('dist/runtime.d.ts',await readFile(resolve(root,'src/runtime.d.ts'),'utf8'));
for(const extension of ['mjs','d.ts'])await put(`dist/presentation.${extension==='mjs'?'js':extension}`,await readFile(resolve(root,`src/presentation.${extension}`),'utf8'));
const provenance=catalog.map(entry=>{
  if(entry.rendering==='brand-silhouette')return {...entry,source:{...entry.source,notice:brandNotice(entry)},variants:9};
  if(adaptedSources[entry.name])return {...entry,source:{...adaptedSources[entry.name],notice:sourceNotice(entry.name)},variants:9};
  const ref=preservedNotices[entry.name]?upstream.find(x=>x.name===entry.name):undefined;
  if(preservedNotices[entry.name]&&!ref)throw new Error(`Missing preserved source: ${entry.name}`);
  return {...entry,source:ref?{kind:'study-redraw',copyright:preservedNotices[entry.name],reference:ref.url,license:'MIT',author:'Hugeicons',commit:ref.commit,modifications:'Reconstructed native-size geometry, three corner profiles, optical spacing and detail reductions; not an automatic path conversion.'}:{kind:'authored',author:'Master and contributors'},variants:9};
});
const result={schemaVersion:1,version:'0.1.0-alpha.0',status:'visual-review-required',conceptCount,iconCount:catalog.length,sizes,corners,specifications,pilot,categories,icons:provenance,inventory};
await put('dist/catalog.json',JSON.stringify(result,null,2)+'\n');
await put('dist/definitions.json',JSON.stringify(definitions)+'\n');
for(const [key,files] of Object.entries(bundles)) await put(`dist/downloads/master-icons-${key}.zip`,zipSync(files,{level:9,mtime:new Date(2026,10,16)}));
console.log(`Built @master/icons: ${catalog.length} icons × ${sizes.length} sizes × ${corners.length} corners = ${inventory.length} SVGs and shared geometry.`);

for (const file of ['LICENSE','THIRD_PARTY_NOTICES.md']) await cp(resolve(repo,file),resolve(root,file));
await cp(resolve(repo,'licenses'),resolve(root,'licenses'),{recursive:true});
if(cache)for(const folder of ['dist','icons'])for(const entry of await readdir(resolve(root,folder),{recursive:true,withFileTypes:true})){
  const file=resolve(entry.parentPath,entry.name);
  if(entry.isFile()&&!emitted.has(file))await rm(file);
}
await cache?.commit();
console.log(`Icons: generated in ${((performance.now()-started)/1000).toFixed(2)}s`);
