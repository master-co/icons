import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';
// Structural roof/bonnet curves are separate from the corner preset.
// Wheel centers and chassis contacts share one construction in all masters.
export function car({g,p,l,c}){
 const k=g.corner==='sharp'?0:g.corner==='soft'?.55:1.1;
 const left=k?`H${2.5+k}Q2.5 17 2.5 ${17-k}`:'H2.5V17';
 const right=k?`V${17-k}Q21.5 17 ${21.5-k} 17`:'V17';
 const shell=p(`M4.5 17${left}V12.2C2.5 11.4 2.7 10.8 3.1 10.1L5 6.8C5.3 6.3 5.9 6 6.6 6H12.3C13.2 6 13.8 6.3 14.4 7L17.5 10.5L19.8 11.2C21 11.6 21.5 12.2 21.5 13.4${right}H19.5`);
 const solid=['path',{d:shell[1].d+'Z'}];
 const glass=enclosedDetails(solid,[l(2.5,10.5,17.5,10.5),l(10.5,6,10.5,10.5)],g).slice(1);
 return [shell,...glass,l(8.5,17,15.5,17),c(6.5,17,2),c(17.5,17,2)];
}
export function bus({g,p,l,c,small}){
 const k=g.corner==='sharp'?0:g.corner==='soft'?.6:1.2;
 const shell=p(`M4.5 17.5H${2.5+k}`+(k?`Q2.5 17.5 2.5 ${17.5-k}`:'')+`V${5+k}`+(k?`Q2.5 5 ${2.5+k} 5`:'H2.5')+`H17C20.1 5 21.5 8 21.5 12V${17.5-k}`+(k?`Q21.5 17.5 ${21.5-k} 17.5`:'')+'H19.5');
 const solid=['path',{d:shell[1].d+'Z'}];
 const details=[l(2.5,11,21.5,11),l(8,5,8,11),l(14,5,14,11)];
 return [shell,...enclosedDetails(solid,details,g).slice(1),l(8.5,17.5,15.5,17.5),c(6.5,17.5,2),c(17.5,17.5,2)];
}

export function train({g,p,l,d}){
 const shell=p('M5 9C5 5.4 7.8 3 12 3C16.2 3 19 5.4 19 9V13.5C19 16.8 16 19 12 19C8 19 5 16.8 5 13.5Z');
 const glass=enclosedDetails(shell,[l(5,10,19,10)],g);
 const rails=exteriorDetails(shell,[l(8,18,5.5,21.5),l(16,18,18.5,21.5)],g).slice(1);
 return [...glass,d(8.8,14.2),d(15.2,14.2),...rails];
}
export function tram({g,r,l,d}){
 const shell=r(5,7,14,12);
 return [...enclosedDetails(shell,[l(5,12,19,12)],g),d(8.8,15.5),d(15.2,15.5),...exteriorDetails(shell,[l(12,3,12,7),l(8,19,6,22),l(16,19,18,22)],g).slice(1),l(8.5,3,15.5,3)];
}

export function bicycle({p,l,c}){
 // An open frame preserves the two wheel cavities at 16px. The seat tube,
 // rear stay and steering fork remain actual connected structural members.
 return [c(5,16.5,3.5),c(19,16.5,3.5),
 p('M5 16.5L8.5 9L12.5 16.5'),butt(l(8.5,9,16,9)),
 p('M19 16.5L14.5 5.5H18'),butt(l(8.5,9,7,5.5)),l(5,5.5,8,5.5)];
}
const butt=node=>[node[0],{...node[1],'stroke-linecap':'butt'}];
export function motorcycle({p,l,c}){
 return [c(4.5,17,3),c(19.5,17,3),
 p('M2.5 8.5L8 10.5C10 11.2 10.4 8.5 14 8.5H16.667C15.3 10 14.8 11.7 14 13.7C13.2 15.7 12.8 17 11 17H4.5'),
 p('M19.5 17L15.5 5H12.5')];
}
export function scooter({g,p,l,c,o}){
 const rear=c(4.5,18,2.75),front=c(19.5,18,2.75);
 // Deck meets the rear tyre; no tiny separate horizontal gap at the join.
 const deck=o([[4.5,18],[12,18],[16.7,10]],false,g.tip);
 const tail=exteriorDetails(rear,[deck],g).slice(1);
 return [rear,front,...tail,o([[19.5,18],[14.6,4],[11,4]],false,g.tip)];
}

export function helicopter({g,p,l}){
 const cabin=p('M10 8H15C18.8 8 21 10.8 21 14C21 15.5 19.8 16.5 18 16.5H11C8.5 16.5 7 15.2 7 12.5C7 10 8.1 8 10 8Z');
 const links=[l(13,3,13,8),l(2.5,12,7,12),l(11,16.5,11,21),l(18,16.5,18,21)];
 return [...enclosedDetails(cabin,[p('M14 8V12.5H21')],g),
 ...exteriorDetails(cabin,links,g).slice(1),l(6,3,20,3),l(2.5,9,2.5,14),l(8,21,21,21)];
}
export function plane({g,o,p}){
 const body=o([[14,4],[14,8.5],[21,12.5],[21,15],[14,13],[14,18],[16,20],[16,21],[12,20],[8,21],[8,20],[10,18],[10,13],[3,15],[3,12.5],[10,8.5],[10,4]],false,g.tip);
 body[1].d+=p('C10 1 14 1 14 4Z')[1].d;
 return [body];
}
export function sailboat({g,o,l,p}){
 const sail=o([[11,2.5],[20,13],[3,13]],true,g.tip);
 const hull=p('M3 17H21C21 20.5 18.5 22 15.5 22H8.5C5.5 22 3 20.5 3 17Z');
 return [...enclosedDetails(sail,[l(11,2.5,11,13)],g),hull,l(11,13,11,17)];
}
