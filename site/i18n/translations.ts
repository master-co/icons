import shared from '@master/internal-site/common/translations.js'
import en from './en.json' with {type:'json'}
import tw from './tw.json' with {type:'json'}
export default {en:{...shared.en,...en},tw:{...shared.tw,...tw}} as Record<string,Record<string,string>>
