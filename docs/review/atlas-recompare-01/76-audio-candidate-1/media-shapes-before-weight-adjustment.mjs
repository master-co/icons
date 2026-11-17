import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';

export function radioReceiver({g,r,l,c}){
 const body=r(2,7,20,14,g.r);
 return [...exteriorDetails(body,[l(3,7,18,2)],g),c(15,14,3),l(6,12,8,12),l(6,16,8,16)];
}
export function tv({g,r,o}){
 const screen=r(2,7,20,15,g.r);
 return exteriorDetails(screen,[o([[7,2],[12,7],[17,2]],false,g.tip)],g);
}
export function projector({g,r,c,l}){
 const body=r(2,12,20,9,g.r),lens=c(8,13,3.5);
 const ray=angle=>{const a=angle*Math.PI/180;return l(8+8*Math.sin(a),13-8*Math.cos(a),8+10*Math.sin(a),13-10*Math.cos(a));};
 return [...exteriorDetails(lens,[body],g),l(16,17,18,17),ray(0),ray(-30),ray(30)];
}
export function speaker({g,r,c,d}){
 return [r(4,2,16,20,g.r),c(12,14,4),d(12,6,g.v(.75,.9,1))];
}
export function filmReel({g,c,l,d}){
 const reel=c(11,11,9);
 return [...exteriorDetails(reel,[l(11,20,22,20)],g),...[[11,6.5],[15.5,11],[11,15.5],[6.5,11]].map(([x,y])=>g.s===16?d(x,y,1):c(x,y,1.5))];
}
export function cassette({g,r,c,o,l}){
 const body=r(2,4,20,16,g.r);
 const base=o([[6,20],[7.5,16],[16.5,16],[18,20]],false,g.tip);
 return enclosedDetails(body,[c(7.5,10,2),c(16.5,10,2),l(7.5,12,16.5,12),base],g);
}
export function film({g,r,l}){
 const body=r(2,3,20,18,g.r);
 return enclosedDetails(body,[l(7,3,7,21),l(17,3,17,21),l(2,12,22,12),...[7.5,16.5].flatMap(y=>[l(2,y,7,y),l(17,y,22,y)])],g);
}
export function clapperboard({g,o,l}){
 const body=o([[3,11],[21,11],[21,21],[3,21]],true,[0,g.tip,g.r,g.r]);
 const arm=o([[1.7585,6.7789],[18.7585,1.7789],[20,6],[3,11]],true,g.tip);
 const stripes=[l(7,5,10,10),l(13,3,16,8)];
 return [...exteriorDetails(arm,[body],g),...enclosedDetails(arm,stripes,g).slice(1)];
}
export function podcast({g,p,r,l}){
 const mic=r(9,8,6,8,3*g.s/24);
 return [p('M4.5 17A9 9 0 1 1 19.5 17'),...exteriorDetails(mic,[l(12,16,12,22)],g),l(9,22,15,22)];
}
export function antenna({g,l}){
 return [l(3,8,21,8),l(12,5,12,22),l(3,6,3,10),l(7.5,5.5,7.5,10.5),l(16.5,4.5,16.5,11.5),l(21,4,21,12)];
}
