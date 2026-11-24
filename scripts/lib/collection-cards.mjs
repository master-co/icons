// Identity aliases share a card. Distinct outline artwork has its own list entry,
// with links to both variants so either entry can switch artwork in the detail.
/**
 * @template {{name:string, label:string, component:string, keywords:string[], aliasOf?:string, styleOf?:string}} T
 * @param {T[]} icons
 * @returns {(T & {mark?:{name:string,label:string,component:string},outline?:{name:string,label:string,component:string}})[]}
 */
export function collectionCards(icons) {
  const related = new Map();
  for (const icon of icons) {
    const parent = icon.aliasOf || icon.styleOf;
    if (!parent) continue;
    if (!related.has(parent)) related.set(parent, []);
    related.get(parent).push(icon);
  }
  const byName=new Map(icons.map(icon=>[icon.name,icon]));
  const artwork=icon=>({name:icon.name,label:icon.label,component:icon.component});
  return icons.filter(icon => !icon.aliasOf).map(icon => {
    const mark=byName.get(icon.styleOf)||icon;
    const children = related.get(mark.name) || [];
    const outline = children.find(child => child.styleOf);
    return {
      ...icon,
      keywords: [...new Set([...icon.keywords, ...children.filter(child=>child.aliasOf).flatMap(child => [child.name, child.label, ...child.keywords])])],
      ...(outline && {mark:artwork(mark),outline:artwork(outline)})
    };
  });
}
