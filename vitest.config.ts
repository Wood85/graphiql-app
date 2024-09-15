import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { coverageConfigDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        ...coverageConfigDefaults.exclude,
        './src/interfaces/**',
        './next.config.mjs',
        '**/libs/**',
        './src/app/*/not-found.tsx',
        './src/app/*/layout.tsx',
        './src/app/*/page.tsx',
      ],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});
