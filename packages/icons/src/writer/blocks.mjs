import {figure,mark} from '../families/shared.mjs';
import {knockout} from '../occlusion.mjs';

function listRows(f) {
  return [f.line(12.5,7.5,20.8,7.5),f.line(12.5,16.5,19,16.5)];
}

function insertBlock(g,above) {
  const f=figure(g),y=above?11:3;
  return [f.rect(3.5,y,17,9.5),f.line(7,y+4.75,13.4,y+4.75),
    ...mark(g,'plus',12,above?5.1:18.8)];
}
function moveBlock(g,up) {
  const f=figure(g),end=up?5:19,wing=up?8:16;
  return [f.rect(2.5,5.5,11.5,13),f.line(5.5,10,10.7,10),f.line(5.5,14,9.1,14),
    ...f.arrow([f.line(19,up?19:5,19,end)], [[16.4,wing],[19,end],[21.6,wing]])];
}
export const blocks={
  'list-alpha'(g) {
    const f=figure(g);
    return [...listRows(f),f.path('M8.5 5.1V10M8.5 6.4C7.3 3.6 3.1 4.6 3.1 7.4S7.4 11.1 8.5 8.5M3.7 13V20M3.7 16.5C5 14 9.1 14.8 9.1 17.6S4.8 20.8 3.7 18.6')];
  },
  'list-roman'(g) {
    const f=figure(g);
    return [...listRows(f),f.line(6,5,6,10),f.line(4,14,4,19),f.line(8,14,8,19)];
  },
  'list-restart'(g) {
    const f=figure(g);
    return [f.path('M4.3 14.2L7.1 12V20M4.8 20H9.4'),f.line(13,17,21,17),
      ...f.arrow([f.path('M20.5 11V9C20.5 6 18.8 5 16.3 5H5')],[[8.1,2.4],[5,5],[8.1,7.8]])];
  },
  'list-continue'(g) {
    const f=figure(g);
    return [f.line(3.5,4.2,16,4.2),...f.arrow([f.contour([[4,9],[4,16.5],[9,16.5]],false,g.r)],[[6.5,14],[9,16.5],[6.5,19]]),
      f.path('M13.7 13C14.4 9.6 20.1 10 20 13.4C20 15.4 16.8 17.1 13.9 20H20.6')];
  },
  'block-copy'(g) {
    const f=figure(g);
    return [f.contour([[3,14.3],[3,4],[16,4]],false,g.r),f.rect(7,8.3,14,11.7),f.line(10.4,14,17.6,14)];
  },
  'block-delete'(g) {
    const f=figure(g);
    return knockout([f.rect(2.8,5.3,17.5,13.5),f.line(6.1,10.5,13.8,10.5)],mark(g,'x',19,18),g);
  },
  'block-insert-above':g=>insertBlock(g,true),'block-insert-below':g=>insertBlock(g,false),
  'block-move-up':g=>moveBlock(g,true),'block-move-down':g=>moveBlock(g,false),
};
