import {figure} from './shared.mjs';
import {handSilhouette} from '../expansion/design-tools.mjs';

export function clickHand(g){
  const f=figure(g),right=g.v(11.75,12,11.75),middle=g.v(15.875,15.75,15.625);
  // Two exposed folded crowns leave room for the extended index. The far
  // folded fingers are simplified into a single contour, not tiny hatch marks.
  return [handSilhouette(g,`M 8 13 V 6.25 C 8 4.05 ${right} 4.05 ${right} 6.25 V 10.75 C ${right} 8.9 ${middle} 8.9 ${middle} 10.75 V 12 C ${middle} 10.1 20 10.1 20 12`),
    f.line(right,10.75,right,12.25),f.line(middle,12,middle,13.5)];
}
export const clickGesture={
  'hand-click':g=>{const f=figure(g);return [...clickHand(g),f.line(2.375,2,3.875,3.5),f.line(17.5,2,16,3.5)];},
};
