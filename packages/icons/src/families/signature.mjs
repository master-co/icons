import {figure} from './shared.mjs';

// Adapted from Tabler's signature convention: a continuous looped initial
// followed by two descending handwritten shoulders. The loop is broader and
// the two shoulders have tangent-continuous turns, including at 16px.
// Handwriting has no polygonal corners; its curves are structural in all
// three corner presets. See rebuild-provenance.json for the fixed MIT source.
export const signatureDrawings={
 signature:g=>[figure(g).path('M3 17C6 14 9 10.5 9 7.5C9 3.5 4.5 4 4.5 8C4.5 12 7.5 17 10 17C11.5 17 12 14.8 12.7 13.3C13.1 12.5 13.5 12.6 13.6 13.5C13.85 15.75 14.5 17 16 17C17.2 17 17.8 14.5 19 14.5C20 14.5 20 16 21 16.5')],
};
