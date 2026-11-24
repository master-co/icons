<script lang="ts">
 import {languageOf} from '@master/internal-site/common/locales.js'
 import {onMount,tick} from 'svelte'
 import {cubicInOut} from 'svelte/easing'
 import PlayIcon from '@master/icons-svelte/16/soft/play'
 import PauseIcon from '@master/icons-svelte/16/soft/pause'
 import type {Corner,OpticalSize} from '@master/icons/runtime'
 import data from 'virtual:home-showcase'
 import type {VariantKey} from './showcase'
 import {styles,styleClass,type StyleId} from './styles'

 let {copy,locale}:{copy:Record<string,string>;locale:string}=$props()
 const t=(key:string)=>copy[key]??key
 const uid=$props.id()
 const sizes=[16,20,24] as const
 const corners=['sharp','soft','rounded'] as const
 const cornerNames:Record<Corner,string>={sharp:'Sharp',soft:'Soft',rounded:'Rounded'}
 const formatStroke=$derived(new Intl.NumberFormat(languageOf(locale),{minimumFractionDigits:2,maximumFractionDigits:2}).format)

 /*
  * One setting, one interface in four styles, and a detail of the icon under inspection. Choosing a style also
  * chooses the setting that belongs to it; changing the setting afterwards keeps the style. A change travels through
  * the interface from the controls outward, icon by icon, the way a new specification reaches a page. Until someone
  * takes the controls, the styles play in turn and the callout walks from icon to icon; a pointer over the
  * interface inspects what it points at.
  */
 const first=styles[0]
 let styleId=$state<StyleId>(first.id)
 let size=$state<OpticalSize>(first.icons.size)
 let corner=$state<Corner>(first.icons.corner)
 let stroke=$state(first.icons.stroke)
 let playing=$state(false)
 let motion=$state(false)
 let visible=$state(false)
 let turns=$state(0)
 let rippled=$state(false)
 let bench:HTMLElement,stage:HTMLElement,detailPanel=$state<HTMLElement>()

 const range=$derived(data.strokes[size].widths)
 const width=$derived(Math.min(range.at(-1)!,Math.max(range[0],stroke)))
 const cap=$derived(corner==='sharp'?'square':'round')
 const join=$derived(corner==='sharp'?'miter':'round')
 const style=$derived(styles.find(item=>item.id===styleId)!)
 const custom=$derived(style.icons.size!==size||style.icons.corner!==corner||style.icons.stroke!==width)
 const variant=$derived(`${size}/${corner}/${width}` as VariantKey)

 const drawing=(name:string,key:string)=>{
  const index=data.icons[name]?.[variant]
  return index===undefined?'':data.drawings[index].replaceAll('__ID__',`${uid}-${key}-`)
 }

 let wiping=$state(false)
 let wipeTimer:ReturnType<typeof setTimeout>|undefined
 function choose(id:StyleId) {
  const next=styles.find(item=>item.id===id)!
  if(id!==styleId){
   turns++
   /* The callout steps aside while the new style is drawn across, and finds its icon again in the new layout. */
   wiping=true
   clearTimeout(wipeTimer)
   wipeTimer=setTimeout(()=>{wiping=false},motion?980:0)
  }
  styleId=id
  size=next.icons.size
  corner=next.icons.corner
  stroke=next.icons.stroke
 }
 /** Any hand on the controls stops the turn; the play button starts it again. */
 const take=()=>{playing=false;rippled=true}

 /* ---------------------------------------------------------------------------------------------------------- */
 /* The inspected icon: the callout moves to it first, and the detail redraws once it has arrived. */
 const tour=['inbox','search','sliders','message','paperclip','send','calendar','compass','smile','settings']
 const slotIcons:Record<string,string>={home:'home',inbox:'inbox',calendar:'calendar',folder:'folder',star:'star',compass:'compass',camera:'camera',layers:'layers',settings:'settings',sliders:'sliders',plus:'plus',search:'search',message:'message-dots',paperclip:'paperclip',event:'calendar',bookmark:'bookmark',pin:'map-pin',heart:'heart',bold:'bold',italic:'italic',link:'link',attach:'paperclip',image:'image',at:'at-sign',smile:'smile',send:'send',more:'more-horizontal'}
 let slot=$state('inbox')
 let inspected=$state('inbox')
 let hovering=false
 let callout=$state<{x:number;y:number;r:number;edge:number;to:{x:number;y:number}}|null>(null)
 let settle:ReturnType<typeof setTimeout>|undefined

 const layer=()=>stage?.querySelector<HTMLElement>(`.${styleClass(styleId)}`)
 const glyphAt=(name:string)=>layer()?.querySelector<SVGSVGElement>(`[data-slot="${name}"]`)
 const shown=(element:Element|null|undefined)=>{const box=element?.getBoundingClientRect();return !!box&&box.width>0&&box.height>0}

 /** Places the callout on the inspected icon and gives every icon its delay, by how far it is from the controls. */
 function measure() {
  if(!stage)return
  const frame=stage.getBoundingClientRect()
  for(const element of layer()?.querySelectorAll<SVGSVGElement>('[data-slot]')??[]){
   const box=element.getBoundingClientRect()
   const delay=(box.top-frame.top)/frame.height*240+(box.left-frame.left)/frame.width*120
   element.style.setProperty('--d',`${Math.max(0,Math.round(delay))}ms`)
  }
  const target=glyphAt(slot)
  if(!target||!shown(target)||!detailPanel||!shown(detailPanel)){callout=null;return}
  const box=target.getBoundingClientRect(),panel=detailPanel.getBoundingClientRect()
  const window=layer()?.querySelector('.window')?.getBoundingClientRect()
  callout={x:box.left+box.width/2-frame.left,y:box.top+box.height/2-frame.top,r:Math.max(box.width,box.height)/2+7,edge:(window?.right??box.right)-frame.left,to:{x:panel.left-frame.left,y:panel.top+panel.height*.42-frame.top}}
 }

 function inspect(name:string) {
  if(name===slot)return
  slot=name
  measure()
  clearTimeout(settle)
  settle=setTimeout(()=>{inspected=slot},motion?380:0)
 }

 /*
  * The leader never crosses the interface's words: it leaves from the window's edge, level with the ring, where a
  * tick on the frame marks the row, and turns once in the gutter to reach the detail.
  */
 const leader=$derived(callout&&(()=>{
  const {y,edge,to}=callout,bend=to.x-(to.x-edge)/2
  return `M${(edge+6).toFixed(1)} ${y.toFixed(1)}H${bend.toFixed(1)}V${to.y.toFixed(1)}H${(to.x-4).toFixed(1)}`
 })())

 /* The detail: the inspected icon as a construction, the stroke's envelope over the centerline that builds it. */
 const detail={x:24,y:24,l:208}
 const specs={16:{inset:2},20:{inset:2.5},24:{inset:3}} as const
 const dk=$derived(detail.l/size)
 const detailLines=$derived(Array.from({length:size+1},(_,n)=>detail.x+n*dk))
 const detailIcon=$derived(slotIcons[inspected]??'inbox')

 /* ---------------------------------------------------------------------------------------------------------- */
 onMount(()=>{
  const reduce=matchMedia('(prefers-reduced-motion: reduce)')
  motion=!reduce.matches
  playing=motion
  const changed=()=>{motion=!reduce.matches;if(!motion)playing=false}
  reduce.addEventListener('change',changed)
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting},{threshold:.25})
  observer.observe(bench)
  const resized=new ResizeObserver(()=>measure())
  resized.observe(stage)
  measure()
  return()=>{reduce.removeEventListener('change',changed);observer.disconnect();resized.disconnect();clearTimeout(settle)}
 })

 /* A change of setting moves icons and text; the callout follows once the interface has settled. */
 $effect(()=>{
  void variant;void styleId
  let alive=true
  tick().then(()=>{if(alive)measure()})
  const later=setTimeout(measure,motion?960:0)
  return()=>{alive=false;clearTimeout(later)}
 })

 /* The turn: the callout walks every few seconds, and every second walk brings the next style. */
 $effect(()=>{
  if(!playing||!visible)return
  let beat=0
  const timer=setInterval(()=>{
   if(document.hidden||hovering)return
   beat++
   if(beat%2===0){
    const next=styles[(styles.findIndex(item=>item.id===styleId)+1)%styles.length]
    choose(next.id)
   }else{
    const candidates=tour.filter(name=>shown(glyphAt(name)))
    inspect(candidates[(candidates.indexOf(slot)+1)%candidates.length]??'inbox')
   }
  },2900)
  return()=>clearInterval(timer)
 })

 let pointerFrame=0
 function point(event:PointerEvent) {
  if(event.pointerType!=='mouse')return
  const {clientX:x,clientY:y}=event
  cancelAnimationFrame(pointerFrame)
  pointerFrame=requestAnimationFrame(()=>{
   for(const element of layer()?.querySelectorAll<SVGSVGElement>('[data-slot]')??[]){
    const box=element.getBoundingClientRect()
    if(x>=box.left-10&&x<=box.right+10&&y>=box.top-10&&y<=box.bottom+10){hovering=true;inspect(element.dataset.slot!);return}
   }
  })
 }

 /* The incoming style is drawn across the outgoing one, left to right, and the outgoing one holds still under it. */
 const wipe=(_:Element,{duration}:{duration:number})=>({duration:motion?duration:0,easing:cubicInOut,css:(t:number)=>`clip-path:inset(0 ${((1-t)*100).toFixed(2)}% 0 0);z-index:2`})
 const hold=(_:Element,{duration}:{duration:number})=>({duration:motion?duration:0,css:()=>'z-index:1'})
</script>

{#snippet glyph(name:string,place:string,id:StyleId)}
 <svg class="icon home-glyph" data-slot={place} style:--icon-size={`${size}px`} style:--icon-stroke={width} width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" stroke="currentColor" stroke-linecap={cap} stroke-linejoin={join} stroke-miterlimit="3" aria-hidden="true" focusable="false">{#key `${size}/${corner}`}<g class="home-glyph-draw">{@html drawing(name,`${id}-${place}`)}</g>{/key}</svg>
{/snippet}

{#snippet face(id:StyleId)}
 <div class="window home-ui-window">
  <div class="window-bar">
   <span class="window-controls" aria-hidden="true"></span>
   <span class="window-title">{t(styles.find(item=>item.id===id)!.name)}{custom&&id===styleId?` · ${t('Custom')}`:''}</span>
   <span class="window-end">{@render glyph('more-horizontal','more',id)}</span>
  </div>
  <div class="window-body">
   <div class="home-ui">
    <div class="home-ui-side">
     <p class="home-ui-brand"><span class="avatar avatar-sm avatar-square" role="img" aria-label={t('Field Notes')}>FN</span>{t('Field Notes')}</p>
     <nav class="nav" aria-label={t('Notebook')}>
      <a class="nav-item" href="#styles">{@render glyph('home','home',id)}{t('Home')}</a>
      <a class="nav-item" href="#styles" aria-current="page">{@render glyph('inbox','inbox',id)}{t('Inbox')}<span class="nav-end">12</span></a>
      <a class="nav-item" href="#styles">{@render glyph('calendar','calendar',id)}{t('Calendar')}</a>
      <a class="nav-item" href="#styles">{@render glyph('folder','folder',id)}{t('Files')}</a>
      <a class="nav-item" href="#styles">{@render glyph('star','star',id)}{t('Starred')}</a>
      <p class="nav-label">{t('Collections')}</p>
      <a class="nav-item" href="#styles">{@render glyph('compass','compass',id)}{t('Coastline survey')}</a>
      <a class="nav-item" href="#styles">{@render glyph('camera','camera',id)}{t('Photo walk')}</a>
      <a class="nav-item" href="#styles">{@render glyph('layers','layers',id)}{t('Brand refresh')}</a>
     </nav>
     <nav class="nav home-ui-foot" aria-label={t('Account')}>
      <a class="nav-item" href="#styles">{@render glyph('settings','settings',id)}{t('Settings')}</a>
     </nav>
    </div>
    <div class="home-ui-main">
     <div class="home-ui-head">
      <div class="home-ui-heading">
       <p class="home-ui-title">{t('Inbox')}</p>
       <p class="home-ui-note">{t('12 notes · 3 need a reply')}</p>
      </div>
      <button type="button" class="btn btn-square" aria-label={t('Filter')}>{@render glyph('sliders','sliders',id)}</button>
      <button type="button" class="btn btn-primary">{@render glyph('plus','plus',id)}{t('New note')}</button>
     </div>
     <div class="home-ui-tools">
      <label class="input-group home-ui-search">
       {@render glyph('search','search',id)}
       <input class="input-group-field" type="search" placeholder={t('Search notes')} aria-label={t('Search notes')}>
       <span class="input-group-addon"><kbd class="kbd">⌘K</kbd></span>
      </label>
      <div class="segmented segmented-sm" role="radiogroup" aria-label={t('Show')}>
       <label class="segmented-item"><input type="radio" class="segmented-input" name={`${uid}-${id}-show`} value="all" checked>{t('All')}</label>
       <label class="segmented-item"><input type="radio" class="segmented-input" name={`${uid}-${id}-show`} value="mentions">{t('Mentions')}</label>
      </div>
     </div>
     <ul class="list home-ui-list">
      <li class="list-row">
       <span class="list-media icon-frame icon-frame-xs" aria-hidden="true">{@render glyph('message-dots','message',id)}</span>
       <div class="list-body"><p class="list-title">{t('Design review moved to Friday')}</p><p class="list-description">{t('Mina: the studio is booked until four.')}</p></div>
       <span class="list-end">09:41</span>
      </li>
      <li class="list-row">
       <span class="list-media icon-frame icon-frame-xs" aria-hidden="true">{@render glyph('paperclip','paperclip',id)}</span>
       <div class="list-body"><p class="list-title">{t('Three files from the field')}</p><p class="list-description">{t('survey-north.pdf and 2 more')}</p></div>
       <span class="list-end"><span class="badge badge-sm">{t('New')}</span></span>
      </li>
      <li class="list-row">
       <span class="list-media icon-frame icon-frame-xs" aria-hidden="true">{@render glyph('calendar','event',id)}</span>
       <div class="list-body"><p class="list-title">{t('Photo walk · Thursday')}</p><p class="list-description">{t('Meet at the north pier at 7:30.')}</p></div>
       <span class="list-end">{@render glyph('bookmark','bookmark',id)}</span>
      </li>
     </ul>
     <div class="home-ui-composer">
      <div class="toolbar" role="toolbar" aria-label={t('Formatting')}>
       <button type="button" class="btn btn-quiet btn-sm btn-square" aria-label={t('Bold')}>{@render glyph('bold','bold',id)}</button>
       <button type="button" class="btn btn-quiet btn-sm btn-square" aria-label={t('Italic')}>{@render glyph('italic','italic',id)}</button>
       <button type="button" class="btn btn-quiet btn-sm btn-square" aria-label={t('Link')}>{@render glyph('link','link',id)}</button>
       <span class="toolbar-separator" role="separator" aria-orientation="vertical"></span>
       <button type="button" class="btn btn-quiet btn-sm btn-square" aria-label={t('Attach')}>{@render glyph('paperclip','attach',id)}</button>
       <button type="button" class="btn btn-quiet btn-sm btn-square" aria-label={t('Image')}>{@render glyph('image','image',id)}</button>
       <button type="button" class="btn btn-quiet btn-sm btn-square" aria-label={t('Mention')}>{@render glyph('at-sign','at',id)}</button>
       <button type="button" class="btn btn-quiet btn-sm btn-square" aria-label={t('Emoji')}>{@render glyph('smile','smile',id)}</button>
      </div>
      <button type="button" class="btn btn-primary btn-square" aria-label={t('Send')}>{@render glyph('send','send',id)}</button>
     </div>
    </div>
   </div>
  </div>
 </div>
{/snippet}

<figure class="home-bench home-reveal-item" bind:this={bench} aria-label={t('The same icons in four interface styles')} data-motion={motion||undefined} data-rippled={rippled||undefined}>
 <div class="home-bench-bar">
  <div class="home-bench-group">
   <span class="home-annotation" id={`${uid}-style`}>{t('Style')}</span>
   <div class="segmented segmented-sm" role="radiogroup" aria-labelledby={`${uid}-style`}>
    {#each styles as item (item.id)}
     <label class="segmented-item"><input type="radio" class="segmented-input" name={`${uid}-style`} value={item.id} checked={styleId===item.id} onchange={()=>{take();choose(item.id)}}>{t(item.name)}</label>
    {/each}
   </div>
  </div>
  <div class="home-bench-group">
   <span class="home-annotation" id={`${uid}-size`}>{t('Optical size')}</span>
   <div class="segmented segmented-sm" role="radiogroup" aria-labelledby={`${uid}-size`}>
    {#each sizes as value (value)}
     <label class="segmented-item"><input type="radio" class="segmented-input" name={`${uid}-size`} {value} checked={size===value} onchange={()=>{take();size=value}}>{value}</label>
    {/each}
   </div>
  </div>
  <div class="home-bench-group">
   <span class="home-annotation" id={`${uid}-corner`}>{t('Corners')}</span>
   <div class="segmented segmented-sm" role="radiogroup" aria-labelledby={`${uid}-corner`}>
    {#each corners as value (value)}
     <label class="segmented-item"><input type="radio" class="segmented-input" name={`${uid}-corner`} {value} checked={corner===value} onchange={()=>{take();corner=value}}>{t(cornerNames[value])}</label>
    {/each}
   </div>
  </div>
  <div class="home-bench-group home-bench-stroke">
   <label class="home-annotation" for={`${uid}-stroke`}>{t('Stroke')}</label>
   <input type="range" class="slider" id={`${uid}-stroke`} min={range[0]} max={range.at(-1)} step=".25" value={width} oninput={event=>{take();stroke=Number(event.currentTarget.value)}}>
   <output class="home-bench-value" for={`${uid}-stroke`} aria-hidden="true">{formatStroke(width)}</output>
  </div>
  {#if motion}
   <button type="button" class="btn btn-quiet btn-sm btn-square home-bench-play" aria-label={playing?t('Pause the styles'):t('Play the styles in turn')} onclick={()=>{playing=!playing}}>
    {#if playing}<PauseIcon size={16} />{:else}<PlayIcon size={16} />{/if}
   </button>
  {/if}
 </div>

 <div class="home-bench-stage" bind:this={stage}>
  <div class="home-bench-screen" role="presentation" onpointermove={point} onpointerleave={()=>{hovering=false}}>
   {#key styleId}
    <div class={['home-ui-layer','texture',styleClass(styleId)]} in:wipe={{duration:900}} out:hold={{duration:900}} inert role="img" aria-label={t('A notes app in the {name} style: {summary}').replace('{name}',t(style.name)).replace('{summary}',t(style.summary))}>
     {@render face(styleId)}
    </div>
    {#if motion&&turns}<span class="home-bench-seam" aria-hidden="true"></span>{/if}
   {/key}
  </div>

  <aside class="home-bench-detail" bind:this={detailPanel} aria-label={t('Detail')}>
   <p class="home-annotation home-bench-detail-head"><span>{t('Detail')}</span><span>{detailIcon}</span></p>
   <svg class="home-plate home-bench-detail-plate" viewBox="0 0 256 256" role="img" aria-label={t('The {name} icon drawn on its {size} px grid with {corner} corners and a {stroke} stroke.').replace('{name}',detailIcon).replace('{size}',String(size)).replace('{corner}',t(cornerNames[corner]).toLowerCase()).replace('{stroke}',String(width))}>
    <defs>
     <mask id={`${uid}-detail-wash`} maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256">
      <g class="home-plate-mask-white home-detail-stroke" transform={`translate(${detail.x} ${detail.y}) scale(${dk})`} style:stroke-width={`${width}px`} style:--dot={`${2/dk}px`} stroke-linecap={cap} stroke-linejoin={join} stroke-miterlimit="3">{@html drawing(detailIcon,'detail-wash')}</g>
     </mask>
     <mask id={`${uid}-detail-ring`} maskUnits="userSpaceOnUse" x="0" y="0" width="256" height="256">
      <g class="home-plate-mask-white home-detail-stroke" transform={`translate(${detail.x} ${detail.y}) scale(${dk})`} style:stroke-width={`${width}px`} style:--dot={`${2/dk}px`} stroke-linecap={cap} stroke-linejoin={join} stroke-miterlimit="3">{@html drawing(detailIcon,'detail-ring')}</g>
      <g class="home-plate-mask-black home-detail-stroke" transform={`translate(${detail.x} ${detail.y}) scale(${dk})`} style:stroke-width={`${width-2/dk}px`} stroke-linecap={cap} stroke-linejoin={join} stroke-miterlimit="3">{@html drawing(detailIcon,'detail-cut')}</g>
     </mask>
    </defs>
    {#key size}
     <g class="home-plate-grid">
      {#each detailLines as position, n (n)}
       <path d={`M${position} ${detail.y}V${detail.y+detail.l}`} style:--i={n}/>
       <path d={`M${detail.x} ${position}H${detail.x+detail.l}`} style:--i={n}/>
      {/each}
     </g>
    {/key}
    <g class="home-plate-guides">
     <rect x={detail.x+specs[size].inset*dk} y={detail.y+specs[size].inset*dk} width={detail.l-specs[size].inset*dk*2} height={detail.l-specs[size].inset*dk*2}/>
    </g>
    {#key `${inspected}/${size}/${corner}`}
     <g class="home-plate-form">
      <rect class="home-plate-wash" width="256" height="256" mask={`url(#${uid}-detail-wash)`}/>
      <rect class="home-plate-outline" width="256" height="256" mask={`url(#${uid}-detail-ring)`}/>
      <g class="home-plate-skeleton" transform={`translate(${detail.x} ${detail.y}) scale(${dk})`} stroke-width={1/dk}>{@html drawing(detailIcon,'detail-skeleton').replace(/<(path|rect|circle|ellipse|line|polyline|polygon) /g,'<$1 pathLength="1" ')}</g>
     </g>
    {/key}
   </svg>
   <div class="home-bench-actual" aria-hidden="true">
    {#each [1,2] as scale (scale)}
     <span class="home-bench-actual-item">
      <svg width={size*scale} height={size*scale} viewBox={`0 0 ${size} ${size}`} fill="none" stroke="currentColor" stroke-width={width} stroke-linecap={cap} stroke-linejoin={join} stroke-miterlimit="3" focusable="false">{@html drawing(detailIcon,`detail-${scale}x`)}</svg>
      <small>{scale}×</small>
     </span>
    {/each}
   </div>
   <dl class="home-bench-spec">
    <div><dt>{t('Optical size')}</dt><dd>{size} px</dd></div>
    <div><dt>{t('Corners')}</dt><dd>{t(cornerNames[corner])}</dd></div>
    <div><dt>{t('Stroke')}</dt><dd>{formatStroke(width)}</dd></div>
   </dl>
  </aside>

  {#if callout&&leader}
   <svg class="home-bench-callout" aria-hidden="true" data-wiping={wiping||undefined}>
    <circle style:cx={`${callout.x}px`} style:cy={`${callout.y}px`} style:r={`${callout.r}px`} cx={callout.x} cy={callout.y} r={callout.r}/>
    <path class="home-bench-tick" d={`M${callout.edge-4} ${callout.y}h8`} style:d={`path('M${callout.edge-4} ${callout.y}h8')`}/>
    <path class="home-bench-leader" d={leader} style:d={`path('${leader}')`}/>
    <circle class="home-bench-anchor" cx={callout.to.x-4} cy={callout.to.y} r="2.5"/>
   </svg>
  {/if}
 </div>
</figure>
