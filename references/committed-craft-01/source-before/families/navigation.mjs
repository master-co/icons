import { knockout } from '../occlusion.mjs';
import { coreDrawings } from "./core.mjs";
import { figure, rotate } from "./shared.mjs";
const mirror = (nodes, g) => nodes.map(([tag,a,children])=>[tag,{ ...a, transform: `translate(${g.s} 0) scale(-1 1)` },...(children?[children]:[])]);
function doubleChevron(g) {
  const f = figure(g);
  return [5, 12].map((x) => f.contour([[x, 6], [x + 5.5, 12], [x, 18]]));
}
const navigation = {
  "arrow-left": (g) => rotate(coreDrawings["arrow-right"](g), 180, g),
  "arrow-down": (g) => rotate(coreDrawings["arrow-right"](g), 90, g),
  "chevron-left": (g) => rotate(coreDrawings["chevron-right"](g), 180, g),
  "chevron-up": (g) => rotate(coreDrawings["chevron-right"](g), -90, g),
  "chevrons-left": (g) => mirror(doubleChevron(g), g),
  "chevrons-right": doubleChevron,
  menu: (g) => {
    const f = figure(g);
    return [6, 12, 18].map((y) => f.line(4, y, 20, y));
  },
  "more-vertical": (g) => rotate(coreDrawings["more-horizontal"](g), 90, g),
  redo: (g) => mirror(coreDrawings.undo(g), g),
  "external-link": (g) => {
    const f = figure(g);
    return knockout([f.rect(4,5,15,15)], f.arrow([f.line(10,14,20,4)],[[14,4],[20,4],[20,10]]),g);
  },
  link: (g) => {
    const f = figure(g);
    return [
      f.path("M13.5 6.5L15 5A4 4 0 0 1 20.5 10.5L17.5 13.5A4 4 0 0 1 12 13.5"),
      f.path("M10.5 17.5L9 19A4 4 0 0 1 3.5 13.5L6.5 10.5A4 4 0 0 1 12 10.5")
    ];
  },
  unlink: (g) => {
    const f = figure(g);
    return [
      f.path("M14 6L15 5A4 4 0 0 1 20.5 10.5L19 12"),
      f.path("M10 18L9 19A4 4 0 0 1 3.5 13.5L5 12"),
      f.line(8, 4, 8, 7),
      f.line(16, 17, 16, 20),
      ...g.s === 16 ? [] : [f.line(3, 8, 6, 8), f.line(18, 16, 21, 16)]
    ];
  },
  "log-in": (g) => {
    const f = figure(g);
    return [f.contour([[14, 4], [20, 4], [20, 20], [14, 20]], false, g.r), ...f.arrow([f.line(3,12,14,12)],[[9,7],[14,12],[9,17]])];
  },
  "log-out": (g) => {
    const f = figure(g);
    return [f.contour([[10, 4], [4, 4], [4, 20], [10, 20]], false, g.r), ...f.arrow([f.line(10,12,21,12)],[[16,7],[21,12],[16,17]])];
  },
  refresh: (g) => {
    const f = figure(g);
    return [
      ...f.arrow([f.path("M4 10A8.2 8.2 0 0 1 18 6L20 8")],[[20,3.5],[20,8],[15.5,8]]),
      ...f.arrow([f.path("M20 14A8.2 8.2 0 0 1 6 18L4 16")],[[4,20.5],[4,16],[8.5,16]])
    ];
  }
};
export {
  navigation
};
