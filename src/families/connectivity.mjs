import { figure, mark, rotate } from "./shared.mjs";
import { coreDrawings } from "./core.mjs";
import { editor } from "./editor.mjs";
function cloud(g, open = false) {
  const f = figure(g);
  return [f.path(open ? "M5 18.2C1.5 16.8 2 12 4.5 11C4.5 7.4 7.4 4.5 11 4.5C14.3 4.5 16.3 6.5 17.1 9.5H17.5C23.2 9.5 23.5 16.5 19 18.25" : "M6.5 18.5H17.5C23.5 18.5 23.5 9.5 17.5 9.5H17.1C16.3 6.5 14.3 4.5 11 4.5C7.4 4.5 4.5 7.4 4.5 11C1.2 12.2 2.5 18.5 6.5 18.5Z")];
}
const connectivity = {
  cloud: (g) => cloud(g),
  "cloud-upload": (g) => {
    const f = figure(g);
    return [...cloud(g, true), f.line(12, 12, 12, 22), f.contour([[8.5, 15.5], [12, 12], [15.5, 15.5]])];
  },
  "cloud-download": (g) => {
    const f = figure(g);
    return [...cloud(g, true), f.line(12, 12, 12, 22), f.contour([[8.5, 18.5], [12, 22], [15.5, 18.5]])];
  },
  wifi: (g) => {
    const f = figure(g);
    return [f.path("M2.5 8.5Q12 .5 21.5 8.5"), f.path("M5.5 12Q12 6.5 18.5 12"), f.path("M8.5 15.5Q12 12.5 15.5 15.5"), f.dot(12, 19, g.stroke / 2)];
  },
  "wifi-off": (g) => {
    const f = figure(g);
    return [f.path("M9.5 4.7Q16 3.7 21.5 8.5M2.5 8.5L4 7.4"), f.path("M13.5 9.3Q16 9.8 18.5 12M5.5 12Q7 10.7 8.5 10"), f.path("M8.5 15.5Q10.5 13.8 12 14"), f.dot(12, 19, g.stroke / 2), f.line(3, 3, 21, 21)];
  },
  plug: (g) => {
    const f = figure(g);
    return [f.path("M6.5 9H17.5V13A5.5 5.5 0 0 1 6.5 13Z"), f.line(8.5, 3, 8.5, 9), f.line(15.5, 3, 15.5, 9), f.line(12, 18.5, 12, 22)];
  },
  unplug: (g) => {
    const f = figure(g);
    return rotate([
      f.path("M7.5 7V5A4.5 4.5 0 0 1 16.5 5V7Z"),
      f.line(12, 0.5, 12, -1),
      f.path("M7.5 16H16.5V19A4.5 4.5 0 0 1 7.5 19Z"),
      f.line(9, 12, 9, 16),
      f.line(15, 12, 15, 16),
      f.line(12, 23.5, 12, 25)
    ], 45, g);
  },
  battery: (g) => {
    const f = figure(g);
    return [f.rect(2, 6.5, 17, 11), f.line(22, 10, 22, 14)];
  },
  "battery-charging": (g) => {
    const f = figure(g);
    return [f.contour([[7, 6.5], [2, 6.5], [2, 17.5], [6, 17.5]], false, g.r), f.contour([[15, 6.5], [19, 6.5], [19, 17.5], [14, 17.5]], false, g.r), f.line(22, 10, 22, 14), f.contour([[12, 4.5], [8, 12], [13, 12], [9, 19.5]])];
  },
  clock: (g) => {
    const f = figure(g);
    return [f.circle(12, 12, 9), f.contour([[12, 6.5], [12, 12], [16, 14.5]])];
  },
  history: (g) => {
    const f = figure(g);
    return [...editor["rotate-left"](g), f.contour([[12, 7], [12, 12], [15, 14]])];
  },
  "calendar-days": (g) => {
    const f = figure(g);
    return [...coreDrawings.calendar(g).slice(0, 4), ["rect", { ...f.rect(6.75, 12.75, 2.5, 2.5, 0)[1], fill: "currentColor", stroke: "none" }], f.dot(16, 14, g.stroke / 2), f.line(7.5, 18, 16, 18)];
  },
  "calendar-check": (g) => [...coreDrawings.calendar(g).slice(0, 4), ...mark(g, "check", 12, 15)],
  "alarm-clock": (g) => {
    const f = figure(g);
    return [f.circle(12, 13, 7.5), f.contour([[12, 8.5], [12, 13], [15, 14.5]]), f.line(2.5, 6, 6, 2.5), f.line(18, 2.5, 21.5, 6), f.line(6.5, 18.5, 4.5, 21.5), f.line(17.5, 18.5, 19.5, 21.5)];
  },
  sun: (g) => {
    const f = figure(g);
    return [f.circle(12, 12, 4.5), ...Array.from({ length: 8 }, (_, i) => {
      const a = i * Math.PI / 4;
      return f.line(12 + Math.cos(a) * 8, 12 + Math.sin(a) * 8, 12 + Math.cos(a) * 10, 12 + Math.sin(a) * 10);
    })];
  },
  moon: (g) => [figure(g).path("M20.5 14A9 9 0 1 1 9.5 3.5A7 7 0 0 0 20.5 14Z")]
};
export {
  connectivity
};
