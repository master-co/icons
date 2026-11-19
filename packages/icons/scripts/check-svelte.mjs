import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readdir,writeFile,rm} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {catalog} from '../src/catalog.mjs';
import {sizes,corners} from '../src/geometry.mjs';

// Check every generated component, but release the TypeScript/Svelte program
// between entry kinds and optical sizes to keep memory bounded.
const root=fileURLToPath(new URL('../',import.meta.url));
const cli=createRequire(import.meta.url).resolve('svelte-check/bin/svelte-check');
const files=(await readdir(new URL('../../icons-svelte/dist/',import.meta.url),{recursive:true}))
 .filter(path=>path.endsWith('.svelte')).sort();
const groups=['icons',...sizes.map(String),...sizes.map(size=>`native/${size}`)];
assert.equal(files.length,catalog.length*(1+2*sizes.length*corners.length)+1,'All dynamic, fixed and native variants and the shared Icon component must exist');
assert.ok(files.includes('Icon.svelte'),'Missing shared Svelte component');
assert.ok(files.every(path=>path==='Icon.svelte'||groups.some(group=>path.startsWith(group+'/'))),'Unexpected unchecked Svelte directory');
for(const group of groups){
 const selected=files.filter(path=>path.startsWith(group+'/')||(group==='icons'&&path==='Icon.svelte'));
 assert.equal(selected.length,group==='icons'?catalog.length+1:catalog.length*corners.length,group+': missing Svelte components');
 const config=new URL(`../tests/native/.svelte-check-${process.pid}.json`,import.meta.url);
 try{
  await writeFile(config,JSON.stringify({
   extends:'./tsconfig.json',
   include:[...(group==='icons'?['./*.svelte','../../../icons-svelte/dist/Icon.svelte']:[]),`../../../icons-svelte/dist/${group}/**/*.svelte`],
   exclude:[],
  }));
  console.log(`Svelte ${group}: ${selected.length} generated components${group==='icons'?' and native consumers':''}`);
  execFileSync(process.execPath,[cli,'--workspace',root,'--tsconfig',fileURLToPath(config)],{cwd:root,stdio:'inherit'});
 }finally{await rm(config,{force:true});}
}
