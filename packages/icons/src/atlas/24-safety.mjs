import {author} from './helpers.mjs';
import {cctv,siren,alarmSmoke,fireExtinguisher,fireHydrant,vault,keySquare,scanFace,seatBelt,safetyPin} from './safety-shapes.mjs';
export const batch=author([
 ['cctv','監視器','cctv','hugeicons/cctv-camera','俯視鏡身、前鏡口與牆面支架',cctv],
 ['siren','警示燈','siren','phosphor/siren','圓頂燈罩、底座與放射警示光',siren],
 ['alarm-smoke','煙霧警報器','alarm-smoke','alarm-smoke','扁平偵測器、下方感測殼與上升煙流',alarmSmoke],
 ['fire-extinguisher','滅火器','fire-extinguisher','phosphor/fire-extinguisher','壓力瓶、頂閥、外側軟管與瓶身分界',fireExtinguisher],
 ['fire-hydrant','消防栓','tabler/fire-hydrant','mdi/fire-hydrant','圓帽立柱、側接頭與中央出水口',fireHydrant],
 ['vault','保險庫','vault','phosphor/vault','厚門框與中央四向鎖栓輪',vault],
 ['key-square','方頭鑰匙','key-square','hugeicons/key-square','方形握頭、孔槽與階梯鎖齒',keySquare],
 ['scan-face','臉部辨識','scan-face','face-id','四角掃描框與中央臉部線索',scanFace],
 ['seat-belt','安全帶','phosphor/seatbelt','mdi/seatbelt','乘員頭肩、跨胸斜帶與腰帶',seatBelt],
 ['safety-pin','安全別針','hugeicons/safety-pin-01','lucide-lab/pin-safety','彈簧圈、平行針身與彎曲保護扣',safetyPin],
], 'safety','消防與安全');
