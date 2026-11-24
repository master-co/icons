import {knockout} from '../occlusion.mjs';
// Open precipitation cloud: removing its bottom edge gives the falling marks
// real vertical room instead of fitting them into a thin strip below a box.
export const precipitationCloud=p=>p('M4.8 15.5C1.4 14.2 2 8.5 5.5 8.5C6.1 5 8.5 3 11.5 3C14.6 3 17 5.3 17.5 8.5C22.5 7.9 23.8 14.4 19.2 15.5');
export function cloudRain({p,l}){
 return [precipitationCloud(p),l(8,15,8,20),l(12,17,12,22),l(16,15,16,20)];
}
export function cloudSnow({p,d,g,small}){
 const points=small?[[8,16],[12,21],[16,16]]:[[8,15.5],[16,15.5],[12,18],[8,21],[16,21]];
 return [precipitationCloud(p),...points.map(([x,y])=>d(x,y,g.v(.8,.9,1)))];
}
export function cloudLightning({p,o,g}){
 return [precipitationCloud(p),o([[13.5,12.5],[9.5,17.5],[14.5,17.5],[10.5,22]],false,g.tip)];
}
export function cloudFog({p,l}){
 return [precipitationCloud(p),l(6,18.5,18,18.5),l(8,22,16,22)];
}
const lowCloud=p=>p('M5.5 21H16.5C21 21 21 14 16.5 14H15.8C15.1 11 13.4 9 10.5 9C7.2 9 5 11.3 5 14.5C1.5 15.4 1.7 21 5.5 21Z');
export function cloudSun({g,p,c,l}){
 const sky=[c(16,8,3),l(16,1.5,16,2),l(21,3,21.5,2.5),l(22.5,8,23,8)];
 return knockout(sky,[lowCloud(p)],g);
}
export function cloudMoon({g,p}){
 const moon=p('M16.5 2C14 2 12 4.5 12 7.5C12 11 15 13.5 18 13.5C20.5 13.5 22 11.5 22 9.5C17.5 11 14.5 7 16.5 2Z');
 return knockout([moon],[lowCloud(p)],g);
}
export function horizonSun(f,direction){
 const {p,l,a}=f;
 const arrow=direction==='up'?a([l(12,8,12,2.5)],[[9,5.5],[12,2.5],[15,5.5]]):a([l(12,2.5,12,8)],[[9,5],[12,8],[15,5]]);
 return [p('M7 17A5 5 0 0 1 17 17'),l(3,21,21,21),...arrow,l(4,12,5,13),l(19,13,20,12)];
}
export function wind({p}){
 return [p('M3 8H10.5A2.5 2.5 0 1 0 8 5.5'),
 p('M3 12H18.5A3 3 0 1 0 15.5 9'),
 p('M3 16H11.5A2.5 2.5 0 1 1 9 18.5')];
}
