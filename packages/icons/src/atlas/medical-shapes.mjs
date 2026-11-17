import {coreDrawings} from '../families/core.mjs';
import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';

export function stethoscope({g,p,c,o}){
 const bell=c(19.5,10,2.5),hose=p('M8 13.25V16C8 23.5 19.5 23.5 19.5 16V12.5');
 hose[1]['stroke-linecap']='butt';
 return [o([[5,2],[5,4],[3,4],[3,8]],false,g.tip),o([[11,2],[11,4],[13,4],[13,8]],false,g.tip),p('M3 8C3 15 13 15 13 8'),...exteriorDetails(bell,[hose],g)];
}
const diagonal=([x,y])=>[12+(x-y)/Math.SQRT2,12+(x+y-24)/Math.SQRT2];
export function syringe({g,o,l,small}){
 const bodyPoints=[[9,7],[9,17],[15,17],[15,7]].map(diagonal),envelope=o(bodyPoints,true,g.tip);
 const line=(x,y,x2,y2)=>l(...diagonal([x,y]),...diagonal([x2,y2]));
 const ticks=(small?[12]:[10.5,14]).map(y=>line(9,y,11.5,y));
 return [o(bodyPoints,false,g.tip),line(7,7,17,7),line(9,3,15,3),...exteriorDetails(envelope,[line(12,3,12,7),line(12,17,12,22)],g).slice(1),...enclosedDetails(envelope,ticks,g).slice(1)];
}
export function pill({g,p,l}){
 const body=p('M10.5 20.5L20.5 10.5A4.9497 4.9497 0 0 0 13.5 3.5L3.5 13.5A4.9497 4.9497 0 0 0 10.5 20.5Z');
 return enclosedDetails(body,[l(8.5,8.5,15.5,15.5)],g);
}

export function medicalMask({g,p,l,small}){
 const t=g.tip*24/g.s;
 const crown=t?`M5 ${7+t}Q5 7 ${5+t} ${7-t*3/7}L${12-t} ${4+t*3/7}Q12 4 ${12+t} ${4+t*3/7}L${19-t} ${7-t*3/7}Q19 7 19 ${7+t}`:'M5 7L12 4L19 7';
 const body=p(crown+'V13C19 17 16 19.5 12 21C8 19.5 5 17 5 13Z');
 const loops=[p('M5 8H4C.5 8 .5 16 4 16H5'),p('M19 8H20C23.5 8 23.5 16 20 16H19')];
 return [...enclosedDetails(body,small?[l(9,12,15,12)]:[l(9,10,15,10),l(9,14,15,14)],g),...exteriorDetails(body,loops,g).slice(1)];
}
export function bandage({g,r,l,d}){
 const body=r(2,7,20,10,g.r);
 return [...enclosedDetails(body,[l(7,7,7,17),l(17,7,17,17)],g),...[10.5,13.5].flatMap(x=>[10.5,13.5].map(y=>d(x,y,g.v(.45,.55,.65))))];
}
export function thermometer({g,p,l,d}){
 const shoulder=17.5-Math.sqrt(25-3.5**2);
 return [p(`M8.5 ${shoulder}V5C8.5 .3333 15.5 .3333 15.5 5V${shoulder}A5 5 0 1 1 8.5 ${shoulder}Z`),l(12,8,12,17.5),d(12,17.5,g.v(1,1.15,1.25))];
}

export function hospital({g,r,o,l}){
 const main=r(3,3,12.5,18.5,g.tip);
 const door=o([[7,21.5],[7,16],[11.5,16],[11.5,21.5]],false,g.tip);
 const wing=o([[15.5,11],[22,11],[22,21.5],[15.5,21.5]],false,g.tip);
 return [...enclosedDetails(main,[door,l(7,8.5,11.5,8.5),l(9.25,6.25,9.25,10.75)],g),...exteriorDetails(main,[wing],g).slice(1)];
}
export function ambulance({g,o,l,c}){
 const body=o([[2,5],[14,5],[14,8],[18,8],[22,13],[22,18.5],[2,18.5]],true,g.tip);
 const details=[l(14,8,14,18.5),l(14,13,22,13),l(5.5,10,10.5,10),l(8,7.5,8,12.5)];
 const rear=c(7,18.5,2.5),front=c(18,18.5,2.5);
 return exteriorDetails(front,exteriorDetails(rear,enclosedDetails(body,details,g),g),g);
}
export function heartPulse({g,o}){
 const body=coreDrawings.heart(g)[0];
 return enclosedDetails(body,[o([[2,12],[7.5,12],[10,9],[13,15],[15,12],[22,12]],false,g.tip)],g);
}
export function firstAidKit({g,r,o,l}){
 const body=r(3,8,18,13,g.r),handle=o([[8,8],[8,3],[16,3],[16,8]],false,g.r);
 return [...enclosedDetails(body,[l(9,14.5,15,14.5),l(12,11.5,12,17.5)],g),...exteriorDetails(body,[handle],g).slice(1)];
}
