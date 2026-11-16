export const opticalSizes = Object.freeze([16, 20, 24]);
export const cornerStyles = Object.freeze(['sharp', 'soft', 'rounded']);

export function getOpticalSize(size = 24, opticalSize = 'auto') {
  if (typeof size !== 'number' || !Number.isFinite(size) || size <= 0) throw new RangeError('size must be a positive finite number');
  if (opticalSize !== 'auto') {
    if (!opticalSizes.includes(opticalSize)) throw new RangeError('opticalSize must be auto, 16, 20, or 24');
    return opticalSize;
  }
  // Nearest optical master, ties select the larger master. No DOM measurement.
  return size < 18 ? 16 : size < 22 ? 20 : 24;
}

export function resolveIcon(definition, { size = 24, opticalSize = 'auto', corner = 'soft' } = {}) {
  if (!cornerStyles.includes(corner)) throw new RangeError('corner must be sharp, soft, or rounded');
  const masterSize = getOpticalSize(size, opticalSize);
  const master = definition.variants[masterSize]?.[corner];
  if (!master) throw new Error(`Missing ${definition.name}/${masterSize}/${corner}`);
  return { ...master, size, opticalSize: masterSize, corner };
}

export const escapeXml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
export const serializeNodes = nodes => nodes.map(([tag,attrs]) => `<${tag} ${Object.entries(attrs).map(([key,value])=>`${key}="${escapeXml(value)}"`).join(' ')}/>`).join('');

export function svgAttributes(master, { size = master.size, color = 'currentColor', label, direction = 'ltr' } = {}) {
  if (!Number.isFinite(size) || size <= 0) throw new RangeError('size must be a positive finite number');
  if (!['ltr', 'rtl'].includes(direction)) throw new RangeError('direction must be ltr or rtl');
  return {
    xmlns: 'http://www.w3.org/2000/svg', width: size, height: size,
    viewBox: `0 0 ${master.opticalSize} ${master.opticalSize}`, fill: 'none',
    stroke: 'currentColor', color, 'stroke-width': master.strokeWidth,
    'stroke-linecap': master.corner === 'sharp' ? 'square' : 'round',
    'stroke-linejoin': master.corner === 'sharp' ? 'miter' : 'round',
    'stroke-miterlimit': 3, focusable: 'false',
    ...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true' }),
  };
}

export function renderSvg(definition, options = {}) {
  const master = resolveIcon(definition, options);
  const attrs = svgAttributes(master, options);
  let content = serializeNodes(master.nodes);
  if (options.direction === 'rtl' && definition.direction === 'mirror') content = `<g transform="translate(${master.opticalSize} 0) scale(-1 1)">${content}</g>`;
  return `<svg ${Object.entries(attrs).map(([key,value])=>`${key}="${escapeXml(value)}"`).join(' ')}>${content}</svg>`;
}
