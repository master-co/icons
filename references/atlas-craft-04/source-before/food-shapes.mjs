import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';

export function utensils({g,p,l}){
 const knife=p('M20.5 2C17 2 15.5 7 15.5 12H20.5Z');
 return [p('M3.5 2V6.5C3.5 11 10.5 11 10.5 6.5V2'),l(7,2,7,22),...exteriorDetails(knife,[l(20.5,12,20.5,22)],g)];
}
const bowl=(p,top=11)=>p(`M2.5 ${top}H21.5C21 17 17.8 21 12 21C6.2 21 3 17 2.5 ${top}Z`);
export function soup({p}){
 return [bowl(p),p('M8 7C5.5 5 10.5 4 8 2'),p('M16 7C13.5 5 18.5 4 16 2')];
}
export function salad({g,p,l,small}){
 const base=bowl(p,12);
 const greens=p('M4 12C1 10 2 7 4 6C2.5 2.5 7 1.5 9 4C12.5 3 13 8 11 12');
 const tomato=p('M14 12A3.5 3.5 0 0 1 21 12');
 return [base,...exteriorDetails(base,[greens,tomato,...small?[]:[l(7,7,8.5,12)]],g).slice(1)];
}

export function sandwich({g,p,l,o}){
 const body=o([[3,10],[12,3],[21,10],[21,22],[3,22]],true,g.tip);
 return enclosedDetails(body,[l(3,10,21,10),p('M3 15C6 13.8 9 16.2 12 15C15 13.8 18 16.2 21 15')],g);
}
export function pizza({g,p,d}){
 const tip=g.tip*24/g.s;
 const start=tip?`M${12-tip} ${2.5+tip*2}Q12 2.5 ${12+tip} ${2.5+tip*2}`:'M12 2.5';
 const body=p(start+'L21.5 20.5Q12 23 2.5 20.5Z');
 return [...enclosedDetails(body,[p('M4.5 16.5Q12 19 19.5 16.5')],g),d(12,9.5,g.v(.8,.9,1)),d(9,14.5,g.v(.6,.7,.8)),d(15,14.5,g.v(.6,.7,.8))];
}
export function burger({g,p,d,small}){
 return [p('M3 9C3 1.5 21 1.5 21 9Z'),p('M2.5 14C6 12.8 9 15.2 12 14C15 12.8 18 15.2 21.5 14'),p('M3 18H21C21 23 3 23 3 18Z'),...small?[]:[d(9,6,g.v(.5,.6,.65)),d(15,6,g.v(.5,.6,.65))]];
}
