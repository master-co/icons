import {figure,mark} from '../families/shared.mjs';
import {coreDrawings} from '../families/core.mjs';
import {typography} from '../families/typography.mjs';
import {knockout} from '../occlusion.mjs';

export const paste={
  'paste-plain-text'(g) {
    const f=figure(g);
    return [...coreDrawings.clipboard(g),f.line(8.7,10.7,15.3,10.7),f.line(12,11,12,17)];
  },
  'paste-values'(g) {
    const f=figure(g);
    return [...coreDrawings.clipboard(g),f.contour([[7.7,12.2],[9.2,11],[9.2,17]]),
      f.path('M12.2 12C12.8 9.6 16.9 10.3 16.1 12.9C15.7 14 13.5 15.6 12.3 17H16.4')];
  },
  'paste-formula'(g) {
    const f=figure(g);
    return [...coreDrawings.clipboard(g),f.path('M15.6 10.3C13.5 8.8 12.4 10.5 12 12.9L11.6 15.2C11.2 17.8 10 18.3 8.5 17.4'),f.line(9.3,13.4,14.5,13.4)];
  },
  'paste-format'(g) {
    const f=figure(g),handle=f.contour([[15.5,14.3],[20.4,10],[21.8,11.5],[18,16.6]],true,g.tip);
    const bristles=f.path('M15.5 14.4C11.4 13.7 12.6 18.6 9.7 20.2C14.3 21.8 18.4 19.8 17.9 16.7Z');
    return knockout(coreDrawings.clipboard(g),[handle,bristles],g,{silhouettes:[handle,bristles]});
  },
  'paste-link'(g) {
    const f=figure(g),chain=[f.path('M13.1 16.1L12 17.2C9.8 19.4 13 22.6 15.2 20.4L17 18.6M16.9 14.5L18.4 13C20.6 10.8 23.6 14 21.5 16.1L20.2 17.4'),f.line(14.2,18.2,19.1,13.3)];
    return knockout(coreDrawings.clipboard(g),chain,g);
  },
  'format-painter'(g) {
    const f=figure(g);
    return [f.rect(3.5,3.6,12.8,5.7,Math.min(g.r,1.3)),f.contour([[16.4,6.4],[20,6.4],[20,12.2],[12,14.3],[12,16.1]],false,g.r),
      f.rect(10.3,16.1,3.4,5,Math.min(g.r,1.3)),f.line(3.5,14,7.2,14),f.line(3.5,18.2,6.5,18.2)];
  },
  'clear-contents'(g) {
    const f=figure(g);
    return [f.rect(2.8,5.5,18.4,13),f.line(6.1,12,9.2,12),...mark(g,'x',15.4,12)];
  },
  'clear-highlighting':g=>knockout(typography.highlighter(g),mark(g,'x',18.7,17.8),g),
};
