import brands from './brands.json' with {type:'json'};
import {n} from './geometry.mjs';

// Silhouettes are brand assets, not outline UI glyphs. Corner and stroke controls
// must never deform them. Envelopes are chosen by density and aspect ratio, with
// proportionally more room at 16px to keep counters and separated parts readable.
export const brandEnvelopes={
  solid:[12.5,15.5,18.5],
  standard:[13,16,19],
  airy:[14,17.5,21],
  wide:[14,18,22],
  dense:[14,17.5,21],
};
export const brandCatalog=brands.map(({name,label,keywords,source,profile,aliasOf})=>({
  name,label,keywords:[label,...name.split('-'),'brand','logo','品牌',...keywords],
  category:'brands',categoryLabel:'品牌與平台',component:name.split('-').map(x=>x[0].toUpperCase()+x.slice(1)).join('')+'Icon',
  pilot:false,direction:'fixed',license:source.license,status:'alpha',
  rendering:'brand-silhouette',profile,source,...(aliasOf?{aliasOf}:{}),
}));
export const brandDrawings=Object.fromEntries(brands.map(brand=>[brand.name,g=>{
  const [x,y,w,h]=brand.bounds??brand.viewBox;
  const optical=brand.optical?.[g.s];
  const extent=optical?.extent??brandEnvelopes[brand.profile][[16,20,24].indexOf(g.s)];
  const scale=extent/Math.max(w,h);
  const tx=g.c-(x+w/2)*scale+(optical?.dx??0),ty=g.c-(y+h/2)*scale+(optical?.dy??0);
  return brand.paths.map(d=>['path',{
    d,fill:'currentColor',stroke:'none',
    transform:`translate(${n(tx)} ${n(ty)}) scale(${Number(scale.toFixed(8))})`,
  }]);
}]));

export function brandNotice(entry){
  const s=entry.source;
  return `Brand artwork: ${entry.label}.\nSource: ${s.reference}\n${s.library}; ${s.license}.\n${s.modifications}\nBrand names and marks belong to their respective owners; no affiliation or endorsement is implied.\nThe code license does not grant trademark rights. See THIRD_PARTY_NOTICES.md.${s.licenseFile?'\nAdditional artwork terms: '+s.licenseFile:''}${s.notice?'\n\n'+s.notice:''}`;
}
