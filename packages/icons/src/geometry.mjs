// Authoring helpers only. No geometry engine ships in the runtime.
export const sizes = [16, 20, 24];
export const corners = ['sharp', 'soft', 'rounded'];
export const specifications = {
  16: { stroke: 1, radius: 1, roundRadius: 2, inset: 2, gap: 1.5 },
  20: { stroke: 1.25, radius: 1.25, roundRadius: 2.5, inset: 2.5, gap: 1.75 },
  24: { stroke: 1.5, radius: 1.5, roundRadius: 3, inset: 3, gap: 2 },
};
// The drawings were tuned and visually reviewed at these weights, one step above
// the native stroke. Review snapshots are still drawn at them, and optical
// corrections apply only above them, so every custom width keeps its geometry.
export const reviewedStroke = { 16: 1.25, 20: 1.5, 24: 1.75 };
export const weightDelta = g => g.variableStroke ? Math.max(0,g.stroke-reviewedStroke[g.s]) : 0;
export const n = value => Number(value.toFixed(4));
const point = ([x, y]) => `${n(x)} ${n(y)}`;
export const path = d => ['path', { d }];
export const line = (x1, y1, x2, y2) => ['path', { d: `M${point([x1,y1])}L${point([x2,y2])}` }];
export const circle = (cx, cy, r, extra = {}) => ['circle', { cx: n(cx), cy: n(cy), r: n(r), ...extra }];
export const rect = (x, y, width, height, radius) => ['rect', { x: n(x), y: n(y), width: n(width), height: n(height), rx: n(Math.min(radius, width / 2, height / 2)) }];

// Explicitly authored vertices -> tangent circular fillets at build time.
// This does not transform arbitrary upstream SVGs. Radii are locally constrained
// so adjacent corners cannot overlap; curves and semantic points stay authored.
export function contour(points, radius = 0, closed = false) {
  if (points.length < 2) throw new Error('A contour needs at least two points');
  if (!radius) return path(`M${points.map(point).join('L')}${closed ? 'Z' : ''}`);
  const fillets = points.map((b, i) => {
    if (!closed && (i === 0 || i === points.length - 1)) return { start: b, end: b };
    const a = points[(i + points.length - 1) % points.length];
    const c = points[(i + 1) % points.length];
    const la = Math.hypot(a[0]-b[0], a[1]-b[1]), lc = Math.hypot(c[0]-b[0], c[1]-b[1]);
    if (la < 1e-6 || lc < 1e-6) throw new Error('Duplicate contour vertex');
    const u = [(a[0]-b[0])/la,(a[1]-b[1])/la], v = [(c[0]-b[0])/lc,(c[1]-b[1])/lc];
    const angle = Math.acos(Math.max(-1,Math.min(1,u[0]*v[0]+u[1]*v[1])));
    if (Math.abs(Math.PI-angle)<1e-5 || angle<1e-5) return { start:b, end:b };
    const requested = Array.isArray(radius) ? radius[i] : radius;
    const trim = Math.min(requested / Math.tan(angle/2), la*0.45, lc*0.45);
    const r = trim * Math.tan(angle/2);
    return { start:[b[0]+u[0]*trim,b[1]+u[1]*trim], end:[b[0]+v[0]*trim,b[1]+v[1]*trim], r, sweep: (-u[0]*v[1]+u[1]*v[0])>0 ? 1 : 0 };
  });
  let d = `M${point(fillets[0].end)}`;
  for(let step=1; step < points.length+(closed?1:0); step++) {
    const f=fillets[step%points.length];
    d+=`L${point(f.start)}`;
    if(f.r>1e-6) d+=`A${n(f.r)} ${n(f.r)} 0 0 ${f.sweep} ${point(f.end)}`;
  }
  return path(d+(closed?'Z':''));
}

export function context(size, corner) {
  const spec=specifications[size];
  const index=sizes.indexOf(size);
  if(!spec || !corners.includes(corner)) throw new Error('Unsupported optical master');
  return {
    s:size, c:size/2, ...spec, corner,
    r:corner==='sharp'?0:corner==='soft'?spec.radius:spec.roundRadius,
    // Coordinates below are authored explicitly in each native grid.
    v:(small,medium,large)=>[small,medium,large][index],
    tip:corner==='sharp'?0:corner==='soft'?0.2:0.55,
  };
}
