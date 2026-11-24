import {readFileSync} from 'node:fs'
import {join} from 'node:path'
import type {Connect,Plugin} from 'vite'
import sirv from 'sirv'

// Mirror the site's exact Cloudflare Pages 301 rules when running locally.
function redirectRules(directory:string) {
 return new Map(readFileSync(join(directory,'_redirects'),'utf8').trim().split(/\r?\n/).map(line=>{
  const [from,to]=line.split(/\s+/)
  return [from,to]
 }))
}
function redirectMiddleware(rules:()=>Map<string,string>):Connect.NextHandleFunction {
 return (request,response,next)=>{
  const url=new URL(request.url??'/','http://localhost')
  // Guide metadata uses the shared shell's OG endpoint until the static postbuild.
  const guide=url.searchParams.get('pathname')??''
  const target=url.pathname==='/api/og-image'&&/^\/guide\/[\w-]+$/.test(guide)
   ? '/social'+guide+'.png' : rules().get(url.pathname)
  if(!target)return next()
  const isGuideImage=url.pathname==='/api/og-image'
  response.writeHead(isGuideImage?302:301,{Location:target+(isGuideImage?'':url.search)})
  response.end()
 }
}
export function generatedAssets():Plugin {
 let dispose=()=>{}
 return {
  name:'master-icons:generated-assets',
  apply:'serve',
  configureServer(server){
   const directory=server.config.publicDir
   let rules=redirectRules(directory)
   server.middlewares.use(redirectMiddleware(()=>rules))
   const routes=()=>JSON.parse(readFileSync(join(directory,'catalog.json'),'utf8')).icons
    .filter((icon:{aliasOf?:string})=>!icon.aliasOf).map((icon:{name:string})=>icon.name).sort().join('\n')
   let inventory=routes()
   // Vite's public-file inventory relies on watcher events. Serve directly
   // from disk so newly generated/deleted assets also work with watching off.
   server.middlewares.use(sirv(directory,{
    dev:true,extensions:[],
    setHeaders(response,path){if(path.endsWith('.ico'))response.setHeader('Content-Type','image/x-icon')}
   }))
   const onMessage=(message:unknown)=>{
    if(message&&typeof message==='object'&&'type' in message&&message.type==='master-icons:generated'){
     rules=redirectRules(directory)
     const next=routes()
     if(next!==inventory){inventory=next;void server.restart();return}
     server.ws.send({type:'full-reload',path:'*'})
    }
   }
   process.on('message',onMessage)
   dispose=()=>{process.off('message',onMessage)}
  },
  closeBundle(){dispose()}
 }
}
