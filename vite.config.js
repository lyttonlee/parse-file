import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2015',
    lib: {
      entry: './src/main.ts',
      name: 'ofd',
      fileName: (format) => `ofd.${format}.js`,
    },
    // rollupOptions: {},
  },
  server: {
    port: 9350,
  },
});
