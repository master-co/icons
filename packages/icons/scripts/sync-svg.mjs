import {cp,readFile,readdir,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {creditedReadme, loadArtworkNotices, withSvgHeader} from './artwork-notices.mjs';
import {strFromU8, unzipSync} from 'fflate';
import {writeIfChanged} from '../../../scripts/lib/content-cache.mjs';
import {lockGeneration} from '../../../scripts/lib/generation-lock.mjs';
import {runTurbo} from '../../../scripts/lib/turbo.mjs';

if(!process.env.TURBO_HASH)process.exit(await runTurbo(['run','build','--filter=@master/icons',...process.argv.slice(2)]));
const root=fileURLToPath(new URL('../',import.meta.url));
await lockGeneration(resolve(root,'../..'));
const {standaloneHeaders,credits}=await loadArtworkNotices();
const started=performance.now(),emitted=new Set();
const {sizes,corners}=JSON.parse(await readFile(resolve(root,'dist/catalog.json'),'utf8'));
// Turbo hashes tracked outputs even when inputs exclude them. Cache the ZIPs,
// then materialize the checked-in SVGs separately after every cache restore.
for(const size of sizes)for(const corner of corners){
 const files=unzipSync(await readFile(resolve(root,`dist/downloads/master-icons-${size}-${corner}.zip`)));
 for(const [name,body] of Object.entries(files))if(name.endsWith('.svg')){
  const file=resolve(root,`icons/${size}/${corner}`,name);
  const header=standaloneHeaders.get(name.slice(0,-4));
  if (header===undefined) throw new Error('Unknown archived drawing: '+name);
  emitted.add(file);await writeIfChanged(file,withSvgHeader(strFromU8(body),header));
 }
}
for(const entry of await readdir(resolve(root,'icons'),{recursive:true,withFileTypes:true})){
 const file=resolve(entry.parentPath,entry.name);
 if(entry.isFile()&&!emitted.has(file))await rm(file);
}
// All adapters distribute the same artwork. Refresh only the marked section
// so their individual usage guides survive both cold builds and cache restores.
for (const pkg of ['icons','icons-react','icons-vue','icons-svelte','icons-preact','icons-astro']) {
 const file=resolve(root,'..',pkg,'README.md');
 await writeIfChanged(file,creditedReadme(await readFile(file,'utf8'),credits));
}
// The application skill is authored at the repository root and ships inside the core package.
await rm(resolve(root,'skills'),{recursive:true,force:true});
await cp(resolve(root,'../../skills/master-icons'),resolve(root,'skills/master-icons'),{recursive:true});
console.log(`SVGs: synchronized ${emitted.size} files in ${((performance.now()-started)/1000).toFixed(2)}s`);
