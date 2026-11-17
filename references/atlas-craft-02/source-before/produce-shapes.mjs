import {exteriorDetails} from '../occlusion.mjs';

export function appleFruit({g,p}){
 const body=p('M12 7C9.5 4.7 5.9 4.7 3.8 7.2C1.2 10.3 4.1 18.7 7.3 20.8C9.1 22 10.5 20.6 12 20.6C13.5 20.6 14.9 22 16.7 20.8C19.9 18.7 22.8 10.3 20.2 7.2C18.1 4.7 14.5 4.7 12 7Z');
 return exteriorDetails(body,[p('M12 7C11.7 4.6 12.4 3 14.2 2')],g);
}
export function cherry({g,p,c}){
 const left=c(6.5,17,3.8),right=c(17.5,17,3.8);
 const stems=[p('M6.5 13.2C9.8 11 12.5 7 13 3'),p('M13 3C13.1 7.5 14.7 10.7 17.5 13.2')];
 return [left,right,...exteriorDetails(left,stems,g).slice(1).flatMap(n=>exteriorDetails(right,[n],g).slice(1))];
}
export function grape({g,p,c}){
 if(g.s<24){
  const left=c(6.5,10.5,3.3),right=c(17.5,10.5,3.3);
  const stem=p('M6.5 7.2C10 7.2 12 5 12 2M12 5C12.5 6.5 14.5 7.2 17.5 7.2');
  return [left,right,c(12,20,2.5),...exteriorDetails(left,[stem],g).slice(1).flatMap(n=>exteriorDetails(right,[n],g).slice(1))];
 }
 const top=c(12,8,2.35);
 return [c(4.5,8,2.35),top,c(19.5,8,2.35),c(8.25,14.5,2.35),c(15.75,14.5,2.35),c(12,21,2.1),...exteriorDetails(top,[p('M12 5.65C12 3.5 13.5 2 16 2')],g).slice(1)];
}
