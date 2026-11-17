import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';

export function bed({g,p,l,o}){
 const mattress=o([[2.5,8],[21.5,8],[21.5,17],[2.5,17]],true,g.r);
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
