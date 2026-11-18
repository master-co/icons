import {coreDrawings} from '../families/core.mjs';
import {figure} from '../families/shared.mjs';

// Leave the wire binding and the header rule in the same native positions as
// calendar-range. The payload occupies the lower panel in every mode.
const frame=g=>coreDrawings.calendar(g).slice(0,4);

function period(g,next) {
  const f=figure(g),end=next?16.5:7.5,wing=next?13.5:10.5;
  return [...frame(g),...f.arrow([f.line(24-end,15.1,end,15.1)],[[wing,12.3],[end,15.1],[wing,17.9]])];
}
function endpoint(g,start) {
  const f=figure(g),x=start?8:16;
  return [...frame(g),f.dot(x,15.2,g.v(2.55,2.45,2.35)),f.line(start?9.2:7.3,15.2,start?16.7:14.8,15.2)];
}
export const dates={
  'calendar-today'(g) {
    const f=figure(g);
    return [...frame(g),f.circle(12,15.1,2.65)];
  },
  'calendar-day-view'(g) {
    const f=figure(g);
    return [...frame(g),f.line(7.5,12.7,7.5,17.8),f.line(10.8,13.1,16.7,13.1),f.line(10.8,17,14.2,17)];
  },
  'calendar-week'(g) {
    const f=figure(g);
    return [...frame(g),...[9.1,14.9].map(x=>{
      const divider=f.line(x,g.v(9.75,9.6,10),x,21);
      divider[1]['stroke-linecap']='butt';return divider;
    })];
  },
  'calendar-agenda'(g) {
    const f=figure(g);
    return [...frame(g),...[12.7,17.3].flatMap(y=>[f.dot(7.6,y,.95),f.line(11,y,16.6,y)])];
  },
  'calendar-previous':g=>period(g,false),
  'calendar-next':g=>period(g,true),
  'calendar-start':g=>endpoint(g,true),
  'calendar-end':g=>endpoint(g,false),
  'calendar-alert'(g) {
    const f=figure(g);
    return [...frame(g),f.line(12,12.3,12,14.9),f.dot(12,18,1.02)];
  },
  'calendar-reschedule'(g) {
    const f=figure(g);
    return [...frame(g),...f.arrow([f.path('M7.3 17.6C7.3 14.9 9 14 11.6 14H16.9')],[[14.3,11.5],[16.9,14],[14.3,16.5]])];
  },
};
