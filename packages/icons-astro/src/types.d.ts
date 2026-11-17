import type { HTMLAttributes } from 'astro/types';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import type { IconOptions } from '@master/icons/runtime';
export interface IconProps extends Omit<HTMLAttributes<'svg'>, 'color' | 'direction' | 'set:html' | 'set:text'>, IconOptions {}
export type StaticIconProps = Omit<IconProps, 'corner' | 'opticalSize'>;
export type IconComponent = (props: IconProps) => ReturnType<AstroComponentFactory>;
export type StaticIconComponent = (props: StaticIconProps) => ReturnType<AstroComponentFactory>;
