import {weightDelta} from '../geometry.mjs';
import {file} from './core.mjs';
import {figure} from './shared.mjs';

// Adapted from Tabler's signature convention: a continuous looped initial
// followed by two descending handwritten shoulders. The loop is broader and
// the two shoulders have tangent-continuous turns, including at 16px.
// Handwriting has no polygonal corners; its curves are structural in all
// three corner presets. See rebuild-provenance.json for the fixed MIT source.
function signatureStroke(g, onPaper=false){
  const f=figure(g);
  const p=(x,y)=>{
    if(!onPaper)return `${x} ${y}`;
    const base=g.v(16.5,17.4,17.65), height=g.v(.52,.4,.39);
    return `${8.05+(x-3)*.58} ${base+(y-17)*height}`;
  };
  // Both signatures cross the same rising entry with a returning loop.
  // On paper retain one shoulder and a lighter trailing pen stroke.
  const initial=`M${p(3,17)}C${p(6,14)} ${p(9,10.5)} ${p(9,7.5)}`+
    `C${p(9,3.5)} ${p(4.5,4)} ${p(4.5,8)}C${p(4.5,12)} ${p(7.5,17)} ${p(10,17)}`;
  const tail=onPaper
    ? `C${p(11.5,17)} ${p(12,14.5)} ${p(12.8,14.1)}Q${p(13.5,13.7)} ${p(13.8,15.2)}C${p(14.3,17.1)} ${p(15.8,16.4)} ${p(16.8,15.9)}`
    : 'C11.5 17 12 14.8 12.7 13.3C13.1 12.5 13.5 12.6 13.6 13.5C13.85 15.75 14.5 17 16 17C17.2 17 17.8 14.5 19 14.5C20 14.5 20 16 21 16.5';
  const stroke=f.path(initial+tail);
  if(onPaper)stroke[1]['stroke-width']=g.stroke*.76;
  return stroke;
}

export const signatureDrawings={
 signature:g=>[signatureStroke(g)],
 contract:g=>{
   const f=figure(g);
   const document=file(g);
   if(g.s>16){
     const clause=f.line(8.8,10,12.5-weightDelta(g)*1.45,10);
     clause[1]['stroke-width']=g.stroke*.8;
     document.push(clause);
   }
   return [...document,signatureStroke(g,true)];
 },
};
