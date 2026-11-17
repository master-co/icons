import { execFileSync } from 'node:child_process';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));
export async function packIcons(){
  execFileSync(process.execPath,['scripts/build-icons.mjs','--cache'],{cwd:root,stdio:'inherit'});
  await mkdir(resolve(root,'work'),{recursive:true});
  const packages=[];
  for(const name of ['icons',...['react','vue','svelte','preact','astro'].map(framework=>'icons-'+framework)]){
    const folder=resolve(root,'packages',name);
    const manifest=JSON.parse(await readFile(resolve(folder,'package.json'),'utf8'));
    const archive=resolve(root,`work/master-${name}-alpha.tgz`);
    execFileSync('bun',['pm','pack','--ignore-scripts','--filename',archive],{cwd:folder,stdio:['ignore','ignore','pipe'],maxBuffer:8*1024*1024});
    const entries=execFileSync('tar',['-tzf',archive],{encoding:'utf8',maxBuffer:8*1024*1024}).trim().split('\n').filter(path=>!path.endsWith('/'));
    let unpackedBytes=0;
    for(const entry of entries)unpackedBytes+=(await stat(resolve(folder,entry.replace(/^package\//,'')))).size;
    const packedSource=execFileSync('tar',['-xOf',archive,'package/package.json'],{encoding:'utf8'});
    const packed=JSON.parse(packedSource);
    unpackedBytes+=Buffer.byteLength(packedSource)-(await stat(resolve(folder,'package.json'))).size;
    const result={name:manifest.name,archive,files:entries.length,compressedBytes:(await stat(archive)).size,unpackedBytes,manifest:packed,entries};
    packages.push(result);
    console.log(`${result.name}: ${result.files} files, ${(result.compressedBytes/1e6).toFixed(2)} MB compressed / ${(unpackedBytes/1e6).toFixed(2)} MB unpacked`);
  }
  await writeFile(resolve(root,'work/package-sizes.json'),JSON.stringify(packages.map(({manifest,entries,...size})=>size),null,2)+'\n');
  return packages;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)await packIcons();
