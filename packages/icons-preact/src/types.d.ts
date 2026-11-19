import type { SVGAttributes, FunctionComponent } from 'preact';
import type { IconOptions } from '@master/icons/runtime';
export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'children' | 'color' | 'direction' | 'strokeWidth' | 'size' | 'dangerouslySetInnerHTML'>, IconOptions {}
export type StaticIconProps = Omit<IconProps, 'corner' | 'opticalSize'>;
export type IconComponent = FunctionComponent<IconProps>;
export type StaticIconComponent = FunctionComponent<StaticIconProps>;
export type NativeIconProps = Omit<StaticIconProps, 'strokeWidth' | 'stroke-width'>;
export type NativeIconComponent = FunctionComponent<NativeIconProps>;
