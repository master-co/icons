import type {Plugin} from 'vite'
import sirv from 'sirv'

export function generatedAssets():Plugin {
 let dispose=()=>{}
 return {
  name:'master-icons:generated-assets',
  apply:'serve',
  configureServer(server){
   // Vite's public-file inventory relies on watcher events. Serve directly
   // from disk so newly generated/deleted assets also work with watching off.
   server.middlewares.use(sirv(server.config.publicDir,{
    dev:true,extensions:[],
    setHeaders(response,path){if(path.endsWith('.ico'))response.setHeader('Content-Type','image/x-icon')}
   }))
   const onMessage=(message:unknown)=>{
    if(message&&typeof message==='object'&&'type' in message&&message.type==='master-icons:generated'){
     server.ws.send({type:'full-reload',path:'*'})
    }
   }
   process.on('message',onMessage)
   dispose=()=>{process.off('message',onMessage)}
  },
  closeBundle(){dispose()}
 }
}
