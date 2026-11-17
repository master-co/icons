import {author} from './helpers.mjs';
import {factory,craneTower,craneTruck,forklift,warehouse,excavator,container,robotArm,constructionBarrier,wall} from './industry-shapes.mjs';
export const batch=author([
 ['factory','工廠','factory','phosphor/factory','高煙囪、鋸齒廠房屋頂與排窗',factory],
 ['crane-tower','塔式起重機','phosphor/crane-tower','hugeicons/crane-tower','垂直塔身、水平吊臂與垂吊鉤',craneTower],
 ['crane-truck','吊車','tabler/car-crane','hugeicons/crane','輪式底盤、駕駛艙、上揚吊臂與吊鉤',craneTruck],
 ['forklift','堆高機','forklift','forklift','低機身、駕駛架、直立門架與前伸貨叉',forklift],
 ['warehouse','倉庫','warehouse','phosphor/warehouse','寬廠房與大面捲門',warehouse],
 ['excavator','挖土機','tabler/backhoe','hugeicons/excavator','履帶底盤、駕駛艙、折臂與鏟斗',excavator],
 ['container','貨櫃','container','phosphor/shipping-container','長箱體、轉角面與垂直壓紋',container],
 ['robot-arm','機械手臂','robot-arm','mdi/robot-industrial-outline','支座、關節、連續臂桿與夾爪',robotArm],
 ['construction-barrier','施工圍欄','construction','barrier-block','橫向警示板、斜紋與兩側支腳',constructionBarrier],
 ['wall','磚牆','brick-wall','phosphor/wall','三層錯縫磚砌牆面',wall],
], 'industry','工業設備');
