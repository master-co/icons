import {exteriorDetails,enclosedDetails} from '../occlusion.mjs';

export function appleFruit({g,p}){
 const body=p('M12 7C9.5 4.7 5.9 4.7 3.8 7.2C1.2 10.3 4.1 18.7 7.3 20.8C9.1 22 10.5 20.6 12 20.6C13.5 20.6 14.9 22 16.7 20.8C19.9 18.7 22.8 10.3 20.2 7.2C18.1 4.7 14.5 4.7 12 7Z');
 return exteriorDetails(body,[p('M12 7C11.7 4.6 12.4 3 14.2 2')],g);
}
export function cherry({g,p,c}){
 const left=c(6.5,17,3.8),right=c(17.5,17,3.8);
 const stems=[p('M6.5 13.2C9.8 11 12.5 7 13 3'),p('M13 3C13.1 7.5 14.7 10.7 17.5 13.2')];
 return [left,right,...exteriorDetails(left,stems,g).slice(1).flatMap(n=>exteriorDetails(right,[n],g).slice(1))];
}
export function grape({g,p,c}){
 const top=c(12,8,2.35);
 return [c(4.5,8,2.35),top,c(19.5,8,2.35),c(8.25,14.5,2.35),c(15.75,14.5,2.35),c(12,20.5,2.1),...exteriorDetails(top,[p('M12 5.65C12 3.5 13.5 2 16 2')],g).slice(1)];
}

export function citrus({g,p,l,small}){
 const body=p('M2.5 7H21.5A9.5 9.5 0 0 1 2.5 7Z');
 const inner=small?body:p('M5.7 7H18.3A6.3 6.3 0 0 1 5.7 7Z');
 const radius=small?9.5:6.3;
 const dividers=[l(12,7,12,7+radius),l(12,7,12-radius*.707107,7+radius*.707107),l(12,7,12+radius*.707107,7+radius*.707107)];
 const slices=enclosedDetails(inner,dividers,g);
 // Both arcs share the diameter, which is drawn only once.
 return small?slices:[body,p('M5.7 7A6.3 6.3 0 0 0 18.3 7'),...slices.slice(1)];
}
export function banana({p}){
 return [p('M17 3H20C21.5 9 20.5 14.2 16.5 17.8C12.8 21.2 6.8 22.1 3.7 19.5C2.2 18.2 2.6 16.2 4.2 16.3C8.7 16.6 12.3 15.1 14.8 12C17.1 9.1 17.8 6 17 3Z')];
}
export function carrot({g,p,l,small}){
 const body=p('M3 21C4.5 14.5 7.3 8.7 10.2 6.2C12.6 4.1 18.6 9.2 16.8 12C14.2 15.6 8.5 19.2 3 21Z');
 const grooves=[l(7,10,10,12),...small?[]:[l(4.8,15,7,16.5)]];
 const greens=[p('M14.5 6.7C13.8 4.8 14.4 3 15.5 2'),p('M14.5 6.7C17 5.5 18.6 4 19.5 2.5'),p('M14.5 6.7C17.5 6 20 6.2 21.5 7.5')];
 return [...enclosedDetails(body,grooves,g),...exteriorDetails(body,greens,g).slice(1)];
}

export function corn({g,p,l,small}){
 const body=p('M12 22C6 21 3 17 3 10C5 10.4 6.7 11.5 8 13V7C8 1 16 1 16 7V13C17.3 11.5 19 10.4 21 10C21 17 18 21 12 22Z');
 const divisions=[p('M8 13C10 15 11.5 19 12 22C12.5 19 14 15 16 13'),l(8,6.5,16,6.5),l(8,10.5,16,10.5),...small?[]:[l(12,2.5,12,14.5)]];
 return enclosedDetails(body,divisions,g);
}
export function mushroom({g,p}){
 const cap=p('M2.5 13C2.5 6.5 6.8 2.5 12 2.5C17.2 2.5 21.5 6.5 21.5 13Z');
 return exteriorDetails(cap,[p('M9 13V19C9 22.8 15 22.8 15 19V13')],g);
}
export function egg({p}){
 return [p('M5 14C5 9 8 2.5 12 2.5C16 2.5 19 9 19 14C19 18.7 16 21.5 12 21.5C8 21.5 5 18.7 5 14Z')];
}
export function wheat({g,p,l}){
 const grain=p('M12 2C16.5 5.5 16 8 12 10C8 8 7.5 5.5 12 2Z');
 const left=p('M12 17C6 17 3.5 13 3.5 8.5C9 8.5 12 11.5 12 17Z');
 const right=p('M12 17C18 17 20.5 13 20.5 8.5C15 8.5 12 11.5 12 17Z');
 return [grain,left,right,...exteriorDetails(grain,[l(12,10,12,22)],g).slice(1)];
}
