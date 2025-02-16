import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/wolf-lp/',
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
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    },
    assetsDir: 'assets',
    sourcemap: true,
    manifest: true
  },
  server: {
    headers: {
      'Content-Type': 'application/javascript',
    },
    cors: true
  },
  preview: {
    host: true,
    strictPort: true,
    cors: true,
    headers: {
      'Content-Type': 'application/javascript',
      'Access-Control-Allow-Origin': '*'
    }
  }
});