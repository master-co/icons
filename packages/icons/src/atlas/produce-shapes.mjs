import {exteriorDetails,enclosedDetails} from '../occlusion.mjs';

export function appleFruit({g,p}){
 const body=p('M12 7C9.5 4.7 5.9 4.7 3.8 7.2C1.2 10.3 4.1 18.7 7.3 20.8C9.1 22 10.5 20.6 12 20.6C13.5 20.6 14.9 22 16.7 20.8C19.9 18.7 22.8 10.3 20.2 7.2C18.1 4.7 14.5 4.7 12 7Z');
 return exteriorDetails(body,[p('M12 7C11.7 4.6 12.4 3 14.2 2')],g);
}
export function cherry({g,p,c}){
 const left=c(6.5,16.5,3.8),right=c(17.5,18,3.3);
 const leaf=p('M4.5 5.5C8 2.5 11.5 2.5 15 5.5C11.5 8.5 8 8.5 4.5 5.5Z');
 const stems=[p('M15 5.5C12 8.5 9 9.5 6.5 12.7'),p('M15 5.5C13.2 8 14.3 12.5 17.5 14.7')];
 return [left,right,leaf,...exteriorDetails(leaf,stems,g).slice(1).flatMap(n=>exteriorDetails(left,[n],g).slice(1)).flatMap(n=>exteriorDetails(right,[n],g).slice(1))];
}
export function grape({g,p,c}){
 const top=c(12,10.3,2.7);
 const berries=[c(12,19.7,2.5),c(9.4,15,2.7),c(14.6,15,2.7),c(6.8,10.3,2.7),c(17.2,10.3,2.7),top];
 const leaf=p('M12 7.6C7.5 8.1 5.7 5.8 6.2 2.6C10.2 2.3 12.7 4.4 12 7.6Z');
 let bunch=[];
 for(const berry of berries)bunch=exteriorDetails(berry,bunch,g);
 const stem=p('M12 7.6C12 4.2 13.4 2 15.5 2');
 return [...bunch,leaf,...exteriorDetails(top,[stem],g).slice(1).flatMap(n=>exteriorDetails(leaf,[n],g).slice(1))];
}

export function citrus({g,p,l,small}){
 const body=p('M1.5 7H22.5A10.5 10.5 0 0 1 1.5 7Z');
 const inner=p('M4.7 7H19.3A7.3 7.3 0 0 1 4.7 7Z');
 const radius=7.3;
 const dividers=small?[l(12,7,12-radius*.5,7+radius*.866025),l(12,7,12+radius*.5,7+radius*.866025)]:[l(12,7,12,7+radius),l(12,7,12-radius*.707107,7+radius*.707107),l(12,7,12+radius*.707107,7+radius*.707107)];
 const slices=enclosedDetails(inner,dividers,g);
 // Both arcs share the diameter, which is drawn only once.
 return [body,p('M4.7 7A7.3 7.3 0 0 0 19.3 7'),...slices.slice(1)];
}
export function banana({p}){
 return [p('M17 3H20V5.5C20 6.6 20.9 7.8 20.9 9.5C20.9 13.1 19.5 15.7 16.5 18C12.6 21.2 6.8 22.1 3.7 19.5C2.2 18.2 2.6 16.2 4.2 16.3C8.7 16.6 12.3 15.1 14.8 12C16.5 9.8 17 7.8 17 5.5Z')];
}
export function carrot({g,p,l,small}){
 const body=p('M3 21C4.5 14.5 7.3 8.7 10.2 6.2C12.6 4.1 18.6 9.2 16.8 12C14.2 15.6 8.5 19.2 3 21Z');
 const grooves=[l(7,10,10,12),...small?[]:[l(4.8,15,7,16.5)]];
 const greens=[p('M14.5 6.7C13.8 4.8 14.4 3 15.5 2'),p('M14.5 6.7C17 5.5 18.6 4 19.5 2.5'),p('M14.5 6.7C17.5 6 20 6.2 21.5 7.5')];
 return [...enclosedDetails(body,grooves,g),...exteriorDetails(body,greens,g).slice(1)];
}

export function corn({g,p,l,small}){
 const tip=g.corner==='sharp'?3.8:3;
 const body=p(`M12 22C6 22 6 14 ${tip} 11.5C5.3 11.5 7 12.5 8 14V7C8 1 16 1 16 7V14C17 12.5 18.7 11.5 ${24-tip} 11.5C18 14 18 22 12 22Z`);
 const rows=small?[l(8,8.5,16,8.5)]:[l(8,6.5,16,6.5),l(8,10.5,16,10.5)];
 const divisions=[p('M8 14C9.8 15.3 11.4 18.2 12 22C12.6 18.2 14.2 15.3 16 14'),...rows,l(12,2.5,12,15.5)];
 return enclosedDetails(body,divisions,g);
}
export function mushroom({g,p}){
 const cap=p('M12 2.5C17.1 2.5 21.25 6.4 21.5 11.9Q21.53 12.5 20.95 12.7C16.6 14.2 7.4 14.2 3.05 12.7Q2.47 12.5 2.5 11.9C2.75 6.4 6.9 2.5 12 2.5Z');
 return exteriorDetails(cap,[p('M9 13C9 16.6 8.8 18.9 8.2 20.3C8 20.8 8.2 21.1 8.7 21.25C10.8 21.9 13.2 21.9 15.3 21.25C15.8 21.1 16 20.8 15.8 20.3C15.2 18.9 15 16.6 15 13')],g);
}
export function egg({p}){
 return [p('M5 14C5 9 8 2.5 12 2.5C16 2.5 19 9 19 14C19 18.7 16 21.5 12 21.5C8 21.5 5 18.7 5 14Z')];
}
export function wheat({g,p,l}){
 // Lucide-derived paired grain construction; each pair shares one stalk node.
 const radius=g.tip*24/g.s,trim=radius/Math.SQRT2;
 const grain=(x,y,turn)=>{
  const at=(u,v)=>turn?`${x-v} ${y+u}`:`${x+u} ${y+v}`;
  const crown=radius?`M${at(-trim,-8+trim)}A${radius} ${radius} 0 0 1 ${at(trim,-8+trim)}`:`M${at(0,-8)}`;
  const root=radius?`L${at(trim,-trim)}A${radius} ${radius} 0 0 1 ${at(-trim,-trim)}`:`L${at(0,0)}`;
  return p(crown+`L${at(1.53,-6.47)}A3.5 3.5 0 0 1 ${at(1.53,-1.53)}`+root+`L${at(-1.53,-1.53)}A3.5 3.5 0 0 1 ${at(-1.53,-6.47)}Z`);
 };
 const grains=[[5,19],[9,15],[13,11]].flatMap(([x,y])=>[grain(x,y,false),grain(x,y,true)]);
 grains.push(p(radius?`M20 2H${22-radius}A${radius} ${radius} 0 0 1 22 ${2+radius}V4A4 4 0 0 1 18 8H${16+radius}A${radius} ${radius} 0 0 1 16 ${8-radius}V6A4 4 0 0 1 20 2Z`:'M20 2H22V4A4 4 0 0 1 18 8H16V6A4 4 0 0 1 20 2Z'));
 let stalk=[l(2,22,16,8)];
 for(const grain of grains)stalk=exteriorDetails(grain,stalk,g).slice(1);
 return [...grains,...stalk];
}
