import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

export default defineConfig([
  ...nextVitals,
  globalIgnores([
    '.next/**',
    'out/**',
    '.open-next/**',
    'studio/.sanity/**',
    'studio/dist/**',
    '.wrangler/**',
    'cloudflare-env.d.ts',
  ]),
]);
