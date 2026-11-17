import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';
function outside(nodes,lines,g){for(const node of nodes)lines=exteriorDetails(node,lines,g).slice(1);return [...nodes,...lines]}
export function vectorSquare({g,r,l}){
 const nodes=[[3,3],[17,3],[17,17],[3,17]].map(([x,y])=>r(x,y,4,4,g.tip));
 return outside(nodes,[l(5,5,19,5),l(19,5,19,19),l(19,19,5,19),l(5,19,5,5)],g);
}
export function bezierCurve({g,c,p,l}){
 const nodes=[c(4,18,2.25),c(12,7,2.25),c(20,18,2.25)];
 return outside(nodes,[p('M4 18C4 11 8 7 12 7S20 11 20 18'),l(2,7,22,7)],g);
}
export function spline({g,c,p}){return outside([c(5,19,2.25),c(19,5,2.25)],[p('M5 19V17A12 12 0 0 1 17 5H19')],g)}
export function vectorPolygon({g,c,l}){
 const points=[[11,4.5],[19.5,8],[15,19.5],[4.5,13]];
 return outside(points.map(([x,y])=>c(x,y,2.25)),points.map(([x,y],i)=>l(x,y,...points[(i+1)%points.length])),g);
}
export function pentagon({g,o}){return [o(Array.from({length:5},(_,i)=>{const a=-Math.PI/2+i*Math.PI*2/5;return [12+10*Math.cos(a),12+10*Math.sin(a)]}),true,g.r)]}
export function octagon({g,o}){const a=12-10*Math.tan(Math.PI/8),b=24-a;return [o([[a,2],[b,2],[22,a],[22,b],[b,22],[a,22],[2,b],[2,a]],true,g.r)]}
export function ellipse({p}){return [p('M2 12A10 6 0 1 1 22 12A10 6 0 1 1 2 12Z')]}
export function cone({g,p}){
 const y=19-9/17,x=9*Math.sqrt(1-9/289),length=Math.hypot(x,y-2),cut=g.tip*24/g.s*1.6;
 const dx=x/length*cut,dy=(y-2)/length*cut;
 const apex=cut?`M${12-dx} ${2+dy}Q12 2 ${12+dx} ${2+dy}`:'M12 2';
 const shell=p(`${apex}L${12+x} ${y}A9 3 0 1 1 ${12-x} ${y}Z`);
 const rim=p(`M${12-x} ${y}A9 3 0 0 1 ${12+x} ${y}`);
 return enclosedDetails(shell,[rim],g);
}
export function cylinder({g,p}){
 const shell=p('M3 5A9 3 0 0 1 21 5V19A9 3 0 0 1 3 19Z');
 return enclosedDetails(shell,[p('M3 5A9 3 0 0 0 21 5')],g);
}
export function pyramid({g,o,l}){
 const shell=o([[12,2],[22,16.5],[12,22],[2,16.5]],true,g.tip);
 return enclosedDetails(shell,[l(12,2,12,22)],g);
}
