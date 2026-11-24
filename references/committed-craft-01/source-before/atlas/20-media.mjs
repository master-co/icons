import {author} from './helpers.mjs';
import {radioReceiver,tv,projector,speaker,filmReel,cassette,film,clapperboard,podcast,antenna} from './media-shapes.mjs';
export const batch=author([
 ['radio-receiver','收音機','phosphor/radio','hugeicons/radio-receiver','長天線、矩形機身與調諧旋鈕',radioReceiver],
 ['tv','電視','tv','hugeicons/tv-01','寬螢幕與頂端雙天線',tv],
 ['projector','投影機','projector','hugeicons/projector-01','低矮機身、凸起鏡頭與投射光線',projector],
 ['speaker','喇叭','speaker','phosphor/speaker-hifi','直立音箱、高音單體與圓形低音單體',speaker],
 ['film-reel','底片捲盤','phosphor/film-reel','hugeicons/film-roll-02','有四孔的圓形捲盤與向外延伸底片',filmReel],
 ['cassette','卡帶','cassette-tape','phosphor/cassette-tape','雙捲軸、磁帶與梯形下緣',cassette],
 ['film','底片','film','phosphor/film-strip','兩側齒孔與分格影像',film],
 ['clapperboard','場記板','clapperboard','phosphor/film-slate','上掀的斜紋拍板與下方紀錄板',clapperboard],
 ['podcast','播客','iconoir/podcast','hugeicons/podcast','麥克風、支架與向外傳播的圓弧',podcast],
 ['antenna','天線','antenna','antenna','橫向支桿、漸長的振子與垂直底桿',antenna],
], 'media-equipment','媒體設備');
