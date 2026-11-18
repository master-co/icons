import {figure,mark} from '../families/shared.mjs';
import {knockout} from '../occlusion.mjs';

function scopeCorners(g) {
  const f=figure(g);
  return [f.contour([[3.5,8],[3.5,3.8],[7.9,3.8]],false,g.r),f.contour([[16.1,3.8],[20.5,3.8],[20.5,8]],false,g.r),
    f.contour([[20.5,16],[20.5,20.2],[16.1,20.2]],false,g.r),f.contour([[7.9,20.2],[3.5,20.2],[3.5,16]],false,g.r)];
}
function stack(g) {
  const f=figure(g);
  return [f.contour([[3,16.2],[3,3.4],[15.3,3.4]],false,g.r),f.rect(7,7.3,12.2,13.2)];
}
export const controls={
  'select-all':g=>[...scopeCorners(g),figure(g).contour([[7.3,12.1],[10.6,15.4],[16.7,8.8]])],
  'deselect-all':g=>[...scopeCorners(g),figure(g).line(7.8,12,16.2,12)],
  'batch-edit'(g) {
    const f=figure(g),pen=f.contour([[12,17.4],[18.8,10.6],[21.6,13.4],[14.8,20.2],[11.4,20.8]],true,g.tip);
    return knockout(stack(g),[pen],g,{silhouettes:[pen]});
  },
  'batch-delete':g=>knockout(stack(g),mark(g,'x',18.5,18.2),g),
  'batch-download'(g) {
    const f=figure(g),arrow=f.arrow([f.line(17.5,12.1,17.5,20.7)],[[14,17.2],[17.5,20.7],[21,17.2]]);
    return knockout(stack(g),arrow,g);
  },
  breadcrumb(g) {
    const f=figure(g);
    return [f.line(2.6,12,7.1,12),f.contour([[10.3,7.8],[14.3,12],[10.3,16.2]]),f.line(17.6,12,21.4,12)];
  },
  pagination(g) {
    const f=figure(g);
    return [f.contour([[5.5,9],[2.7,12],[5.5,15]]),f.contour([[9.5,8.9],[12.5,6.3],[12.5,17.6]]),f.line(9.8,17.6,15.1,17.6),
      f.contour([[18.5,9],[21.3,12],[18.5,15]])];
  },
  stepper(g) {
    const f=figure(g),r=g.v(2.45,2.4,2.35);
    return [f.circle(4.4,12,r),f.dot(12,12,r+.65),f.circle(19.6,12,r),
      f.line(4.4+r,12,12,12),f.line(12,12,19.6-r,12)];
  },
  carousel(g) {
    const f=figure(g);
    return [f.rect(6.8,4.5,10.4,15),f.contour([[3.4,6.7],[2.3,6.7],[2.3,17.3],[3.4,17.3]],false,g.tip),
      f.contour([[20.6,6.7],[21.7,6.7],[21.7,17.3],[20.6,17.3]],false,g.tip)];
  },
  'command-palette'(g) {
    const f=figure(g);
    return [f.rect(2.6,4,18.8,16),f.contour([[6.1,7.2],[8.9,9.6],[6.1,12]]),f.line(11.6,10.5,16.8,10.5),f.line(6.1,16,15,16)];
  },
};
