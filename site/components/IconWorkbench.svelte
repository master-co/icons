<script lang="ts">
 import {onMount} from 'svelte'
 import {getOpticalSize,renderSvg,resolveIcon,type Corner} from '@master/icons/runtime'
 import {clampStroke,strokeDefinition,strokeRanges} from '../../scripts/lib/stroke-width.mjs'
 import {loadDefinition,type DownloadDefinition} from './icon-data'
 import InlineIcon from './InlineIcon.svelte'
 import {codeSnippet,formats,formatLabels,type CodeFormat} from './code-snippet'
 import {svgDownload,svgSnippet} from './svg-output'

 let {name,component,rendering,nativeFile,notice,copy}:{
  name:string;component:string;rendering?:string;nativeFile:string;notice?:string;copy:Record<string,string>
 }=$props()
 let definition=$state.raw<DownloadDefinition>()
 let failed=$state(false)
 let size=$state(24),corner=$state<Corner>('soft'),stroke=$state<number|null>(null)
 let format=$state<CodeFormat>('react'),message=$state('')
 let code:HTMLTextAreaElement
 const opticalSize=$derived(getOpticalSize(size))
 const range=$derived(strokeRanges[opticalSize])
 const width=$derived(stroke??(definition?resolveIcon(definition,{size,corner}).strokeWidth:1.75))
 const svg=$derived(definition?renderSvg(strokeDefinition(definition,stroke),{size,corner}):nativeFile.slice(nativeFile.indexOf('<svg')).trimEnd())
 const download=$derived(svgDownload(definition?`${definition.header}${svg}\n`:nativeFile))
 const snippet=$derived(codeSnippet({format,component,size,opticalSize,corner,strokeWidth:stroke,svg:svgSnippet(svg,notice)}))
 async function load() {
  failed=false
  try {definition=await loadDefinition(name)}
  catch {failed=true}
 }
 async function copyCode() {
  try {await navigator.clipboard.writeText(snippet);message=copy.Copied}
  catch {code.focus();code.select();message=copy['Copy manually from the selected text.']}
 }
 onMount(()=>{void load()})
 $effect(()=>{snippet;message=''})
</script>

<div class="specimen-workbench">
 <figure class="specimen-preview">
  <div data-icon-preview>{@html svg}</div>
  <figcaption>
   <span>{copy['Enlarged preview']}</span>
   <span class="specimen-actual">{#if definition}<InlineIcon {definition} {size} {corner} {stroke} />{/if}{size} px</span>
  </figcaption>
 </figure>
 <div class="specimen-options">
  <div class="specimen-selects">
   <label class="field">{copy['Display size']}<select class="select" disabled={!definition} bind:value={size} onchange={()=>stroke=clampStroke(stroke,getOpticalSize(size))}>
    {#each [16,20,24,32,48,64] as value}<option class="select-option" {value}>{value} px</option>{/each}
   </select></label>
   {#if !rendering}
    <label class="field">{copy.Corners}<select class="select" disabled={!definition} bind:value={corner}>
     {#each ['sharp','soft','rounded'] as value}<option class="select-option" {value}>{copy[value[0].toUpperCase()+value.slice(1)]}</option>{/each}
    </select></label>
   {/if}
  </div>
  {#if rendering!=='brand-silhouette'}
   <div class="field">
    <label for="icon-stroke">{copy['Stroke width']} · {width.toFixed(2)}</label>
    <input id="icon-stroke" class="slider" type="range" disabled={!definition} min={range[0]} max={range[1]} step="0.25" value={width} oninput={event=>stroke=event.currentTarget.valueAsNumber} />
    <button type="button" class="link link-quiet" disabled={stroke===null} onclick={()=>stroke=null}>{copy['Reset stroke']}</button>
   </div>
  {/if}
  {#if failed}<p role="alert">{copy['Unable to load this icon. Please try again.']} <button type="button" class="btn btn-sm" onclick={load}>{copy.Retry}</button></p>{/if}
  <label class="field">{copy['Code format']}<select class="select" bind:value={format}>
   {#each formats as value}<option class="select-option" {value}>{formatLabels[value]}</option>{/each}
  </select></label>
  <label class="field">{copy.Code}<textarea class="input" bind:this={code} value={snippet} readonly rows="4" spellcheck="false"></textarea></label>
  <div class="specimen-actions">
   <a class="btn" href={download} download={name+'.svg'}>{copy['Download SVG']}</a>
   <button type="button" class="btn btn-primary" onclick={copyCode}>{copy['Copy '+formatLabels[format]]}</button>
  </div>
  <p class="copy-status" role="status">{message}</p>
 </div>
</div>
