import { n } from './geometry.mjs';
import { expansion } from './expansion/index.mjs';
import { coreDrawings } from './families/core.mjs';
import { additions } from './families/index.mjs';
import {brandDrawings} from './brands.mjs';
import {atlas} from './atlas/index.mjs';
import {productDrawings} from './families/product.mjs';
import {interfaceDrawings} from './studio/interface.mjs';
import {canvasDrawings} from './studio/canvas.mjs';
import {editorDrawings} from './studio/editor.mjs';
import {typeTools,proofing} from './writer/type.mjs';
import {blocks} from './writer/blocks.mjs';
import {tables,borderTools} from './writer/table.mjs';
import {images} from './writer/media.mjs';
import {discussion} from './writer/discussion.mjs';
import {mathTools} from './writer/math.mjs';
import {publishing} from './writer/publishing.mjs';
import {changes} from './writer/changes.mjs';
import {workbenchDrawings} from './workbench/index.mjs';
import {operationsDrawings} from './operations/index.mjs';
const writer={...typeTools,...proofing,...blocks,...tables,...borderTools,...images,...discussion,...mathTools,...publishing,...changes};
export const drawings={...coreDrawings,...additions,...expansion,...atlas,...productDrawings,...interfaceDrawings,...canvasDrawings,...editorDrawings,...writer,...workbenchDrawings,...operationsDrawings,...brandDrawings};

export function draw(name,g){
  if(!drawings[name])throw new Error(`Missing drawing: ${name}`);
  // Preserve compact source path grammar (e.g. adjacent .5.6 coordinates).
  // Replacing numeric tokens in-place can merge them and invalidate the path.
  if(name.startsWith('brand-'))return drawings[name](g);
  const normalize=nodes=>nodes.map(([tag,attrs,children])=>[tag,Object.fromEntries(Object.entries(attrs).map(([key,value])=>[key,
    typeof value==='number'?n(value):key==='d'?value.replace(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi,x=>String(n(Number(x)))):value
  ])),...(children?[normalize(children)]:[])]);
  return normalize(drawings[name](g));
}
