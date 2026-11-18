import {selection} from '../expansion/design-tools.mjs';
import {line} from '../geometry.mjs';

//  Phosphor's solid/dashed half-frame inversion motif rebuilt
// directly from the existing selection boundary, with native corner joins.
export function selectionInvertParts(g){
 const frame=selection(g,{continuousEdges:['top','right']});
 const radius=Math.min(g.r,g.v(.65,.85,1));
 const start=g.s/8+radius*(1-Math.SQRT1_2),end=g.s-start;
 const diagonal=line(start,start,end,end);
 diagonal[1]['stroke-linecap']='butt';
 return {frame,diagonal,nodes:[...frame,diagonal]};
}

export const selectionInvertDrawings={'selection-invert':g=>selectionInvertParts(g).nodes};
