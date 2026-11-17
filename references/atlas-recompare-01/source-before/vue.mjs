import { h } from 'vue';
import { resolveIcon } from './runtime.js';
import { iconPresentation } from './presentation.js';

function drawVue(master, directionPolicy, props) {
  const { attributes, transform } = iconPresentation(master, directionPolicy, props);
  const nodes = master.nodes.map(([tag, attrs]) => h(tag, attrs));
  return h('svg', attributes, transform ? [h('g', { transform }, nodes)] : nodes);
}

export function iconElement(definition, props = {}) {
  const opticalSize = props.opticalSize ?? props['optical-size'] ?? 'auto';
  return drawVue(resolveIcon(definition, { ...props, opticalSize }), definition.direction, props);
}

export function staticIconElement(master, directionPolicy, props = {}) {
  return drawVue(master, directionPolicy, props);
}
