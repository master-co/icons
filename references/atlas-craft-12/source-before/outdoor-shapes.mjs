import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';

export function binoculars({g,c,p,l}){
 const left=c(6,17,4),right=c(18,17,4);
 return [...exteriorDetails(left,[p('M3 17L4 6Q4 4 6 4H7.5Q9.5 4 9.5 6V17')],g),...exteriorDetails(right,[p('M21 17L20 6Q20 4 18 4H16.5Q14.5 4 14.5 6V17')],g),l(9.5,10,14.5,10)];
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
 const head=o([[17.5,2.5],[21.5,6.5],[14,14],[10,10]],true,g.tip);
 const left=p('M16.5 3.5C13 1.5 8 1 4.5 2.5C4 3 4.5 4 5.5 4.5C8 5.5 10 6.5 12 8');
 const right=p('M20.5 7.5C22.5 11 23 16 21.5 19.5C21 20 20 19.5 19.5 18.5C18.5 16 17.5 14 16 12');
 return exteriorDetails(head,[left,right,o([[11,10],[14,13],[5,22],[2,19]],true,g.r*.7)],g);
}
export function fishingHook({g,c,l,p}){
 const eye=c(7,5.5,2.25);
 return exteriorDetails(eye,[l(7,1.5,7,5.5),p('M7 5.5V15C7 23 20 23 20 15V10L17 13')],g);
}
