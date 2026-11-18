import {layout} from './layout.mjs';
import {figure} from './shared.mjs';

function columns(g,count) {
  const f=figure(g);
  // Take the two-column mother's real frame. Shared boundaries leave more
  // room than drawing a separate rectangle around every column.
  return [layout['layout-columns'](g)[0],...Array.from({length:count-1},(_,i)=>
    ['path',{...f.line(3+18*(i+1)/count,4,3+18*(i+1)/count,20)[1],
      'stroke-linecap':'butt'}])];
}
export const multiColumn={
  'layout-columns-3':g=>columns(g,3),
  'layout-columns-4':g=>columns(g,4),
};
