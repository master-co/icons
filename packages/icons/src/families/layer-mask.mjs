import {ring} from './core.mjs';
import {imageFrame} from './media.mjs';

export const layerMask={
  'layer-mask':g=>[imageFrame(g),ring(g,{radius:g.v(2.25,3,3.75)})],
};
