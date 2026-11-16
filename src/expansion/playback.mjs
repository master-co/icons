import {figure} from '../families/shared.mjs';
import {media} from '../families/media.mjs';
import {commerce} from '../families/commerce.mjs';
import {layout} from '../families/layout.mjs';
import {knockout} from '../occlusion.mjs';

function music(g){
  const f=figure(g),solid=d=>{const [tag,a]=f.path(d);return [tag,{...a,fill:'currentColor',stroke:'none'}];};
  // Note heads are filled musical symbols, not tiny ring-shaped holes.
  return [f.contour([[8,18],[8,5.5],[20,3.5],[20,16]],false,g.tip),
    solid('M 8 18 C 8 16.6 6.8 16 5.3 16.4 C 3.8 16.8 2.8 18 3.1 19.2 C 3.5 20.5 5.1 20.8 6.5 20.1 C 7.4 19.7 8 18.9 8 18 Z'),
    solid('M 20 16 C 20 14.6 18.8 14 17.3 14.4 C 15.8 14.8 14.8 16 15.1 17.2 C 15.5 18.5 17.1 18.8 18.5 18.1 C 19.4 17.7 20 16.9 20 16 Z')];
}

function fastForward(g){
  const f=figure(g);
  return [f.contour([[3,5],[10,12],[3,19]],true,g.tip),
    f.contour([[14,5],[21,12],[14,19]],true,g.tip)];
}

function shuffle(g){
  const f=figure(g),end=21;
  // A square cap extends half a stroke. Keep it inside the chevron's joint
  // instead of adding a tiny rectangular step outside the miter.
  const ascending=f.path(`M 3 18 H 5 C 10 18 12 6 17 6 H ${end}`);
  const descending=f.path(`M 3 6 H 5 C 10 6 12 18 17 18 H ${end}`);
  // A crossing depicts independent routes, unlike a joined graph node.
  const a=f.arrow([ascending],[[18,3],[21,6],[18,9]]),b=f.arrow([descending],[[18,15],[21,18],[18,21]]);
  return knockout(b,a,g);
}

export const playback={
  music,
  'audio-waveform':g=>{const f=figure(g);return [f.path('M 3 12 H 4 C 4.55 12 5 11.55 5 11 V 7 C 5 4.3 9 4.3 9 7 V 17 C 9 19.7 13 19.7 13 17 V 5 C 13 2.3 17 2.3 17 5 V 15 C 17 17.7 21 17.7 21 15 V 12')];},
  subtitles:g=>{const f=figure(g);return [f.rect(3,4.5,18,15),
    f.line(7,10,9,10),f.line(13,10,17,10),f.line(7,14.5,11,14.5),f.line(15,14.5,17,14.5)];},
  'fast-forward':fastForward,
  rewind:g=>fastForward(g).map(([tag,a])=>[tag,{...a,transform:`translate(${g.s} 0) scale(-1 1)`}]),
  shuffle,
  'repeat-one':g=>{const f=figure(g);return [...commerce.repeat(g),f.contour([[10.5,11],[12,9.5],[12,14.5]],false,g.tip)];},
  'volume-low':g=>{const f=figure(g);return [media.volume(g)[0],f.path('M15.5 9C17 10.5 17 13.5 15.5 15')];},
  'video-off':g=>knockout(media.video(g),[figure(g).line(3,3,21,21)],g),
  'screen-share':g=>{const f=figure(g);
    const arrow=f.arrow([f.line(14,10,21,3)],[[16,3],[21,3],[21,8]]);return knockout(layout.monitor(g),arrow,g);},
};
