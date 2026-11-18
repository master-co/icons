/// <reference types="astro/client" />
/// <reference types="@master/internal-site/env" />

declare module 'virtual:home-showcase' {
 const data:import('../components/home/showcase').Showcase
 export default data
}
