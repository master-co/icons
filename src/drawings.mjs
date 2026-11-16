import { n } from './geometry.mjs';
import { expansion } from './expansion/index.mjs';
import { coreDrawings } from './families/core.mjs';
import { additions } from './families/index.mjs';
export const drawings={...coreDrawings,...additions,...expansion};

export function draw(name,g){
  if(!drawings[name])throw new Error(`Missing drawing: ${name}`);
  return drawings[name](g).map(([tag,attrs])=>[tag,Object.fromEntries(Object.entries(attrs).map(([key,value])=>[key,
    typeof value==='number'?n(value):key==='d'?value.replace(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi,x=>String(n(Number(x)))):value
  ]))]);
}
