import {figure,mark,rotate} from '../families/shared.mjs';
import {knockout} from '../occlusion.mjs';

function cellTravel(g,next) {
  const f=figure(g),tip=next?16.4:7.6,tail=24-tip,wing=next?13.8:10.2;
  return [f.rect(2.8,3.5,18.4,17),f.line(2.8,13.4,21.2,13.4),f.line(12,13.4,12,20.5),
    ...f.arrow([f.line(tail,8.5,tip,8.5)],[[wing,6],[tip,8.5],[wing,11]])];
}
function cellContent(g,y) {
  const f=figure(g);
  return [f.rect(4,2.8,16,18.4),f.line(7.7,y,16.3,y),f.line(7.7,y+3.8,13.6,y+3.8)];
}
function columnWidth(g) {
  const f=figure(g);
  return [f.rect(3.5,3.5,17,9),f.line(12,3.5,12,12.5),
    f.path('M3.5 16V21M3.5 18.5H20.5M20.5 16V21')];
}
export const tables={
  'table-header-cell'(g) {
    const f=figure(g);
    return [f.rect(2.8,3.5,18.4,17),f.line(12,3.5,12,20.5),f.line(2.8,12,21.2,12),
      f.line(5.7,9.2,8.8,6.1)];
  },
  'table-cell-next':g=>cellTravel(g,true),'table-cell-previous':g=>cellTravel(g,false),
  'cell-align-top':g=>cellContent(g,6.8),'cell-align-middle':g=>cellContent(g,10.1),
  'cell-align-bottom':g=>cellContent(g,13.4),
  'table-column-width':columnWidth,'table-row-height':g=>rotate(columnWidth(g),-90,g),
  'table-transpose'(g) {
    const f=figure(g);
    return [f.rect(2.8,3.2,12,5.8,Math.min(g.r,1.2)),f.line(8.8,3.2,8.8,9),
      f.rect(15.2,11.3,5.8,9.6,Math.min(g.r,1.2)),f.line(15.2,16.1,21,16.1),
      ...f.arrow([f.contour([[4.5,12.5],[4.5,17.5],[11.5,17.5]],false,g.r)],[[8.9,14.9],[11.5,17.5],[8.9,20.1]])];
  },
  'table-insert'(g) {
    const f=figure(g);
    return knockout([f.rect(2.8,3.7,17.6,15.7),f.line(2.8,10.5,20.4,10.5),f.line(10,3.7,10,19.4)],
      mark(g,'plus',19.2,18.4),g);
  },
};

// Each of the nine reference points belongs either to a painted edge or to
// the unpainted grid. Drawing a second dot on an edge would thicken its joint.
function borders(g,rows,cols) {
  const f=figure(g),points=[4,12,20],nodes=[];
  for(const i of rows) nodes.push(f.line(4,points[i],20,points[i]));
  for(const i of cols) nodes.push(f.line(points[i],4,points[i],20));
  for(const [y,cy] of points.entries())for(const [x,cx] of points.entries()){
    if(!rows.includes(y)&&!cols.includes(x))nodes.push(f.dot(cx,cy,g.stroke*.54));
  }
  return nodes;
}
function borderedFrame(g,all) {
  const f=figure(g),frame=f.rect(4,4,16,16);
  return all?[frame,f.line(4,12,20,12),f.line(12,4,12,20)]:[frame,...[[8,12],[12,12],[16,12],[12,8],[12,16]].map(([x,y])=>f.dot(x,y,g.stroke*.48))];
}
export const borderTools={
  'border-all':g=>borderedFrame(g,true),'border-outer':g=>borderedFrame(g,false),
  'border-none':g=>borders(g,[],[]),'border-inner':g=>borders(g,[1],[1]),
  'border-horizontal':g=>borders(g,[1],[]),'border-vertical':g=>borders(g,[],[1]),
  'border-top':g=>borders(g,[0],[]),'border-bottom':g=>borders(g,[2],[]),
  'border-left':g=>borders(g,[],[0]),'border-right':g=>borders(g,[],[2]),
};
