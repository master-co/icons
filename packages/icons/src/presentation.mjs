import { svgAttributes } from './runtime.js';

// Framework-neutral SVG props. Consume design options before forwarding DOM attributes.
export function iconPresentation(master, directionPolicy, options = {}) {
  const {
    size = master.size, color = 'currentColor', label, direction = 'ltr',
    corner, opticalSize, 'optical-size': opticalSizeAttribute, strokeWidth, 'stroke-width': strokeWidthAttribute, children,
    ...props
  } = options;
  const attributes = svgAttributes(master, { size, color, label, direction });
  if (label || props['aria-label'] || props['aria-labelledby']) {
    delete attributes['aria-hidden'];
    attributes.role = 'img';
  }
  return {
    attributes: { ...attributes, ...props },
    transform: direction === 'rtl' && directionPolicy === 'mirror'
      ? `translate(${master.opticalSize} 0) scale(-1 1)` : undefined,
  };
}

// IDs belong to one SVG instance, including nested masks used by custom strokes.
export function scopeNodes(nodes, scope) {
  const prefix = `mi-${String(scope).replace(/[^a-zA-Z0-9_-]/g, c => c.codePointAt(0).toString(16))}`;
  return nodes.map(([tag, attrs, children]) => [tag, Object.fromEntries(Object.entries(attrs).map(([key, value]) => [
    key, key === 'id' ? `${prefix}-${value}` : typeof value === 'string'
      ? value.replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${prefix}-${id})`).replace(/^(#.+)$/, match => ['href','xlink:href'].includes(key) ? `#${prefix}-${match.slice(1)}` : match)
      : value,
  ])), ...(children ? [scopeNodes(children, scope)] : [])]);
}
