import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';
import {connectivity} from '../families/connectivity.mjs';

export function solarPanel({g,o,p,l,small}){
 const panel=o([[6,14],[18,14],[22,22],[2,22]],true,g.tip);
 const grid=small?[l(12,14,12,22)]:[...[1,2].map(i=>l(6+12*i/3,14,2+20*i/3,22)),l(4,18,20,18)];
 const sun=p('M8 10A4 4 0 0 1 16 10');
 return [...enclosedDetails(panel,grid,g),sun,l(12,2,12,3),l(4,10,5,10),l(19,10,20,10),l(5.5,3.5,6.5,4.5),l(17.5,4.5,18.5,3.5)];
}
export function windTurbine({g,c,p,l}){
 const pivot=c(12,11,2);
 const blades=[0,120,240].map(deg=>{
  const a=deg*Math.PI/180,at=(x,y)=>[12+(x-12)*Math.cos(a)-(y-11)*Math.sin(a),11+(x-12)*Math.sin(a)+(y-11)*Math.cos(a)].join(' ');
  return p(`M${at(10,11)}L${at(10,8.5)}L${at(10.8,3.2)}Q${at(11,2)} ${at(12,2)}Q${at(13,2)} ${at(13.2,3.2)}L${at(14,8.5)}L${at(14,11)}Z`);
 });
 return [...exteriorDetails(pivot,[...blades,l(12,11,12,22)],g),l(8,22,16,22)];
}
const level=(count)=>({g,l})=>[...connectivity.battery(g),...[6,10.5,15].slice(0,count).map(x=>l(x,g.s===16?10:9.5,x,g.s===16?14:14.5))];
export const batteryFull=level(3),batteryLow=level(1),batteryMedium=level(2);
export function batteryWarning({g,l,d}){
 return [...connectivity.battery(g),l(10.5,10,10.5,11.5),d(10.5,14.5,g.v(.6,.7,.8))];
}
export function carBattery({g,r,l}){
 const shell=r(2,7,20,13,g.r);
 return [...exteriorDetails(shell,[l(6,4,6,7),l(18,4,18,7)],g),l(5.5,13.5,9.5,13.5),l(14,13.5,18,13.5),l(16,11.5,16,15.5)];
}
export function chargingStation({g,o,p,l}){
 const body=o([[3,22],[3,3],[14,3],[14,22]],false,g.r);
 const cable=p('M14 13H16Q18 13 18 15V17C18 18.1046 18.8954 19 20 19C21.1046 19 22 18.1046 22 17V9L18 5');
 const bolt=o([[9.5,10.5],[7,14],[10,14],[7.5,17.5]],false,g.tip);
 return [body,l(2,22,15,22),l(3,7,14,7),cable,bolt];
}
export function transmissionTower({g,o,l}){
 const frame=o([[5,22],[10,7],[14,7],[19,22]],true,g.tip);
 const crown=o([[2,10],[3,7],[9,7],[12,2],[15,7],[21,7],[22,10]],false,g.tip);
 return [...enclosedDetails(frame,[l(8.6667,11,19,22),l(15.3333,11,5,22)],g),crown,l(3,22,21,22)];
}
export function powerSocket({g,r,d}){
 return [r(3,3,18,18,g.r),d(8.5,12,g.v(1,1.2,1.4)),d(15.5,12,g.v(1,1.2,1.4))];
}
