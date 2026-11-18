<script lang="ts">
 import type {Corner,IconDefinition} from '@master/icons/runtime'
 import InlineIcon from './InlineIcon.svelte'
 import {loadDefinition} from './icon-data'
 // Grid icons draw inline from the same cached definition as the detail dialog: one JSON request per visible
 // icon, no per-icon component modules and never an external SVG.
 let {name,size,corner,stroke,active}:{name:string;size:number;corner:Corner;stroke:number|null;active:boolean}=$props()
 let definition=$state<IconDefinition>()
 let failed=$state(false)
 $effect(()=>{
  if(!active)return
  const selected=name
  let cancelled=false
  definition=undefined;failed=false
  loadDefinition(selected).then(value=>{if(!cancelled)definition=value}).catch(()=>{if(!cancelled)failed=true})
  return()=>{cancelled=true}
 })
</script>
<span class="explorer-icon" style:width={`${size}px`} style:height={`${size}px`} aria-hidden="true" data-icon={name} data-load-error={failed||undefined}>
 {#if definition}<InlineIcon {definition} {size} {corner} {stroke} />
 {/if}
</span>
