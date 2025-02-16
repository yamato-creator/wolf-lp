import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/wolf-lp/' : '/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: ({ name }) => {
          if (name) {
            if (/\.(gif|jpe?g|png|svg)$/.test(name)) {
              return 'images/[name][extname]';
            }
            if (/\.css$/.test(name)) {
              return 'css/[name][extname]';
            }
          }
          return '[name][extname]';
        }
      }
    }
  }
});