import { contour, line } from '../geometry.mjs';
import { enclosedDetails, knockout } from '../occlusion.mjs';
import { figure } from "./shared.mjs";
export function imageFrame(g,{left=3,top=4,width=18,height=16,radius=g.r}={}){return figure(g).rect(left,top,width,height,radius);}
function speaker(g) {
  return [figure(g).contour([[3, 9], [7, 9], [12, 4.5], [12, 19.5], [7, 15], [3, 15]], true, Math.min(g.r, 0.6))];
}
function headphones(g, {bottom=20}={}) {
  const f = figure(g);
  return [f.path("M3.5 13V11A8.5 8.5 0 0 1 20.5 11V13"), f.rect(3.5, 13, 4.5, bottom-13, Math.min(g.r, 1.5)), f.rect(16, 13, 4.5, bottom-13, Math.min(g.r, 1.5))];
}
// Playback controls share one triangle; a circular housing needs a smaller
// native glyph and fillet, without scaling its stroke along with its bounds.
export function playSymbol(g, {enclosed=false}={}) {
  const points=[[7,4.5],[20,12],[7,19.5]];
  if(!enclosed)return [figure(g).contour(points,true,Math.min(g.r,1.2))];
  const scale=g.v(.58,.56,.54)*g.s/24;
  return [contour(points.map(([x,y])=>[g.c+(x-12)*scale,g.c+(y-12)*scale]),g.tip,true)];
}
export function pauseSymbol(g, {enclosed=false}={}) {
  const f=figure(g);
  if(!enclosed)return [f.rect(6,4.5,4,15,Math.min(g.r,.8)),f.rect(14,4.5,4,15,Math.min(g.r,.8))];
  // Hollow bars would leave subpixel counters inside the ring. Retain their
  // two axes as stems. Their vertical weight needs more headroom than the
  // triangle's tapering corners, especially beside check-circle at 16px.
  const half=g.v(2.5,3.2,3.8),offset=g.v(1.5,1.9,2.25);
  return [-offset,offset].map(x=>line(g.c+x,g.c-half,g.c+x,g.c+half));
}
const media = {
  pause:g=>pauseSymbol(g),
  stop: (g) => [figure(g).rect(6, 6, 12, 12, Math.min(g.r, 1.5))],
  "skip-forward": (g) => {
    const f = figure(g);
    return [f.contour([[4, 5], [15.5, 12], [4, 19]], true, Math.min(g.r, 1)), f.line(20, 5, 20, 19)];
  },
  "skip-back": (g) => media["skip-forward"](g).map(([t, a]) => [t, { ...a, transform: `translate(${g.s} 0) scale(-1 1)` }]),
  volume: (g) => {
    const f = figure(g);
    return [...speaker(g), f.path("M15.5 9C17 10.5 17 13.5 15.5 15"), f.path("M18.5 5.5C22 9 22 15 18.5 18.5")];
  },
  "volume-off": (g) => {
    const f = figure(g);
    return [...speaker(g), f.line(16.5, 9.5, 21.5, 14.5), f.line(21.5, 9.5, 16.5, 14.5)];
  },
  microphone: (g) => {
    const f = figure(g);
    return [f.rect(8.5, 3, 7, 11, f.u(3.5)), f.path("M5.5 10.5V12.5A6.5 6.5 0 0 0 18.5 12.5V10.5"), f.line(12, 19, 12, 22)];
  },
  "microphone-off": (g) => {
    const f = figure(g);
    return knockout(media.microphone(g),[f.line(3,3,21,21)],g);
  },
  headphones,
  image: (g) => {
    const f = figure(g);
    const frame=imageFrame(g);
    const landscape=f.contour([[7, 20], [15, 11], [21, 17]], false, g.tip);
    return [...enclosedDetails(frame,[landscape],g), f.dot(7.5, 8.5, g.v(0.9, 1.1, 1.25))];
  },
  images: (g) => {
    const f = figure(g);
    const frame=f.rect(7, 3, 14, 14);
    const landscape=f.contour([[7, 14], [12.5, 9.5], [21, 14]], false, g.tip);
    return [f.contour([[3, 7], [3, 21], [17, 21]], false, g.r),
      ...enclosedDetails(frame,[landscape],g), f.dot(10.5, 6.5, g.v(0.75, 0.9, 1))];
  },
  camera: (g) => {
    const f = figure(g);
    return [f.contour([[3, 7], [6.5, 7], [8, 4], [16, 4], [17.5, 7], [21, 7], [21, 20], [3, 20]], true, g.r), f.circle(12, 13, 4)];
  },
  video: (g) => {
    const f = figure(g);
    const lens=f.contour([[15, 10], [21, 6.5], [21, 17.5], [15, 14]], false, Math.min(g.r, 1));
    // End the lens at the body wall: diagonal square caps create small
    // inward spikes inside the camera, even though its outer bounds fit.
    lens[1]["stroke-linecap"]="butt";
    return [f.rect(3, 5.5, 12, 13), lens];
  },
  play:g=>playSymbol(g)
};
export {
  headphones,
  media
};
