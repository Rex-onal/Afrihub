import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      '@afrihub/shared': path.resolve(import.meta.dirname, '../shared/src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
