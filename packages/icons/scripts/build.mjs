import { mkdir, readFile, writeFile, cp, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { zipSync, strToU8 } from 'fflate';
import { sizes, corners, context, specifications } from '../src/geometry.mjs';
import { draw } from '../src/drawings.mjs';
import { catalog, pilot, categories, conceptCount } from '../src/catalog.mjs';
import { renderSvg } from '../src/runtime.mjs';
import { preservedNotices, adaptedSources } from '../src/provenance.mjs';
import {brandNotice} from '../src/brands.mjs';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const repo=resolve(root,'../..');
process.chdir(root);
const put=async(path,body)=>{const file=resolve(root,path);await mkdir(dirname(file),{recursive:true});await writeFile(file,body);};
const hash=body=>createHash('sha256').update(body).digest('hex');
const references=JSON.parse(await readFile(resolve(repo,'references/manifest.json'),'utf8'));
const upstream=references.references.filter(x=>x.library==='Hugeicons Free');
const definitions={};
const inventory=[];
const license=await readFile(resolve(repo,'LICENSE'),'utf8');
const hugeLicense=await readFile(resolve(repo,'licenses/hugeicons-MIT.txt'),'utf8');
const lucideLicense=await readFile(resolve(repo,'licenses/lucide.txt'),'utf8');
// XML comments cannot contain '--'; only normalize the license separator.
const lucideNotice=lucideLicense.replace(/^---$/gm,'—');
const notices=await readFile(resolve(repo,'THIRD_PARTY_NOTICES.md'),'utf8');
const brandLicenses=Object.fromEntries(await Promise.all(['simple-icons-CC0.txt','simple-icons-DISCLAIMER.md','openai-brand.txt'].map(async name=>['licenses/'+name,strToU8(await readFile(resolve(repo,'licenses',name),'utf8'))])));
const bundles=Object.fromEntries(sizes.flatMap(s=>corners.map(c=>[`${s}-${c}`,{'LICENSE':strToU8(license),'licenses/hugeicons-MIT.txt':strToU8(hugeLicense),'licenses/lucide.txt':strToU8(lucideLicense),'THIRD_PARTY_NOTICES.md':strToU8(notices)}])));
for(const bundle of Object.values(bundles))Object.assign(bundle,brandLicenses);
await rm(resolve(root,'dist'),{recursive:true,force:true});
// icons/ is generated and checked in for plain SVG consumers.
await rm(resolve(root,'icons'),{recursive:true,force:true});
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
  await put(`dist/react/icons/${entry.name}.js`,`import { ${dataName} } from '../../data/${entry.name}.js';\nimport { iconElement } from '../../react-runtime.js';\nimport { forwardRef } from 'react';\nexport const ${entry.component} = /* @__PURE__ */ forwardRef(function ${entry.component}(props,ref) { return iconElement(${dataName},{...props,ref}); });\n`);
  for(const size of sizes)for(const corner of corners){
    const svg=renderSvg(definition,{size,opticalSize:size,corner});
    const notice='<!--\n'+license.trim().replace('Copyright (c) 2026 Master and contributors','Copyright (c) 2026 Master and contributors'+(preservedNotices[entry.name]?'\n'+preservedNotices[entry.name]:''))+(adaptedSources[entry.name]?'\n\n'+lucideNotice.trim():'')+(entry.rendering==='brand-silhouette'?'\n\n'+brandNotice(entry):'')+'\n-->\n';
    await put(`icons/${size}/${corner}/${entry.name}.svg`,notice+svg+'\n');
    bundles[`${size}-${corner}`][`${entry.name}.svg`]=strToU8(notice+svg+'\n');
    inventory.push({name:entry.name,opticalSize:size,corner,path:`icons/${size}/${corner}/${entry.name}.svg`,sha256:hash(notice+svg+'\n')});
    const master={...variants[size][corner],opticalSize:size,corner,size};
    await put(`dist/react/${size}/${corner}/${entry.name}.js`,`import { staticIconElement } from '../../../react-runtime.js';\nconst master = ${JSON.stringify(master)};\nimport { forwardRef } from 'react';\nexport const ${entry.component} = /* @__PURE__ */ forwardRef(function ${entry.component}(props,ref) { return staticIconElement(master,${JSON.stringify(entry.direction)},{...props,ref}); });\n`);
  }
}
await put('dist/index.js',catalog.map(x=>`export { ${x.component.replace(/Icon$/,'')} } from './data/${x.name}.js';`).join('\n')+'\nexport * from "./runtime.js";\n');
await put('dist/index.d.ts',`import type { IconDefinition } from './runtime.js';\nexport * from './runtime.js';\n`+catalog.map(x=>`export const ${x.component.replace(/Icon$/,'')}: IconDefinition;`).join('\n')+'\n');
await put('dist/react/index.js',catalog.map(x=>`export { ${x.component} } from './icons/${x.name}.js';`).join('\n')+'\n');
const reactTypes=await readFile(resolve(root,'src/react.d.ts'),'utf8');
await put('dist/react/index.d.ts',reactTypes.replace("'./runtime.js'","'../runtime.js'")+catalog.map(x=>`export const ${x.component}: IconComponent;`).join('\n')+'\n');
for(const size of sizes)for(const corner of corners){
  await put(`dist/react/${size}/${corner}/index.js`,catalog.map(x=>`export { ${x.component} } from './${x.name}.js';`).join('\n')+'\n');
  await put(`dist/react/${size}/${corner}/index.d.ts`,`import type { StaticIconComponent } from '../../index.js';\nexport type { StaticIconProps } from '../../index.js';\n`+catalog.map(x=>`export const ${x.component}: StaticIconComponent;`).join('\n')+'\n');
}
await put('dist/runtime.js',await readFile(resolve(root,'src/runtime.mjs'),'utf8'));
await put('dist/runtime.d.ts',await readFile(resolve(root,'src/runtime.d.ts'),'utf8'));
await put('dist/react-runtime.js',await readFile(resolve(root,'src/react.mjs'),'utf8'));
const provenance=catalog.map(entry=>{
  if(entry.rendering==='brand-silhouette')return {...entry,source:{...entry.source,notice:brandNotice(entry)},variants:9};
  if(adaptedSources[entry.name])return {...entry,source:{...adaptedSources[entry.name],notice:lucideNotice},variants:9};
  const ref=preservedNotices[entry.name]?upstream.find(x=>x.name===entry.name):undefined;
  if(preservedNotices[entry.name]&&!ref)throw new Error(`Missing preserved source: ${entry.name}`);
  return {...entry,source:ref?{kind:'study-redraw',copyright:preservedNotices[entry.name],reference:ref.url,license:'MIT',author:'Hugeicons',commit:ref.commit,modifications:'Reconstructed native-size geometry, three corner profiles, optical spacing and detail reductions; not an automatic path conversion.'}:{kind:'authored',author:'Master and contributors'},variants:9};
});
const result={schemaVersion:1,version:'0.1.0-alpha.0',status:'visual-review-required',conceptCount,iconCount:catalog.length,sizes,corners,specifications,pilot,categories,icons:provenance,inventory};
await put('dist/catalog.json',JSON.stringify(result,null,2)+'\n');
await put('dist/definitions.json',JSON.stringify(definitions)+'\n');
for(const [key,files] of Object.entries(bundles)) await put(`dist/downloads/master-icons-${key}.zip`,zipSync(files,{level:9,mtime:new Date(2026,10,16)}));
console.log(`Built ${catalog.length} icons × ${sizes.length} sizes × ${corners.length} corners = ${inventory.length} SVGs and React exports.`);

for (const file of ['LICENSE','THIRD_PARTY_NOTICES.md']) await cp(resolve(repo,file),resolve(root,file));
await cp(resolve(repo,'licenses'),resolve(root,'licenses'),{recursive:true});
