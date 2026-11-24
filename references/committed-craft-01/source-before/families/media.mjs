import { enclosedDetails, knockout } from '../occlusion.mjs';
import { figure } from "./shared.mjs";
function speaker(g) {
  return [figure(g).contour([[3, 9], [7, 9], [12, 4.5], [12, 19.5], [7, 15], [3, 15]], true, Math.min(g.r, 0.6))];
}
function headphones(g, {bottom=20}={}) {
  const f = figure(g);
  return [f.path("M3.5 13V11A8.5 8.5 0 0 1 20.5 11V13"), f.rect(3.5, 13, 4.5, bottom-13, Math.min(g.r, 1.5)), f.rect(16, 13, 4.5, bottom-13, Math.min(g.r, 1.5))];
}
const media = {
  pause: (g) => {
    const f = figure(g);
    return [f.rect(6, 4.5, 4, 15, Math.min(g.r, 0.8)), f.rect(14, 4.5, 4, 15, Math.min(g.r, 0.8))];
  },
  stop: (g) => [figure(g).rect(6, 6, 12, 12, Math.min(g.r, 1.5))],
  "skip-forward": (g) => {
    const f = figure(g);
    return [f.contour([[4, 5], [15.5, 12], [4, 19]], true, Math.min(g.r, 1)), f.line(20, 5, 20, 19)];
  },
  "skip-back": (g) => media["skip-forward"](g).map(([t,a,children])=>[t,{ ...a, transform: `translate(${g.s} 0) scale(-1 1)` },...(children?[children]:[])]),
  volume: (g) => {
    const f = figure(g);
    return [...speaker(g), f.path("M15.5 9C17 10.5 17 13.5 15.5 15"), ...g.s === 16 ? [] : [f.path("M18.5 5.5C22 9 22 15 18.5 18.5")]];
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
    const frame=f.rect(3, 4, 18, 16);
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
  play: (g) => [figure(g).contour([[7, 4.5], [20, 12], [7, 19.5]], true, Math.min(g.r, 1.2))]
};
export {
  headphones,
  media
};
