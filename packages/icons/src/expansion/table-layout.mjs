import {figure,rotate} from '../families/shared.mjs';
import {layout} from '../families/layout.mjs';

function rowAction(g,remove=false){
  const f=figure(g),mark=remove?
    [f.line(9.75,15.25,14.25,19.75),f.line(14.25,15.25,9.75,19.75)]:
    [f.line(9.5,17.5,14.5,17.5),f.line(12,15,12,20)];
  return [f.rect(3,4,18,7,Math.min(g.r,g.v(.65,.85,1))),...mark];
}
function cells(g,split){
  const f=figure(g);
  return [f.rect(3,4,18,16),f.line(3,9,21,9),f.line(3,15,21,15),
    ...(split?[f.line(12,9,12,15)]:[f.line(12,4,12,9),f.line(12,15,12,20)])];
}
function panelAction(g,side,open){
  const f=figure(g),right=side==='right';
  const near=right?8:16,far=right?11:13;
  const start=open?far:near,tip=open?near:far;
  return [...layout[`panel-${side}`](g),f.contour([[start,9],[tip,12],[start,15]],false,g.tip)];
}
export const tableLayout={
  'table-row-add':g=>rowAction(g),
  'table-column-add':g=>rotate(rowAction(g),-90,g),
  'table-row-delete':g=>rowAction(g,true),
  'table-column-delete':g=>rotate(rowAction(g,true),-90,g),
  'table-cells-merge':g=>cells(g,false),
  'table-cells-split':g=>cells(g,true),
  'panel-left-close':g=>panelAction(g,'left',false),
  'panel-left-open':g=>panelAction(g,'left',true),
  'panel-right-close':g=>panelAction(g,'right',false),
  'panel-right-open':g=>panelAction(g,'right',true),
};
