import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    assetsDir: '',  // ルートに直接出力
    rollupOptions: {
      output: {
        entryFileNames: 'index.js'  // 固定のファイル名
      }
    }
  }
});