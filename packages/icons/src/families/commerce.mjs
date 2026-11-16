import { knockout, enclosedDetails } from '../occlusion.mjs';
import { file } from "./core.mjs";
import { figure } from "./shared.mjs";
function coinStack(g, left, top, width, depth) {
  const f=figure(g),right=left+width,r=width/2,bottom=top+depth;
  const shell=f.path(`M${left} ${top}A${r} 2.5 0 0 1 ${right} ${top}V${bottom}A${r} 2.5 0 0 1 ${left} ${bottom}Z`);
  const seam=f.path(`M${left} ${top}A${r} 2.5 0 0 0 ${right} ${top}`);
  return {shell,nodes:enclosedDetails(shell,[seam],g)};
}
const commerce = {
  banknote: (g) => {
    const f = figure(g);
    return [f.rect(2.5, 5.5, 19, 13), f.circle(12, 12, 3), f.dot(6, 12, g.stroke / 2), f.dot(18, 12, g.stroke / 2)];
  },
  coins: (g) => {
    const front=coinStack(g,10,14,11,4),back=coinStack(g,3,7,10,5.5);
    return knockout(back.nodes,front.nodes,g,{silhouettes:[front.shell]});
  },
  receipt: (g) => {
    const f = figure(g);
    return [f.contour([[5.5, 3], [18.5, 3], [18.5, 21], [15, 19], [12, 21], [9, 19], [5.5, 21]], true, Math.min(g.r, 0.8)), f.line(9, 8, 15, 8), f.line(9, 12.5, 15, 12.5)];
  },
  invoice: (g) => {
    const f = figure(g);
    return [...file(g), f.line(8.5, 11, 12, 11), f.line(8.5, 15, 15.5, 15), f.line(12.5, 18, 15.5, 18), ...g.s === 16 ? [] : [f.dot(8.5, 18, g.stroke / 2)]];
  },
  percent: (g) => {
    const f = figure(g);
    return [f.line(5, 19, 19, 5), f.circle(7, 7, 2.5), f.circle(17, 17, 2.5)];
  },
  ticket: (g) => {
    const f = figure(g), k = Math.min(g.r * 24 / g.s, 1.5);
    const shell=k===0?'M2.5 5H21.5V9A3 3 0 0 0 21.5 15V19H2.5V15A3 3 0 0 0 2.5 9V5Z':`M${2.5 + k} 5H${21.5 - k}Q21.5 5 21.5 ${5 + k}V9A3 3 0 0 0 21.5 15V${19 - k}Q21.5 19 ${21.5 - k} 19H${2.5 + k}Q2.5 19 2.5 ${19 - k}V15A3 3 0 0 0 2.5 9V${5 + k}Q2.5 5 ${2.5 + k} 5Z`;
    return [f.path(shell), ["path", { ...f.line(15, 7.5, 15, 16.5)[1], "stroke-linecap": "butt", "stroke-dasharray": g.s === 16 ? `${f.u(2.5)} ${f.u(4)}` : `${f.u(1.5)} ${f.u(2.25)}` }]];
  },
  gift: (g) => {
    const f = figure(g);
    return [f.rect(3, 8, 18, 4, Math.min(g.r, 0.8)), f.contour([[5, 12], [5, 21], [19, 21], [19, 12]], false, g.r), f.line(12, 8, 12, 21), f.path("M12 8C8 8 5.5 7 5.5 4.5C5.5 1 11 2.5 12 8C13 2.5 18.5 1 18.5 4.5C18.5 7 16 8 12 8")];
  },
  repeat: (g) => {
    const f = figure(g);
    return [...f.arrow([f.path("M3.5 10V9Q3.5 6 6.5 6H20.5")],[[17,2.5],[20.5,6],[17,9.5]]),...f.arrow([f.path("M20.5 14V15Q20.5 18 17.5 18H3.5")],[[7,14.5],[3.5,18],[7,21.5]])];
  },
  "shopping-cart": (g) => {
    const f = figure(g);
    return [f.contour([[2.5, 3.5], [5, 3.5], [7.5, 16], [19, 16]], false, Math.min(g.r, 1)), f.contour([[5.7, 7], [21, 7], [19, 12.5], [7, 12.5]], false, Math.min(g.r, 1)), ...g.s === 16 ? [f.dot(9, 20, 1), f.dot(18, 20, 1)] : [f.circle(9, 20, 1.5), f.circle(18, 20, 1.5)]];
  },
  "shopping-bag": (g) => {
    const f = figure(g);
    return [f.contour([[4.5, 8], [19.5, 8], [18.5, 21], [5.5, 21]], true, g.r), f.path("M8.5 10V6.5A3.5 3.5 0 0 1 15.5 6.5V10")];
  },
  store: (g) => {
    const f = figure(g);
    return [f.path("M3 8L6 3H18L21 8Q21 11 18 11Q15 11 15 8Q15 11 12 11Q9 11 9 8Q9 11 6 11Q3 11 3 8Z"), f.contour([[4.5, 11], [4.5, 21], [19.5, 21], [19.5, 11]], false, g.r), f.contour([[9, 21], [9, 15], [15, 15], [15, 21]], false, Math.min(g.r, 1))];
  },
  package: (g) => {
    const f = figure(g);
    return enclosedDetails(f.contour([[12, 2.5], [21, 7.5], [21, 17], [12, 22], [3, 17], [3, 7.5]], true, g.r), [f.contour([[3, 7.5], [12, 12.5], [21, 7.5]]), f.line(12, 12.5, 12, 22), ...(g.s === 16 ? [] : [f.line(7.5, 5, 16.5, 10)])], g);
  },
  truck: (g) => {
    const f = figure(g);
    return [f.contour([[4.5, 18], [3, 18], [3, 5], [14, 5], [14, 18], [8.5, 18]], false, g.r), f.contour([[14, 9], [18, 9], [22, 14], [22, 18], [20, 18]], false, Math.min(g.r, 1)), f.line(14, 18, 16, 18), f.circle(6.5, 18, 2), f.circle(18, 18, 2)];
  },
  "map-pin": (g) => {
    const f = figure(g);
    return [f.path("M12 21.5C9 18.5 5 14.5 5 10A7 7 0 0 1 19 10C19 14.5 15 18.5 12 21.5Z"), f.circle(12, 10, 2.7)];
  },
  map: (g) => {
    const f = figure(g);
    const shell=f.contour([[3, 6], [9, 3], [15, 6], [21, 3], [21, 18], [15, 21], [9, 18], [3, 21]], true, Math.min(g.r, 0.7));
    return enclosedDetails(shell,[f.line(9, 3, 9, 18), f.line(15, 6, 15, 21)],g);
  },
  "credit-card": (g) => {
    const f = figure(g);
    return [f.rect(2.5, 5, 19, 14), f.line(2.5, 10, 21.5, 10), f.line(6, 15, 10, 15)];
  },
  wallet: (g) => {
    const f = figure(g);
    return [f.contour([[20, 10], [20, 7], [3, 7], [3, 21], [20, 21], [20, 17]], false, g.r), f.path("M3 7V5Q3 3 5 3H17V7"), f.rect(14, 10, 7, 7, Math.min(g.r, 1.5)), f.dot(17, 13.5, g.stroke / 2)];
  }
};
export {
  commerce
};
