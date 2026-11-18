import {circle} from '../geometry.mjs';
import {horizontalArrow} from './core.mjs';
import {numeral} from './heading-levels.mjs';

// Lucide decimals-arrow-{right,left} motif, adapted to native Master geometry.
// The numeral count is the primary cue; the arrow shares the core mother.
export function decimalParts(g,increase=true){
  const bottom=g.v(7.5,9.5,11.5),width=g.v(3.25,4,5),height=g.v(5,6.5,8);
  const xs=increase?[g.v(5,6,7),g.v(10.75,13.25,15.5)]:[g.v(5,6,7)];
  const numerals=xs.flatMap(x=>numeral(g,0,{x,bottom,width,height}));
  const dot=circle(g.v(2.25,2.75,3.25),bottom,g.stroke/2,{fill:'currentColor',stroke:'none'});
  const start=g.v(7,8.75,10.5),end=g.v(13.5,17,20.5),y=g.v(12.5,15.5,18.5);
  const arrow=horizontalArrow({...g,c:y},{start,end,wing:end-g.v(2.25,2.75,3.25),half:g.v(2.25,2.75,3.25)});
  const placedArrow=increase?arrow:[['g',{transform:`translate(${start+end} 0) scale(-1 1)`},arrow]];
  return {numerals,dot,arrow:placedArrow,boxes:xs.map(x=>({x,y:bottom-height,width,height})),nodes:[dot,...numerals,...placedArrow]};
}
export const decimalDrawings={
  'decimal-increase':g=>decimalParts(g,true).nodes,
  'decimal-decrease':g=>decimalParts(g,false).nodes,
};
