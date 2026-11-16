import { knockout } from '../occlusion.mjs';
import { figure, mark } from './shared.mjs';
import { coreDrawings, person, bell } from './core.mjs';

function roundMessage(g) {
  const f=figure(g),k=g.corner==='sharp'?0:g.corner==='soft'?.4:.8;
  return [f.path(`M4.2058 16.5A9 9 0 1 1 8 20.0623L${3+k} ${21-k*.2}Q3 21 ${3+k*.25} ${21-k}Z`)];
}
function mailState(g,state) {
  return knockout(coreDrawings.mail(g),mark(g,state,state==='check'?18.25:17.5,18),g);
}
export function accountGear(g) {
  const f=figure(g),cx=17,cy=17,points=[];
  for(let tooth=0;tooth<6;tooth++)for(const[offset,radius]of [[0,4.2],[12,5.2],[36,5.2],[48,4.2]]){
    const a=(tooth*60+offset)*Math.PI/180;points.push([cx+Math.cos(a)*radius,cy+Math.sin(a)*radius]);
  }
  return [f.contour(points,true,g.tip*.4),f.circle(cx,cy,1.85)];
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
    const gear=accountGear(g);
    return knockout(person(g,true).slice(0,2),gear,g,{silhouettes:[gear[0]]});
  },
  megaphone(g) {
    const f=figure(g),k=g.corner==='sharp'?0:g.corner==='soft'?.8:1.4;
    // Redrawn after Lucide's curved horn and bent grip; pinned provenance is
    // retained. Structural curves remain curved even in the sharp preset.
    return [f.path(`M${3+k} 7H10.5C14 7 17.2 5.3 ${20.5-k} ${3.5+k*.5}Q20.5 3.5 20.5 ${3.5+k}V${17.5-k}Q20.5 17.5 ${20.5-k} ${17.5-k*.5}C17.2 15.7 14 14 10.5 14H${3+k}Q3 14 3 ${14-k}V${7+k}Q3 7 ${3+k} 7Z`),
      f.line(8,7,8,14),
      f.path('M6 14C6.1 16.5 6.9 19 8.3 20.5C9.2 21.8 11.5 21.2 11.5 19.8C11.5 19.2 10.3 17 10.3 14')];
  },
  handshake(g) {
    const f=figure(g),r=Math.min(g.r,g.v(.35,.45,.6));
    // Lucide's overlapping thumb and rounded finger returns informed this
    // redraw. Shorten the internal upper seam at 16; keep the grip silhouette.
    return [
      f.path(`M${g.s===16?'15.3 14.4':'14.3 13.4'}L16.6 15.7C18.5 17.6 21 15.1 19.1 13.2L15 9.1C13.9 8 12.4 8 11.3 9.1L10.1 10.3C8.2 12.2 5.7 9.7 7.6 7.8L10.4 5C12.2 3.4 14.6 3.2 16.6 4.4C17.3 4.8 17.9 5.1 18.6 4.9L20.6 4.5`),
      f.path('M11.3 16.5L13.6 18.8C15.5 20.7 18.5 17.6 16.6 15.7'),
      f.contour([[3.5,3.5],[2.5,13.5],[8.4,19.4]],false,r),
      f.path('M8.4 19.4C10.3 21.3 13.2 18.4 11.3 16.5'),
      f.line(3.4,4.5,11.1,4.5),
      f.contour([[20.5,3.5],[21.5,13.5],[19.4,13.5]],false,r),
    ];
  },
};
