import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';

export function coffee({g,p,small}){
 const body=p('M3 9H17V16C17 22 3 22 3 16Z');
 const handle=p('M17 10H18.5C23 10 23 16 18.5 16H17');
 const steam=x=>p(`M${x} 5.5C${x-1.5} 4 ${x+1.5} 3.5 ${x} 2`);
 return [...exteriorDetails(body,[handle],g),...small?[steam(10)]:[steam(7.5),steam(12.5)]];
}
export function cupSoda({g,p,l,o}){
 const cup=o([[5,7],[7,21],[17,21],[19,7]],false,g.r);
 const closed=p('M5 7L7 21H17L19 7Z');
 const surface=p('M5.5 13C9 11 13.5 16 18.5 13');
 const straw=o([[12,7],[14,2],[18,2]],false,g.tip);
 return [cup,l(4,7,20,7),...enclosedDetails(closed,[surface],g).slice(1),...exteriorDetails(closed,[straw],g).slice(1)];
}
export function wine({g,p,l}){
 const bowl=p('M7 3H17L18.5 9C19.5 13 16.4 15.5 12 15.5C7.6 15.5 4.5 13 5.5 9Z');
 return [...enclosedDetails(bowl,[p('M5 9C9 7 15 11 19 9')],g),...exteriorDetails(bowl,[l(12,15.5,12,22)],g).slice(1),l(8,22,16,22)];
}

export function beer({g,p,l,r,o,small}){
 const foam=p('M4 8C1 7.5 1.5 3.5 4.5 3.5C6 1 9 2 10 3C11.5 1 14.5 1.5 15 3.5C19 2.5 20 7 17 8Z');
 const body=o([[4,8],[4,21],[17,21],[17,8]],false,g.r);
 const closed=r(4,8,13,13,g.r);
 const detail=small?[l(10.5,12,10.5,17.5)]:[l(8,12,8,17.5),l(13,12,13,17.5)];
 const handle=p('M17 10H19C23 10 23 17 19 17H17');
 return [...exteriorDetails(foam,[body],g),...enclosedDetails(closed,detail,g).slice(1),...exteriorDetails(closed,[handle],g).slice(1)];
}
export function milk({g,p,l,o,small}){
 const box=o([[5,8],[8,3],[15,3],[19,8],[19,22],[5,22]],true,g.tip);
 const folds=[l(5,8,19,8),l(8,3,14,8),l(14,8,14,22)];
 const front=p('M5 8H14V22H5Z');
 return [...enclosedDetails(box,folds,g),...small?[]:enclosedDetails(front,[p('M5 14C8 12 11 16 14 14')],g).slice(1)];
}
export function bottle({g,p,l}){
 const body=p('M9 3.5Q9 2.5 10 2.5H14Q15 2.5 15 3.5V6.5C15 8.7 18 10.5 18 12V20C18 21.5 17.5 22 16 22H8C6.5 22 6 21.5 6 20V12C6 10.5 9 8.7 9 6.5Z');
 return enclosedDetails(body,[l(9,6.5,15,6.5),p('M6 14C10 11.5 14 16.5 18 14')],g);
}

export function teapot({g,p,l,d}){
 const body=p('M8 8C6.5 9 6 10.5 6 12L2 9.5L2.5 13L6 17C6.5 20 8.5 21.5 12 21.5C17 21.5 19 19 19 15C19 11.5 17.5 9 16 8Z');
 const handle=p('M18 10C24 8 24 18 18 18');
 return [...exteriorDetails(body,[handle,l(12,5.5,12,8)],g),d(12,5.5,g.v(.75,.85,1))];
}
export function kettle({g,p}){
 const body=p('M7 10H16L20 8.5L22 11.5L19 14C20 16 20.5 18 20.5 20Q20.5 22 18.5 22H5.5Q3.5 22 3.5 20C3.5 15.5 4.5 12 7 10Z');
 return exteriorDetails(body,[p('M7 10V6C7 1.5 16 1.5 16 6V10')],g);
}
export function glassWater({g,p}){
 const body=p('M4 4C4 1.3 20 1.3 20 4L18 20C17.8 22 6.2 22 6 20Z');
 return enclosedDetails(body,[p('M4 4C4 6.7 20 6.7 20 4'),p('M4.8 12C9 10 15 14 19.2 12')],g);
}
export function cookingPot({g,p,l,o,r}){
 const body=o([[5,8],[5,21],[19,21],[19,8]],false,g.r),closed=r(5,8,14,13,g.r);
 const handles=[p('M5 13C3.5 13 2 12 2 11'),p('M19 13C20.5 13 22 12 22 11')];
 return [body,l(5,8,19,8),o([[9,8],[9,3.5],[15,3.5],[15,8]],false,g.tip),...exteriorDetails(closed,handles,g).slice(1)];
}
