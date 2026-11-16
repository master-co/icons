import {figure,rotate} from '../families/shared.mjs';

function face(g,sad=false){
  const f=figure(g),dot=g.v(.7,.8,.9);
  return [f.circle(12,12,9),f.dot(8.7,9.5,dot),f.dot(15.3,9.5,dot),
    f.path(sad?'M8.5 16Q12 12.5 15.5 16':'M8.5 14.5Q12 18 15.5 14.5')];
}
function thumb(g){
  const f=figure(g),r=g.corner==='sharp'?0:g.corner==='soft'?.8:1.5;
  return [f.path(`M7 11H${3+r}Q3 11 3 ${11+r}V${21-r}Q3 21 ${3+r} 21H17.4`+
    'C18.5 21 19.4 20.2 19.6 19.1L21 12.6C21.3 11.2 20.4 10 19 10H13.5L14.1 6.5'+
    'C14.5 4.5 13.1 3.2 11 3.5C11 5.5 10.2 7.5 9.5 8.8L7 11Z'),f.line(7,11,7,21)];
}
function seal(g){
  // A periodic eight-lobed outline. Shared analytic tangents avoid the small
  // kinks produced by joining independent circular petals.
  const f=figure(g),step=Math.PI/8,points=[];
  for(let i=0;i<16;i++){
    const a=-Math.PI/2+i*step,r=8.25+.5*Math.cos(i*Math.PI);
    points.push({p:[12+r*Math.cos(a),12+r*Math.sin(a)],d:[-r*Math.sin(a),r*Math.cos(a)]});
  }
  let d=`M${points[0].p.join(' ')}`;
  for(let i=0;i<16;i++){
    const a=points[i],b=points[(i+1)%16],k=step/3;
    d+=`C${a.p[0]+a.d[0]*k} ${a.p[1]+a.d[1]*k} ${b.p[0]-b.d[0]*k} ${b.p[1]-b.d[1]*k} ${b.p.join(' ')}`;
  }
  return f.path(d+'Z');
}
export const feedback={
  smile:g=>face(g),
  frown:g=>face(g,true),
  'thumbs-up':g=>thumb(g),
  'thumbs-down':g=>rotate(thumb(g),180,g),
  award:g=>{
    const f=figure(g),joinY=8+Math.sqrt(5.5**2-3.5**2);
    return [f.circle(12,8,5.5),f.contour([[8.5,joinY],[7,21],[12,18],[17,21],[15.5,joinY]],false,g.tip)];
  },
  target:g=>{
    const f=figure(g);
    return [f.circle(12,12,9),f.circle(12,12,5),f.dot(12,12,g.v(.8,1,1.2))];
  },
  'badge-check':g=>{
    const f=figure(g);
    return [seal(g),f.contour([[8.5,12],[11,14.5],[15.8,9.5]],false,g.tip)];
  },
  sparkles:g=>{
    const f=figure(g);
    return [f.path('M10 5C10.7 10 12 11.3 17 12C12 12.7 10.7 14 10 19C9.3 14 8 12.7 3 12C8 11.3 9.3 10 10 5Z'),
      f.line(19,3,19,7),f.line(17,5,21,5)];
  },
};
