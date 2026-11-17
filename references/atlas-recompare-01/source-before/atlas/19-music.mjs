import {author} from './helpers.mjs';
import {guitar,piano,drum,violin,trumpet,saxophone,metronome,electricGuitar,vinylRecord,musicKeyboard} from './music-shapes.mjs';
export const batch=author([
 ['guitar','木吉他','guitar','phosphor/guitar','圓腹收腰琴身與斜向琴頸',guitar],
 ['piano','鋼琴','piano','~tabler/piano','弧形翼狀琴身與前緣琴鍵',piano],
 ['drum','鼓','drum','hugeicons/drum','橢圓鼓面、桶身與鼓棒',drum],
 ['violin','小提琴','mdi/violin','openmoji/1F3BB','上下雙腹、兩側深腰與琴頸琴橋',violin],
 ['trumpet','小號','mdi/trumpet','openmoji/1F3BA','水平管身、向外擴張喇叭口與迴轉管',trumpet],
 ['saxophone','薩克斯風','mdi/saxophone','openmoji/1F3B7','彎曲吹嘴、長管與上翻喇叭口',saxophone],
 ['metronome','節拍器','metronome','phosphor/metronome','梯形機殼與傾斜擺桿',metronome],
 ['guitar-electric','電吉他','guitar-electric','mdi/guitar-electric','肩部切角琴身與斜向琴頸',electricGuitar],
 ['vinyl-record','黑膠唱片','phosphor/vinyl-record','lucide/disc-3','圓盤、中心孔與對向音軌弧線',vinylRecord],
 ['music-keyboard','電子琴','keyboard-music','~phosphor/piano-keys','矩形機身、上方控制與下方琴鍵',musicKeyboard],
], 'music-equipment','樂器與音樂設備');
