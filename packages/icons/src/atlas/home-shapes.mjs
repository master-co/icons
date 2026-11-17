import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';

export function bed({g,p,l,o}){
 const rr=g.r*24/g.s;
 const mattress=p(`M2.5 8H${21.5-rr}Q21.5 8 21.5 ${8+rr}V17H2.5Z`);
 return [...enclosedDetails(mattress,[l(8.5,8,8.5,17)],g),...exteriorDetails(mattress,[l(2.5,3,2.5,22),l(21.5,17,21.5,22)],g).slice(1)];
}
function seat({g,p,l,o},wide){
 const a=wide?2:4,b=24-a,inner=a+4,rr=g.r*24/g.s;
 const front=p(`M${inner} 14H${24-inner}V11C${24-inner} 7.5 ${b} 7.5 ${b} 11V${20-rr}Q${b} 20 ${b-rr} 20H${a+rr}Q${a} 20 ${a} ${20-rr}V11C${a} 7.5 ${inner} 7.5 ${inner} 11Z`);
 const back=o([[a+3,11],[a+3,3.5],[b-3,3.5],[b-3,11]],false,g.r);
 return exteriorDetails(front,[back,...wide?[l(12,3.5,12,14)]:[],l(a+2,20,a+2,22),l(b-2,20,b-2,22)],g);
}
export const sofa=ctx=>seat(ctx,true);
export const armchair=ctx=>seat(ctx,false);

export function lamp({g,p,l,o}){
 const shade=o([[7,3],[17,3],[21,13],[3,13]],true,g.tip);
 return [...exteriorDetails(shade,[l(12,13,12,21)],g),l(7,21,17,21)];
}
export function desk({g,p,l,small}){
 const drawers=p('M4 5H20V13H4Z');
 const details=[l(12,5,12,13),...small?[]:[l(7,9,9,9),l(15,9,17,9)]];
 return [l(2,5,22,5),...enclosedDetails(drawers,details,g).slice(1),l(4,5,4,21),l(20,5,20,21),l(4,13,20,13)];
}
export function doorClosed({g,l,o,d}){
 return [o([[5,21],[5,3],[19,3],[19,21]],false,g.r),l(2,21,22,21),d(15,12)];
}
export function doorOpen({g,l,o,d}){
 const panel=o([[5,3],[16,5.5],[16,22.5],[5,20]],true,g.tip);
 return [...exteriorDetails(panel,[o([[5,20],[5,3],[21,3],[21,20]],false,g.r),l(2,20,23,20)],g),d(12,13)];
}

export function fence({g,r,o}){
 const rail=r(2,11,20,5,g.tip);
 const picket=x=>o([[x,22],[x,6],[x+3,3],[x+6,6],[x+6,22]],true,g.tip);
 return exteriorDetails(rail,[picket(3),picket(15)],g);
}
export function bathtub({g,p,l}){
 const curve='M3 12L4 17C5 21 19 21 20 17L21 12';
 const shell=p(curve+'Z');
 const plumbing=[p('M6 12V5C6 1 11 1 11 5'),l(7,18,7,22),l(17,18,17,22)];
 return [p(curve),l(2,12,22,12),...exteriorDetails(shell,plumbing,g).slice(1)];
}
export function showerHead({g,p,l,d,small}){
 const head=p('M4 16A7.8 7.8 0 0 1 15 5Z');
 const pipe=l(3,3,7,7);
 const drops=small?[[13,13],[18,8],[8,18],[18,18]]:[[12,13],[16,9],[20,11],[16,15],[12,19],[8,17],[16,22],[20,19]];
 return [...exteriorDetails(head,[pipe],g),...drops.map(([x,y])=>d(x,y,g.v(.6,.7,.8)))];
}
