import { contour } from '../geometry.mjs';
import { figure, mark } from './shared.mjs';
import { coreDrawings } from './core.mjs';
import { files } from './files.mjs';

const calendarFrame=g=>coreDrawings.calendar(g).slice(0,4);
function calendarWithClock(g) {
  const f=figure(g),{s,c,v,r}=g,l=v(2.5,3,3.5),t=v(3.5,4.5,5.5),b=v(14,17.5,21);
  return [contour([[v(6,7.5,9),b],[l,b],[l,t],[s-l,t],[s-l,v(7,8.75,10.5)]],r),
    ...calendarFrame(g).slice(1),f.circle(17,17,4.5),
    f.contour([[17,14.5],[17,17],[19,18]],false,g.tip)];
}
function clipboardPen(g) {
  const f=figure(g),{s,c,v,r}=g,l=v(3.5,4.5,5),t=v(3.5,4.5,5.5),b=v(14,17.5,21),w=v(5,6,7);
  return [contour([[v(6,7.5,9),b],[l,b],[l,t],[c-w/2,t]],r),
    contour([[c+w/2,t],[s-l,t],[s-l,v(6,7.5,9)]],r),coreDrawings.clipboard(g)[1],
    f.contour([[12,17],[18.5,10.5],[21.5,13.5],[15,20],[11.5,20.5]],true,g.tip),
    ...(g.s===16?[]:[f.line(17,12,20,15)])];
}
export const scheduling = {
  'calendar-plus':g=>[...calendarFrame(g),...mark(g,'plus',12,15)],
  'calendar-minus':g=>[...calendarFrame(g),...mark(g,'minus',12,15)],
  'calendar-x':g=>[...calendarFrame(g),...mark(g,'x',12,15)],
  'calendar-clock':calendarWithClock,
  'calendar-range'(g) {
    const f=figure(g);
    return [...calendarFrame(g),f.dot(7.5,14,g.stroke/2),f.line(11.5,14,16.5,14),
      f.line(7.5,18,12.5,18),f.dot(16.5,18,g.stroke/2)];
  },
  timer(g) {
    const f=figure(g),diagonal=7.5/Math.sqrt(2);
    return [f.circle(12,13.5,7.5),f.line(9.5,2.5,14.5,2.5),f.line(12,2.5,12,6),
      f.line(12+diagonal,13.5-diagonal,20,5.5),f.line(12,13.5,15,10.5)];
  },
  'clipboard-list'(g) {
    const f=figure(g),ys=g.s===16?[14]:[11.5,16.5];
    return [...coreDrawings.clipboard(g),...ys.flatMap(y=>[f.dot(8.5,y,g.stroke/2),f.line(12,y,15.5,y)])];
  },
  'clipboard-copy'(g) {
    const f=figure(g);
    // Same frame opening as clipboard-paste; the arrow now points into the board.
    return [...files['clipboard-paste'](g).slice(0,3),f.line(12,14.5,21,14.5),
      f.contour([[15.5,11],[12,14.5],[15.5,18]],false,g.tip)];
  },
  'clipboard-x':g=>[...coreDrawings.clipboard(g),...mark(g,'x',12,14)],
  'clipboard-pen':clipboardPen,
};
