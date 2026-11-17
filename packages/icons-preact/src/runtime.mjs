import { h } from 'preact';
import { resolveIcon, resolveStroke } from '@master/icons/runtime';
import { iconPresentation, scopeNodes } from '@master/icons/presentation';

const elements = nodes => nodes.map(([tag, attrs, children], key) => h(tag, { ...attrs, key }, children ? elements(children) : undefined));
function drawPreact(master, directionPolicy, props, scope) {
  master = resolveStroke(master, props.strokeWidth ?? props['stroke-width']);
  const { attributes, transform } = iconPresentation(master, directionPolicy, props);
  const nodes = elements(scopeNodes(master.nodes, scope));
  return h('svg', attributes, transform ? h('g', { transform }, nodes) : nodes);
}

export function iconElement(definition, props = {}, scope) {
  return drawPreact(resolveIcon(definition, props), definition.direction, props, scope);
}

export function staticIconElement(master, directionPolicy, props = {}, scope) {
  return drawPreact(master, directionPolicy, props, scope);
}
