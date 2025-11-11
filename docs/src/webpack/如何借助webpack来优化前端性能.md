## 如何借助 Webpack 优化前端性能

> 目标：打包体积更小、加载更快、构建更高效。面试时可从“减少代码量 + 提升加载速度 + 改善构建效率”三方面阐述。

### 1. 减少最终包体积
- **Tree Shaking**：使用 ES Modules 并在 `mode: 'production'` 下默认开启，移除未引用代码。
- **代码分割**：`optimization.splitChunks` + 动态 `import()` 按需加载，拆分公共代码和异步模块，减少首屏体积。
- **按需引入 / Externals**：通过 `externals` 将常用库（如 React、Vue）改为 CDN 引入，减少 bundle 体积。
- **资源压缩**：
  - JS：`TerserWebpackPlugin`（默认生产模式开启）。
  - CSS：`CssMinimizerPlugin`（Webpack5 推荐，基于 PostCSS）。
  - HTML：`HtmlWebpackPlugin` 中配置 `minify`。
  - 图片：`image-webpack-loader` 等针对图片进行压缩。

### 2. 提升加载性能
- **缓存利用**：输出文件名使用 `[contenthash]`，并配合 `Cache-Control`，实现长期缓存。
- **Preload/Prefetch**：借助 `HtmlWebpackPlugin` 或 `webpack` 动态注入 `<link rel="preload">`/`<link rel="prefetch">`，预加载关键资源。
- **HTTP/2 友好拆分**：合理拆分 chunk，避免巨型 bundle，充分利用并行加载。
- **使用 CDN**：静态资源托管到 CDN，结合 `publicPath` 配置加速全局访问。

### 3. 优化 Loader / 构建过程
- **缩小解析范围**：合理配置 `resolve.alias`、`resolve.extensions` 和 `resolve.modules`，避免无意义查找；对 `loader` 设置 `include/exclude`。
- **缓存与多进程**：
  - `cache: { type: 'filesystem' }` 缓存编译结果，加速二次构建。
  - `thread-loader`/`babel-loader` 的 `cacheDirectory` 提升 Babel 转译效率。
- **Source Map 策略**：开发用 `cheap-module-source-map`，生产谨慎开启（`hidden-source-map`/`nosources-source-map`）兼顾调试与安全。

### 面试回答建议
1. 先分模块描述：**体积优化**、**加载性能**、**构建效率**。
2. 每一点举 1~2 个实践手段（Tree Shaking、SplitChunks、资源压缩、CDN、缓存、缓存配置）。
3. 补充实际经验，例如“我们通过 externals + CDN 减少首屏包体积”或“利用 filesystem cache 将构建从 30s 降到 5s”。

掌握这些手段即可从“工具配置”角度系统回答 Webpack 性能优化问题。