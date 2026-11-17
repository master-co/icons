import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {readdir,writeFile,rm} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {catalog} from '../src/catalog.mjs';

// Check every generated component, but release the TypeScript/Svelte program
// between optical sizes instead of retaining all 7,900 components at once.
const root=fileURLToPath(new URL('../',import.meta.url));
const cli=createRequire(import.meta.url).resolve('svelte-check/bin/svelte-check');
const files=(await readdir(new URL('../../icons-svelte/dist/',import.meta.url),{recursive:true}))
 .filter(path=>path.endsWith('.svelte')).sort();
const groups=['icons','16','20','24'];
assert.equal(files.length,catalog.length*10+1,'All dynamic/fixed variants and the shared Icon component must exist');
assert.ok(files.includes('Icon.svelte'),'Missing shared Svelte component');
assert.ok(files.every(path=>path==='Icon.svelte'||groups.includes(path.split('/')[0])),'Unexpected unchecked Svelte directory');
for(const group of groups){
 const selected=files.filter(path=>path.startsWith(group+'/')||(group==='icons'&&path==='Icon.svelte'));
 assert.equal(selected.length,group==='icons'?catalog.length+1:catalog.length*3,group+': missing Svelte components');
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
