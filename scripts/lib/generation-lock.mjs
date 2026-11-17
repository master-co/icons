import { mkdirSync, readFileSync, writeFileSync, rmSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { setTimeout } from 'node:timers/promises';

const held=new Set();
function alive(pid){
 try{process.kill(pid,0);return true}catch(error){if(error.code==='ESRCH')return false;throw error}
}
function abandoned(lock){
 try{const pid=Number(readFileSync(join(lock,'pid'),'utf8'));if(Number.isInteger(pid)&&pid>0)return !alive(pid)}
 catch(error){
  if(error.code!=='ENOENT')throw error;
 }
 // Allow an owner to finish writing its PID after the atomic mkdir.
 try{return Date.now()-statSync(lock).mtimeMs>5000}catch(error){if(error.code==='ENOENT')return false;throw error}
}

// Standalone generator processes hold one repository-wide lock until exit.
// A prepare process keeps it while copying the stroke results into public/ too.
export async function lockGeneration(root,scope='shared'){
 const lock=join(root,`work/generation-${scope}.lock`);
 if(held.has(lock))return;
 mkdirSync(join(root,'work'),{recursive:true});
 let announced=false;
 for(;;){
  try{
   mkdirSync(lock);
   writeFileSync(join(lock,'pid'),String(process.pid));
   break;
  }catch(error){if(error.code!=='EEXIST')throw error}
  if(abandoned(lock)){
   // Only one contender may reclaim a dead owner's lock; recheck after taking
   // the recovery marker in case another contender has already replaced it.
   const recovery=join(lock,'recovery');
   try{
    mkdirSync(recovery);
    writeFileSync(join(recovery,'pid'),String(process.pid));
    if(abandoned(lock))rmSync(lock,{recursive:true,force:true});
    else rmSync(recovery,{recursive:true,force:true});
   }catch(error){
    if(error.code==='EEXIST'&&abandoned(recovery))rmSync(recovery,{recursive:true,force:true});
    else if(!['EEXIST','ENOENT'].includes(error.code))throw error;
   }
  }
  if(!announced){console.log('Waiting for another icon generator…');announced=true}
  await setTimeout(100);
 }
 held.add(lock);
 const release=()=>{
  try{if(readFileSync(join(lock,'pid'),'utf8')===String(process.pid))rmSync(lock,{recursive:true,force:true})}
  catch(error){if(error.code!=='ENOENT')throw error}
  held.delete(lock);
 };
 process.once('exit',release);
 // Signal exits also release the lock. SIGKILL is recovered by the next owner.
 process.once('SIGINT',()=>process.exit(130));
 process.once('SIGTERM',()=>process.exit(143));
}
