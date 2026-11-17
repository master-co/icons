import {spawn} from 'node:child_process'
import {mkdtempSync,rmSync} from 'node:fs'
import {tmpdir} from 'node:os'
import {join} from 'node:path'

// Every regression run starts without Vite cache, independently of local dev.
const cache=mkdtempSync(join(tmpdir(),'master-icons-vite-test-'))
const env={...process.env,MASTER_ICONS_VITE_CACHE_DIR:cache}
delete env.TURBO_HASH
const child=spawn(process.execPath,['site/scripts/dev.mjs','--port','4326'],{
 stdio:'inherit',
 env
})
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>child.kill(signal))
process.on('exit',()=>rmSync(cache,{recursive:true,force:true}))
child.on('error',error=>{console.error(error);process.exit(1)})
child.on('exit',code=>process.exit(code??0))
