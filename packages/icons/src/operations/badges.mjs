import {figure} from '../families/shared.mjs';
import {knockout} from '../occlusion.mjs';

export function withClock(g,base,x=17.5,y=16.8) {
  const f=figure(g),ring=f.circle(x,y,g.v(4.35,4.25,4.15));
  return knockout(base,[ring,f.contour([[x,y-2],[x,y],[x+1.7,y+1]])],g,{silhouettes:[ring]});
}
export function withLock(g,base) {
  const f=figure(g),body=f.rect(13.2,14.2,8.2,6.8,Math.min(g.r,1));
  const shackle=f.path('M14.9 14.2V12.1C14.9 8.8 19.7 8.8 19.7 12.1V14.2');
  return knockout(base,[body,shackle],g,{silhouettes:[body,shackle]});
}
