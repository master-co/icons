import {figure} from '../families/shared.mjs';
import {systems} from '../families/systems.mjs';
import {knockout} from '../occlusion.mjs';

// A horizontal synchronization bar, with arrows only on the outgoing side.
// Keep the ports fixed as a group when the fork turns into a join.
function branches(g,join) {
  const f=figure(g);
  const top=join?[6.2,17.8]:[12],bottom=join?[12]:[6.2,17.8];
  return [f.line(3.5,11.3,20.5,11.3),
    ...top.flatMap(x=>[f.circle(x,5.1,1.8),f.line(x,7,x,11.2)]),
    ...bottom.flatMap(x=>f.arrow([f.line(x,11.4,x,20.3)],[[x-2.6,17.8],[x,20.3],[x+2.6,17.8]]))];
}
export const flow={
  'automation-trigger'(g) {
    const f=figure(g);
    return [f.contour([[11.9,3.1],[3,13.1],[9.3,13.1],[8.2,20.9],[16,10.4],[10.5,10.4]],true,g.tip),
      f.line(16.1,10.4,18.3,10.4),f.circle(20.2,10.4,1.9)];
  },
  'workflow-condition'(g) {
    const f=figure(g);
    return [f.contour([[3.4,9.8],[9.3,3.9],[15.2,9.8],[9.3,15.7]],true,g.tip),f.line(9.3,15.8,9.3,20.2),
      f.dot(9.3,20.2,1.45),f.line(15.3,9.8,20.2,9.8),f.dot(20.2,9.8,1.45)];
  },
  'workflow-parallel':g=>branches(g,false),
  'workflow-join':g=>branches(g,true),
  'workflow-delay'(g) {
    const f=figure(g);
    return [f.contour([[2.9,8],[2.9,4.2],[17,4.2]],false,g.tip),f.contour([[7,19.8],[21.1,19.8],[21.1,16]],false,g.tip),
      f.path('M7.9 4.4C7.9 8.7 9.7 9.7 12 12C14.3 14.3 16.1 15.3 16.1 19.6M16.1 4.4C16.1 8.7 14.3 9.7 12 12C9.7 14.3 7.9 15.3 7.9 19.6')];
  },
  'workflow-loop'(g) {
    const f=figure(g);
    return [f.rect(7.3,3.6,9.4,6.7),...f.arrow([f.contour([[16.8,7],[20.2,7],[20.2,18.9],[3.8,18.9],[3.8,12.3]],false,g.r)],
      [[2.1,14.7],[3.8,12.3],[6,14.7]])];
  },
  'workflow-stop'(g) {
    const f=figure(g);
    return [f.line(2.9,12,7,12),f.circle(14.3,12,7.25),f.dot(14.3,12,3.45)];
  },
  'workflow-run'(g) {
    const f=figure(g);
    return [f.circle(5,12,2.25),f.line(7.3,12,12.6,12),f.contour([[12.8,5.5],[21.1,12],[12.8,18.5]],true,g.tip)];
  },
  'workflow-disabled':g=>knockout(systems.workflow(g),[figure(g).line(3.6,20.4,20.4,3.6)],g),
  'workflow-log'(g) {
    const f=figure(g);
    return [f.line(5.1,5.3,5.1,18.8),...[5.3,12,18.8].map(y=>f.dot(5.1,y,1.55)),
      f.line(10.6,5.3,20.6,5.3),f.line(10.6,12,17.4,12),f.line(10.6,18.8,19.5,18.8)];
  },
};
