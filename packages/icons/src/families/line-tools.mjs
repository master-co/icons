import {figure} from './shared.mjs';
import {vectorPolyline} from '../atlas/geometric-shapes.mjs';

const points={
 'line-segment':[[5,19],[19,5]],
 // Phosphor's rising composition gives the inner bend more air than equal
 // high/low rows. Nodes and their joins remain shared Master geometry.
 polyline:[[4.5,19.5],[9,8.5],[15,15.5],[19.5,4.5]],
};
export function lineToolPoints(name,g){
 if(name==='polyline'&&g.s===16)return [[5.25,18.75],[9,8.5],[15,15.5],[18.75,5.25]];
 return points[name];
}
export function lineTool(g,name){
 const f=figure(g);
 return vectorPolyline({g,c:f.circle,l:f.line},lineToolPoints(name,g));
}
export const lineTools={
 'line-segment':g=>lineTool(g,'line-segment'),
 polyline:g=>lineTool(g,'polyline'),
};
