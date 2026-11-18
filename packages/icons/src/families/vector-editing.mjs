import {figure} from './shared.mjs';
import {bezierCurve,circularNodes,outside} from '../atlas/geometric-shapes.mjs';

function cornerNode(g) {
  const f=figure(g);
  return bezierCurve({g,c:f.circle,p:f.path,l:f.line},{corner:true});
}
function pathConnection(g,broken) {
  const f=figure(g);
  const nodes=circularNodes(f.circle,broken?[[7.5,12],[16.5,12]]:[[12,12]]);
  // Joined: one shared anchor and a continuous tangent. Broken: two separate
  // end anchors with space between their painted contours, even at 16px.
  const tails=broken?[
    f.path('M3 20.5C3 14 4.5 12 7.5 12'),
    f.path('M16.5 12C19.5 12 21 10 21 3.5'),
  ]:[f.path('M3 20.5C3 12 8 12 12 12C16 12 21 12 21 3.5')];
  return outside(nodes,tails,g);
}
export const vectorEditing={
  'node-corner':cornerNode,
  'path-join':g=>pathConnection(g,false),
  'path-break':g=>pathConnection(g,true),
};
