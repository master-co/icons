import { h } from 'vue';
import type { ComponentProps as SvelteProps } from 'svelte';
import { SearchIcon as VueSearch, type IconProps as VueProps } from '@master/icons-vue';
import { SearchIcon as VueFixed, type StaticIconProps as VueFixedProps } from '@master/icons-vue/16/soft';
import { SearchIcon as SvelteSearch } from '@master/icons-svelte';
import { SearchIcon as SvelteFixed } from '@master/icons-svelte/20/sharp';

h(VueSearch, { size: 20, opticalSize: 16, corner: 'rounded', onClick: (event: MouseEvent) => event.preventDefault() });
h(VueFixed, { size: 32 });
const vue: VueProps = { size: 16, strokeWidth:1, class: 'icon' };
const svelte: SvelteProps<typeof SvelteSearch> = { size: 16, strokeWidth:1, corner: 'soft', onclick: event => event.preventDefault() };
// @ts-expect-error fixed Vue master
const invalidVue: VueFixedProps = { corner: 'sharp' };
// @ts-expect-error fixed Svelte master
const invalidSvelte: SvelteProps<typeof SvelteFixed> = { opticalSize: 24 };
// @ts-expect-error numeric sizes only
const invalidSize: SvelteProps<typeof SvelteSearch> = { size: '1em' };
void [vue, svelte, invalidVue, invalidSvelte, invalidSize];
