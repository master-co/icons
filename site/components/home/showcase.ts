import {resolveIcon,serializeNodes,strokeRanges,strokeWidths,opticalSizes,cornerStyles,type IconDefinition,type IconNode,type OpticalSize,type Corner} from '@master/icons/runtime'
import {AtSign} from '@master/icons/data/at-sign'
import {Bell} from '@master/icons/data/bell'
import {Bold} from '@master/icons/data/bold'
import {Bookmark} from '@master/icons/data/bookmark'
import {Calendar} from '@master/icons/data/calendar'
import {Camera} from '@master/icons/data/camera'
import {Check} from '@master/icons/data/check'
import {Clock} from '@master/icons/data/clock'
import {Compass} from '@master/icons/data/compass'
import {Filter} from '@master/icons/data/filter'
import {Folder} from '@master/icons/data/folder'
import {Heart} from '@master/icons/data/heart'
import {Home} from '@master/icons/data/home'
import {Image} from '@master/icons/data/image'
import {Inbox} from '@master/icons/data/inbox'
import {Italic} from '@master/icons/data/italic'
import {Layers} from '@master/icons/data/layers'
import {Link} from '@master/icons/data/link'
import {MapPin} from '@master/icons/data/map-pin'
import {MessageDots} from '@master/icons/data/message-dots'
import {MoreHorizontal} from '@master/icons/data/more-horizontal'
import {Paperclip} from '@master/icons/data/paperclip'
import {Plus} from '@master/icons/data/plus'
import {Search} from '@master/icons/data/search'
import {Send} from '@master/icons/data/send'
import {Settings} from '@master/icons/data/settings'
import {Sliders} from '@master/icons/data/sliders'
import {Smile} from '@master/icons/data/smile'
import {Sparkles} from '@master/icons/data/sparkles'
import {Star} from '@master/icons/data/star'

/*
 * The homepage's specimens, resolved at build time: every optical size, corner and stroke width of the few icons
 * the hero and its interface draw. Many widths share one drawing (the optical corrections begin above the native
 * weight), so each distinct drawing is stored once and every variant points at it. The client then switches a
 * variant by index, with no icon runtime and no definitions in the bundle.
 */
const definitions:IconDefinition[]=[AtSign,Bell,Bold,Bookmark,Calendar,Camera,Check,Clock,Compass,Filter,Folder,Heart,Home,Image,Inbox,Italic,Layers,Link,MapPin,MessageDots,MoreHorizontal,Paperclip,Plus,Search,Send,Settings,Sliders,Smile,Sparkles,Star]

/** A variant key: `size/corner/stroke`. */
export type VariantKey=`${OpticalSize}/${Corner}/${number}`
export interface Showcase {
 /** Each distinct drawing, as SVG markup; `__ID__` stands where an instance must make an id its own. */
 drawings:string[]
 icons:Record<string,Record<VariantKey,number>>
 /** The width each optical size is drawn at by default, and the widths it accepts. */
 strokes:Record<OpticalSize,{native:number;widths:number[]}>
}

/** Ids inside an icon (a mask, a clip) are prefixed so two instances on one page never share one. */
function scope(nodes:readonly IconNode[]):IconNode[] {
 return nodes.map(([tag,attributes,children])=>[tag,Object.fromEntries(Object.entries(attributes).map(([key,value])=>[
  key,key==='id'?`__ID__${value}`:typeof value==='string'?value.replace(/url\(#([^)]+)\)/g,'url(#__ID__$1)'):value
 ])),children&&scope(children)] as IconNode)
}

export function showcase():Showcase {
 const drawings:string[]=[],seen=new Map<string,number>()
 const icons:Showcase['icons']={}
 const strokes={} as Showcase['strokes']
 for(const size of opticalSizes){
  const [min,max]=strokeRanges[size]
  strokes[size]={native:resolveIcon(Calendar,{size}).strokeWidth,widths:strokeWidths.filter(width=>width>=min&&width<=max)}
 }
 for(const definition of definitions){
  const variants={} as Record<VariantKey,number>
  for(const size of opticalSizes)for(const corner of cornerStyles)for(const width of strokes[size].widths){
   const master=resolveIcon(definition,{size,corner,strokeWidth:width})
   const markup=serializeNodes(scope(master.nodes))
   let index=seen.get(markup)
   if(index===undefined){index=drawings.length;drawings.push(markup);seen.set(markup,index)}
   variants[`${size}/${corner}/${width}`]=index
  }
  icons[definition.name]=variants
 }
 return {drawings,icons,strokes}
}
