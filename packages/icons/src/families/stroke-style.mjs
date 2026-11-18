import {circle,contour,line,path,n} from '../geometry.mjs';

// Lucide's open-envelope / dashed-axis diagrams, rebuilt in native grids.
// The large radius describes the stroke setting, not the icon corner preset.
const guide=(node,g)=>[node[0],{...node[1],'stroke-width':n(g.stroke*.8),'stroke-linecap':'butt'}];
function cap(g,kind) {
  const {s,c,v}=g,left=v(2.5,3,3.5),right=s-left,half=v(4.5,5.5,6.5);
  const top=c-half,bottom=c+half,end=right-half;
  const outline=kind==='round'
    ?path(`M${left} ${top}H${end}A${half} ${half} 0 0 1 ${end} ${bottom}H${left}`)
    :contour([[left,top],[right,top],[right,bottom],[left,bottom]],g.tip);
  const guides=[guide(line(left,c,v(4,5,6),c),g),
    guide(line(v(5.5,7,8.5),c,v(7,9,11),c),g)];
  // Butt reaches the geometric endpoint. Projecting caps extend beyond the
  // endpoint by half the depicted stroke width, shown by the terminal dot.
  if(kind==='butt')guides.push(guide(line(v(8.5,11,13.5),c,v(10,13,16),c),g),
    guide(line(v(12,15,18),c,right,c),g));
  else guides.push(circle(end,c,g.stroke/2,{fill:'currentColor',stroke:'none'}));
  return [outline,...guides];
}
function join(g,kind) {
  const {s,v}=g,left=v(2.5,3,3.5),right=s-left,top=left,bottom=right;
  const cx=v(7.25,9,10.75),cy=s-cx,half=right-cx;
  const outline=kind==='round'
    ?path(`M${left} ${top}H${cx}A${half} ${half} 0 0 1 ${right} ${cy}V${bottom}`)
    :kind==='bevel'?contour([[left,top],[cx,top],[right,cy],[right,bottom]],g.tip)
    :contour([[left,top],[right,top],[right,bottom]],g.tip);
  const outer=v(1.75,2.25,2.75),inner=v(1.5,2,2.5);
  return [outline,guide(line(left,cy,left+outer,cy),g),
    guide(contour([[cx-inner,cy],[cx,cy],[cx,cy+inner]],g.tip),g),
    guide(line(cx,bottom-outer,cx,bottom),g)];
}
export const strokeStyles={
  'stroke-cap-butt':g=>cap(g,'butt'),
  'stroke-cap-round':g=>cap(g,'round'),
  'stroke-cap-square':g=>cap(g,'square'),
  'stroke-join-miter':g=>join(g,'miter'),
  'stroke-join-round':g=>join(g,'round'),
  'stroke-join-bevel':g=>join(g,'bevel'),
};
