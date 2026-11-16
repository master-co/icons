import { figure } from './shared.mjs';

function indent(g,increase) {
  const f=figure(g),tip=increase?7.5:3.5,tail=increase?3.5:7.5;
  // Tabler's line-length relationship communicates the action as well as the
  // arrow. Keep Master's spacing, endpoints, stroke and native corner treatment.
  const outerStart=increase?9:13,middleStart=increase?13:11;
  return [f.line(outerStart,5,20.5,5),f.line(middleStart,12,20.5,12),f.line(outerStart,19,20.5,19),
    f.contour([[tail,8],[tip,12],[tail,16]],false,g.tip)];
}
function script(g,raised) {
  const f=figure(g),y=raised?3.5:13.5;
  return [f.line(3.5,7,12.5,17),f.line(3.5,17,12.5,7),
    f.path(`M16 ${y+1.5}C16 ${y-.5} 21 ${y-.5} 21 ${y+2}C21 ${y+3.5} 17 ${y+5} 16 ${y+6.5}H21`)];
}
export const typography = {
  text(g) {
    const f=figure(g);
    return [f.contour([[4.5,7],[4.5,4],[19.5,4],[19.5,7]],false,g.tip),
      f.line(12,4,12,20),f.line(8.5,20,15.5,20)];
  },
  'wrap-text'(g) {
    const f=figure(g);
    return [f.line(3,5,21,5),f.path('M3 11H17A3.5 3.5 0 0 1 17 18H11'),
      f.line(3,18,6,18),f.contour([[14,15],[11,18],[14,21]],false,g.tip)];
  },
  highlighter(g) {
    const f=figure(g),r=Math.min(g.r,g.v(.5,.65,.8));
    return [f.contour([[8,12],[17,3],[21,7],[12,16]],true,r),
      // A broad, flat chisel edge distinguishes the marker from a pencil.
      // Preserve its working edge even when the barrel corners are rounded.
      f.contour([[8,12],[5.5,14.5],[5.5,18.5],[9,18.5],[12,16]],false,[0,g.tip,0,0,0]),
      f.line(3,21.5,13,21.5)];
  },
  eraser(g) {
    const f=figure(g);
    return [f.contour([[3,14],[13.5,3.5],[21,11],[12,20],[9,20]],true,g.r),
      f.line(7.5,9.5,15,17),f.line(12,20,21,20)];
  },
  paintbrush(g) {
    const f=figure(g);
    return [f.path('M9.5 14.5L18.5 3.5Q20.5 1.5 21.5 3Q22.5 4.5 20.5 6.5L12.5 16.5'),
      f.path('M9.5 14.5C7 13 5 15 5 17.5Q5 20 3 21C8 22 12 20.5 12.5 16.5Z')];
  },
  palette(g) {
    const f=figure(g);
    const dots=g.s===16?[[7,9],[12,6.5],[17,9]]:[[6.5,12],[8,7.5],[13,6.5],[17.5,10]];
    return [f.path('M12 3C17.5 3 21 6.8 21 11C21 14 19 15 16.5 14.5C14 14 13.5 16 15 17.5C16.5 19 15 21 12 21A9 9 0 0 1 12 3Z'),
      ...dots.map(([x,y])=>f.dot(x,y,g.stroke/2))];
  },
  'indent-increase':g=>indent(g,true),
  'indent-decrease':g=>indent(g,false),
  subscript:g=>script(g,false),
  superscript:g=>script(g,true),
};
