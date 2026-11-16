<script lang="ts">
 import {onMount, tick, type Snippet} from 'svelte'
 import {renderSvg, getOpticalSize, type IconDefinition} from '@master/icons'
 type Entry={name:string;component:string;label:string;category:string;keywords:string[];pilot?:boolean}
 let {entries,categories,copy,children}:{entries:Entry[];categories:{id:string;label:string}[];copy:Record<string,string>;children?:Snippet}=$props()
 const t=(key:string)=>copy[key]??key
 const instanceId=$props.id()
 const sizes=[16,20,24] as const
 const displaySizes=[16,20,24,32,48,64] as const
 type DisplaySize=typeof displaySizes[number]
 const corners=['sharp','soft','rounded'] as const
 let query=$state(''),category=$state('all'),size=$state<DisplaySize>(24),corner=$state<'sharp'|'soft'|'rounded'>('soft'),page=$state(1),view=$state('library')
 let ready=$state(false),selected=$state<Entry|null>(null),definition=$state<IconDefinition|null>(null),error=$state(false),notice=$state('')
 let dialog:HTMLDialogElement,search:HTMLInputElement
 let code=$state<HTMLTextAreaElement>()
 let trigger:HTMLButtonElement | undefined
 let request=0
 const cache=new Map<string,IconDefinition>()
 const label=(entry:Entry)=>copy['Icons']==='圖示'?entry.label:entry.name.replaceAll('-',' ')
 const filtered=$derived(entries.filter(x=>(category==='all'||category==='pilot'&&x.pilot||x.category===category)&&(!query.trim()||`${x.name} ${x.label} ${x.keywords.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase()))))
 const limit=$derived(view==='optical'?24:96)
 const pages=$derived(Math.max(1,Math.ceil(filtered.length/limit)))
 const current=$derived(Math.min(page,pages))
 const visible=$derived(filtered.slice((current-1)*limit,current*limit))
 const opticalSize=$derived(getOpticalSize(size))
 const svg=$derived(definition?renderSvg(definition,{size,corner}):'')
 const source=(name:string,s:number=size,c=corner)=>`/icons/${getOpticalSize(s)}/${c}/${name}.svg`
 const cornerLabel=(c:string)=>t(c[0].toUpperCase()+c.slice(1))
 const categoryOptions=$derived([
  {id:'all',label:t('All icons'),count:entries.length},
  {id:'pilot',label:t('Representative icons'),count:entries.filter(entry=>entry.pilot).length},
  ...categories.map(c=>({id:c.id,label:t(c.label),count:entries.filter(entry=>entry.category===c.id).length}))
 ])
 function categoryURL(id:string){
  const params=new URLSearchParams({size:String(size),corner,view})
  if(query)params.set('q',query)
  if(id!=='all')params.set('category',id)
  return `?${params}`
 }
 function fromURL(){
  const p=new URLSearchParams(location.search)
  query=p.get('q')??'';category=['all','pilot',...categories.map(x=>x.id)].includes(p.get('category')??'')?p.get('category')!:'all'
  size=displaySizes.includes(Number(p.get('size')) as DisplaySize)?Number(p.get('size')) as DisplaySize:24
  corner=corners.includes(p.get('corner') as 'soft')?p.get('corner') as 'soft':'soft'
  view=p.get('view')==='optical'?'optical':'library'
  const n=Number(p.get('page'));page=Number.isSafeInteger(n)&&n>0?n:1
 }
 onMount(()=>{fromURL();ready=true;window.addEventListener('popstate',fromURL);return()=>window.removeEventListener('popstate',fromURL)})
 $effect(()=>{
  if(!ready)return
  const p=new URLSearchParams({size:String(size),corner,view});if(query)p.set('q',query);if(category!=='all')p.set('category',category);if(current>1)p.set('page',String(current))
  history.replaceState(null,'',`${location.pathname}?${p}`)
 })
 async function load(entry:Entry){
  const revision=++request;definition=null;error=false
  try{const data=cache.get(entry.name)??await fetch(`/data/${entry.name}.json`).then(r=>{if(!r.ok)throw Error(String(r.status));return r.json()});cache.set(entry.name,data);if(revision===request)definition=data}
  catch{if(revision===request)error=true}
 }
 async function open(entry:Entry,button:HTMLButtonElement){trigger=button;selected=entry;notice='';await tick();dialog.showModal();await load(entry)}
 function close(){request++;dialog.close();selected=null;definition=null;notice=''}
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
  <label class="field explorer-search"><span>{t('Search icons')}</span><input bind:this={search} class="input" type="search" bind:value={query} oninput={()=>page=1} placeholder={t('Search by name or purpose…')} /></label>
  <div class="field">
   <div class="flex items-baseline justify-between">
    <div class="flex items-baseline gap(4)"><label for={`${instanceId}-size`}>{t('Display size')}</label><button type="button" class="link link-quiet (font-size:.75rem) fg-text-muted" aria-label={t('Display size')} aria-describedby={`${instanceId}-size-hint`} {...{interestfor:`${instanceId}-size-hint`}} popovertarget={`${instanceId}-size-hint`}>?</button></div>
    <output for={`${instanceId}-size`} aria-hidden="true">{size} px</output>
   </div>
   <input id={`${instanceId}-size`} class="slider" type="range" name="size" min="0" max={displaySizes.length-1} step="1" value={displaySizes.indexOf(size)} aria-valuetext={`${size} px`} aria-describedby={size>24?`${instanceId}-size-hint`:undefined} oninput={(event)=>size=displaySizes[event.currentTarget.valueAsNumber]??24} />
   <div id={`${instanceId}-size-hint`} class="tooltip" popover="hint" role="tooltip">{t('Larger sizes use the 24 px master. ZIP downloads contain the native 24 px SVGs.')}</div>
  </div>
  <div class="field"><span id={`${instanceId}-corners`}>{t('Corners')}</span><div class="segmented w-full" role="radiogroup" aria-labelledby={`${instanceId}-corners`}>{#each corners as c}<label class="segmented-item"><input class="segmented-input" type="radio" name="corner" value={c} bind:group={corner}/>{cornerLabel(c)}</label>{/each}</div></div>
  <div class="explorer-actions">
   <div class="field"><span id={`${instanceId}-view`}>{t('View')}</span><div class="segmented w-full" role="group" aria-labelledby={`${instanceId}-view`}><button type="button" class="segmented-item" aria-pressed={view==='library'} onclick={()=>{view='library';page=1}}>{t('Collection')}</button><button type="button" class="segmented-item" aria-pressed={view==='optical'} onclick={()=>{view='optical';page=1}}>{t('Size comparison')}</button></div></div>
   <a class="btn btn-sm" href={`/downloads/master-icons-${opticalSize}-${corner}.zip`} download>{t('Download set')}<span aria-hidden="true"> · {opticalSize} px</span></a>
  </div>
  <label class="field explorer-category"><span>{t('Category')}</span><select class="select" bind:value={category} onchange={()=>page=1}><option class="select-option" value="all">{t('All icons')}</option><option class="select-option" value="pilot">{t('Representative icons')}</option>{#each categories as c}<option class="select-option" value={c.id}>{t(c.label)}</option>{/each}</select></label>
 </div>
 </div>
  <div class="field scroll-area explorer-categories">
   <span id={`${instanceId}-categories`}>{t('Category')}</span>
   <nav class="nav" aria-labelledby={`${instanceId}-categories`}>
   {#each categoryOptions as option}
    <a class="nav-item" href={categoryURL(option.id)} aria-current={category===option.id?'page':undefined} onclick={(event)=>{
     if(event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return
     event.preventDefault();category=option.id;page=1
    }}><span class="grow(1)">{option.label}</span><span class="nav-end" aria-hidden="true">{option.count}</span></a>
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
    {#if view==='optical'}<span class="optical-row">{#each sizes as s}<span class="optical-cell"><span class="explorer-mask" style={`--glyph:url('${source(entry.name,s)}');width:${s}px;height:${s}px`} aria-hidden="true"></span><span class="size-caption">{s}</span></span>{/each}</span>
    {:else}<span class="explorer-cell"><span class="explorer-mask" style={`--glyph:url('${source(entry.name)}');width:${size}px;height:${size}px`} aria-hidden="true"></span></span>{/if}
    <span class="explorer-name">{entry.name}</span>
   </button>
  {:else}<p class="explorer-empty">{t('No icons found. Try another name or category.')}</p>{/each}
 </div>
 </div>
 {@render children?.()}
 </div>
</section>
<dialog bind:this={dialog} class="dialog explorer-dialog" aria-labelledby="icon-title" onclose={()=>{trigger?.focus()}} oncancel={()=>{request++;selected=null;definition=null;notice=''}}>
 <div class="dialog-body">
  <div class="detail-heading"><h2 id="icon-title">{selected?.name??t('Icon details')}</h2><button type="button" class="btn btn-sm" onclick={close}>{t('Close')}</button></div>
  {#if selected}
   {#if error}<p role="alert">{t('Unable to load this icon. Please try again.')}</p><button type="button" class="btn" onclick={()=>selected&&load(selected)}>{t('Retry')}</button>
   {:else if !definition}<p role="status">{t('Loading icon…')}</p>
   {:else}
    <p class="detail-caption">{t('Nine optical masters')}</p>
    <div class="master-grid">{#each corners as c}<div class="master-row"><span>{cornerLabel(c)}</span>{#each sizes as s}<div class="master-cell">{@html renderSvg(definition,{size:s,opticalSize:s,corner:c})}<span>{s}</span></div>{/each}</div>{/each}</div>
    <label class="field">SVG<textarea bind:this={code} class="input" style="--font-family-sans:var(--font-family-mono)" value={svg} readonly rows="5" spellcheck="false"></textarea></label>
    <div class="detail-actions"><button type="button" class="btn" onclick={()=>copyText(svg)}>{t('Copy SVG')}</button><button type="button" class="btn" onclick={()=>copyText(`import { ${selected!.component} } from '@master/icons/react/${opticalSize}/${corner}';\n\n<${selected!.component}${size>24?` size={${size}}`:''} />`)}>{t('Copy React')}</button><a class="btn" href={size>24?`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`:source(selected.name)} download={`${selected.name}.svg`}>{t('Download SVG')}</a></div>
   {/if}
  {/if}
  <p class="copy-status" role="status">{notice}</p>
 </div>
</dialog>
