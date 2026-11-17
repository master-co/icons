<script lang="ts">
 import {resolveIcon,svgAttributes,type IconDefinition,type IconNode,type Corner,type OpticalSize} from '@master/icons/runtime'
 import {strokeDefinition} from '../../scripts/lib/stroke-width.mjs'
 let {definition,size=24,opticalSize,corner='soft',stroke=null}:{definition:IconDefinition;size?:number;opticalSize?:OpticalSize;corner?:Corner;stroke?:number|null}=$props()
 const prefix=$props.id()
 const master=$derived(resolveIcon(strokeDefinition(definition,stroke),{size,opticalSize,corner}))
 const attributes=$derived(svgAttributes(master))
 // Multiple specimens can contain the same mask IDs. Scope both IDs and refs
 // to the component so the grid, dialog and optical samples stay independent.
 const attrs=(values:Record<string,string|number>)=>Object.fromEntries(Object.entries(values).map(([key,value])=>[
  key,key==='id'?`${prefix}-${value}`:typeof value==='string'?value.replace(/url\(#([^)]+)\)/g,(_,id)=>`url(#${prefix}-${id})`):value
 ]))
</script>

{#snippet nodes(items:readonly IconNode[])}
 {#each items as [tag,attributes,children]}
  <svelte:element this={tag} xmlns="http://www.w3.org/2000/svg" {...attrs(attributes)}>
   {#if children}{@render nodes(children)}{/if}
  </svelte:element>
 {/each}
{/snippet}
<svg {...attributes}>{@render nodes(master.nodes)}</svg>
