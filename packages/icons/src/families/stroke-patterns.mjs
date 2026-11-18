import {horizontalRule} from './core.mjs';

// Line samples retain their semantic caps: flat dashes and circular dots,
// independent of the surrounding icon corner preset.
export const strokePatterns={
  'stroke-dashed':g=>horizontalRule(g,{pattern:'dashed'}),
  'stroke-dotted':g=>horizontalRule(g,{pattern:'dotted'}),
};
