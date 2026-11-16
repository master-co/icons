<script lang="ts" module>
 import dark from '../assets/brand/logo/master-icons/master-icons-horizontal-on-dark.svg?raw'
 import light from '../assets/brand/logo/master-icons/master-icons-horizontal-on-light.svg?raw'
 const escapeAttribute=(value:string)=>value.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;')
</script>

<script lang="ts">
 import type {SVGAttributes} from 'svelte/elements'
 let {class:className,...props}:SVGAttributes<SVGSVGElement>=$props()
 const instanceId=$props.id()
 function render(source:string,modeClass:string,mode:string){
  const attributes=Object.entries({...props,class:[className,modeClass].filter(Boolean).join(' ')})
   .filter(([,value])=>value!=null&&value!==false)
   .map(([name,value])=>` ${name}="${escapeAttribute(String(value))}"`).join('')
  return source.replace(/(\sid="|url\(#|href="#)/g,`$1${instanceId}-${mode}-`).replace(/<svg\b/,`<svg${attributes}`)
 }
</script>

<!-- Preserve the original artwork and isolate gradients across themes/instances. -->
{@html render(dark,'hidden@apply(--site-light)','dark')}
{@html render(light,'hidden@apply(--site-dark)','light')}
