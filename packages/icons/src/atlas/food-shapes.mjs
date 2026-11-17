import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';

export function utensils({g,p,l}){
 const knife=p('M20.5 2C17.5 2 15.5 4.6 15.5 7.5V13Q15.5 14.5 17 14.5H20.5Z');
 return [p('M3.5 2V6.5C3.5 11 10.5 11 10.5 6.5V2'),l(7,2,7,22),...exteriorDetails(knife,[l(20.5,14.5,20.5,22)],g)];
}
const bowl=(g,p,top=11)=>{
 const radius=g.tip*24/g.s;
 const start=radius?`M${2.5+radius} ${top}H${21.5-radius}Q21.5 ${top} ${21.5-radius*.2} ${top+radius}`:`M2.5 ${top}H21.5`;
 const end=radius?`C6.8 21 3.3 17.5 ${2.5+radius*.2} ${top+radius}Q2.5 ${top} ${2.5+radius} ${top}Z`:`C6.8 21 3.3 17.5 2.5 ${top}Z`;
 return p(start+'C20.7 17.5 17.2 21 14 21H10'+end);
};
export function soup({g,p}){
 const radius=g.tip*24/g.s;
 const top=radius?`M${2.5+radius} 11H${21.5-radius}Q21.5 11 ${21.5-radius*.2} ${11+radius}`:'M2.5 11H21.5';
 const end=radius?`C4.9 17.1 3.1 14.5 ${2.5+radius*.2} ${11+radius}Q2.5 11 ${2.5+radius} 11Z`:'C4.9 17.1 3.1 14.5 2.5 11Z';
 const footedBowl=p(top+'C20.9 14.5 19.1 17.1 17.5 18.3Q17 18.7 17 19.3V20.5Q17 21.5 16 21.5H8Q7 21.5 7 20.5V19.3Q7 18.7 6.5 18.3'+end);
 const steam=x=>p(`M${x} 7C${x-1.2} 5.3 ${x+1.2} 3.4 ${x} 1.7`);
 return [footedBowl,steam(8),steam(16)];
}
export function salad({g,p,l,small}){
 const base=bowl(g,p,12);
 const greens=p('M4 12C1 11 1.5 7.8 4 7.3C2.7 4.7 5.2 2.8 7.3 4C7.8 1.5 11.4 1.9 11.8 4.5C14.2 5.1 13.9 8 11.8 9.1C12.2 10.3 12 11.3 11 12');
 const tomato=p('M14 12A3.5 3.5 0 0 1 21 12');
 return [base,...exteriorDetails(base,[greens,tomato,...small?[]:[l(7,12,9.5,6.5)]],g).slice(1)];
}

export function sandwich({g,p,l,o}){
 const bread=o([[2.5,10.5],[12,3.5],[21.5,10.5],[21.5,14.5],[2.5,14.5]],true,g.tip);
 const cheese=p('M6.5 14.5L12.8 19.8C13.6 20.5 14.7 20.4 15.3 19.6L19 14.5Z');
 const lower=o([[2.5,14.5],[2.5,20],[21.5,20],[21.5,14.5]],false,g.r);
 const fold=p('M6.5 14.5L12.8 19.8C13.6 20.5 14.7 20.4 15.3 19.6L19 14.5');
 return [...enclosedDetails(bread,[l(2.5,10.5,21.5,10.5)],g),...exteriorDetails(cheese,[lower],g).slice(1),...exteriorDetails(bread,[fold],g).slice(1)];
}
export function pizza({g,p,d}){
 const tip=g.tip*24/g.s;
 const start=tip?`M${12-tip} ${2.5+tip*2}Q12 2.5 ${12+tip} ${2.5+tip*2}`:'M12 2.5';
 const crust=tip?`L${21.5-tip*.5} ${20.5-tip}Q21.5 20.5 ${21.5-tip} ${20.5+tip*.23}Q12 23 ${2.5+tip} ${20.5+tip*.23}Q2.5 20.5 ${2.5+tip*.5} ${20.5-tip}Z`:'L21.5 20.5Q12 23 2.5 20.5Z';
 const body=p(start+crust);
 return [...enclosedDetails(body,[p('M4.5 16.5Q12 19 19.5 16.5')],g),d(13,10.5,g.v(.8,.9,1)),d(10,14.3,g.v(.8,.9,1))];
}
export function burger({g,p,d,small}){
 const radius=g.tip*24/g.s;
 const top=p(radius?`M${3+radius} 9.5H${21-radius}Q21 9.5 21 ${9.5-radius}C21 1.5 3 1.5 3 ${9.5-radius}Q3 9.5 ${3+radius} 9.5Z`:'M3 9.5C3 1.5 21 1.5 21 9.5Z');
 const bottom=p(radius?`M${3+radius} 16.5H${21-radius}Q21 16.5 21 ${16.5+radius}C21 19 19 20.5 16 20.5H8C5 20.5 3 19 3 ${16.5+radius}Q3 16.5 ${3+radius} 16.5Z`:'M3 16.5H21C21 19 19 20.5 16 20.5H8C5 20.5 3 19 3 16.5Z');
 return [top,p('M2.5 13C6 11.8 9 14.2 12 13C15 11.8 18 14.2 21.5 13'),bottom,...small?[]:[d(9,6.5,g.v(.5,.6,.65)),d(15,6.5,g.v(.5,.6,.65))]];
}

export function iceCream({g,p,o}){
 const scoop=p('M7 7C7 .4 17 .4 17 7C19.7 7 19.7 11 17 11H7C4.3 11 4.3 7 7 7Z');
 const cone=o([[7,11],[12,g.corner==='sharp'?21.5:22],[17,11]],false,g.tip);
 return exteriorDetails(scoop,[cone],g);
}
export function cake({g,p,l,r}){
 const body=r(3,11,18,10,g.r);
 const icing=p('M3 14.5C5.25 14.5 5.25 16.5 7.5 16.5S9.75 14.5 12 14.5S14.25 16.5 16.5 16.5S18.75 14.5 21 14.5');
 const flame=p('M12 1.5C11 3 10.6 3.5 10.6 4.2C10.6 6 13.4 6 13.4 4.2C13.4 3.5 13 3 12 1.5Z');
 Object.assign(flame[1],{fill:'currentColor',stroke:'none'});
 return [...enclosedDetails(body,[icing],g),...exteriorDetails(body,[l(12,8,12,11)],g).slice(1),flame];
}
export function cookie({g,p,d,small}){
 const body=p('M12 2.5A9.5 9.5 0 1 0 21.5 12C18 12.5 16 10.5 16.5 7.5C13.5 8 11.5 6 12 2.5Z');
 return [body,d(8.5,8.5),d(7,14.5),d(14.8,16.5),...small?[]:[d(11.5,12,g.v(.6,.7,.8))]];
}
export function bread({g,p}){
 const r=g.r*24/g.s;
 return [p(`M6 3.5H18C23 3.5 23 10 19.5 10.5V${21-r}Q19.5 21 ${19.5-r} 21H${4.5+r}Q4.5 21 4.5 ${21-r}V10.5C1 10 1 3.5 6 3.5Z`)];
}
