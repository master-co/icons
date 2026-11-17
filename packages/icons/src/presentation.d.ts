import type { IconOptions, ResolvedIcon, IconDefinition } from './runtime.js';
import type { IconNode } from './runtime.js';
export function scopeNodes(nodes: readonly IconNode[], scope: string): readonly IconNode[];
export function iconPresentation(
  master: ResolvedIcon,
  directionPolicy: IconDefinition['direction'],
  options?: IconOptions & Record<string, unknown>,
): { attributes: Record<string, any>; transform: string | undefined };
