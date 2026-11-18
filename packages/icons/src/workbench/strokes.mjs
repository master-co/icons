import {figure} from '../families/shared.mjs';

// The two ticks mark the end of the underlying path. Only the ink extending
// beyond those ticks changes between cap samples.
function cap(g,style) {
  const f=figure(g),axis=14.4,end=style==='square'?18.7:axis;
  const sample=style==='round'?f.path('M3.5 7.8H14.4A4.2 4.2 0 0 1 14.4 16.2H3.5'):
    f.contour([[3.5,7.8],[end,7.8],[end,16.2],[3.5,16.2]],false,0);
  return [sample,f.line(axis,2.9,axis,4.9),f.line(axis,19.1,axis,21.1)];
}
function join(g,style) {
  const f=figure(g);
  const shoulder={miter:'H20V12',round:'H12A8 8 0 0 1 20 12',bevel:'H12L20 12'}[style];
  return [f.path('M3.7 4'+shoulder+'V20H13V11H3.7Z')];
}
export const strokes={
  'stroke-cap-butt':g=>cap(g,'butt'),
  'stroke-cap-round':g=>cap(g,'round'),
  'stroke-cap-square':g=>cap(g,'square'),
  'stroke-join-miter':g=>join(g,'miter'),
  'stroke-join-round':g=>join(g,'round'),
  'stroke-join-bevel':g=>join(g,'bevel'),
  'stroke-double'(g) {
    const f=figure(g);
    return [f.line(3.5,15.3,15.3,3.5),f.line(8.7,20.5,20.5,8.7)];
  },
  'stroke-dotted'(g) {
    const f=figure(g);
    return [3.8,7.9,12,16.1,20.2].map(x=>f.dot(x,12,g.v(1.22,1.12,1.08)));
  },
};
