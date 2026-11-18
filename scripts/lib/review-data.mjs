import {readFile} from 'node:fs/promises';
const json=async path=>JSON.parse(await readFile(path,'utf8'));
export async function comparisonReferences(){
  const config=await json('references/current.json');
  const manifests=await Promise.all(config.manifests.map(json));
  return {references:manifests.flatMap(x=>x.references)};
}
export async function beforeDefinitions(){
  const config=await json('references/current.json');
  return Object.assign({},...await Promise.all([config.before,...(config.additionalBefore||[])].map(json)));
}

// Research assets may be original raster button captures, not only vectors.
// Keep them intact and self-contained; do not trace them into reference SVGs.
export async function referenceMarkup(ref){
  if(ref.mediaType==='image/png')return `<img alt="" style="width:100%;height:100%;object-fit:contain" src="data:image/png;base64,${(await readFile(ref.localPath)).toString('base64')}">`;
  return (await readFile(ref.localPath,'utf8'))
    .replace(/<!--[\s\S]*?-->/g,'')
    .replace(/<style>\s*@import[\s\S]*?<\/style>/g,'')
    .replace(/(stroke|fill)="#[a-fA-F0-9]+"/g,'$1="currentColor"')
    .replace(/<svg\b([^>]*)>/,(_all,attrs)=>`<svg${attrs}${/\bfill=/.test(attrs)?'':' fill="currentColor"'}>`);
}
