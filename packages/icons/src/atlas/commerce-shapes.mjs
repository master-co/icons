import {enclosedDetails,exteriorDetails,knockout} from '../occlusion.mjs';
import {commerce} from '../families/commerce.mjs';
import {mark} from '../families/shared.mjs';

export function scale({g,p,l}){
 const beam=p('M3 7H4C7 7 9 6.5 12 5C15 6.5 17 7 20 7H21');
 const pans=[5,19].map(x=>p(`M${x} 7L${x-3} 16Q${x} 18.5 ${x+3} 16Z`));
 return [beam,...pans,l(12,2,12,22),l(7,22,17,22)];
}
export function gavel({g,o,p,l}){
 const head=o([[8.5,7.5],[13.5,2.5],[21.5,10.5],[16.5,15.5]],true,g.tip);
 const handle=p('M11 10L3 18C1 20 4 23 6 21L14 13Z');
 return [...exteriorDetails(head,[handle],g),l(8,8,14,2),l(16,16,22,10)];
}
export function stamp({g,p,r,l}){
 const base=r(3,13,18,5,g.r);
 const handle=p('M10 13V9C10 7 8.5 7 8.5 5A3.5 3.5 0 0 1 15.5 5C15.5 7 14 7 14 9V13');
 return [...exteriorDetails(base,[handle],g),l(4,22,20,22)];
}
export function shoppingBasket({g,o,l}){
 const shell=o([[3,10],[5,21],[19,21],[21,10]],true,[g.tip,g.r,g.r,g.tip]);
 return [...exteriorDetails(shell,[l(5,10,9,3),l(15,3,19,10)],g),l(2,10,22,10),l(9,14,9,17.5),l(15,14,15,17.5)];
}
export function basketCheck(a){return knockout(shoppingBasket(a),mark(a.g,'check',19,19),a.g)}
export function basketPlus(a){return knockout(shoppingBasket(a),mark(a.g,'plus',19,19),a.g)}
export function bagCheck({g}){return knockout(commerce['shopping-bag'](g),mark(g,'check',19,19),g)}
export function bagPlus({g}){return knockout(commerce['shopping-bag'](g),mark(g,'plus',19,19),g)}
export function cashRegister({g,o,l,r,d}){
 const shell=o([[2,17],[5,7],[19,7],[22,17],[22,22],[2,22]],true,[g.tip,g.tip,g.tip,g.tip,g.r,g.r]);
 const display=r(7,2,8,5,g.tip);
 const keys=[9,12,15].flatMap(x=>[11,14].map(y=>d(x,y,g.v(.55,.7,.8))));
 return [...exteriorDetails(shell,[display],g),...enclosedDetails(shell,[l(2,17,22,17),...keys],g).slice(1)];
}
export function receiptDollar({g,p,l}){
 const shell=commerce.receipt(g)[0];
 const dollar=p('M15 9Q15 8 13 8H11Q9 8 9 9.625Q9 11.25 11 11.25H13Q15 11.25 15 12.875Q15 14.5 13 14.5H11Q9 14.5 9 13.5');
 return [shell,dollar,l(12,6.5,12,8),l(12,14.5,12,16)];
}
