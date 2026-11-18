import {coreDrawings,folder,plus} from './core.mjs';
import {kanbanColumns} from './organization.mjs';

export const projectSymbols={
  'folder-kanban':g=>[...folder(g),...kanbanColumns(g,{enclosed:true})],
  'square-plus':g=>[...coreDrawings.square(g),...plus(g,{half:g.v(2.5,3.25,4)})],
};
