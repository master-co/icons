import {figure,rotate} from '../families/shared.mjs';
import {exteriorDetails} from '../occlusion.mjs';

function scissors(g){
  const f=figure(g),r=3,d=r/Math.sqrt(2);
  return [f.circle(6,6,r),f.circle(6,18,r),
    f.line(6+d,6+d,20,20),f.line(6+d,18-d,20,4)];
}

// Shared thumb and palm; a gesture may change the finger pose without
// redrawing the hand's lower contour. The default preserves the open palm.
export function handSilhouette(g,fingers='M 8 13 V 5.5 C 8 3.5 11 3.5 11 5.5 V 3.8 C 11 1.7 14 1.7 14 3.8 V 5 C 14 3 17 3 17 5 V 7.7 C 17 5.7 20 5.7 20 7.7'){
  return figure(g).path(fingers+' V 13 C 20 18.5 17.3 21 13.2 21 C 9.7 21 8.2 19.4 6.5 17.2 L 3.8 13.7 C 2.3 11.7 4.6 9.8 6.2 11.3 Z');
}
function hand(g){
  const f=figure(g);
  // Finger crowns describe anatomy, including in sharp. The thumb flows into
  // the palm without a detached crease or a densely hatched knuckle row.
  return [handSilhouette(g),
    f.line(11,5.5,11,10),f.line(14,5,14,10),f.line(17,7.7,17,11)];
}

function lasso(g){
  const f=figure(g);
  return exteriorDetails(f.circle(6,14.5,1.9),[
    f.path('M 5.2 12.9 C 3.8 11.7 3 10.2 3 8.8 C 3 5.3 6.9 3 12 3 C 17.1 3 21 5.6 21 9.4 C 21 13.6 16.9 16.3 11.8 16.3 C 10.3 16.3 9 16.1 7.8 15.6'),
    f.path('M 6 16.4 C 6 18.6 7.1 20.1 9 21')],g);
}

export function selection(g,{cornersOnly=false,inset=3,box,cornerLength=4,continuousEdges=[]}={}){
  const f=figure(g),r=Math.min(g.r,g.v(.65,.85,1));
  const [x,y,w,h]=box||[inset,inset,24-2*inset,24-2*inset],rgt=x+w,btm=y+h,k=cornerLength;
  const corners=[[[x,y+k],[x,y],[x+k,y]],[[rgt-k,y],[rgt,y],[rgt,y+k]],
    [[rgt,btm-k],[rgt,btm],[rgt-k,btm]],[[x+k,btm],[x,btm],[x,btm-k]]];
  // Explicit corner pieces keep the four corners continuous at every size;
  // separate flat-ended middle dashes avoid phase drift around a rounded rect.
  return [...corners.map(p=>{const [tag,a]=f.contour(p,false,r);return [tag,{...a,'stroke-linecap':'butt'}];}),
    ...(cornersOnly?[]:[
      continuousEdges.includes('top')?[x+k,y,rgt-k,y]:[10.5,3,13.5,3],
      continuousEdges.includes('right')?[rgt,y+k,rgt,btm-k]:[21,10.5,21,13.5],
      continuousEdges.includes('bottom')?[rgt-k,btm,x+k,btm]:[13.5,21,10.5,21],
      continuousEdges.includes('left')?[x,btm-k,x,y+k]:[3,13.5,3,10.5]])
      .map(p=>{const [tag,a]=f.line(...p);return [tag,{...a,'stroke-linecap':'butt'}];})];
}

function ruler(g){
  const f=figure(g),ticks=g.s===16?[7,12,17]:[6,9,12,15,18];
  return rotate([f.rect(8.5,2.5,7,19,Math.min(g.r,g.v(.7,.9,1.2))),
    ...ticks.map((y,i)=>f.line(15.5,y,15.5-(i%2?1.75:2.75),y))],-45,g);
}

function magnet(g){
  const f=figure(g),r=g.corner==='sharp'?0:g.corner==='soft'?.35:.7;
  const shell=r?`M 5 ${3+r} Q 5 3 ${5+r} 3 H ${9-r} Q 9 3 9 ${3+r} V 14 C 9 18 15 18 15 14 V ${3+r} Q 15 3 ${15+r} 3 H ${19-r} Q 19 3 19 ${3+r} V 14 C 19 23.3 5 23.3 5 14 Z`:
    'M5 3H9V14C9 18 15 18 15 14V3H19V14C19 23.3 5 23.3 5 14Z';
  return [f.path(shell),
    f.line(5,7,9,7),f.line(15,7,19,7)];
}

function component(g){
  const f=figure(g),r=g.s===16?3.15:3;
  return [[12,5.25],[5.25,12],[18.75,12],[12,18.75]].map(([x,y])=>
    f.contour([[x,y-r],[x+r,y],[x,y+r],[x-r,y]],true,g.tip));
}

function pipette(g){
  const f=figure(g),r=g.corner==='sharp'?0:g.corner==='soft'?.3:.6;
  const head=f.path(r?`M 9 8 V 5 C 9 1 15 1 15 5 V 8 H ${17-r} Q 17 8 17 ${8+r} V ${11-r} Q 17 11 ${17-r} 11 H ${7+r} Q 7 11 7 ${11-r} V ${8+r} Q 7 8 ${7+r} 8 Z`:
    'M9 8V5C9 1 15 1 15 5V8H17V11H7V8Z');
  const stem=f.contour([[10,11],[10,17.5],[12,21],[14,17.5],[14,11]],false,g.tip);
  return rotate([head,stem],45,g);
}

function paintBucket(g){
  const f=figure(g),r=Math.min(g.r,g.v(.65,.85,1.1));
  return [f.contour([[10,4],[18,12],[10,20],[2,12]],true,[r,0,r,0]),
    ['path',{...f.line(2,12,18,12)[1],'stroke-linecap':'butt'}],f.line(5,3,10,8),
    f.path('M 20 15 C 19.2 16.4 18 17.6 18 18.7 C 18 21.4 22 21.4 22 18.7 C 22 17.6 20.8 16.4 20 15 Z')];
}

export const designTools={scissors,hand,lasso,selection,ruler,magnet,component,
  frame:g=>{const f=figure(g);return [f.line(6,3,6,21),f.line(18,3,18,21),f.line(3,6,21,6),f.line(3,18,21,18)];},
  pipette,'paint-bucket':paintBucket};
