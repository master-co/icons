import {author} from './helpers.mjs';
import {bone,tooth,brain,lungs,ear,handHeart,personStanding,personWalking,wheelchair,crutch} from './body-shapes.mjs';
export const batch=author([
 ['bone','骨頭','bone','bone','細長骨幹與兩端膨大的骨端',bone],
 ['tooth','牙齒','phosphor/tooth','dental','微凹牙冠、飽滿齒身與分開牙根',tooth],
 ['brain','大腦','brain','brain','左右腦葉、中央縱裂與少量腦迴',brain],
 ['lungs','肺','hugeicons/lungs','lungs','左右肺葉與中央分岔氣道',lungs],
 ['ear','耳朵','ear','ear','外耳輪、內耳折線與耳垂',ear],
 ['hand-heart','關懷','hand-heart','phosphor/hand-heart','托住心形的手掌與袖口',handHeart],
 ['person-standing','站立','person-standing','phosphor/person-simple','伸展雙臂、直立軀幹與分開雙腿',personStanding],
 ['person-walking','步行','phosphor/person-simple-walk','walk','前傾軀幹、擺臂與前後錯開的雙腿',personWalking],
 ['wheelchair','輪椅','hugeicons/wheelchair','wheelchair','推把、座椅、後方大輪與前方小輪',wheelchair],
 ['crutch','拐杖','tabler/crutches','openmoji/1FA7C','腋托、手握橫桿與收束的支撐桿',crutch],
], 'medical','醫療用品');
