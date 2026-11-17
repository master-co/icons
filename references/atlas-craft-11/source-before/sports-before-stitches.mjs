import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';
const diagonal=([x,y])=>[12+(x-y)/Math.SQRT2,12+(x+y-24)/Math.SQRT2];

export function dumbbell({g,o,l}){
 const top=o([[7,4],[17,4],[17,8],[7,8]].map(diagonal),true,g.tip);
 const bottom=o([[7,16],[17,16],[17,20],[7,20]].map(diagonal),true,g.tip);
 const axle=l(...diagonal([12,2]),...diagonal([12,22]));
 return exteriorDetails(bottom,exteriorDetails(top,[axle],g),g);
}
export function kettlebell({g,p}){
 const body=p('M12 8C7.5 8 4 11.5 4 16C4 20 5.5 22 8 22H16C18.5 22 20 20 20 16C20 11.5 16.5 8 12 8Z');
 return exteriorDetails(body,[p('M7 10L5.8 5C4.8 1 19.2 1 18.2 5L17 10')],g);
}
export function basketball({g,c,l,p}){
 return enclosedDetails(c(12,12,10),[l(12,2,12,22),l(2,12,22,12),p('M5 4.8586C9.5 8.5 9.5 15.5 5 19.1414'),p('M19 4.8586C14.5 8.5 14.5 15.5 19 19.1414')],g);
}

export function football({g,c,o,l}){
 const angles=Array.from({length:5},(_,i)=>-Math.PI/2+i*2*Math.PI/5);
 const point=(angle,r)=>[12+r*Math.cos(angle),12+r*Math.sin(angle)];
 const panel=o(angles.map(a=>point(a,5.5)),true,g.tip);
 const joins=angles.map(a=>l(12,12,...point(a,10)));
 return enclosedDetails(c(12,12,10),exteriorDetails(panel,joins,g),g);
}
export function tennisRacket({g,p,o,l,small}){
 const at=(x,y)=>diagonal([x,y]).join(' '),line=(x,y,x2,y2)=>l(...diagonal([x,y]),...diagonal([x2,y2]));
 const frame=p(`M${at(12,1.5)}C${at(14.7614,1.5)} ${at(17,4.1863)} ${at(17,7.5)}C${at(17,10.8137)} ${at(14.7614,13.5)} ${at(12,13.5)}C${at(9.2386,13.5)} ${at(7,10.8137)} ${at(7,7.5)}C${at(7,4.1863)} ${at(9.2386,1.5)} ${at(12,1.5)}Z`);
 const throat=small?line(12,7.5,12,18.5):o([[8,10.5],[12,18.5],[16,10.5]].map(diagonal),false,g.tip);
 const handle=o([[10.5,18.5],[13.5,18.5],[13.5,23.5],[10.5,23.5]].map(diagonal),true,g.tip);
 const net=[line(12,1.5,12,13.5),...(small?[7.5]:[5,10]).map(y=>line(6,y,18,y))];
 return [...enclosedDetails(frame,net,g),...exteriorDetails(handle,exteriorDetails(frame,[throat],g).slice(1),g)];
}
export function volleyball({g,c,p}){
 return enclosedDetails(c(12,12,10),[
  p('M11 7A16 16 20 0 1 21.98 11.362'),p('M12 12A13 13 0 0 1 3.34 17'),
  p('M16.83 13.634A16 16 0 0 1 7.563 20.962'),
  p('M20.66 17A13 13 0 0 0 12 12A13 13 0 0 1 12 2'),
  p('M8.17 15.366A16 16 0 0 1 6.457 3.676'),
 ],g);
}

function cubicRange(points,start,end){
 const value=t=>[0,1].map(k=>(1-t)**3*points[0][k]+3*(1-t)**2*t*points[1][k]+3*(1-t)*t*t*points[2][k]+t**3*points[3][k]);
 const derivative=t=>[0,1].map(k=>3*(1-t)**2*(points[1][k]-points[0][k])+6*(1-t)*t*(points[2][k]-points[1][k])+3*t*t*(points[3][k]-points[2][k]));
 const a=value(start),b=value(end),da=derivative(start),db=derivative(end),h=(end-start)/3;
 return `M${a.join(' ')}C${a.map((x,k)=>x+da[k]*h).join(' ')} ${b.map((x,k)=>x-db[k]*h).join(' ')} ${b.join(' ')}`;
}
export function baseball({g,c,p}){
 const left=[[5,4.8586],[9.5,8.5],[9.5,15.5],[5,19.1414]],right=left.map(([x,y])=>[24-x,y]);
 const seams=[left,right].flatMap(points=>[[0,.12],[.37,.63],[.88,1]].map(([a,b])=>p(cubicRange(points,a,b))));
 return enclosedDetails(c(12,12,10),seams,g);
}
export function golfHole({g,o,p}){
 const flag=o([[11,19],[11,2],[20,6.5],[11,11]],false,g.tip);flag[1]['stroke-linecap']='butt';
 return [flag,p('M7 16.9019A8 3 0 1 0 15 16.9019')];
}
export function swimming({g,c,o,p}){
 return [c(17.5,6,2),o([[3,8],[8,6.5],[14,11.5],[12,16]],false,g.tip),...[16,21].map(y=>p(`M2 ${y}Q4.5 ${y-2} 7 ${y}T12 ${y}T17 ${y}T22 ${y}`))];
}
export function running({g,c,o}){
 return [c(15,4,2),o([[6,11],[7,8],[12,8.5],[16,12],[20,11]],false,g.tip),o([[12,8.5],[10.5,14],[15,17],[15,22]],false,g.tip),o([[10.5,14],[7,18],[2,16.5]],false,g.tip)];
}
