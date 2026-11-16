import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { watch } from 'node:fs';

const root=fileURLToPath(new URL('..',import.meta.url));
const host='127.0.0.1', port=Number(process.env.PORT||4173);
execFileSync(process.execPath,['scripts/build.mjs'],{cwd:root,stdio:'inherit'});
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.md':'text/plain; charset=utf-8','.txt':'text/plain; charset=utf-8'};
const clients=new Set();
const server=http.createServer(async(req,res)=>{
  if(req.url==='/__events') {res.writeHead(200,{'Content-Type':'text/event-stream','Cache-Control':'no-cache','Connection':'keep-alive'});res.write(': connected\n\n');clients.add(res);req.on('close',()=>clients.delete(res));return;}
  try{
    let path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(path==='/')path='/dist/preview/index.html';
    if(path.startsWith('/docs/')||path==='/README.md'||path==='/THIRD_PARTY_NOTICES.md'){}else if(!path.startsWith('/dist/')&&!path.startsWith('/icons/')){res.writeHead(404);res.end('Not found');return;}
    const file=resolve(root,'.'+path);
    if(!file.startsWith(root.endsWith(sep)?root:root+sep)){res.writeHead(403);res.end('Forbidden');return;}
    let body=await readFile(file);
    if(extname(file)==='.html')body=Buffer.from(body.toString().replace('</body>',`<script>new EventSource('/__events').onmessage=()=>location.reload()</script></body>`));
    res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(body);
  }catch{res.writeHead(404);res.end('Not found');}
});
let timer;
for(const folder of ['src','preview','references'])watch(resolve(root,folder),{recursive:true},()=>{clearTimeout(timer);timer=setTimeout(()=>{try{execFileSync(process.execPath,['scripts/build.mjs'],{cwd:root,stdio:'inherit'});for(const client of clients)client.write('data: reload\n\n');}catch(error){console.error('Build failed; retaining server. Fix source and save again.');}},250);});
server.listen(port,host,()=>console.log(`Local: http://${host}:${port}`));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>{for(const client of clients)client.end();server.close(()=>process.exit());});
