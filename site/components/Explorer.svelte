<script lang="ts">
 import {onMount, tick} from 'svelte'
 import {renderSvg, type IconDefinition} from '@master/icons'
 type Entry={name:string;component:string;label:string;category:string;keywords:string[];pilot?:boolean}
 let {entries,categories,copy}:{entries:Entry[];categories:{id:string;label:string}[];copy:Record<string,string>}=$props()
 const t=(key:string)=>copy[key]??key
 const sizes=[16,20,24] as const
 const corners=['sharp','soft','rounded'] as const
 let query=$state(''),category=$state('all'),size=$state<16|20|24>(24),corner=$state<'sharp'|'soft'|'rounded'>('soft'),page=$state(1),view=$state('library')
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
 const svg=$derived(definition?renderSvg(definition,{size,opticalSize:size,corner}):'')
 const source=(name:string,s=size,c=corner)=>`/icons/${s}/${c}/${name}.svg`
 const cornerLabel=(c:string)=>t(c[0].toUpperCase()+c.slice(1))
 function fromURL(){
  const p=new URLSearchParams(location.search)
  query=p.get('q')??'';category=['all','pilot',...categories.map(x=>x.id)].includes(p.get('category')??'')?p.get('category')!:'all'
  size=sizes.includes(Number(p.get('size')) as 16)?Number(p.get('size')) as 16:24
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
 <div class="explorer-toolbar">
  <label class="field explorer-search">{t('Search icons')}<input bind:this={search} class="input" type="search" bind:value={query} oninput={()=>page=1} placeholder={t('Search by name or purpose…')} /></label>
  <label class="field explorer-category">{t('Category')}<select class="select" bind:value={category} onchange={()=>page=1}><option value="all">{t('All icons')}</option><option value="pilot">{t('Representative icons')}</option>{#each categories as c}<option value={c.id}>{t(c.label)}</option>{/each}</select></label>
  <fieldset class="explorer-options"><legend>{t('Optical size')}</legend><div class="segmented">{#each sizes as s}<label class="segmented-item"><input class="segmented-input" type="radio" name="size" value={s} bind:group={size}/>{s}</label>{/each}</div></fieldset>
  <fieldset class="explorer-options"><legend>{t('Corners')}</legend><div class="segmented">{#each corners as c}<label class="segmented-item"><input class="segmented-input" type="radio" name="corner" value={c} bind:group={corner}/>{cornerLabel(c)}</label>{/each}</div></fieldset>
 </div>
 <div class="explorer-summary">
  <p aria-live="polite" data-testid="result-count">{filtered.length} {t('icons')}</p>
  <div class="explorer-actions"><div class="segmented segmented-sm" aria-label={t('View')}><button class="segmented-item" aria-pressed={view==='library'} onclick={()=>{view='library';page=1}}>{t('Collection')}</button><button class="segmented-item" aria-pressed={view==='optical'} onclick={()=>{view='optical';page=1}}>{t('Size comparison')}</button></div><a class="btn btn-sm" href={`/downloads/master-icons-${size}-${corner}.zip`} download>{t('Download set')}</a></div>
 </div>
 <div class:optical-grid={view==='optical'} class="explorer-grid" data-testid="icon-grid">
  {#each visible as entry (entry.name)}
   <button class="icon-tile" class:optical-tile={view==='optical'} onclick={(event)=>open(entry,event.currentTarget)} aria-label={label(entry)}>
    {#if view==='optical'}<span class="optical-row">{#each sizes as s}<span class="optical-cell"><span class="icon-mask" style={`--glyph:url('${source(entry.name,s)}');width:${s}px;height:${s}px`} aria-hidden="true"></span><span class="size-caption">{s}</span></span>{/each}</span>
    {:else}<span class="icon-cell"><span class="icon-mask" style={`--glyph:url('${source(entry.name)}');width:${size}px;height:${size}px`} aria-hidden="true"></span></span>{/if}
    <span class="icon-name">{entry.name}</span>
   </button>
  {:else}<p class="empty-state">{t('No icons found. Try another name or category.')}</p>{/each}
 </div>
 <nav class="explorer-pagination" aria-label={t('Explorer Page')}><button class="btn btn-sm" disabled={current<=1} onclick={()=>page=current-1}>{t('Explorer Previous')}</button><span>{t('Explorer Page')} {current} {t('of')} {pages}</span><button class="btn btn-sm" disabled={current>=pages} onclick={()=>page=current+1}>{t('Explorer Next')}</button></nav>

</section>
<dialog bind:this={dialog} class="dialog icon-dialog" aria-labelledby="icon-title" onclose={()=>{trigger?.focus()}} oncancel={()=>{request++;selected=null;definition=null;notice=''}}>
 <div class="dialog-body">
  <div class="detail-heading"><h2 id="icon-title">{selected?.name??t('Icon details')}</h2><button class="btn btn-sm" onclick={close}>{t('Close')}</button></div>
  {#if selected}
   {#if error}<p role="alert">{t('Unable to load this icon. Please try again.')}</p><button class="btn" onclick={()=>selected&&load(selected)}>{t('Retry')}</button>
   {:else if !definition}<p role="status">{t('Loading icon…')}</p>
   {:else}
    <p class="detail-caption">{t('Nine optical masters')}</p>
    <div class="master-grid">{#each corners as c}<div class="master-row"><span>{cornerLabel(c)}</span>{#each sizes as s}<div class="master-cell">{@html renderSvg(definition,{size:s,opticalSize:s,corner:c})}<span>{s}</span></div>{/each}</div>{/each}</div>
    <label class="field">SVG<textarea bind:this={code} class="input detail-code" value={svg} readonly rows="5" spellcheck="false"></textarea></label>
    <div class="detail-actions"><button class="btn" onclick={()=>copyText(svg)}>{t('Copy SVG')}</button><button class="btn" onclick={()=>copyText(`import { ${selected!.component} } from '@master/icons/react/${size}/${corner}';\n\n<${selected!.component} />`)}>{t('Copy React')}</button><a class="btn" href={source(selected.name)} download>{t('Download SVG')}</a></div>
   {/if}
  {/if}
  <p class="copy-status" role="status">{notice}</p>
 </div>
</dialog>
