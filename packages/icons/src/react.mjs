import { createElement } from 'react';
import { resolveIcon, svgAttributes } from './runtime.js';

const reactName = key => ({ 'stroke-width':'strokeWidth', 'stroke-linecap':'strokeLinecap', 'stroke-linejoin':'strokeLinejoin', 'stroke-miterlimit':'strokeMiterlimit', 'stroke-dasharray':'strokeDasharray', 'stroke-dashoffset':'strokeDashoffset', 'stroke-opacity':'strokeOpacity', 'fill-opacity':'fillOpacity', 'fill-rule':'fillRule', 'clip-rule':'clipRule' }[key] || key);
const reactAttrs = attrs => Object.fromEntries(Object.entries(attrs).map(([key,value])=>[reactName(key),value]));

export function drawReact(master, directionPolicy, options = {}) {
  const { size = master.size, color = 'currentColor', label, direction = 'ltr', ...props } = options;
  const attrs = reactAttrs(svgAttributes(master,{size,color,label,direction}));
  const accessibleName = label || props['aria-label'] || props['aria-labelledby'];
  if (accessibleName) { delete attrs['aria-hidden']; attrs.role = 'img'; }
  let nodes = master.nodes.map(([tag,nodeAttrs],i)=>createElement(tag,{...reactAttrs(nodeAttrs),key:i}));
  if (direction === 'rtl' && directionPolicy === 'mirror') nodes = [createElement('g',{transform:`translate(${master.opticalSize} 0) scale(-1 1)`,key:'rtl'},nodes)];
  return createElement('svg',{...attrs,...props},...nodes);
}

export function iconElement(definition, props = {}) {
  const { size = 24, opticalSize = 'auto', corner = 'soft', ...rest } = props;
  return drawReact(resolveIcon(definition,{size,opticalSize,corner}),definition.direction,{size,...rest});
}

export function staticIconElement(master, directionPolicy, props = {}) {
  return drawReact(master,directionPolicy,{size:master.opticalSize,...props});
}
