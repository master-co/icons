import {line} from '../geometry.mjs';
import { knockout } from '../occlusion.mjs';
import { coreDrawings } from "./core.mjs";
import { figure } from "./shared.mjs";

// The four-way move symbol and one-axis resize symbols share their shafts,
// heads and joinedArrow seam handling. A standalone axis can afford wider
// wings; the four-way mother keeps its original inter-wing clearance.
export function moveAxes(g,{axis='both',half=3}={}) {
  const f=figure(g);
  const vertical=f.arrow([f.line(12,3,12,21)],[[12-half,3+half],[12,3],[12+half,3+half]]);
  const horizontal=f.arrow([f.line(3,12,21,12)],[[21-half,12-half],[21,12],[21-half,12+half]]);
  const v=[...f.arrow(vertical.slice(0,-1),[[12-half,21-half],[12,21],[12+half,21-half]]),vertical.at(-1)];
  const h=[...f.arrow(horizontal.slice(0,-1),[[3+half,12-half],[3,12],[3+half,12+half]]),horizontal.at(-1)];
  return axis==='horizontal'?h:axis==='vertical'?v:[...v,...h];
}
export function headingStem(g,{level=false}={}) {
  const f=figure(g);
  if(!level)return [f.line(6,4,6,20),f.line(18,4,18,20),f.line(6,12,18,12)];
  const left=g.v(2,2.75,3.5),right=g.v(7.5,9.75,12);
  const top=g.v(3,3.5,4.5),bottom=g.v(13,16.5,19.5);
  return [line(left,top,left,bottom),line(right,top,right,bottom),line(left,g.c,right,g.c)];
}
function alignment(g, kind, {rows=[5,9.5,14,18.5],widths}={}) {
  const f = figure(g);
  return rows.map((y, i) => {
    const w = widths?.[i] ?? (kind === "justify" || i % 2 === 0 ? 16 : 10);
    const x = kind === "right" ? 20 - w : kind === "center" ? 12 - w / 2 : 4;
    return f.line(x, y, x + w, y);
  });
}
function zoom(g, plus) {
  const f = figure(g);
  return [...coreDrawings.search(g), f.line(7.5, 10.5, 13.5, 10.5), ...plus ? [f.line(10.5, 7.5, 10.5, 13.5)] : []];
}
const editor = {
  "align-right": (g) => alignment(g, "right"),
  "align-justify": (g) => alignment(g, "justify"),
  "list-ordered": (g) => {
    const f = figure(g), digits = [f.path("M3 5L4.5 4V9M3 9H6"), f.path("M3 14.5C3 12.5 6 12.5 6 14.5C6 16 3 16.5 3 19H6")];
    return [...digits.map(([t, a]) => [t, { ...a, "stroke-width": g.stroke * 0.8 }]), f.line(10, 7, 21, 7), f.line(10, 17, 21, 17)];
  },
  "list-checks": (g) => {
    const f = figure(g);
    return [6, 12, 18].flatMap((y) => [f.contour([[2.5, y], [4, y + 1.5], [7, y - 1.5]]), f.line(11, y, 21, y)]);
  },
  quote: (g) => {
    const f = figure(g), k = g.corner === "sharp" ? 0 : g.corner === "soft" ? 0.65 : 1.2;
    if(k===0)return [3.5,14].map(x=>f.path(`M${x} 5H${x+6.5}V13C${x+6.5} 17 ${x+3.5} 19 ${x} 19V16C${x+2.5} 16 ${x+3} 14.5 ${x+3} 12H${x}Z`));
    return [3.5, 14].map((x) => f.path(`M${x + k} 5H${x + 6.5 - k}Q${x + 6.5} 5 ${x + 6.5} ${5 + k}V13C${x + 6.5} 17 ${x + 3.5} 19 ${x} 19V16C${x + 2.5} 16 ${x + 3} 14.5 ${x + 3} 12H${x + k}Q${x} 12 ${x} ${12 - k}V${5 + k}Q${x} 5 ${x + k} 5Z`));
  },
  move: g=>moveAxes(g),
  "zoom-in": (g) => zoom(g, true),
  "zoom-out": (g) => zoom(g, false),
  bold: (g) => {
    const f = figure(g);
    return [f.path("M7 4.5H12.5C18.5 4.5 18.5 11.5 12.5 11.5H7M7 4.5V19.5H13.5C20 19.5 20 11.5 13.5 11.5")];
  },
  italic: (g) => {
    const f = figure(g);
    return [f.line(10, 4.5, 19, 4.5), f.line(5, 19.5, 14, 19.5), ["path",{...f.line(14.5,4.5,9.5,19.5)[1],"stroke-linecap":"butt"}]];
  },
  underline: (g) => {
    const f = figure(g);
    return [f.path("M6.5 4V11.5C6.5 18.5 17.5 18.5 17.5 11.5V4"), f.line(4.5, 21, 19.5, 21)];
  },
  strikethrough: (g) => {
    const f = figure(g);
    return knockout([f.path("M17 5H11C7 5 5.5 7.5 7.5 9.5C9.5 11.5 14.5 12.5 16.5 14.5C19.5 17.5 16 20 12.5 20H6.5")], [f.line(3.5, 12, 20.5, 12)], g);
  },
  heading:g=>headingStem(g),
  "align-left": (g) => alignment(g, "left"),
  "align-center": (g) => alignment(g, "center"),
  pencil: (g) => {
    const f = figure(g);
    return [f.contour([[3.5, 20.5], [5, 15], [16.5, 3.5], [20.5, 7.5], [9, 19]], true, Math.min(g.r, 0.7)), f.line(14.5, 5.5, 18.5, 9.5)];
  },
  "pen-tool": (g) => {
    const f = figure(g);
    return [f.contour([[3, 3], [16, 7], [18, 13], [13, 18], [7, 16]], true, g.tip), f.contour([[13, 18], [16, 21], [21, 16], [18, 13]], false, Math.min(g.r, 0.7)), f.circle(11, 11, g.s === 16 ? 2 : 2.3), f.line(3.5, 3.5, 9.4, 9.4)];
  },
  crop: (g) => {
    const f = figure(g);
    return [f.contour([[6, 2.5], [6, 18], [21.5, 18]], false, g.r), f.contour([[2.5, 6], [18, 6], [18, 21.5]], false, g.r)];
  },
  "rotate-left": (g) => {
    const f = figure(g);
    return f.arrow([f.path("M4 13A8 8 0 1 0 6.3 6.3L3.5 9")],[[3.5,3.5],[3.5,9],[9,9]]);
  },
  "rotate-right": (g) => editor["rotate-left"](g).map(([t, a]) => [t, { ...a, transform: `translate(${g.s} 0) scale(-1 1)` }])
};
export {
  alignment,
  editor
};
