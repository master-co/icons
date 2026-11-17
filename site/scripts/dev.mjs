import '../../scripts/check-site-node.mjs'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import {watchSource} from '../../scripts/lib/watch-sources.mjs'
import {runTurbo,turboEnvironment} from '../../scripts/lib/turbo.mjs'
if(!process.env.TURBO_HASH)process.exit(await runTurbo(['run','dev','--filter=@master/icons-site',...(process.argv.length>2?['--',...process.argv.slice(2)]:[])]))
const root=fileURLToPath(new URL('../../',import.meta.url))
const site=fileURLToPath(new URL('../',import.meta.url))
let generator,child,timer,building=false,pending=false,stopping=false
function run(args,cwd){return new Promise((resolve,reject)=>{
 generator=spawn(process.execPath,args,{cwd,stdio:'inherit',env:turboEnvironment()})
 generator.on('error',reject)
 generator.on('exit',code=>code===0?resolve():reject(new Error(`Generation exited with ${code}`)))
})}
async function build(){
 await run(['scripts/turbo.mjs','run','prepare-site','--filter=@master/icons-site'],root)
 if(child?.connected)child.send({type:'master-icons:generated'})
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
const watchers=[
 ...['packages/icons/src','packages/icons/scripts','packages/icons-svelte/src','packages/icons-astro/src','scripts/lib','licenses','site/content','site/i18n','site/assets'].map(path=>watchSource(root+path,changed,true)),
 ...['LICENSE','THIRD_PARTY_NOTICES.md','references/manifest.json','bun.lock','turbo.json','packages/icons/package.json','packages/icons-svelte/package.json','packages/icons-astro/package.json','scripts/build-frameworks.mjs','scripts/build-strokes.mjs','site/scripts/prepare.ts','site/scripts/task.mjs'].map(path=>watchSource(root+path,changed))
]
function stop(signal){stopping=true;clearTimeout(timer);for(const watcher of watchers)watcher.close();generator?.kill(signal);child?.kill(signal)}
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>stop(signal))
// Turbo has already completed prepare-site and all upstream builds.
if(stopping)process.exit(0)
const cli=fileURLToPath(new URL('./bin/astro.mjs',import.meta.resolve('astro/package.json')))
child=spawn(process.execPath,[cli,'dev','--ignore-lock',...process.argv.slice(2)],{cwd:site,stdio:['inherit','inherit','inherit','ipc']})
child.on('error',error=>{console.error(error);stop('SIGTERM');process.exit(1)})
child.on('exit',code=>{stop('SIGTERM');process.exit(code??0)})
