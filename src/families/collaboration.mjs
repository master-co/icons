import { contour } from '../geometry.mjs';
import { figure, mark } from './shared.mjs';
import { coreDrawings, person, bell } from './core.mjs';

function roundMessage(g) {
  const f=figure(g),k=g.corner==='sharp'?0:g.corner==='soft'?.4:.8;
  return [f.path(`M4.2058 16.5A9 9 0 1 1 8 20.0623L${3+k} ${21-k*.2}Q3 21 ${3+k*.25} ${21-k}Z`)];
}
function mailState(g,state) {
  const {s,c,v,r}=g,l=v(2,2.5,3),t=v(4,5,6),b=s-t;
  return [contour([[v(7,8.75,10.5),b],[l,b],[l,t],[s-l,t],[s-l,v(7,8.75,10.5)]],r),
    coreDrawings.mail(g)[1],...mark(g,state,17.5,18)];
}
function accountGear(g) {
  const f=figure(g),cx=17,cy=17,points=[];
  for(let tooth=0;tooth<6;tooth++)for(const[offset,radius]of [[0,3.6],[12,4.8],[36,4.8],[48,3.6]]){
    const a=(tooth*60+offset)*Math.PI/180;points.push([cx+Math.cos(a)*radius,cy+Math.sin(a)*radius]);
  }
  return [f.contour(points,true,g.tip*.4),f.circle(cx,cy,1.3)];
}
export const collaboration = {
  'message-plus':g=>[...coreDrawings.message(g),...mark(g,'plus',12,10)],
  'message-circle-question'(g) {
    const f=figure(g);
    return [...roundMessage(g),f.path('M9.5 8.5C9.5 5.5 15 5.5 15 8.5C15 10.5 12 10.5 12 13'),f.dot(12,16.5,g.stroke/2)];
  },
  'message-circle-warning'(g) {
    const f=figure(g);
    return [...roundMessage(g),f.line(12,7,12,12),f.dot(12,16,g.stroke/2)];
  },
  'mail-check':g=>mailState(g,'check'),
  'mail-x':g=>mailState(g,'x'),
  'bell-ring'(g) {
    const f=figure(g);
    return [...bell(g),f.path('M2 10C2 7 3 4.5 5 3'),f.path('M22 10C22 7 21 4.5 19 3')];
  },
  'user-x':g=>[...person(g,true).slice(0,2),...mark(g,'x',19,9.5)],
  'user-cog'(g) {
    const f=figure(g);
    return [person(g,true)[0],f.path('M3.25 20.75V19C3.25 15.5 6.35 14.25 7.85 14.25H9.5'),...accountGear(g)];
  },
  megaphone(g) {
    const f=figure(g);
    return [f.contour([[3,9],[8,9],[20,4],[20,20],[8,15],[3,15]],true,g.r),
      f.line(8,9,8,15),f.contour([[7,15],[9,21],[12,21],[10,15.8333]],false,g.tip)];
  },
  handshake(g) {
    const f=figure(g),r=Math.min(g.r,g.v(.35,.45,.6));
    return [f.contour([[2,8],[5,5],[8,7.5],[5,15],[2,13]],true,r),
      f.contour([[22,8],[19,5],[16,7.5],[19,15],[22,13]],true,r),
      f.contour([[8,7.5],[9.5,6],[12,6]],false,g.tip),
      f.path('M16 7.5L14.5 6H12L9 9Q8 10 9 11Q10 12 11 11L13 9.5L18 14Q19 15 18 16L14 20Q13 21 12 20L5 15'),
      f.line(14.5,18,12,15.5),...(g.s===16?[]:[f.line(16.5,16,14,13.5)])];
  },
};
