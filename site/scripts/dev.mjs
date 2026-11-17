import '../../scripts/check-site-node.mjs'
import { spawn } from 'node:child_process'
import { watch, statSync, readdirSync } from 'node:fs'
import { dirname, basename, join } from 'node:path'
import { fileURLToPath } from 'node:url'
const root=fileURLToPath(new URL('../../',import.meta.url))
const site=fileURLToPath(new URL('../',import.meta.url))
let generator,child,timer,building=false,pending=false,stopping=false
function run(args,cwd){return new Promise((resolve,reject)=>{
 generator=spawn(process.execPath,args,{cwd,stdio:'inherit'})
 generator.on('error',reject)
 generator.on('exit',code=>code===0?resolve():reject(new Error(`Generation exited with ${code}`)))
})}
async function build(){
 await run(['scripts/build-icons.mjs','--cache','--site'],root)
 if(!stopping)await run(['--import','tsx','scripts/prepare.ts'],site)
}
// Serialize saves, including those arriving while generation is still running.
async function rebuild(){
 if(stopping)return
 if(building){pending=true;return}
 building=true
 do{
  pending=false
  try{await build()}catch(error){if(!stopping)console.error('Generation failed; fix the source and save again.',error)}
 }while(pending&&!stopping)
 building=false
}
const changed=()=>{clearTimeout(timer);timer=setTimeout(rebuild,250)}
function signature(file){
 try{const {mtimeMs,size,ino}=statSync(file);return `${mtimeMs}:${size}:${ino}`}
 catch(error){if(error.code==='ENOENT')return 'missing';throw error}
}
function watchSource(path,recursive=false){
 const file=root+path,signatures=new Map()
 const folder=recursive?file:dirname(file)
 // macOS can report read/access metadata as a file change. Only schedule work
 // when writable metadata changes, and watch parents to survive atomic saves.
 const remember=path=>signatures.set(path,signature(path))
 if(recursive)for(const entry of readdirSync(file,{recursive:true,withFileTypes:true}))remember(join(entry.parentPath,entry.name))
 else remember(file)
 return watch(folder,{recursive},(_event,name)=>{
  if(!name){changed();return}
  if(!recursive&&name!==basename(file))return
  const target=join(folder,name),next=signature(target)
  if(signatures.get(target)===next)return
  signatures.set(target,next);changed()
 })
}
const watchers=[
 ...['packages/icons/src','packages/icons/scripts','packages/icons-svelte/src','packages/icons-astro/src','scripts/lib','licenses','site/content','site/i18n','site/assets'].map(path=>watchSource(path,true)),
 ...['LICENSE','THIRD_PARTY_NOTICES.md','references/manifest.json','bun.lock','packages/icons/package.json','packages/icons-svelte/package.json','packages/icons-astro/package.json','scripts/build-icons.mjs','scripts/build-frameworks.mjs','site/scripts/prepare.ts'].map(path=>watchSource(path))
]
function stop(signal){stopping=true;clearTimeout(timer);for(const watcher of watchers)watcher.close();generator?.kill(signal);child?.kill(signal)}
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>stop(signal))
try{building=true;await build();building=false;if(pending)await rebuild()}catch(error){stop('SIGTERM');throw error}
if(stopping)process.exit(0)
const cli=fileURLToPath(new URL('./bin/astro.mjs',import.meta.resolve('astro/package.json')))
child=spawn(process.execPath,[cli,'dev','--ignore-lock',...process.argv.slice(2)],{cwd:site,stdio:'inherit'})
child.on('error',error=>{console.error(error);stop('SIGTERM');process.exit(1)})
child.on('exit',code=>{stop('SIGTERM');process.exit(code??0)})
