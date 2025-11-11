## Vite 官网阅读要点（速查）

### 核心理念
- **开发用 ESM，生产用 Rollup**：开发阶段利用浏览器原生 ES Modules + esbuild 预构建，生产阶段交给 Rollup 打包。
- **缓存策略**：源码走协商缓存（方便热更新），依赖走强缓存（hash + 预构建）。
- **按需编译**：只有浏览器请求到的模块才会被即时编译，缩短冷启动时间。

### 关键特性
- **预构建（esbuild）**：将 CommonJS/UMD 转成 ESM，合并体积庞大的依赖（如 lodash）为单文件，降低请求数。
- **导入重写**：把源码里的相对路径、裸模块路径重写为合法的浏览器 URL。
- **内置 TS 支持**：默认只做转译，不做类型检查；建议单独运行 `tsc --noEmit` 或使用 `vite-plugin-checker`。
- **CSS 能力**：
  - 支持 `@import`、CSS Modules（`*.module.css`）、PostCSS 插件。
  - 预处理器（Sass/Less/Stylus）开箱即用，只需安装对应依赖。
  - `?inline` 查询参数可按需导入 CSS 内容而不是注入 `<style>`。
- **资源导入**：`?raw`（以字符串加载）、`?url`（返回资源 URL）、`?worker`（Web Worker 支持）。

### import.meta 扩展
- `import.meta.env`：访问环境变量（仅 `VITE_` 前缀对客户端可见）。
- `import.meta.hot`：模块热更新 API。
- `import.meta.glob()`：批量导入匹配的文件，支持 `eager`、`import` 指定子模块、`query` 设置等。
- 动态导入限制：`import(
)` 只支持一层字面量拼接。

### 目录与资源
- `public/`：纯静态资源目录，构建时复制到输出根路径，访问时使用绝对路径 (`/icon.png`)。
- 静态资源 URL：`new URL('./img.png', import.meta.url).href`，确保生产构建生成正确路径。

### 环境 & 构建
- 默认 `vite` 启动为开发模式，`vite build` 为生产模式，可通过 `--mode` 指定自定义环境。
- `.env` 文件加载优先级：`.env.[mode].local` > `.env.[mode]` > `.env.local` > `.env`。
- 构建配置：`build.rollupOptions`、`external` 等与 Rollup 配置一致。

### 面试提示
1. 描述 Vite 如何利用原生 ESM + 预构建提升开发体验（冷启动、HMR）。
2. 提到生产仍交给 Rollup，说明 Vite 关注点是 Dev Server + 现代构建流水线。
3. 举例 `import.meta.env`、`import.meta.glob` 等提升 DX 的特性。
4. 提醒 TS 类型检查需要独立运行，体现对细节的了解。