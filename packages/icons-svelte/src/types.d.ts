import type { Component } from 'svelte';
import type { SVGAttributes } from 'svelte/elements';
import type { IconOptions } from '@master/icons/runtime';
export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'children' | 'color' | 'direction' | 'strokeWidth'>, IconOptions {
  ref?: SVGSVGElement;
}
export type StaticIconProps = Omit<IconProps, 'corner' | 'opticalSize'>;
export type IconComponent = Component<IconProps, {}, 'ref'>;
export type StaticIconComponent = Component<StaticIconProps, {}, 'ref'>;
