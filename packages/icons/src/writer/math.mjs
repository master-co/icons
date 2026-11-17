import {figure} from '../families/shared.mjs';

function exponent(f) {
  // A cursive x crosses a bowed entry stroke; the raised 2 has its own
  // shoulder and baseline. Both placements carry the same expression.
  return [f.path('M6.6 11.2C8.5 9.4 9.4 11.3 10.8 14.5S12.6 18.1 14.2 16.5M13.6 10.6L7.5 17.2'),
    f.path('M14.7 8.3C15.1 6.3 18.5 6.3 18.3 8.4C18.1 9.6 16.5 10.4 15 11.8H18.8')];
}
function inequality(g,less) {
  const f=figure(g),a=less?18.2:5.8,b=24-a;
  return [f.contour([[a,4.6],[b,9.8],[a,15]]),f.line(5.8,19.3,18.2,19.3)];
}
export const mathTools={
  'inline-math'(g) {
    const f=figure(g);
    return [...exponent(f),f.line(2,15.8,4.2,15.8),f.line(17.6,15.8,21.7,15.8)];
  },
  'block-math'(g) {
    const f=figure(g);
    return [f.line(3.5,3,20.5,3),...exponent(f),f.line(3.5,21,20.5,21)];
  },
  integral(g) {
    const f=figure(g);
    return [f.path('M17.4 4.4C15.8 2.3 13.2 2.9 12.8 5.7C12.3 9.2 11.8 14.8 11.2 18.3C10.7 21.1 8.2 21.7 6.6 19.6')];
  },
  'product-symbol'(g) {
    const f=figure(g);
    return [f.path('M3.8 5H20.2M6.8 5V19.3M4.8 19.3H8.8M17.2 5V19.3M15.2 19.3H19.2')];
  },
  matrix(g) {
    const f=figure(g);
    return [f.contour([[7,3.5],[3.8,3.5],[3.8,20.5],[7,20.5]],false,g.tip),
      f.contour([[17,3.5],[20.2,3.5],[20.2,20.5],[17,20.5]],false,g.tip),
      ...[9.4,14.6].flatMap(x=>[8.7,15.3].map(y=>f.dot(x,y,g.stroke*.68)))];
  },
  'nth-root'(g) {
    const f=figure(g);
    return [f.contour([[3,14],[5.5,13],[8.5,19],[12.8,6],[21.5,6]]),
      f.path('M3.2 9V4.8M3.2 6.7C4.2 4.1 7.4 4 7.4 6.7V9')];
  },
  factorial(g) {
    const f=figure(g);
    return [f.path('M5.8 8.3L4 18.5M5.1 12.2C6.7 7 13.3 6.8 12.4 11.8L11.2 18.5'),
      f.line(18,4,17.3,13.7),f.dot(17.1,18.4,g.stroke*.68)];
  },
  'less-than-or-equal':g=>inequality(g,true),'greater-than-or-equal':g=>inequality(g,false),
  'approximately-equal'(g) {
    const f=figure(g);
    return [8.4,15.6].map(y=>f.path(`M3.4 ${y+1.2}C6.7 ${y-2.7} 9.2 ${y-2.5} 12 ${y}S17.6 ${y+2.5} 20.6 ${y-1.2}`));
  },
};
