import {devices as inputDevices} from '../families/devices.mjs';
import {figure,mark} from '../families/shared.mjs';
import {knockout} from '../occlusion.mjs';

export const devices={
  'monitor-smartphone'(g) {
    const f=figure(g),phone=f.rect(15.4,9.6,6.6,11.1,Math.min(g.r,1.4));
    return knockout([f.rect(2.6,3.8,16.8,12),f.line(10,16,10,20),f.line(6.8,20,13.2,20)],[phone],g,{silhouettes:[phone]});
  },
  'screen-rotate'(g) {
    const f=figure(g);
    return [f.contour([[7.1,7.9],[12.4,3.2],[20.3,12.2],[15,16.9]],true,g.r),
      ...f.arrow([f.path('M3.6 11.3C3.1 15.8 6.7 19.6 11.7 19.6H13')],[[10.4,17.2],[13,19.6],[10.4,21.8]])];
  },
  'brightness-auto'(g) {
    const f=figure(g);
    return [f.contour([[3,9],[6.5,7],[8.7,3.5],[12,4.5],[15.3,3.5],[17.5,7],[21,9],[20,12],[21,15],[17.5,17],[15.3,20.5],[12,19.5],[8.7,20.5],[6.5,17],[3,15],[4,12]],true,g.tip),
      f.contour([[8.9,15.3],[12,8.5],[15.1,15.3]]),f.line(10.2,13.2,13.7,13.2)];
  },
  'bluetooth-connected'(g) {
    const f=figure(g);
    return [...inputDevices.bluetooth(g),f.dot(4.3,12,1.15),f.dot(20.2,12,1.15)];
  },
  'signal-bars'(g) {
    const f=figure(g);
    return [4.5,8,11.5,15].map((h,i)=>f.line(4.3+i*5.1,19.5-h,4.3+i*5.1,19.5));
  },
  'signal-off'(g) {
    const f=figure(g);
    return [f.line(4.3,15,4.3,19.5),f.line(9.4,11.5,9.4,19.5),...mark(g,'x',17.4,8.3)];
  },
  hotspot(g) {
    const f=figure(g);
    return [f.dot(12,12,1.55),f.path('M8.2 8.5C6.1 10.5 6.1 13.5 8.2 15.5M15.8 8.5C17.9 10.5 17.9 13.5 15.8 15.5M5.2 5.3C1.4 9 1.4 15 5.2 18.7M18.8 5.3C22.6 9 22.6 15 18.8 18.7')];
  },
  nfc(g) {
    const f=figure(g);
    return [f.path('M4.4 9.8Q5.8 12 4.4 14.2M8.4 7.5Q11.2 12 8.4 16.5M12.5 5.2Q16.8 12 12.5 18.8M16.8 3Q22.4 12 16.8 21')];
  },
  'sim-card'(g) {
    const f=figure(g);
    return [f.contour([[4.8,3],[13.8,3],[19.2,8.4],[19.2,21],[4.8,21]],true,g.r),
      f.rect(8.4,10.1,7.2,7.5,Math.min(g.r,.8)),f.line(12,10.5,12,17.2),...(g.s===16?[]:[f.line(12.4,13.8,15.2,13.8)])];
  },
};
