import { fileURLToPath } from 'node:url';
export const repoRoot = fileURLToPath(new URL('../../', import.meta.url));
export const packageRoot = fileURLToPath(new URL('../../packages/icons/', import.meta.url));
