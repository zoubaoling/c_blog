import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [vue()],
  test: {
    ...configDefaults,
    environment: 'jsdom',
    globals: true,
    testTransformMode: {
      // web: ['\\.tsx?$'], // 支持 TypeScript 文件
      web: [(new RegExp(/\.tsx?$/)).toString()], // 支持 TypeScript 文件
    },
  },
});
