import {line} from '../geometry.mjs';

// One shared scale: native coordinates, common baseline and unchanged spacing.
// Inactive stages remain visible as context rather than changing the icon bounds.
function priority(g,level) {
  const baseline=g.v(12.5,15.5,19);
  const xs=[g.v(4,5,6),g.c,g.v(12,15,18)];
  const heights=[g.v(4,4.5,5.5),g.v(6,7,8.5),g.v(9,10.5,13)];
  return xs.map((x,i)=>{
    const node=line(x,baseline-heights[i],x,baseline);
    if(i>=level)node[1].opacity=.25;
    return node;
  });
}
export const taskPriorities={
  'priority-low':g=>priority(g,1),
  'priority-medium':g=>priority(g,2),
  'priority-high':g=>priority(g,3),
};
