import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';
export function diamondGem({g,o,l}){
 const shell=o([[7,3],[17,3],[22,9],[12,22],[2,9]],true,g.tip);
 return enclosedDetails(shell,[l(2,9,22,9),o(g.s===16?[[8,9],[12,22],[16,9]]:[[10,3],[8,9],[12,22],[16,9],[14,3]],false,g.tip)],g);
}
export function crown({g,o}){return [o([[3,6],[7,10],[12,3],[17,10],[21,6],[18.5,20],[5.5,20]],true,g.tip)]}
export function trophy({g,p,l,c}){
 const b=Math.min(g.r,1.5)*24/g.s;
 const shell=p(b?`M${6.5+b} 4H${17.5-b}Q17.5 4 17.5 ${4+b}V10.5A5.5 5.5 0 0 1 6.5 10.5V${4+b}Q6.5 4 ${6.5+b} 4Z`:'M6.5 4H17.5V10.5A5.5 5.5 0 0 1 6.5 10.5Z');
 return [...exteriorDetails(shell,[c(5,8,3),c(19,8,3),l(12,16,12,21)],g),l(7,21,17,21)];
}
export function medal({g,o,c,l}){
 const disk=c(12,18,4),ribbon=o([[3.5,3],[20.5,3],[20.5,10],[12,14],[3.5,10]],true,g.tip);
 return [...exteriorDetails(disk,enclosedDetails(ribbon,[l(8,3,8,12),l(16,3,16,12)],g),g)];
}
export function ribbon({p}){return [p('M7 21C10.5 17 16.5 10.2 16.5 7C16.5 1.5 7.5 1.5 7.5 7C7.5 10.2 13.5 17 17 21')]}
export function partyPopper({g,o,l,d}){
 const confetti=g.v(.75,.9,1);
 return [o([[3,21],[7,10],[14,17]],true,g.tip),d(11.5,4.5,confetti),l(17,7,20,4),l(18,12,21,12),d(20,19,confetti)];
}
export function balloon({g,p,detail}){
 const shell=p('M18 8C18 12 14.5 16 12 16S6 12 6 8A6 6 0 0 1 18 8Z');
 return [...exteriorDetails(shell,[p('M12 16V17A2 2 0 0 0 14 19H15A2 2 0 0 1 17 21V22')],g),...detail(p('M12 6A2 2 0 0 1 14 8'))];
}
export function dice({g,r,d}){return [r(3,3,18,18,g.r),...[[7.5,7.5],[16.5,7.5],[12,12],[7.5,16.5],[16.5,16.5]].map(([x,y])=>d(x,y,g.v(.8,.95,1.1)))]}
export function gamepad({g,p,l,d}){
 const shell=p('M7 5H17C19.1 5 20.6 6.5 21 8.6L22 16C22.4 19.4 19.1 20 17 18L15.6 16.6Q15 16 14.2 16H9.8Q9 16 8.4 16.6L7 18C4.9 20 1.6 19.4 2 16L3 8.6C3.4 6.5 4.9 5 7 5Z');
 return [shell,l(6,10.5,10,10.5),l(8,8.5,8,12.5),d(15,12,g.v(.75,.9,1)),d(18,9.5,g.v(.75,.9,1))];
}
export function joystick({g,r,c,l}){
 const base=r(3,15,18,6,g.r),knob=c(12,6,3);
 return [...exteriorDetails(base,exteriorDetails(knob,[l(12,9,12,15),l(6,13,6,15)],g).slice(1),g),knob];
}
