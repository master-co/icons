import {contour} from '../geometry.mjs';
import {rotate} from './shared.mjs';

// A closed body is a different construction from the ordinary line arrow.
// Both vote directions share this contour; do not redraw the down state.
function voteArrow(g) {
  const c=g.c,tip=g.v(2.5,3,3.5),shoulder=g.v(8.5,10.5,12.5),bottom=g.s-tip;
  // The sharp shoulder's acute miter reaches farther than its vertex.
  // Reserve room at the widest supported 24px stroke without narrowing 16px.
  const wing=g.v(6,7.25,8.75),stem=g.v(2.5,3,3.5);
  const r=g.corner==='sharp'?0:g.corner==='soft'?g.v(.35,.45,.55):g.v(.65,.85,1);
  const base=g.corner==='sharp'?0:g.corner==='soft'?g.v(.5,.65,.8):g.v(.85,1.1,1.35);
  return [contour([[c,tip],[c+wing,shoulder],[c+stem,shoulder],
    [c+stem,bottom],[c-stem,bottom],[c-stem,shoulder],[c-wing,shoulder]],
    [g.tip,r,r,base,base,r,r],true)];
}

export const voting={
  'arrow-big-up':voteArrow,
  'arrow-big-down':g=>rotate(voteArrow(g),180,g),
};
