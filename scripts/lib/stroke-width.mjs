// Shared by the two explorers. Widths are in native viewBox units.
export const strokeWidths = Object.freeze([0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5]);
export const strokeRanges = Object.freeze({16:Object.freeze([0.75,1.5]),20:Object.freeze([1,2]),24:Object.freeze([1.25,2.5])});
export const strokeWidthsFor = size => strokeWidths.filter(w=>w>=strokeRanges[size][0]&&w<=strokeRanges[size][1]);
export function clampStroke(width,size) {
  if(width==null)return null;
  const [min,max]=strokeRanges[size];
  return Math.min(max,Math.max(min,width));
}
export function parseStroke(value,size) {
  const width = Number(value);
  return strokeWidths.includes(width) ? (size?clampStroke(width,size):width) : null;
}
export function strokeDefinition(definition, width) {
  if (width == null) return definition;
  const variants=Object.fromEntries([16,20,24].map(size=>{
    const selected=clampStroke(width,size),master=definition.strokes?.[selected]?.[size];
    if(!master)throw new RangeError(`Unavailable stroke width: ${selected}/${size}`);
    return [size,master];
  }));
  return {...definition, variants};
}
// A package strokeWidth override cannot regenerate baked Boolean outlines.
// Export the actual selected geometry as JSX instead.
export function svgToJsx(svg) {
  return svg.replace(/\b(stroke-width|stroke-linecap|stroke-linejoin|stroke-miterlimit|stroke-dasharray|stroke-dashoffset|stroke-opacity|fill-opacity|fill-rule|clip-rule|mask-type)=/g,
    key => key.replace(/-([a-z])/g, (_, c) => c.toUpperCase()));
}
