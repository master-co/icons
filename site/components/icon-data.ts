import type {IconDefinition} from '@master/icons/runtime'

const definitions=new Map<string,Promise<IconDefinition>>()
export function loadDefinition(name:string){
 let pending=definitions.get(name)
 if(!pending){
  pending=fetch(`/data/${encodeURIComponent(name)}.json`).then(response=>{
   if(!response.ok)throw new Error(String(response.status))
   return response.json() as Promise<IconDefinition>
  }).catch(error=>{definitions.delete(name);throw error})
  definitions.set(name,pending)
 }
 return pending
}
