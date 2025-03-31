import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      // El punto de entrada de tu componente
      entry: fileURLToPath(new URL('./src/main.js', import.meta.url)),
      // El nombre de tu web component
      name: 'MiWebComponent', 
      // Los formatos de salida, en este caso, solo 'iife' para un web component
      formats: ['iife'],
      // El nombre del archivo generado (opcional)
      fileName: (format) => `mi-web-component.${format}.js`, 
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});