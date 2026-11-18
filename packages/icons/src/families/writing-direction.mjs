import {paragraphSymbol} from './paragraph-tools.mjs';
import {horizontalArrow} from './core.mjs';
import {rotate} from './shared.mjs';
import {n} from '../geometry.mjs';

// Tabler's paragraph-over-arrow layout, rebuilt from our actual pilcrow and
// arrow mothers. Only the arrow changes direction; the letter never mirrors.
function writingDirection(g,rtl) {
  let arrow=horizontalArrow(g,{
    start:g.v(3,3.75,4.5),end:g.v(13,16.25,19.5),
    wing:g.v(11,13.75,16.5),half:g.v(1.75,2.25,2.75),
  });
  if(rtl)arrow=rotate(arrow,180,g);
  const offset=g.v(13,16.25,19.5)-g.c;
  return [...paragraphSymbol(g,{compact:true}),...arrow.map(([t,a,children])=>[t,{
    ...a,transform:`translate(0 ${n(offset)}) ${a.transform||''}`.trim(),
  },...(children?[children]:[])])];
}
export const writingDirections={
  'text-direction-ltr':g=>writingDirection(g,false),
  'text-direction-rtl':g=>writingDirection(g,true),
};
