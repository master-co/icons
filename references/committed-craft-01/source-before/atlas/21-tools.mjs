import {author} from './helpers.mjs';
import {hammer,screwdriver,drill,saw,tapeMeasure,toolbox,hardHat,paintRoller,pocketKnife,nut} from './tool-shapes.mjs';
export const batch=author([
 ['hammer','鐵鎚','hammer','phosphor/hammer','彎曲鎚頭、敲擊面與斜向長柄',hammer],
 ['screwdriver','螺絲起子','phosphor/screwdriver','mdi/screwdriver','斜向握柄、握槽與細長刀桿',screwdriver],
 ['drill','電鑽','drill','hugeicons/drill','橫向機頭、夾頭、斜握柄與電池座',drill],
 ['saw','手鋸','mdi/hand-saw','openmoji/1FA9A','斜向鋸片、粗齒刃與封閉握柄',saw],
 ['tape-measure','捲尺','hugeicons/tape-measure','~mdi/tape-measure','捲起尺帶、攤開的尺端與刻度',tapeMeasure],
 ['toolbox','工具箱','toolbox','phosphor/toolbox','斜肩箱蓋、提把與兩個扣鎖',toolbox],
 ['hard-hat','工程安全帽','hard-hat','phosphor/hard-hat','圓頂護殼、中央加強脊與外伸帽緣',hardHat],
 ['paint-roller','油漆滾筒','paint-roller','phosphor/paint-roller','寬滾筒、折彎支架與下方握柄',paintRoller],
 ['pocket-knife','瑞士刀','pocket-knife','hugeicons/pocket-knife','折疊刀柄、展開刀刃與螺旋開瓶器',pocketKnife],
 ['nut','螺帽','phosphor/nut','nut','六角外輪廓與中央圓孔',nut],
], 'workshop','工具用品');
