import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/wolf-lp/' : '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    modulePreload: {
      polyfill: false
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: `js/[name].js`,
        chunkFileNames: `js/[name].[hash].js`,
        assetFileNames: ({name}) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'images/[name][extname]';
          }
          if (/\.css$/.test(name ?? '')) {
            return 'css/[name][extname]';
          }
          return '[name][extname]';
        }
      }
    }
  }
});