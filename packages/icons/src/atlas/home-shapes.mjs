import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';

export function bed({g,p,l,o}){
 const rr=g.r*24/g.s;
 const mattress=p(rr?`M2.5 8H${21.5-rr}Q21.5 8 21.5 ${8+rr}V17H2.5Z`:'M2.5 8H21.5V17H2.5Z');
 return [...enclosedDetails(mattress,[l(7,8,7,17)],g),...exteriorDetails(mattress,[l(2.5,4,2.5,20.5),l(21.5,17,21.5,20.5)],g).slice(1)];
}
function seat({g,p,l,o},wide){
 const a=wide?2:3,b=24-a,inner=a+4,rr=g.r*24/g.s,tip=g.tip*24/g.s;
 const top=tip?`M${inner+tip} 13H${24-inner-tip}Q${24-inner} 13 ${24-inner} ${13-tip}`:`M${inner} 13H${24-inner}`;
 const bottom=rr?`V${19-rr}Q${b} 19 ${b-rr} 19H${a+rr}Q${a} 19 ${a} ${19-rr}`:`V19H${a}`;
 const end=tip?`V${13-tip}Q${inner} 13 ${inner+tip} 13Z`:'V13Z';
 const front=p(top+`V10.5C${24-inner} 7 ${b} 7 ${b} 10.5`+bottom+`V10.5C${a} 7 ${inner} 7 ${inner} 10.5`+end);
 const back=o([[a+2,10.5],[a+2,4.5],[b-2,4.5],[b-2,10.5]],false,g.r);
 return exteriorDetails(front,[back,...wide?[l(12,4.5,12,13)]:[],l(a+2,19,a+2,21),l(b-2,19,b-2,21)],g);
}
export const sofa=ctx=>seat(ctx,true);
export const armchair=ctx=>seat(ctx,false);

export function lamp({g,p,l,o}){
 const shade=o([[6.5,3],[17.5,3],[21.5,14],[2.5,14]],true,g.tip);
 return [...exteriorDetails(shade,[l(12,14,12,21)],g),l(8,21,16,21)];
}
export function desk({g,p,l,small}){
 const drawers=p('M3 6H21V12H3Z');
 const details=[l(12,6,12,12),...small?[]:[l(6.5,9,8.5,9),l(15.5,9,17.5,9)]];
 return [l(2,6,22,6),...enclosedDetails(drawers,details,g).slice(1),l(3,6,3,20),l(21,6,21,20),l(3,12,21,12)];
}
export function doorClosed({g,l,o,d}){
 return [o([[5,21],[5,3],[19,3],[19,21]],false,g.r),l(2,21,22,21),d(15,12)];
}
export function doorOpen({g,l,o,d}){
 const panel=o([[5,3],[14,1.5],[14,22.5],[5,21]],true,g.tip);
 return [...exteriorDetails(panel,[o([[5,21],[5,3],[19,3],[19,21]],false,g.r),l(2,21,22,21)],g),d(10.5,12)];
}

export function fence({g,r,o}){
 const rail=r(2,11,20,5,g.tip);
 const picket=x=>o([[x,21],[x,6],[x+2.5,3.5],[x+5,6],[x+5,21]],true,g.tip);
 return exteriorDetails(rail,[picket(4),picket(15)],g);
}
export function bathtub({g,p,l}){
 const curve='M3 12L4 17C5 21 19 21 20 17L21 12';
 const shell=p(curve+'Z');
 const plumbing=[p('M6 12V5C6 1 11 1 11 5'),l(7,18,7,22),l(17,18,17,22)];
 return [p(curve),l(2,12,22,12),...exteriorDetails(shell,plumbing,g).slice(1)];
}
export function showerHead({g,p,l,d,small}){
 const curve='M6 14A5.656854 5.656854 0 0 1 14 6';
 const head=p(curve+'Z'),pipe=l(3.5,3.5,6.5,6.5);
 const drops=small?[[13,13],[18,8],[8,18],[18,18]]:[[16,9],[12.5,12.5],[9,16],[19,12],[15.5,15.5],[12,19],[18.5,18.5]];
 return [p(curve),l(5,15,15,5),...exteriorDetails(head,[pipe],g).slice(1),...drops.map(([x,y])=>d(x,y,g.v(.6,.7,.8)))];
}
