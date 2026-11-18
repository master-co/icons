import {weightDelta} from '../geometry.mjs';
import {compositionLocation} from '../expansion/composition-location.mjs';
import {enclosedCheck} from './core.mjs';

export const milestoneState={
  'milestone-complete':g=>[
    ...compositionLocation.diamond(g),
    // The diamond loses space toward its corners. Reuse the enclosed tick,
    // with shorter arms and an additional correction at the heavy stroke end.
    enclosedCheck(g,{scale:.7-weightDelta(g)*.12,offsetX:-g.v(.25,.4,.5),offsetY:g.v(.25,.4,.5)}),
  ],
};
