import {contour,line,path,n,weightDelta} from '../geometry.mjs';

// Shared letterforms, with native layout chosen by each typography control.
// Upper/lower case is expressed by the glyph, not a secondary badge.
export function capitalA(g,{left,top,width,height}) {
  const mid=left+width/2,bottom=top+height,bar=top+height*.65+weightDelta(g)*.8;
  const inset=width*(1-(bar-top)/height)/2;
  return [contour([[left,bottom],[mid,top],[left+width,bottom]],Math.min(g.tip,g.v(.25,.35,.45))),
    ['path',{...line(left+inset,bar,left+width-inset,bar)[1],'stroke-linecap':'butt'}]];
}
export function lowerA(g,{left,top,width,height,stemTop=top}) {
  const right=left+width,cy=top+height/2,bottom=top+height;
  const k=.5522847498,rx=width/2,ry=height/2,cx=left+rx;
  return [path(`M${n(right)} ${n(stemTop)}V${n(bottom)}M${n(right)} ${n(cy)}C${n(right)} ${n(cy-ry*k)} ${n(cx+rx*k)} ${n(top)} ${n(cx)} ${n(top)}C${n(cx-rx*k)} ${n(top)} ${n(left)} ${n(cy-ry*k)} ${n(left)} ${n(cy)}C${n(left)} ${n(cy+ry*k)} ${n(cx-rx*k)} ${n(bottom)} ${n(cx)} ${n(bottom)}C${n(cx+rx*k)} ${n(bottom)} ${n(right)} ${n(cy+ry*k)} ${n(right)} ${n(cy)}Z`)];
}
// The lowercase b shares the a's bowl, with a left ascender. The transform
// changes its position and handedness without scaling the stroke.
export function lowerB(g,box) {
  return lowerA(g,box).map(([tag,attrs])=>[tag,{...attrs,transform:`translate(${n(2*box.left+box.width)} 0) scale(-1 1)`}]);
}
function pair(g,kind) {
  const left=g.v(1.5,2,2.5),right=g.v(9.25,11.5,13.75),width=g.v(5.25,6.5,7.75);
  const top=g.v(4,5,6),bottom=g.v(12,15,18),height=bottom-top,smallHeight=g.v(5,6.25,7.5);
  const a={left,top,width,height};
  const b={...a,left:right};
  if(kind==='upper')return [...capitalA(g,a),...capitalA(g,b)];
  if(kind==='lower')return [...lowerA(g,{...a,top:bottom-smallHeight,height:smallHeight}),...lowerA(g,{...b,top:bottom-smallHeight,height:smallHeight})];
  if(kind==='title')return [...capitalA(g,a),...lowerA(g,{...b,top:bottom-smallHeight,height:smallHeight})];
  const capHeight=g.v(6,7.5,9),capWidth=g.v(4.5,5.5,6.5);
  return [...capitalA(g,a),...capitalA(g,{...b,left:right+(width-capWidth)/2,width:capWidth,top:bottom-capHeight,height:capHeight})];
}
export const letterCase={
  'case-upper':g=>pair(g,'upper'),
  'case-lower':g=>pair(g,'lower'),
  'case-title':g=>pair(g,'title'),
  'small-caps':g=>pair(g,'small'),
};
