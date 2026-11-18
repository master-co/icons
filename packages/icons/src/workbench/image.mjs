import {figure} from '../families/shared.mjs';

export const imageAdjustments={
  exposure(g) {
    const f=figure(g);
    return [f.line(4.4,19.6,19.6,4.4),f.line(3.4,7,10.6,7),f.line(7,3.4,7,10.6),f.line(13.6,17,20.6,17)];
  },
  'color-temperature'(g) {
    const f=figure(g);
    return [f.path('M6.4 13.4V5.6C6.4 2.6 10.8 2.6 10.8 5.6V13.4C14.6 16.1 12.9 21 8.6 21S2.5 16.1 6.4 13.4Z'),
      f.circle(16.8,9.4,2.5),f.line(16.8,3.2,16.8,4.1),f.line(21.5,5.1,20.8,5.8),f.line(21.6,13.7,20.8,13)];
  },
  'color-tint'(g) {
    const f=figure(g);
    return [f.path('M12 2.9C10.5 5.2 5.1 10.9 5.1 14.7A6.9 6.9 0 0 0 18.9 14.7C18.9 10.9 13.6 5.2 12 2.9Z'),f.line(6.4,18.7,16.8,9.7)];
  },
  'color-curves'(g) {
    const f=figure(g);
    return [f.contour([[3.4,3.2],[3.4,20.5],[21.1,20.5]],false,g.tip),
      f.path('M7 16.8C10.7 16.8 12.1 15.2 13.1 12C14.5 7.5 16.3 5.8 20.6 5.8')];
  },
  'color-levels'(g) {
    const f=figure(g);
    return [f.contour([[3,15],[6.6,9.6],[9,11.4],[13.2,4],[16.7,10.2],[18.3,8.3],[21,15]],true,g.tip),
      ...[6.5,17.5].map(x=>{
        const [tag,attrs]=f.contour([[x-2.8,21],[x,17.7],[x+2.8,21]],true,g.tip);
        return [tag,{...attrs,fill:'currentColor',stroke:'none'}];
      })];
  },
  vignette(g) {
    const f=figure(g);
    return [f.rect(2.8,4.6,18.4,14.8),f.path('M3.2 10.8Q4.1 6.4 9.1 5M14.9 5Q19.9 6.4 20.8 10.8M20.8 13.2Q19.9 17.6 14.9 19M9.1 19Q4.1 17.6 3.2 13.2')];
  },
  sharpen(g) {
    const f=figure(g);
    return [f.contour([[12,3.2],[21,20],[3,20]],true,g.tip),f.line(12,5.2,12,19.6)];
  },
  blur(g) {
    const f=figure(g),rows=[[6,[9,15]],[10,[5.7,12,18.3]],[14.5,[4.4,10,15.6,20]],[18.5,[8,13.4,17.7]]];
    return rows.flatMap(([y,xs])=>xs.map(x=>f.dot(x,y,Math.max(.6,1.8-(x-4)*.073))));
  },
  straighten(g) {
    const f=figure(g);
    return [f.line(3,20.3,21,20.3),f.contour([[3.1,10.9],[18.7,4.2],[21,9.6],[5.4,16.3]],true,Math.min(g.r,.8)),
      f.line(8.2,8.9,9.1,11),f.line(13.6,6.6,14.5,8.7)];
  },
};
