import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';

export function cctv({g,p,o,l,d}){
 const body=p('M4 5C4.7 3.6 6.5 3.1 7.9 3.8L17.5 8.6L13.5 16.6L3.9 11.8C2.5 11.1 2 9.3 2.7 7.9Z');
 const lens=o([[16,11.6],[22,11.6],[19,17.6],[15,13.6]],true,g.tip);
 const support=p('M8.7 14.2L7.3 17Q6.3 19 4.5 19H2');
 return [...exteriorDetails(body,[lens,support],g),l(2,17,2,22),d(7,8.5,g.v(.6,.75,.85))];
}
export function siren({g,p,r,l}){
 const base=r(4,18,16,4,g.tip),dome=p('M6 18V12A6 6 0 0 1 18 12V18');
 return [...exteriorDetails(base,[dome],g),p('M12 10A2 2 0 0 1 14 12'),l(12,2,12,2.5),l(3.5,4.5,4.5,5.5),l(19.5,5.5,20.5,4.5)];
}
export function alarmSmoke({g,r,o,p}){
 const rim=r(2,3,20,5,g.tip),sensor=o([[5,8],[6,12],[18,12],[19,8]],false,g.tip);
 return [...exteriorDetails(rim,[sensor],g),...[5,11,17].map(x=>p(`M${x} 22C${x} 19 ${x+2} 19 ${x+2} 16`))];
}
export function fireExtinguisher({g,p,r,l}){
 const body=p('M9 10C9 7.2386 11.2386 5 14 5C16.7614 5 19 7.2386 19 10V20Q19 22 17 22H11Q9 22 9 20Z');
 const valve=r(12,2,4,5,g.tip);
 const hose=p('M12 3C6 3 3 6 3 11V20');
 return [...exteriorDetails(body,exteriorDetails(valve,[hose,l(16,3,20,3),l(3,14,9,14)],g),g),...enclosedDetails(body,[l(9,17,19,17)],g).slice(1)];
}
export function fireHydrant({g,p,l,c}){
 const shell=p('M7 22V16H4V12H7V8A5 5 0 0 1 17 8V12H20V16H17V22Z');
 return [...enclosedDetails(shell,[l(6,8,18,8)],g),l(5,22,19,22),c(12,14,2.25)];
}
export function vault({g,r,c,l}){
 const frame=r(2,2,20,20,g.r),hub=c(12,12,2.5);
 const arms=[[6.5,6.5],[17.5,6.5],[6.5,17.5],[17.5,17.5]].map(([x,y])=>l(12,12,x,y));
 return [frame,...exteriorDetails(hub,arms,g)];
}
export function keySquare({g,o,l}){
 const head=o([[9,6.5],[13.5,2],[22,10.5],[17.5,15]],true,g.r);
 const shaft=o([[10.5,8],[2,16.5],[2,22],[6,22],[6,19],[9,19],[9,16],[12,16],[14.5,12]],true,g.tip);
 return [...exteriorDetails(head,[shaft],g),l(14,6.5,17.5,10)];
}
export function scanFace({g,o,p,d}){
 const corners=[[[3,7],[3,3],[7,3]],[[17,3],[21,3],[21,7]],[[21,17],[21,21],[17,21]],[[7,21],[3,21],[3,17]]].map(points=>o(points,false,g.r));
 return [...corners,d(9,9,g.v(.65,.8,.9)),d(15,9,g.v(.65,.8,.9)),p('M8 14C9 15.3333 10.3333 16 12 16C13.6667 16 15 15.3333 16 14')];
}
export function lifebuoy({g,c,l}){
 const outer=c(12,12,10),inner=c(12,12,4);
 const spokes=[45,135,225,315].map(deg=>{const a=deg*Math.PI/180;return l(12,12,12+10*Math.cos(a),12+10*Math.sin(a))});
 return enclosedDetails(outer,exteriorDetails(inner,spokes,g),g);
}
export function safetyPin({g,p,c,l}){
 const clasp=p('M12 6L15 3C16.657 1.343 19.343 1.343 21 3C22.657 4.657 22.657 7.343 21 9L18 12Q15 9 18 6Q15 9 12 6Z');
 const spring=c(5,19,3);
 const sides=[l(2.8787,16.8787,13,6.5),l(7.1213,21.1213,17.5,11)];
 return exteriorDetails(clasp,exteriorDetails(spring,sides,g),g);
}
