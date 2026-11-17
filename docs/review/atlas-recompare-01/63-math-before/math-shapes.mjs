export function pi({p,l}){
 return [p('M3.5 7C3.5 4.8 5 3.5 7 3.5H20.5'),l(9,3.5,9,20.5),p('M15 3.5V17.5C15 19.5 16 20.5 18 20.5')];
}
export function sigma({g,o}){
 return [o([[18,7],[18,4],[6,4],[12,12],[6,20],[18,20],[18,17]],false,[0,g.tip,g.tip,g.r*.4,g.tip,g.tip,0])];
}
export function infinity({p}){
 return [p('M6 16C11 16 13 8 18 8A4 4 0 0 1 18 16C13 16 11 8 6 8A4 4 0 0 0 6 16Z')];
}
export function radical({g,o}){
 return [o([[3,12],[6.5,12],[9.5,g.corner==='sharp'?19:21],[14,4],[21,4]],false,g.tip)];
}
export function equal({l}){return [l(5,9,19,9),l(5,15,19,15)];}
export function notEqual(f){return [...equal(f),f.l(6,20,18,4)];}
export function divide({g,l,d}){return [l(5,12,19,12),d(12,5.5,g.v(1,1.2,1.4)),d(12,18.5,g.v(1,1.2,1.4))];}
export function plusMinus({l}){return [l(5,9,19,9),l(12,3,12,15),l(5,21,19,21)];}
export function fraction({g,o,p,l}){
 return [o([[10,5],[12.5,3],[12.5,9]],false,g.tip),l(5,12,19,12),p('M9 16.5C9 14.5 15 14.5 15 16.5C15 18 12 18.5 9 21H15')];
}
export function functionSquare({g,r,p,l}){
 return [r(3,3,18,18,g.r),p('M8.5 17C10.5 17 11.4 16.1 11.7 14.1L12.3 9.9C12.6 7.9 13.5 7 15.5 7'),l(9,11.5,15,11.5)];
}
