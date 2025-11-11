## Vue 性能优化 & 首屏优化速记

> 面试思路：从“代码层优化 → 加载/打包优化 → 交互体验 → 首屏加速”四个维度回答，并穿插具体手段。

### 一、代码层优化
- **精简响应式数据**：只有会参与渲染/业务逻辑的数据才放入 `data` / `reactive`，其他可用普通变量或 `ref`。
- **组件拆分与缓存**：拆小组件、提升复用性；使用 `<keep-alive>` 缓存路由组件或频繁切换的面板。
- **合理使用 `key`**：确保列表 `key` 唯一且稳定，避免 Diff 误判。
- **计算与侦听**：用 `computed` 缓存复杂计算、搭配 `watch` 防抖/节流处理高频数据。
- **异步组件 + 路由懒加载**：`const Foo = defineAsyncComponent(() => import('./Foo.vue'))`，路由 `component: () => import('./views/Foo.vue')`。

### 二、加载与打包优化
- **代码分割**：结合 Webpack/Vite 动态导入，把非首屏代码拆成懒加载 chunk。
- **第三方库外链化**：通过 CDN + externals 提取体积大、更新频率低的依赖。
- **资源压缩 & 多线程构建**：启用压缩插件（Terser/CssMinimizer）、Image 压缩；使用 `thread-loader` 或 Vite/esbuild 优势。
- **缓存策略**：合理配置 HTTP 缓存、持久化数据缓存（localStorage/IndexedDB），减少重复请求。

### 三、交互体验 & SEO
- **骨架屏 & Loading**：在数据未到达时展示骨架屏，避免白屏。
- **图片懒加载**：`IntersectionObserver` 或现成插件；使用合适的占位方案。
- **SSR / 预渲染**：对 SEO 诉求较强的页面使用 Nuxt/Vue SSR 或 prerender。

### 四、首屏优化专项
1. **路由懒加载/异步组件**：非首屏路由、组件延迟加载。
2. **关键资源优化**：
   - 瘦身首屏 JS/CSS，提取公共 chunk；
   - 关键 CSS 内联，非关键 CSS 使用 `rel="preload"` 或异步加载；
   - 精简 DOM 层级，避免复杂 layout。
3. **资源策略**：
   - 图片懒加载、雪碧图/图标字体减少请求；
   - 静态资源放 CDN，配置 gzip/br 压缩；
   - 使用 `preload/prefetch` 对关键资源预加载。
4. **SSR / 同构**：对于首屏数据量大或 SEO 要求高的页面，引入 SSR，减少客户端渲染等待。

### 面试回答框架建议
1. **总述**：Vue 优化可分为“代码级、打包级、网络级、体验级”。
2. **各举一例**：如 computed 缓存、懒加载、CDN+缓存、骨架屏/SSR。
3. **结合实践**：提及项目中如何设置按需加载、如何使用 keep-alive 或 IntersectionObserver。
4. **考虑首屏**：强调首屏重点在“资源体积、加载顺序、可感知反馈”。

掌握这些优化手段，可系统回答前端性能与首屏体验问题。