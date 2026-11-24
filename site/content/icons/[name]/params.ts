import {readCatalog} from '../../../components/catalog'

export async function generateStaticParams() {
 const {icons}=await readCatalog()
 return icons.filter(icon=>!icon.aliasOf).map(({name})=>({name}))
}
