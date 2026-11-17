import {spawn,execFileSync} from 'node:child_process';
import {rmSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../../',import.meta.url));
const cli=fileURLToPath(new URL('../../node_modules/turbo/bin/turbo',import.meta.url));
function invalidateStandaloneCaches(args){
 if(args.some(arg=>arg.startsWith('--dry')))return;
 // Turbo can restore an older artifact without running its generator. A
 // completion marker from a later standalone build would then describe the
 // wrong bytes. Standalone caches may resume after this Turbo invocation.
 for(const name of ['icons',...['react','vue','svelte','preact','astro'].map(name=>'icons-'+name),'strokes','site-assets','site-guides']){
  rmSync(join(root,'work/cache',name+'.json'),{force:true});
 }
}
export function turboEnvironment(){
 const env={...process.env,MASTER_ICONS_NODE_VERSION:process.versions.node};
 delete env.TURBO_HASH;
 return env;
}
export function runTurboSync(args,options={}){
 invalidateStandaloneCaches(args);
 return execFileSync(process.execPath,[cli,...args],{cwd:root,stdio:'inherit',...options,env:{...turboEnvironment(),...options.env}});
}
export async function runTurbo(args){
 invalidateStandaloneCaches(args);
 const child=spawn(process.execPath,[cli,...args],{cwd:root,stdio:'inherit',env:turboEnvironment()});
 const interrupt=()=>child.kill('SIGINT'),terminate=()=>child.kill('SIGTERM');
 process.on('SIGINT',interrupt);process.on('SIGTERM',terminate);
 try{return await new Promise((resolve,reject)=>{child.once('error',reject);child.once('exit',(code,signal)=>resolve(code??(signal==='SIGINT'?130:143)));});}
 finally{process.off('SIGINT',interrupt);process.off('SIGTERM',terminate);}
}
