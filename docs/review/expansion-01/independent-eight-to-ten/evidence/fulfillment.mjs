import {figure,mark} from '../families/shared.mjs';
import {commerce} from '../families/commerce.mjs';
import {knockout} from '../occlusion.mjs';

const flat=node=>[node[0],{...node[1],'stroke-linecap':'butt'}];
function barcode(g,scan=false){
  const f=figure(g),xs=scan?[7,10.5,14,17.5]:[4,8,12,16,20];
  const bars=xs.map(x=>flat(f.line(x,scan?8:5,x,scan?16:19)));
  if(!scan)return bars;
  const corners=[[[3,7],[3,3],[7,3]],[[17,3],[21,3],[21,7]],
    [[21,17],[21,21],[17,21]],[[7,21],[3,21],[3,17]]];
  return [...corners.map(p=>f.contour(p,false,Math.min(g.r,g.v(.6,.8,1)))),...bars];
}

function qrCode(g){
  const f=figure(g),solid=node=>[node[0],{...node[1],fill:'currentColor',stroke:'none'}];
  return [...[[3,3],[15,3],[3,15]].flatMap(([x,y])=>[
    ['rect',{...f.rect(x,y,6,6,0)[1],'stroke-linejoin':'miter'}],
    ...(g.s===16?[]:[solid(f.rect(x+2.25,y+2.25,1.5,1.5,0))])]),
    ['path',{...f.contour([[14,14],[17,14],[17,17],[21,17],[21,21]],false,0)[1],
      'stroke-linecap':'butt','stroke-linejoin':'miter'}],
    solid(f.rect(13.5,19.5,2,2,0)),solid(f.rect(19.5,12.5,2,2,0))];
}

function calculator(g){
  const f=figure(g);
  return [f.rect(5,2.5,14,19),...(g.s===16?[f.line(8.5,7,15.5,7)]:[f.rect(8,5.5,8,3.5,g.tip)]),
    ...[12.5,17].flatMap(y=>[8,12,16].map(x=>f.dot(x,y,g.v(.65,.8,.9))))];
}

function packageOpen(g){
  const f=figure(g),r=g.tip;
  const flaps=[f.contour([[5,7],[12,11],[9,14],[2,10]],true,r),
    f.contour([[12,11],[19,7],[22,10],[15,14]],true,r)];
  const sides=f.contour([[5,7],[5,18.5],[12,22],[19,18.5],[19,7]],false,r);
  return [...knockout([sides],flaps,g,{silhouettes:flaps}),
    f.contour([[5,7],[12,3],[19,7]],false,r),flat(f.line(12,11,12,22))];
}

function packageReturn(g){
  const f=figure(g),end=16+(g.corner==='sharp'?g.stroke*12/g.s:0);
  const arrow=[f.contour([[18.5,13.5],[16,16],[18.5,18.5]],false,g.tip),
    f.path(`M ${end} 16 H 19.5 C 24 16 24 21.5 19.5 21.5 H 19`)];
  return knockout(commerce.package(g),arrow,g);
}

export const fulfillment={
  barcode:g=>barcode(g),
  'qr-code':qrCode,
  'scan-barcode':g=>barcode(g,true),
  calculator,
  landmark:g=>{const f=figure(g);return [f.contour([[3,8],[12,3],[21,8]],true,g.tip),
    ...[6,12,18].map(x=>f.line(x,11,x,17.5)),f.line(3,21,21,21)];},
  'package-open':packageOpen,
  'package-check':g=>knockout(commerce.package(g),mark(g,'check',18,18),g),
  'package-return':packageReturn,
  'shopping-cart-plus':g=>knockout(commerce['shopping-cart'](g),mark(g,'plus',18.5,6),g),
  'shopping-cart-check':g=>knockout(commerce['shopping-cart'](g),mark(g,'check',18.5,6),g),
};
