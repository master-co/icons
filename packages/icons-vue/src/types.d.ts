import type { FunctionalComponent, SVGAttributes } from 'vue';
import type { IconOptions } from '@master/icons/runtime';
export interface IconProps extends Omit<SVGAttributes, 'color' | 'direction' | 'strokeWidth' | 'size' | 'innerHTML' | 'textContent'>, IconOptions {}
export type StaticIconProps = Omit<IconProps, 'corner' | 'opticalSize'>;
export type IconComponent = FunctionalComponent<IconProps>;
export type StaticIconComponent = FunctionalComponent<StaticIconProps>;
export type NativeIconProps = Omit<StaticIconProps, 'strokeWidth' | 'stroke-width'>;
export type NativeIconComponent = FunctionalComponent<NativeIconProps>;
