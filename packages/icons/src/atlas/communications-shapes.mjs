import {enclosedDetails,exteriorDetails,knockout} from '../occlusion.mjs';
import {support} from '../families/support.mjs';
import {coreDrawings} from '../families/core.mjs';

export function mailbox({g,p,l}){
 const b=g.r*24/g.s;
 const bottom=b?`V${19-b}Q22 19 ${22-b} 19H${2+b}Q2 19 2 ${19-b}`:'V19H2';
 const shell=p(`M7 5H17A5 5 0 0 1 22 10${bottom}V10A5 5 0 0 1 7 5Z`);
 return enclosedDetails(shell,[p('M7 5A5 5 0 0 1 12 10V19'),l(5.5,10,7.5,10),p('M15 9H18V11')],g);
}
export function phoneIncoming({g,l,a}){return [...support.phone(g),...a([l(21,2,14,9)],[[14,4],[14,9],[19,9]])]}
export function phoneOutgoing({g,l,a}){return [...support.phone(g),...a([l(14,9,21,2)],[[16,2],[21,2],[21,7]])]}
export function phoneMissed({g,l}){return [...support.phone(g),l(15,3,21,9),l(21,3,15,9)]}
export function phoneCall({g,p}){return [...support.phone(g),p('M13 3A8 8 0 0 1 21 11'),p('M13 7A4 4 0 0 1 17 11')]}
export function satelliteDish({g,p,l}){
 const shell=p('M2.824 10.459A8 8 0 0 0 13.541 21.176C14.099 20.9 14.164 20.164 13.724 19.724L4.276 10.276C3.836 9.836 3.1 9.901 2.824 10.459Z');
 return [...exteriorDetails(shell,[l(9,15,13,11)],g),p('M18 12A6 6 0 0 0 12 6'),p('M22 12A10 10 0 0 0 12 2')];
}
export function messageHeart({g,p}){
 return [...coreDrawings.message(g),p('M12 12.75C10.5 11.9 8.5 10.8 8 9.2C7.4 7 10 5.9 12 8C14 5.9 16.6 7 16 9.2C15.5 10.8 13.5 11.9 12 12.75Z')];
}
export function messageDots({g,d}){return [...coreDrawings.message(g),...[8,12,16].map(x=>d(x,10,g.v(.7,.85,1)))]}
export function messageLock({g,p,r,d}){
 const body=r(13.5,15,7.5,6.5,Math.min(g.r,g.v(.5,.65,.8)));
 const shackle=p('M15 15V13.5A2.25 2.25 0 0 1 19.5 13.5V15');
 const silhouette=p('M15 15V13.5A2.25 2.25 0 0 1 19.5 13.5V15Z');
 const badge=[...exteriorDetails(body,[shackle],g),...(g.s===16?[]:[d(17.25,18.25,g.stroke/2)])];
 return knockout(coreDrawings.message(g),badge,g,{silhouettes:[body,silhouette]});
}
export function messageSearch({g,c,l}){
 const radius=3.1,x=16.5,y=16,t=radius/Math.sqrt(2),circle=c(x,y,radius);
 return knockout(coreDrawings.message(g),[circle,l(x+t,y+t,21.5,21)],g,{silhouettes:[circle]});
}
