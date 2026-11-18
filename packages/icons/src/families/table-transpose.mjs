import {tableGrid} from './analytics.mjs';
import {returnArrow} from '../expansion/utilities.mjs';

export function transposeParts(g) {
  // Keep small cell strips rectangular while preserving each corner preset.
  const radius=Math.min(g.r*.4,g.v(.8,1,1.2));
  const row=tableGrid(g,{bounds:[2.5,16.5,10,5],dividers:[[7.5,16.5,7.5,21.5]],radius});
  const column=tableGrid(g,{bounds:[16.5,2.5,5,10],dividers:[[16.5,7.5,21.5,7.5]],radius});
  const exchange=returnArrow(g,{direction:'down',left:4.5,right:12,top:4.5,bottom:12,
    wing:2.25,radius:g.v(1.5,2,2.5),bothEnds:true});
  return {row,column,exchange};
}

export const transposeDrawings={
  'table-transpose':g=>{const p=transposeParts(g);return [...p.row,...p.column,...p.exchange];},
};
