import {readFile, writeFile, mkdir, readdir, rm} from 'node:fs/promises';
import {resolve, dirname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {contentCache} from './content-cache.mjs';
import {lockGeneration} from './generation-lock.mjs';
import {zipSync, strToU8} from 'fflate';
import {strokeWidths,strokeWidthsFor} from './stroke-width.mjs';
import {nativeVariants} from './native-variants.mjs';
const root=fileURLToPath(new URL('../../',import.meta.url));
export async function buildStrokes({force=false}={}) {
  await lockGeneration(root);
  const {sizes,corners}=await import('../../packages/icons/src/geometry.mjs');
  const {renderSvg}=await import('../../packages/icons/src/runtime.mjs');
  const started=performance.now();
  const out=resolve(root,'work/stroke-assets');
  const cache=await contentCache({
    inputs:['packages/icons/src','packages/icons/scripts/build.mjs','scripts/lib/build-strokes.mjs','scripts/lib/stroke-width.mjs','scripts/lib/content-cache.mjs','scripts/lib/generation-lock.mjs','packages/icons/dist/definitions.json','packages/icons/dist/catalog.json','LICENSE','THIRD_PARTY_NOTICES.md','licenses','bun.lock'].map(path=>resolve(root,path)),
    outputs:[out],file:resolve(root,'work/cache/strokes.json'),force
  });
  if(cache.hit){console.log(`Strokes: content cache hit (${Math.round(performance.now()-started)}ms)`);return out;}
  await rm(out,{recursive:true,force:true});
  const directories=new Set();
  const put=async(path,body)=>{const file=resolve(out,path),dir=dirname(file);if(!directories.has(dir)){await mkdir(dir,{recursive:true});directories.add(dir);}await writeFile(file,body);};
  const catalog=JSON.parse(await readFile(resolve(root,'packages/icons/dist/catalog.json'),'utf8'));
  const definitions=JSON.parse(await readFile(resolve(root,'packages/icons/dist/definitions.json'),'utf8'));
  const strokeDefinitions={};
  for(const entry of catalog.icons){
    const data=await import(pathToFileURL(resolve(root,`packages/icons/dist/data/${entry.name}.js`)).href);
    strokeDefinitions[entry.name]=data[entry.component.replace(/Icon$/,'')];
    // definitions.json holds the review snapshots; the site and the review tool show the published native masters.
    definitions[entry.name]={...definitions[entry.name],variants:nativeVariants(strokeDefinitions[entry.name].variants)};
  }
  const license=await readFile(resolve(root,'LICENSE'),'utf8');
  // Every SVG of an icon leads with the same notice as its native file, which the core generator composes.
  const headers={};
  for(const entry of catalog.icons){
    const native=await readFile(resolve(root,`packages/icons/icons/24/soft/${entry.name}.svg`),'utf8');
    if(!native.startsWith('<!--\n'))throw new Error(`Build core first: ${entry.name}.svg has no notice`);
    headers[entry.name]=native.slice(0,native.indexOf('-->\n')+4);
  }
  const common={LICENSE:strToU8(license),'THIRD_PARTY_NOTICES.md':strToU8(await readFile(resolve(root,'THIRD_PARTY_NOTICES.md'),'utf8'))};
  for(const name of await readdir(resolve(root,'licenses')))common['licenses/'+name]=strToU8(await readFile(resolve(root,'licenses',name),'utf8'));
  // One release asset per optical size gathers every corner and custom width: {corner}/stroke-{width}/{name}.svg.
  const collections=Object.fromEntries(sizes.map(size=>[size,{...common}]));
  for(const width of strokeWidths) {
    const bundles=Object.fromEntries(sizes.filter(s=>strokeWidthsFor(s).includes(width)).flatMap(s=>corners.map(c=>[`${s}-${c}`,{...common}])));
    for(const entry of catalog.icons) {
      const definition=definitions[entry.name], variants={};
      for(const size of sizes.filter(s=>strokeWidthsFor(s).includes(width))) {
        variants[size]={};
        for(const corner of corners) {
          const master=strokeDefinitions[entry.name].variants[size][corner].strokes?.[width];
          if(!master)throw new Error(`Build core first: missing ${entry.name}/${size}/${corner}/stroke-${width}`);
          variants[size][corner]=master;
        }
      }
      (definition.strokes??={})[width]=variants;
      for(const size of sizes.filter(s=>strokeWidthsFor(s).includes(width)))for(const corner of corners) {
        // Custom weights ship only inside their ZIP sets; the site renders single
        // files in the browser, so 40k loose SVGs never reach disk or hosting.
        const svg=`${headers[entry.name]}${renderSvg({...definition,variants},{size,corner})}\n`;
        bundles[`${size}-${corner}`][entry.name+'.svg']=strToU8(svg);
        collections[size][`${corner}/stroke-${width}/${entry.name}.svg`]=bundles[`${size}-${corner}`][entry.name+'.svg'];
      }
    }
    for(const [variant,files] of Object.entries(bundles))await put(`downloads/master-icons-${variant}-stroke-${width}.zip`,zipSync(files,{level:6,mtime:new Date(2026,10,16)}));
    console.log(`Generated stroke ${width}: ${catalog.icons.length} × ${Object.keys(bundles).length} masters`);
  }
  for(const [size,files] of Object.entries(collections))await put(`release/master-icons-${size}-strokes.zip`,zipSync(files,{level:9,mtime:new Date(2026,10,16)}));
  // The site renders and downloads from these; `header` makes a download identical to the published file.
  for(const [name,definition] of Object.entries(definitions))await put(`data/${name}.json`,JSON.stringify({...definition,header:headers[name]}));
  await put('definitions.json',JSON.stringify(definitions));
  await put('key',cache.key);
  await cache.commit();
  console.log(`Strokes: generated in ${((performance.now()-started)/1000).toFixed(2)}s`);
  return out;
}
