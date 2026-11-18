import {figure,rotate} from './shared.mjs';
import {selection} from '../expansion/design-tools.mjs';
import {triangle} from '../expansion/composition-location.mjs';

function groupedObjects(g,grouped) {
  const f=figure(g),radius=g.corner==='sharp'?0:g.corner==='soft'?g.v(.35,.45,.55):g.v(.7,.9,1.1);
  // The same rectangle construction represents the two objects in both
  // states. A diagonal arrangement avoids reading as two centered "eyes".
  const boxes=grouped?[[6,6,7,4],[11,14,7,4]]:[[3.5,4,9,6],[11.5,14,9,6]];
  return [...(grouped?selection(g,{cornersOnly:true,inset:2.5}):[]),
    ...boxes.map(([x,y,w,h])=>f.rect(x,y,w,h,radius))];
}
function horizontalFlip(g) {
  const f=figure(g);
  // Tabler's reflected right triangles clarify the mirror operation; these
  // use the shared triangle construction with a right-angle parameterization.
  const left=[[8.5,6],[8.5,18],[2.5,18]];
  return [f.line(12,2.5,12,21.5),...triangle(g,{points:left}),
    ...triangle(g,{points:left.map(([x,y])=>[24-x,y])})];
}
export const canvasTransform={
  group:g=>groupedObjects(g,true),
  ungroup:g=>groupedObjects(g,false),
  'flip-horizontal':horizontalFlip,
  'flip-vertical':g=>rotate(horizontalFlip(g),90,g),
};
