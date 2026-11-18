import {path,n} from '../geometry.mjs';

// An open Archimedean spiral: radius grows uniformly with angle. Cubic
// Hermite segments preserve the analytic tangent at every quarter turn.
// This is a plane drawing tool, not the coils of a three-dimensional spring.
export function spiralParameters(g){
 return {cx:g.c-g.v(.7,.85,1),cy:g.c+g.v(.7,.85,1),inner:g.v(.9,1.1,1.3),outer:g.v(6.5,8.1,9.7),turns:2};
}
export function spiralPoint({cx,cy,inner,outer,turns},t){
 const start=-turns*2*Math.PI,a=start+t*turns*2*Math.PI,r=inner+(outer-inner)*t,k=(outer-inner)/(turns*2*Math.PI);
 return {point:[cx+r*Math.cos(a),cy+r*Math.sin(a)],tangent:[k*Math.cos(a)-r*Math.sin(a),k*Math.sin(a)+r*Math.cos(a)]};
}
export function spiralPath(parameters){
 const steps=Math.ceil(parameters.turns*4),delta=parameters.turns*2*Math.PI/steps;
 let previous=spiralPoint(parameters,0),d='M'+previous.point.map(n).join(' ');
 for(let i=1;i<=steps;i++){
  const next=spiralPoint(parameters,i/steps),c1=previous.point.map((v,j)=>v+previous.tangent[j]*delta/3),c2=next.point.map((v,j)=>v-next.tangent[j]*delta/3);
  d+='C'+[...c1,...c2,...next.point].map(n).join(' ');previous=next;
 }
 return path(d);
}
export const spiralDrawings={spiral:g=>[spiralPath(spiralParameters(g))]};
