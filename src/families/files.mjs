import { figure, mark, rotate } from "./shared.mjs";
import { file, coreDrawings } from "./core.mjs";
function bookmark(g) {
  const f = figure(g);
  return [f.contour([[5.5, 3], [18.5, 3], [18.5, 21], [12, 17], [5.5, 21]], true, g.r)];
}
function tag(g, stack = false) {
  const f = figure(g), d = stack ? 2 : 0;
  return [f.contour([[3.5 + d, 3.5], [11 + d, 3.5], [21, 11.5 - d], [11.5 + d, 21 - d], [3.5 + d, 13]], true, g.r), f.dot(7.5 + d, 7.5, g.stroke / 2)];
}
const files = {
  "clipboard-paste": (g) => {
    const f = figure(g);
    return [
      coreDrawings.clipboard(g)[1],
      f.contour([[8.5, 5.5], [5, 5.5], [5, 21], [17, 21]], false, g.r),
      f.contour([[15.5, 5.5], [19, 5.5], [19, 8]], false, g.r),
      f.line(12, 14.5, 21, 14.5),
      f.contour([[17.5, 11], [21, 14.5], [17.5, 18]])
    ];
  },
  tag: (g) => tag(g),
  tags: (g) => {
    const f = figure(g);
    return [...tag(g, true), f.contour([[2, 10], [2, 16], [8.5, 22]], false, g.r)];
  },
  bookmark,
  "bookmark-check": (g) => [...bookmark(g), ...mark(g, "check", 12, 10)],
  "folder-open": (g) => {
    const f = figure(g);
    return [
      f.contour([[3, 19.5], [3, 4.5], [9.5, 4.5], [12, 7], [20, 7], [20, 9]], false, g.r),
      f.contour([[3, 19.5], [6.5, 11], [22, 11], [19, 19.5]], true, g.r)
    ];
  },
  archive: (g) => {
    const f = figure(g);
    return [f.rect(3, 3.5, 18, 5, Math.min(g.r, 1)), f.contour([[5, 8.5], [5, 20.5], [19, 20.5], [19, 8.5]], false, g.r), f.line(9, 12.5, 15, 12.5)];
  },
  "file-plus": (g) => [...file(g), ...mark(g, "plus", 12, 14.5)],
  "file-check": (g) => [...file(g), ...mark(g, "check", 12, 14.5)],
  "file-x": (g) => [...file(g), ...mark(g, "x", 12, 14.5)],
  paperclip: (g) => {
    const f = figure(g);
    return rotate([f.path("M17 8V15A6 6 0 0 1 5 15V7A4 4 0 0 1 13 7V15A2 2 0 0 1 9 15V8")], 45, g);
  },
  save: (g) => {
    const f = figure(g);
    return [f.contour([[3.5, 3.5], [16.5, 3.5], [20.5, 7.5], [20.5, 20.5], [3.5, 20.5]], true, g.r), f.contour([[8, 3.5], [8, 8.5], [15, 8.5]], false, Math.min(g.r, 1)), f.contour([[7.5, 20.5], [7.5, 13.5], [16.5, 13.5], [16.5, 20.5]], false, Math.min(g.r, 1))];
  },
  print: (g) => {
    const f = figure(g);
    return [f.contour([[7, 8.5], [7, 3], [17, 3], [17, 8.5]], false, g.r), f.contour([[7, 17], [3, 17], [3, 8.5], [21, 8.5], [21, 17], [17, 17]], false, g.r), f.rect(7, 14, 10, 7, Math.min(g.r, 1)), ...g.s === 16 ? [] : [f.dot(17.5, 11, g.v(0.6, 0.7, 0.75))]];
  },
  scan: (g) => {
    const f = figure(g);
    return [f.contour([[4, 8], [4, 4], [8, 4]], false, g.r), f.contour([[16, 4], [20, 4], [20, 8]], false, g.r), f.contour([[20, 16], [20, 20], [16, 20]], false, g.r), f.contour([[8, 20], [4, 20], [4, 16]], false, g.r), f.line(4, 12, 20, 12)];
  },
  "clipboard-check": (g) => [...coreDrawings.clipboard(g), ...mark(g, "check", 12, 14)]
};
export {
  bookmark,
  files
};
