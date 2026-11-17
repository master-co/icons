import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';

export function leaf({p}){
 return [p('M7 18C3.5 15.5 3.2 11.2 5.8 8.6C8.8 5.6 14.5 6.1 19.5 2.5C21 8.2 20.2 14.4 17 17.4C14.2 20 10.2 20.3 7 18Z'),p('M3 22C5.3 17.5 8.5 14 13.5 11.5')];
}
export function sprout({g,p,l}){
 const left=p('M12 13C7 14 4 11 4 7C8.5 6.5 12 8.5 12 13Z');
 const right=p('M12 10C12 4 15.5 2.5 20.5 3C20.5 7.5 17.5 11 12 10Z');
 const stem=p('M12 10V13C12 16 13.8 18 12 21');
 // Both ends join a structure; a square cap must not pierce the ground line.
 stem[1]['stroke-linecap']='butt';
 return [left,right,...exteriorDetails(right,[stem],g).slice(1),l(7,21,17,21)];
}
export function treePine({g,o,l}){
 const crown=o([[12,2.5],[16.5,7.5],[14.5,8.5],[18,12.5],[16,13.5],[20.5,19],[3.5,19],[8,13.5],[6,12.5],[9.5,8.5],[7.5,7.5]],true,g.tip);
 return [...exteriorDetails(crown,[l(12,19,12,22)],g)];
}
export function treeDeciduous({g,p,l,o,detail}){
 const crown=p('M7 17.5C3.5 17.5 2 15.5 2 13C2 11.2 3 9.8 4.5 9.2C3.2 6 6.3 3.8 8.7 4.5C9.2 1 14.8 1 15.3 4.5C17.7 3.8 20.8 6 19.5 9.2C21 9.8 22 11.2 22 13C22 15.5 20.5 17.5 17 17.5Z');
 return [crown,l(12,9.5,12,22),...detail(o([[9,11.5],[12,14.5],[15,11.5]],false,g.tip))];
}
export function flower({p,c}){
 // Six petals share a radial construction. The valleys are spaced from the
 // centre ring; no complete overlapping circles remain inside the flower.
 let path='';
 for(let i=0;i<6;i++){
  const a=-Math.PI/2+i*Math.PI/3,v=[Math.cos(a),Math.sin(a)],t=[-v[1],v[0]];
  const point=(r,w)=>[12+v[0]*r+t[0]*w,12+v[1]*r+t[1]*w].map(n=>+n.toFixed(5)).join(' ');
  if(i===0)path+='M'+point(5.022947,-2.9);
  path+='C'+point(11,-5)+' '+point(11,5)+' '+point(5.022947,2.9);
 }
 return [p(path+'Z'),c(12,12,2.5)];
}
export function cactus({p,l}){
 const body=p('M9 21V15.75Q9 15 8.25 15H7C4.2 15 2.5 13 2.5 10.5V9A1.5 1.5 0 0 1 5.5 9V10C5.5 11 6.2 11.5 7.5 11.5H8.25Q9 11.5 9 10.75V5.5A3 3 0 0 1 15 5.5V7.75Q15 8.5 15.75 8.5H16.5C17.8 8.5 18.5 8 18.5 7V6A1.5 1.5 0 0 1 21.5 6V7.5C21.5 10 19.8 12 17 12H15.75Q15 12 15 12.75V21');
 return [body,l(7,21,17,21)];
}
const mountainBody=({g,o})=>o([[2.5,21],[9.5,3.5],[13.5,10.5],[17.5,7],[21.5,21]],true,g.tip);
export function mountain(f){return [mountainBody(f)];}
export function mountainSnow(f){
 return enclosedDetails(mountainBody(f),[f.p('M3 14C7 10 10 12.8 12.5 14.7C15.5 17 18.5 17 22 14.5')],f.g);
}
