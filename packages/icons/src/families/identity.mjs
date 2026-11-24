import {weightDelta} from '../geometry.mjs';
import {enclosedDetails} from '../occlusion.mjs';
import { figure, mark } from "./shared.mjs";
import { person } from "./core.mjs";
// Compact portraits share their construction with the existing address book.
export function contactPortrait(g,{
  x=12.5,y=8,radius=2,left=9,right=16,bottom=17,rise=1,control=12.5,solidHead=false,
}={}) {
  const f=figure(g);
  const head=f.circle(x,y,radius);
  if(solidHead)Object.assign(head[1],{fill:'currentColor',stroke:'none'});
  return [head,f.path(`M${left} ${bottom}V${bottom-rise}C${left} ${control} ${right} ${control} ${right} ${bottom-rise}V${bottom}`)];
}
function shield(g) {
  const f = figure(g), k = g.corner === "sharp" ? 0 : g.corner === "soft" ? 0.4 : 0.8;
  // Sharp joins use the neighboring nondegenerate tangents. A zero-length
  // quadratic at the closing apex can produce an asymmetric miter spur.
  if(k===0)return [f.path("M12 3C14.5 4.8 17.5 5.7 20 6V11C20 16 17 19.5 12 21C7 19.5 4 16 4 11V6C6.5 5.7 9.5 4.8 12 3Z")];
  return [f.path(`M${12 - k} ${3 + k * 0.5}Q12 3 ${12 + k} ${3 + k * 0.5}C14.5 4.8 17.5 5.7 ${20 - k} 6Q20 6 20 ${6 + k}V11C20 16 17 19.5 ${12 + k} ${21 - k * 0.3}Q12 21 ${12 - k} ${21 - k * 0.3}C7 19.5 4 16 4 11V${6 + k}Q4 6 ${4 + k} 6C6.5 5.7 9.5 4.8 ${12 - k} ${3 + k * 0.5}Z`)];
}
function userState(g, state) {
  return [...person(g, true).slice(0, 2), ...mark(g, state, 19, 9.5)];
}
const identity = {
  contact: (g) => {
    const f = figure(g);
    // Keep the portrait's head separate from its shoulders at native 16px.
    return [f.rect(5, 3, 15, 18), f.line(3, 7, 6.5, 7), f.line(3, 17, 6.5, 17), ...contactPortrait(g)];
  },
  "user-plus": (g) => userState(g, "plus"),
  "user-minus": (g) => userState(g, "minus"),
  "user-check": (g) => userState(g, "check"),
  shield,
  "shield-check": (g) => [...shield(g), ...mark(g, "check", 12, 12)],
  "shield-alert": (g) => {
    const f = figure(g);
    return [...shield(g), f.line(12, 8, 12, 12), f.dot(12, 15.5, g.stroke / 2)];
  },
  key: (g) => {
    const f = figure(g);
    return [f.circle(16, 7.5, 4.5), f.line(12.82, 10.68, 3.5, 20), f.line(6, 17.5, 8, 19.5), f.line(9, 14.5, 11, 16.5)];
  },
  fingerprint: (g) => {
    const f = figure(g);
    if(weightDelta(g))return [f.path("M3 14V11A9 9 0 0 1 21 11V13"),f.path("M7 19C6.5 17 6.5 14 6.5 11A5.5 5.5 0 0 1 17.5 11C17.5 14.5 18 17 20 19"),f.path("M10.8 21C10 18 10 14 10 11A2 2 0 0 1 14 11C14 15 14.5 18 16.5 21")];
    return [
      f.path("M3.5 14V11A8.5 8.5 0 0 1 20.5 11V13"),
      f.path("M7 19C6.5 17 6.5 14 6.5 11A5.5 5.5 0 0 1 17.5 11C17.5 14.5 18 17 20 19"),
      f.path("M10.5 21C9.5 18 9.5 14 9.5 11A2.5 2.5 0 0 1 14.5 11C14.5 15 14.5 18 16.5 21")
    ];
  },
  building: (g) => {
    const f = figure(g), ys = g.s === 16 ? [7.5, 12] : [7, 11, 15];
    return [f.rect(5, 3, 14, 18), ...ys.flatMap((y) => [f.dot(9, y, g.stroke / 2), f.dot(15, y, g.stroke / 2)]), f.contour([[10, 21], [10, 17.5], [14, 17.5], [14, 21]], false, Math.min(g.r, 0.6))];
  },
  briefcase: (g) => {
    const f = figure(g);
    return [...enclosedDetails(f.rect(3,7,18,14),[f.path("M3 11C7 15 17 15 21 11")],g), f.contour([[8, 7], [8, 3], [16, 3], [16, 7]], false, Math.min(g.r, 1)), f.line(12, 13.5, 12, 16)];
  }
};
export {
  identity,
  shield
};
