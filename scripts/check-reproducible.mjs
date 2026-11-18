import { execFileSync } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
async function snapshot(){
  const files=[];
  for(const root of ['dist','packages/icons/dist','packages/icons/icons',...['react','vue','svelte','preact','astro'].map(name=>`packages/icons-${name}/dist`)])for(const entry of await readdir(root,{recursive:true,withFileTypes:true}))if(entry.isFile())files.push(entry.parentPath+'/'+entry.name);
  // Hash in bounded batches: reading every output at once exceeds the open-file limit on Linux runners (EMFILE).
  const hashes={};
  files.sort();
  for(let index=0;index<files.length;index+=128){
    await Promise.all(files.slice(index,index+128).map(async file=>{hashes[file]=createHash('sha256').update(await readFile(file)).digest('hex')}));
  }
  return Object.fromEntries(files.map(file=>[file,hashes[file]]));
}
execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'inherit',env:{...process.env,TZ:'UTC'}});
const first=await snapshot();
execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'inherit',env:{...process.env,TZ:'Asia/Taipei'}});
assert.deepEqual(await snapshot(),first);
console.log(`Reproducible: ${Object.keys(first).length} outputs match byte-for-byte across UTC and Asia/Taipei builds.`);
