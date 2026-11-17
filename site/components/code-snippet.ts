export const formats=['svg','react','vue','svelte','preact','astro'] as const
export type CodeFormat=typeof formats[number]
export const formatLabels={svg:'SVG',react:'React',vue:'Vue',svelte:'Svelte',preact:'Preact',astro:'Astro'}

export function codeSnippet({format,component,size,opticalSize,corner,svg,strokeWidth}:{format:CodeFormat;component:string;size:number;opticalSize:number;corner:string;svg:string;strokeWidth:number|null}){
 if(format==='svg')return svg
 const statement=`import { ${component} } from '@master/icons-${format}/${opticalSize}/${corner}';`
 const dimension=size===opticalSize?'':format==='vue'?` :size="${size}"`:` size={${size}}`
 const stroke=strokeWidth===null?'':format==='vue'?` :stroke-width="${strokeWidth}"`:` strokeWidth={${strokeWidth}}`
 const element=`<${component}${dimension}${stroke} />`
 if(format==='vue')return `<script setup lang="ts">\n${statement}\n</script>\n\n<template>\n  ${element}\n</template>`
 if(format==='svelte')return `<script lang="ts">\n  ${statement}\n</script>\n\n${element}`
 if(format==='astro')return `---\n${statement}\n---\n\n${element}`
 return `${statement}\n\n${element}`
}
