import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';
// The useful voids are designed before adding internal structure.
export function fuel({g,p,l,o}){
 const shell=o([[3,21],[3,3],[12,3],[12,21]],false,g.r);
 const solid=['path',{d:shell[1].d+'Z'}];
 const pipe=p('M12 12H14.5C16 12 17 13 17 14.5V17.5C17 21.5 22 21.5 22 17.5V10C22 9.2 21.7 8.6 21.1 8L18.5 5.5');
 return [shell,...enclosedDetails(solid,[l(3,9,12,9)],g).slice(1),l(2,21,14,21),...exteriorDetails(solid,[pipe],g).slice(1)];
}
export function backpack({g,p,o}){
 const k=g.corner==='sharp'?0:g.corner==='soft'?.8:1.6;
 const shell=p('M3.5 12C3.5 8 6 6 10 6H14C18 6 20.5 8 20.5 12'+`V${21-k}`+(k?`Q20.5 21 ${20.5-k} 21`:'')+`H${3.5+k}`+(k?`Q3.5 21 3.5 ${21-k}`:'')+'Z');
 const pocket=o([[8,21],[8,14],[16,14],[16,21]],false,g.r);
 const handle=o([[9,6],[9,2],[15,2],[15,6]],false,g.r);
 return [...exteriorDetails(shell,[handle],g),...enclosedDetails(shell,[pocket],g).slice(1)];
}
export function trafficCone({g,l,o}){
 const side=o([[5,21],[9.5,3],[14.5,3],[19,21]],false,g.tip);
 side[1]['stroke-linecap']='butt';
 const solid=['path',{d:side[1].d+'Z'}];
 return [side,l(3,21,21,21),...enclosedDetails(solid,[l(7.75,10,16.25,10),l(6.5,15,17.5,15)],g).slice(1)];
}

export function ship({g,o,l,p}){
 const hull=o([[12,9],[21,12],[18.5,16],[12,17.5],[5.5,16],[3,12]],true,[g.tip,g.r*.3,g.r*.65,g.r,g.r*.65,g.r*.3]);
 const deck=o([[6,11],[6,4],[18,4],[18,11]],false,g.r);
 return [...exteriorDetails(hull,[deck],g),...enclosedDetails(hull,[l(12,9,12,17.5)],g).slice(1),p('M3 21Q6 19 9 21T15 21T21 21')];
}
export function caravan({g,p,r,l,c}){
 const k=g.corner==='sharp'?0:g.corner==='soft'?.8:1.6;
 const shell=p('M5.25 18H4C3 18 2.5 17.5 2.5 16.5V10C2.5 6.5 5 4.5 8.5 4.5'+`H${20.5-k}`+(k?`Q20.5 4.5 20.5 ${4.5+k}`:'')+`V${18-k}`+(k?`Q20.5 18 ${20.5-k} 18`:'')+'H9.75');
 return [shell,r(12,8.5,4.5,5,g.r*.45),c(7.5,18,2.25),l(20.5,16,22,16)];
}
export function trafficLight({g,r,c,d,l,small}){
 return [r(6.5,2,11,20),...[6,12,18].map(y=>small?d(12,y,1):c(12,y,1.55)),...small?[]:[l(3.5,8,6.5,8),l(17.5,8,20.5,8),l(3.5,16,6.5,16),l(17.5,16,20.5,16)]];
}

export function anchor({g,p,l,c}){
 const k=g.tip,ring=c(12,5,2.5);
 const arms=p(`M6 14L${3.5+k} ${12+k*.8}`+(k?`Q3.5 12 3.5 ${12+k*1.5}`:'')+`C3.5 17 7.4 21 12 21C16.6 21 20.5 17 20.5 ${12+k*1.5}`+(k?`Q20.5 12 ${20.5-k} ${12+k*.8}`:'')+'L18 14');
 return [...exteriorDetails(ring,[l(12,7.5,12,21)],g),arms,l(8.5,11,15.5,11)];
}
export function luggage({g,r,o,l,small}){
 const shell=r(5,7,14,13),handle=o([[9,7],[9,2],[15,2],[15,7]],false,g.r);
 return [...exteriorDetails(shell,[handle,l(8,20,8,22),l(16,20,16,22)],g),...small?[]:[l(9,11,9,16),l(15,11,15,16)]];
}
export function tent({g,o,l}){
 const shell=o([[3,21],[12,5],[21,21]],true,g.tip);
 return [...exteriorDetails(shell,[l(12,5,10,2),l(12,5,14,2)],g),...enclosedDetails(shell,[o([[8,21],[12,14],[16,21]],false,g.tip)],g).slice(1)];
}
