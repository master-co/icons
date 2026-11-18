import {figure,mark} from '../families/shared.mjs';
import {coreDrawings} from '../families/core.mjs';
import {knockout} from '../occlusion.mjs';

function shortcut(g,base) {
  const f=figure(g);
  const arrow=f.arrow([f.path('M3.2 20.7C3.8 16.8 5.7 14.5 10.5 14.5H13.3')],[[9.8,11.3],[13.3,14.5],[9.8,17.7]]);
  return knockout(base,arrow,g);
}
function shared(g,base) {
  const f=figure(g),head=f.circle(17.6,13.8,2.3);
  const shoulders=f.path('M13.3 21V20.1C13.3 16.1 21.9 16.1 21.9 20.1V21');
  return knockout(base,[head,shoulders],g,{silhouettes:[head,shoulders]});
}
export const files={
  'trash-restore'(g) {
    const f=figure(g);
    return [f.contour([[5.9,10.8],[7,20.7],[17,20.7],[18.1,10.8]],false,g.r),f.line(3.9,10.5,20.1,10.5),
      ...f.arrow([f.path('M16.9 8C16.6 5.6 14.7 5 12.6 5H8.1')],[[10.7,2.9],[8.1,5],[10.7,7.3]])];
  },
  'trash-empty'(g) {
    const f=figure(g);
    return [f.contour([[5.6,9.7],[18.4,9.7],[17.5,20.9],[6.5,20.9]],true,g.r),f.line(3.9,6.3,19.3,3.3),
      ...mark(g,'x',12,15.4)];
  },
  'file-shortcut':g=>shortcut(g,coreDrawings.file(g)),
  'file-shared':g=>shared(g,coreDrawings.file(g)),
  'file-history'(g) {
    const f=figure(g),arc=f.path('M12.1 15C13.5 11.3 18.4 10.3 20.6 13.8C23.1 18.4 18.1 23.3 14 20.2');
    const arrow=f.arrow([arc],[[11.9,12.1],[12.1,15],[15.2,15]]);
    return knockout(coreDrawings.file(g),[...arrow,f.contour([[17.1,14],[17.1,16.5],[18.8,17.3]])],g,{silhouettes:[arc]});
  },
  'file-sync'(g) {
    const f=figure(g);
    const upper=f.arrow([f.path('M12.2 14.9Q15.5 9.4 20.9 13.7')],[[20.7,11],[20.9,13.7],[18.1,13.9]]);
    const lower=f.arrow([f.path('M21.2 17.3Q18 22.9 12.5 18.5')],[[12.7,21.2],[12.5,18.5],[15.2,18.3]]);
    return knockout(coreDrawings.file(g),[...upper,...lower],g);
  },
  'folder-shared':g=>shared(g,coreDrawings.folder(g)),
  'folder-shortcut':g=>shortcut(g,coreDrawings.folder(g)),
  'folder-favorite'(g) {
    const f=figure(g),star=f.contour([[16,9.9],[17.8,13.5],[21.1,14.1],[18.6,17],[19.1,20.6],[16,18.9],[12.8,20.6],[13.3,17],[10.8,14.1],[14.2,13.5]],true,g.tip);
    return knockout(coreDrawings.folder(g),[star],g,{silhouettes:[star]});
  },
  'file-offline'(g) {
    const f=figure(g);
    return knockout(coreDrawings.file(g),[f.contour([[11.8,17.9],[11.8,20.6],[21.3,20.6],[21.3,17.9]],false,g.tip),
      f.contour([[13.6,14.5],[15.9,16.8],[20.2,12.5]])],g);
  },
};
