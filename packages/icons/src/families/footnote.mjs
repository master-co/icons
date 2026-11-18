import {capitalA,lowerB} from './letter-case.mjs';
import {numeral} from './heading-levels.mjs';

// Text-reference mark, based on the established Ab¹ footnote command.
// All three glyphs share the existing typography family; native spacing is
// authored here instead of shrinking a complete source icon.
export function footnoteParts(g){
 const baseline=g.v(13,16.5,20),top=g.v(5,6.25,7.5);
 // The wider 16px A puts a real raster cell inside its counter at DPR 1.
 const a=capitalA(g,{left:g.v(1.5,2,2.5),top,width:g.v(6,6.25,7.5),height:baseline-top});
 const b=lowerB(g,{left:g.v(10,11.25,13.5),top:baseline-g.v(4,5,6),width:g.v(3.5,4.5,5.5),height:g.v(4,5,6),stemTop:top});
 const marker=numeral(g,1,{x:g.v(12,15,18),bottom:g.v(6.5,8,9.5),width:g.v(3,3.75,4.5),height:g.v(4,5,6)});
 return {a,b,marker,nodes:[...a,...b,...marker]};
}
export const footnoteDrawings={footnote:g=>footnoteParts(g).nodes};
