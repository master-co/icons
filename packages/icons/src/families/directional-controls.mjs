import {chevron,coreDrawings,horizontalArrow} from './core.mjs';
import {analytics} from './analytics.mjs';
import {moveAxes} from './editor.mjs';
import {line} from '../geometry.mjs';
import {rotate} from './shared.mjs';

function selector(g,vertical=false) {
  const half=g.v(3,3.75,4.5);
  const arm=()=>chevron(g,{
    tip:g.v(13.25,16.5,20),wing:g.v(10.25,12.75,15.5),
    top:g.c-half,bottom:g.c+half,
  });
  return [...rotate(arm(),vertical?-90:0,g),...rotate(arm(),vertical?90:180,g)];
}

function rightBoundary(g) {
  const start=g.v(2.5,3,3.5),stop=g.s-start;
  return [
    ...horizontalArrow(g,{start,end:g.v(10,12.5,15),wing:g.v(7,8.75,10.5),half:g.v(3,3.75,4.5)}),
    line(stop,start,stop,g.s-start),
  ];
}

export const directionalControls={
  'move-horizontal':g=>moveAxes(g,{axis:'horizontal',half:4.5}),
  'move-vertical':g=>moveAxes(g,{axis:'vertical',half:4.5}),
  'move-diagonal-up-right':g=>rotate(moveAxes(g,{axis:'horizontal',half:4.5}),-45,g),
  'move-diagonal-down-right':g=>rotate(moveAxes(g,{axis:'horizontal',half:4.5}),45,g),
  'chevrons-up-down':g=>selector(g,true),
  'chevrons-left-right':g=>selector(g),
  'arrow-down-right':g=>rotate(coreDrawings['arrow-up-right'](g),90,g),
  'arrow-up-left':g=>rotate(coreDrawings['arrow-up-right'](g),-90,g),
  'arrow-down-left':g=>rotate(coreDrawings['arrow-up-right'](g),180,g),
  'arrow-left-right':g=>rotate(analytics['sort-unsorted'](g),90,g),
  'arrow-right-to-line':rightBoundary,
  'arrow-left-to-line':g=>rotate(rightBoundary(g),180,g),
  'arrow-up-to-line':g=>rotate(rightBoundary(g),-90,g),
  'arrow-down-to-line':g=>rotate(rightBoundary(g),90,g),
};
