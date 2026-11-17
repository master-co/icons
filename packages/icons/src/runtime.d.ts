export type OpticalSize = 16 | 20 | 24;
export type Corner = 'sharp' | 'soft' | 'rounded';
export type IconNode = readonly [string, Readonly<Record<string, string | number>>, (readonly IconNode[])?];
export interface IconMaster { nodes: readonly IconNode[]; strokeWidth: number; strokes?: Readonly<Record<number, IconMaster>>; }
export interface IconDefinition {
  name: string;
  direction: 'mirror' | 'fixed';
  variants: Record<OpticalSize, Record<Corner, IconMaster>>;
}
export interface IconOptions {
  /** Native viewBox units, in 0.25 increments; clamped to the optical master's supported range. */
  strokeWidth?: number;
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
export const strokeWidths: readonly number[];
export const strokeRanges: Readonly<Record<OpticalSize, readonly [number, number]>>;
export function resolveStroke(master: ResolvedIcon, strokeWidth?: number | null): ResolvedIcon;
export function getOpticalSize(size?: number, opticalSize?: OpticalSize | 'auto'): OpticalSize;
export function resolveIcon(definition: IconDefinition, options?: IconOptions): ResolvedIcon;
export function renderSvg(definition: IconDefinition, options?: IconOptions): string;
export function escapeXml(value: unknown): string;
export function serializeNodes(nodes: readonly IconNode[]): string;
export function svgAttributes(master: ResolvedIcon, options?: IconOptions): Record<string, string | number>;
