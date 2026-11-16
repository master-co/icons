import { figure } from "./shared.mjs";
function checkbox(g) {
  return [figure(g).rect(4, 4, 16, 16)];
}
function radio(g) {
  return [figure(g).circle(12, 12, 8)];
}
function toggle(g, on) {
  const f = figure(g);
  return [f.rect(2.5, 7, 19, 10, f.u(5)), f.dot(on ? 16.5 : 7.5, 12, g.v(1.45, 1.8, 2.2))];
}
const forms = {
  "eye-off": (g) => {
    const f = figure(g);
    return [
      f.path("M9.5 5.8C10.3 5.6 11.1 5.5 12 5.5C16 5.5 19 7.5 21.5 12C20.8 13.3 20 14.4 19 15.4"),
      f.path("M5.1 8.4C4.2 9.4 3.3 10.6 2.5 12C5 16.5 8 18.5 12 18.5C13.5 18.5 14.8 18.2 16 17.6"),
      ...g.s === 16 ? [] : [f.path("M9 11.5A3 3 0 0 0 12.5 15")],
      f.line(3.5, 3.5, 20.5, 20.5)
    ];
  },
  "help-circle": (g) => {
    const f = figure(g);
    return [f.circle(12, 12, 9), f.path("M9.5 8.5C9.5 5.8 15 5.8 15 8.8C15 11 12 11 12 13"), f.dot(12, 16.5, g.stroke / 2)];
  },
  ban: (g) => {
    const f = figure(g);
    return [f.circle(12, 12, 9), f.line(5.636, 5.636, 18.364, 18.364)];
  },
  "x-circle": (g) => {
    const f = figure(g);
    return [f.circle(12, 12, 9), f.line(8.5, 8.5, 15.5, 15.5), f.line(15.5, 8.5, 8.5, 15.5)];
  },
  "minus-circle": (g) => {
    const f = figure(g);
    return [f.circle(12, 12, 9), f.line(7.5, 12, 16.5, 12)];
  },
  checkbox,
  "checkbox-checked": (g) => {
    const f = figure(g);
    return [...checkbox(g), f.contour([[8, 12], [11, 15], [16, 9.5]])];
  },
  "checkbox-indeterminate": (g) => [...checkbox(g), figure(g).line(8, 12, 16, 12)],
  radio,
  "radio-selected": (g) => [...radio(g), figure(g).dot(12, 12, g.v(1.8, 2.25, 2.7))],
  "toggle-off": (g) => toggle(g, false),
  "toggle-on": (g) => toggle(g, true),
  "text-cursor": (g) => {
    const f = figure(g);
    return [f.path("M8 3.5C10.5 3.5 12 4.5 12 6V18C12 19.5 10.5 20.5 8 20.5M12 6C12 4.5 13.5 3.5 16 3.5M12 18C12 19.5 13.5 20.5 16 20.5")];
  },
  asterisk: (g) => {
    const f = figure(g);
    return [f.line(12, 5, 12, 19), f.line(6, 8.5, 18, 15.5), f.line(6, 15.5, 18, 8.5)];
  },
  eye: (g) => {
    const f = figure(g);
    return [f.path("M2.5 12C5 7.5 8 5.5 12 5.5C16 5.5 19 7.5 21.5 12C19 16.5 16 18.5 12 18.5C8 18.5 5 16.5 2.5 12Z"), f.circle(12, 12, 3)];
  }
};
export {
  forms
};
