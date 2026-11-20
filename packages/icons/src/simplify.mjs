// Authoring-only. Boolean outlines leave PathKit as hundreds of tiny quadratic
// segments for every round cap, round join and straight edge. Published geometry
// refits those runs to the lines and circular arcs they approximate. Review
// snapshots keep the raw export, so art evidence is unaffected.
import {n} from './geometry.mjs';

// Native viewBox units: a hundredth of a device pixel at 4× on the 24 px master.
export const tolerance=.002;
const maxSweep=Math.PI*17/18;

function parse(d){
  if(/[^MLQCZ\d\s.,e+-]/.test(d))return null;
  const subpaths=[];let current=null;
  for(const [,command,body] of d.matchAll(/([MLQCZ])([^MLQCZ]*)/g)){
    const v=(body.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi)||[]).map(Number);
    if(command==='M'){
      if(v.length<2||v.length%2)return null;
      current={start:[v[0],v[1]],segments:[],closed:false};subpaths.push(current);
      for(let i=2;i<v.length;i+=2)current.segments.push({type:'L',points:[[v[i],v[i+1]]]});
    }else if(command==='Z'){if(!current)return null;current.closed=true;current=null;}
    else{
      const size={L:2,Q:4,C:6}[command];
      if(!current||!v.length||v.length%size)return null;
      for(let i=0;i<v.length;i+=size){
        const points=[];for(let k=0;k<size;k+=2)points.push([v[i+k],v[i+k+1]]);
        current.segments.push({type:command,points});
      }
    }
  }
  return subpaths;
}
const end=segment=>segment.points.at(-1);
// On-curve samples of one segment, its end point last.
function samples(from,{type,points}){
  // A chord is sampled along its length too, or three vertices would always fit a circle.
  const at=type==='L'
    ?t=>[from[0]+(points[0][0]-from[0])*t,from[1]+(points[0][1]-from[1])*t]
    :type==='Q'
    ?t=>{const u=1-t,[c,p]=points;return [u*u*from[0]+2*u*t*c[0]+t*t*p[0],u*u*from[1]+2*u*t*c[1]+t*t*p[1]];}
    :t=>{const u=1-t,[a,b,p]=points;return [u*u*u*from[0]+3*u*u*t*a[0]+3*u*t*t*b[0]+t*t*t*p[0],u*u*u*from[1]+3*u*u*t*a[1]+3*u*t*t*b[1]+t*t*t*p[1]];};
  return [at(.25),at(.5),at(.75),points.at(-1)];
}
function lineFit(from,to,run){
  const dx=to[0]-from[0],dy=to[1]-from[1],length=Math.hypot(dx,dy);
  if(length<1e-9)return null;
  let last=0;
  for(const [x,y] of run){
    if(Math.abs((x-from[0])*dy-(y-from[1])*dx)/length>tolerance)return null;
    const along=((x-from[0])*dx+(y-from[1])*dy)/length;
    if(along<last-tolerance||along>length+tolerance)return null;
    last=Math.max(last,along);
  }
  return {type:'L',to};
}
function arcFit(from,to,run){
  const mid=run[(run.length-1)>>1];
  const ax=mid[0]-from[0],ay=mid[1]-from[1],bx=to[0]-from[0],by=to[1]-from[1],cross=ax*by-ay*bx;
  if(Math.abs(cross)<1e-9)return null;
  const a2=ax*ax+ay*ay,b2=bx*bx+by*by;
  const cx=from[0]+(by*a2-ay*b2)/(2*cross),cy=from[1]+(ax*b2-bx*a2)/(2*cross),r=Math.hypot(from[0]-cx,from[1]-cy);
  if(r<.05||r>64)return null;
  // SVG sweep 1 is clockwise on screen: the angle grows with y pointing down.
  const direction=cross>0?1:-1;
  let previous=Math.atan2(from[1]-cy,from[0]-cx),sweep=0;
  for(const [x,y] of run){
    if(Math.abs(Math.hypot(x-cx,y-cy)-r)>tolerance)return null;
    const angle=Math.atan2(y-cy,x-cx);
    let step=(angle-previous)*direction;
    step-=Math.round(step/(2*Math.PI))*2*Math.PI;
    if(step<-tolerance/r)return null;
    sweep+=step;previous=angle;
    if(sweep>maxSweep)return null;
  }
  // Printed radius and end point must still describe the fitted circle.
  const chord=Math.hypot(bx,by);
  if(chord>2*n(r))return null;
  return {type:'A',to,r,sweep:direction>0?1:0};
}
function simplifySubpath({start,segments,closed}){
  const out=[];let from=start,i=0;
  const cumulative=[[]];let cursor=start;
  for(const segment of segments){cumulative.push(samples(cursor,segment));cursor=end(segment);}
  const run=(a,b)=>{const points=[];for(let k=a+1;k<=b+1;k++)points.push(...cumulative[k]);return points;};
  const longest=(fit)=>{
    // Gallop, then bisect: a valid run stays valid when shortened.
    let good=0,best=null,size=2;
    const attempt=count=>{const result=i+count<=segments.length?fit(from,end(segments[i+count-1]),run(i,i+count-1)):null;if(result){good=count;best=result;}return !!result;};
    while(i+size<=segments.length&&attempt(size))size*=2;
    let low=good+1,high=Math.min(size-1,segments.length-i);
    if(good)while(low<=high){const middle=(low+high)>>1;if(attempt(middle))low=middle+1;else high=middle-1;}
    return {count:good,result:best};
  };
  while(i<segments.length){
    const line=longest(lineFit),arc=longest(arcFit);
    const chosen=line.count>=arc.count?line:arc;
    if(chosen.count>=2){out.push(chosen.result);from=chosen.result.to;i+=chosen.count;}
    else{out.push({type:segments[i].type,points:segments[i].points,to:end(segments[i])});from=end(segments[i]);i++;}
  }
  let d=`M${n(start[0])} ${n(start[1])}`,at=start;
  for(const item of out){
    const [x,y]=[n(item.to[0]),n(item.to[1])];
    if(item.type==='L')d+=n(at[1])===y?`H${x}`:n(at[0])===x?`V${y}`:`L${x} ${y}`;
    else if(item.type==='A')d+=`A${n(item.r)} ${n(item.r)} 0 0 ${item.sweep} ${x} ${y}`;
    else d+=item.type+item.points.map(([px,py])=>`${n(px)} ${n(py)}`).join(' ');
    at=item.to;
  }
  return d+(closed?'Z':'');
}
export function simplifyPathData(d){
  const subpaths=parse(d);
  if(!subpaths)return d;
  const result=subpaths.map(simplifySubpath).join('');
  return result.length<d.length?result:d;
}
// What the packages publish for a catalog entry. Original brand marks keep their source contours.
export const publishedNodes=(entry,nodes)=>entry.category==='brands'&&!entry.styleOf?nodes:simplifyNodes(nodes);
// Baked fills, and stroked outlines long enough to be a Boolean export. Short
// authored strokes and paths with other commands stay exactly as drawn.
const dense=400;
export function simplifyNodes(nodes){
  return nodes.map(([tag,attrs,children])=>{
    if(children)return [tag,attrs,simplifyNodes(children)];
    if(tag!=='path'||attrs['stroke-dasharray'])return [tag,attrs];
    const filled=attrs.stroke==='none'&&attrs.fill&&attrs.fill!=='none';
    if(!filled&&attrs.d.length<dense)return [tag,attrs];
    const d=simplifyPathData(attrs.d);
    return d===attrs.d?[tag,attrs]:[tag,{...attrs,d}];
  });
}
