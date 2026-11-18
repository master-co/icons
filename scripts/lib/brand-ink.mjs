// Authoring-only expansion. Inset ink preserves the brand's exact outer silhouette.
import {paintedRegion,regionPathData,offsetRegion,pathKit as P} from '../../packages/icons/src/occlusion.mjs';
const attrs=text=>Object.fromEntries([...text.matchAll(/([\w-]+)="([^"]*)"/g)].map(m=>[m[1],m[2]]));
export function bakeBrandSvg(svg,{width,weight=1}={}){
 const root=attrs(svg.match(/<svg\b([^>]+)>/)[1]);
 const common={fill:root.fill||'none',stroke:root.stroke||'currentColor','stroke-width':width??+(root['stroke-width']||1.75),'stroke-linecap':root['stroke-linecap']||'round','stroke-linejoin':root['stroke-linejoin']||'round'};
 const ink=P.NewPath(),parts=[];
 try{
 for(const m of svg.matchAll(/<path\b([^>]+)>/g)){
  const a={...common,...attrs(m[1])};let region;
  const baseWidth=+a['stroke-width'];
  a['stroke-width']=baseWidth*weight;
  if(a['data-ink']==='inside'){
   const original=P.FromSVGString(a.d);if(!original)throw Error('Invalid inset brand contour');
   if(a['fill-rule']==='evenodd')original.setFillType(P.FillType.EVENODD);
   region=original.copy();region.transform(64,0,0,0,64,0,0,0,1);
   region.stroke({width:baseWidth*Math.min(weight,1)*128,cap:P.StrokeCap.ROUND,join:P.StrokeJoin.ROUND});
   region.transform(1/64,0,0,0,1/64,0,0,0,1);region.op(original,P.PathOp.INTERSECT);original.delete();
   // Above the native weight grow both edges of the reviewed ink. Pushing all
   // extra weight inward would close narrow letter counters (f, TikTok, Vimeo).
   if(weight>1){const grown=offsetRegion(region,baseWidth*(weight-1)/2);region.delete();region=grown;}
  }else region=paintedRegion([['path',a]],{stroke:+common['stroke-width'],corner:'soft'});
  parts.push({a,region});
 }
 // The foreground's actual ink, expanded outwards, cuts only its named backdrop.
 // Recompute after width changes; keep the result transparent on every background.
 for(const {a,region} of parts)if(a['data-cut']){
  const target=parts.find(part=>part.a.id===a['data-cut']);
  if(!target)throw Error(`Unknown brand knockout target: ${a['data-cut']}`);
  const clearance=offsetRegion(region,+(a['data-clearance']||1));
  try{target.region.op(clearance,P.PathOp.DIFFERENCE)}finally{clearance.delete()}
 }
 for(const {region} of parts)ink.op(region,P.PathOp.UNION);
 const b=ink.computeTightBounds(),fillRule=ink.getFillTypeString();
 const d=regionPathData(ink).replace(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi,v=>String(Number(Number(v).toFixed(6))));
 return {d,fillRule,bounds:[b.fLeft,b.fTop,b.fRight-b.fLeft,b.fBottom-b.fTop].map(n=>Number(n.toFixed(6)))};
 }finally{for(const {region}of parts)region.delete();ink.delete()}
}
