import type { SVGProps, ForwardRefExoticComponent, RefAttributes, PropsWithoutRef } from 'react';
import type { IconOptions } from '@master/icons/runtime';
export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children' | 'color' | 'direction' | 'ref'>, IconOptions {}
export type StaticIconProps = Omit<IconProps, 'corner' | 'opticalSize'>;
export type IconComponent = ForwardRefExoticComponent<PropsWithoutRef<IconProps> & RefAttributes<SVGSVGElement>>;
export type StaticIconComponent = ForwardRefExoticComponent<PropsWithoutRef<StaticIconProps> & RefAttributes<SVGSVGElement>>;
