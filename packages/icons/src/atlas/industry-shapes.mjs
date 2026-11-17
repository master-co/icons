import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';

export function factory({g,o,d}){
 const body=o([[2,21],[2,3],[7,3],[7,11],[14,7],[14,11],[22,7],[22,21]],true,[g.r,g.r,g.r,g.tip,g.tip,g.tip,g.tip,g.r]);
 return [body,...[7,12,17].map(x=>d(x,16,g.v(.65,.8,.9)))];
}
export function craneTower({g,o,l,p}){
 const mast=o([[5,22],[5,3],[8,3],[11,8],[11,22]],false,g.tip);
 return [mast,l(2,22,14,22),l(2,8,22,8),l(5,15,11,15),p('M20 8V17C20 18.1046 19.1046 19 18 19C16.8954 19 16 18.1046 16 17')];
}
export function craneTruck({g,p,o,l,c}){
 const body=o([[2,20],[2,13],[12,13],[12,20]],true,g.tip);
 const cab=p('M6 13V8Q6 6 8 6H9C10.657 6 12 7.343 12 9V13Z');
 const boom=o([[12,9],[20,3],[20,12]],false,g.tip);
 const hook=p('M20 12C21.1046 12 22 12.8954 22 14C22 15.1046 21.1046 16 20 16C18.8954 16 18 15.1046 18 14');
 const wheels=[c(4.5,20,2),c(12,20,2)];
 let upper=[...exteriorDetails(body,exteriorDetails(cab,[boom],g),g),hook];
 for(const wheel of wheels)upper=exteriorDetails(wheel,upper,g);
 return upper;
}
export function forklift({g,p,l,c}){
 const body=p('M3 19V14Q3 12 5 12H12M6 12V7Q6 5 8 5H10L16 11M16 2V19H22M7 19H11');
 let result=[body];for(const wheel of [c(5,19,2),c(13,19,2)])result=exteriorDetails(wheel,result,g);
 return result;
}
export function warehouse({g,o,l}){
 const shell=o([[2,21],[2,7],[12,2],[22,7],[22,21]],true,[g.r,g.tip,g.tip,g.tip,g.r]);
 const door=o([[7,21],[7,10],[17,10],[17,21]],false,g.tip);
 return enclosedDetails(shell,[door,l(7,15.5,17,15.5)],g);
}
export function excavator({g,r,p,o,l,d}){
 const track=r(2,16,13,5,2.5*g.s/24);
 const cab=p('M6 12V7H8C10.209 7 12 8.791 12 11V16H4V14Q4 12 6 12H12');
 const arm=o([[12,10],[17,4],[21,10]],false,g.tip);
 const bucket=p('M21 10C22.38 11.38 22.38 13.62 21 15C19.62 16.38 17.38 16.38 16 15Z');
 return [...exteriorDetails(track,exteriorDetails(cab,exteriorDetails(bucket,[arm],g),g),g),d(5,18.5,g.v(.55,.7,.8)),d(12,18.5,g.v(.55,.7,.8))];
}
export function container({g,o,l,small}){
 const box=o([[2,9],[14,2],[22,7],[22,15],[10,22],[2,17]],true,g.tip);
 const edges=[o([[2,9],[10,14],[22,7]],false,0),l(10,14,10,22)];
 const bars=small?[l(16,10.5,16,18.5)]:[l(14,11.6667,14,19.6667),l(18,9.3333,18,17.3333)];
 const side=o([[10,14],[22,7],[22,15],[10,22]],true,0);
 return enclosedDetails(box,[...edges,...enclosedDetails(side,bars,g).slice(1)],g);
}
export function robotArm({g,c,o,l}){
 const pivot=c(6,7,2.5);
 const support=o([[5,21],[5,7],[6.5,7],[12,21]],false,g.tip);
 support[1]['stroke-linecap']='butt';
 const claw=o([[21,4.5],[17,2.5],[14.5,7],[17,11.5],[21,9.5]],false,g.tip);
 return [...exteriorDetails(pivot,[support,l(6,7,14.5,7)],g),claw,l(3,21,14,21)];
}
export function constructionBarrier({g,r,l}){
 const panel=r(2,6,20,9,g.tip);
 return [...exteriorDetails(panel,[l(7,3,7,22),l(17,3,17,22)],g),...enclosedDetails(panel,[l(2,6,11,15),l(11,6,20,15)],g).slice(1)];
}
export function wall({g,r,l}){
 const frame=r(2,4,20,16,g.tip);
 return enclosedDetails(frame,[l(2,9.3333,22,9.3333),l(2,14.6667,22,14.6667),l(12,4,12,9.3333),l(7,9.3333,7,14.6667),l(17,9.3333,17,14.6667),l(12,14.6667,12,20)],g);
}
