import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { setTimeout } from 'node:timers/promises';

test('generators serialize shared outputs and recover an interrupted owner', {timeout:10000}, async t=>{
 const root=await mkdtemp(join(tmpdir(),'icons-generation-lock-'));
 const children=[];
 t.after(async()=>{for(const child of children)child.kill('SIGKILL');await rm(root,{recursive:true,force:true})});
 const start=scope=>{
  const child=spawn(process.execPath,['--input-type=module','-e',`
   import {lockGeneration} from ${JSON.stringify(new URL('../../../scripts/lib/generation-lock.mjs',import.meta.url).href)};
   await lockGeneration(${JSON.stringify(root)},${JSON.stringify(scope)});
   process.send('acquired');
   await new Promise(resolve=>process.once('message',resolve));
  `],{stdio:['ignore','ignore','inherit','ipc']});
  children.push(child);
  return {child,acquired:once(child,'message')};
 };
 const first=start('shared');await first.acquired;
 const second=start('shared');let waiting=true;second.acquired.then(()=>waiting=false);
 await setTimeout(200);
 assert.equal(waiting,true,'Second process must wait before touching the same output');
 const independent=start('svelte');await independent.acquired;
 independent.child.send('done');await once(independent.child,'exit');
 first.child.kill('SIGKILL');await once(first.child,'exit');
 await second.acquired;
 second.child.send('done');await once(second.child,'exit');
 const third=start('shared');await third.acquired;
 third.child.send('done');await once(third.child,'exit');
});
