import { coreDrawings } from "./core.mjs";
import { figure } from "./shared.mjs";
function sort(g, descending) {
  const f = figure(g), lengths = descending ? [9, 6, 3] : [3, 6, 9];
  return [...lengths.map((w, i) => f.line(3, 6 + i * 6, 3 + w, 6 + i * 6)), ...f.arrow([f.line(18,5,18,19)],descending?[[15,16],[18,19],[21,16]]:[[15,8],[18,5],[21,8]])];
}
function axes(g) {
  return [figure(g).contour([[3.5, 4], [3.5, 20.5], [21, 20.5]], false, Math.min(g.r, 1))];
}
function trace(g) {
  return figure(g).contour([[7, 14], [11, 10], [15, 13], [20.5, 6.5]]);
}
const analytics = {
  "filter-clear": (g) => {
    const f = figure(g);
    return [...coreDrawings.filter(g), f.line(17, 16, 21, 20), f.line(21, 16, 17, 20)];
  },
  "chart-line": (g) => [...axes(g), trace(g)],
  "chart-area": (g) => {
    const f = figure(g);
    return [...axes(g), f.contour([[7,14],[11,10],[15,13],[20.5,6.5],[20.5,17],[7,17]],true,g.tip)];
  },
  "chart-pie": (g) => {
    const f = figure(g);
    return [f.circle(12, 12, 9), f.contour([[12, 3], [12, 12], [21, 12]])];
  },
  "chart-donut": (g) => {
    const f = figure(g);
    return [f.circle(12, 12, 9), f.circle(12, 12, 4.5), f.line(12, 3, 12, 7.5), f.line(16.5, 12, 21, 12), ...g.s === 16 ? [] : [f.line(8.82, 15.18, 5.636, 18.364)]];
  },
  "trending-up": (g) => {
    const f = figure(g);
    return f.arrow([f.contour([[3,17],[9,11],[13,15],[21,7]])],[[15,7],[21,7],[21,13]]);
  },
  "trending-down": (g) => {
    const f = figure(g);
    return f.arrow([f.contour([[3,7],[9,13],[13,9],[21,17]])],[[15,17],[21,17],[21,11]]);
  },
  activity: (g) => {
    const f = figure(g);
    return [f.contour([[2.5, 12], [6.5, 12], [9.5, 4], [14.5, 20], [17.5, 12], [21.5, 12]])];
  },
  gauge: (g) => {
    const f = figure(g);
    return [f.path("M4.2 18A9 9 0 1 1 19.8 18"), f.line(12, 13.5, 16.5, 8.5), ...g.s === 16 ? [] : [f.line(6, 12, 7, 12), f.line(12, 6, 12, 7)]];
  },
  table: (g) => {
    const f = figure(g);
    return [f.rect(3, 4, 18, 16), f.line(3, 9, 21, 9), f.line(9, 9, 9, 20), ...g.s === 16 ? [] : [f.line(3, 14.5, 21, 14.5)]];
  },
  "sort-ascending": (g) => sort(g, false),
  "sort-descending": (g) => sort(g, true),
  "sort-unsorted": (g) => {
    const f = figure(g);
    return [...f.arrow([f.line(7,4,7,20)],[[3.5,7.5],[7,4],[10.5,7.5]]),...f.arrow([f.line(17,4,17,20)],[[13.5,16.5],[17,20],[20.5,16.5]])];
  }
};
export {
  analytics
};
