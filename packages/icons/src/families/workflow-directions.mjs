import {horizontalArrow} from './core.mjs';
import {path} from '../geometry.mjs';

export function workflowArrowParts(g,{join=false}={}){
 const start=g.v(2.5,3,3.5),end=g.s-start,half=g.v(2,2.5,3),top=g.v(4.5,5.5,6.5),bottom=g.s-top;
 const shared={start,end,wing:end-half,half};
 if(!join)return {arrows:[horizontalArrow(g,{...shared,y:top}),horizontalArrow(g,{...shared,y:bottom})]};
 const bend=g.v(4.5,5.5,6.5),merge=g.v(9,11.25,13.5),handle=g.v(1.5,2,2.5);
 // Both streams intentionally meet tangentially. These are joined routes,
 // not overlapping badges: no knockout between the two incoming streams.
 const shafts=[path(`M${start} ${top}H${bend}C${bend+handle} ${top} ${merge-handle} ${g.c} ${merge} ${g.c}H${end}`),path(`M${start} ${bottom}H${bend}C${bend+handle} ${bottom} ${merge-handle} ${g.c} ${merge} ${g.c}`)];
 return {arrows:[horizontalArrow(g,{...shared,shafts})]};
}
export const workflowDirectionDrawings={
 'workflow-parallel':g=>workflowArrowParts(g).arrows.flat(),
 'workflow-join':g=>workflowArrowParts(g,{join:true}).arrows.flat(),
};
