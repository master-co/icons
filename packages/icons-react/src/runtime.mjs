import { createElement } from 'react';
import { resolveIcon, resolveStroke } from '@master/icons/runtime';
import { iconPresentation, scopeNodes } from '@master/icons/presentation';

const reactName = key => ({ 'stroke-width':'strokeWidth', 'stroke-linecap':'strokeLinecap', 'stroke-linejoin':'strokeLinejoin', 'stroke-miterlimit':'strokeMiterlimit', 'stroke-dasharray':'strokeDasharray', 'stroke-dashoffset':'strokeDashoffset', 'stroke-opacity':'strokeOpacity', 'fill-opacity':'fillOpacity', 'fill-rule':'fillRule', 'clip-rule':'clipRule', 'mask-type':'maskType' }[key] || key);
const reactAttrs = attrs => Object.fromEntries(Object.entries(attrs).map(([key,value])=>[reactName(key),value]));
const elements = nodes => nodes.map(([tag, attrs, children], key) => createElement(tag, {...reactAttrs(attrs), key}, ...(children ? elements(children) : [])));

export function drawReact(master, directionPolicy, options = {}, scope) {
  return nativeIconElement(resolveStroke(master, options.strokeWidth ?? options['stroke-width']), directionPolicy, options, scope);
}

export function nativeIconElement(master, directionPolicy, options = {}, scope) {
  const {attributes, transform} = iconPresentation(master, directionPolicy, options);
  let nodes = elements(scope === undefined ? master.nodes : scopeNodes(master.nodes, scope));
  if (transform) nodes = [createElement('g', {transform, key:'rtl'}, nodes)];
  return createElement('svg', reactAttrs(attributes), ...nodes);
}

export function iconElement(definition, props = {}, scope) {
  return drawReact(resolveIcon(definition, props), definition.direction, props, scope);
}

export function staticIconElement(master, directionPolicy, props = {}, scope) {
  return drawReact(master, directionPolicy, props, scope);
}
