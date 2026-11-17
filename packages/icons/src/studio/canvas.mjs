import {figure, rotate} from '../families/shared.mjs';
import {knockout} from '../occlusion.mjs';

function align(g,position,vertical=false) {
  const f=figure(g), radius=Math.min(g.r,.85);
  // Align the same two objects in all six commands. A half-turn would also
  // swap their order when moving them from the start to the end of the axis.
  const bars=[14,9].map((width,i)=>{
    const origin={start:7,center:12-width/2,end:17-width}[position];
    const cross=i===0?5:15;
    return vertical?f.rect(cross,origin,4,width,radius):f.rect(origin,cross,width,4,radius);
  });
  const guide=(x,lo,hi)=>vertical?f.line(lo,x,hi,x):f.line(x,lo,x,hi);
  const axis=position==='center'
    ? [guide(12,2,5),guide(12,9,15),guide(12,19,22)]
    : [guide(position==='start'?3:21,3,21)];
  return [...axis,...bars];
}

function stack(g,front,all) {
  const f=figure(g);
  // The active layer is always upper left. Its exposed contours describe
  // position in the stack, including an intermediate sheet for absolute moves.
  const first=f.rect(3,3,11.3,11.3),last=f.rect(9.7,9.7,11.3,11.3);
  const middle=f.rect(6.35,6.35,11.3,11.3);
  const layers=front?[last,middle,first]:[first,middle,last];
  if(!all) return knockout([layers[0]],[layers[2]],g,{silhouettes:[layers[2]]});
  const lower=knockout([layers[0]],[middle],g,{silhouettes:[middle]});
  return knockout(lower,[layers[2]],g,{silhouettes:[layers[2]]});
}

function booleanShape(g,kind) {
  const f=figure(g), a=3,b=g.s===16?9.4:10,c=g.s===16?14.6:14,d=21;
  const northwest=[[a,a],[c,a],[c,b],[b,b],[b,c],[a,c]];
  const outline=points=>f.contour(points,true,Math.min(g.r, f.u(1.1)));
  switch(kind) {
    case 'union':return [outline([[a,a],[c,a],[c,b],[d,b],[d,d],[b,d],[b,c],[a,c]])];
    case 'subtract':return [outline(northwest),f.contour([[d,16.7],[d,d],[16.7,d]],false,g.r)];
    case 'intersect':return [f.rect(b,b,c-b,c-b,Math.min(g.r,.75)),
      f.contour([[a,8],[a,a],[8,a]],false,g.r),f.contour([[d,16],[d,d],[16,d]],false,g.r)];
    default:{
      // Break the two contacts symmetrically: four joined lines at each
      // crossing otherwise read as the two untouched operand rectangles.
      const gap=g.v(2.8,2.65,2.5);
      return [f.contour([[c,b-gap],[c,a],[a,a],[a,c],[b,c],[b,b],[c-gap,b]],false,g.r*.62),
        f.contour([[b,c+gap],[b,d],[d,d],[d,b],[c,b],[c,c],[b+gap,c]],false,g.r*.62)];
    }
  }
}

function flip(g) {
  const f=figure(g);
  return [f.contour([[3,18.5],[8,5.5],[8,18.5]],true,g.tip),
    f.contour([[21,18.5],[16,5.5],[16,18.5]],true,g.tip),f.line(12,3,12,21)];
}

function nodeAction(g,add) {
  const f=figure(g), x=17.5,y=5;
  return [f.path('M3 19C6 19 7.3 15.5 9.7 13.3M14.2 11.4C16.8 9.8 18.4 10.4 21 10.4'),
    f.rect(9.7,10.1,4.5,4.5,Math.min(g.r,.55)),f.line(x-3,y,x+3,y),
    ...(add?[f.line(x,y-3,x,y+3)]:[])];
}

const turn=(draw,angle)=>g=>rotate(draw(g),angle,g);
export const canvasDrawings={
  'align-objects-left':g=>align(g,'start'),
  'align-objects-right':g=>align(g,'end'),
  'align-objects-center-horizontal':g=>align(g,'center'),
  'align-objects-top':g=>align(g,'start',true),
  'align-objects-bottom':g=>align(g,'end',true),
  'align-objects-center-vertical':g=>align(g,'center',true),
  'bring-forward':g=>stack(g,true,false),
  'send-backward':g=>stack(g,false,false),
  'bring-to-front':g=>stack(g,true,true),
  'send-to-back':g=>stack(g,false,true),
  group(g) {
    const f=figure(g);
    return [f.path('M3 8V3H8M16 3H21V8M21 16V21H16M8 21H3V16'),
      f.rect(6.5,6.5,5.5,5.5,Math.min(g.r,1)),f.circle(15.7,15.7,2.7)];
  },
  ungroup(g) {
    const f=figure(g);
    return [f.path('M8 3H3V8M16 21H21V16'),f.rect(6.5,6.5,6.5,6.5,Math.min(g.r,1)),f.circle(16.8,16.8,3)];
  },
  'boolean-union':g=>booleanShape(g,'union'),
  'boolean-subtract':g=>booleanShape(g,'subtract'),
  'boolean-intersect':g=>booleanShape(g,'intersect'),
  'boolean-exclude':g=>booleanShape(g,'exclude'),
  'flip-horizontal':flip,
  'flip-vertical':turn(flip,90),
  'node-add':g=>nodeAction(g,true),
  'node-remove':g=>nodeAction(g,false),
  'path-join'(g) {
    const f=figure(g);
    return [f.path('M3 19C7.7 19 7.8 14.6 9.4 12M14.6 12C16.2 9.4 16.3 5 21 5'),
      f.contour([[9.4,12],[12,9.4],[14.6,12],[12,14.6]],true,g.tip)];
  },
  'path-break'(g) {
    const f=figure(g);
    return [f.path('M3 20C6.7 20 8.7 17.6 9 15M15 9C15.4 6.5 17.2 4 21 4'),
      f.rect(7,11,4,4,g.tip),f.rect(13,5,4,4,g.tip)];
  },
  'node-corner'(g) {
    const f=figure(g);
    return [f.line(3,19,9.7,8.6),f.rect(9.7,4.5,4.6,4.6,g.tip),f.line(14.3,8.6,21,16)];
  },
  'node-smooth'(g) {
    const f=figure(g);
    return [f.path('M3 19C4 13.5 6.2 9 10 9M14 9C18 9 20 13.5 21 19'),
      f.line(3,9,9.8,9),f.line(14.2,9,21,9),f.dot(3,9,g.stroke*.72),f.dot(21,9,g.stroke*.72),f.rect(9.8,6.8,4.4,4.4,g.tip)];
  },
  'gradient-linear'(g) {
    const f=figure(g);
    return [f.rect(3.5,15,5.5,5.5,g.tip),f.line(9,15,15.8,8.2),f.circle(18,6,3)];
  },
  'gradient-radial'(g) {
    const f=figure(g);
    return [f.path('M19.67 9.65A8.5 8.5 0 1 0 19.67 14.35'),f.line(11.5,12,17.4,12),
      f.dot(11.5,12),f.rect(17.4,9.65,4.7,4.7,g.tip)];
  },
  'gradient-conic'(g) {
    const f=figure(g);
    return [f.path('M12 3.5A8.5 8.5 0 1 0 20.5 12'),f.contour([[12,3.5],[12,12],[19,7.1]]),f.dot(19,7.1)];
  },
  swatches(g) {
    const f=figure(g);
    return [f.rect(3.3,3,6.6,17.8,Math.min(g.r,1.6)),f.dot(6.6,17.4),
      f.contour([[10,11],[15.7,5.3],[20,9.6],[10,19.6]]),f.contour([[16.5,14.2],[21,14.2],[21,20.8],[9,20.8]],false,g.r)];
  },
  'stroke-color'(g) {
    const f=figure(g);
    return [f.contour([[5,12.8],[15.6,2.2],[19.3,5.9],[8.7,16.5],[4.3,17.2]],true,g.tip),f.line(3.5,21,20.5,21)];
  },
  'stroke-width'(g) {
    const f=figure(g);
    return [5.5,12,18.5].map((y,i)=>['path',{...f.line(4.5,y,19.5,y)[1],'stroke-width':g.stroke*[.68,1.2,2][i]}]);
  },
  'stroke-dashed'(g) {
    const f=figure(g);
    return [3,10.5,18].map(x=>f.line(x,12,x+3,12));
  },
  'corner-radius'(g) {
    const f=figure(g);
    return [f.path('M4 20V15C4 8.9 8.9 4 15 4H20'),f.contour([[3,8],[3,3],[8,3]],false,g.tip)];
  },
  'layer-mask'(g) {
    const f=figure(g);
    return [f.rect(2.5,4.4,19,15.2),f.circle(12,12,4.3),f.line(12,7.7,12,16.3)];
  },
  'frame-plus'(g) {
    const f=figure(g);
    return knockout([f.path('M5.5 2V19.5M2 5.5H19.5M16 2V19.5M2 16H19.5')],
      [f.line(15,19,22,19),f.line(18.5,15.5,18.5,22.5)],g);
  },
  guides(g) {
    const f=figure(g);
    return [f.contour([[3,3],[11,3],[7,7]],true,g.tip),f.line(7,7,7,21),
      f.contour([[21,9],[21,17],[17,13]],true,g.tip),f.line(3,13,17,13)];
  },
  'snap-to-grid'(g) {
    const f=figure(g);
    const poles=f.path('M14 5.5H8.9A6.5 6.5 0 0 0 8.9 18.5H14V14.5H8.9A2.5 2.5 0 0 1 8.9 9.5H14Z');
    const grid=[18.1,21.8].flatMap(x=>[6.5,12,17.5].map(y=>f.dot(x,y,g.stroke*.53)));
    return [poles,f.line(10.7,5.5,10.7,9.5),f.line(10.7,14.5,10.7,18.5),...grid];
  },
};
