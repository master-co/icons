import {contour,circle,weightDelta} from '../geometry.mjs';

// Ruler markers, not paragraph alignment. All four share an anchor and foot.
export function tabStopParts(g,kind){
 const l=g.v(3.5,4.5,5.5),r=g.s-l,t=g.v(3.5,4.5,5.5),b=g.v(12.5,15.5,18.5),x=g.c,h=g.stroke/2;
 const bend=g.corner==='sharp'?0:g.corner==='soft'?g.v(.6,.75,.9):g.v(1.25,1.5,1.75);
 let marker;
 if(kind==='left'||kind==='right'){
  marker=contour([[l,t],[l,b],[r,b]],bend);
  if(kind==='right')marker[1].transform=`translate(${g.s} 0) scale(-1 1)`;
 }else{
  // A single tee boundary gives the two inside joints real fillets and
  // prevents a round-capped stem from bulging through the horizontal foot.
  const cap=g.corner==='sharp'?0:g.corner==='soft'?h*.45:h;
  const join=g.corner==='sharp'?0:g.corner==='soft'?g.v(.2,.25,.3):g.v(.45,.55,.65);
  marker=contour([[x-h,t-h],[x+h,t-h],[x+h,b-h],[r+h,b-h],[r+h,b+h],[l-h,b+h],[l-h,b-h],[x-h,b-h]],
   [cap,cap,join,cap,cap,cap,cap,join],true);
  Object.assign(marker[1],{fill:'currentColor',stroke:'none'});
 }
 const dot=kind==='decimal'?circle(g.v(11.5,14.5,17.5),g.v(7.5,9.5,11.5),g.v(.8,.9,1)+weightDelta(g)*.12,{fill:'currentColor',stroke:'none'}):null;
 return {marker,dot,anchor:kind==='left'?l:kind==='right'?r:x,foot:b};
}
export const tabStopDrawings=Object.fromEntries(['left','right','center','decimal'].map(kind=>['tab-stop-'+kind,g=>{const {marker,dot}=tabStopParts(g,kind);return dot?[marker,dot]:[marker];}]));
