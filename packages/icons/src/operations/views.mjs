import {figure,mark} from '../families/shared.mjs';
import {coreDrawings} from '../families/core.mjs';
import {knockout} from '../occlusion.mjs';

function density(g,compact) {
  const f=figure(g),rows=compact?[6.2,10.1,14,17.9]:[7.4,16.6];
  return [f.contour([[4.8,3.2],[3,3.2],[3,20.8],[4.8,20.8]],false,g.tip),
    ...rows.map(y=>f.line(8,y,20.8,y))];
}
export const views={
  'filter-add':g=>knockout(coreDrawings.filter(g),mark(g,'plus',18.2,17),g),
  'filter-save'(g) {
    const f=figure(g),tag=f.contour([[14.8,12],[21,12],[21,21],[17.9,18.7],[14.8,21]],true,g.tip);
    return knockout(coreDrawings.filter(g),[tag],g,{silhouettes:[tag]});
  },
  'filter-check'(g) {
    const f=figure(g);
    return knockout(coreDrawings.filter(g),[f.contour([[14.6,16.9],[17.2,19.4],[21.7,14.2]])],g);
  },
  'list-filter'(g) {
    const f=figure(g);
    return [f.line(3.1,5.2,20.9,5.2),f.line(3.1,11.2,9.2,11.2),f.line(3.1,17.2,7.5,17.2),
      f.contour([[12,10.5],[21.2,10.5],[17.8,14.9],[17.8,19.3],[15.3,20.4],[15.3,15]],true,g.tip)];
  },
  'group-by'(g) {
    const f=figure(g);
    return [f.line(3.6,4.3,16.8,4.3),f.contour([[5.3,8.3],[5.3,18.8],[9.1,18.8]],false,g.tip),
      f.line(5.3,11.6,9.1,11.6),f.line(12.3,11.6,21,11.6),f.line(12.3,18.8,18.7,18.8)];
  },
  'ungroup-rows'(g) {
    const f=figure(g);
    return [f.contour([[4.2,3.9],[4.2,8.3],[7.5,8.3]]),f.contour([[4.2,13.6],[4.2,18],[7.5,18]]),
      f.line(10,8.3,20.8,8.3),f.line(10,18,20.8,18)];
  },
  'density-compact':g=>density(g,true),
  'density-comfortable':g=>density(g,false),
  'columns-settings'(g) {
    const f=figure(g);
    const sliders=[f.line(12,13.3,21.2,13.3),f.line(14.8,11.4,14.8,15.2),f.line(12,19,21.2,19),f.line(18.6,17.1,18.6,20.9)];
    return knockout([f.rect(3,3.8,16,16.1),f.line(8.8,4.3,8.8,19.4)],sliders,g);
  },
  'sort-multiple'(g) {
    const f=figure(g);
    return [...f.arrow([f.line(6.4,3.8,6.4,18.4)],[[3.5,15.5],[6.4,18.4],[9.3,15.5]]),
      ...f.arrow([f.line(15.8,10.2,15.8,20.1)],[[13.1,17.4],[15.8,20.1],[18.5,17.4]]),
      f.line(12.4,4.4,20.8,4.4),f.line(16.4,8,20.8,8)];
  },
};
