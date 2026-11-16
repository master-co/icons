import { knockout } from '../occlusion.mjs';
import { figure, mark } from './shared.mjs';
import { coreDrawings } from './core.mjs';

const calendarFrame=g=>coreDrawings.calendar(g).slice(0,4);
function calendarWithClock(g) {
  const f=figure(g),clock=f.circle(17,17,4.5);
  return knockout(calendarFrame(g),[clock,f.contour([[17,14.5],[17,17],[19,18]],false,g.tip)],g,{silhouettes:[clock]});
}
// Move the pen right .75/down 2 on the 24-unit grid. Its offset consumes the
// bottom-right corner, while the sharp miter remains inside the viewBox.
function clipboardPen(g) {
  const f=figure(g),pencil=f.contour([[12.75,19],[19.25,12.5],[22.25,15.5],[15.75,22],[12.25,22.5]],true,g.tip);
  return knockout(coreDrawings.clipboard(g),[pencil,...(g.s===16?[]:[f.line(17.75,14,20.75,17)])],g,{silhouettes:[pencil]});
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
    return knockout(coreDrawings.clipboard(g),[f.line(12,14.5,21,14.5),
      f.contour([[15.5,11],[12,14.5],[15.5,18]],false,g.tip)],g);
  },
  'clipboard-x':g=>[...coreDrawings.clipboard(g),...mark(g,'x',12,14)],
  'clipboard-pen':clipboardPen,
};
