import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';
export function cat({p,d,o,g}){
 const shell=p('M5 10C4.3 8.5 3.8 6 4 3.5C6 3.6 8 5 9 6C11 5.3 13 5.3 15 6C16 5 18 3.6 20 3.5C20.2 6 19.7 8.5 19 10C20.5 11.4 21 13.1 20.5 15C19.5 18.8 16.2 21 12 21C7.8 21 4.5 18.8 3.5 15C3 13.1 3.5 11.4 5 10Z');
 const nose=o([[10.8,16.2],[13.2,16.2],[12,17.7]],true,g.tip);
 return [shell,d(8.5,13.5,g.v(.7,.85,.95)),d(15.5,13.5,g.v(.7,.85,.95)),[nose[0],{...nose[1],fill:'currentColor',stroke:'none'}]];
}
export function dog({p,d,g}){
 const shell=p('M7 7C9 4 15 4 17 7C19 4 21 6 22 10C23 14 20 15 18 13C19 14.4 19.5 15.5 19 17C18 19.8 15.4 21 12 21C8.6 21 6 19.8 5 17C4.5 15.5 5 14.4 6 13C4 15 1 14 2 10C3 6 5 4 7 7Z');
 return [...enclosedDetails(shell,[p('M7 7C7 9 6.8 11 6 13M17 7C17 9 17.2 11 18 13')],g),d(9,13.5,g.v(.65,.8,.9)),d(15,13.5,g.v(.65,.8,.9)),d(12,16.5,g.v(.9,1.1,1.25))];
}
export function pawPrint({p,small}){
 const palm=p('M8 14C9.2 11 10.4 10 12 10C13.6 10 14.8 11 16 14C17.2 15.5 19 16.8 19 18.5C19 20.4 17 21.6 15.4 20.8L13.2 19.9Q12 19.4 10.8 19.9L8.6 20.8C7 21.6 5 20.4 5 18.5C5 16.8 6.8 15.5 8 14Z');
 const toes=[[3.8,10,1.6,2.3,-25],[8.3,4.8,1.7,2.4,-12],[15.7,4.8,1.7,2.4,12],[20.2,10,1.6,2.3,25]].map(([x,y,rx,ry,angle])=>{
  const a=angle*Math.PI/180,dx=rx*Math.cos(a),dy=rx*Math.sin(a);
  const toe=p(`M${x+dx} ${y+dy}A${rx} ${ry} ${angle} 1 0 ${x-dx} ${y-dy}A${rx} ${ry} ${angle} 1 0 ${x+dx} ${y+dy}Z`);
  return small?[toe[0],{...toe[1],fill:'currentColor',stroke:'none'}]:toe;
 });
 return [palm,...toes];
}
export function fish({g,p,o,d}){
 const body=p('M6 12C10 5.5 17.2 5.5 21.5 12C17.2 18.5 10 18.5 6 12Z');
 return [o([[6,12],[2.5,8],[2.5,16]],true,g.tip),...enclosedDetails(body,[p('M16 5C13 9 13 15 16 19')],g),d(18,11.5,g.v(.65,.8,.9))];
}
export function bird({g,p,l,d}){
 const beak=g.corner==='sharp'?19.7:20.5;
 const body=p(`M3 20L9 10C8.5 6.5 10.5 3.5 13.5 3.5C16 3.5 18 5.5 18 8L${beak} 9L18 10C18 17 14 20 8 20Z`);
 return [...enclosedDetails(body,[p('M3 20C8 20 12.5 15 13 11')],g),...exteriorDetails(body,[l(10,20,10,22),l(15,18.5,15,22)],g).slice(1),d(13.8,7.5,g.v(.65,.8,.9))];
}
export function snail({g,p,l}){
 const body='M15 14.5C16.8 14.5 16.65 10.3 18.5 9C19.25 8.47 20.3 8.4 21 9C21.8 9.7 21.65 11 21.4 12.3C20.6 17.7 18.8 21 14 21H3.5';
 return [p('M8.5 21C4.91 21 2 18.09 2 14.5C2 10.91 4.91 8 8.5 8C12.09 8 15 10.91 15 14.5C15 17 12.5 18 10.5 18C8 18 5.8 16.5 5.8 14.5C5.8 12.6 7.3 11.3 9 11.3C10.6 11.3 11.7 12.4 11.7 14'),
 p(body),...exteriorDetails(p(body+'Z'),[l(19,9.2,17.2,5.5),l(20.4,9.2,22,5.5)],g).slice(1)];
}
export function turtle({g,p,small}){
 const shell=p('M3 15A7 8 0 0 1 17 15Z');
 const details=small?[]:[p('M10 4V11L2 15M10 11L19 15')];
 const head=p('M14 10H19.5A2 2 0 0 1 19.5 14H14Z');
 const feet=[p('M4.5 14V17.5Q4.5 18.5 5.5 18.5H7Q8 18.5 8 17.5V14Z'),
 p('M12 14V17.5Q12 18.5 13 18.5H14.5Q15.5 18.5 15.5 17.5V14Z')];
 return [...enclosedDetails(shell,details,g),...exteriorDetails(shell,[head,...feet],g).slice(1)];
}
export function butterfly({g,p,l,small}){
 const wings=p('M12 12C12 9.5 7.5 4.5 4.4 4.5C1.8 4.5 1.9 7.1 3 11.3C3.6 13.6 5 14.3 6.3 14.3C5.6 14.9 5.25 15.9 5.25 16.875C5.25 18.74 6.76 20.25 8.625 20.25C10.49 20.25 12 18.74 12 16.875C12 18.74 13.51 20.25 15.375 20.25C17.24 20.25 18.75 18.74 18.75 16.875C18.75 15.9 18.4 14.9 17.7 14.3C19 14.3 20.4 13.6 21 11.3C22.1 7.1 22.2 4.5 19.6 4.5C16.5 4.5 12 9.5 12 12Z');
 const folds=small?[]:[p('M6.3 14.3C6.9 13.8 7.6 13.5 8.3 13.5M17.7 14.3C17.1 13.8 16.4 13.5 15.7 13.5')];
 return [...enclosedDetails(wings,folds,g),l(12,5.25,12,16.875)];
}
export function bee({g,p,l}){
 const body=p('M8 7C8 1.7 16 1.7 16 7V14C16 18 14.5 20.5 12 22C9.5 20.5 8 18 8 14Z');
 const wings=[p('M8 10C6.6 6.6 4.4 3.6 2.8 4.6C1 5.8 2 9.8 3.6 11.4C4.9 12.7 6.6 12.8 8 12Z'),p('M16 10C17.4 6.6 19.6 3.6 21.2 4.6C23 5.8 22 9.8 20.4 11.4C19.1 12.7 17.4 12.8 16 12Z')];
 return [...enclosedDetails(body,[l(8,10,16,10),l(8,15,16,15)],g),...exteriorDetails(body,[...wings,l(9,4,7.5,2),l(15,4,16.5,2)],g).slice(1)];
}
