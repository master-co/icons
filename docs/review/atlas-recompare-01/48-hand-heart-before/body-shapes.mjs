import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';

export function bone({p}){
 return [p('M17 10C17.7 9.3 18.69 10 19.5 10A2.5 2.5 0 1 0 19.5 5A.5 .5 0 0 1 19 4.5A2.5 2.5 0 1 0 14 4.5C14 5.31 14.7 6.3 14 7L7 14C6.3 14.7 5.31 14 4.5 14A2.5 2.5 0 0 0 4.5 19C4.78 19 5 19.22 5 19.5A2.5 2.5 0 1 0 10 19.5C10 18.69 9.3 17.7 10 17Z')];
}
export function tooth({g,p,l}){
 const body=p('M12 5.5C9 3.5 4 2.5 4 9C4 13.5 5.1 17.9 6.7 19.7C7.6 20.7 8.8 20 9.5 18.3C9.9 17.4 10 16.9 10.25 16.25C11 14.1 13 14.1 13.75 16.25C14 16.9 14.1 17.4 14.5 18.3C15.2 20 16.4 20.7 17.3 19.7C18.9 17.9 20 13.5 20 9C20 2.5 15 3.5 12 5.5Z');
 return enclosedDetails(body,[l(12,5.5,15,7)],g);
}
export function brain({g,p,l,small}){
 const top=12.5-Math.sqrt(3.5**2-1.5**2),bottom=25-top;
 const body=p(`M12 6.5A3.5 3.5 0 0 0 5 6.5V${top}A3.5 3.5 0 0 0 5 ${bottom}V17.5A3.5 3.5 0 0 0 12 17.5A3.5 3.5 0 0 0 19 17.5V${bottom}A3.5 3.5 0 0 0 19 ${top}V6.5A3.5 3.5 0 0 0 12 6.5Z`);
 const folds=[l(12,6.5,12,17.5),p('M8.5 13A3.5 3.5 0 0 1 12 16.5'),p('M15.5 13A3.5 3.5 0 0 0 12 16.5')];
 return enclosedDetails(body,[...folds,...small?[]:[p(`M5 ${top}A3.5 3.5 0 0 1 6.5 9H7`),p(`M19 ${top}A3.5 3.5 0 0 0 17.5 9H17`)]],g);
}

export function lungs({g,p,l}){
 const left=p('M8.5 11.5C9.25 8.5 9.5 5 7.75 5C5 5 2 10 2 16C2 22.5 9.25 22.5 9.25 17C9.25 14.5 8.9 12.5 8.5 11.5Z');
 const right=p('M15.5 11.5C14.75 8.5 14.5 5 16.25 5C19 5 22 10 22 16C22 22.5 14.75 22.5 14.75 17C14.75 14.5 15.1 12.5 15.5 11.5Z');
 const airway=[l(12,3,12,9),p('M8.5 11.5C10.5 11.5 12 10 12 9C12 10 13.5 11.5 15.5 11.5')];
 return exteriorDetails(right,exteriorDetails(left,airway,g),g);
}
export function ear({p}){
 return [p('M6 8.5A6.5 6.5 0 1 1 19 8.5C19 14.5 13 14.5 13 18.5A3.5 3.5 0 1 1 6 18.5'),p('M15 8.5A2.5 2.5 0 0 0 10 8.5V9.5A2 2 0 1 1 10 13.5')];
}
export function handHeart({g,p,l,r}){
 const palm=p('M6 15L8.5 12.5Q9.5 11.5 11 11.5H14C17 11.5 17 15.5 14 15.5L20 13.5C23 12.5 24 15.5 21 17L16 20H6Z');
 const heart=p('M15 5C11 1 7 6 10 9L15 14L20 9C23 6 19 1 15 5Z');
 return [...enclosedDetails(palm,[l(11,15.5,14,15.5)],g),...exteriorDetails(palm,[heart,r(2,15,4,5,g.tip)],g).slice(1)];
}

export function personStanding({g,c,l,o}){
 return [c(12,3.5,2),o([[3.5,8.5],[12,10],[20.5,8.5]],false,g.tip),l(12,10,12,14.5),o([[8,22],[12,14.5],[16,22]],false,g.tip)];
}
export function personWalking({g,c,p,o}){
 return [c(14,4,2),p('M4 12C8 8 10 8 12 9C15 11 16 13 20 13'),p('M12 9L6 22'),o([[120/13,15],[15,18],[15,22]],false,g.tip)];
}
export function wheelchair({g,c,p,l}){
 const rear=c(7.5,16.5,5.5),front=c(20,20,2);
 const frame=[p('M2 2H3Q5 2 5 4V16.5'),l(5,7,18,7),l(16,7,16,14),p('M7.5 14H17Q20 14 20 17V20')];
 return exteriorDetails(front,exteriorDetails(rear,frame,g),g);
}
export function crutch({g,r,p,l}){
 const pad=r(7,2,10,4,g.r),body=p('M8.5 6V11C8.5 14 12 14 12 17C12 14 15.5 14 15.5 11V6');
 return [...exteriorDetails(pad,[body],g),l(8.5,10.5,15.5,10.5),l(12,17,12,22),l(10.5,22,13.5,22)];
}
