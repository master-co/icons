import {figure} from '../families/shared.mjs';

export const shapes={
  arc(g) {
    const f=figure(g);
    return [f.path('M3.2 16.8A8.8 8.8 0 0 1 20.8 16.8')];
  },
  spiral(g) {
    const f=figure(g);
    return [f.path('M20.7 12.2C21.3 6.7 16.2 2.7 10.9 3.5C5.8 4.2 2.4 9.1 3.5 14.2C4.5 19.2 9.7 22.2 14.3 20.2C18.4 18.5 19.9 13.6 17.5 10.1C15.3 6.8 11 6.4 8.6 9C6.4 11.3 7.2 15 9.7 16.1C12.1 17.3 14.8 15.8 14.8 13.5C14.8 11.9 13.6 11 12.3 11.1')];
  },
  'line-segment'(g) {
    const f=figure(g),r=g.v(2.2,2,1.9);
    return [f.circle(5.5,18.5,r),f.circle(18.5,5.5,r),f.line(5.5+r*.72,18.5-r*.72,18.5-r*.72,5.5+r*.72)];
  },
  polyline(g) {
    const f=figure(g);
    return [f.contour([[3.1,18.5],[8.2,6.3],[15,14.3],[20.9,4.7]],false,g.tip),
      f.dot(3.1,18.5,1.5),f.dot(20.9,4.7,1.5)];
  },
  'right-triangle':g=>[figure(g).contour([[4.5,3.8],[20.3,20],[4.5,20]],true,g.r)],
  parallelogram:g=>[figure(g).contour([[7.8,5.8],[21,5.8],[16.2,18.2],[3,18.2]],true,g.r)],
  trapezoid:g=>[figure(g).contour([[7.7,5.8],[16.3,5.8],[21,18.2],[3,18.2]],true,g.r)],
  semicircle(g) {
    return [figure(g).path('M3 16.8A9 9 0 0 1 21 16.8Z')];
  },
  sector(g) {
    return [figure(g).path('M5.4 18.7V4.2A14.5 14.5 0 0 1 19.2 14.2Z')];
  },
};
