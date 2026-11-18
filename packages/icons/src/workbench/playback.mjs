import {figure,mark} from '../families/shared.mjs';
import {playback as player} from '../expansion/playback.mjs';
import {layout} from '../families/layout.mjs';
import {knockout} from '../occlusion.mjs';

export const playback={
  'record-circle'(g) {
    const f=figure(g);
    return [f.circle(12,12,8.8),f.dot(12,12,g.v(3.7,3.6,3.5))];
  },
  eject(g) {
    const f=figure(g);
    return [f.contour([[4.1,14.2],[12,5.1],[19.9,14.2]],true,g.tip),f.line(4.1,18.9,19.9,18.9)];
  },
  'play-queue'(g) {
    const f=figure(g);
    return [f.line(3,5,20,5),f.line(3,11.7,11.8,11.7),f.line(3,18.4,9.8,18.4),
      f.contour([[15,10.4],[21.2,14.7],[15,19]],true,g.tip)];
  },
  'queue-next'(g) {
    const f=figure(g);
    return [f.line(3,5.4,20.8,5.4),f.line(3,12.2,9,12.2),f.line(3,18.8,10.8,18.8),
      ...f.arrow([f.contour([[20.7,17.8],[20.7,12.2],[13.3,12.2]],false,g.r)],[[16.3,9.4],[13.3,12.2],[16.3,15]])];
  },
  'ab-repeat'(g) {
    const f=figure(g);
    return [f.contour([[3,15],[6.3,6.6],[9.6,15]]),f.line(4.5,12.2,8.2,12.2),
      f.path('M14.8 15V6.9H17.4C20.8 6.9 20.8 10.8 17.4 10.8H15.1M17.4 10.8C21.5 10.8 21.5 15 17.4 15H14.8'),
      ...f.arrow([f.path('M20 18Q19.6 20.3 16.9 20.3H6.4')],[[8.7,18.1],[6.4,20.3],[8.7,22.2]])];
  },
  'playback-speed'(g) {
    const f=figure(g);
    return [f.path('M5.2 18.4A8.8 8.8 0 1 1 18.8 18.4'),f.line(12,3.7,12,5.6),
      f.contour([[9.7,9.2],[16,13],[9.7,16.8]],true,g.tip)];
  },
  'captions-off':g=>knockout(player.subtitles(g),[figure(g).line(3,3,21,21)],g),
  'screen-share-off'(g) {
    return knockout(layout.monitor(g),mark(g,'x',19.5,5.1),g);
  },
};
