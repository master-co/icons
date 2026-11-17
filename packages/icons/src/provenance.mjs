// Explicit notices retained from the initial design study. Being selected as a
// pilot or compared with an external icon does not create source attribution.
// New independently authored drawings need no third-party entry here.
export const preservedNotices = Object.freeze(Object.fromEntries([
  'arrow-right', 'check', 'search', 'home', 'folder', 'file-text',
  'calendar', 'settings', 'bell', 'user', 'heart', 'star',
].map(name => [name, 'Copyright (c) 2025 Hugeicons'])));

// Craft 01 deliberately develops Lucide's horn/grip and interlocking-hand
// construction. Retain attribution conservatively despite rewritten geometry.
import atlasSources from './atlas-provenance.json' with {type:'json'};
export const adaptedSources=Object.freeze({...atlasSources,
  resize:{
    kind:'adapted-redraw',author:'Paweł Kuna',library:'Tabler',license:'MIT',
    copyright:'Copyright (c) 2020-2026 Paweł Kuna',
    commit:'4581ad20d8d13e24f6c3be75caaea1c4ad6c4b35',
    reference:'https://github.com/tabler/tabler-icons/blob/4581ad20d8d13e24f6c3be75caaea1c4ad6c4b35/icons/outline/resize.svg',
    licenseFile:'licenses/tabler.txt',modifications:'Retained the shared corner of two extents. Rebuilt the larger boundary with three open corners sized for native UI controls.',
  },...Object.fromEntries(['megaphone','handshake','layers'].map(name=>[name,{
  kind:'adapted-redraw',author:'Lucide Icons and Contributors',license:'ISC',
  copyright:'Copyright (c) 2026 Lucide Icons and Contributors',
  commit:'55782beff3a0133df79c417eb68f96e8f19e2404',
  reference:`https://github.com/lucide-icons/lucide/blob/55782beff3a0133df79c417eb68f96e8f19e2404/icons/${name}.svg`,
  licenseFile:'licenses/lucide.txt',
  modifications:name==='layers'?'Reconstructed equal-width sheet returns, local apex curves, native proportions and corner treatments.':'Redrawn curves, proportions, joins and corner-specific construction in Master native geometry; handshake internal seam simplified at 16px.',
}]))});
