import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';

export function utensils({g,p,l}){
 const knife=p('M20.5 2C17 2 15.5 7 15.5 12H20.5Z');
 return [p('M3.5 2V6.5C3.5 11 10.5 11 10.5 6.5V2'),l(7,2,7,22),...exteriorDetails(knife,[l(20.5,12,20.5,22)],g)];
}
const bowl=(p,top=11)=>p(`M2.5 ${top}H21.5C21 17 17.8 21 12 21C6.2 21 3 17 2.5 ${top}Z`);
export function soup({p}){
 const footedBowl=p('M2.5 11H21.5C21 14.5 19 18 17 19V20.5Q17 21.5 16 21.5H8Q7 21.5 7 20.5V19C5 18 3 14.5 2.5 11Z');
 return [footedBowl,p('M8 7C5.5 5 10.5 4 8 2'),p('M16 7C13.5 5 18.5 4 16 2')];
}
export function salad({g,p,l,small}){
 const base=bowl(p,12);
 const greens=p('M4 12C1 10 2 7 4 6C2.5 2.5 7 1.5 9 4C12.5 3 13 8 11 12');
 const tomato=p('M14 12A3.5 3.5 0 0 1 21 12');
 return [base,...exteriorDetails(base,[greens,tomato,...small?[]:[l(7,7,8.5,12)]],g).slice(1)];
}

export function sandwich({g,p,l,o}){
 const body=o([[3,11],[12,3],[21,11],[21,20],[3,20]],true,g.tip);
 return enclosedDetails(body,[l(3,11,21,11),p('M3 15.5H7L12 16.5L17 15.5H21')],g);
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

export function iceCream({g,p,o}){
 const scoop=p('M6.5 7C6.5 .5 17.5 .5 17.5 7C21 7 21 12 17.5 12H6.5C3 12 3 7 6.5 7Z');
 const cone=o([[7,12],[12,21.5],[17,12]],false,g.tip);
 return exteriorDetails(scoop,[cone],g);
}
export function cake({g,p,l,r}){
 const body=r(3,11,18,10,g.r);
 const icing=p('M3 15C6 11.8 9 18.2 12 15C15 11.8 18 18.2 21 15');
 const flame=p('M12 1.5C11 3 10.6 3.5 10.6 4.2C10.6 6 13.4 6 13.4 4.2C13.4 3.5 13 3 12 1.5Z');
 Object.assign(flame[1],{fill:'currentColor',stroke:'none'});
 return [...enclosedDetails(body,[icing],g),...exteriorDetails(body,[l(12,8,12,11)],g).slice(1),flame];
}
export function cookie({g,p,d,small}){
 const body=p('M12 2.5A9.5 9.5 0 1 0 21.5 12C18 12.5 16 10.5 16.5 7.5C13.5 8 11.5 6 12 2.5Z');
 return [body,d(7.5,9),d(8,16),d(15,16),...small?[]:[d(12,12,g.v(.6,.7,.8))]];
}
export function bread({g,p}){
 const r=g.r*24/g.s;
 return [p(`M6 3.5H18C23 3.5 23 10 19.5 10.5V${21-r}Q19.5 21 ${19.5-r} 21H${4.5+r}Q4.5 21 4.5 ${21-r}V10.5C1 10 1 3.5 6 3.5Z`)];
}
