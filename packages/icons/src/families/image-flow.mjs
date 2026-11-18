import {line} from '../geometry.mjs';
import {imageFrame} from './media.mjs';
// Layout controls use the image boundary at a small optical size. Landscape
// details would obscure the text-flow relationship and are deliberately omitted.
export function imageFlowParts(g,mode='left'){
 const k=24/g.s,l=g.v(2,2.5,3),r=g.s-l,w=g.v(5.5,6.75,8.5),h=g.v(5,6.5,7.5),side=g.v(10.5,12.5,15),inline=mode==='inline',top=inline?g.v(6,7.5,9):g.v(2.5,3,4),radius=g.r*.5;
 const frame=imageFrame(g,{left:l*k,top:top*k,width:w*k,height:h*k,radius});
 const text=inline?[line(l,g.v(2.5,3,4),r,g.v(2.5,3,4)),line(side,top+h,r,top+h),line(l,g.v(14.5,18,21),r,g.v(14.5,18,21))]:[line(side,g.v(3.5,4.5,5.5),r,g.v(3.5,4.5,5.5)),line(side,g.v(7,9,11),r,g.v(7,9,11)),line(l,g.v(10.5,13.5,16),r,g.v(10.5,13.5,16)),line(l,g.v(14.5,18,21),r,g.v(14.5,18,21))];
 const nodes=[frame,...text],right=mode==='right';return {frame,text,l,r,w,h,side,top,radius,nodes:right?nodes.map(([tag,a])=>[tag,{...a,transform:`translate(${g.s} 0) scale(-1 1)`}]):nodes};
}
export const imageFlowDrawings={'image-wrap-left':g=>imageFlowParts(g).nodes,'image-wrap-right':g=>imageFlowParts(g,'right').nodes,'image-inline':g=>imageFlowParts(g,'inline').nodes};
