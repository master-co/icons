import {figure,mark} from '../families/shared.mjs';
import {teamPortrait} from '../workbench/accounts.mjs';
import {knockout} from '../occlusion.mjs';
import {withClock,withLock} from './badges.mjs';

// Leave the right shoulder free for status; the head remains intact even
// where a heavy outline needs more room around a lock or magnifier.
function member(g) {
  const f=figure(g);
  return [f.circle(9.4,7.3,3.6),f.path('M3.2 20.4V18.8C3.2 12 15.6 12 15.6 18.8V20.4')];
}
function chain(g) {
  const f=figure(g);
  return [f.path('M8.3 8.9L11.4 5.8C14.7 2.5 18.8 6.6 15.6 9.8L12.7 12.7'),
    f.path('M10.4 14.8L7.9 17.3C4.6 20.6 .5 16.5 3.7 13.3L6.2 10.8'),f.line(7,14,12.5,8.5)];
}
export const access={
  'user-lock':g=>withLock(g,member(g)),
  'user-shield'(g) {
    const f=figure(g),shield=f.path('M17.2 10.3Q19.1 11.8 21.5 12V15.1Q21.5 18.9 17.2 21.1Q12.9 18.9 12.9 15.1V12Q15.3 11.8 17.2 10.3Z');
    return knockout(member(g),[shield],g,{silhouettes:[shield]});
  },
  'user-clock':g=>withClock(g,member(g)),
  'user-off'(g) {
    const f=figure(g);
    return knockout([f.circle(12,7.1,3.8),f.path('M4.3 20.4V18.8C4.3 12 19.7 12 19.7 18.8V20.4')],[f.line(3.4,3.4,20.6,20.6)],g);
  },
  'users-minus':g=>[...teamPortrait(g),...mark(g,'minus',18.8,16.5)],
  'user-search'(g) {
    const f=figure(g),lens=f.circle(16.5,14.9,3.8);
    return knockout(member(g),[lens,f.line(19.3,17.7,21.7,20.1)],g,{silhouettes:[lens]});
  },
  'link-lock':g=>withLock(g,chain(g)),
  'link-expire':g=>withClock(g,chain(g)),
  'link-copy'(g) {
    const f=figure(g);
    return [...chain(g),f.contour([[18.8,4.8],[21.1,4.8],[21.1,20.6],[9.6,20.6]],false,g.r)];
  },
  'link-settings'(g) {
    const f=figure(g);
    return knockout(chain(g),[f.line(14.3,13.6,21.4,13.6),f.line(17,11.8,17,15.4),f.line(12.8,19.4,21.4,19.4),f.line(18.8,17.6,18.8,21.2)],g);
  },
};
