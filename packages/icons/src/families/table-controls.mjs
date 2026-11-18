import {tableStructure} from './analytics.mjs';
import {tableLayout} from '../expansion/table-layout.mjs';
import {rotate} from './shared.mjs';

export const tableControls={
  'table-header-column':g=>tableStructure(g,{columnHeader:true}),
  'table-row-insert-above':g=>rotate(tableLayout['table-row-add'](g),180,g),
  'table-column-insert-left':g=>rotate(tableLayout['table-row-add'](g),90,g),
};
