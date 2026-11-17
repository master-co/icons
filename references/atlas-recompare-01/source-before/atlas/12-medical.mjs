import {author} from './helpers.mjs';
import {stethoscope,syringe,pill,medicalMask,bandage,thermometer,hospital,ambulance,heartPulse,firstAidKit} from './medical-shapes.mjs';
export const batch=author([
 ['stethoscope','聽診器','stethoscope','stethoscope','雙耳管、柔性U形導管與圓形聽頭',stethoscope],
 ['syringe','針筒','syringe','phosphor/syringe','推桿、指托、刻度筒身與針尖',syringe],
 ['pill','藥丸','pill','pill','膠囊的半圓兩端與中央接合分界',pill],
 ['medical-mask','醫療口罩','phosphor/face-mask','face-mask','鼻樑折線、下巴包覆與兩側耳帶',medicalMask],
 ['bandage','OK繃','bandage','bandage','中央敷墊、透氣孔與兩側黏貼帶',bandage],
 ['thermometer','體溫計','thermometer','phosphor/thermometer-simple','玻璃管、感溫球與中央液柱',thermometer],
 ['hospital','醫院','hospital','phosphor/hospital','醫療標記、入口與相接院區',hospital],
 ['ambulance','救護車','ambulance','ambulance','醫療車廂、駕駛艙與車輪',ambulance],
 ['heart-pulse','心跳','heart-pulse','heartbeat','心形輪廓內的起伏脈波',heartPulse],
 ['first-aid-kit','急救箱','briefcase-medical','first-aid-kit','提把、箱體與中央醫療標記',firstAidKit],
], 'medical','醫療用品');
