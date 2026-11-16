import { figure } from "./shared.mjs";
import { headphones } from "./media.mjs";
const support = {
  bug: (g) => {
    const f = figure(g);
    return [f.path("M7 8H17V15A5 5 0 0 1 7 15ZM9 8V6A3 3 0 0 1 15 6V8"), ...[10, 14, 18].flatMap((y, i) => [f.line(7, y, 3, y + (i - 1) * 2), f.line(17, y, 21, y + (i - 1) * 2)]), ...g.s === 16 ? [] : [f.line(12, 8, 12, 20)]];
  },
  flag: (g) => {
    const f = figure(g);
    return [f.line(5, 4, 5, 21), f.path("M5 4C10 1 14 7 19 4V14C14 17 10 11 5 14")];
  },
  "mail-open": (g) => {
    const f = figure(g);
    return [f.contour([[3, 9], [12, 3], [21, 9], [21, 21], [3, 21]], true, g.r), f.contour([[3, 9], [12, 15], [21, 9]])];
  },
  inbox: (g) => {
    const f = figure(g);
    return [f.contour([[3, 12], [6.5, 5], [17.5, 5], [21, 12], [21, 20], [3, 20]], true, g.r), f.contour([[3, 12], [8, 12], [9.5, 15], [14.5, 15], [16, 12], [21, 12]], false, Math.min(g.r, 1))];
  },
  send: (g) => {
    const f = figure(g);
    return [f.contour([[3, 10], [21, 3], [14, 21], [10.5, 13.5]], true, g.tip), f.line(10.5, 13.5, 21, 3)];
  },
  messages: (g) => {
    const f = figure(g);
    return [f.contour([[3, 3], [17, 3], [17, 13], [8, 13], [3, 17]], true, g.r), f.contour([[21, 8], [21, 21], [16, 17], [11, 17]], false, g.r)];
  },
  phone: (g) => {
    const f = figure(g), k = g.corner === "sharp" ? 0 : g.corner === "soft" ? 0.6 : 1.1;
    return [f.path(`M5 3H${8 - k}Q8 3 ${8 + k * 0.4} ${3 + k}L${10 - k * 0.4} ${8 - k}Q10 8 ${10 - k} ${8 + k * 0.7}L7.5 10C9 13 11 15 14 16.5L${16 - k * 0.7} ${14 + k}Q16 14 ${16 + k} ${14 + k * 0.4}L${21 - k} ${16 - k * 0.4}Q21 16 21 ${16 + k}V19C21 20.5 20 21 18.5 21C10 21 3 14 3 5.5Q3 3 5 3Z`)];
  },
  "phone-off": (g) => {
    const f = figure(g);
    return [f.path("M5.5 13C3.9 10.5 3 8 3 5.5Q3 3 5 3H8L10 8L7.5 10L8.5 11.7"), f.path("M9.5 18.3C12 20 15 21 18.5 21C20 21 21 20.5 21 19V16L16 14L14 16.5L12.5 15.6"), f.line(3, 21, 21, 3)];
  },
  headset: (g) => {
    const f = figure(g);
    return [...headphones(g), f.path("M20.5 20Q20.5 22 18 22H12")];
  },
  "at-sign": (g) => {
    const f = figure(g);
    return [f.circle(11.5, 12, 4), f.path("M15.5 8V13C15.5 17 21 16.5 21 12C21 6 17 3 12 3C7 3 3 7 3 12C3 17 7 21 12 21C14 21 16 20.5 17.5 19.5")];
  },
  share: (g) => {
    const f = figure(g);
    return [f.circle(5.5, 12, 2.5), f.circle(18, 5, 2.5), f.circle(18, 19, 2.5), f.line(7.68, 10.78, 15.82, 6.22), f.line(7.68, 13.22, 15.82, 17.78)];
  }
};
export {
  support
};
