import { contour } from '../geometry.mjs';
import { file } from './core.mjs';
import { figure } from './shared.mjs';

// Keep the file/folder's native outer dimensions. Open only the lower-right
// region occupied by the foreground search/permission badge; no painted cover.
function documentFrame(g, kind, locked) {
  const {s,c,v,r}=g;
  const cutX=v(6.5,8.5,10.5),cutY=locked?v(6,7.5,9):v(7,8.75,10.5);
  if(kind==='file'){
    const l=v(3.5,4.5,5.5),right=s-l,t=v(2,2.5,3),b=s-t,fold=v(3,3.5,4.5);
    const endY=locked?t+fold+v(.25,.3,.35):cutY;
    return [contour([[cutX,b],[l,b],[l,t],[right-fold,t],[right,t+fold],[right,endY]],r),file(g)[1]];
  }
  const l=v(2,2.5,3),right=s-l,t=v(3,4,4.5),b=v(13,16.5,20),step=v(1.5,2,2.5);
  return [contour([[cutX,b],[l,b],[l,t],[c-v(1,1.5,2),t],[c+.5,t+step],[right,t+step],[right,cutY]],r)];
}
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
function pin(g,off=false){
  const f=figure(g),radius=Math.min(g.r,g.v(.5,.65,.8));
  if(!off)return [
    f.line(8,3.5,16,3.5),
    f.contour([[9,3.5],[9.5,9.5],[7,13.5],[7,15],[17,15],[17,13.5],[14.5,9.5],[15,3.5]],false,radius),
    f.line(12,15,12,21.5),
  ];
  return [
    f.line(8,3.5,16,3.5),
    f.line(9,3.5,9.25,6.5),
    f.contour([[15,3.5],[14.5,9.5],[16,12]],false,radius),
    f.contour([[8,12],[7,13.5],[7,15],[10.5,15]],false,radius),
    f.line(12,17,12,21.5),
    f.line(3,3,21,21),
  ];
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
    const f=figure(g);
    return [f.contour([[3,8],[12,3],[21,8],[12,13]],true,g.r),
      f.contour([[3,12],[12,17],[21,12]],false,g.r),f.contour([[3,16],[12,21],[21,16]],false,g.r)];
  },
  pin:g=>pin(g),
  'pin-off':g=>pin(g,true),
  'folder-search':g=>[...documentFrame(g,'folder',false),...searchBadge(g)],
  'file-search':g=>[...documentFrame(g,'file',false),...searchBadge(g)],
  'folder-lock':g=>[...documentFrame(g,'folder',true),...lockBadge(g)],
  'file-lock':g=>[...documentFrame(g,'file',true),...lockBadge(g)],
};
