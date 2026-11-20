import type { SiteApp } from '@master/internal-site/config'
import Logotype from './components/Logotype.svelte'
import IconGitHub from '@master/icons-svelte/20/soft/brand-github-outline'
export default {name:'Master Icons',brandURL:'https://master.co/brand',Logotype,versions:[],sourceBaseURL:'https://github.com/master-co/icons/blob/main/',feedbackURL:'https://github.com/master-co/icons/issues',navs:[{name:'Icons',href:'/icons'},{name:'Guide',href:'/guide/getting-started'},{name:'Download',href:'/guide/download'}],communityNavs:[{name:'GitHub',href:'https://github.com/master-co/icons',Icon:IconGitHub}],header:{searchOnHome:true}} satisfies SiteApp
