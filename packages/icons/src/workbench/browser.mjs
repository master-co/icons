import {figure,mark} from '../families/shared.mjs';
import {knockout} from '../occlusion.mjs';

function tab(g) {
  const f=figure(g);
  return [f.rect(3,4,18,16),f.contour([[10.2,4.5],[12.4,8.6],[20.5,8.6]],false,g.tip)];
}
function windowFrame(g) {
  const f=figure(g);
  return [f.rect(3,4,18,16),f.line(3.5,8.7,20.5,8.7)];
}
export const browser={
  'tab-new':g=>[...tab(g),...mark(g,'plus',12,13.5)],
  'tab-close':g=>[...tab(g),...mark(g,'x',12,13.5)],
  'tab-restore'(g) {
    const f=figure(g);
    return [...tab(g),...f.arrow([f.path('M12 16.9H14C18 16.9 18 11.5 14 11.5H8.5')],[[10.8,9.4],[8.5,11.5],[10.8,13.6]])];
  },
  'tab-pin'(g) {
    const f=figure(g);
    const head=f.contour([[14.4,10.3],[20.6,10.3],[19.5,12.4],[19.5,14.5],[21,16.8],[14,16.8],[15.5,14.5],[15.5,12.4]],true,g.tip);
    return knockout(tab(g),[head,f.line(17.5,16.8,17.5,21.2)],g,{silhouettes:[head]});
  },
  'tab-search'(g) {
    const f=figure(g),lens=f.circle(16.4,15.9,3.7);
    return knockout(tab(g),[lens,f.line(19.2,18.7,21.6,21.1)],g,{silhouettes:[lens]});
  },
  'window-new':g=>[...windowFrame(g),...mark(g,'plus',12,14.4)],
  'window-restore'(g) {
    const f=figure(g);
    return [f.contour([[7.8,4.1],[20.8,4.1],[20.8,15.6]],false,g.r),f.rect(3.2,8.3,13.2,11.6)];
  },
  'window-minimize':g=>[...windowFrame(g),figure(g).line(8.7,16,15.3,16)],
};
