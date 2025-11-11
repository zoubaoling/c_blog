## Vite 常见面试题速记

### 1. Vite 为什么启动那么快？
- 基于原生 ES Module（ESM），开发阶段不需要打包，直接让浏览器按需请求模块。
- 依赖预构建：使用 esbuild（Go 编写）把大量第三方依赖提前打包成 ESM，加快解析。
- 按需编译：只在访问到的文件上做编译（如 TS、Vue 单文件组件），避免一次性处理整个项目。

### 2. 和传统 Webpack 构建的区别是什么？
- 开发模式：Webpack 需要先打包再启动；Vite 以原生 ESM 为基础，冷启动更快。
- 生产模式：Vite 内部仍使用 Rollup 打包，Webpack 开发/生产同一套流程。
- 插件体系：Vite 基于 Rollup 插件，兼容性更好，同时支持 Vite 自身 API。

### 3. 依赖预构建是怎么做的？
- 使用 esbuild 把 npm 依赖打成一个个 ESM bundle，解决三方包中的 CommonJS、UMD、不规范导出等问题。
- 预构建结果缓存在 `node_modules/.vite`，下次启动直接读取。
- 可通过 `optimizeDeps.include/exclude` 手动配置。

### 4. Vite 如何处理 TypeScript、Vue、React 等文件？
- 通过插件体系处理：
  - `@vitejs/plugin-vue` 转换 SFC。
  - `@vitejs/plugin-react-swc` 使用 SWC 转译 React JSX。
  - TS：开发阶段直接交给 esbuild 转换；类型检查需借助 `tsc --noEmit` 或 `vue-tsc`。

### 5. 热更新（HMR）是如何实现的？
- 基于浏览器 ESM 和 WebSocket 通信。
- 修改文件后 Vite 重新编译对应模块，并通过 HMR 通道通知浏览器更新模块；Vue/React 插件实现细粒度的状态保留。

### 6. 生产构建为什么选择 Rollup？
- Rollup 在静态分析、Tree-shaking、输出格式（ES/CJS/UMD）方面更成熟。
- 可以共享大量插件生态。
- 打包结果更适合库/应用的最终产物。

### 7. 常见性能优化手段有哪些？
- 配置别名与缓存：`resolve.alias`、`cacheDir`。
- 手动预构建：`optimizeDeps.include`。
- 合理分包：`build.rollupOptions.output.manualChunks`。
- 开启 CSS 代码分割、使用 `@rollup/plugin-visualizer` 分析体积。
- 静态资源处理：`assetsInclude`、`build.assetsInlineLimit`。

### 8. Vite 支持哪些构建目标？
- 默认浏览器目标是 `esnext`；可通过 `build.target` 调低（如 `es2015`）。
- SSR 支持：`vite ssr build/server` + Node/Cloudflare 适配。
- 库模式：`build.lib` 输出多个格式。

### 9. 如何在 Vite 中使用环境变量？
- `.env` 文件 + `VITE_` 前缀变量可通过 `import.meta.env` 访问。
- `mode` 对应加载 `.env.mode` 文件。
- 需要在打包时注入的非 `VITE_` 变量可以使用 `define` 配置。
- 示例：
```env
# .env.development
VITE_API_BASE=https://dev-api.example.com
```
```ts
// src/api/client.ts
const baseURL = import.meta.env.VITE_API_BASE
export const fetchUser = (id: string) => fetch(`${baseURL}/users/${id}`)
```
```ts
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify('1.2.3'),
  },
})
```

### 10. 常见踩坑有哪些？
- 依赖中包含动态 require 或 Node 内置模块 → 需要手动预构建或 polyfill。
- 跨平台路径差异（Windows 大小写）→ 使用 `path.posix`。
- 大型单页应用生产包体过大 → 调整分包策略，配合懒加载。
- 类型检查缺失 → 需额外使用 `tsc --noEmit`、`vue-tsc --noEmit`。

### 附：参考链接
- [Vite 官方文档](https://cn.vitejs.dev/)
- [Awesome Vite](https://github.com/vitejs/awesome-vite)
- [Rollup 插件兼容列表](https://cn.vitejs.dev/plugins/)
