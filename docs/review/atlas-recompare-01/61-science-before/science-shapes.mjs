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
 const shoulder=g.s/12;
 const body=o([[9.5,2],[14.5,2],[14.5,8],[21,21.5],[3,21.5],[9.5,8]],true,[0,0,shoulder,g.r*.8,g.r*.8,shoulder]);
 return [...enclosedDetails(body,[l(3,15,21,15)],g),l(8,2,16,2)];
}
export function flaskRound({g,p,l}){
 const shoulderY=14.5-Math.sqrt(7.5**2-3.75**2);
 const body=p(`M9.5 2H14.5V6C14.5 7 14.9 ${shoulderY-.85/Math.sqrt(3)} 15.75 ${shoulderY}A7.5 7.5 0 1 1 8.25 ${shoulderY}C9.1 ${shoulderY-.85/Math.sqrt(3)} 9.5 7 9.5 6Z`);
 return [...enclosedDetails(body,[l(4,15,20,15)],g),l(8,2,16,2)];
}
export function testTube({g,p,l}){
 const body=p('M9 2H15V19A3 3 0 0 1 9 19Z');
 return [...enclosedDetails(body,[l(9,15,15,15)],g),l(7.5,2,16.5,2)];
}
export function microscope({g,r,p,l}){
 const barrel=r(7,2,6,11,g.tip);
 return [...exteriorDetails(barrel,[p('M13 7C23 7 24 22 15 22')],g),l(6,17,13,17),l(3,22,21,22)];
}
export function telescope({g,o,l}){
 const u=[2/Math.sqrt(5),-1/Math.sqrt(5)],v=[-u[1],u[0]];
 const at=(x,y)=>[11.9+x*u[0]+y*v[0],9.4+x*u[1]+y*v[1]];
 const barrel=o([at(-8.8,-1.75),at(8.8,-3.25),at(8.8,3.25),at(-8.8,1.75)],true,g.r*.5);
 const ring=4,halfWidth=1.75+(ring+8.8)*1.5/17.6;
 return [...enclosedDetails(barrel,[l(...at(ring,-halfWidth),...at(ring,halfWidth))],g),...exteriorDetails(barrel,[l(12,10,12,21)],g).slice(1),o([[6,21],[12,16],[18,21]],false,g.tip)];
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
export function rocket({g,p,o,d,l}){
 const body=p('M12 2C5 7 5 13 8.5 18.5H15.5C19 13 19 7 12 2Z');
 const left=o([[7,10],[3.5,14],[4.5,20],[8.5,18]],true,g.tip);
 const right=o([[17,10],[20.5,14],[19.5,20],[15.5,18]],true,g.tip);
 return [body,d(12,10,g.v(.85,1,1.2)),...exteriorDetails(body,[left,right],g).slice(1),l(10,22.5,14,22.5)];
}
export function satellite({g,o,l,p}){
 const body=o([[14.5,6],[18,9.5],[12.5,15],[9,11.5]],true,g.tip);
 const left=o([[13.5,7],[9.5,3],[6,6.5],[10,10.5]],true,g.tip);
 const right=o([[17,10.5],[21,14.5],[17.5,18],[13.5,14]],true,g.tip);
 return [...exteriorDetails(body,[left,right,l(16.25,7.75,19,5)],g),p('M3 15A6 6 0 0 1 9 21')];
}
