import { figure, rotate } from "./shared.mjs";
import { enclosedDetails } from "../occlusion.mjs";
function panel(g, axis, value) {
  const f = figure(g);
  return [f.rect(3, 4, 18, 16), axis === "x" ? f.line(value, 4, value, 20) : f.line(3, value, 21, value)];
}
const layout = {
  dashboard: (g) => {
    const f = figure(g), r = Math.min(g.r, g.v(0.8, 1, 1.25));
    return [f.rect(3, 3, 7, 10, r), f.rect(14, 3, 7, 5, r), f.rect(3, 16, 7, 5, r), f.rect(14, 12, 7, 9, r)];
  },
  "app-window": (g) => {
    const f = figure(g);
    return [f.rect(3, 4, 18, 16), f.line(3, 9, 21, 9), f.dot(6.5, 6.5, g.v(0.55, 0.65, 0.7)), ...g.s === 16 ? [] : [f.dot(10, 6.5, g.v(0.55, 0.65, 0.7))]];
  },
  "panel-left": (g) => panel(g, "x", 9),
  "panel-right": (g) => panel(g, "x", 15),
  "panel-top": (g) => panel(g, "y", 10),
  "panel-bottom": (g) => panel(g, "y", 14),
  "layout-columns": (g) => panel(g, "x", 12),
  "layout-rows": (g) => panel(g, "y", 12),
  maximize: (g) => {
    const f = figure(g);
    return [
      f.contour([[4, 9], [4, 4], [9, 4]], false, g.r),
      f.contour([[15, 4], [20, 4], [20, 9]], false, g.r),
      f.contour([[20, 15], [20, 20], [15, 20]], false, g.r),
      f.contour([[9, 20], [4, 20], [4, 15]], false, g.r)
    ];
  },
  minimize: (g) => {
    const f = figure(g);
    return [
      f.contour([[4, 9], [9, 9], [9, 4]], false, g.r),
      f.contour([[15, 4], [15, 9], [20, 9]], false, g.r),
      f.contour([[20, 15], [15, 15], [15, 20]], false, g.r),
      f.contour([[9, 20], [9, 15], [4, 15]], false, g.r)
    ];
  },
  "grip-vertical": (g) => {
    const f = figure(g);
    const radius = g.v(1, 1.2, 1.35);
    return [6, 12, 18].flatMap((y) => [f.dot(9, y, radius), f.dot(15, y, radius)]);
  },
  "grip-horizontal": (g) => rotate(layout["grip-vertical"](g), 90, g),
  monitor: (g) => {
    const f = figure(g);
    return [f.rect(3, 4, 18, 13), f.line(12, 17, 12, 21), f.line(7.5, 21, 16.5, 21)];
  },
  smartphone: (g) => {
    const f = figure(g);
    return [f.rect(6.5, 2.5, 11, 19), f.line(10.5, 18, 13.5, 18)];
  },
  globe: (g) => {
    const f = figure(g);
    // Meridians meet at the poles without redefining the globe's silhouette.
    return enclosedDetails(f.circle(12, 12, 9), [
      f.line(3, 12, 21, 12),
      f.path("M12 3C6.5 8 6.5 16 12 21C17.5 16 17.5 8 12 3Z")
    ], g);
  }
};
export {
  layout,
  panel
};
