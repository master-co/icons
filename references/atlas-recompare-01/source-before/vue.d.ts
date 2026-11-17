import type { FunctionalComponent, SVGAttributes } from 'vue';
import type { IconOptions } from './runtime.js';
export interface IconProps extends Omit<SVGAttributes, 'color' | 'direction' | 'size' | 'innerHTML' | 'textContent'>, IconOptions {}
export type StaticIconProps = Omit<IconProps, 'corner' | 'opticalSize'>;
export type IconComponent = FunctionalComponent<IconProps>;
export type StaticIconComponent = FunctionalComponent<StaticIconProps>;
