import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';

export function hammer({g,p,o,l}){
 const head=p('M9 3H12.5C14.2 3 15.7 3.7 16.9 4.9L18.4 6.4Q19 7 19 8Q19 9 19.7 9.7L21 11L18 14L16.5 12.5Q16 12 15 12H14L12 10V8.5C12 6.5 11 5 9 3Z');
 const handle=o([[12,9],[15,12],[5,22],[2,19]],true,g.tip);
 return [...exteriorDetails(head,[handle],g),l(17.5,14.5,21.5,10.5)];
}
export function screwdriver({g,p,o,l}){
 const handle=p('M12 7L16 3A3.5355 3.5355 0 0 1 21 8L17 12H14.8Q14 12 14 12.8V15L12 17L7 12L9 10H11.2Q12 10 12 9.2Z');
 return [...exteriorDetails(handle,[l(2,22,9.5,14.5)],g),l(15,9,18.5,5.5)];
}
export function drill({g,r,o,l,p}){
 const body=r(2,3,12,8,g.r),chuck=r(14,5,4,4,g.tip),base=r(2,18,10,4,g.tip);
 const grip=o([[5,11],[10,11],[8,18],[3,18]],true,g.tip);
 const trigger=g.s===16?[]:[p('M11.5 11V12Q11.5 14 14 14')];
 const upper=[...exteriorDetails(body,[chuck,grip,...trigger],g),l(18,7,22,7)];
 return exteriorDetails(base,upper,g);
}
export function saw({g,o,l}){
 const outline=o([[6,12],[20,2],[22,5],[19,6],[19,9],[16,9],[16,12],[13,12],[13,15],[10,17],[6.25,20],[2.25,15]],true,g.tip);
 return enclosedDetails(outline,[l(6,12,10,17)],g);
}
export function tapeMeasure({g,p,l}){
 const shell=p('M2 8.5C2 6.567 5.134 5 9 5C12.866 5 16 6.567 16 8.5C16 10.433 12.866 12 9 12H21Q22 12 22 13V18Q22 19 21 19H9C5.134 19 2 17.433 2 15.5Z');
 const spiral=p('M2 8.5C2 10.433 5.134 12 9 12V9C9 7.5 6 8 6 9.5');
 return enclosedDetails(shell,[spiral,...[6,12,18].map(x=>l(x,16.5,x,20))],g);
}
export function toolbox({g,o,l}){
 const box=o([[2,10],[6,6],[18,6],[22,10],[22,21],[2,21]],true,[g.tip,g.tip,g.tip,g.tip,g.r,g.r]);
 const handle=o([[8,6],[8,2],[16,2],[16,6]],false,g.tip);
 return [...exteriorDetails(box,[handle],g),...enclosedDetails(box,[l(2,14,22,14),l(8,12,8,16),l(16,12,16,16)],g).slice(1)];
}
export function hardHat({g,o,p,r}){
 const brim=r(2,16,20,5,g.tip);
 const dome=p('M4 16V13C4 9.134 6.686 6 10 6M14 6C17.314 6 20 9.134 20 13V16');
 const ridge=o([[10,11],[10,4],[14,4],[14,11]],false,g.tip);
 return exteriorDetails(brim,[dome,ridge],g);
}
export function paintRoller({g,r,o}){
 const roller=r(2,2,15,7,g.r),grip=r(8,17,4,5,g.tip);
 const arm=o([[17,5.5],[22,5.5],[22,13],[10,13],[10,17]],false,g.tip);
 return [...exteriorDetails(roller,exteriorDetails(grip,[arm],g),g)];
}
export function pocketKnife({g,r,p,l,d}){
 const handle=r(2,15,20,6,3*g.s/24);
 const blade=p('M4 15V3C6.209 3 8 4.791 8 7V15Z');
 const corkscrew=p('M17 3C17 4.5 19 4.5 19 6C19 7.5 17 7.5 17 9C17 10.5 19 10.5 19 12C19 13.5 17 13.5 17 15');
 return [...exteriorDetails(handle,[blade,corkscrew],g),d(5.5,18,g.v(.6,.75,.85)),d(18.5,18,g.v(.6,.75,.85))];
}
export function nut({g,o,c}){
 return [o([[12,2],[21,7],[21,17],[12,22],[3,17],[3,7]],true,g.tip),c(12,12,3.5)];
}
