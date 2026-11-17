import '../../scripts/check-site-node.mjs'
import {execFileSync} from 'node:child_process'
import {fileURLToPath} from 'node:url'
import {runTurbo} from '../../scripts/lib/turbo.mjs'
const [task,...args]=process.argv.slice(2)
if(!['build','prepare-site','type-check'].includes(task))throw new Error(`Unknown site task: ${task}`)
if(!process.env.TURBO_HASH){
 process.exitCode=await runTurbo(['run',task,'--filter=@master/icons-site',...(args.length?['--',...args]:[])])
}else{
 const cwd=fileURLToPath(new URL('../',import.meta.url))
 const run=(command,args)=>execFileSync(command,args,{cwd,stdio:'inherit'})
 const astro=fileURLToPath(new URL('./bin/astro.mjs',import.meta.resolve('astro/package.json')))
 if(task==='prepare-site')run(process.execPath,['--import','tsx','scripts/prepare.ts',...args])
 if(task==='build')run(process.execPath,[astro,'build',...args])
 if(task==='type-check'){
  run(process.execPath,[astro,'sync'])
  run('bun',['x','--no-install','astro-check','--tsconfig','tsconfig.json',...args])
  run('bun',['x','--no-install','svelte-check','--tsconfig','tsconfig.json'])
 }
}
