import {figure,rotate,mark} from '../families/shared.mjs';
import {coreDrawings} from '../families/core.mjs';
import {analytics} from '../families/analytics.mjs';
import {line} from '../geometry.mjs';
import {knockout} from '../occlusion.mjs';

function stackedBars(g){
  const bars=coreDrawings['chart-bar'](g);
  return bars.flatMap((bar,i)=>{
    const {x,y,width,height}=bar[1],split=y+height*[.5,.4,.5][i];
    // Native chart-bar already widens 16px columns. Keep those apertures and
    // meet the frame with flat ends so square caps do not protrude sideways.
    return [bar,['path',{...line(x,split,x+width,split)[1],'stroke-linecap':'butt'}]];
  });
}

function listSearch(g){
  const f=figure(g),r=3.1,circle=f.circle(16.5,16.5,r),d=r/Math.sqrt(2);
  return knockout(coreDrawings.list(g),[circle,f.line(16.5+d,16.5+d,21.5,21.5)],g,{silhouettes:[circle]});
}

function listAction(g,kind){
  const body=coreDrawings.list(g);
  // Reserve the right column for an action. A minus on the last full-width
  // row otherwise reads as a broken text stroke instead of an independent sign.
  const ys=[g.v(4,5,6),g.c,g.v(12,15,18)];
  for(let i=0;i<3;i++)body[i*2+1]=line(g.v(6,7.5,9),ys[i],g.v(10.5,13.25,16),ys[i]);
  return knockout(body,mark(g,kind,20,12),g);
}

export const dataTools={
  'chart-bar-horizontal':g=>rotate(coreDrawings['chart-bar'](g),90,g),
  'chart-bar-stacked':stackedBars,
  'chart-scatter':g=>{const f=figure(g);return [analytics['chart-line'](g)[0],
    ...[[7.5,8.5],[10.5,14],[15.5,10.5],[19.5,5.5],[18.5,16.5]].map(([x,y])=>f.dot(x,y,g.v(.7,.85,1)))];},
  'chart-gantt':g=>{const f=figure(g);return [analytics['chart-line'](g)[0],
    f.line(7,6,14,6),f.line(10,11,20,11),f.line(14,16,21,16)];},
  'list-collapse':g=>{const f=figure(g);return [6,12,18].flatMap(y=>[
    f.contour([[3.5,y-1.4],[5.5,y],[3.5,y+1.4]],false,g.tip),f.line(10, y,21,y)]);},
  'list-search':listSearch,
  'list-plus':g=>listAction(g,'plus'),
  'list-minus':g=>listAction(g,'minus'),
};
