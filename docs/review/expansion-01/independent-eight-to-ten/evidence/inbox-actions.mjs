import {figure,mark} from '../families/shared.mjs';
import {coreDrawings} from '../families/core.mjs';
import {knockout} from '../occlusion.mjs';

function reply(g,all=false){
  const f=figure(g),x=all?9:4,wing=all?3.5:5;
  const join=x+(g.corner==='sharp'?g.stroke*12/g.s:0);
  return [f.contour([[x+wing,10-wing],[x,10],[x+wing,10+wing]],false,g.tip),
    f.path(`M ${join} 10 H 14 C 18 10 20 12 20 16 V 18`),
    ...(all?[f.contour([[6.5,6.5],[3,10],[6.5,13.5]],false,g.tip)]:[])];
}

function mailSearch(g){
  const f=figure(g),r=3.1,circle=f.circle(16.5,17,r),t=r/Math.sqrt(2);
  return knockout(coreDrawings.mail(g),[circle,f.line(16.5+t,17+t,21.5,22)],g,{silhouettes:[circle]});
}

export const inboxActions={
  reply:g=>reply(g),
  'reply-all':g=>reply(g,true),
  forward:g=>reply(g).map(([tag,a])=>[tag,{...a,transform:`translate(${g.s} 0) scale(-1 1)`}]),
  rss:g=>{const f=figure(g);return [f.dot(5,19,g.v(1,1.15,1.3)),
    f.path('M 5 11 A 8 8 0 0 1 13 19'),f.path('M 5 4 A 15 15 0 0 1 20 19')];},
  'mail-plus':g=>knockout(coreDrawings.mail(g),mark(g,'plus',17.5,18),g),
  'mail-search':mailSearch,
  'message-text':g=>{const f=figure(g);return [...coreDrawings.message(g),f.line(7.5,8.5,16.5,8.5),f.line(7.5,12.5,13.5,12.5)];},
  'message-check':g=>[...coreDrawings.message(g),...mark(g,'check',12,10)],
};
