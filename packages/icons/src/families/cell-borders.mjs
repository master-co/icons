import {square} from './core.mjs';
import {line,circle} from '../geometry.mjs';

// One 2×2 cell diagram, using the existing square's native bounds and corners.
// Tabler's full/none pair supplies the solid-grid and 21-guide-dot convention.
// Iconoir supplies the sparse perimeter/centre guides for single outside edges.
export function cellBorders(g,{solid=true,edges}={}) {
  const frame=square(g),{x:l,y:t,width,height}=frame[0][1];
  const right=l+width,bottom=t+height,cx=l+width/2,cy=t+height/2;
  const mode=edges??(solid?'all':'none');
  if(mode==='all')return [...frame,...[line(l,cy,right,cy),line(cx,t,cx,bottom)].map(([tag,attrs])=>[tag,{...attrs,'stroke-linecap':'butt'}])];
  const horizontal=mode==='inner'||mode==='horizontal';
  const vertical=mode==='inner'||mode==='vertical';
  const singleEdge=['top','bottom','left','right'].includes(mode);
  const radius=Math.max(g.stroke,g.v(1.5,1.5,1.75))/2,nodes=mode==='outer'?[...frame]:[];
  if(horizontal)nodes.push(line(l,cy,right,cy));
  if(vertical)nodes.push(line(cx,t,cx,bottom));
  if(mode==='top')nodes.push(line(l,t,right,t));
  if(mode==='bottom')nodes.push(line(l,bottom,right,bottom));
  if(mode==='left')nodes.push(line(l,t,l,bottom));
  if(mode==='right')nodes.push(line(right,t,right,bottom));
  for(let row=0;row<5;row++)for(let col=0;col<5;col++){
    if(row%2&&col%2)continue;
    // A single outside edge applies to the whole range. Its inner cell
    // dividers are irrelevant: keep just the centre locator and perimeter.
    if(singleEdge&&row>0&&row<4&&col>0&&col<4&&(row!==2||col!==2))continue;
    if(mode==='outer'&&(row===0||row===4||col===0||col===4))continue;
    if(horizontal&&row===2||vertical&&col===2)continue;
    if(mode==='top'&&row===0||mode==='bottom'&&row===4||mode==='left'&&col===0||mode==='right'&&col===4)continue;
    const x=l+width*col/4,y=t+height*row/4;
    // Guide dots form an even lattice, not the rounded contour itself.
    // Moving corner dots onto the frame arc crowds adjacent dots at 16px.
    nodes.push(circle(x,y,radius,{fill:'currentColor',stroke:'none'}));
  }
  return nodes;
}
export const cellBorderDrawings={
  'border-all':g=>cellBorders(g),
  'border-none':g=>cellBorders(g,{solid:false}),
  'border-outer':g=>cellBorders(g,{edges:'outer'}),
  'border-inner':g=>cellBorders(g,{edges:'inner'}),
  'border-horizontal':g=>cellBorders(g,{edges:'horizontal'}),
  'border-vertical':g=>cellBorders(g,{edges:'vertical'}),
  'border-top':g=>cellBorders(g,{edges:'top'}),
  'border-bottom':g=>cellBorders(g,{edges:'bottom'}),
  'border-left':g=>cellBorders(g,{edges:'left'}),
  'border-right':g=>cellBorders(g,{edges:'right'}),
};
