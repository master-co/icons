import '../../scripts/check-site-node.mjs'
import { spawn, execFileSync } from 'node:child_process'
import { watch } from 'node:fs'
import { fileURLToPath } from 'node:url'
const root=fileURLToPath(new URL('../../',import.meta.url))
const site=fileURLToPath(new URL('../',import.meta.url))
function build(){execFileSync(process.execPath,['scripts/build.mjs'],{cwd:root+'packages/icons',stdio:'inherit'});execFileSync(process.execPath,['--import','tsx','scripts/prepare.ts'],{cwd:site,stdio:'inherit'})}
build()
let timer
const watcher=watch(root+'packages/icons/src',{recursive:true},()=>{clearTimeout(timer);timer=setTimeout(()=>{try{build()}catch{console.error('Icon rebuild failed; fix the source and save again.')}},250)})
const cli=fileURLToPath(new URL('./bin/astro.mjs',import.meta.resolve('astro/package.json')))
const child=spawn(process.execPath,[cli,'dev','--ignore-lock',...process.argv.slice(2)],{cwd:site,stdio:'inherit'})
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>{clearTimeout(timer);watcher.close();child.kill(signal)})
child.on('exit',code=>{watcher.close();process.exit(code??0)})
