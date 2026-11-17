import type { IconOptions, ResolvedIcon, IconDefinition } from './runtime.js';
export function iconPresentation(
  master: ResolvedIcon,
  directionPolicy: IconDefinition['direction'],
  options?: IconOptions & Record<string, unknown>,
): { attributes: Record<string, any>; transform: string | undefined };
