import { figure, rotate } from './shared.mjs';

export const systems = {
  server(g) {
    const f=figure(g);
    return [4,14].flatMap(y=>[f.rect(3,y,18,6),f.dot(7,y+3,g.stroke/2)]);
  },
  'hard-drive'(g) {
    const f=figure(g);
    return [f.contour([[3,13],[6.5,4.5],[17.5,4.5],[21,13]],false,g.r),
      f.rect(3,13,18,7),f.dot(7,16.5,g.stroke/2),...(g.s===16?[]:[f.dot(11,16.5,g.stroke/2)])];
  },
  cpu(g) {
    const f=figure(g),pins=g.s===16?[8,16]:[8,12,16];
    return [f.rect(5,5,14,14),f.rect(9,9,6,6,Math.min(g.r,g.v(.4,.55,.7))),
      ...pins.flatMap(p=>[f.line(p,2,p,5),f.line(p,19,p,22),f.line(2,p,5,p),f.line(19,p,22,p)])];
  },
  'memory-stick'(g) {
    const f=figure(g),xs=g.s===16?[7,17]:[6,12,18],r=Math.min(g.r,g.v(.4,.55,.7));
    return [f.rect(2.5,6,19,11,r),
      ...xs.map(x=>f.line(x,9.5,x,13.5)),
      ...[5,9,15,19].map(x=>f.line(x,17,x,20))];
  },
  network(g) {
    const f=figure(g),r=Math.min(g.r,g.v(.6,.8,1));
    return [f.rect(9,2.5,6,6,r),f.rect(2.5,15.5,6,6,r),f.rect(15.5,15.5,6,6,r),
      f.line(12,8.5,12,12),f.contour([[5.5,15.5],[5.5,12],[18.5,12],[18.5,15.5]],false,r)];
  },
  workflow(g) {
    const f=figure(g),r=Math.min(g.r,g.v(.65,.85,1.1));
    return [f.rect(3,3,7,6,r),f.rect(14,15,7,6,r),
      f.contour([[6.5,9],[6.5,18],[14,18]],false,g.r),f.contour([[11.5,15.5],[14,18],[11.5,20.5]],false,g.tip)];
  },
  'git-branch'(g) {
    const f=figure(g);
    return [f.circle(6,5.5,2.5),f.circle(6,18.5,2.5),f.circle(18,5.5,2.5),
      f.line(6,8,6,16),f.path('M18 8C18 14.5 6 11 6 16')];
  },
  'git-merge'(g) {
    const f=figure(g);
    return [f.circle(6,5.5,2.5),f.circle(6,18.5,2.5),f.circle(18,16,2.5),
      f.line(6,8,6,16),f.path('M6 8C6 13 10.5 16 15.5 16')];
  },
  braces(g) {
    const f=figure(g);
    return [f.path('M8.5 3H7.5Q5.5 3 5.5 5V8.5Q5.5 12 3 12Q5.5 12 5.5 15.5V19Q5.5 21 7.5 21H8.5'),
      f.path('M15.5 3H16.5Q18.5 3 18.5 5V8.5Q18.5 12 21 12Q18.5 12 18.5 15.5V19Q18.5 21 16.5 21H15.5')];
  },
  webhook(g) {
    const f=figure(g);
    // Three equally spaced open hooks; the arms finish inside the next hook.
    const hook=[f.path('M15.5 5A3.5 3.5 0 1 0 10.25 8.0311L5.9378 15.5')];
    return [...hook,...rotate(hook,120,g),...rotate(hook,240,g)];
  },
};
