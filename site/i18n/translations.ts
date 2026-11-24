import {locales} from '@master/internal-site/common/locales.js'
import shared from '@master/internal-site/common/translations.js'
import en from './en.json' with {type:'json'}
import tw from './tw.json' with {type:'json'}
import ja from './ja.json' with {type:'json'}
import ko from './ko.json' with {type:'json'}
import cn from './cn.json' with {type:'json'}

export const product = {en,tw,ja,ko,cn}
export default Object.fromEntries(locales.map(locale=>[locale,{...shared[locale],...product[locale]}])) as Record<string,Record<string,string>>
