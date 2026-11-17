import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';

export function coffee({g,p,small}){
 const radius=g.tip*24/g.s;
 const body=p(radius?`M${3+radius} 9.5H${17-radius}Q17 9.5 17 ${9.5+radius}V16.5A4 4 0 0 1 13 20.5H7A4 4 0 0 1 3 16.5V${9.5+radius}Q3 9.5 ${3+radius} 9.5Z`:'M3 9.5H17V16.5A4 4 0 0 1 13 20.5H7A4 4 0 0 1 3 16.5Z');
 const handle=p('M17 10.5H18.5C23 10.5 23 16.5 18.5 16.5H17');
 const steam=x=>p(`M${x} 6C${x-1.2} 4.6 ${x+1.2} 3.2 ${x} 1.5`);
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
 const radius=g.tip*24/g.s;
 const bowl=p(radius?`M${7.75+radius} 3H${16.25-radius}Q16.25 3 ${16.25+radius*.24} ${3+radius}L18 9.25C18.8 12.5 15.9 15 12 15C8.1 15 5.2 12.5 6 9.25L${7.75-radius*.24} ${3+radius}Q7.75 3 ${7.75+radius} 3Z`:'M7.75 3H16.25L18 9.25C18.8 12.5 15.9 15 12 15C8.1 15 5.2 12.5 6 9.25Z');
 return [...enclosedDetails(bowl,[p('M5.5 9C9 7.5 15 10.5 18.5 9')],g),...exteriorDetails(bowl,[l(12,15,12,22)],g).slice(1),l(8,22,16,22)];
}

export function beer({g,p,l,r,o,small}){
 const foam=p('M5 8C1.8 8 1.8 3.5 5 3.5C5.8 3.5 6.4 3.8 7 3.8C8.5 1 13.5 1 15 3.8C15.6 3.8 16.2 3.5 17 3.5C20.2 3.5 20.2 8 17 8C15.8 8 15.2 7.5 14 7.5C12.8 7.5 12.5 8 11 8C9.5 8 9.2 7.5 8 7.5C6.8 7.5 6.2 8 5 8Z');
 const body=o([[5,8],[5,21],[17,21],[17,8]],false,g.r);
 const closed=r(5,8,12,13,g.r);
 const detail=small?[l(11,12,11,17.5)]:[l(8.5,12,8.5,17.5),l(13.5,12,13.5,17.5)];
 const handle=p('M17 10H19C23 10 23 17 19 17H17');
 return [...exteriorDetails(foam,[body],g),...enclosedDetails(closed,detail,g).slice(1),...exteriorDetails(closed,[handle],g).slice(1)];
}
export function milk({g,p,l,o,small}){
 const box=o([[4,9.5],[7,5.5],[7,2],[16,2],[16,5.5],[20,9.5],[20,22],[4,22]],true,g.tip);
 const folds=[l(7,5.5,16,5.5),l(7,5.5,10,9.5),l(10,9.5,20,9.5),l(10,9.5,10,22)];
 const front=p('M10 9.5H20V22H10Z');
 return [...enclosedDetails(box,folds,g),...small?[]:enclosedDetails(front,[p('M10 15C13 13 17 17 20 15')],g).slice(1)];
}
export function bottle({g,p,l}){
 const body=p('M9.5 3.5Q9.5 2.5 10.5 2.5H13.5Q14.5 2.5 14.5 3.5V6C14.5 8.6 17.75 9.2 17.75 13V20A2 2 0 0 1 15.75 22H8.25A2 2 0 0 1 6.25 20V13C6.25 9.2 9.5 8.6 9.5 6Z');
 return enclosedDetails(body,[l(9.5,6,14.5,6),p('M6.25 14.5C10 12 14 17 17.75 14.5')],g);
}

export function teapot({g,p,l,d}){
 const body=p('M8 8.5C6.8 9.4 6.3 10.6 6 12C4.2 11.8 3.8 10 2 9.5C2 13 3.8 15.7 6 16.5C6.7 20 8.5 21.5 12 21.5C16.7 21.5 19 19 19 15C19 12.2 17.8 9.9 16 8.5Z');
 const handle=p('M18 10C23.8 8.8 23.8 18.7 18 18.5');
 const lid=p('M8 8.5C8.5 6.1 10.1 5.5 12 5.5C13.9 5.5 15.5 6.1 16 8.5Z');
 return [...exteriorDetails(body,[handle],g),...exteriorDetails(body,[lid],g).slice(1),...exteriorDetails(lid,[l(12,3.3,12,5.5)],g).slice(1),d(12,3.3,g.v(.75,.85,1))];
}
export function kettle({g,p}){
 const radius=g.tip*24/g.s;
 const spout=radius?`L${20-radius} ${9.5+radius}Q20 9.5 ${20+radius} ${9.5+radius}L${22-radius} ${11.5-radius}Q22 11.5 ${22-radius} ${11.5+radius}L19.4 14.1`:'L20 9.5L22 11.5L19.4 14.1';
 const body=p(`M4 20V19C4 13.3 6.5 9 11.5 9C14 9 15.2 9.8 16.5 10.5Q17.6 11.1 18.5 10.6${spout}C20.1 15.8 20.5 17.3 20.5 19V20Q20.5 21.5 19 21.5H5.5Q4 21.5 4 20Z`);
 return exteriorDetails(body,[p('M6.5 12V7C6.5 1.5 16.5 1.5 16.5 7V12')],g);
}
export function glassWater({g,p}){
 const body=p('M4 4C4 1.3 20 1.3 20 4L18 20C17.8 22 6.2 22 6 20Z');
 return enclosedDetails(body,[p('M4 4C4 6.7 20 6.7 20 4'),p('M4.8 12C7.2 14.4 16.8 14.4 19.2 12')],g);
}
export function cookingPot({g,p,l,o,r}){
 const body=o([[4,11.5],[4,21],[20,21],[20,11.5]],false,g.r);
 const lid=p('M4 8L20 5V10H4Z');
 const handle=o([[9,7.0625],[8.4375,4.0625],[13.9375,3.03125],[14.5,6.03125]],false,g.r);
 return [body,l(2,11.5,22,11.5),l(4,8,20,5),...exteriorDetails(lid,[handle],g).slice(1)];
}
