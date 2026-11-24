import type { SVGAttributes, FunctionComponent } from 'preact';
import type { IconOptions } from './runtime.js';
export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, 'children' | 'color' | 'direction' | 'size' | 'dangerouslySetInnerHTML'>, IconOptions {}
export type StaticIconProps = Omit<IconProps, 'corner' | 'opticalSize'>;
export type IconComponent = FunctionComponent<IconProps>;
export type StaticIconComponent = FunctionComponent<StaticIconProps>;
