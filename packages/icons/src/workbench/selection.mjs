import {figure,mark} from '../families/shared.mjs';
import {knockout} from '../occlusion.mjs';

function changeSelection(g,kind) {
  const f=figure(g);
  return [f.contour([[3.5,8],[3.5,4],[7.5,4]],false,g.tip),f.line(11.3,4,14.2,4),
    f.contour([[17.8,4],[20.5,4],[20.5,8]],false,g.tip),f.line(3.5,11.7,3.5,14.1),
    f.contour([[3.5,17.5],[3.5,20],[8,20]],false,g.tip),f.line(11.3,20,13.2,20),...mark(g,kind,18.2,16.5)];
}
function magnifier(g) {
  const f=figure(g);
  return [f.circle(10.3,10.3,7.2),f.line(15.5,15.5,21,21)];
}
function ratio(g,locked) {
  const f=figure(g),body=f.rect(13.3,15,8,5.9,Math.min(g.r,1.1));
  const shackle=locked?f.path('M15 15V12.9C15 9.7 19.6 9.7 19.6 12.9V15'):
    f.path('M19.2 15V10.5C19.2 6.2 13.1 6.2 13.1 10.2');
  return knockout([f.rect(2.8,4.4,17.8,13.5),f.contour([[6.5,11.3],[6.5,8.1],[10.3,8.1]])],
    [body,shackle],g,{silhouettes:[body]});
}
export const selection={
  'selection-add':g=>changeSelection(g,'plus'),
  'selection-subtract':g=>changeSelection(g,'minus'),
  'selection-intersect'(g) {
    const f=figure(g);
    return [f.rect(8.8,8.8,6.4,6.4),f.contour([[3.3,8],[3.3,3.3],[8,3.3]],false,g.tip),
      f.line(12.5,3.3,15.2,3.3),f.line(3.3,12.5,3.3,15.2),
      f.contour([[16,20.7],[20.7,20.7],[20.7,16]],false,g.tip),f.line(8.8,20.7,11.5,20.7),f.line(20.7,8.8,20.7,11.5)];
  },
  'selection-invert'(g) {
    const f=figure(g);
    return [f.rect(3.1,3.1,17.8,17.8),f.rect(8.6,8.6,6.8,6.8,Math.min(g.r,1)),
      f.line(3.6,8.5,8.5,3.6),f.line(15.5,20.4,20.4,15.5)];
  },
  'zoom-selection'(g) {
    const f=figure(g);
    return [...magnifier(g),f.contour([[6.9,10],[6.9,6.9],[10,6.9]]),f.contour([[13.7,10.6],[13.7,13.7],[10.6,13.7]])];
  },
  'zoom-actual-size'(g) {
    const f=figure(g);
    return [...magnifier(g),f.contour([[8.5,8.7],[10.9,6.9],[10.9,13.6]]),f.line(8.9,13.6,12.9,13.6)];
  },
  'lock-aspect-ratio':g=>ratio(g,true),
  'unlock-aspect-ratio':g=>ratio(g,false),
};
