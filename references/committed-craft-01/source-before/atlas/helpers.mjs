import {figure} from '../families/shared.mjs';
import {n} from '../geometry.mjs';
// Match the production drawing serializer before reviewing authoring output.
const normalize=nodes=>nodes.map(([tag,attrs])=>[tag,Object.fromEntries(Object.entries(attrs).map(([key,value])=>[key,typeof value==='number'?n(value):key==='d'?value.replace(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi,x=>String(n(Number(x)))):value]))]);
// Readable construction per concept; source relationships are recorded per icon. The grid is 24u;
// corner radii and stroke are native, and detail() omits secondary marks at 16.
export function author(rows,category,categoryLabel){
 return rows.map(([name,label,referenceA,referenceB,cues,draw])=>({
  name,label,category,categoryLabel,referenceA,referenceB,cues,
  draw:g=>{const f=figure(g);return normalize(draw({g,a:f.arrow,p:f.path,l:f.line,c:f.circle,r:f.rect,o:f.contour,d:f.dot,detail:(...nodes)=>g.s===16?[]:nodes,small:g.s===16}));}
 }));
}
