import { knockout } from '../occlusion.mjs';
import { file, folder } from './core.mjs';
import { figure } from './shared.mjs';

function searchBadge(g){
  const f=figure(g),r=3.1,x=16.5,y=16,t=r/Math.sqrt(2);
  return [f.circle(x,y,r),f.line(x+t,y+t,21.5,21)];
}
function lockBadge(g){
  const f=figure(g);
  return [
    f.path('M15 15V13.5A2.25 2.25 0 0 1 19.5 13.5V15'),
    f.rect(13.5,15,7.5,6.5,Math.min(g.r,g.v(.5,.65,.8))),
    ...(g.s===16?[]:[f.dot(17.25,18.25,g.stroke/2)]),
  ];
}
function lockedDocument(g,kind){
  const f=figure(g),badge=lockBadge(g);
  const shackle=f.path('M15 15V13.5A2.25 2.25 0 0 1 19.5 13.5V15Z');
  return knockout(kind==='file'?file(g):folder(g),badge,g,{silhouettes:[badge[1],shackle]});
}
function pin(g,off=false){
  const f=figure(g),radius=Math.min(g.r,g.v(.5,.65,.8));
  if(!off)return [
    f.line(8,3.5,16,3.5),
    f.contour([[9,3.5],[9.5,9.5],[7,13.5],[7,15],[17,15],[17,13.5],[14.5,9.5],[15,3.5]],false,radius),
    f.line(12,15,12,21.5),
  ];
  return knockout(pin(g),[f.line(3,3,21,21)],g);
}
export const organization={
  kanban:g=>{
    const f=figure(g),r=Math.min(g.r,g.v(.45,.6,.8)),w=g.s===16?4:3.5;
    return [[4.75,12],[12,6],[19.25,9]].flatMap(([x,h])=>[
      f.line(x-w/2,4,x+w/2,4),f.rect(x-w/2,8,w,h,r),
    ]);
  },
  'list-tree':g=>{
    const f=figure(g);
    return [f.line(9,4.5,20.5,4.5),f.contour([[4,4.5],[4,19.5],[7.5,19.5]],false,g.r),
      f.line(4,12,7.5,12),f.line(11,12,20.5,12),f.line(11,19.5,20.5,19.5)];
  },
  'folder-tree':g=>{
    const f=figure(g),r=Math.min(g.r,g.v(.4,.55,.7));
    const node=y=>f.contour([[11.5,y],[15,y],[17,y+2],[21,y+2],[21,y+6.5],[11.5,y+6.5]],true,r);
    return [f.contour([[4,4],[4,17],[8,17]],false,g.r),f.line(4,7,8,7),node(3.5),node(13.5)];
  },
  layers:g=>{
    const f=figure(g),m=3.45/7.7;
    // Lucide-informed sheet returns: all three layers keep the same visible
    // width. Side curvature describes the sheet, independent of corner style.
    const t=g.corner==='sharp'?0:g.corner==='soft'?.7:1.1;
    const valley=y=>`L${12-t} ${y-t*m}Q12 ${y} ${12+t} ${y-t*m}`;
    const edge=y=>f.path(`M3 ${y}C3 ${y+.3} 3.2 ${y+.7-.35*m} 3.55 ${y+.7}`+
      valley(y+4.5)+`L20.45 ${y+.7}C20.8 ${y+.7-.35*m} 21 ${y+.3} 21 ${y}`);
    return [f.path(`M3 7.25C3 6.95 3.2 ${6.55+.35*m} 3.55 6.55`+
      `L${12-t} ${2.75+t*m}Q12 2.75 ${12+t} ${2.75+t*m}L20.45 6.55`+
      `C20.8 ${6.55+.35*m} 21 6.95 21 7.25C21 7.55 20.8 ${7.95-.35*m} 20.45 7.95`+
      `L${12+t} ${11.75-t*m}Q12 11.75 ${12-t} ${11.75-t*m}L3.55 7.95`+
      `C3.2 ${7.95-.35*m} 3 7.55 3 7.25Z`),edge(12),edge(16.75)];
  },
  pin:g=>pin(g),
  'pin-off':g=>pin(g,true),
  'folder-search':g=>{ const badge=searchBadge(g); return knockout(folder(g),badge,g,{silhouettes:[badge[0]]}); },
  'file-search':g=>{ const badge=searchBadge(g); return knockout(file(g),badge,g,{silhouettes:[badge[0]]}); },
  'folder-lock':g=>lockedDocument(g,'folder'),
  'file-lock':g=>lockedDocument(g,'file'),
};
