import {figure} from '../families/shared.mjs';
import {knockout} from '../occlusion.mjs';

function freeze(g,rows,columns) {
  const f=figure(g),grid=[f.rect(3,3.8,17,15.7)];
  if(rows)grid.push(f.line(3.4,9.6,19.6,9.6));
  if(columns)grid.push(f.line(9.2,4.2,9.2,19.1));
  const ice=[f.line(17.8,13.1,17.8,21),f.line(14.4,15.1,21.2,19),f.line(14.4,19,21.2,15.1)];
  return knockout(grid,ice,g);
}
function alphabet(g,ascending) {
  const f=figure(g),ay=ascending?3.6:13,zy=ascending?13:3.6;
  return [f.contour([[3.4,ay+6.4],[6.6,ay],[9.8,ay+6.4]]),f.line(4.8,ay+4.2,8.3,ay+4.2),
    f.contour([[3.7,zy],[9.6,zy],[3.7,zy+6.4],[9.6,zy+6.4]]),
    ...f.arrow([f.line(17.5,4.3,17.5,19.5)],[[14.1,16.1],[17.5,19.5],[20.9,16.1]])];
}
function decimal(g,increase) {
  const f=figure(g),start=increase?6.5:10.6,end=increase?19:4.8,wing=increase?16:7.8;
  const zero=x=>f.path('M'+x+' 7.8c0 -4.9 4.7 -4.9 4.7 0v1.8c0 4.9 -4.7 4.9 -4.7 0Z');
  return [f.dot(start-3,12.7,1.05),zero(start),...(increase?[zero(14.8)]:[]),
    ...f.arrow([f.line(increase?5:19,18.7,end,18.7)],[[wing,15.9],[end,18.7],[wing,21.5]])];
}
export const sheet={
  'freeze-first-row':g=>freeze(g,true,false),
  'freeze-first-column':g=>freeze(g,false,true),
  'freeze-panes':g=>freeze(g,true,true),
  'sort-a-z':g=>alphabet(g,true),
  'sort-z-a':g=>alphabet(g,false),
  'decimal-increase':g=>decimal(g,true),
  'decimal-decrease':g=>decimal(g,false),
  'cell-reference-absolute'(g) {
    const f=figure(g);
    return [f.rect(2.8,3.7,18.4,16.6),f.line(7.8,4,7.8,19.9),f.line(3.1,8.4,20.9,8.4),
      f.path('M17.1 11.8C13 10 10.7 13.4 14.6 14.2C18.9 15.1 16.6 18.5 12.2 16.9'),f.line(14.7,10.2,14.7,11.2),f.line(14.7,17.5,14.7,18.5)];
  },
  'cell-reference-relative'(g) {
    const f=figure(g);
    return [f.rect(3,3.6,10.7,8.8),...f.arrow([f.contour([[8.3,15.8],[8.3,19],[20.8,19]],false,g.r)],[[17.6,15.8],[20.8,19],[17.6,22]])];
  },
};
