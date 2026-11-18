import {contour,path,weightDelta} from '../geometry.mjs';
import {paintedRegion,pathKit,regionPathData} from '../occlusion.mjs';
import {square} from './core.mjs';
import {rotate} from './shared.mjs';

// Every operation uses the same two square operands and overlap. A compact
// radius preserves square shoulders and gives the intersection useful room.
export function booleanOperands(g) {
  const l=g.v(2,2.5,3),m=g.v(6,7.5,9),side=g.v(8,10,12);
  const radius=g.corner==='sharp'?0:g.corner==='soft'?g.v(.45,.6,.75):g.v(1,1.25,1.5);
  return [l,m].flatMap(x=>square(g,{x,y:x,side,radius}));
}
function result(g,operation) {
  const [a,b]=booleanOperands(g).map(node=>paintedRegion([[node[0],{...node[1],fill:'currentColor',stroke:'none'}]],g));
  try{return path(regionPathData(a.op(b,pathKit.PathOp[operation])));}
  finally{a.delete();b.delete();}
}
function ghostOperands(g) {
  // Union the painted outlines before dimming, so intersections do not
  // become darker. Native package artwork stays in the leaf-node format.
  const ink=paintedRegion(booleanOperands(g),g);
  try{return ['path',{d:regionPathData(ink),fill:'currentColor',stroke:'none','fill-rule':ink.getFillTypeString(),opacity:.4}];}
  finally{ink.delete();}
}
function exclude(g) {
  const [,a]=booleanOperands(g)[0],l=a.x,b=l+a.width,m=l+a.width/2,r=a.rx;
  // Adapt Lucide's opposing open remnants; see rebuild-provenance.json.
  // XOR has two opposing L-shaped remnants. Their mathematical corners touch;
  // open each remnant near those junctions to preserve two separate pieces at
  // 16px. These are structural breaks, not an unrelated foreground badge.
  const gap=g.v(2,2.5,3)+weightDelta(g);
  const first=contour([[m-gap,b],[l,b],[l,l],[b,l],[b,m],[m,m],[m,b-gap]],[0,r,r,r,0,r,0]);
  return [first,...rotate([first],180,g)];
}
export const booleanOperations={
  'boolean-union':g=>[result(g,'UNION')],
  'boolean-subtract':g=>[ghostOperands(g),result(g,'DIFFERENCE')],
  'boolean-intersect':g=>[ghostOperands(g),result(g,'INTERSECT')],
  'boolean-exclude':exclude,
};
