import {coreDrawings as core} from '../families/core.mjs';
import {productDrawings as product} from '../families/product.mjs';
import {navigation} from '../families/navigation.mjs';
import {figure, mark, rotate} from '../families/shared.mjs';
import {knockout} from '../occlusion.mjs';

const turn = (draw, angle) => g => rotate(draw(g), angle, g);

function boundary(g) {
  const f = figure(g);
  return [f.line(20.5,4,20.5,20),
    ...f.arrow([f.line(3,12,15.7,12)], [[10.8,7.1],[15.7,12],[10.8,16.9]])];
}

function circledArrow(g) {
  const f = figure(g);
  return [...core.circle(g),
    ...f.arrow([f.line(7.5,12,16.5,12)], [[12.6,8.1],[16.5,12],[12.6,15.9]])];
}

function doubleEnded(g,angle) {
  // Rotate the construction points, including the second head's local axis.
  const f=figure(g), rad=angle*Math.PI/180;
  const point=(x,y)=>[12+x*Math.cos(rad)-y*Math.sin(rad),12+x*Math.sin(rad)+y*Math.cos(rad)];
  const head=sign=>{
    const tip=point(9*sign,0);
    return f.arrow([f.line(12,12,...tip)], [point(4.5*sign,-4.5),tip,point(4.5*sign,4.5)]);
  };
  return [...head(-1),...head(1)];
}

function bellAction(g,kind) {
  return knockout(core.bell(g),mark(g,kind,19,5),g);
}

function fileArrow(g,up) {
  const f=figure(g),tip=up?10:17,tail=up?17:10,wing=up?13:14;
  return [...core.file(g), ...f.arrow([f.line(11.7,tail,11.7,tip)], [[8.9,wing],[11.7,tip],[14.5,wing]])];
}

export const interfaceDrawings = {
  'arrow-up-left':turn(core['arrow-up-right'],-90),
  'arrow-down-left':turn(core['arrow-up-right'],180),
  'arrow-big-right':turn(product['arrow-big-up'],90),
  'arrow-big-down':turn(product['arrow-big-up'],180),
  'arrow-big-left':turn(product['arrow-big-up'],-90),
  'chevrons-up':turn(navigation['chevrons-right'],-90),
  'chevrons-down':turn(navigation['chevrons-right'],90),
  'arrow-up-down':turn(product['arrow-left-right'],-90),
  'arrow-left-to-line':turn(boundary,180),
  'arrow-right-to-line':boundary,
  'arrow-up-to-line':turn(boundary,-90),
  'arrow-down-to-line':turn(boundary,90),
  'arrow-right-circle':circledArrow,
  'arrow-left-circle':turn(circledArrow,180),
  'arrow-up-circle':turn(circledArrow,-90),
  'arrow-down-circle':turn(circledArrow,90),
  'move-horizontal':g=>doubleEnded(g,0),
  'move-vertical':g=>doubleEnded(g,90),
  'move-diagonal-up-right':g=>doubleEnded(g,-45),
  'move-diagonal-down-right':g=>doubleEnded(g,45),
  'plus-circle'(g) {
    const f=figure(g);
    return [...core.circle(g),f.line(8,12,16,12),f.line(12,8,12,16)];
  },
  'square-minus':g=>[...core.square(g),figure(g).line(8,12,16,12)],
  'square-x'(g) {
    const f=figure(g);
    return [...core.square(g),f.line(8.8,8.8,15.2,15.2),f.line(15.2,8.8,8.8,15.2)];
  },
  hash(g) {
    const f=figure(g);
    return [f.line(10.3,3.5,7.3,20.5),f.line(16.7,3.5,13.7,20.5),f.line(4.5,9,20.5,9),f.line(3.5,15,19.5,15)];
  },
  slash:g=>[figure(g).line(6,20.5,18,3.5)],
  'more-horizontal-circle':g=>[...core.circle(g),...[7.6,12,16.4].map(x=>figure(g).dot(x,12))],
  'bell-plus':g=>bellAction(g,'plus'),
  'bell-minus':g=>bellAction(g,'minus'),
  'file-pen'(g) {
    const pen=figure(g).contour([[12,16.8],[18.7,10.1],[21.9,13.3],[15.2,20],[11,21]],true,g.tip);
    return knockout(core.file(g),[pen],g,{silhouettes:[pen]});
  },
  'file-down':g=>fileArrow(g,false),
  'file-up':g=>fileArrow(g,true),
  'file-stack'(g) {
    const f=figure(g);
    return [f.contour([[3,7],[3,21],[15,21]],false,g.r),
      f.contour([[7,2.5],[15.5,2.5],[20.5,7.5],[20.5,17],[7,17]],true,g.r),
      f.contour([[15.5,3],[15.5,7.5],[20,7.5]])];
  },
  'folder-copy'(g) {
    const f=figure(g);
    return [f.contour([[3,15.5],[3,3.5],[9,3.5],[11,5.5],[17,5.5]],false,g.r),
      f.contour([[6.8,20.5],[6.8,9],[12,9],[14,11],[21.2,11],[21.2,20.5]],true,g.r)];
  },
  'folder-move'(g) {
    const f=figure(g);
    return [...core.folder(g),...f.arrow([f.line(8,13.5,16,13.5)], [[13,10.5],[16,13.5],[13,16.5]])];
  },
  'link-plus':g=>[...navigation.link(g),...mark(g,'plus',18.6,18.6)],
  'search-x'(g) {
    const f=figure(g);
    return [f.circle(10.5,10.5,7),f.line(15.6,15.6,20.6,20.6),...mark(g,'x',10.5,10.5)];
  },
};
