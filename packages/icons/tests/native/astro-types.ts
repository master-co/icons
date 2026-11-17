import type { ComponentProps } from 'astro/types';
import { SearchIcon } from '@master/icons-astro';
import { SearchIcon as Fixed } from '@master/icons-astro/24/rounded';
const dynamic: ComponentProps<typeof SearchIcon> = { size: 16, corner: 'soft', class: 'icon' };
const fixed: ComponentProps<typeof Fixed> = { size: 32, label: 'Search' };
// @ts-expect-error fixed corner
const invalidFixed: ComponentProps<typeof Fixed> = { corner: 'sharp' };
// @ts-expect-error numeric sizes only
const invalidSize: ComponentProps<typeof SearchIcon> = { size: '1em' };
void [dynamic, fixed, invalidFixed, invalidSize];
