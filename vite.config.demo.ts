import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  root: resolve(__dirname, 'demo'),
  plugins: [vue(), tailwindcss()],
  server: { port: 5177 },
  resolve: {
    alias: {
      'thinking-orbs': resolve(__dirname, 'src/index.ts')
    }
  },
  build: {
    outDir: resolve(__dirname, 'dist-demo'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'demo/index.html'),
        simple: resolve(__dirname, 'demo/simple.html')
      }
    }
  }
});
