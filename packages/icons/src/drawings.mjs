import { n } from './geometry.mjs';
import { expansion } from './expansion/index.mjs';
import { coreDrawings } from './families/core.mjs';
import { additions } from './families/index.mjs';
import {brandDrawings} from './brands.mjs';
import {atlas} from './atlas/index.mjs';
export const drawings={...coreDrawings,...additions,...expansion,...atlas,...brandDrawings};

export function draw(name,g){
  if(!drawings[name])throw new Error(`Missing drawing: ${name}`);
  // Preserve compact source path grammar (e.g. adjacent .5.6 coordinates).
  // Replacing numeric tokens in-place can merge them and invalidate the path.
  if(name.startsWith('brand-'))return drawings[name](g);
  return drawings[name](g).map(([tag,attrs])=>[tag,Object.fromEntries(Object.entries(attrs).map(([key,value])=>[key,
    typeof value==='number'?n(value):key==='d'?value.replace(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi,x=>String(n(Number(x)))):value
  ]))]);
}
