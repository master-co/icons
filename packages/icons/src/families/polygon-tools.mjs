import {triangle,quadrilateral} from '../expansion/composition-location.mjs';

export const polygonPoints={
 'right-triangle':[[4,20],[20,4],[20,20]],
 parallelogram:[[8,5],[21,5],[16,19],[3,19]],
 trapezoid:[[7,5],[17,5],[21,19],[3,19]],
};
export const polygonTools={
 'right-triangle':g=>triangle(g,{points:polygonPoints['right-triangle']}),
 parallelogram:g=>quadrilateral(g,polygonPoints.parallelogram),
 trapezoid:g=>quadrilateral(g,polygonPoints.trapezoid),
};
