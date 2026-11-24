import {author} from './helpers.mjs';
import {cat,dog,pawPrint,fish,bird,snail,turtle,butterfly,bee} from './animal-shapes.mjs';
export const batch=author([
['cat','貓','cat','cat','外展尖耳、圓頰與克制眼鼻',cat],
['dog','狗','dog','dog','下垂耳輪廓與圓鼻',dog],
['fish','魚','fish','fish','杏仁魚身、尾鰭與收在身內的鰓線',fish],
['bird','鳥','bird','phosphor/bird','短喙、收束尾羽與內翼',bird],
['rabbit','兔子','rabbit','phosphor/rabbit','外展長耳、圓頰與克制的眼鼻',({p,d,g})=>[p('M7.2 11.2C6.4 9.3 5.7 6.5 5.7 4.8C5.7 3.3 6.2 2.5 7.2 2.5C8.9 2.5 9.7 6.1 10.2 9.9C11.4 9.5 12.6 9.5 13.8 9.9C14.3 6.1 15.1 2.5 16.8 2.5C17.8 2.5 18.3 3.3 18.3 4.8C18.3 6.5 17.6 9.3 16.8 11.2C18.3 12.5 19 14.1 19 16C19 19.1 16.5 21.3 12 21.3C7.5 21.3 5 19.1 5 16C5 14.1 5.7 12.5 7.2 11.2Z'),d(9,15.5,g.v(.65,.8,.9)),d(15,15.5,g.v(.65,.8,.9)),d(12,18,g.v(.45,.55,.65))]],
['turtle','烏龜','turtle','hugeicons/turtle','半球背甲、短足與前伸圓頭',turtle],
['snail','蝸牛','snail','snail','舒展螺旋殼、頸部及分離觸角',snail],
['butterfly','蝴蝶','phosphor/butterfly','butterfly','寬上翼、圓下翼與窄身',butterfly],
['bee','蜜蜂','openmoji/1F41D','mdi/bee','觸角、雙翅與條紋長腹',bee],
['paw-print','掌印','paw-print','paw','四枚趾墊與寬掌墊',pawPrint]
], 'nature','自然與動物');
