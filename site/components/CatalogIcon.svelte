<script module lang="ts">
 import type {Component} from 'svelte'
 import type {IconProps} from '@master/icons-svelte'
 const modules=import.meta.glob<{default:Component<IconProps>}>('../../packages/icons-svelte/dist/icons/*.svelte')
 const components=new Map<string,Promise<Component<IconProps>>>()
 function loadComponent(name:string){
  let pending=components.get(name)
  if(!pending){
   const load=modules[`../../packages/icons-svelte/dist/icons/${name}.svelte`]
   if(!load)return Promise.reject(new Error(`Missing icon: ${name}`))
   pending=load().then(module=>module.default).catch(error=>{components.delete(name);throw error})
   components.set(name,pending)
  }
  return pending
 }
</script>
<script lang="ts">
 import type {Corner} from '@master/icons/runtime'
 let {name,size,corner,stroke,active}:{name:string;size:number;corner:Corner;stroke:number|null;active:boolean}=$props()
 let Icon=$state<Component<IconProps>>()
 let failed=$state(false)
 $effect(()=>{
  if(!active)return
  const selected=name
  let cancelled=false
  Icon=undefined;failed=false
  const task=loadComponent(selected)
  task.then(value=>{if(!cancelled)Icon=value}).catch(()=>{if(!cancelled)failed=true})
  return()=>{cancelled=true}
 })
</script>
<span class="explorer-icon" style:width={`${size}px`} style:height={`${size}px`} aria-hidden="true" data-icon={name} data-load-error={failed||undefined}>
 {#if Icon}<Icon {size} {corner} strokeWidth={stroke??undefined} />
 {/if}
</span>
