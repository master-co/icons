import {knockout} from '../occlusion.mjs';
// Open precipitation cloud: removing its bottom edge gives the falling marks
// real vertical room instead of fitting them into a thin strip below a box.
export const precipitationCloud=p=>p('M4.8 15.5C1.2 13.7 1.9 6.5 6.5 4C11.1 1.5 16 3.8 17 8.5H17.5C22.5 8.5 23.8 14.4 19.2 15.5');
export function cloudRain({p,l}){
 return [precipitationCloud(p),l(8,15,8,20),l(12,17,12,22),l(16,15,16,20)];
}
export function cloudSnow({p,d,g,small}){
 const points=small?[[8,16],[12,21],[16,17]]:[[8,15],[8,19],[12,17],[12,21],[16,16],[16,20]];
 return [precipitationCloud(p),...points.map(([x,y])=>d(x,y,g.v(.8,.9,1)))];
}
export function cloudLightning({p,o,g}){
 return [precipitationCloud(p),o([[13.5,12.5],[9.5,17.5],[14.5,17.5],[10.5,22]],false,g.tip)];
}
export function cloudFog({p,l}){
 return [precipitationCloud(p),l(6,18.5,17,18.5),l(9,22,18,22)];
}
const lowCloud=p=>p('M8 21H16.5C21 21 21 14 16.5 14H15.8C15.1 11 13.4 9 10.5 9C6.2 9 3 12.1 3 15.5C3 18.8 5.1 21 8 21Z');
export function cloudSun({g,p,c,l}){
 const x=16,y=8.5,inner=5.5,outer=7,q=Math.SQRT1_2;
 const sky=[c(x,y,3),l(x,y-outer,x,y-inner),
 l(x+inner*q,y-inner*q,x+outer*q,y-outer*q),l(x+inner,y,x+outer,y)];
 return knockout(sky,[lowCloud(p)],g);
}
export function cloudMoon({g,p}){
 const moon=p('M16.5 2C14 2 12 4.5 12 7.5C12 11 15 13.5 18 13.5C20.5 13.5 22 11.5 22 9.5C17.5 11 14.5 7 16.5 2Z');
 return knockout([moon],[lowCloud(p)],g);
}
export function horizonSun(f,direction){
 const {p,l,a}=f;
 const arrow=direction==='up'?a([l(12,8,12,2.5)],[[9,5.5],[12,2.5],[15,5.5]]):a([l(12,2.5,12,8)],[[9,5],[12,8],[15,5]]);
 return [p('M7 17A5 5 0 0 1 17 17'),l(3,21,21,21),...arrow,l(5.2,10.2,6.3,11.3),l(17.7,11.3,18.8,10.2)];
}
export function wind({p}){
 return [p('M3 8H10.5A2 2 0 1 0 9.3 4.4'),
 p('M3 12H18.5A2.5 2.5 0 1 0 17 7.5'),
 p('M3 16H11.5A2 2 0 1 1 10.3 19.6')];
}
