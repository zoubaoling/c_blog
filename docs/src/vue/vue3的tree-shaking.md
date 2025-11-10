
## Vue 3 的 Tree-shaking 特性是什么？如何举例说明？

### Tree-shaking 是什么
- 本质：在打包阶段“摇掉”未被引用或执行的代码，避免把无用模块打进产物里。
- 前提：使用 ES Module（`import/export`）或静态可分析的模块系统，让构建工具能够在编译时判断依赖关系。

### Vue 3 为什么更支持 Tree-shaking
- 源码改用 ESM，并把全局 API 拆分成独立导出，不再像 Vue 2 那样把所有 API 挂在 `Vue` 原型上。
- 只有你显式导入的 API 才会打包进去，例如：
  ```js
  import { createApp, ref } from 'vue' // 未使用的 API 不会被打进 bundle
  ```
- Composition API（`ref`、`computed` 等）均为按需导出；指令、生命周期钩子等也能按需引入。

### 构建工具如何配合
- Tree-shaking 实际由 bundler 完成，Vue 3 只是提供可 Tree-shake 的模块结构。
- Webpack 4+：在 `mode: 'production'` 时默认开启；确保 `package.json` 中有正确的 `module`/`exports` 字段。
- Rollup、Vite（底层 Rollup）：天然支持 ESM，未使用的导出会在构建时被移除。
- 需要注意副作用的模块要在 `package.json` 声明 `"sideEffects": [...]`，以防构建器错误“摇掉”。

### 示例：
```js
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.mount('#app')
```
- 若未使用 `ref`、`computed` 等 API，最终 bundle 中不会包含它们的实现代码。
- 如果使用插件或第三方库，也应确保它们以 ESM 方式提供导出，才能被 Tree-shake。

### 好处
- 包体积更小（移除未用 API）
- 执行速度更快（减少不必要的初始化逻辑）
- 架构更清晰（模块粒度更细，便于按需加载或懒加载）

### 面试答题提示
1. 先解释 Tree-shaking 概念（编译阶段删除未使用代码）。
2. 强调 Vue 3 源码模块化 + ESM 让按需引入成为可能。
3. 补充构建工具如何配合（Webpack、Rollup、Vite）。
4. 可举例说明 Vue 2 与 Vue 3 的差异（Vue 2 全部挂在全局对象，难以 Tree-shake）。
5. 如果有项目经历，提及实际包体积优化案例更加分。