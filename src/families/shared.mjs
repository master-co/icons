import { path, line, circle, rect, contour, n } from '../geometry.mjs';

// Coordinates in these helpers describe a 24-unit construction grid. Simple
// outlines retain proportions; each family chooses explicit detail/spacing
// changes at 16 where needed. Stroke weights and frame radii are native.
export function figure(g) {
  const k=g.s/24, u=x=>n(x*k);
  return {
    u,
    line:(x1,y1,x2,y2)=>line(u(x1),u(y1),u(x2),u(y2)),
    circle:(x,y,r)=>circle(u(x),u(y),u(r)),
    dot:(x,y,r=g.v(.8,.95,1.05))=>circle(u(x),u(y),r,{fill:'currentColor',stroke:'none'}),
    rect:(x,y,w,h,r=g.r)=>rect(u(x),u(y),u(w),u(h),r),
    contour:(points,closed=false,r=g.tip)=>contour(points.map(([x,y])=>[u(x),u(y)]),r,closed),
    path:d=>path(d.replace(/([a-df-z])([^a-df-z]*)/gi,(_,command,body)=>command+(body.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi)||[]).map((x,i)=>command.toUpperCase()==='A'&&[2,3,4].includes(i%7)?Number(x):u(Number(x))).join(' '))),
  };
}
export const rotate=(nodes,angle,g)=>nodes.map(([tag,attrs])=>[tag,{...attrs,transform:`rotate(${angle} ${g.c} ${g.c})`}]);
export const opacity=(node,value)=>[node[0],{...node[1],opacity:value}];
export const dashed=(node,g)=>[node[0],{...node[1],'stroke-dasharray':`${g.v(1.2,1.5,1.8)} ${g.v(2,2.5,3)}`}];
export function mark(g,kind,x=17,y=17) {
  const f=figure(g),h=g.s===16?2.5:2.75;
  if(kind==='check')return [f.contour([[x-h,y],[x-.5,y+2],[x+h,y-2]])];
  if(kind==='x')return [f.line(x-2,y-2,x+2,y+2),f.line(x+2,y-2,x-2,y+2)];
  if(kind==='minus')return [f.line(x-h,y,x+h,y)];
  return [f.line(x-h,y,x+h,y),f.line(x,y-h,x,y+h)];
}
