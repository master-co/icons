import { h, getCurrentInstance, useId } from 'vue';
import { resolveIcon, resolveStroke } from '@master/icons/runtime';
import { iconPresentation, scopeNodes } from '@master/icons/presentation';

// Functional components render again on prop changes; allocate each ID once.
const scopes = new WeakMap();
const elements = nodes => nodes.map(([tag, attrs, children]) => h(tag, attrs, children ? elements(children) : undefined));
function drawVue(master, directionPolicy, props) {
  const instance = getCurrentInstance();
  if (!scopes.has(instance)) scopes.set(instance, useId());
  master = resolveStroke(master, props.strokeWidth ?? props['stroke-width']);
  const { attributes, transform } = iconPresentation(master, directionPolicy, props);
  const nodes = elements(scopeNodes(master.nodes, scopes.get(instance)));
  return h('svg', attributes, transform ? [h('g', { transform }, nodes)] : nodes);
}

export function iconElement(definition, props = {}) {
  const opticalSize = props.opticalSize ?? props['optical-size'] ?? 'auto';
  return drawVue(resolveIcon(definition, { ...props, opticalSize }), definition.direction, props);
}

export function staticIconElement(master, directionPolicy, props = {}) {
  return drawVue(master, directionPolicy, props);
}
