import {figure, mark, rotate} from '../families/shared.mjs';
import {tableLayout} from '../expansion/table-layout.mjs';
import {knockout} from '../occlusion.mjs';

// Letters are centerline drawings. Set the crossbar by interpolation so the
// join follows the sloping stems as cap height and set width change.
function capitalA(f,x,width,top,bottom) {
  const mid=x+width/2, level=.62;
  return [f.contour([[x,bottom],[mid,top],[x+width,bottom]]),
    f.line(mid-width*level/2,top+(bottom-top)*level,mid+width*level/2,top+(bottom-top)*level)];
}
function lowerA(f,x,y,w,h) {
  return [f.path(`M${x+w} ${y}V${y+h}M${x+w} ${y+h*.35}C${x+w*.72} ${y-h*.16} ${x} ${y-h*.08} ${x} ${y+h*.5}S${x+w*.75} ${y+h*1.16} ${x+w} ${y+h*.68}`)];
}

function paragraphDirection(g,rtl) {
  const f=figure(g),end=rtl?4:20,tail=rtl?20:4,wing=rtl?7:17;
  return [f.path('M18 3.5H9.5C4.4 3.5 4.4 10.7 9.5 10.7H11M11 3.5V14M15.5 3.5V14'),
    ...f.arrow([f.line(tail,19,end,19)], [[wing,16],[end,19],[wing,22]])];
}

function paragraphSpacing(g,after) {
  const f=figure(g), tip=after?21:3, tail=after?14:10, wing=after?18:6;
  return [f.line(3.5,after?4:14,20.5,after?4:14),f.line(3.5,after?9:19,15.5,after?9:19),
    ...f.arrow([f.line(12,tail,12,tip)], [[9,wing],[12,tip],[15,wing]])];
}
function columns(g,count) {
  const f=figure(g),left=g.s===16?2:2.5,width=24-2*left;
  const nodes=[f.rect(left,4,width,16)];
  for(let i=1;i<count;i++) nodes.push(f.line(left+width*i/count,4,left+width*i/count,20));
  return nodes;
}

function tableBand(g,header,column=false) {
  const f=figure(g);
  const frame=f.rect(2.8,3.5,18.4,17);
  const row=f.line(2.8,12,21.2,12), col=f.line(12,3.5,12,20.5);
  if(header) {
    // The heading spans both cells. The outer frame stays stationary when
    // switching between heading rows and columns.
    if(column) return [frame,col,f.line(12,12,21.2,12),f.line(5.9,9,8.8,6.1),f.line(5.9,15,8.8,12.1)];
    return [frame,row,f.line(12,12,12,20.5),f.line(6.8,9,9.7,6.1),f.line(12.7,9,15.6,6.1)];
  }
  return [frame,row,col,f.dot(7.4,7.8,g.stroke*.8),
    column?f.dot(7.4,16.2,g.stroke*.8):f.dot(16.6,7.8,g.stroke*.8)];
}
function pageBand(g,footer) {
  const f=figure(g),y=footer?14.9:9.1;
  return [f.rect(5,3,14,18),f.line(5,y,19,y)];
}

export const editorDrawings={
  'text-color'(g) {
    const f=figure(g);
    return [...capitalA(f,6.5,11,3.2,15.8),f.line(3.5,20.2,20.5,20.2)];
  },
  'font-size'(g) {
    const f=figure(g);
    return [...capitalA(f,2.7,11.5,5,19),f.path('M16 5H21M18.5 5V19M16 19H21')];
  },
  'line-height'(g) {
    const f=figure(g);
    return [f.line(11.5,5,21,5),f.line(11.5,12,18.5,12),f.line(11.5,19,21,19),
      f.contour([[2.5,7.7],[5.5,4.7],[8.5,7.7]]),f.line(5.5,5,5.5,19),
      f.contour([[2.5,16.3],[5.5,19.3],[8.5,16.3]])];
  },
  'letter-spacing'(g) {
    const f=figure(g);
    return [f.path('M3.5 4.5H10.5M7 4.5V13M13.5 4.5H20.5M17 4.5V13'),
      f.line(3.5,19,20.5,19),f.contour([[6,16.5],[3.5,19],[6,21.5]]),
      f.contour([[18,16.5],[20.5,19],[18,21.5]])];
  },
  'font-family'(g) {
    const f=figure(g);
    return [f.path('M3 8V5H15V8M9 5V19M6 19H12M16 19V10C16 6.8 18.1 5.6 20.6 6.4M13.8 11H19.5')];
  },
  ligature(g) {
    const f=figure(g);
    return [f.path('M4 19H10M7 19V9C7 5.3 8.8 3.5 11.7 3.5C14 3.5 15.2 4.5 16.4 5.7M4.5 10H17V19M14 19H20'),f.dot(17,6)];
  },
  'case-upper'(g) {
    const f=figure(g);
    return [...capitalA(f,2.5,9,5.5,18.5),f.path('M14.5 18.5V5.5H17.2C21.8 5.5 21.8 11.6 17.2 11.6H14.5M17.2 11.6C22.6 11.6 22.6 18.5 17.2 18.5H14.5')];
  },
  'case-lower'(g) {
    const f=figure(g);
    return [...lowerA(f,3,10,6.8,8.4),f.path('M14 4.5V18.5M14 13.2C15 9 21 8.6 21 14.1S15.4 20.2 14 16.1')];
  },
  'case-title'(g) {
    const f=figure(g);
    return [...capitalA(f,2.5,9.5,5.5,18.5),...lowerA(f,14.3,10.4,6.6,8.1)];
  },
  'small-caps'(g) {
    const f=figure(g);
    return [...capitalA(f,2.4,9.8,5,18.7),...capitalA(f,14.5,7.3,10,18.7)];
  },
  'text-direction-ltr':g=>paragraphDirection(g,false),
  'text-direction-rtl':g=>paragraphDirection(g,true),
  'paragraph-spacing-before':g=>paragraphSpacing(g,false),
  'paragraph-spacing-after':g=>paragraphSpacing(g,true),
  'code-block'(g) {
    const f=figure(g);
    return [f.rect(2.5,4,19,16),f.contour([[9.2,9],[6.2,12],[9.2,15]]),
      f.contour([[14.8,9],[17.8,12],[14.8,15]])];
  },
  'table-of-contents'(g) {
    const f=figure(g);
    return [5,12,19].flatMap((y,i)=>[f.line(i===1?6:3.5,y,i===1?11:13,y),f.dot(17,y,g.stroke/2),f.line(20.5,y-1,20.5,y+1)]);
  },
  'horizontal-rule'(g) {
    const f=figure(g);
    return [f.line(4,5.5,13.5,5.5),f.line(2.5,12,21.5,12),f.line(4,18.5,11.5,18.5)];
  },
  'page-break'(g) {
    const f=figure(g);
    return [f.contour([[5,8.4],[5,2.6],[19,2.6],[19,8.4]],false,g.r),
      f.contour([[5,15.6],[5,21.4],[19,21.4],[19,15.6]],false,g.r),
      ...[2.8,10.2,17.6].map(x=>f.line(x,12,x+3.6,12))];
  },
  'section-break'(g) {
    const f=figure(g);
    return [f.line(4,4.8,12.5,4.8),f.line(3,10,21,10),f.line(3,14,21,14),f.line(4,19.2,15.5,19.2)];
  },
  footnote(g) {
    const f=figure(g);
    return [f.path('M3.5 8V5.5H13.5V8M8.5 5.5V15M6 15H11M16.8 5L19.3 3V10'),f.line(3.5,20,17.5,20)];
  },
  'link-card'(g) {
    const f=figure(g);
    return [f.rect(2,4.6,20,14.8),
      f.path('M6.7 11.3L8.1 9.9A2.15 2.15 0 0 1 11.15 12.95L10.6 13.5M9 12.7L7.8 13.9A2.15 2.15 0 0 1 4.76 10.86'),
      f.line(15,10,18.8,10),f.line(15,14.1,17.5,14.1)];
  },
  callout(g) {
    const f=figure(g);
    return [f.rect(2.6,5.1,18.8,13.8),f.line(7.3,5.1,7.3,18.9),f.line(14,8.5,14,12),f.dot(14,15.4,g.stroke/2)];
  },
  'toggle-block'(g) {
    const f=figure(g);
    return [f.contour([[3.5,6.5],[9,11.4],[3.5,16.3]],true,g.tip),f.line(12.5,8.5,21,8.5),f.line(12.5,14.5,18.3,14.5)];
  },
  'embed-video'(g) {
    const f=figure(g);
    return [f.rect(2.5,3.9,19,16.2),f.contour([[10,7],[15.3,10.45],[10,13.9]],true,g.tip),f.line(5.8,16.8,18.2,16.8)];
  },
  'layout-columns-3':g=>columns(g,3),
  'layout-columns-4':g=>columns(g,4),
  'table-header-row':g=>tableBand(g,true),
  'table-header-column':g=>tableBand(g,true,true),
  'table-select-cell'(g) {
    const f=figure(g);
    return [f.rect(2.8,3.5,18.4,17),f.line(12,3.5,12,20.5),f.line(2.8,12,21.2,12),f.dot(7.4,7.8,g.stroke*.8)];
  },
  'table-select-row':g=>tableBand(g,false),
  'table-select-column':g=>tableBand(g,false,true),
  'table-delete'(g) {
    const f=figure(g);
    return knockout([f.rect(3,4,17.5,15.7),f.line(3,10.5,20.5,10.5),f.line(10,4,10,19.7)],
      mark(g,'x',19.5,18.5),g);
  },
  'table-row-insert-above':g=>rotate(tableLayout['table-row-add'](g),180,g),
  'table-column-insert-left':g=>rotate(tableLayout['table-row-add'](g),90,g),
  'page-header':g=>pageBand(g,false),
  'page-footer':g=>pageBand(g,true),
};
