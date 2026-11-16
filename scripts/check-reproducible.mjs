import { execFileSync } from 'node:child_process';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
async function snapshot(){
  const files=[];
  for(const root of ['dist','icons'])for(const entry of await readdir(root,{recursive:true,withFileTypes:true}))if(entry.isFile())files.push(entry.parentPath+'/'+entry.name);
  return Object.fromEntries(await Promise.all(files.sort().map(async file=>[file,createHash('sha256').update(await readFile(file)).digest('hex')])));
}
execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'inherit',env:{...process.env,TZ:'UTC'}});
const first=await snapshot();
execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'inherit',env:{...process.env,TZ:'Asia/Taipei'}});
assert.deepEqual(await snapshot(),first);
console.log(`Reproducible: ${Object.keys(first).length} outputs match byte-for-byte across UTC and Asia/Taipei builds.`);
