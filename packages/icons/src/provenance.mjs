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
const hugeCommit='834e28d965946c1ee60d080027fe9dae4adc58d0';
const pilotVariants=Object.fromEntries([
  ['calendar-today','calendar-03','Retained the calendar outline and redrew the today detail for three optical sizes.'],
  ['calendar-day-view','calendar-03','Retained the calendar outline and redrew the day view detail for three optical sizes.'],
  ['calendar-week','calendar-03','Retained the calendar outline and redrew the week detail for three optical sizes.'],
  ['calendar-agenda','calendar-03','Retained the calendar outline and redrew the agenda detail for three optical sizes.'],
  ['calendar-previous','calendar-03','Retained the calendar outline and redrew the previous detail for three optical sizes.'],
  ['calendar-next','calendar-03','Retained the calendar outline and redrew the next detail for three optical sizes.'],
  ['calendar-start','calendar-03','Retained the calendar outline and redrew the start detail for three optical sizes.'],
  ['calendar-end','calendar-03','Retained the calendar outline and redrew the end detail for three optical sizes.'],
  ['calendar-alert','calendar-03','Retained the calendar outline and redrew the alert detail for three optical sizes.'],
  ['calendar-reschedule','calendar-03','Retained the calendar outline and redrew the reschedule detail for three optical sizes.'],
  ['folder-shared','folder-01','Retained the folder outline and redrew the shared detail for three optical sizes.'],
  ['folder-shortcut','folder-01','Retained the folder outline and redrew the shortcut detail for three optical sizes.'],
  ['folder-favorite','folder-01','Retained the folder outline and redrew the favorite detail for three optical sizes.'],
  ['bell-plus','notification-03','Added a plus with optical clearance at the crown.'],
  ['bell-minus','notification-03','Added a minus with optical clearance at the crown.'],
  ['folder-move','folder-01','Placed a directional arrow beneath the folder shoulder.'],
].map(([name,source,modifications])=>[name,{
  kind:'adapted-redraw',author:'Hugeicons',library:'Hugeicons Free',license:'MIT',
  copyright:'Copyright (c) 2025 Hugeicons',commit:hugeCommit,
  reference:`https://github.com/hugeicons/hugeicons/blob/${hugeCommit}/icons/${source}.svg`,
  licenseFile:'licenses/hugeicons-MIT.txt',modifications,
}]));
export const adaptedSources=Object.freeze({...atlasSources,...pilotVariants,
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
