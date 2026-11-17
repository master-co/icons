import {author} from './helpers.mjs';
import {solarPanel,windTurbine,batteryFull,batteryLow,batteryMedium,batteryWarning,carBattery,chargingStation,transmissionTower,powerSocket} from './energy-shapes.mjs';
export const batch=author([
 ['solar-panel','太陽能板','solar-panel','phosphor/solar-panel','傾斜分格面板與上方日照',solarPanel],
 ['wind-turbine','風力發電機','hugeicons/wind-turbine','building-wind-turbine','三片漸收葉片、中央輪轂與長塔柱',windTurbine],
 ['battery-full','電池滿電','battery-full','phosphor/battery-full','電池母型內的三格電量',batteryFull],
 ['battery-low','電池低電量','battery-low','phosphor/battery-low','電池母型內的單格電量',batteryLow],
 ['battery-medium','電池中電量','battery-medium','phosphor/battery-medium','電池母型內的兩格電量',batteryMedium],
 ['battery-warning','電池警告','battery-exclamation-point','phosphor/battery-warning','電池外殼與內部驚嘆號',batteryWarning],
 ['car-battery','汽車電瓶','car-battery','phosphor/car-battery','寬電瓶、頂部接點與正負極',carBattery],
 ['charging-station','充電樁','ev-charger','phosphor/charging-station','直立充電機、閃電與側邊充電線',chargingStation],
 ['transmission-tower','輸電塔','hugeicons/electric-tower-01','mdi/transmission-tower','漸寬塔架、橫擔與交叉支撐',transmissionTower],
 ['power-socket','電源插座','tabler/outlet','mdi/power-socket-eu','方形面板與雙圓插孔',powerSocket],
], 'energy','能源電力');
