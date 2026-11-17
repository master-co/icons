import {figure} from '../families/shared.mjs';
// A readable, independently authored construction per concept. The grid is 24u;
// corner radii and stroke are native, and detail() omits secondary marks at 16.
export function author(rows,category,categoryLabel){
 return rows.map(([name,label,referenceA,referenceB,cues,draw])=>({
  name,label,category,categoryLabel,referenceA,referenceB,cues,
  draw:g=>{const f=figure(g);return draw({g,a:f.arrow,p:f.path,l:f.line,c:f.circle,r:f.rect,o:f.contour,d:f.dot,detail:(...nodes)=>g.s===16?[]:nodes,small:g.s===16});}
 }));
}
