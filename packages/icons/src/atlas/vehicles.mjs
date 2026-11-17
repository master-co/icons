import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';
// Structural roof/bonnet curves are separate from the corner preset.
// Wheel centers and chassis contacts share one construction in all masters.
export function car({g,p,l,c}){
 const k=g.corner==='sharp'?0:g.corner==='soft'?.55:1.1;
 const left=k?`H${2.5+k}Q2.5 17 2.5 ${17-k}`:'H2.5V17';
 const right=k?`V${17-k}Q21.5 17 ${21.5-k} 17`:'V17';
 const shell=p(`M4.5 17${left}V12.2C2.5 11.4 2.7 10.8 3.1 10.1L5 6.8C5.3 6.3 5.9 6 6.6 6H12.3C13.2 6 13.8 6.3 14.4 7L16.9 9.82C17.23 10.19 17.48 10.43 17.95 10.58L19.8 11.2C21 11.6 21.5 12.2 21.5 13.4${right}H19.5`);
 const solid=['path',{d:shell[1].d+'Z'}];
 const glass=enclosedDetails(solid,[l(2.5,10.5,17.5,10.5),l(10.5,6,10.5,10.5)],g).slice(1);
 return [shell,...glass,l(8.5,17,15.5,17),c(6.5,17,2),c(17.5,17,2)];
}
export function bus({g,p,l,c,small}){
 const k=g.corner==='sharp'?0:g.corner==='soft'?.6:1.2;
 const shell=p(`M4.5 17.5H${2.5+k}`+(k?`Q2.5 17.5 2.5 ${17.5-k}`:'')+`V${5+k}`+(k?`Q2.5 5 ${2.5+k} 5`:'H2.5')+`H17C20.1 5 21.5 8 21.5 12V${17.5-k}`+(k?`Q21.5 17.5 ${21.5-k} 17.5`:'')+'H19.5');
 const solid=['path',{d:shell[1].d+'Z'}];
 // Two larger panes keep the small bus airy; three panes return at 20/24px.
 const details=[l(2.5,11,21.5,11),...(small?[l(12,5,12,11)]:[l(8,5,8,11),l(14,5,14,11)])];
 return [shell,...enclosedDetails(solid,details,g).slice(1),l(8.5,17.5,15.5,17.5),c(6.5,17.5,2),c(17.5,17.5,2)];
}

export function train({g,p,l,d}){
 // A broad crown and curved shoulders read as a carriage roof, rather than
 // a generic capsule; retain the tapered lower cab and the existing rails.
 const shell=p('M5 7C5 4.5 6.5 3 8.5 3H15.5C17.5 3 19 4.5 19 7V13.5C19 16.8 16 19 12 19C8 19 5 16.8 5 13.5Z');
 const glass=enclosedDetails(shell,[l(5,10,19,10)],g);
 const rails=exteriorDetails(shell,[l(8,18,5.5,21.5),l(16,18,18.5,21.5)],g).slice(1);
 return [...glass,d(8.8,14.2),d(15.2,14.2),...rails];
}
export function tram({g,r,l,d}){
 const shell=r(5,7,14,12);
 return [...enclosedDetails(shell,[l(5,12,19,12)],g),d(8.8,15.5),d(15.2,15.5),...exteriorDetails(shell,[l(12,3,12,7),l(8,19,6,22),l(16,19,18,22)],g).slice(1),l(8.5,3,15.5,3)];
}

export function bicycle({g,p,l,c}){
 // An open frame preserves the two wheel cavities at 16px. The seat tube,
 // rear stay and steering fork remain actual connected structural members.
 const radius=g.v(3.8,3.9,4),front=18.7,hubY=16;
 const junction=14.5+(front-14.5)*(9-5.5)/(hubY-5.5);
 return [c(5.3,hubY,radius),c(front,hubY,radius),
 p(`M5.3 ${hubY}L8.5 9L12.5 ${hubY}`),butt(l(8.5,9,junction,9)),
 // The bend belongs to the handlebar tubing, including the sharp preset.
 p(`M${front} ${hubY}L14.92 6.55Q14.5 5.5 15.6 5.5H17.25Q18.5 5.5 18.5 6.75`),
 butt(l(8.5,9,7,5.5)),l(5,5.5,8,5.5)];
}
const butt=node=>[node[0],{...node[1],'stroke-linecap':'butt'}];
export function motorcycle({p,l,c}){
 const front=19,junction=15.5+(front-15.5)*(8.5-5)/(17-5);
 return [c(5,17,3.5),c(front,17,3.5),
 butt(p(`M2.5 8.5L8 10.5C10 11.2 10.4 8.5 14 8.5H${junction}`)),
 butt(p(`M5 17H11C12.8 17 13.2 15.7 14 13.7C14.8 11.7 15.3 10 ${junction} 8.5`)),
 p(`M${front} 17L15.5 5H12.5`)];
}
export function scooter({g,p,l,c,o}){
 const rear=c(4.5,18,2.75),front=c(19.5,18,2.75);
 // Deck meets the rear tyre; no tiny separate horizontal gap at the join.
 const deck=butt(o([[4.5,18],[12,18],[16.7,10]],false,g.tip));
 const tail=exteriorDetails(rear,[deck],g).slice(1);
 return [rear,front,...tail,o([[19.5,18],[14.6,4],[11,4]],false,g.tip)];
}

export function helicopter({g,p,l}){
 const cabin=p('M11 8H14C18.5 8 21.5 10.5 21.5 13.5C21.5 15.2 20.1 16 18.2 16H11C8.5 16 7 14.8 7 12.5C7 10 8.3 8 11 8Z');
 const links=[l(13,4,13,8),l(2.5,12,7,12),l(11,16,11,20),l(18,16,18,20)];
 // The windshield turns with the cabin; this bend is structural even in sharp.
 return [...enclosedDetails(cabin,[p('M14 8V11.5Q14 12.5 15 12.5H21.5')],g),
 ...exteriorDetails(cabin,links,g).slice(1),l(6,4,20,4),l(2.5,9,2.5,14),l(8,20,21,20)];
}
export function plane({g,o,p}){
 const body=o([[13.8,4],[13.8,8.5],[21,13],[21,15],[13.8,13],[13.8,18],[16,20],[16,21],[12,20],[8,21],[8,20],[10.2,18],[10.2,13],[3,15],[3,13],[10.2,8.5],[10.2,4]],false,g.tip);
 body[1].d+=p('C10.2 1 13.8 1 13.8 4Z')[1].d;
 return [body];
}
export function sailboat({g,o,l,p}){
 const sail=o([[10,2.5],[21,13],[3,13]],true,g.tip);
 const hull=p('M3 17H21C21 20.5 18.5 22 15.5 22H8.5C5.5 22 3 20.5 3 17Z');
 return [...enclosedDetails(sail,[l(10,2.5,10,13)],g),hull,l(10,13,10,17)];
}
