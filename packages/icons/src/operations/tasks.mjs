import {figure} from '../families/shared.mjs';
import {knockout} from '../occlusion.mjs';

function splitTask(g,merge) {
  const f=figure(g),x=value=>merge?24-value:value;
  const route=y=>f.contour([[x(11.8),12],[x(14.9),y],[x(20.6),y]],false,g.r);
  const outputs=merge?[f.dot(x(20.6),6,1.5),f.dot(x(20.6),18,1.5)]:[];
  return [f.rect(merge?15.5:2.8,8.6,5.7,6.8),f.line(x(8.5),12,x(11.8),12),...outputs,...[6,18].flatMap(y=>
    merge?[route(y)]:f.arrow([route(y)],[[18.2,y-2.3],[20.6,y],[18.2,y+2.3]]))];
}
export const tasks={
  'task-dependency'(g) {
    const f=figure(g);
    return [f.rect(2.8,3.8,11.4,4.8),f.rect(11.2,15.5,10,4.8),
      ...f.arrow([f.contour([[6,8.8],[6,13.1],[13.5,13.1]],false,g.r)],[[11.5,11.1],[13.5,13.1],[11.5,15.1]])];
  },
  'task-blocked'(g) {
    const f=figure(g);
    return [f.rect(3,6.4,18,7.1),f.line(5.7,13.8,5.7,19.7),f.line(18.3,13.8,18.3,19.7),
      f.line(6.5,12.9,10.7,7),f.line(13.4,12.9,17.6,7)];
  },
  'parent-task'(g) {
    const f=figure(g);
    return [f.rect(7.1,2.9,9.8,5.8),f.line(12,8.9,12,12.8),f.contour([[5.5,16],[5.5,12.8],[18.5,12.8],[18.5,16]],false,g.tip),
      f.rect(2.8,16,5.4,4.8),f.rect(15.8,16,5.4,4.8)];
  },
  'task-split':g=>splitTask(g,false),
  'task-merge':g=>splitTask(g,true),
  'task-recurring'(g) {
    const f=figure(g);
    return [f.rect(6.5,6.7,10.3,10.3),f.contour([[8.8,11.7],[10.8,13.7],[14.5,9.9]]),
      ...f.arrow([f.path('M6.6 20C14.1 24.4 23.6 17.5 20.6 9.5')],[[18.7,12.5],[20.6,9.5],[22.3,12.7]])];
  },
  'task-template'(g) {
    const f=figure(g);
    return [f.contour([[4.3,3],[14,3],[19.7,8.7],[19.7,21],[4.3,21]],true,g.r),
      f.contour([[14,3.6],[14,8.7],[19,8.7]]),f.rect(7.2,12.5,3.9,3.9,Math.min(g.r,.65)),f.line(14,14.45,17,14.45)];
  },
  'task-reopen'(g) {
    const f=figure(g);
    return knockout([f.rect(3.4,5.7,15.5,14.8)],
      f.arrow([f.path('M20.8 13.1V11.6C20.8 8.2 18.6 6.8 15.8 6.8H11.8')],[[15,3.6],[11.8,6.8],[15,10]]),g);
  },
  'task-delegate'(g) {
    const f=figure(g);
    return [f.circle(8.8,7.1,3.4),f.path('M2.9 20V18.6C2.9 12.2 14.4 12.2 14.4 18.6V20'),
      ...f.arrow([f.line(15,10.6,21.2,10.6)],[[18.3,7.8],[21.2,10.6],[18.3,13.4]])];
  },
  'task-estimate'(g) {
    const f=figure(g);
    return [f.contour([[3.2,16.6],[3.2,3.1],[13.9,3.1]],false,g.r),f.rect(7.4,6.7,12.8,14.1),
      f.contour([[13.8,10.4],[16.4,13.8],[13.8,17.1],[11.2,13.8]],true,g.tip)];
  },
};
