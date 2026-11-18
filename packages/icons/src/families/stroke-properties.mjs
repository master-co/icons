import {path,rect,n} from '../geometry.mjs';

export const strokeProperties={
  // Bootstrap's descending-weight specimen, rebuilt with optical spacing and
  // real corner radii. Filled strips depict stroke thickness, not a fill style.
  'stroke-width':g=>{
    const {s,v}=g,left=v(2.5,3,3.5);
    return [[v(4,5,6),2.2],[v(9,11,13),1.4],[v(13,16,19.5),.7]].map(([y,ratio])=>{
      const height=n(g.stroke*ratio);
      return ['rect',{...rect(left,n(y-height/2),s-2*left,height,g.tip)[1],fill:'currentColor',stroke:'none'}];
    });
  },
  // The radius is the subject, so even the sharp preset retains this circular
  // corner. It is distinct from stroke-join-round's outer edge + centreline.
  'corner-radius':g=>{
    const {s,v}=g,edge=v(3,3.5,4),end=s-edge,r=v(6,7.5,9);
    return [path(`M${edge} ${end}V${edge+r}A${r} ${r} 0 0 1 ${edge+r} ${edge}H${end}`)];
  },
};
