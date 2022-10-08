/*
 * @Author: lyttonlee lzr3278@163.com
 * @Date: 2022-09-30 10:29:16
 * @LastEditors: lyttonlee lzr3278@163.com
 * @LastEditTime: 2022-10-08 11:26:57
 * @FilePath: \ofd-lib\vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2015',
    lib: {
      entry: './src/main.ts',
      name: 'parse-file',
      fileName: (format) => `parse-file.${format}.js`,
    },
    // rollupOptions: {},
  },
  server: {
    port: 9350,
  },
});
