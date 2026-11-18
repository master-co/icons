import {square} from './core.mjs';
import {selection} from '../expansion/design-tools.mjs';
import {returnArrow} from '../expansion/utilities.mjs';

// Lucide's outgoing outline / replacement token arrangement, rebuilt from
// the existing selection, key-return arrow and square mothers. The additional
// exposed right edges distinguish replacing every match from the current one.
function replacement(g,all){
  const {v,s}=g,side=v(4.75,6,7),y=v(10,12.5,15);
  const radius=g.corner==='sharp'?0:g.corner==='soft'?v(.35,.45,.55):v(.7,.9,1.1);
  return [...returnArrow(g,{direction:'down',left:6,right:10,top:3,bottom:10.5,wing:2.75,radius:g.r}),
    ...selection(g,{cornersOnly:true,box:[14.5,3,7,7],cornerLength:1.75}),
    ...square(g,{x:v(1.75,2.25,2.75),y,side,radius}),
    ...(all?[15.5,21.5].flatMap(right=>square(g,{x:right*s/24-side,y,side,radius,exposedRight:1.5*s/24})):[])];
}
export const replacementDrawings={replace:g=>replacement(g,false),'replace-all':g=>replacement(g,true)};
