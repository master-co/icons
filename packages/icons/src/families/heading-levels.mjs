import {path,line,contour,n,rect} from '../geometry.mjs';
import {headingStem} from './editor.mjs';

// The numerals have their own native em box beside the common H. Curves are
// authored here as normalized glyph coordinates, not scaled upstream paths.
export function numeral(g,level,{
  x=g.v(10.5,13.5,16.25),bottom=g.v(13,16.5,19.5),
  width=g.v(3.5,4.25,5),height=g.v(6.25,8.25,10),
}={}) {
  const top=bottom-height;
  const point=(u,v)=>[x+u*width,top+v*height];
  const p=(u,v)=>point(u,v).map(n).join(' ');
  // Zero has structural round shoulders, independent of the corner preset.
  if(level===0)return [rect(x,top,width,height,width/2)];
  if(level===1)return [contour([point(.18,.22),point(.72,0),point(.72,1)],g.tip)];
  if(level===2)return [path(`M${p(0,.2)}C${p(.08,-.08)} ${p(1,-.08)} ${p(1,.23)}C${p(1,.46)} ${p(.14,.67)} ${p(0,1)}H${n(x+width)}`)];
  if(level===3)return [path(`M${p(.06,.08)}C${p(.46,-.08)} ${p(1,.02)} ${p(1,.24)}C${p(1,.42)} ${p(.72,.5)} ${p(.34,.5)}C${p(.78,.5)} ${p(1,.6)} ${p(1,.77)}C${p(1,1.04)} ${p(.4,1.1)} ${p(0,.94)}`)];
  if(level===4)return [contour([point(0,0),point(0,.58),point(1,.58)],g.tip),line(...point(.8,0),...point(.8,1))];
  if(level===5){
    const r=g.tip;
    const shoulder=r?`H${n(x+r)}Q${p(0,0)} ${n(x)} ${n(top+r)}`:`H${n(x)}`;
    return [path(`M${p(1,0)}${shoulder}V${n(top+height*.44)}H${n(x+width*.34)}C${p(.8,.44)} ${p(1,.53)} ${p(1,.73)}C${p(1,1.02)} ${p(.4,1.1)} ${p(0,.93)}`)];
  }
  return [path(`M${p(.84,0)}C${p(.27,.08)} ${p(0,.4)} ${p(0,.7)}C${p(0,1.1)} ${p(1,1.1)} ${p(1,.7)}C${p(1,.3)} ${p(0,.3)} ${p(0,.7)}`)];
}

export const headingLevels=Object.fromEntries([1,2,3,4,5,6].map(level=>[
  'heading-'+level,g=>[...headingStem(g,{level:true}),...numeral(g,level)],
]));
