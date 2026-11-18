import {alignment} from './editor.mjs';
import {line} from '../geometry.mjs';

function verticalText(g,position) {
  const inset=g.v(2,2.5,3),lineGap=g.v(3,3.75,4.5);
  const start=position==='top'?g.v(4.75,5.75,7):
    position==='bottom'?g.s-g.v(4.75,5.75,7)-lineGap:g.c-lineGap/2;
  const toGrid=value=>value*24/g.s;
  const guides=[line(inset,inset,g.s-inset,inset),line(inset,g.s-inset,g.s-inset,g.s-inset)];
  return [...guides.map(([t,a])=>[t,{...a,opacity:.4}]),
    ...alignment(g,'center',{
      rows:[start,start+lineGap].map(toGrid),
      widths:[g.v(8,10,12),g.v(5,6.5,8)].map(toGrid),
    })];
}
export const cellAlignment={
  'cell-align-top':g=>verticalText(g,'top'),
  'cell-align-middle':g=>verticalText(g,'middle'),
  'cell-align-bottom':g=>verticalText(g,'bottom'),
};
