import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';
export function cat({p,d,g}){
 const shell=p('M5 10C4.3 8.5 3.8 6 4 3.5C6 3.6 8 5 9 6C11 5.3 13 5.3 15 6C16 5 18 3.6 20 3.5C20.2 6 19.7 8.5 19 10C20.2 11.4 20.5 13.1 20 15C19.2 19.1 16.2 21 12 21C7.8 21 4.8 19.1 4 15C3.5 13.1 3.8 11.4 5 10Z');
 return [shell,d(8.5,13.5,g.v(.7,.85,.95)),d(15.5,13.5,g.v(.7,.85,.95)),d(12,17,g.v(.5,.65,.75))];
}
export function dog({p,d,g}){
 const shell=p('M7 7C9 4 15 4 17 7C19 4 21 6 22 10C23 14 20 15 18 13V16C18 19.5 15.8 21 12 21C8.2 21 6 19.5 6 16V13C4 15 1 14 2 10C3 6 5 4 7 7Z');
 return [...enclosedDetails(shell,[p('M7 7C7 9 6.8 11 6 13M17 7C17 9 17.2 11 18 13')],g),d(9,12,g.v(.65,.8,.9)),d(15,12,g.v(.65,.8,.9)),d(12,16.5,g.v(.9,1.1,1.25))];
}
export function pawPrint({p,c,small}){
 const palm=p('M8 14C9.2 11 10.4 10 12 10C13.6 10 14.8 11 16 14C17.2 15.5 19 16.8 19 18.5C19 20.4 17 21.6 15.4 20.8L13.2 19.9Q12 19.4 10.8 19.9L8.6 20.8C7 21.6 5 20.4 5 18.5C5 16.8 6.8 15.5 8 14Z');
 const toes=[[3.8,10,1.9],[8.3,4.8,2],[15.7,4.8,2],[20.2,10,1.9]].map(args=>{const n=c(...args);return small?[n[0],{...n[1],fill:'currentColor',stroke:'none'}]:n;});
 return [palm,...toes];
}
export function fish({g,p,o,d}){
 const body=p('M6 12C10 4 17.2 4 21.5 12C17.2 20 10 20 6 12Z');
 return [o([[6,12],[2.5,7.5],[2.5,16.5]],true,g.tip),...enclosedDetails(body,[p('M16 5C13 9 13 15 16 19')],g),d(18,11.5,g.v(.65,.8,.9))];
}
export function bird({g,p,l,d}){
 const body=p('M3 20L9 10C8.5 6.5 10.5 3.5 13.5 3.5C16 3.5 18 5.5 18 8L21 9.5L18 11C18 17 14 20 8 20Z');
 return [...enclosedDetails(body,[p('M3 20C8 20 12.5 15 13 11')],g),...exteriorDetails(body,[l(10,20,10,22),l(15,18.5,15,21.5)],g).slice(1),d(13.8,7.5,g.v(.65,.8,.9))];
}
export function snail({p,l}){
 return [p('M8.5 21C4.91 21 2 18.09 2 14.5C2 10.91 4.91 8 8.5 8C12.09 8 15 10.91 15 14.5C15 17 12.5 18 10.5 18C8 18 5.8 16.5 5.8 14.5C5.8 12.6 7.3 11.3 9 11.3C10.6 11.3 11.7 12.4 11.7 14'),
 p('M15 14.5H18.5V9C18.5 7 21.5 7 21.5 9V14C21.5 18.5 19 21 15 21H3.5'),
 l(18.8,8,17,4.5),l(21.2,8,22,4.5)];
}
export function turtle({g,p,l,c,small}){
 const shell=p('M3 16C3 2.5 17 2.5 17 16Z');
 const details=small?[]:[p('M10 4V11L2 15M10 11L19 15')];
 return [...enclosedDetails(shell,details,g),...exteriorDetails(shell,[c(19,11.5,3),l(6,16,6,20),l(14,16,14,20)],g).slice(1)];
}
export function butterfly({p,l}){
 return [p('M12 11C9 6 5 3 3.5 4C1.5 5.4 2.5 12 6.5 13C2.5 15 3.5 20 6.5 21C9 22 12 20 12 17C12 20 15 22 17.5 21C20.5 20 21.5 15 17.5 13C21.5 12 22.5 5.4 20.5 4C19 3 15 6 12 11Z'),l(12,5.5,12,20.5)];
}
export function bee({g,p,l}){
 const body=p('M8 7C8 1.7 16 1.7 16 7V14C16 18 14.5 20.5 12 22C9.5 20.5 8 18 8 14Z');
 const wings=[p('M8 9C5 4 2 7 2 10C2 13 5.5 13.5 8 12Z'),p('M16 9C19 4 22 7 22 10C22 13 18.5 13.5 16 12Z')];
 return [...enclosedDetails(body,[l(8,10,16,10),l(8,15,16,15)],g),...exteriorDetails(body,[...wings,l(9,4,7.5,2),l(15,4,16.5,2)],g).slice(1)];
}
