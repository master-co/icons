import {weightDelta,line} from '../geometry.mjs';
import { enclosedDetails, knockout } from '../occlusion.mjs';
import { figure, mark } from './shared.mjs';
import { coreDrawings } from './core.mjs';

const calendarFrame=g=>coreDrawings.calendar(g).slice(0,4);
function calendarWithClock(g) {
  const f=figure(g),clock=f.circle(17,17,4.5);
  // A badge needs shorter hands than a scaled full-size clock: retain visible
  // air between both hand caps and the ring at 16px.
  return knockout(calendarFrame(g),[clock,f.contour([[17,15],[17,17],[18.5,18]],false,g.tip)],g,{silhouettes:[clock]});
}
// The lower barrel edge covers the clipboard corner including its sharp
// painted miter, so the knockout cannot leave an isolated corner fragment.
function clipboardPen(g) {
  const f=figure(g),shift=weightDelta(g)*g.v(4,2,1.5),divider=weightDelta(g)*g.v(0,2,1.5),pencil=f.contour([[12.75,19],[19.25,12.5],[22.625,15.875],[16.125,22.375],[12.25,22.5]].map(([x,y])=>[x-shift,y-shift]),true,g.tip);
  const pen=g.s===16?[pencil]:enclosedDetails(pencil,[f.line(17.75-shift-divider,14-shift+divider,21.125-shift-divider,17.375-shift+divider)],g);
  return knockout(coreDrawings.clipboard(g),pen,g,{silhouettes:[pencil]});
}
export const scheduling = {
  'calendar-plus':g=>{
    const y=g.v(10,12.5,15),h=g.v(1.25,1.75,2.25);
    return [...calendarFrame(g),line(g.c-h,y,g.c+h,y),line(g.c,y-h,g.c,y+h)];
  },
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
    return knockout(coreDrawings.clipboard(g),f.arrow([f.line(12,14.5,21,14.5)],[[15.5,11],[12,14.5],[15.5,18]]),g);
  },
  'clipboard-x':g=>[...coreDrawings.clipboard(g),...mark(g,'x',12,14)],
  'clipboard-pen':clipboardPen,
};
