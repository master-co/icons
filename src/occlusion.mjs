// Authoring-only Boolean geometry. PathKit/WASM never enters SVG or React output.
import {readFile} from 'node:fs/promises';
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
export function knockout(background,foreground,g,{silhouettes=[]}={}) {
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
