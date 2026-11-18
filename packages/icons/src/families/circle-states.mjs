import {path,n} from '../geometry.mjs';
import {coreDrawings} from './core.mjs';
import {playSymbol,pauseSymbol} from './media.mjs';
import {rotate} from './shared.mjs';

function pendingRing(g) {
  const {cx,cy,r}=coreDrawings.circle(g)[0][1];
  const half=g.v(9.5,10.25,11)*Math.PI/180;
  // Equal arcs centered on both axes: no leading gap or fading tail that
  // would suggest a spinner. All variants retain the established ring radius.
  return Array.from({length:8},(_,i)=>{
    const angle=i*Math.PI/4;
    const point=a=>`${n(cx+r*Math.cos(a))} ${n(cy+r*Math.sin(a))}`;
    return path(`M${point(angle-half)}A${r} ${r} 0 0 1 ${point(angle+half)}`);
  });
}

export const circleStates={
  'circle-dashed':pendingRing,
  'play-circle':g=>[...coreDrawings.circle(g),...playSymbol(g,{enclosed:true})],
  'pause-circle':g=>[...coreDrawings.circle(g),...pauseSymbol(g,{enclosed:true})],
  'alert-circle':g=>rotate(coreDrawings['info-circle'](g),180,g),
};
