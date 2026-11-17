import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';

export function shirt({g,p}){
 const t=g.tip*24/g.s;
 const hem=t?`V${21-t}Q18 21 ${18-t} 21H${6+t}Q6 21 6 ${21-t}V11`:'V21H6V11';
 return [p('M8 3C8 7 16 7 16 3L21 5L22 10L18 11'+hem+'L2 10L3 5Z')];
}
export function trousers({g,o,l,p}){
 const body=o([[6,3],[18,3],[20,22],[14,22],[12,11],[10,22],[4,22]],true,g.tip);
 const pockets=[p('M9 6.5C9 9 7.5 10.5 5 10.5M15 6.5C15 9 16.5 10.5 19 10.5')];
 return enclosedDetails(body,[l(5,6.5,19,6.5),...pockets],g);
}
export function dress({g,p,l}){
 const body=p('M8 5C10 8 14 8 16 5L18 9L15 12L20.5 22Q12 23 3.5 22L9 12L6 9Z');
 return [...enclosedDetails(body,[l(9,12,15,12)],g),...exteriorDetails(body,[l(8,2,8,5),l(16,2,16,5)],g).slice(1)];
}

export function coat({g,o,l}){
 const body=o([[8,3],[16,3],[20,6],[22,16],[18,17],[18,22],[6,22],[6,17],[2,16],[4,6]],true,g.tip);
 const seam=l(12,8,12,22);seam[1]['stroke-linecap']='butt';
 return enclosedDetails(body,[o([[8,3],[12,8],[16,3]],false,g.tip),seam,l(6,9,6,17),l(18,9,18,17)],g);
}
export function sock({g,p,l,small}){
 const body=p('M6 2H14V10L20 16C24 20 18 25 14 21L7 14Q6 13 6 11Z');
 return enclosedDetails(body,[l(6,6,14,6),...small?[]:[p('M6 10C10 10 12 13.5 9.5 16.5')]],g);
}
export function shoe({g,p,l,small}){
 const rr=g.tip*24/g.s;
 const sole=rr?`V${21-rr}Q21.5 21 ${21.5-rr} 21H${2.5+rr}Q2.5 21 2.5 ${21-rr}Z`:'V21H2.5Z';
 const body=p('M2.5 7H8C9 11 13 12.5 18 13.5C21 14 21.5 15.5 21.5 18'+sole);
 return enclosedDetails(body,[l(2.5,18,21.5,18),l(8,12,11,9),...small?[]:[l(12,14,15,11)]],g);
}

export function glasses({g,c,p}){
 const left=c(6,15,4),right=c(18,15,4);
 const bridge=exteriorDetails(left,[p('M10 15C10 12 14 12 14 15')],g).slice(1);
 return [...exteriorDetails(left,[p('M2 14L4 5Q4.5 4 6 4')],g),...exteriorDetails(right,[p('M22 14L20 5Q19.5 4 18 4')],g),...exteriorDetails(right,bridge,g).slice(1)];
}
export function sunglasses({g,p,l,o}){
 const left=p('M2 12H10V16C10 21 2 21 2 16Z'),right=p('M14 12H22V16C22 21 14 21 14 16Z');
 const temple=points=>{const node=o(points,false,g.tip);if(g.corner==='sharp')node[1]['stroke-linecap']='butt';return node};
 return [...enclosedDetails(left,[l(2,12,10,20)],g),...enclosedDetails(right,[l(14,12,22,20)],g),l(10,12,14,12),...exteriorDetails(left,[temple([[2,12],[4,4],[6,4]])],g).slice(1),...exteriorDetails(right,[temple([[22,12],[20,4],[18,4]])],g).slice(1)];
}

export function watch({g,c,p,o}){
 const face=c(12,12,6.5),top=o([[8,6.5],[8,2],[16,2],[16,6.5]],false,g.tip),bottom=o([[8,17.5],[8,22],[16,22],[16,17.5]],false,g.tip);
 return [...exteriorDetails(face,[top,bottom],g),p(`M12 ${g.v(9,8.5,8.5)}V12L14.5 13.5`)];
}
export function umbrella({g,p,l}){
 const canopy=p('M2 12A10 9 0 0 1 22 12Z');
 const ribs=[p('M12 3C9 6 8 9 8 12'),p('M12 3C15 6 16 9 16 12')];
 const shaft=p('M12 12V19.5C12 23.5 17 23.5 17 19.5');
 return [...enclosedDetails(canopy,ribs,g),...exteriorDetails(canopy,[l(12,1.5,12,3),shaft],g).slice(1)];
}
