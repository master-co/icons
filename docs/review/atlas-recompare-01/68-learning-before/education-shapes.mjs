import {enclosedDetails,exteriorDetails,knockout} from '../occlusion.mjs';

export function graduationCap({g,o,p,l}){
 const edge=g.corner==='sharp'?3:2;
 const crown=o([[edge,10],[12,5.5],[24-edge,10],[12,14.5]],true,g.tip);
 const band=p('M6 10V16C6 20 18 20 18 16V10');
 return exteriorDetails(crown,[band,l(24-edge,10,24-edge,16)],g);
}
export function school({g,o,p,l,c}){
 const building=o([[6,5.5],[12,2],[18,5.5],[18,11],[22,13.5],[22,21],[2,21],[2,13.5],[6,11]],true,g.tip);
 return [...enclosedDetails(building,[l(6,5.5,6,21),l(18,5.5,18,21),c(12,8.5,2),p('M10 21V17A2 2 0 0 1 14 17V21')],g),...exteriorDetails(building,[l(6,5.5,4,20/3),l(18,5.5,20,20/3)],g).slice(1)];
}
export function presentation({g,o,l}){
 const screen=o([[3,3],[21,3],[21,16],[3,16]],true,[0,0,g.r,g.r]);
 return exteriorDetails(screen,[l(2,3,22,3),o([[7,22],[12,16],[17,22]],false,g.tip)],g);
}
export function chalkboard({g,o,l}){
 const board=o([[3,20],[3,4],[21,4],[21,12]],false,g.r);
 const eraser=o([[14,20],[14,16],[21,16],[21,20]],false,g.tip);
 return [board,l(2,20,22,20),eraser];
}
export function abacus({g,l,o}){
 const frame=[l(4,2.5,4,21),l(20,2.5,20,21),l(2,21,22,21),l(4,7,20,7),l(4,15,20,15)];
 const beads=[[8,7],[13,7],[10,15],[16,15]].map(([x,y])=>l(x,y-2,x,y+2));
 return [...frame,...beads];
}
export function bookMarked({g,p,o,l}){
 // The binding is a continuous cover-to-page curve, not a second nested box.
 const shell=p('M20 17H6.5A2.5 2.5 0 0 0 4 19.5V5.5A2.5 2.5 0 0 1 6.5 3H20Z');
 const bookmark=o([[10,3],[10,11],[13,9],[16,11],[16,3]],false,g.tip);
 return [...enclosedDetails(shell,[bookmark],g),p('M4 19.5A2.5 2.5 0 0 0 6.5 22H20')];
}
export function library({l}){
 return [l(3,3,3,21),l(8,6,8,21),l(13,5,13,21),l(17,5,22,20.5)];
}
export function diploma({g,r,l,c,o}){
 const paper=r(2,3,20,15,g.r),seal=c(18.5,14,3.5);
 const ribbon=o([[16,15.5],[16,22],[18.5,20.5],[21,22],[21,15.5]],false,g.tip);
 const badge=exteriorDetails(seal,[ribbon],g);
 return knockout([paper,l(6,8,11,8),l(6,12,9,12)],badge,g,{silhouettes:[seal]});
}
export function globeStand({g,c,p,l}){
 return [c(13,9,6.5),p('M5.9289 1.9289A10 10 0 0 0 20.0711 16.0711'),l(13,19,13,22),l(9,22,17,22)];
}
export function pencilRuler({g,o,l,p}){
 const pencil=o([[3,21],[4.5,16],[17.5,3],[21,6.5],[8,19.5]],true,g.tip);
 const ruler=o([[3,6],[6,3],[21,18],[18,21]],true,g.tip);
 const ticks=[l(7,4,5.5,5.5),l(20,17,18.5,18.5)];
 return [...exteriorDetails(pencil,enclosedDetails(ruler,ticks,g),g),...enclosedDetails(pencil,[l(15,5.5,18.5,9)],g).slice(1)];
}
