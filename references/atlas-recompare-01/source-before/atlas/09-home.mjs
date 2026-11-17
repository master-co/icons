import {author} from './helpers.mjs';
import {bed,sofa,armchair,lamp,desk,doorClosed,doorOpen,fence,bathtub,showerHead} from './home-shapes.mjs';
export const batch=author([
 ['bed','床鋪','bed','bed','床頭立柱、枕部、床墊與雙腳',bed],
 ['sofa','沙發','sofa','sofa','寬靠背、雙扶手與連續座面',sofa],
 ['armchair','扶手椅','armchair','phosphor/armchair','單座靠背、雙扶手與短腳',armchair],
 ['lamp','檯燈','lamp','phosphor/lamp','梯形燈罩、直立燈桿與底座',lamp],
 ['desk','書桌','phosphor/desk','desk','寬桌面、兩格抽屜與直腳',desk],
 ['door-open','開門','door-open','phosphor/door-open','斜向門板、外門框與把手',doorOpen],
 ['door-closed','關門','door-closed','door','直立門框、把手與門檻',doorClosed],
 ['fence','柵欄','fence','fence','兩片尖頂直柵與橫向連接板',fence],
 ['bathtub','浴缸','bath','phosphor/bathtub','圓腹浴缸、上升水龍頭與雙腳',bathtub],
 ['shower-head','蓮蓬頭','shower-head','phosphor/shower','斜向弧罩、連接管與分散水滴',showerHead],
], 'home','居家用品');
