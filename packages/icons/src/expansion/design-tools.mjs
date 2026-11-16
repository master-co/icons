import {figure,rotate} from '../families/shared.mjs';

function scissors(g){
  const f=figure(g),r=3,d=r/Math.sqrt(2);
  return [f.circle(6,6,r),f.circle(6,18,r),
    f.line(6+d,6+d,20,20),f.line(6+d,18-d,20,4)];
}

function hand(g){
  const f=figure(g);
  // Finger crowns describe anatomy, including in sharp. The thumb flows into
  // the palm without a detached crease or a densely hatched knuckle row.
  return [f.path('M 8 13 V 5.5 C 8 3.5 11 3.5 11 5.5 V 3.8 C 11 1.7 14 1.7 14 3.8 V 5 C 14 3 17 3 17 5 V 7.7 C 17 5.7 20 5.7 20 7.7 V 13 C 20 18.5 17.3 21 13.2 21 C 9.7 21 8.2 19.4 6.5 17.2 L 3.8 13.7 C 2.3 11.7 4.6 9.8 6.2 11.3 Z'),
    f.line(11,5.5,11,10),f.line(14,5,14,10),f.line(17,7.7,17,11)];
}

function lasso(g){
  const f=figure(g);
  return [f.path('M 5.2 12.9 C 3.8 11.7 3 10.2 3 8.8 C 3 5.3 6.9 3 12 3 C 17.1 3 21 5.6 21 9.4 C 21 13.6 16.9 16.3 11.8 16.3 C 10.3 16.3 9 16.1 7.8 15.6'),
    f.circle(6,14.5,1.9),f.path('M 6 16.4 C 6 18.6 7.1 20.1 9 21')];
}

function selection(g){
  const f=figure(g),r=Math.min(g.r,g.v(.65,.85,1));
  const corners=[[[3,7],[3,3],[7,3]],[[17,3],[21,3],[21,7]],
    [[21,17],[21,21],[17,21]],[[7,21],[3,21],[3,17]]];
  // Explicit corner pieces keep the four corners continuous at every size;
  // separate flat-ended middle dashes avoid phase drift around a rounded rect.
  return [...corners.map(p=>{const [tag,a]=f.contour(p,false,r);return [tag,{...a,'stroke-linecap':'butt'}];}),
    ...[[10.5,3,13.5,3],[21,10.5,21,13.5],[13.5,21,10.5,21],[3,13.5,3,10.5]]
      .map(p=>{const [tag,a]=f.line(...p);return [tag,{...a,'stroke-linecap':'butt'}];})];
}

function ruler(g){
  const f=figure(g),ticks=g.s===16?[7,12,17]:[6,9,12,15,18];
  return rotate([f.rect(8.5,2.5,7,19,Math.min(g.r,g.v(.7,.9,1.2))),
    ...ticks.map((y,i)=>f.line(15.5,y,15.5-(i%2?1.75:2.75),y))],-45,g);
}

function magnet(g){
  const f=figure(g),r=g.corner==='sharp'?0:g.corner==='soft'?.35:.7;
  return [f.path(`M 5 ${3+r} Q 5 3 ${5+r} 3 H ${9-r} Q 9 3 9 ${3+r} V 14 C 9 18 15 18 15 14 V ${3+r} Q 15 3 ${15+r} 3 H ${19-r} Q 19 3 19 ${3+r} V 14 C 19 23.3 5 23.3 5 14 Z`),
    f.line(5,7,9,7),f.line(15,7,19,7)];
}

function component(g){
  const f=figure(g),r=g.s===16?3.15:3;
  return [[12,5.25],[5.25,12],[18.75,12],[12,18.75]].map(([x,y])=>
    f.contour([[x,y-r],[x+r,y],[x,y+r],[x-r,y]],true,g.tip));
}

function pipette(g){
  const f=figure(g),r=g.corner==='sharp'?0:g.corner==='soft'?.3:.6;
  const head=f.path(`M 9 8 V 5 C 9 1 15 1 15 5 V 8 H ${17-r} Q 17 8 17 ${8+r} V ${11-r} Q 17 11 ${17-r} 11 H ${7+r} Q 7 11 7 ${11-r} V ${8+r} Q 7 8 ${7+r} 8 Z`);
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
