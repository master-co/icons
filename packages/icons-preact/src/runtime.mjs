import { h } from 'preact';
import { resolveIcon } from '@master/icons/runtime';
import { iconPresentation } from '@master/icons/presentation';

function drawPreact(master, directionPolicy, props) {
  const { attributes, transform } = iconPresentation(master, directionPolicy, props);
  const nodes = master.nodes.map(([tag, attrs], key) => h(tag, { ...attrs, key }));
  return h('svg', attributes, transform ? h('g', { transform }, nodes) : nodes);
}

export function iconElement(definition, props = {}) {
  return drawPreact(resolveIcon(definition, props), definition.direction, props);
}

export function staticIconElement(master, directionPolicy, props = {}) {
  return drawPreact(master, directionPolicy, props);
}
