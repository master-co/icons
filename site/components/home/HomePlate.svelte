<script module lang="ts">
 import type {Corner,OpticalSize} from '@master/icons/runtime'
 export interface Specimen {name:string;size:OpticalSize;corner:Corner;stroke:number}
</script>

<script lang="ts">
 import {onMount,tick} from 'svelte'
 import PlayIcon from '@master/icons-svelte/16/soft/play'
 import PauseIcon from '@master/icons-svelte/16/soft/pause'
 import data from 'virtual:home-showcase'
 import type {VariantKey} from './showcase'
 let {specimens,copy}:{specimens:Specimen[];copy:Record<string,string>}=$props()
 const t=(key:string)=>copy[key]??key
 const uid=$props.id()
 const cornerNames:Record<Corner,string>={sharp:'Sharp',soft:'Soft',rounded:'Rounded'}
 const format=(value:number)=>value.toFixed(2)

 /*
  * The hero's plate draws one icon the way a pen plotter would. The grid and keylines come first; then the pen
  * travels the icon's centerline, node by node, lifting between them, while the carriage's crosshair follows it;
  * then the stroke is laid on the line and swells to its width, and the legend's samples swell with it, since they
  * are drawn from the same number. It holds, lifts the stroke, and draws the next specimen at its own setting.
  * Without motion, or before script, the plate shows the finished drawing.
  */
 let index=$state(0)
 const current=$derived(specimens[index])
 let lay=$state(1)
 let pen=$state<{x:number;y:number}|null>(null)
 let progress=$state(0)
 let fade=$state(1)
 let playing=$state(false)
 let motion=$state(false)
 let compact=$state(false)
 let figure:HTMLElement
 let skeleton=$state<SVGGElement>()

 const sheet={w:640,h:512}
 const grid={x:56,y:72,l:384}
 const specs={16:{inset:2,soft:1,rounded:2},20:{inset:2.5,soft:1.25,rounded:2.5},24:{inset:3,soft:1.5,rounded:3}} as const
 const k=$derived(grid.l/current.size)
 const lines=$derived(Array.from({length:current.size+1},(_,n)=>grid.x+n*k))
 const inset=$derived(specs[current.size].inset*k)
 const keyCircle=$derived((current.size/2-specs[current.size].inset*2/3)*k)
 const radius=$derived(current.corner==='sharp'?0:specs[current.size][current.corner])
 const cap=$derived(current.corner==='sharp'?'square':'round')
 const join=$derived(current.corner==='sharp'?'miter':'round')
 const width=$derived(current.stroke*lay)
 const drawing=$derived.by(()=>{
  const at=data.icons[current.name]?.[`${current.size}/${current.corner}/${current.stroke}` as VariantKey]
  return at===undefined?'':data.drawings[at].replaceAll('__ID__',`${uid}-plate-`)
 })
 const glyph=(item:Specimen)=>{
  const at=data.icons[item.name]?.[`${item.size}/${item.corner}/${item.stroke}` as VariantKey]
  return at===undefined?'':data.drawings[at].replaceAll('__ID__',`${uid}-${item.name}-`)
 }
 const label=$derived(t('The {name} icon drawn on its {size} px grid with {corner} corners and a {stroke} stroke.').replace('{name}',current.name).replace('{size}',String(current.size)).replace('{corner}',t(cornerNames[current.corner]).toLowerCase()).replace('{stroke}',String(current.stroke)))

 /* The legend's samples are drawn at the plate's scale, so their thickness and radius are the icon's own. */
 const bar={x1:496,x2:560,y:206}
 const stem=$derived(width*k)
 const elbow=$derived({x:506,y:316,arm:76,r:radius*k})
 const elbowPath=$derived(elbow.r
  ?`M${elbow.x} ${elbow.y+elbow.arm}L${elbow.x} ${elbow.y+elbow.r}A${elbow.r} ${elbow.r} 0 0 1 ${elbow.x+elbow.r} ${elbow.y}L${elbow.x+elbow.arm} ${elbow.y}`
  :`M${elbow.x} ${elbow.y+elbow.arm}L${elbow.x} ${elbow.y}L${elbow.x+elbow.arm} ${elbow.y}`)
 const slash=(x:number,y:number)=>`M${x-2.83} ${y+2.83}L${x+2.83} ${y-2.83}`
 const samples=$derived(`M${bar.x1} ${bar.y}L${bar.x2} ${bar.y}M${elbowPath.slice(1)}`)

 /* ---------------------------------------------------------------------------------------------------------- */
 type Step={start:number;end:number}&({kind:'draw';node:SVGGeometryElement;length:number}|{kind:'travel';from:DOMPoint;to:DOMPoint})
 const timing={build:900,pen:700,lift:220,lay:900,hold:2600,out:520}
 let steps:Step[]=[]
 let schedule={penStart:0,penEnd:0,layStart:0,layEnd:0,holdEnd:0,end:0}
 let elapsed=0,last=0,frame=0,running=false,visible=true

 const ease=(x:number)=>1-Math.pow(1-x,3)
 const clamp=(x:number)=>Math.min(1,Math.max(0,x))

 /** Measures the drawn nodes and plans the pen's path: draw a node, lift, travel to the next, draw again. */
 function plan() {
  steps=[]
  const nodes=[...(skeleton?.querySelectorAll<SVGGeometryElement>('path,rect,circle,ellipse,line,polyline,polygon')??[])]
  let at=timing.build,previous:DOMPoint|undefined
  for(const node of nodes){
   const length=node.getTotalLength()
   if(!(length>0))continue
   const from=node.getPointAtLength(0)
   if(previous){
    const distance=Math.hypot(from.x-previous.x,from.y-previous.y)*k
    const duration=Math.min(280,Math.max(90,distance/1.6))
    steps.push({kind:'travel',from:previous,to:from,start:at,end:at+duration});at+=duration
   }
   const duration=Math.max(240,length*k/timing.pen*1000)
   steps.push({kind:'draw',node,length,start:at,end:at+duration});at+=duration
   node.style.strokeDasharray=`${length} ${length}`
   node.style.strokeDashoffset=`${length}`
   previous=node.getPointAtLength(length)
  }
  const penEnd=at
  const layStart=penEnd+timing.lift,layEnd=layStart+timing.lay,holdEnd=layEnd+timing.hold
  schedule={penStart:timing.build,penEnd,layStart,layEnd,holdEnd,end:holdEnd+timing.out}
 }

 /** Writes one moment of the drawing. Dash offsets go straight to the nodes; the rest is state. */
 function render(at:number) {
  for(const step of steps){
   if(step.kind!=='draw')continue
   const p=clamp((at-step.start)/(step.end-step.start))
   step.node.style.strokeDashoffset=`${step.length*(1-p)}`
  }
  const step=steps.find(item=>at>=item.start&&at<item.end)
  if(step&&at<schedule.penEnd){
   const p=clamp((at-step.start)/(step.end-step.start))
   const point=step.kind==='draw'?step.node.getPointAtLength(step.length*p):new DOMPoint(step.from.x+(step.to.x-step.from.x)*p,step.from.y+(step.to.y-step.from.y)*p)
   pen={x:point.x,y:point.y}
  }else pen=null
  lay=at<schedule.holdEnd?ease(clamp((at-schedule.layStart)/timing.lay)):1-ease(clamp((at-schedule.holdEnd)/(timing.out*.6)))
  fade=at<schedule.holdEnd?1:1-clamp((at-schedule.holdEnd-timing.out*.4)/(timing.out*.6))
  progress=clamp(at/schedule.holdEnd)
 }

 function finish() {
  for(const step of steps)if(step.kind==='draw'){step.node.style.strokeDasharray='';step.node.style.strokeDashoffset=''}
  steps=[];pen=null;lay=1;fade=1;progress=1
 }

 function loop(now:number) {
  frame=0
  elapsed+=Math.min(now-(last||now),64)
  last=now
  if(elapsed>=schedule.holdEnd&&!playing){render(schedule.holdEnd);running=false;return}
  if(elapsed>=schedule.end){advance((index+1)%specimens.length);return}
  render(elapsed)
  if(running&&visible&&!document.hidden)frame=requestAnimationFrame(loop)
 }
 /** Starts or resumes the clock where it stopped. */
 function schedule_() {
  if(frame||!running||!visible||document.hidden)return
  last=0
  frame=requestAnimationFrame(loop)
 }

 /** Shows a specimen: drawn by the pen when there is motion, finished at once when there is none. */
 async function advance(next:number) {
  cancelAnimationFrame(frame);frame=0
  finish()
  index=next
  await tick()
  if(!motion)return
  plan()
  elapsed=0
  render(0)
  running=true
  schedule_()
 }

 onMount(()=>{
  const reduce=matchMedia('(prefers-reduced-motion: reduce)')
  const narrow=matchMedia('(width < 40rem)')
  const fit=()=>{compact=narrow.matches}
  const changed=()=>{
   motion=!reduce.matches
   if(!motion){playing=false;running=false;cancelAnimationFrame(frame);frame=0;finish()}
  }
  fit();changed()
  playing=motion
  if(motion)advance(0)
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)schedule_();else{cancelAnimationFrame(frame);frame=0}})
  observer.observe(figure)
  const shown=()=>{if(!document.hidden)schedule_()}
  reduce.addEventListener('change',changed)
  narrow.addEventListener('change',fit)
  document.addEventListener('visibilitychange',shown)
  return()=>{cancelAnimationFrame(frame);observer.disconnect();reduce.removeEventListener('change',changed);narrow.removeEventListener('change',fit);document.removeEventListener('visibilitychange',shown)}
 })

 function toggle() {
  playing=!playing
  if(playing&&!running){running=true;if(elapsed>=schedule.holdEnd)elapsed=schedule.holdEnd;schedule_()}
 }
</script>

<figure class="icons-plate" bind:this={figure} aria-label={t('An icon drawn as a construction')}>
 <div class="icons-plate-sheet home-marks">
  <svg class="home-plate" viewBox={compact?`20 ${grid.y-48} ${grid.l+72} ${grid.l+80}`:`0 0 ${sheet.w} ${sheet.h}`} role="img" aria-label={label}>
   <defs>
    <mask id={`${uid}-wash`} maskUnits="userSpaceOnUse" x="0" y="0" width={sheet.w} height={sheet.h}>
     <g class="home-plate-mask-white" transform={`translate(${grid.x} ${grid.y}) scale(${k})`} stroke-width={width} style:--dot={`${2/k}px`} stroke-linecap={cap} stroke-linejoin={join} stroke-miterlimit="3" opacity={lay}>{@html drawing}</g>
    </mask>
    <mask id={`${uid}-ring`} maskUnits="userSpaceOnUse" x="0" y="0" width={sheet.w} height={sheet.h}>
     <g class="home-plate-mask-white" transform={`translate(${grid.x} ${grid.y}) scale(${k})`} stroke-width={width} style:--dot={`${2/k}px`} stroke-linecap={cap} stroke-linejoin={join} stroke-miterlimit="3" opacity={lay}>{@html drawing}</g>
     <g class="home-plate-mask-black" transform={`translate(${grid.x} ${grid.y}) scale(${k})`} stroke-width={Math.max(0,width-2/k)} stroke-linecap={cap} stroke-linejoin={join} stroke-miterlimit="3">{@html drawing}</g>
    </mask>
    <mask id={`${uid}-samples`} maskUnits="userSpaceOnUse" x="0" y="0" width={sheet.w} height={sheet.h}>
     <path d={samples} stroke="white" fill="none" stroke-width={stem} stroke-linecap={cap} stroke-linejoin={join} stroke-miterlimit="3" opacity={lay?1:0}/>
     <path d={samples} stroke="black" fill="none" stroke-width={Math.max(0,stem-2)} stroke-linecap={cap} stroke-linejoin={join} stroke-miterlimit="3"/>
    </mask>
   </defs>

   <g class="icons-plate-drawing" opacity={fade}>
    {#key index}
     <g class="home-plate-grid">
      {#each lines as position, n (n)}
       <path d={`M${position} ${grid.y}V${grid.y+grid.l}`} style:--i={n}/>
       <path d={`M${grid.x} ${position}H${grid.x+grid.l}`} style:--i={n}/>
      {/each}
     </g>
     <g class="home-plate-guides">
      <rect x={grid.x+inset} y={grid.y+inset} width={grid.l-inset*2} height={grid.l-inset*2} pathLength="1"/>
      <circle cx={grid.x+grid.l/2} cy={grid.y+grid.l/2} r={keyCircle} pathLength="1"/>
     </g>
     <g class="home-plate-dimension">
      <path class="home-plate-witness" d={`M${grid.x} ${grid.y-8}V${grid.y-34}M${grid.x+grid.l} ${grid.y-8}V${grid.y-34}`}/>
      <path d={`M${grid.x} ${grid.y-28}H${grid.x+grid.l/2-18}M${grid.x+grid.l/2+18} ${grid.y-28}H${grid.x+grid.l}`}/>
      <path d={`${slash(grid.x,grid.y-28)}${slash(grid.x+grid.l,grid.y-28)}`}/>
      <text x={grid.x+grid.l/2} y={grid.y-24} text-anchor="middle" class="home-plate-value">{current.size}</text>
      <path class="home-plate-witness" d={`M${grid.x} ${grid.y+grid.l+8}V${grid.y+grid.l+34}M${grid.x+k} ${grid.y+grid.l+8}V${grid.y+grid.l+34}`}/>
      <path d={`M${grid.x} ${grid.y+grid.l+28}H${grid.x+k}`}/>
      <path d={`${slash(grid.x,grid.y+grid.l+28)}${slash(grid.x+k,grid.y+grid.l+28)}`}/>
      <text x={grid.x+k+8} y={grid.y+grid.l+32} class="home-plate-value">1 px</text>
     </g>
    {/key}
    <g class="home-plate-centerlines">
     <path d={`M${grid.x-14} ${grid.y+grid.l/2}H${grid.x+grid.l+14}`}/>
     <path d={`M${grid.x+grid.l/2} ${grid.y-14}V${grid.y+grid.l+14}`}/>
    </g>

    <rect class="home-plate-wash" width={sheet.w} height={sheet.h} mask={`url(#${uid}-wash)`}/>
    <rect class="home-plate-outline" width={sheet.w} height={sheet.h} mask={`url(#${uid}-ring)`}/>
    <g class="home-plate-skeleton" bind:this={skeleton} transform={`translate(${grid.x} ${grid.y}) scale(${k})`} stroke-width={1/k}>{#key index}{@html drawing}{/key}</g>
   </g>

   {#if pen}
    <g class="home-plate-carriage" aria-hidden="true">
     <path d={`M${grid.x-14} ${grid.y+pen.y*k}H${grid.x+grid.l+14}M${grid.x+pen.x*k} ${grid.y-14}V${grid.y+grid.l+14}`}/>
    </g>
    <g class="home-plate-pen" transform={`translate(${grid.x+pen.x*k} ${grid.y+pen.y*k})`} aria-hidden="true">
     <circle r="5"/>
     <circle class="home-plate-nib" r="1.75"/>
    </g>
   {/if}

   {#if !compact}
    <g class="home-plate-legend">
     <text x="476" y="84" class="home-plate-name">{current.name}</text>
     <text x="476" y="102" class="home-plate-value">{t('{size} px master').replace('{size}',String(current.size))} · {t(cornerNames[current.corner]).toLowerCase()}</text>

     <text x="476" y="164" class="home-plate-name">{t('Stroke')}</text>
     <text x="620" y="164" text-anchor="end" class="home-plate-value">{format(width)}</text>
     <rect class="home-plate-wash" width={sheet.w} height={sheet.h} mask={`url(#${uid}-samples)`}/>
     <rect class="home-plate-outline" width={sheet.w} height={sheet.h} mask={`url(#${uid}-samples)`}/>
     {#if stem>1}
      <path class="home-plate-witness" d={`M${bar.x2+stem/2+6} ${bar.y-stem/2}H620M${bar.x2+stem/2+6} ${bar.y+stem/2}H620`}/>
      <path class="home-plate-dimension" d={`M612 ${bar.y-stem/2}V${bar.y+stem/2}${slash(612,bar.y-stem/2)}${slash(612,bar.y+stem/2)}`}/>
     {/if}

     <text x="476" y="276" class="home-plate-name">{t('Corner')}</text>
     <text x="620" y="276" text-anchor="end" class="home-plate-value">{radius?`r ${radius}`:t('Square')}</text>
     {#if elbow.r}
      <path class="home-plate-leader" d={`M${elbow.x+elbow.r} ${elbow.y+elbow.r}L${elbow.x+elbow.r-elbow.r*Math.SQRT1_2} ${elbow.y+elbow.r-elbow.r*Math.SQRT1_2}M${elbow.x+elbow.r-4} ${elbow.y+elbow.r}h8M${elbow.x+elbow.r} ${elbow.y+elbow.r-4}v8`}/>
     {/if}

     <text x="476" y="428" class="home-plate-name">{t('Pen')}</text>
     <text x="620" y="428" text-anchor="end" class="home-plate-value">{pen?`${format(pen.x)}, ${format(pen.y)}`:'—'}</text>
     <text x="476" y="446" class="home-plate-value">{t('Keylines at {inset}').replace('{inset}',String(specs[current.size].inset))}</text>
    </g>
   {/if}
  </svg>
 </div>
 <figcaption class="icons-plate-bar">
  <div class="icons-plate-specimens" role="group" aria-label={t('Specimen')}>
   {#each specimens as item, n (item.name)}
    <button type="button" class="btn btn-quiet btn-square icons-plate-pick" style:--progress={n===index?progress:0} aria-label={item.name} aria-pressed={n===index} onclick={()=>advance(n)}>
     <svg width={item.size} height={item.size} viewBox={`0 0 ${item.size} ${item.size}`} fill="none" stroke="currentColor" stroke-width={item.stroke} stroke-linecap={item.corner==='sharp'?'square':'round'} stroke-linejoin={item.corner==='sharp'?'miter':'round'} stroke-miterlimit="3" aria-hidden="true" focusable="false">{@html glyph(item)}</svg>
    </button>
   {/each}
  </div>
  <p class="home-annotation icons-plate-caption"><span>{current.size} px</span><span>{t(cornerNames[current.corner])}</span><span>{current.stroke}</span></p>
  {#if motion}
   <button type="button" class="btn btn-quiet btn-sm btn-square" aria-label={playing?t('Pause the drawing'):t('Play the drawing')} onclick={toggle}>
    {#if playing}<PauseIcon size={16} />{:else}<PlayIcon size={16} />{/if}
   </button>
  {/if}
 </figcaption>
</figure>
