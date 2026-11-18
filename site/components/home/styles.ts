import type {Corner,OpticalSize} from '@master/icons/runtime'

/*
 * The hero's four styles: one interface of Master UI components, retuned by a theme of tokens, and the icon setting
 * that belongs in it. They are chosen to sit as far apart as they can: a dark monospace console, an editorial page
 * of serif and rules, a soft lilac app of pills, and a poster of black outlines and hard shadows. The icons travel
 * the whole range with them: 16 to 24 px, sharp to rounded, 1 to 2.5 units of stroke.
 */
export type StyleId='console'|'editorial'|'soft'|'poster'
export interface IconSetting {size:OpticalSize;corner:Corner;stroke:number}
export interface Style {
 id:StyleId
 name:string
 /** What sets it apart, in a few words. */
 summary:string
 icons:IconSetting
 /** A style that keeps one scheme whatever the page's. */
 scheme?:'light'|'dark'
 tokens:[string,string][]
}

const none='0 0 0 0 transparent'
const flat:[string,string][]=[
 ['--color-highlight','transparent'],['--color-lip','transparent'],
 ['--color-shade-1','transparent'],['--color-shade-2','transparent'],['--color-shade-3','transparent'],['--color-shade-4','transparent'],['--color-shade-5','transparent'],
 ['--color-ink-highlight','transparent'],
]
const ruled=(line:string,weight='1px'):[string,string][]=>[
 ['--shadow-pressed',`inset 0 0 0 ${weight} ${line}`],
 ['--shadow-flat',`0 0 0 ${weight} ${line}`],
 ['--shadow-raised',`0 0 0 ${weight} ${line}`],
 ['--shadow-raised-hover',`0 0 0 ${weight} var(--color-line-mark)`],
 ['--shadow-lifted',`0 0 0 ${weight} ${line}`],
 ['--shadow-ink',none],['--shadow-ink-hover',none],['--shadow-ink-pressed',none],['--shadow-ink-well',none],['--shadow-thumb-on-ink',none],
]
const radii=(chip:string,small:string,control:string,large:string,surface:string,lift:string):[string,string][]=>[
 ['--radius-chip',chip],['--radius-control-sm',small],['--radius-control',control],['--radius-control-lg',large],['--radius-surface',surface],['--lift',lift],
]

export const styles:Style[]=[
 {
  id:'console',name:'Console',summary:'Monospace on a dark console, square corners, 1px lines',
  icons:{size:16,corner:'sharp',stroke:1},scheme:'dark',
  tokens:[
   ['--font-sans',"ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace"],
   ['--font-weight-control','500'],
   ...radii('0','0','0','0','0','0px'),
   ['--color-surface-base','oklch(16.5% .012 230)'],
   ['--color-surface-raised','oklch(20% .014 230)'],
   ['--color-surface-raised-low','var(--color-surface-raised)'],
   ['--color-surface-inset','oklch(14% .012 230)'],
   ['--color-surface-inset-hover','oklch(12.8% .012 230)'],
   ['--color-surface-chip','oklch(100% 0 none / .07)'],
   ['--color-surface-inverse','oklch(84% .15 165)'],
   ['--color-line-hair','oklch(86% .06 190 / .1)'],
   ['--color-line-contour','oklch(86% .06 190 / .2)'],
   ['--color-line-divider','oklch(86% .06 190 / .14)'],
   ['--color-line-strong','oklch(86% .06 190 / .34)'],
   ['--color-line-mark','oklch(86% .06 190 / .56)'],
   ['--color-text-strong','oklch(95% .02 180)'],
   ['--color-text-body','oklch(84% .025 190)'],
   ['--color-text-muted','oklch(68% .03 200)'],
   ['--color-text-inverse','oklch(17% .02 200)'],
   ['--color-focus','var(--color-surface-inverse)'],
   ['--color-ink-high','var(--color-surface-inverse)'],
   ['--color-ink-low','var(--color-surface-inverse)'],
   ['--color-ink-high-hover','oklch(88% .13 165)'],
   ['--color-ink-low-hover','var(--color-ink-high-hover)'],
   ['--color-ink-pressed','oklch(78% .15 165)'],
   ['--color-ink-edge','transparent'],
   ['--color-thumb-on-high','oklch(17% .02 200)'],
   ['--color-thumb-on-low','oklch(17% .02 200)'],
   ...flat,
   ...ruled('var(--color-line-strong)'),
  ],
 },
 {
  id:'editorial',name:'Editorial',summary:'Serif on cream paper, hairline rules, an oxblood accent',
  icons:{size:20,corner:'soft',stroke:1.25},
  tokens:[
   ['--font-sans',"'Iowan Old Style', 'Palatino Linotype', Palatino, Charter, Georgia, serif"],
   ['--font-weight-control','400'],
   ...radii('.125rem','.125rem','.1875rem','.25rem','.25rem','0px'),
   ['--color-surface-base','light-dark(oklch(96.2% .016 84), oklch(19.5% .008 70))'],
   ['--color-surface-raised','light-dark(oklch(98.6% .01 86), oklch(22.5% .009 70))'],
   ['--color-surface-raised-low','var(--color-surface-raised)'],
   ['--color-surface-inset','light-dark(oklch(94.2% .018 84), oklch(17% .008 70))'],
   ['--color-surface-inset-hover','light-dark(oklch(92.6% .02 84), oklch(15.8% .008 70))'],
   ['--color-surface-chip','light-dark(oklch(93.2% .019 84), oklch(100% 0 none / .07))'],
   ['--color-surface-inverse','light-dark(oklch(43% .15 27), oklch(68% .14 30))'],
   ['--color-line-hair','light-dark(oklch(25% .02 60 / .14), oklch(95% .02 84 / .13))'],
   ['--color-line-contour','light-dark(oklch(25% .02 60 / .3), oklch(95% .02 84 / .26))'],
   ['--color-line-divider','light-dark(oklch(25% .02 60 / .22), oklch(95% .02 84 / .2))'],
   ['--color-line-strong','light-dark(oklch(25% .02 60 / .5), oklch(95% .02 84 / .44))'],
   ['--color-line-mark','light-dark(oklch(25% .02 60 / .75), oklch(95% .02 84 / .66))'],
   ['--color-text-strong','light-dark(oklch(21% .014 55), oklch(94% .014 84))'],
   ['--color-text-body','light-dark(oklch(33% .016 55), oklch(84% .014 84))'],
   ['--color-text-muted','light-dark(oklch(46% .018 60), oklch(71% .014 80))'],
   ['--color-text-inverse','light-dark(oklch(97.5% .01 84), oklch(18% .01 40))'],
   ['--color-focus','var(--color-text-strong)'],
   ['--color-ink-high','var(--color-surface-inverse)'],
   ['--color-ink-low','var(--color-surface-inverse)'],
   ['--color-ink-high-hover','light-dark(oklch(49% .16 27), oklch(73% .13 30))'],
   ['--color-ink-low-hover','var(--color-ink-high-hover)'],
   ['--color-ink-pressed','light-dark(oklch(39% .14 27), oklch(62% .14 30))'],
   ['--color-ink-edge','transparent'],
   ...flat,
   ...ruled('var(--color-line-contour)'),
   ['--corner-shape','round'],['--corner-scale','1'],
  ],
 },
 {
  id:'soft',name:'Pastel',summary:'Round pills, lilac light, diffuse depth',
  icons:{size:24,corner:'rounded',stroke:2},
  tokens:[
   ['--font-weight-control','560'],
   ...radii('.75rem','1rem','1.1875rem','1.375rem','1.75rem','1px'),
   ['--color-surface-base','light-dark(oklch(96.4% .018 300), oklch(20.5% .03 295))'],
   ['--color-surface-raised','light-dark(oklch(99.6% .004 300), oklch(27% .035 295))'],
   ['--color-surface-raised-low','light-dark(oklch(98.2% .009 300), oklch(25% .034 295))'],
   ['--color-surface-inset','light-dark(oklch(94.4% .022 300), oklch(18.5% .03 295))'],
   ['--color-surface-inset-hover','light-dark(oklch(93% .026 300), oklch(17.2% .03 295))'],
   ['--color-surface-chip','light-dark(oklch(94.2% .022 300), oklch(100% 0 none / .08))'],
   ['--color-surface-inverse','light-dark(oklch(56% .19 292), oklch(80% .11 292))'],
   ['--color-line-hair','light-dark(oklch(35% .1 295 / .08), oklch(92% .05 295 / .09))'],
   ['--color-line-contour','light-dark(oklch(35% .1 295 / .12), oklch(92% .05 295 / .14))'],
   ['--color-line-divider','light-dark(oklch(35% .1 295 / .1), oklch(92% .05 295 / .12))'],
   ['--color-line-strong','light-dark(oklch(35% .1 295 / .2), oklch(92% .05 295 / .22))'],
   ['--color-line-mark','light-dark(oklch(35% .1 295 / .34), oklch(92% .05 295 / .36))'],
   ['--color-text-strong','light-dark(oklch(25% .05 295), oklch(95% .02 300))'],
   ['--color-text-body','light-dark(oklch(40% .05 295), oklch(84% .03 300))'],
   ['--color-text-muted','light-dark(oklch(51% .05 295), oklch(73% .04 300))'],
   ['--color-text-inverse','light-dark(oklch(99% .005 300), oklch(20% .04 295))'],
   ['--color-focus','var(--color-surface-inverse)'],
   ['--color-ink-high','light-dark(oklch(62% .18 292), oklch(86% .09 292))'],
   ['--color-ink-low','light-dark(oklch(53% .2 290), oklch(77% .12 290))'],
   ['--color-ink-high-hover','light-dark(oklch(66% .17 292), oklch(89% .08 292))'],
   ['--color-ink-low-hover','light-dark(oklch(57% .19 290), oklch(81% .11 290))'],
   ['--color-ink-pressed','light-dark(oklch(48% .19 290), oklch(72% .13 290))'],
   ['--color-ink-edge','light-dark(oklch(46% .18 290), oklch(0% 0 none / .4))'],
   ['--color-thumb-on-high','light-dark(oklch(100% 0 none), oklch(22% .04 295))'],
   ['--color-thumb-on-low','light-dark(oklch(97% .01 300), oklch(20% .04 295))'],
   ['--color-shade-1','light-dark(oklch(40% .12 295 / .07), oklch(5% .02 295 / .45))'],
   ['--color-shade-2','light-dark(oklch(40% .12 295 / .07), oklch(5% .02 295 / .36))'],
   ['--color-shade-3','light-dark(oklch(40% .12 295 / .08), oklch(5% .02 295 / .32))'],
   ['--color-shade-4','light-dark(oklch(40% .12 295 / .1), oklch(5% .02 295 / .32))'],
   ['--color-shade-5','light-dark(oklch(40% .12 295 / .14), oklch(5% .02 295 / .4))'],
   ['--shadow-raised','inset 0 1px 0 var(--color-highlight), 0 0 0 .5px var(--color-line-contour), 0 2px 6px -2px var(--color-shade-1), 0 8px 18px -8px var(--color-shade-3)'],
   ['--shadow-raised-hover','inset 0 1px 0 var(--color-highlight), 0 0 0 .5px var(--color-line-strong), 0 4px 10px -3px var(--color-shade-2), 0 14px 28px -10px var(--color-shade-4)'],
   ['--shadow-lifted','inset 0 1px 0 var(--color-highlight), 0 0 0 .5px var(--color-line-contour), 0 6px 16px -6px var(--color-shade-2), 0 28px 60px -24px var(--color-shade-5)'],
   ['--shadow-ink','inset 0 1px 0 oklch(100% 0 none / .3), 0 0 0 .5px var(--color-ink-edge), 0 6px 16px -6px light-dark(oklch(50% .2 290 / .55), oklch(0% 0 none / .5))'],
   ['--shadow-ink-hover','inset 0 1px 0 oklch(100% 0 none / .34), 0 0 0 .5px var(--color-ink-edge), 0 10px 22px -8px light-dark(oklch(50% .2 290 / .6), oklch(0% 0 none / .55))'],
  ],
 },
 {
  id:'poster',name:'Poster',summary:'Black outlines, signal yellow, hard offset shadows',
  icons:{size:24,corner:'sharp',stroke:2.5},
  tokens:[
   ['--font-weight-control','720'],
   ...radii('.25rem','.375rem','.5rem','.625rem','.75rem','2px'),
   ['--color-surface-base','light-dark(oklch(94.5% .05 95), oklch(16% .005 280))'],
   ['--color-surface-raised','light-dark(oklch(100% 0 none), oklch(22% .006 280))'],
   ['--color-surface-raised-low','var(--color-surface-raised)'],
   ['--color-surface-inset','light-dark(oklch(92% .055 95), oklch(14% .005 280))'],
   ['--color-surface-inset-hover','light-dark(oklch(89.5% .065 95), oklch(12% .005 280))'],
   ['--color-surface-chip','light-dark(oklch(91% .06 95), oklch(100% 0 none / .1))'],
   ['--color-surface-inverse','oklch(87% .175 95)'],
   ['--color-line-hair','light-dark(oklch(15% 0 none / .2), oklch(96% .02 95 / .2))'],
   ['--color-line-contour','light-dark(oklch(15% 0 none), oklch(96% .02 95))'],
   ['--color-line-divider','light-dark(oklch(15% 0 none / .35), oklch(96% .02 95 / .3))'],
   ['--color-line-strong','var(--color-line-contour)'],
   ['--color-line-mark','var(--color-line-contour)'],
   ['--color-text-strong','light-dark(oklch(15% 0 none), oklch(97% .02 95))'],
   ['--color-text-body','light-dark(oklch(22% 0 none), oklch(90% .02 95))'],
   ['--color-text-muted','light-dark(oklch(38% .01 90), oklch(77% .02 95))'],
   ['--color-text-inverse','oklch(15% 0 none)'],
   ['--color-focus','light-dark(oklch(15% 0 none), oklch(87% .175 95))'],
   ['--color-ink-high','var(--color-surface-inverse)'],
   ['--color-ink-low','var(--color-surface-inverse)'],
   ['--color-ink-high-hover','oklch(90% .16 95)'],
   ['--color-ink-low-hover','var(--color-ink-high-hover)'],
   ['--color-ink-pressed','oklch(81% .17 90)'],
   ['--color-ink-edge','var(--color-line-contour)'],
   ['--color-thumb-on-high','oklch(15% 0 none)'],
   ['--color-thumb-on-low','oklch(15% 0 none)'],
   ...flat,
   ['--shadow-pressed','inset 0 0 0 2px var(--color-line-contour)'],
   ['--shadow-flat','0 0 0 2px var(--color-line-contour)'],
   ['--shadow-raised','0 0 0 2px var(--color-line-contour), 3px 3px 0 2px var(--color-line-contour)'],
   ['--shadow-raised-hover','0 0 0 2px var(--color-line-contour), 5px 5px 0 2px var(--color-line-contour)'],
   ['--shadow-lifted','0 0 0 2px var(--color-line-contour), 6px 6px 0 2px var(--color-line-contour)'],
   ['--shadow-ink','var(--shadow-raised)'],
   ['--shadow-ink-hover','var(--shadow-raised-hover)'],
   ['--shadow-ink-pressed','var(--shadow-pressed)'],
   ['--shadow-ink-well','inset 0 0 0 2px var(--color-line-contour)'],
   ['--shadow-thumb-on-ink',none],
   ['--corner-shape','round'],['--corner-scale','1'],
  ],
 },
]

export const styleClass=(id:StyleId)=>`home-style-${id}`
