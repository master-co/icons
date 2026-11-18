import {line,rect} from '../geometry.mjs';
import {exteriorDetails} from '../occlusion.mjs';
import {rotate} from './shared.mjs';

function horizontal(g,position) {
  const edge=g.v(2.5,3,3.5),offset=g.v(5.5,7,8.5);
  const top=g.v(3,3.75,4.5),height=g.v(3.5,4,5);
  const widths=[g.v(8,10,12),g.v(5,6.5,8)];
  const radius=g.corner==='sharp'?0:g.corner==='soft'?g.v(.35,.45,.55):g.v(.9,1.1,1.4);
  const objects=widths.map((width,i)=>{
    const x=position==='left'?offset:position==='right'?g.s-offset-width:g.c-width/2;
    return rect(x,i?g.s-top-height:top,width,height,radius);
  });
  const axis=position==='left'?edge:position==='right'?g.s-edge:g.c;
  const guideInset=position==='center'?g.v(1.5,2,2.5):g.v(2,2.5,3);
  let guide=[line(axis,guideInset,axis,g.s-guideInset)];
  if(position==='center'){
    // The center datum attaches to the centers of both objects. Clip its ink
    // from the hollow interiors, retaining the connected boundary at each end.
    for(const object of objects)guide=exteriorDetails(object,guide,g).slice(1);
  }
  return [...guide,...objects];
}
export const objectAlignment={
  'align-objects-left':g=>horizontal(g,'left'),
  'align-objects-center-horizontal':g=>horizontal(g,'center'),
  'align-objects-right':g=>horizontal(g,'right'),
  'align-objects-top':g=>rotate(horizontal(g,'right'),-90,g),
  'align-objects-center-vertical':g=>rotate(horizontal(g,'center'),-90,g),
  'align-objects-bottom':g=>rotate(horizontal(g,'left'),-90,g),
};
