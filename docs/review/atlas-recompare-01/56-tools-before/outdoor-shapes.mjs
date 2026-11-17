import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';

export function binoculars({g,p,l}){
 const dx=.5,dy=-12.5,d2=dx*dx+dy*dy,factor=4*Math.sqrt(d2-16)/d2;
 const tx=6+16*dx/d2+dy*factor,ty=17+16*dy/d2-dx*factor;
 const cx=6.5-(tx-6.5)*1.5/(ty-4.5);
 const left=p(`M10 17V4.5C10 2.5 ${cx} 3 6.5 4.5L${tx} ${ty}A4 4 0 1 0 10 17Z`);
 const right=p(`M14 17V4.5C14 2.5 ${24-cx} 3 17.5 4.5L${24-tx} ${ty}A4 4 0 1 1 14 17Z`);
 return [...enclosedDetails(left,[p(`M${tx} ${ty}A4 4 0 0 1 10 17`)],g),...enclosedDetails(right,[p(`M${24-tx} ${ty}A4 4 0 0 0 14 17`)],g),l(10,8,14,8)];
}
export function flashlight({g,p,l}){
 const t=g.tip*24/g.s;
 const top=t?`M${6+t} 2H${18-t}Q18 2 18 ${2+t}V7`:'M6 2H18V7';
 const bottom=t?`V${22-t}Q16 22 ${16-t} 22H${8+t}Q8 22 8 ${22-t}V12`:'V22H8V12';
 const end=t?`V${2+t}Q6 2 ${6+t} 2Z`:'V2Z';
 const body=p(top+'C18 9 16 10 16 12'+bottom+'C8 10 6 9 6 7'+end);
 return enclosedDetails(body,[l(6,6.5,18,6.5),l(12,13,12,15.5)],g);
}
export function axe({g,p,o}){
 const head=p('M15 15.5A.5 .5 0 0 0 15.5 16A6.5 6.5 0 0 0 22 9.5A.5 .5 0 0 0 21.5 9H19.828A2 2 0 0 1 18.414 8.414L13.352 3.352A1.205 1.205 0 0 0 11.648 3.352L9.352 5.648A1.205 1.205 0 0 0 9.352 7.352L14.414 12.414A2 2 0 0 1 15 13.828Z');
 return exteriorDetails(head,[o([[11,9],[14,12],[5,21],[2,18]],true,g.r*.7)],g);
}

const diagonal=([x,y])=>[12+(x-y)/Math.SQRT2,12+(x+y-24)/Math.SQRT2];
const rotatedPath=(p,commands)=>p(commands.map(([command,...numbers])=>command+Array.from({length:numbers.length/2},(_,i)=>diagonal(numbers.slice(i*2,i*2+2)).join(' ')).join(' ')).join(''));
export function shovel({g,p,l}){
 const grip=rotatedPath(p,[['M',9,2],['L',15,2],['L',15,3.5],['C',15,7.5,9,7.5,9,3.5],['Z']]);
 const blade=rotatedPath(p,[['M',7,14],['L',17,14],['L',17,17],['C',17,20,14,22,12,23],['C',10,22,7,20,7,17],['Z']]);
 const shaft=l(...diagonal([12,3.5]),...diagonal([12,17]));
 return exteriorDetails(blade,exteriorDetails(grip,[shaft],g),g);
}
export function pickaxe({g,o,p}){
 const head=o([[17.5,3],[21,6.5],[14,13.5],[10.5,10]],true,g.tip);
 const left=p('M16.5 3.5C13 1.5 8 1 4.5 2.5C4 3 4.5 4 5.5 4.5C8 5.5 10 6.5 12 8');
 const right=p('M20.5 7.5C22.5 11 23 16 21.5 19.5C21 20 20 19.5 19.5 18.5C18.5 16 17.5 14 16 12');
 return exteriorDetails(head,[left,right,o([[11,10],[14,13],[5,22],[2,19]],true,g.r*.7)],g);
}
export function fishingHook({g,c,l,p}){
 const eye=c(7,5.5,2.25);
 return exteriorDetails(eye,[l(7,1.5,7,5.5),p('M7 5.5V15C7 23 20 23 20 15V10L17 13')],g);
}

export function campfire({p,l}){
 return [p('M12 14.5C9.3 14.5 7.5 12.8 7.5 10.5C7.5 7 10.3 4 14 2C13.5 6.8 16.5 7.6 16.5 10.5C16.5 12.8 14.7 14.5 12 14.5Z'),l(4,17.5,20,22),l(20,17.5,4,22)];
}
export function footprints({g,p,l}){
 const left=p('M4 16V13.62C4 11.5 2.97 10.5 3 8C3.03 5.28 4.49 2 7.5 2C9.37 2 10 3.8 10 5.5C10 8.61 8 11.16 8 14.18V16A2 2 0 1 1 4 16Z');
 const right=p('M20 20V17.62C20 15.5 21.03 14.5 21 12C20.97 9.28 19.51 6 16.5 6C14.63 6 14 7.8 14 9.5C14 12.61 16 15.16 16 18.18V20A2 2 0 1 0 20 20Z');
 return [...enclosedDetails(left,[l(3,13,9,13)],g),...enclosedDetails(right,[l(15,17,21,17)],g)];
}
export function hiking({g,c,o,p,l}){
 const torso=o([[11,8.5],[9,14],[14,17],[14,22]],false,g.tip);if(g.corner==='sharp')torso[1]['stroke-linecap']='butt';
 const arm=p('M11 8.5C13 10 13.5 12 18 12V22');if(g.corner==='sharp')arm[1]['stroke-linecap']='butt';
 return [c(13,3.5,2),o([[4.5,7],[7.5,8.5],[5,14],[2,12.5]],true,g.tip),torso,l(9,14,5,22),arm];
}
export function kayak({g,p,l}){
 const hull=p('M21 3C10.5 6.5 6.5 10.5 3 21C13.5 17.5 17.5 13.5 21 3Z');
 const top=p('M7 5A2 2 0 1 0 5 7H6A1 1 0 0 0 7 6Z');
 const bottom=p('M18 17A1 1 0 0 0 17 18V19A2 2 0 1 0 19 17Z');
 return [hull,...exteriorDetails(bottom,exteriorDetails(top,[l(6,6,18,18)],g),g)];
}
