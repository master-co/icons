import {enclosedDetails,exteriorDetails} from '../occlusion.mjs';

export function bone({p}){
 return [p('M17 10C17.7 9.3 18.69 10 19.5 10A2.5 2.5 0 1 0 19.5 5A.5 .5 0 0 1 19 4.5A2.5 2.5 0 1 0 14 4.5C14 5.31 14.7 6.3 14 7L7 14C6.3 14.7 5.31 14 4.5 14A2.5 2.5 0 0 0 4.5 19C4.78 19 5 19.22 5 19.5A2.5 2.5 0 1 0 10 19.5C10 18.69 9.3 17.7 10 17Z')];
}
export function tooth({g,p,l}){
 const body=p('M12 5.5C9 3.5 4 2.5 4 9C4 14 5.25 19 7.25 21C8.5 22 9.5 19 10.25 16.5C11 14.25 13 14.25 13.75 16.5C14.5 19 15.5 22 16.75 21C18.75 19 20 14 20 9C20 2.5 15 3.5 12 5.5Z');
 return enclosedDetails(body,[l(12,5.5,15,7)],g);
}
export function brain({g,p,l,small}){
 const body=p('M12 5C12 1 6 1 6 5V6C2 6 2 11 4 12C1 14 3 18 5 18C5 23 12 23 12 18C12 23 19 23 19 18C21 18 23 14 20 12C22 11 22 6 18 6V5C18 1 12 1 12 5Z');
 const folds=[l(12,5,12,18),p('M8 13C10 13 12 15 12 17'),p('M16 13C14 13 12 15 12 17')];
 return enclosedDetails(body,[...folds,...small?[]:[p('M6 6Q6 9 8 9'),p('M18 6Q18 9 16 9')]],g);
}

export function lungs({g,p,l}){
 const left=p('M8.5 7.5C8.5 4 6.5 5 5.5 6.5C3 10 2 14 2 17C2 22 8.5 22 8.5 17Z');
 const right=p('M15.5 7.5C15.5 4 17.5 5 18.5 6.5C21 10 22 14 22 17C22 22 15.5 22 15.5 17Z');
 const airway=[l(12,3,12,9),p('M8.5 12C11 12 12 10 12 9C12 10 13 12 15.5 12')];
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
 return [c(14,4,2),p('M4 12C8 8 10 8 12 9C15 11 16 13 20 13'),p('M12 9L6 22'),o([[9.2,15],[15,18],[15,22]],false,g.tip)];
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
