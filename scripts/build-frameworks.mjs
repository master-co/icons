import { readFile, readdir, rm, cp } from 'node:fs/promises';
import { resolve, relative, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { contentCache, writeIfChanged } from './lib/content-cache.mjs';
import { lockGeneration } from './lib/generation-lock.mjs';

const framework=process.argv[2];
if(!['react','vue','svelte','preact','astro'].includes(framework))throw new Error('Supply react, vue, svelte, preact or astro');
const repo=fileURLToPath(new URL('../',import.meta.url));
await lockGeneration(repo,framework);
const {catalog}=await import('../packages/icons/src/catalog.mjs');
const {sizes,corners}=await import('../packages/icons/src/geometry.mjs');
const root=resolve(repo,`packages/icons-${framework}`);
const started=performance.now();
const manifest=JSON.parse(await readFile(resolve(root,'package.json'),'utf8'));
const core=JSON.parse(await readFile(resolve(repo,'packages/icons/package.json'),'utf8'));
if(manifest.version!==core.version)throw new Error(`${manifest.name} must share @master/icons version ${core.version}`);
const cacheFile=resolve(repo,`work/cache/icons-${framework}.json`);
const cache=process.argv.includes('--cache')?await contentCache({
  inputs:[resolve(root,'src'),resolve(root,'package.json'),...['packages/icons/src','packages/icons/package.json','scripts/build-frameworks.mjs','scripts/lib/content-cache.mjs','scripts/lib/generation-lock.mjs','LICENSE','THIRD_PARTY_NOTICES.md','bun.lock'].map(path=>resolve(repo,path))],
  outputs:[resolve(root,'dist'),resolve(root,'LICENSE'),resolve(root,'THIRD_PARTY_NOTICES.md')],file:cacheFile,force:process.argv.includes('--force')
}):undefined;
if(cache?.hit){console.log(`${manifest.name}: content cache hit (${Math.round(performance.now()-started)}ms)`);process.exit(0);}
if(!cache){await rm(cacheFile,{force:true});await rm(resolve(root,'dist'),{recursive:true,force:true});}
const emitted=new Set();
const put=async(path,body)=>{emitted.add(path);await writeIfChanged(resolve(root,'dist',path),body);};
const native=framework==='svelte'||framework==='astro';
const extension=native?framework:'js';
await put('types.d.ts',await readFile(resolve(root,'src/types.d.ts'),'utf8'));
if(native)await put(`Icon.${extension}`,await readFile(resolve(root,`src/Icon.${extension}`),'utf8'));
else await put('runtime.js',await readFile(resolve(root,'src/runtime.mjs'),'utf8'));
for(const group of [null,...sizes.flatMap(size=>corners.map(corner=>({size,corner})))]){
  const fixed=group!==null;
  const folder=fixed?`${group.size}/${group.corner}`:'icons';
  const base=fixed?'../../':'../';
  const componentType=fixed?'StaticIconComponent':'IconComponent';
  const propsType=fixed?'StaticIconProps':'IconProps';
  for(const entry of catalog){
    const dataName=fixed?'master':entry.component.replace(/Icon$/,'');
    const dataImport=`import { ${dataName} } from '@master/icons/data/${fixed?folder+'/':''}${entry.name}';`;
    const direction=JSON.stringify(entry.direction);
    let source;
    if(!native){
      const render=fixed?'staticIconElement':'iconElement';
      const args=fixed?`master, ${direction}, props`:`${dataName}, props`;
      source=`${dataImport}\nimport { ${render} } from '${base}runtime.js';\n`;
      if(framework==='react')source+=`import { forwardRef, useId } from 'react';\nexport const ${entry.component} = /* @__PURE__ */ forwardRef(function ${entry.component}(props, ref) { return ${render}(${fixed?`master, ${direction}`:dataName}, {...props, ref}, useId()); });\n`;
      else source+=`${framework==='preact'?"import { useId } from 'preact/hooks';\n":''}export function ${entry.component}(props) { return ${render}(${args}${framework==='preact'?', useId()':''}); }\n${framework==='vue'?`${entry.component}.inheritAttrs = false;\n`:''}`;
    }else if(framework==='svelte'){
      source=`${fixed?'':`<script module>\n${dataImport}\n</script>\n`}
<script lang="ts">
  ${fixed?dataImport:"import { resolveIcon } from '@master/icons/runtime';"}
  import Icon from '${base}Icon.svelte';
  import type { ${propsType} } from '${base}types.js';
  let { ref = $bindable(undefined), ...props }: ${propsType} = $props();
  ${fixed?'':`const master = $derived(resolveIcon(${dataName}, props));`}
</script>

<Icon {...props} {master} directionPolicy={${direction}} bind:ref />
`;
    }else{
      source=`---
${dataImport}
${fixed?'':"import { resolveIcon } from '@master/icons/runtime';"}
import Icon from '${base}Icon.astro';
import type { ${propsType} } from '${base}types.js';
type Props = ${propsType};
${fixed?'':`const master = resolveIcon(${dataName}, Astro.props);`}
---

<Icon {...Astro.props} {master} directionPolicy={${direction}}><slot /></Icon>
`;
    }
    await put(`${folder}/${entry.name}.${extension}`,source);
    await put(`${folder}/${entry.name}${native?'.'+extension:''}.d.ts`,
      `import type { ${componentType} } from '${base}types.js';\n${native?'declare const':'export const'} ${entry.component}: ${componentType};\n${native?`export default ${entry.component};\n`:''}`);
  }
  const indexFolder=fixed?folder+'/':'';
  const prefix=fixed?'./':'./icons/';
  await put(`${indexFolder}index.${native?'ts':'js'}`,catalog.map(entry=>`export { ${native?'default as ':''}${entry.component} } from '${prefix}${entry.name}.${extension}';`).join('\n')+'\n');
  const typesPath=fixed?'../../types.js':'./types.js';
  await put(`${indexFolder}index.d.ts`,`import type { ${componentType} } from '${typesPath}';\nexport type { ${propsType}, ${componentType} } from '${typesPath}';\n`+catalog.map(entry=>`export const ${entry.component}: ${componentType};`).join('\n')+'\n');
}
// Retain unchanged component mtimes on cache misses; remove obsolete names only
// after successful generation, so renaming/removing icons cannot leak old exports.
for(const entry of await readdir(resolve(root,'dist'),{recursive:true,withFileTypes:true})){
  const path=join(entry.parentPath,entry.name);
  if(entry.isFile()&&!emitted.has(relative(resolve(root,'dist'),path)))await rm(path);
}
for(const file of ['LICENSE','THIRD_PARTY_NOTICES.md'])await cp(resolve(repo,file),resolve(root,file));
await cache?.commit();
console.log(`Built ${manifest.name}: ${catalog.length} icons × 10 entries in ${((performance.now()-started)/1000).toFixed(2)}s`);
