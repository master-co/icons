// Product controls share the same native silhouettes as their unmodified peers.
import {coreDrawings, folder} from './core.mjs';
import {media} from './media.mjs';
import {figure, rotate} from './shared.mjs';
import {knockout} from '../occlusion.mjs';
import {rect} from '../geometry.mjs';

function folderKanban(g) {
  const f = figure(g);
  const top = g.s === 16 ? 10.25 : 10.75;
  return [...folder(g), f.line(7.75, top, 7.75, 15),
    f.line(12, top, 12, 13.1), f.line(16.25, top, 16.25, 16.25)];
}

function archiveRestore(g) {
  const f = figure(g);
  // Lower the mouth to make room for the emerging arrow; the lid still
  // overhangs the body by the same two grid units as the archive master.
  const lid = f.rect(2.75, 10, 18.5, 3.75, Math.min(g.r, 1));
  const bin = f.contour([[4.5,13.75],[4.5,21],[19.5,21],[19.5,13.75]], false, g.r);
  const arrow = f.arrow([f.line(12,16.5,12,2.5)], [[8.25,6.25],[12,2.5],[15.75,6.25]]);
  return knockout([lid, bin], arrow, g);
}

function oppositeChevrons(g) {
  const f = figure(g);
  return [f.contour([[7,9],[12,4],[17,9]]), f.contour([[7,15],[12,20],[17,15]])];
}

function idCard(g) {
  const f = figure(g);
  return [f.rect(2.25,4.75,19.5,14.5), f.circle(8.2,9.4,1.7),
    f.path('M5.2 16C5.5 12.8 10.9 12.8 11.3 16'),
    f.line(14.4,10,18.2,10), f.line(14.4,14,17.1,14)];
}

function dashedRing(g) {
  const [ring] = coreDrawings.circle(g);
  const count = g.v(6, 8, 8);
  const period = 2 * Math.PI * ring[1].r / count;
  // Account for the two caps extending into every gap at heavier weights.
  const gap = period * .31 + g.stroke;
  return [['circle', {...ring[1], 'stroke-dasharray': (period-gap)+' '+gap,
    'stroke-dashoffset': (period-gap)/2}]];
}

function exchange(g) {
  const f = figure(g);
  return [...f.arrow([f.line(3.5,7.25,20.5,7.25)], [[16.5,3.25],[20.5,7.25],[16.5,11.25]]),
    ...f.arrow([f.line(20.5,16.75,3.5,16.75)], [[7.5,12.75],[3.5,16.75],[7.5,20.75]])];
}

function headingLevel(g, level) {
  const f = figure(g);
  const digits = {
    1: 'M16 13L18.8 10.7V19',
    2: 'M15.3 12.8C15.8 9.8 20.6 9.7 20.6 12.7C20.6 14.6 18.5 15.6 15.5 19H21',
    3: 'M15.5 11.5C17.7 9.5 20.8 10.6 20.4 12.9C20.2 14.2 18.9 14.8 17.3 14.8C19.3 14.7 20.9 15.4 20.9 17.1C20.9 19.5 17.4 20.2 15.4 18.2',
  };
  return [f.line(3.5,5,3.5,19), f.line(11.1,5,11.1,19),
    f.line(3.5,11.9,11.1,11.9), f.path(digits[level])];
}

function handClick(g) {
  const f = figure(g);
  // One continuous hand contour from the index tip, over the folded fingers,
  // around the palm and back along the upright finger.
  const palm = f.path('M8.6 14.25V7.4C8.6 5.15 11.9 5.15 11.9 7.4V11.3C12.65 10.5 14.35 10.65 15 11.8C15.95 11.2 17.15 11.6 17.7 12.55C19.15 12.15 20.4 13.2 20.3 15.05L20.05 17.85C19.75 20.3 18.4 21.5 16.1 21.5H13C11.15 21.5 10.1 20.95 8.85 19.5L4.95 14.9C3.6 13.25 5.45 11.6 6.95 12.85Z');
  return [palm, f.path('M5.45 7.5C5.45 4.5 7.55 2.45 10.35 2.45C13.1 2.45 15.15 4.45 15.2 7.2')];
}

function resize(g) {
  const f = figure(g);
  const small = f.rect(3.5,11.5,9,9);
  // Open corner marks project the second extent without doubling a shared edge.
  return [small, f.contour([[3.5,7.7],[3.5,3.5],[9,3.5]],false,g.r),
    f.contour([[15.5,3.5],[20.5,3.5],[20.5,8.5]],false,g.r),
    f.contour([[20.5,17],[20.5,20.5],[17,20.5]],false,g.r)];
}

function increasingBars(g) {
  const bottom = g.v(14,17.5,21);
  const width = g.v(2.5,3,3.5);
  const gap = g.v(2.25,2.5,3);
  const tops = [g.v(9.5,12,14.5), g.v(6.25,8,9.5), g.v(3,4,4.5)];
  return tops.map((top,i) => rect(g.c-width*1.5-gap+i*(width+gap),top,width,bottom-top,Math.min(g.r,.75)));
}

export const productDrawings = {
  'folder-kanban': folderKanban,
  'archive-restore': archiveRestore,
  'id-card': idCard,
  'image-plus'(g) {
    const f = figure(g);
    return knockout(media.image(g), [f.line(15.25,5.25,22.25,5.25), f.line(18.75,1.75,18.75,8.75)], g);
  },
  'square-plus'(g) {
    const f = figure(g);
    return [...coreDrawings.square(g), f.line(8,12,16,12), f.line(12,8,12,16)];
  },
  'circle-dashed': dashedRing,
  'play-circle'(g) {
    const f = figure(g);
    return [...coreDrawings.circle(g), f.contour([[9.7,7.8],[16.55,12],[9.7,16.2]],true,g.tip)];
  },
  'pause-circle'(g) {
    const f = figure(g);
    return [...coreDrawings.circle(g), f.line(9.6,8.35,9.6,15.65), f.line(14.4,8.35,14.4,15.65)];
  },
  'alert-circle'(g) {
    const f = figure(g);
    return [...coreDrawings.circle(g), f.line(12,7,12,12.7), ['circle',{
      cx:g.c,cy:f.u(16.5),r:g.stroke/2,fill:'currentColor',stroke:'none'}]];
  },
  'chevrons-up-down': oppositeChevrons,
  'chevrons-left-right': g => rotate(oppositeChevrons(g),90,g),
  'arrow-left-right': exchange,
  'arrow-down-right': g => rotate(coreDrawings['arrow-up-right'](g),90,g),
  'arrow-big-up'(g) {
    const f = figure(g);
    return [f.contour([[12,3],[21,12.5],[15.45,12.5],[15.45,21],[8.55,21],[8.55,12.5],[3,12.5]],true,Math.min(g.r*.55,1.05))];
  },
  'heading-1': g => headingLevel(g,1),
  'heading-2': g => headingLevel(g,2),
  'heading-3': g => headingLevel(g,3),
  pilcrow(g) {
    const f = figure(g);
    return [f.path('M20 4.25H9.75C3 4.25 3 13.75 9.75 13.75H12'),
      f.line(12,4.25,12,20.75), f.line(17,4.25,17,20.75)];
  },
  'remove-formatting'(g) {
    const f = figure(g);
    return [f.contour([[4,8],[5,5],[18.5,5],[17.8,8]],false,g.tip),
      f.line(11.7,5,8.2,19.2), f.line(5.75,19.2,10.5,19.2),
      f.line(15.5,14,21,19.5), f.line(21,14,15.5,19.5)];
  },
  'hand-click': handClick,
  resize,
  'chart-bar-increasing': increasingBars,
};
