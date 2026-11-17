import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import {watchSource} from './lib/watch-sources.mjs';
import {runTurbo,runTurboSync} from './lib/turbo.mjs';

if(!process.env.TURBO_HASH&&!process.argv.includes('--serve-only'))process.exit(await runTurbo(['run','dev','--filter=@master/icons-review']));

const root=fileURLToPath(new URL('..',import.meta.url));
const host='127.0.0.1', port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.md':'text/plain; charset=utf-8','.txt':'text/plain; charset=utf-8'};
const clients=new Set();
const server=http.createServer(async(req,res)=>{
  if(req.url==='/__events') {res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache','Connection':'keep-alive'});res.write(': connected\n\n');clients.add(res);req.on('close',()=>clients.delete(res));return;}
  try{
    let path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(path==='/')path='/dist/preview/index.html';
    if(path.startsWith('/docs/')||path==='/README.md'||path==='/THIRD_PARTY_NOTICES.md'){}else if(!path.startsWith('/dist/')&&!path.startsWith('/icons/')){res.writeHead(404);res.end('Not found');return;}
    const file=resolve(root,path.startsWith('/icons/') ? 'packages/icons'+path : '.'+path);
    if(!file.startsWith(root.endsWith(sep)?root:root+sep)){res.writeHead(403);res.end('Forbidden');return;}
    let body=await readFile(file);
    if(extname(file)==='.html')body=Buffer.from(body.toString().replace('</body>',`<script>new EventSource('/__events').onmessage=()=>location.reload()</script></body>`));
    res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(body);
  }catch{res.writeHead(404);res.end('Not found');}
});
let timer;
const changed=()=>{clearTimeout(timer);timer=setTimeout(()=>{try{runTurboSync(['run','build','--filter=@master/icons-review']);for(const client of clients)client.write('data: reload\n\n');}catch{console.error('Build failed; retaining server. Fix source and save again.');}},250);};
const watchers=process.argv.includes('--serve-only')?[]:[
  ...['packages/icons/src','packages/icons/scripts','preview','references','licenses','scripts/lib'].map(path=>watchSource(resolve(root,path),changed,true)),
  ...['LICENSE','THIRD_PARTY_NOTICES.md','docs/refinement-ledger.json','bun.lock','turbo.json','packages/icons/package.json','scripts/build-review.mjs','scripts/build-strokes.mjs','scripts/standalone.mjs'].map(path=>watchSource(resolve(root,path),changed))
];
server.listen(port,host,()=>console.log(`Local: http://${host}:${port}`));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>{clearTimeout(timer);for(const watcher of watchers)watcher.close();for(const client of clients)client.end();server.close(()=>process.exit());});
