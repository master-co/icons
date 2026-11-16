export type OpticalSize = 16 | 20 | 24;
export type Corner = 'sharp' | 'soft' | 'rounded';
export type IconNode = readonly [string, Readonly<Record<string, string | number>>];
export interface IconMaster { nodes: readonly IconNode[]; strokeWidth: number; }
export interface IconDefinition {
  name: string;
  direction: 'mirror' | 'fixed';
  variants: Record<OpticalSize, Record<Corner, IconMaster>>;
}
export interface IconOptions {
  size?: number;
  opticalSize?: OpticalSize | 'auto';
  corner?: Corner;
  color?: string;
  label?: string;
  direction?: 'ltr' | 'rtl';
}
export interface ResolvedIcon extends IconMaster { size: number; opticalSize: OpticalSize; corner: Corner; }
export const opticalSizes: readonly OpticalSize[];
export const cornerStyles: readonly Corner[];
export function getOpticalSize(size?: number, opticalSize?: OpticalSize | 'auto'): OpticalSize;
export function resolveIcon(definition: IconDefinition, options?: IconOptions): ResolvedIcon;
export function renderSvg(definition: IconDefinition, options?: IconOptions): string;
export function escapeXml(value: unknown): string;
export function serializeNodes(nodes: readonly IconNode[]): string;
export function svgAttributes(master: ResolvedIcon, options?: IconOptions): Record<string, string | number>;
