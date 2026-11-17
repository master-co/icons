import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';

export function atom({p,d,g}){
 const ellipse=angle=>{
  const at=(x,y)=>[12+x*Math.cos(angle)-y*Math.sin(angle),12+x*Math.sin(angle)+y*Math.cos(angle)].join(' ');
  const a=11.5,b=4.3,k=.55228475;
  return p(`M${at(a,0)}C${at(a,b*k)} ${at(a*k,b)} ${at(0,b)}C${at(-a*k,b)} ${at(-a,b*k)} ${at(-a,0)}C${at(-a,-b*k)} ${at(-a*k,-b)} ${at(0,-b)}C${at(a*k,-b)} ${at(a,-b*k)} ${at(a,0)}Z`);
 };
 return [ellipse(Math.PI/4),ellipse(-Math.PI/4),d(12,12,g.v(.85,1,1.2))];
}
export function flaskConical({g,o,l}){
 const body=o([[9.5,2],[14.5,2],[14.5,8],[21,21.5],[3,21.5],[9.5,8]],true,[0,0,g.tip,g.r*.8,g.r*.8,g.tip]);
 return [...enclosedDetails(body,[l(3,15,21,15)],g),l(8,2,16,2)];
}
export function flaskRound({g,p,l}){
 const neckY=15-Math.sqrt(49-6.25);
 const body=p(`M9.5 2H14.5V${neckY}A7 7 0 1 1 9.5 ${neckY}Z`);
 return [...enclosedDetails(body,[l(5,15,19,15)],g),l(8,2,16,2)];
}
export function testTube({g,p,l}){
 const body=p('M9 2H15V19A3 3 0 0 1 9 19Z');
 return [...enclosedDetails(body,[l(9,15,15,15)],g),l(7.5,2,16.5,2)];
}
export function microscope({g,r,p,l}){
 const barrel=r(7,2,6,11,g.tip);
 return [...exteriorDetails(barrel,[p('M13 7C23 7 24 21 15 22')],g),l(6,17,13,17),l(3,22,21,22)];
}
export function telescope({g,o,l}){
 const barrel=o([[2.8,11.7],[18,2.8],[21,8.7],[4.7,14.7]],true,g.r*.5);
 return [...enclosedDetails(barrel,[l(14.2,5,17.1,10.1)],g),...exteriorDetails(barrel,[l(12,10,12,21)],g).slice(1),o([[6,21],[12,16],[18,21]],false,g.tip)];
}

export function dna({g,p,l}){
 const first=p('M7 2C7 7 8.5 9.5 12 12C15.5 14.5 17 17 17 22');
 const second=p('M17 2C17 7 15.5 9.5 12 12C8.5 14.5 7 17 7 22');
 const upper=p('M7 2C7 7 8.5 9.5 12 12C15.5 9.5 17 7 17 2Z');
 const lower=p('M7 22C7 17 8.5 14.5 12 12C15.5 14.5 17 17 17 22Z');
 return [first,second,...enclosedDetails(upper,[l(6,4,18,4),l(6,8,18,8)],g).slice(1),...enclosedDetails(lower,[l(6,16,18,16),l(6,20,18,20)],g).slice(1)];
}
export function orbit({g,c,p}){
 const satellite=c(20,6,2);
 return [c(12,12,4),...exteriorDetails(satellite,[p(`M20 6A10 10 0 1 0 ${12+Math.sqrt(99)} 11`)],g)];
}
export function rocket({g,p,o,c,l}){
 const body=p('M12 2C5 7 5 13 8.5 18.5H15.5C19 13 19 7 12 2Z');
 const left=o([[7,10],[3.5,14],[4.5,20],[8.5,18]],true,g.tip);
 const right=o([[17,10],[20.5,14],[19.5,20],[15.5,18]],true,g.tip);
 return [body,c(12,10,2),...exteriorDetails(body,[left,right],g).slice(1),l(10,22.5,14,22.5)];
}
export function satellite({g,o,l,p}){
 const body=o([[14.5,6],[18,9.5],[12.5,15],[9,11.5]],true,g.tip);
 const left=o([[13.5,7],[9.5,3],[6,6.5],[10,10.5]],true,g.tip);
 const right=o([[17,10.5],[21,14.5],[17.5,18],[13.5,14]],true,g.tip);
 return [...exteriorDetails(body,[left,right,l(16.25,7.75,19,5)],g),p('M3 15A6 6 0 0 1 9 21')];
}
