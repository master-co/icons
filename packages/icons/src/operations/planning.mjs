import {figure} from '../families/shared.mjs';

// The mast is stationary. The hoist and the direction of the fly encode
// priority independently, so the ranks also work without a severity color.
function pennant(g,top,point,bottom) {
  const f=figure(g);
  return [f.line(5.4,3.4,5.4,20.8),f.contour([[5.6,top],[18.6,point],[5.6,bottom]],false,g.tip)];
}
function milestone(g,done) {
  const f=figure(g),width=done?7.4:6.1;
  return [f.line(2.6,12,12-width,12),f.contour([[12-width,12],[12,12-width],[12+width,12],[12,12+width]],true,g.tip),
    f.line(12+width,12,21.4,12),...(done?[f.contour([[9.2,12.2],[11.1,14.1],[14.9,10.1]])]:[])];
}
export const planning={
  'priority-none'(g) {
    const f=figure(g);
    return [f.contour([[5.4,20.8],[5.4,5.6],[10,5.6]],false,g.tip),f.contour([[14,5.6],[18.6,8.3],[14.8,10.4]]),f.line(5.6,13.3,9.4,12.4)];
  },
  'priority-low':g=>pennant(g,8.6,18.7,17.9),
  'priority-medium':g=>pennant(g,6.7,11.3,15.9),
  'priority-high':g=>pennant(g,5.4,3.8,15.3),
  'priority-urgent'(g) {
    const f=figure(g);
    return [f.contour([[4.6,20.8],[4.6,3.7],[20,3.7],[18.2,9.9],[20,15.9],[4.6,15.9]],false,g.tip),f.line(11.6,6.4,11.6,9.6),f.dot(11.6,13,1)];
  },
  milestone:g=>milestone(g,false),
  'milestone-complete':g=>milestone(g,true),
  sprint(g) {
    const f=figure(g);
    return [f.circle(16.7,4.8,1.9),f.contour([[8.6,9.2],[11.3,7],[14.2,8.2],[16.4,11.1],[20.7,11.1]],false,g.r),
      f.contour([[13.6,8.5],[10.2,13.1],[15,15.3],[13.1,20.5]],false,g.r),
      f.contour([[10.1,13.5],[7.3,17.8],[3,17.8]],false,g.r),f.line(3.6,12.2,6.9,12.2)];
  },
  backlog(g) {
    const f=figure(g);
    return [f.line(7.4,3.8,16.6,3.8),f.line(5.5,7.7,18.5,7.7),
      f.contour([[3.3,11.7],[8.4,11.7],[10,14.6],[14,14.6],[15.6,11.7],[20.7,11.7],[20.7,20],[3.3,20]],true,g.r)];
  },
  subtask(g) {
    const f=figure(g);
    return [f.contour([[4.1,4.2],[4.1,15.4],[10.7,15.4]],false,g.r),f.rect(10.7,11.1,9.8,8.6)];
  },
};
