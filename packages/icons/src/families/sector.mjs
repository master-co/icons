import {ring} from './core.mjs';
import {path,n} from '../geometry.mjs';

export function sectorParts(g){
 const mother=ring(g);
 if(mother[0]!=='circle')throw new Error('Sector requires the circle mother geometry');
 const {cx,cy,r}=mother[1],radius=g.corner==='sharp'?0:g.corner==='soft'?g.v(.25,.3,.35):g.v(.6,.75,.9);
 const xy=(x,y)=>`${n(cx+x)} ${n(cy+y)}`;
 if(!radius)return {mother,radius,nodes:[path(`M${xy(0,-r)}A${r} ${r} 0 1 0 ${xy(r,0)}L${xy(0,0)}Z`)]};
 // Each outer fillet is internally tangent to the mother circle and tangent
 // to its radius line. The concave inner fillet rounds the excluded quadrant.
 const h=Math.sqrt((r-radius)**2-radius**2),scale=r/(r-radius),u=radius*scale,v=h*scale;
 const d=`M${xy(-u,-v)}A${r} ${r} 0 1 0 ${xy(v,u)}A${radius} ${radius} 0 0 0 ${xy(h,0)}L${xy(radius,0)}A${radius} ${radius} 0 0 1 ${xy(0,-radius)}L${xy(0,-h)}A${radius} ${radius} 0 0 0 ${xy(-u,-v)}Z`;
 return {mother,radius,nodes:[path(d)]};
}
export const sectorDrawings={sector:g=>sectorParts(g).nodes};
