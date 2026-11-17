// Authoring-only Boolean geometry. PathKit/WASM never enters SVG or React output.
import {createHash} from 'node:crypto';
import {readFile} from 'node:fs/promises';
import {contour} from './geometry.mjs';
import {createRequire} from 'node:module';
import PathKitInit from 'pathkit-wasm';
const require=createRequire(import.meta.url);
export const pathKit=await PathKitInit({wasmBinary:await readFile(require.resolve('pathkit-wasm/bin/pathkit.wasm'))});
const P=pathKit;
export const clearance=g=>g.v(.75,1,1.25);
// Skia's stroke/conic approximation is expressed in coordinate units. Work at
// a larger scale so native icon curves are not rounded with pixel-sized error.
const precisionScale=64;
function strokeRegion(path,opts){
  path.transform(precisionScale,0,0,0,precisionScale,0,0,0,1);
  const result=path.stroke({...opts,width:opts.width*precisionScale});
  path.transform(1/precisionScale,0,0,0,1/precisionScale,0,0,0,1);
  return result;
}
export function regionPathData(region){
  const copy=region.copy();
  try{
    const data=copy.transform(precisionScale,0,0,0,precisionScale,0,0,0,1).toSVGString();
    if((data.match(/[a-df-z]/gi)||[]).some(c=>!'MLQCZ'.includes(c)))throw new Error('Unexpected path export command');
    return data.replace(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi,v=>String(Number(v)/precisionScale));
  }finally{copy.delete();}
}

function geometry([tag,a]) {
  if(a.transform||a['stroke-dasharray'])throw new Error('Knockout authoring requires untransformed solid geometry');
  let d=a.d;
  if(tag==='circle')d=`M${a.cx-a.r} ${a.cy}A${a.r} ${a.r} 0 1 0 ${a.cx+a.r} ${a.cy}A${a.r} ${a.r} 0 1 0 ${a.cx-a.r} ${a.cy}Z`;
  if(tag==='ellipse')d=`M${a.cx-a.rx} ${a.cy}A${a.rx} ${a.ry} 0 1 0 ${a.cx+a.rx} ${a.cy}A${a.rx} ${a.ry} 0 1 0 ${a.cx-a.rx} ${a.cy}Z`;
  if(tag==='rect'){
    const{x,y,width:w,height:h}=a,r=Math.min(a.rx||0,w/2,h/2);
    d=r?`M${x+r} ${y}H${x+w-r}A${r} ${r} 0 0 1 ${x+w} ${y+r}V${y+h-r}A${r} ${r} 0 0 1 ${x+w-r} ${y+h}H${x+r}A${r} ${r} 0 0 1 ${x} ${y+h-r}V${y+r}A${r} ${r} 0 0 1 ${x+r} ${y}Z`:`M${x} ${y}h${w}v${h}h${-w}Z`;
  }
  const p=P.FromSVGString(d);if(!p)throw new Error('Invalid knockout source path');
  if(a['fill-rule']==='evenodd')p.setFillType(P.FillType.EVENODD);
  return p;
}
export function paintedRegion(nodes,g) {
  const result=P.NewPath();
  try{
    for(const node of nodes){
      const a=node[1],p=geometry(node);
      try{
        if(a.fill&&a.fill!=='none')result.op(p,P.PathOp.UNION);
        if(a.stroke!=='none'){
          const cap=a['stroke-linecap']||(g.corner==='sharp'?'square':'round'),join=a['stroke-linejoin']||(g.corner==='sharp'?'miter':'round');
          if(!strokeRegion(p,{width:a['stroke-width']||g.stroke,cap:P.StrokeCap[cap.toUpperCase()],join:P.StrokeJoin[join.toUpperCase()],miter_limit:3}))throw new Error('Stroke expansion failed');
          result.op(p,P.PathOp.UNION);
        }
      }finally{p.delete();}
    }
    return result;
  }catch(error){result.delete();throw error;}
}
export function offsetRegion(region,distance) {
  const edge=region.copy();
  try{
    if(!strokeRegion(edge,{width:distance*2,cap:P.StrokeCap.ROUND,join:P.StrokeJoin.ROUND}))throw new Error('Clearance expansion failed');
    return edge.op(region,P.PathOp.UNION);
  }catch(error){edge.delete();throw error;}
}
// Structural seams meet their own shell; they do not receive badge clearance.
// Clip expanded seam ink to the closed shell's interior, then retain the shell
// stroke. This prevents endpoint caps from protruding beyond rounded corners.
// Explorer-only variable-width output retains live strokes. SVG masks/clip
// paths avoid unstable Boolean operations on coincident edges at new widths.
// Fixed-width package artwork continues through the original PathKit pipeline.
const group=(nodes,attrs={})=>['g',attrs,nodes];
const solid=node=>[node[0],{...node[1],fill:'currentColor',stroke:'none'},node[2]];
function masked(nodes,paint,g) {
  const id='stroke-'+createHash('sha256').update(JSON.stringify([nodes,paint,g.s,g.stroke,g.corner])).digest('hex').slice(0,20);
  const box={x:-g.s*4,y:-g.s*4,width:g.s*9,height:g.s*9};
  return [['defs',{},[['mask',{id,...box,maskUnits:'userSpaceOnUse','mask-type':'luminance'},paint]]],group(nodes,{mask:`url(#${id})`})];
}
const whiteCanvas=g=>['rect',{x:-g.s*4,y:-g.s*4,width:g.s*9,height:g.s*9,fill:'white',stroke:'none'}];
function expanded(nodes,g,gap) {
  return nodes.map(([tag,a,children])=>{
    if(tag==='defs')return [tag,a,children];
    if(children)return [tag,a,expanded(children,g,gap)];
    // Dilate the actual painted outline, not its centerline: square caps and
    // sharp miters must retain their real envelope before the round offset.
    // Keep each outline separate; SVG unions the black mask coverage without
    // asking Skia to Boolean coincident edges at arbitrary widths.
    const {transform,...attrs}=a,ink=paintedRegion([[tag,attrs]],g);
    try{return ['path',{d:regionPathData(ink),fill:'currentColor',stroke:'currentColor',
      'stroke-width':gap*2,'stroke-linejoin':'round','stroke-linecap':'round',
      'fill-rule':ink.getFillTypeString(),...(transform?{transform}:{})}];}
    finally{ink.delete();}
  });
}
export function enclosedDetails(outline,details,g) {
  if(g.variableStroke)return [outline,...masked(details,[group([solid(outline)],{color:'white'})],g)];
  const inside=geometry(outline),ink=paintedRegion(details,g);
  try{
    if(!ink.op(inside,P.PathOp.INTERSECT))throw new Error('Detail containment failed');
    return [outline,['path',{d:regionPathData(ink),fill:'currentColor',stroke:'none','fill-rule':ink.getFillTypeString()}]];
  }finally{inside.delete();ink.delete();}
}
// An attached exterior stem must not invade the hollow object's interior.
// Retain the shell stroke and the stem's exposed end cap; only remove ink
// inside the closed shell. Unlike badge knockout this creates no clearance.
export function exteriorDetails(outline,details,g) {
  if(g.variableStroke)return [outline,...masked(details,[whiteCanvas(g),group([solid(outline)],{color:'black'})],g)];
  const inside=geometry(outline),ink=paintedRegion(details,g);
  try{
    if(!ink.op(inside,P.PathOp.DIFFERENCE))throw new Error('Exterior attachment clipping failed');
    return [outline,['path',{d:regionPathData(ink),fill:'currentColor',stroke:'none','fill-rule':ink.getFillTypeString()}]];
  }finally{inside.delete();ink.delete();}
}
// The shaft may enter a chevron, but its cap may not redefine the tip.
// Keep the rear half-plane open, and constrain only the forward join to the
// head's actual painted envelope plus its enclosed wedge. No knockout gap.
export function joinedArrow(shaft,head,points,g) {
  const [a,tip,b]=points,mid=[(a[0]+b[0])/2,(a[1]+b[1])/2];
  const length=Math.hypot(tip[0]-mid[0],tip[1]-mid[1]);
  const axis=[(tip[0]-mid[0])/length,(tip[1]-mid[1])/length],side=[-axis[1],axis[0]],far=g.s*4;
  const at=(u,v)=>[mid[0]+axis[0]*u+side[0]*v,mid[1]+axis[1]*u+side[1]*v];
  if(g.variableStroke){
    const rear=contour([at(0,-far),at(0,far),at(-far,far),at(-far,-far)],0,true);
    const paint=[whiteCanvas(g),['circle',{cx:tip[0],cy:tip[1],r:g.stroke*2+g.tip,fill:'black',stroke:'none'}],
      group([solid(rear),solid(head),head],{color:'white'})];
    return [...masked(shaft,paint,g),head];
  }
  const allowed=geometry(contour([at(0,-far),at(0,far),at(-far,far),at(-far,-far)],0,true));
  const wedge=geometry(head),edge=paintedRegion([head],g),ink=paintedRegion(shaft,g);
  const forbidden=geometry(['circle',{cx:tip[0],cy:tip[1],r:g.stroke*2+g.tip}]);
  try {
    allowed.op(wedge,P.PathOp.UNION);allowed.op(edge,P.PathOp.UNION);
    // Restrict the edit to the joint: a return arc can legitimately travel
    // ahead of the tip elsewhere in the same icon.
    forbidden.op(allowed,P.PathOp.DIFFERENCE);
    const removed=ink.copy();try{removed.op(forbidden,P.PathOp.INTERSECT);if(!removed.toSVGString().trim())return [...shaft,head];}finally{removed.delete();}
    ink.op(forbidden,P.PathOp.DIFFERENCE);
    return [['path',{d:regionPathData(ink),fill:'currentColor',stroke:'none','fill-rule':ink.getFillTypeString()}],head];
  }finally{allowed.delete();wedge.delete();edge.delete();ink.delete();forbidden.delete();}
}
export function knockout(background,foreground,g,{silhouettes=[]}={}) {
  if(g.variableStroke){
    // Nested arrow masks are preserved; expand live strokes, and include solid
    // badge interiors so background lines never show through their holes.
    const exclusion=[...expanded(foreground,g,clearance(g)),...expanded(silhouettes.map(solid),g,clearance(g))];
    return [...masked(background,[whiteCanvas(g),group(exclusion,{color:'black'})],g),...foreground];
  }
  const back=paintedRegion(background,g),front=paintedRegion(foreground,g);
  let exclusion;
  try{
    // Solid badges occlude their interior too. A cross or slash remains an open
    // stroke silhouette: never replace its shape with a rectangular bbox.
    for(const node of silhouettes){const p=geometry(node);try{front.op(p,P.PathOp.UNION);}finally{p.delete();}}
    exclusion=offsetRegion(front,clearance(g));
    if(!back.op(exclusion,P.PathOp.DIFFERENCE))throw new Error('Knockout subtraction failed');
    return [['path',{d:regionPathData(back),fill:'currentColor',stroke:'none','fill-rule':back.getFillTypeString()}],...foreground];
  }finally{back.delete();front.delete();exclusion?.delete();}
}
