import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,rename,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {setTimeout as delay} from 'node:timers/promises';
import {watchSource} from '../../../scripts/lib/watch-sources.mjs';

test('source watching ignores Turbo logs and survives atomic editor saves',async()=>{
 const folder=await mkdtemp(join(tmpdir(),'master-icons-watch-'));
 const source=join(folder,'source.mjs');
 let directoryChanges=0,fileChanges=0;
 await writeFile(source,'first');
 const directory=watchSource(folder,()=>directoryChanges++,true);
 const file=watchSource(source,()=>fileChanges++);
 async function waitFor(predicate){
  const deadline=Date.now()+3000;
  while(!predicate()&&Date.now()<deadline)await delay(20);
  assert.ok(predicate(),'Expected source change to be observed');
 }
 try{
  await mkdir(join(folder,'.turbo'));
  await writeFile(join(folder,'.turbo','turbo-build.log'),'cache hit');
  await delay(150);
  assert.equal(directoryChanges,0,'Task log writes must not trigger rebuild loops');
  await writeFile(join(folder,'temporary'),'second');
  await rename(join(folder,'temporary'),source);
  await waitFor(()=>fileChanges>0&&directoryChanges>0);
  const previous=fileChanges;
  await writeFile(source,'third save');
  await waitFor(()=>fileChanges>previous);
  const beforeDeletion=fileChanges;
  await rm(source);
  await waitFor(()=>fileChanges>beforeDeletion);
  const beforeRecreation=fileChanges;
  await writeFile(source,'recreated');
  await waitFor(()=>fileChanges>beforeRecreation);
 }finally{directory.close();file.close();await rm(folder,{recursive:true,force:true});}
});
