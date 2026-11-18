import {capitalA} from './letter-case.mjs';
import {line} from '../geometry.mjs';

// Lucide text-initial composition, rebuilt with the existing capital A.
// Two short lines sit beside the initial; the final line returns to full width.
export function dropCapParts(g){
  const box={left:g.v(2,2.5,3),top:g.v(3,3.5,4.5),width:g.v(6,7,8.5),height:g.v(6,7.75,9)};
  const a=capitalA(g,box),right=g.v(14,17.5,21),short=g.v(10.5,13,15.5);
  const rows=[line(short,box.top,right,box.top),line(short,box.top+box.height,right,box.top+box.height),line(box.left,g.v(13,16.75,20.5),right,g.v(13,16.75,20.5))];
  return {a,rows,box,nodes:[...a,...rows]};
}
export const dropCapDrawings={'drop-cap':g=>dropCapParts(g).nodes};
