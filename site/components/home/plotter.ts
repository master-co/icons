import {resolveIcon,serializeNodes,type Corner,type IconDefinition,type IconNode,type OpticalSize} from '@master/icons/runtime'

/*
 * Build-time drawing helpers for the homepage's figures, in the Plotter grammar: one ink (currentColor), 1-unit lines,
 * opacity for hierarchy (1 form, .32 secondary and dimensions, .14 guides, .06 grids), a translucent wash only on the
 * named form, and dimensions derived from the geometry they measure. Lengths are SVG units of the figure.
 */

const round=(value:number)=>Number(value.toFixed(3))

/** Ids inside an icon are prefixed so every drawing on the page owns its own. */
function scope(nodes:readonly IconNode[],prefix:string):IconNode[] {
 return nodes.map(([tag,attributes,children])=>[tag,Object.fromEntries(Object.entries(attributes).map(([key,value])=>[
  key,key==='id'?`${prefix}${value}`:typeof value==='string'?value.replace(/url\(#([^)]+)\)/g,`url(#${prefix}$1)`):value
 ])),children&&scope(children,prefix)] as IconNode)
}

export interface Placement {size:OpticalSize;corner:Corner;stroke?:number;x:number;y:number;scale:number;direction?:'ltr'|'rtl'}

/** The pixel grid an icon is drawn on, at its placement. */
export function grid({size,x,y,scale}:Placement) {
 const length=size*scale
 let d=''
 for(let index=0;index<=size;index++){
  const at=round(index*scale)
  d+=`M${round(x+at)} ${y}v${round(length)}M${x} ${round(y+at)}h${round(length)}`
 }
 return `<path class="plot-grid" d="${d}"/>`
}

/**
 * An icon as a construction: the envelope of its stroke washed and outlined in one weight, over the centerline the
 * stroke is laid on. The envelope comes from two masks of the same drawing: the stroke at its width, and the stroke
 * two units narrower, so what remains is a 1-unit contour on each side.
 */
export function form(definition:IconDefinition,placement:Placement,id:string) {
 const {size,corner,stroke,x,y,scale,direction='ltr'}=placement
 const master=resolveIcon(definition,{size,corner,strokeWidth:stroke})
 const drawing=serializeNodes(scope(master.nodes,`${id}-`))
 const mirror=direction==='rtl'&&definition.direction==='mirror'
 const transform=`translate(${x} ${y}) scale(${scale})${mirror?` translate(${size} 0) scale(-1 1)`:''}`
 const cap=corner==='sharp'?'square':'round',join=corner==='sharp'?'miter':'round'
 const group=(className:string,width:number)=>`<g class="${className}" transform="${transform}" stroke-width="${round(width)}" stroke-linecap="${cap}" stroke-linejoin="${join}" stroke-miterlimit="3" style="--dot:${round(2/scale)}px">${drawing}</g>`
 const box=`maskUnits="userSpaceOnUse" x="${x-scale*2}" y="${y-scale*2}" width="${scale*(size+4)}" height="${scale*(size+4)}"`
 return `<defs><mask id="${id}-wash" ${box}>${group('plot-mask-white',master.strokeWidth)}</mask><mask id="${id}-ring" ${box}>${group('plot-mask-white',master.strokeWidth)}${group('plot-mask-black',master.strokeWidth-2/scale)}</mask></defs>`
  +`<g class="plot-form"><rect class="plot-wash" x="${x-scale*2}" y="${y-scale*2}" width="${scale*(size+4)}" height="${scale*(size+4)}" mask="url(#${id}-wash)"/>`
  +`<rect class="plot-outline" x="${x-scale*2}" y="${y-scale*2}" width="${scale*(size+4)}" height="${scale*(size+4)}" mask="url(#${id}-ring)"/>`
  +`<g class="plot-skeleton" transform="${transform}" stroke-width="${round(1/scale)}">${drawing.replace(/<(path|rect|circle|ellipse|line|polyline|polygon) /g,'<$1 pathLength="1" ')}</g></g>`
}

/** The same icon in ink, as it renders in an interface. */
export function ink(definition:IconDefinition,placement:Placement,id:string) {
 const {size,corner,stroke,x,y,scale}=placement
 const master=resolveIcon(definition,{size,corner,strokeWidth:stroke})
 const cap=corner==='sharp'?'square':'round',join=corner==='sharp'?'miter':'round'
 return `<g class="plot-ink" transform="translate(${x} ${y}) scale(${scale})" fill="none" stroke="currentColor" stroke-width="${master.strokeWidth}" stroke-linecap="${cap}" stroke-linejoin="${join}" stroke-miterlimit="3">${serializeNodes(scope(master.nodes,`${id}-`))}</g>`
}

const slash=(x:number,y:number)=>`M${round(x-2.83)} ${round(y+2.83)}L${round(x+2.83)} ${round(y-2.83)}`

/**
 * A horizontal dimension under or over a span: witness lines that stop 8 units short of the form, a line with
 * 8-unit slashes at its ends, and the value in a gap of its own.
 */
export function dimension(x1:number,x2:number,from:number,at:number,label:string) {
 const direction=at>from?1:-1
 const middle=(x1+x2)/2,gap=label.length*3.6+6
 const witness=`M${x1} ${from+direction*8}V${at+direction*6}M${x2} ${from+direction*8}V${at+direction*6}`
 const line=x2-x1>gap*2+8?`M${x1} ${at}H${round(middle-gap)}M${round(middle+gap)} ${at}H${x2}`:`M${x1} ${at}H${x2}`
 const text=x2-x1>gap*2+8?`<text class="plot-value" x="${round(middle)}" y="${at+4}" text-anchor="middle">${label}</text>`:`<text class="plot-value" x="${x2+8}" y="${at+4}">${label}</text>`
 return `<g class="plot-dimension"><path class="plot-witness" d="${witness}"/><path d="${line}"/><path d="${slash(x1,at)}${slash(x2,at)}"/>${text}</g>`
}

export const label=(x:number,y:number,text:string,role:'name'|'value'='name',anchor:'start'|'middle'|'end'='start')=>
 `<text class="plot-${role}" x="${x}" y="${y}"${anchor==='start'?'':` text-anchor="${anchor}"`}>${text}</text>`
