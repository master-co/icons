import type {IconDefinition} from '@master/icons/runtime'

export type DownloadDefinition=IconDefinition & {header:string}

const definitions=new Map<string,Promise<DownloadDefinition>>()
export function loadDefinition(name:string){
 let pending=definitions.get(name)
 if(!pending){
  pending=fetch(`/data/${encodeURIComponent(name)}.json`).then(response=>{
   if(!response.ok)throw new Error(String(response.status))
   return response.json() as Promise<DownloadDefinition>
  }).catch(error=>{definitions.delete(name);throw error})
  definitions.set(name,pending)
 }
 return pending
}
