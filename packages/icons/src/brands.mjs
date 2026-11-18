import records from './brands.json' with {type:'json'};
import {n} from './geometry.mjs';
import {bakeBrandSvg} from '../../../scripts/lib/brand-ink.mjs';

const recordsByName = new Map(records.map(record => [record.name, record]));
export const brands = records.map(record => record.aliasOf
  ? {...recordsByName.get(record.aliasOf), ...record}
  : record);

// Original marks keep fixed geometry. Outline weights are baked at build time;
// brand-specific corners and optical placement remain independent of corner controls.
// Envelopes are chosen by density and aspect ratio, with
// proportionally more room at 16px to keep counters and separated parts readable.
export const brandEnvelopes={
  solid:[12.5,15.5,18.5],
  standard:[13,16,19],
  airy:[14,17.5,21],
  wide:[14,18,22],
  dense:[14,17.5,21],
};
export const brandCatalog=brands.map(({name,label,keywords,source,profile,aliasOf,styleOf})=>({
  name,label,keywords:[label,...name.split('-'),'brand','logo','品牌',...keywords],
  category:'brands',categoryLabel:'品牌與平台',component:name.split('-').map(x=>x[0].toUpperCase()+x.slice(1)).join('')+'Icon',
  pilot:false,direction:'fixed',license:source.license,status:'alpha',
  rendering:styleOf?'brand-outline':'brand-silhouette',...(styleOf?{styleOf}:{}),profile,source,...(aliasOf?{aliasOf}:{}),
}));
const outlineWeights=new Map();
const outlineStrokeWidths=new Map();
function sourceStrokeWidth(svg){
  if(!outlineStrokeWidths.has(svg))outlineStrokeWidths.set(svg,Number(svg.match(/<svg\b[^>]*\bstroke-width="([^"]+)"/)[1]));
  return outlineStrokeWidths.get(svg);
}
export const brandDrawings=Object.fromEntries(brands.map(brand=>[brand.name,g=>{
  const [x,y,w,h]=brand.bounds??brand.viewBox;
  const optical=brand.optical?.[g.s];
  const extent=optical?.extent??brandEnvelopes[brand.profile][[16,20,24].indexOf(g.s)];
  const scale=extent/Math.max(w,h);
  const tx=g.c-(x+w/2)*scale+(optical?.dx??0),ty=g.c-(y+h/2)*scale+(optical?.dy??0);
  let paths=brand.paths;
  let fillRule=brand.fillRule;
  if(brand.outlineSvg){
    // strokeWidth is in the native icon's units, not in each source logo's units.
    // Cancel the optical transform before expanding the ink, at every weight
    // including the default. Keep the placement fixed as the weight changes.
    const svg=brand.outlineSvgs?.[g.s]??brand.outlineSvg;
    const weight=g.stroke/(sourceStrokeWidth(svg)*scale),key=`${brand.name}/${g.s}/${weight}`;
    if(!outlineWeights.has(key))outlineWeights.set(key,bakeBrandSvg(svg,{weight}));
    const ink=outlineWeights.get(key);
    paths=[ink.d];fillRule=ink.fillRule;
  }
  return paths.map(d=>['path',{
    d,fill:'currentColor',stroke:'none',...(fillRule?{'fill-rule':fillRule}:{}),
    transform:`translate(${n(tx)} ${n(ty)}) scale(${Number(scale.toFixed(8))})`,
  }]);
}]));

export function brandNotice(entry){
  const s=entry.source;
  return `Brand artwork: ${entry.label}.\nSource: ${s.reference}\n${s.library}; ${s.license}.\n${s.modifications}\nBrand names and marks belong to their respective owners; no affiliation or endorsement is implied.\nThe code license does not grant trademark rights. See THIRD_PARTY_NOTICES.md.${s.licenseFile?'\nAdditional artwork terms: '+s.licenseFile:''}${s.notice?'\n\n'+s.notice:''}`;
}
