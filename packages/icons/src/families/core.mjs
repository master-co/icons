import { knockout, joinedArrow } from '../occlusion.mjs';
import { path, line, circle, rect, contour, n } from '../geometry.mjs';

// Coordinates are selected in native 16/20/24 grids. Dense icons have explicit
// optical edits below. Only trivial, low-density symbols share proportional forms.
const dot=(x,y,g)=>circle(x,y,g.stroke/2,{fill:'currentColor',stroke:'none'});
const arrow=(shaft,points,g)=>joinedArrow(shaft,contour(points,g.tip),points,g);
const horizontal=g=>{
  const {s,c,v,tip}=g, a=v(2.5,3,3.5), b=s-a, h=v(3.5,4.5,5.5);
  return arrow([line(a,c,b,c)],[[c,c-h],[b,c],[c,c+h]],g);
};
const rotated=(nodes,angle,c)=>nodes.map(([tag,attrs])=>[tag,{...attrs,transform:`rotate(${angle} ${c} ${c})`}]);
function file(g,text=false){
  const {s,v,r}=g, l=v(3.5,4.5,5.5), rr=s-l, t=v(2,2.5,3), b=s-t, f=v(3,3.5,4.5);
  const result=[contour([[l,t],[rr-f,t],[rr,t+f],[rr,b],[l,b]],r,true),contour([[rr-f,t],[rr-f,t+f],[rr,t+f]],Math.min(r,0.6))];
  if(text) for(const y of (s===16?[10.5]:s===20?[11,14.5]:[12.5,17])) result.push(line(l+v(2.5,3,3.5),y,rr-v(2.5,3,3.5),y));
  return result;
}
function folder(g,plus=false){
  const {s,c,v,r}=g, l=v(2,2.5,3), rr=s-l, t=v(3,4,4.5), b=v(13,16.5,20), step=v(1.5,2,2.5);
  const result=[contour([[l,b],[l,t],[c-v(1,1.5,2),t],[c+v(0.5,0.5,0.5),t+step],[rr,t+step],[rr,b]],r,true)];
  if(plus){const y=v(9,11.5,14), half=v(1.5,2,2.5);result.push(line(c-half,y,c+half,y),line(c,y-half,c,y+half));}
  return result;
}
function bell(g,off=false){
  if(off){const a=g.v(2.5,3,3.5);return knockout(bell(g),[line(a,a,g.s-a,g.s-a)],g);}
  const {s,c,v,r}=g;
  const side=v(4.25,5.25,6.25), right=s-side;
  const top=v(2.5,3,3.5), dome=v(6,7.5,9), waist=v(8.25,10.25,12.25);
  const rim=v(11.75,14.75,17.75), edge=v(2.75,3.25,3.75), k=Math.min(r,v(.5,.65,.8));
  const crown=`M${side} ${dome}C${side} ${top+v(1.75,2.25,2.75)} ${c-v(2,2.5,3)} ${top} ${c} ${top}C${c+v(2,2.5,3)} ${top} ${right} ${top+v(1.75,2.25,2.75)} ${right} ${dome}`;
  const out=[path(`${crown}V${waist}C${right} ${waist+v(1.5,2,2.5)} ${s-edge-v(.5,.75,1)} ${rim-v(1,1.25,1.5)} ${s-edge} ${rim-k}Q${s-edge+k/2} ${rim} ${s-edge-k} ${rim}H${edge+k}Q${edge-k/2} ${rim} ${edge} ${rim-k}C${edge+v(.5,.75,1)} ${rim-v(1,1.25,1.5)} ${side} ${waist+v(1.5,2,2.5)} ${side} ${waist}Z`)];
  out.push(path(`M${c-v(1.15,1.4,1.75)} ${v(14,17.5,20.75)}Q${c} ${v(15,18.75,22.25)} ${c+v(1.15,1.4,1.75)} ${v(14,17.5,20.75)}`));
  return out;
}
function person(g,group=false){
  const {s,c,v}=g, cx=group?v(6.25,7.75,9.25):c;
  const radius=group?v(2,2.5,3):v(2.4,3,3.6),cy=v(4.5,5.6,6.7);
  const l=group?v(2.25,2.75,3.25):v(3.25,4,4.75);
  const right=group?v(10.25,12.75,15.25):s-l;
  const top=v(9.5,11.9,14.25),bottom=v(13.75,17.25,20.75),rise=v(1.25,1.5,1.75);
  const a=cx-v(.9,1.15,1.4),b=cx+v(.9,1.15,1.4);
  const out=[circle(cx,cy,radius),path(`M${l} ${bottom}V${bottom-rise}C${l} ${top+v(1.2,1.5,1.8)} ${a-v(1.5,1.9,2.3)} ${top} ${a} ${top}H${b}C${b+v(1.5,1.9,2.3)} ${top} ${right} ${top+v(1.2,1.5,1.8)} ${right} ${bottom-rise}V${bottom}`)];
  if(group){
    const x=v(11.1,13.8,16.5),y=v(2.6,3.2,3.85),rr=v(2,2.5,3);
    out.push(path(`M${x} ${y}C${x+rr*1.35} ${y} ${x+rr*1.35} ${y+rr*2} ${x} ${y+rr*2}`));
    out.push(path(`M${v(12,15,18)} ${top}C${v(13.5,16.9,20.25)} ${top+v(.25,.3,.4)} ${s-v(1.75,2.25,2.75)} ${top+v(1.75,2.2,2.65)} ${s-v(1.75,2.25,2.75)} ${bottom-rise}V${bottom}`));
  }
  return out;
}
function lock(g,open=false){
  const {s,c,v,r}=g, l=v(3,4,5), y=v(7,9,10.5), w=s-2*l, top=v(2,2.5,3), half=v(2.5,3,3.5), end=y-v(1.5,2,2.5);
  return [rect(l,y,w,v(7,8.5,10.5),r),path(open
    ? `M${c-half} ${y}V${top+half}A${half} ${half} 0 0 1 ${c+half} ${top+half}`
    : `M${c-half} ${y}V${top+half}A${half} ${half} 0 0 1 ${c+half} ${top+half}V${y}`),
    line(c,y+v(2.5,3,4),c,y+v(4,5,6))];
}
function ring(g){return circle(g.c,g.c,g.v(6,7.5,9));}

export const coreDrawings={
  'arrow-right':g=>horizontal(g),
  'arrow-up':g=>rotated(horizontal(g),-90,g.c),
  'chevron-right':g=>[contour([[g.v(6,7.5,9),g.v(3.5,4.5,5.5)],[g.v(10.5,13,15.5),g.c],[g.v(6,7.5,9),g.v(12.5,15.5,18.5)]],g.tip)],
  'chevron-down':g=>rotated(coreDrawings['chevron-right'](g),90,g.c),
  'arrow-up-right':g=>{const {s,v,tip}=g,a=v(4,5,6),b=s-a;return arrow([line(a,b,b,a)],[[a,a],[b,a],[b,b]],g);},
  'undo':g=>{const {s,c,v,tip}=g,x=v(3,4,4.5),y=v(6,7.5,9),b=v(13,16,19);return arrow([path(`M${x} ${y}H${c+v(1.5,2,2.5)}A${v(3.5,4.25,5)} ${v(3.5,4.25,5)} 0 0 1 ${c+v(1.5,2,2.5)} ${b}H${v(6,7,8)}`)],[[x+v(3,3.5,4.5),y-v(3,3.5,4.5)],[x,y],[x+v(3,3.5,4.5),y+v(3,3.5,4.5)]],g).reverse();},
  'download':g=>{const {s,c,v,r,tip}=g,l=v(2.5,3,3.5),b=v(13.5,17,20.5),y=v(9,11,13),h=v(3,3.5,4.5);return [...arrow([line(c,v(2,2.5,3),c,y)],[[c-h,y-h],[c,y],[c+h,y-h]],g),contour([[l,b-v(3,3.5,4)],[l,b],[s-l,b],[s-l,b-v(3,3.5,4)]],r)];},
  'upload':g=>{const {s,c,v,r,tip}=g,l=v(2.5,3,3.5),b=v(13.5,17,20.5),y=v(2.5,3,3.5),h=v(3,3.5,4.5);return [...arrow([line(c,y,c,v(10,12,14.5))],[[c-h,y+h],[c,y],[c+h,y+h]],g),contour([[l,b-v(3,3.5,4)],[l,b],[s-l,b],[s-l,b-v(3,3.5,4)]],r)];},
  'plus':g=>[line(g.v(3,4,4.5),g.c,g.v(13,16,19.5),g.c),line(g.c,g.v(3,4,4.5),g.c,g.v(13,16,19.5))],
  'minus':g=>[line(g.v(3,4,4.5),g.c,g.v(13,16,19.5),g.c)],
  'check':g=>[contour([[g.v(3,3.5,4),g.v(8,10,12)],[g.v(6.5,8,9.5),g.v(11.5,14.5,17)],[g.v(13,16.5,20),g.v(4.5,5.5,7)]],g.tip)],
  'x':g=>{const a=g.v(4,5,6),b=g.s-a;return [line(a,a,b,b),line(a,b,b,a)];},
  'search':g=>{const {v}=g,c=v(7,8.75,10.5),r=v(4.5,5.75,7),q=c+r/Math.sqrt(2);return [circle(c,c,r),line(q,q,v(14,17.5,21),v(14,17.5,21))];},
  'filter':g=>{const {s,c,v,r}=g,l=v(2.5,3,3.5),t=v(3,4,4.5),neck=v(8.5,10.5,12.5),h=v(1.25,1.5,2);return [contour([[l,t],[s-l,t],[c+h,neck],[c+h,v(12,15,18)],[c-h,v(13,16.5,20)],[c-h,neck]],Math.min(r,1),true)];},
  'more-horizontal':g=>[g.v(3.5,4.5,5.5),g.c,g.v(12.5,15.5,18.5)].map(x=>circle(x,g.c,g.v(0.85,1,1.1),{fill:'currentColor',stroke:'none'})),
  'sliders':g=>{const {s,c,v}=g,l=v(2.5,3,3.5),r=s-l,ys=[v(4.5,5.5,6.5),v(11.5,14.5,17.5)],xs=[v(6,7,8),v(10,13,16)],radius=v(1.5,2,2.5);return ys.flatMap((y,i)=>[line(l,y,xs[i]-radius,y),circle(xs[i],y,radius),line(xs[i]+radius,y,r,y)]);},
  'file':g=>file(g),'file-text':g=>file(g,true),'folder':g=>folder(g),'folder-plus':g=>folder(g,true),
  'calendar':g=>{
    const {s,c,v,r}=g,l=v(2.5,3,3.5),t=v(3.5,4.5,5.5),b=v(14,17.5,21),header=v(6.5,8,10),peg=v(5.5,6.5,7.5);
    const out=[rect(l,t,s-l*2,b-t,r),line(l,header,s-l,header),line(peg,v(2,2.5,3),peg,t+v(1,1.5,2)),line(s-peg,v(2,2.5,3),s-peg,t+v(1,1.5,2))];
    const points=s===16?[[6,9.5],[10,9.5],[6,12]]:s===20?[[7,11.5],[13,11.5],[7,15],[13,15]]:[[7.5,14],[12,14],[16.5,14],[7.5,18],[12,18],[16.5,18]];
    return out.concat(points.map(([x,y])=>dot(x,y,g)));
  },
  'clipboard':g=>{const {s,c,v,r}=g,l=v(3.5,4.5,5),t=v(3.5,4.5,5.5),b=v(14,17.5,21),w=v(5,6,7),h=v(2.5,3,3.5);return [contour([[c-w/2,t],[l,t],[l,b],[s-l,b],[s-l,t],[c+w/2,t]],r),rect(c-w/2,v(2,2.5,3),w,h,Math.min(r,1))];},
  'copy':g=>{const {s,v,r}=g,l=v(5.5,7,8.5),t=v(5.5,7,8.5),b=v(14,17.5,21),a=v(2,2.5,3);const rear=v(10,12.5,15),front=rect(l,t,b-l,b-t,r);return knockout([rect(a,a,rear-a,rear-a,r)],[front],g,{silhouettes:[front]});},
  'trash':g=>{const {s,c,v,r}=g,t=v(4.5,5.5,6.5),l=v(4,5,6),b=v(14,17.5,21);const out=[line(v(2.5,3,3.5),t,v(13.5,17,20.5),t),contour([[l,t],[l+v(0.5,0.5,0.5),b],[s-l-v(0.5,0.5,0.5),b],[s-l,t]],Math.min(r,1.5)),contour([[c-v(2,2.5,3),t],[c-v(2,2.5,3),v(2,2.5,3)],[c+v(2,2.5,3),v(2,2.5,3)],[c+v(2,2.5,3),t]],Math.min(r,1))];if(s===16)out.push(line(c,7.5,c,11));else out.push(line(c-v(1.5,1.5,2),v(9,9,10.5),c-v(1.5,1.5,2),v(12,14,17)),line(c+v(1.5,1.5,2),v(9,9,10.5),c+v(1.5,1.5,2),v(12,14,17)));return out;},
  'user':g=>person(g),
  'users':g=>person(g,true),
  'mail':g=>{const {s,c,v,r,tip}=g,l=v(2,2.5,3),t=v(4,5,6),b=s-t;return [rect(l,t,s-2*l,b-t,r),contour([[l+v(0.5,0.5,0.5),t+v(1,1.5,2)],[c,c+v(1,1,1.5)],[s-l-v(0.5,0.5,0.5),t+v(1,1.5,2)]],tip)];},
  'message':g=>{const {s,c,v,r}=g,l=v(2.5,3,3.5),t=v(2.5,3.5,4),rr=s-l,b=v(11,13.5,16);return [contour([[l,t],[rr,t],[rr,b],[c-v(0.5,1,1.5),b],[l,v(14,17,20.5)]],r,true)];},
  'bell':g=>bell(g),'bell-off':g=>bell(g,true),'lock':g=>lock(g),'unlock':g=>lock(g,true),
  'circle':g=>[ring(g)],
  'square':g=>{const l=g.v(2.5,3,3.5);return [rect(l,l,g.s-2*l,g.s-2*l,g.r)];},
  'star':g=>{const {c,v,tip}=g,ro=v(5.75,7.25,8.75),ri=v(2.75,3.5,4.25);const points=Array.from({length:10},(_,i)=>{const a=-Math.PI/2+i*Math.PI/5,r=i%2?ri:ro;return [c+Math.cos(a)*r,c+0.4+Math.sin(a)*r];});return [contour(points,tip,true)];},
  'heart':g=>{const {s,c,v,tip}=g,l=v(2,2.5,3),t=v(3.25,4,4.75),y=v(6.5,8,9.5),b=v(13.75,17,20.5),k=tip*0.65;return [path(`M${c+k} ${b-k}Q${c} ${b} ${c-k} ${b-k}C${c-v(2,3,3.5)} ${b-v(1.5,2,2.5)} ${l} ${v(9,11,13)} ${l} ${y}C${l} ${t-v(1,1.25,1.5)} ${c-v(2,2.5,3)} ${t-v(1,1.25,1.5)} ${c} ${t+v(1,1.5,2)}C${c+v(2,2.5,3)} ${t-v(1,1.25,1.5)} ${s-l} ${t-v(1,1.25,1.5)} ${s-l} ${y}C${s-l} ${v(9,11,13)} ${c+v(2,3,3.5)} ${b-v(1.5,2,2.5)} ${c+k} ${b-k}Z`)];},
  'info-circle':g=>[ring(g),dot(g.c,g.v(5,6,7),g),line(g.c,g.v(8,10,12),g.c,g.v(11,14,17))],
  'check-circle':g=>[ring(g),contour([[g.v(5,6,7.5),g.c],[g.v(7.25,9,11),g.v(10,12.5,15)],[g.v(11.25,14,17),g.v(6,7.5,9)]],g.tip)],
  'alert-triangle':g=>{const {s,c,v,r}=g;return [contour([[c,v(2.25,3,3.5)],[v(14.25,17.5,21),v(13.5,17,20.5)],[v(1.75,2.5,3),v(13.5,17,20.5)]],Math.min(r,1.1),true),line(c,v(6.5,8,9),c,v(9,11.5,14)),dot(c,v(11.5,14.5,17.5),g)];},
  'loader':g=>{const {c,v}=g,r=v(5.5,7,8.5);return [path(`M${c+r} ${c}A${r} ${r} 0 1 1 ${c} ${c-r}`)];},
  'home':g=>{const {s,c,v,r}=g,l=v(3,4,4.5),rr=s-l,t=v(2.25,2.75,3.5),roof=v(6.5,8,9.5),b=v(14,17.5,21),half=v(1.5,2,2.5),door=v(10,12.5,15);return [contour([[l,b],[l,roof],[c,t],[rr,roof],[rr,b]],r,true),contour([[c-half,b],[c-half,door],[c+half,door],[c+half,b]],Math.min(r,1))];},
  'settings':g=>{const {c,v,corner}=g,outer=v(5.75,7.25,8.75),inner=v(4.5,5.5,6.75),spread=v(12,10,10),points=[];for(let i=0;i<6;i++){for(const [offset,r] of [[-24,inner],[-spread,outer],[spread,outer],[24,inner]]){const a=(i*60-90+offset)*Math.PI/180;points.push([c+Math.cos(a)*r,c+Math.sin(a)*r]);}}return [contour(points,corner==='sharp'?0:corner==='soft'?v(0.3,0.4,0.5):v(0.65,0.8,1),true),circle(c,c,v(1.65,2.25,2.75))];},
  'grid':g=>{const {s,v,r}=g,l=v(2.5,3,3.5),gap=v(3,3.5,4),w=(s-2*l-gap)/2;return [[l,l],[l+w+gap,l],[l,l+w+gap],[l+w+gap,l+w+gap]].map(([x,y])=>rect(x,y,w,w,Math.min(r,w*0.28)));},
  'list':g=>{const {s,v}=g,ys=[v(4,5,6),g.c,v(12,15,18)];return ys.flatMap(y=>[dot(v(3,3.5,4),y,g),line(v(6,7.5,9),y,v(13.5,17,20.5),y)]);},
  'chart-bar':g=>{const {s,c,v,r}=g,b=v(14,17.5,21),w=v(2.5,3,3.5),gap=v(2.25,2.5,3);return [v(8,10,12),v(3,4,4.5),v(6,7.5,9)].map((t,i)=>rect(c-w*1.5-gap+i*(w+gap),t,w,b-t,Math.min(r,0.75)));},
  'database':g=>{const {s,c,v}=g,l=v(3,3.5,4),rr=s-l,top=v(4,4.5,5),rx=c-l,ry=v(1.75,2.25,2.5),bottom=v(12,15.5,19);const out=[['ellipse',{cx:c,cy:top,rx,ry}],path(`M${l} ${top}V${bottom}A${rx} ${ry} 0 0 0 ${rr} ${bottom}V${top}`)];if(s!==16)out.push(path(`M${l} ${v(8,10,12)}A${rx} ${ry} 0 0 0 ${rr} ${v(8,10,12)}`));return out;},
  'code':g=>{const {s,c,v,tip}=g,l=v(2.5,3,3.5),mid=v(5.5,6.5,7.5),t=v(4.5,5.5,6.5),b=s-t;return [contour([[mid,t],[l,c],[mid,b]],tip),contour([[s-mid,t],[s-l,c],[s-mid,b]],tip),line(v(9,11.5,14),v(3,3.5,4),v(7,8.5,10),v(13,16.5,20))];},
  'terminal':g=>{const {s,c,v,r,tip}=g,l=v(2,2.5,3),t=v(3,4,4.5),b=s-t;return [rect(l,t,s-2*l,b-t,r),contour([[v(4.5,5.5,6.5),v(6,7.5,9)],[v(6.5,8,9.5),c],[v(4.5,5.5,6.5),v(10,12.5,15)]],tip),line(v(9,11,13),v(10,12.5,15),v(11.5,14.5,17.5),v(10,12.5,15))];},
};



export { file, folder, bell, person, lock };
