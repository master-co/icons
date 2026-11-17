import { knockout } from '../occlusion.mjs';
import { coreDrawings } from "./core.mjs";
import { figure, rotate } from "./shared.mjs";
const mirror = (nodes, g) => nodes.map(([tag, a]) => [tag, { ...a, transform: `translate(${g.s} 0) scale(-1 1)` }]);
function doubleChevron(g) {
  const f = figure(g);
  return [5, 12].map((x) => f.contour([[x, 6], [x + 5.5, 12], [x, 18]]));
}
function chainLink(g, broken = false) {
  const f = figure(g);
  // A 45-degree capsule: two quarter circles share the diagonal's tangent.
  // Using A4 at these endpoints made a shallower arc and a kink at each join.
  const reach = 11 / 3 * (Math.sqrt(2) - 1);
  const cap = `C${15+reach} ${5-reach} ${20.5-reach} ${5-reach} 20.5 5C${20.5+reach} ${5+reach} ${20.5+reach} ${10.5-reach} 20.5 10.5`;
  const half = f.path((broken ? 'M14 6L15 5' : 'M13.5 6.5L15 5') + cap + (broken
    ? 'L19 12'
    : `L17.5 13.5C${17.5-reach} ${13.5+reach} ${12+reach} ${13.5+reach} 12 13.5`));
  return [half, ...rotate([half],180,g)];
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
    return chainLink(g);
  },
  unlink: (g) => {
    const f = figure(g);
    return [
      ...chainLink(g, true),
      f.line(8, 3, 8, 5.5),
      f.line(16, 18.5, 16, 21),
      f.line(3, 8, 5.5, 8),
      f.line(18.5, 16, 21, 16)
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
