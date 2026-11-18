<script lang="ts">
 import {parseStroke, clampStroke, strokeRanges, strokeDefinition} from '../../scripts/lib/stroke-width.mjs'
 // Direct native modules keep development imports limited to these four controls.
 import XIcon from '@master/icons-svelte/16/soft/x'
 import CopyIcon from '@master/icons-svelte/16/soft/copy'
 import DownloadIcon from '@master/icons-svelte/16/soft/download'
 import CheckIcon from '@master/icons-svelte/16/soft/check'
 import CatalogIcon from './CatalogIcon.svelte'
 import InlineIcon from './InlineIcon.svelte'
 import {loadDefinition} from './icon-data'
 import {releaseDownloads} from './downloads'
 import {codeSnippet,formats,formatLabels,type CodeFormat} from './code-snippet'
 import {onMount, tick, type Snippet} from 'svelte'
 import '@master/internal-site/styles/system/sidebar.css'
 import {renderSvg, getOpticalSize, type IconDefinition} from '@master/icons/runtime'
 import license from '../../LICENSE?raw'
 type Artwork={name:string;label?:string;component:string;notice?:string;copyright?:string}
 type Entry=Artwork & {label:string;category:string;keywords:string[];mark?:Artwork;outline?:Artwork;styleOf?:string}
 let {entries,categories,copy,locale,children}:{entries:Entry[];categories:{id:string;label:string}[];copy:Record<string,string>;locale:string;children?:Snippet}=$props()
 const t=(key:string)=>copy[key]??key
 const instanceId=$props.id()
 const sizes=[16,20,24] as const
 const displaySizes=[16,20,24,32,48,64] as const
 type DisplaySize=typeof displaySizes[number]
 const corners=['sharp','soft','rounded'] as const
 let query=$state(''),browseCategory=$state('all'),size=$state<DisplaySize>(24),corner=$state<'sharp'|'soft'|'rounded'>('soft'),page=$state(1),view=$state('library')
 let stroke=$state<number|null>(null)
 let ready=$state(false),selected=$state<Entry|null>(null),definition=$state<IconDefinition|null>(null),error=$state(false),notice=$state('')
 let dialog:HTMLDialogElement
 let code=$state<HTMLTextAreaElement>()
 let request=0
 let useOutline=$state(false)
 const artwork=$derived(useOutline && selected?.outline ? selected.outline : selected?.mark??selected)
 let format=$state<CodeFormat>('svg')
 const label=(entry:Entry)=>entry.category==='brands'||locale!=='en'?entry.label:entry.name.replaceAll('-',' ')
 const translation=(entry:Entry)=>locale!=='en'&&entry.category!=='brands'?entry.label:''
 const searchTerm=$derived(query.trim().toLowerCase())
 const activeCategory=$derived(searchTerm?'all':browseCategory)
 const filtered=$derived.by(()=>{
  if(!searchTerm)return browseCategory==='all'?entries:entries.filter(entry=>entry.category===browseCategory)
  const nameTerm=searchTerm.replace(/\s+/g,'-')
  const matches=entries.filter(entry=>{
   const text=`${entry.name} ${entry.label} ${entry.keywords.join(' ')}`.toLowerCase()
   return text.includes(searchTerm)||(nameTerm!==searchTerm&&text.includes(nameTerm))
  })
  const exactIndex=matches.findIndex(entry=>entry.name===nameTerm)
  if(exactIndex>0)matches.unshift(...matches.splice(exactIndex,1))
  return matches
 })
 const limit=$derived(view==='optical'?24:96)
 const pages=$derived(Math.max(1,Math.ceil(filtered.length/limit)))
 const current=$derived(Math.min(page,pages))
 const visible=$derived(filtered.slice((current-1)*limit,current*limit))
 const opticalSize=$derived(getOpticalSize(size))
 const strokeRange=$derived(strokeRanges[opticalSize])
 const nativeStroke=$derived(({16:1.25,20:1.5,24:1.75})[opticalSize])
 const rawSvg=$derived(definition?renderSvg(strokeDefinition(definition,stroke),{size,corner}):'')
 const svg=$derived(artwork?.notice && rawSvg ? `<!--\n${artwork.notice.replaceAll('--','—')}\n-->\n${rawSvg}` : rawSvg)
 const snippet=$derived(artwork?codeSnippet({format,component:artwork.component,size,opticalSize,corner,svg,strokeWidth:stroke}):'')
 // Native masters link to their published files; scaled sizes and custom weights download the rendered SVG.
 // Download sets are assets of the newest GitHub release; custom weights come as one archive per optical size.
 const setURL=$derived(`${releaseDownloads}/master-icons-${opticalSize}-${stroke===null?corner:'strokes'}.zip`)
 // Custom weights carry the same notice as the files in their ZIP set.
 const weighted=$derived(artwork&&stroke!==null?`<!--\n${license.trim()}${artwork.notice?`\n\n${artwork.notice.trim()}`:artwork.copyright?`\n${artwork.copyright}`:''}\n-->\n${rawSvg}\n`:svg)
 const download=$derived(artwork&&size<=24&&stroke===null?`/icons/${size}/${corner}/${artwork.name}.svg`:`data:image/svg+xml;charset=utf-8,${encodeURIComponent(weighted)}`)
 const cornerLabel=(c:string)=>t(c[0].toUpperCase()+c.slice(1))
 const categoryOptions=$derived([
  {id:'all',label:t('All icons'),count:entries.length},
  ...categories.map(c=>({id:c.id,label:t(c.label),count:entries.filter(entry=>entry.category===c.id).length}))
 ])
 function updateSearch(value:string){
  query=value
  page=1
 }
 function selectCategory(id:string){
  if(id!==activeCategory){
   browseCategory=id
   query=''
  }
  page=1
 }
 function categoryURL(id:string){
  const params=new URLSearchParams({size:String(size),corner,view})
  const keepSearch=id==='all'&&Boolean(searchTerm)
  const nextCategory=keepSearch?browseCategory:id
  if(stroke!==null)params.set('stroke',String(stroke))
  if(keepSearch)params.set('q',query)
  if(nextCategory!=='all')params.set('category',nextCategory)
  return `?${params}`
 }
 function fromURL(){
  const p=new URLSearchParams(location.search)
  const requestedCategory=p.get('category')
  query=p.get('q')??''
  browseCategory=categories.find(x=>x.id===requestedCategory)?.id??'all'
  size=displaySizes.includes(Number(p.get('size')) as DisplaySize)?Number(p.get('size')) as DisplaySize:24
  stroke=parseStroke(p.get('stroke'),getOpticalSize(size))
  corner=corners.includes(p.get('corner') as 'soft')?p.get('corner') as 'soft':'soft'
  view=p.get('view')==='optical'?'optical':'library'
  const n=Number(p.get('page'));page=Number.isSafeInteger(n)&&n>0?n:1
 }
 onMount(()=>{fromURL();ready=true;window.addEventListener('popstate',fromURL);return()=>window.removeEventListener('popstate',fromURL)})
 $effect(()=>{
  if(!ready)return
  const p=new URLSearchParams({size:String(size),corner,view})
  if(searchTerm)p.set('q',query)
  if(browseCategory!=='all')p.set('category',browseCategory)
  if(current>1)p.set('page',String(current))
  if(stroke!==null)p.set('stroke',String(stroke))
  history.replaceState(null,'',`${location.pathname}?${p}`)
 })
 async function load(entry:Artwork){
  const revision=++request;definition=null;error=false
  try{const data=await loadDefinition(entry.name);if(revision===request)definition=data}
  catch{if(revision===request)error=true}
 }
 async function open(entry:Entry,button:HTMLButtonElement){button.focus();useOutline=Boolean(entry.styleOf);selected=entry;format='svg';notice='';await tick();dialog.showModal();await load(entry)}
 function chooseArtwork(outline:boolean){
  if(!selected || outline===useOutline)return
  useOutline=outline
  void load(outline && selected.outline ? selected.outline : selected.mark??selected)
 }
 function clearSelection(){request++;selected=null;definition=null;notice=''}
 function close(){dialog.close();clearSelection()}
 function chooseMaster(s:typeof sizes[number],c:typeof corners[number]){size=s;corner=c;stroke=clampStroke(stroke,s);notice=''}
 $effect(()=>{snippet;notice=''})
 async function copyText(text:string){
  try{await navigator.clipboard.writeText(text);notice=t('Copied')}
  catch{if(code){code.value=text;code.focus();code.select();}notice=t('Copy manually from the selected text.')}
 }

</script>


<section class="explorer" aria-label={t('Icons')}>
 <aside class="explorer-sidebar">
 <div class="explorer-controls">
 <div class="explorer-toolbar">
 <!-- The inset belongs to this scroll viewport: it preserves the official input halo and slider bleed without widening the toolbar divider. -->
 <div class="scroll-area flex flex-col gap(20) p(5) mx(-5) mt(-5) grid-cols(2)@media(width<64rem) grid-cols(1)@media(width<48rem) gap(16)@media(width<48rem)">
  <label class="field explorer-search"><span>{t('Search icons')}</span><input class="input" type="search" value={query} oninput={(event)=>updateSearch(event.currentTarget.value)} placeholder={t('Search by name or purpose…')} /></label>
  <div class="field">
   <div class="flex items-baseline justify-between">
    <div class="flex items-baseline gap(6)"><label for={`${instanceId}-size`}>{t('Display size')}</label><button type="button" class="field-help" aria-label={t('Display size')} aria-describedby={`${instanceId}-size-hint`} {...{interestfor:`${instanceId}-size-hint`}} popovertarget={`${instanceId}-size-hint`}>?</button></div>
    <output for={`${instanceId}-size`} aria-hidden="true">{size} px</output>
   </div>
   <input id={`${instanceId}-size`} class="slider" type="range" name="size" min="0" max={displaySizes.length-1} step="1" value={displaySizes.indexOf(size)} aria-valuetext={`${size} px`} aria-describedby={size>24?`${instanceId}-size-hint`:undefined} oninput={(event)=>{size=displaySizes[event.currentTarget.valueAsNumber]??24;stroke=clampStroke(stroke,getOpticalSize(size))}} />
   <div id={`${instanceId}-size-hint`} class="tooltip" popover="hint" role="tooltip">{t('Larger sizes use the 24 px master. ZIP downloads contain the native 24 px SVGs.')}</div>
  </div>
  <div class="field">
   <div class="flex items-baseline justify-between"><label for={`${instanceId}-stroke`}>{t('Stroke width')}</label><output for={`${instanceId}-stroke`} aria-hidden="true">{stroke??nativeStroke} px</output></div>
   <input id={`${instanceId}-stroke`} class="slider" type="range" name="stroke" min={strokeRange[0]} max={strokeRange[1]} step="0.25" value={stroke??nativeStroke} aria-valuetext={`${stroke??nativeStroke} px`} aria-describedby={`${instanceId}-stroke-hint`} oninput={(event)=>stroke=event.currentTarget.valueAsNumber} />
   <div class="flex items-baseline justify-between gap(8)"><span id={`${instanceId}-stroke-hint`} class="fg-text-muted (font-size:.75rem)">{strokeRange[0]}–{strokeRange[1]} · {t('Native units; scales with display size.')}</span><button type="button" class="link link-quiet (font-size:.75rem) (white-space:nowrap) shrink(0)" disabled={stroke===null} onclick={()=>stroke=null}>{t('Reset stroke')}</button></div>
  </div>
  <div class="field"><span id={`${instanceId}-corners`}>{t('Corners')}</span><div class="segmented w-full" role="radiogroup" aria-labelledby={`${instanceId}-corners`}>{#each corners as c}<label class="segmented-item"><input class="segmented-input" type="radio" name="corner" value={c} bind:group={corner}/>{cornerLabel(c)}</label>{/each}</div></div>
  <div class="explorer-actions">
   <div class="field"><span id={`${instanceId}-view`}>{t('View')}</span><div class="segmented w-full" role="group" aria-labelledby={`${instanceId}-view`}><button type="button" class="segmented-item" aria-pressed={view==='library'} onclick={()=>{view='library';page=1}}>{t('Collection')}</button><button type="button" class="segmented-item" aria-pressed={view==='optical'} onclick={()=>{view='optical';page=1}}>{t('Size comparison')}</button></div></div>
   <a class="btn btn-sm" href={setURL}>{t('Download set')}<span aria-hidden="true"> · {opticalSize} px</span></a>
  </div>
  <label class="field explorer-category"><span>{t('Category')}</span><select class="select" value={activeCategory} onchange={(event)=>selectCategory(event.currentTarget.value)}><option class="select-option" value="all">{t('All icons')}</option>{#each categories as c}<option class="select-option" value={c.id}>{t(c.label)}</option>{/each}</select></label>
 </div>
 </div>
  <div class="field scroll-area explorer-categories">
   <span id={`${instanceId}-categories`}>{t('Category')}</span>
   <nav class="ui-nav-group (font-weight:400)" aria-labelledby={`${instanceId}-categories`}>
   {#each categoryOptions as option}
    <a class="ui-nav-link" href={categoryURL(option.id)} aria-current={activeCategory===option.id?'page':undefined} onclick={(event)=>{
     if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return
     event.preventDefault();selectCategory(option.id)
    }}><span class="grow(1)">{option.label}</span><span class="fg-text-muted (font-size:.75rem) (font-variant-numeric:tabular-nums) pl(12)" aria-hidden="true">{option.count}</span></a>
   {/each}
  </nav>
  </div>
 </div>
  <nav class="explorer-pagination" aria-label={t('Explorer Page')}><button type="button" class="btn btn-sm" disabled={current<=1} onclick={()=>page=current-1}>{t('Explorer Previous')}</button><span>{t('Explorer Page')} {current} {t('of')} {pages}</span><button type="button" class="btn btn-sm" disabled={current>=pages} onclick={()=>page=current+1}>{t('Explorer Next')}</button></nav>
 </aside>
 <div class="explorer-main">
 <div class="field">
  <p aria-live="polite" data-testid="result-count">{filtered.length} {t('icons')}</p>
 <div class:optical-grid={view==='optical'} class="sheet explorer-grid" style={`--display-size:${size}px`} data-testid="icon-grid">
  {#each visible as entry (entry.name)}
   <button type="button" class="explorer-tile" class:optical-tile={view==='optical'} onclick={(event)=>open(entry,event.currentTarget)} aria-label={label(entry)}>
    {#if view==='optical'}<span class="optical-row">{#each sizes as s}<span class="optical-cell"><CatalogIcon active={ready} name={entry.name} size={s} {corner} {stroke} /><span class="size-caption">{s}{stroke===null?'':` · ${clampStroke(stroke,s)}`}</span></span>{/each}</span>
    {:else}<span class="explorer-cell"><CatalogIcon active={ready} name={entry.name} {size} {corner} {stroke} /></span>{/if}
    <span class="grid gap(2) max-w-full">
     {#if translation(entry)}<span class="fg-text-body (font-size:.75rem)" lang="zh-TW">{translation(entry)}</span>{/if}
     <span class="explorer-name">{entry.name}</span>
    </span>
   </button>
  {:else}<p class="explorer-empty">{t('No icons found. Try another name or category.')}</p>{/each}
 </div>
 </div>
 {@render children?.()}
 </div>
</section>
<dialog bind:this={dialog} class="dialog explorer-dialog" aria-labelledby="icon-title" oncancel={clearSelection}>
 <header class="dialog-header">
  <h2 class="dialog-title" id="icon-title">{#if selected&&translation(selected)}<span lang="zh-TW">{translation(selected)}</span><span class="detail-name">{selected.name}</span>{:else}{selected?.category==='brands'?(artwork?.label??selected.label):selected?.name??t('Icon details')}{/if}</h2>
 </header>
 <button type="button" class="btn btn-quiet btn-square dialog-close" aria-label={t('Close')} onclick={close}><XIcon /></button>
 <div class="dialog-body">
  <div class="grid gap(20)">
  {#if selected}
   {#if selected.outline}
    <div class="field">
     <span id={`${instanceId}-brand-style`}>{t('Brand artwork')}</span>
     <div class="segmented" role="radiogroup" aria-labelledby={`${instanceId}-brand-style`}>
      <label class="segmented-item"><input class="segmented-input" type="radio" name="brand-artwork" checked={!useOutline} onchange={()=>chooseArtwork(false)} />{t('Monochrome mark')}</label>
      <label class="segmented-item"><input class="segmented-input" type="radio" name="brand-artwork" checked={useOutline} onchange={()=>chooseArtwork(true)} />{t('Outline')}</label>
     </div>
    </div>
   {/if}
   {#if error}<div class="grid gap(16) py(32)"><p role="alert">{t('Unable to load this icon. Please try again.')}</p><button type="button" class="btn" onclick={()=>artwork&&load(artwork)}>{t('Retry')}</button></div>
   {:else if !definition}<p class="py(32)" role="status">{t('Loading icon…')}</p>
   {/if}
  {/if}
  <!-- Keep the layout in server HTML so prerendered utilities also cover the opened dialog. -->
  <div hidden={!definition}>
    <div class="grid grid-cols(2)@media(width>=48rem) gap(32) (row-gap:1.25rem)">
      <figure class="relative grid (place-items:center) h(224) h(160)@media(width<48rem) r(16) bg-surface-tray overflow-hidden">
       <div class="texture texture-fade absolute inset(0)" aria-hidden="true"></div>
       <div class="relative" data-icon-preview>{#if definition}<InlineIcon {definition} size={96} {opticalSize} {corner} {stroke} />{/if}</div>
       <figcaption class="absolute bottom(16) ix(20) flex justify-between gap(12) fg-text-muted (font-size:.6875rem)"><span>{t('Enlarged preview')}</span><span>{size} px · {cornerLabel(corner)}</span></figcaption>
      </figure>
     <div class="min-w(0) grid gap(20) content-start (grid-column:2)@media(width>=48rem) (grid-row:1/3)@media(width>=48rem)">
      <div class="grid grid-cols(2) gap(12)">
       <label class="field">{t('Display size')}<select class="select" bind:value={size} onchange={()=>stroke=clampStroke(stroke,getOpticalSize(size))}>{#each displaySizes as value}<option class="select-option" {value}>{value} px</option>{/each}</select></label>
       <label class="field">{t('Corners')}<select class="select" bind:value={corner}>{#each corners as value}<option class="select-option" {value}>{cornerLabel(value)}</option>{/each}</select></label>
      </div>
      <div class="field">
       <div class="flex justify-between items-center gap(12)"><div class="flex items-center gap(6)"><label for={`${instanceId}-detail-stroke`}>{t('Stroke width')}</label><button type="button" class="field-help" aria-label={t('Stroke width')} aria-describedby={`${instanceId}-detail-stroke-hint`} {...{interestfor:`${instanceId}-detail-stroke-hint`}} popovertarget={`${instanceId}-detail-stroke-hint`}>?</button></div><output for={`${instanceId}-detail-stroke`} aria-hidden="true" class="fg-text-muted (font-size:.75rem)">{stroke??nativeStroke} px</output></div>
       <input id={`${instanceId}-detail-stroke`} aria-describedby={`${instanceId}-detail-stroke-hint`} class="slider" type="range" min={strokeRange[0]} max={strokeRange[1]} step="0.25" value={stroke??nativeStroke} aria-valuetext={`${stroke??nativeStroke} px`} oninput={event=>stroke=event.currentTarget.valueAsNumber} />
       <div id={`${instanceId}-detail-stroke-hint`} class="tooltip" popover="hint" role="tooltip">{t('Native units; scales with display size.')}</div>
       <button type="button" class="link link-quiet (justify-self:start) (font-size:.75rem)" disabled={stroke===null} onclick={()=>stroke=null}>{t('Reset stroke')}</button>
      </div>
      <label class="field">{t('Code format')}<select class="select" bind:value={format}>{#each formats as value}<option class="select-option" {value}>{formatLabels[value]}</option>{/each}</select></label>
      <div class="field">
       <label for={`${instanceId}-code`}>{t('Code')}</label>
       <textarea id={`${instanceId}-code`} bind:this={code} class="input (resize:none)" style="--font-family-sans:var(--font-family-mono);--input-font-size:.75rem" value={snippet} readonly rows="8" spellcheck="false"></textarea>
      </div>
     </div>
      <section class="min-w(0) (grid-column:1)@media(width>=48rem)" aria-labelledby={`${instanceId}-masters`}>
       <h3 id={`${instanceId}-masters`} class="(font-size:.75rem) fg-text-muted mb(12)">{t('Nine optical masters')}</h3>
       <div class="master-grid">
        <div class="master-row"><span></span>{#each sizes as s}<span class="text-center fg-text-muted (font-size:.6875rem)">{s} px</span>{/each}</div>
        {#each corners as c}<div class="master-row"><span>{cornerLabel(c)}</span>{#each sizes as s}<div class="master-cell"><button type="button" class="btn btn-quiet w-full" style="--btn-height:3rem;--btn-padding-x:.25rem" aria-label={`${s} px · ${cornerLabel(c)}`} aria-pressed={size===s&&corner===c} onclick={()=>chooseMaster(s,c)}>{#if definition}<InlineIcon {definition} size={s} corner={c} {stroke} />{/if}</button></div>{/each}</div>{/each}
       </div>
      </section>
    </div>
  </div>
  </div>
 </div>
 {#if artwork&&definition}
  <footer class="dialog-footer">
   <p class="copy-status w-full" role="status">{notice}</p>
   <a class="btn" href={download} download={`${artwork.name}.svg`}><DownloadIcon />{t('Download SVG')}</a>
   <button type="button" class="btn btn-primary" aria-label={t(`Copy ${formatLabels[format]}`)} onclick={()=>copyText(snippet)}>{#if notice===t('Copied')}<CheckIcon />{t('Copied')}{:else}<CopyIcon />{t(`Copy ${formatLabels[format]}`)}{/if}</button>
  </footer>
 {/if}
</dialog>
