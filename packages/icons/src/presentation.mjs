import { svgAttributes } from './runtime.js';

// Framework-neutral SVG props. Consume design options before forwarding DOM attributes.
export function iconPresentation(master, directionPolicy, options = {}) {
  const {
    size = master.size, color = 'currentColor', label, direction = 'ltr',
    corner, opticalSize, 'optical-size': opticalSizeAttribute, children,
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
