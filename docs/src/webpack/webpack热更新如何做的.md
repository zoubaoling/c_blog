## Webpack HMR（Hot Module Replacement）原理速记

> 目标：在不刷新整页的情况下，替换、添加或删除模块，使状态和页面尽量保持。

### 核心组成
webpack-dev-server创建两个服务器：静态资源的服务Bundle Server和HMR Server服务
1. **Bundle Server**：`webpack-dev-server` 内部的静态资源服务器，负责输出最新构建的 bundle。
2. **HMR Server（websocket）**：与浏览器建立长连接，推送构建状态（hash、更新列表）。
3. **HMR Runtime**：注入到 bundle 中的运行时代码，负责接收热更新消息、执行模块替换逻辑。

### 启动阶段
1. 启动 `webpack-dev-server`，Webpack 编译源代码以及 HMR runtime，输出到内存中的 bundle。
2. 浏览器首次访问，通过 `<script>` 拉取 bundle，HMR runtime 会与 HMR Server 建立 websocket 连接。

### 更新流程
1. **文件变动**：Webpack 监听到某模块修改，触发重新编译，生成新的模块代码与 manifest（描述更新内容）。
2. **Hash 推送**：HMR Server 通过 websocket 推送新的 `hash` 给浏览器。
3. **拉取 manifest**：浏览器对比 hash，不一致则通过 Ajax/JSONP 拉取 `manifest` 和对应的增量 chunk。
4. **Runtime 应用**：HMR runtime 根据 manifest 查找需要更新的模块，逐层向上查找是否有 `module.hot.accept` 处理函数。
5. **模块替换**：
   - 若找到可处理的模块（如 `module.hot.accept('./module.js', handler)`），则加载新模块并触发回调，局部刷新。
   - 若某模块无法接受更新（未注册 `accept`），会继续向上冒泡；若最终没人处理，退回到整页刷新。

### 示例：在 JS 中启用 HMR
```js
if (import.meta.webpackHot || module.hot) {
  module.hot.accept('./render', () => {
    const nextRender = require('./render').default
    nextRender()
  })
}
```
> 框架（React/Vue）通常已经封装好热替换逻辑，手动配置可留给自定义场景。

### CSS 为什么“开箱即用”
- `style-loader` 内部已实现 `module.hot.accept`，只要 CSS 变动，就会直接替换样式内容而不刷新页面。
- JS 模块若未显式处理，则默认退回整页刷新（`webpack-dev-server` 会自动完成）。

### 面试回答框架
1. **目的**：解释 HMR 让我们在保留状态的情况下更新代码，提升开发效率。
2. **组件**：说明 Bundle Server、HMR Server、HMR Runtime 之间的协作。
3. **流程**：从文件变化 → 编译 → hash 推送 → manifest 拉取 → runtime 替换 模块，串好关键步骤。
4. **细节扩展**：强调 `module.hot.accept` 的作用、CSS 开箱即用原因、找不到处理器会整页刷新。

掌握以上要点即可从“概念 → 流程 → 实践”完整回答 HMR 原理。

### Vite 的热更新流程
1. **文件变动**：Vite 监听到源码更新，针对改动模块做按需编译（无需打包整棵依赖树）。
2. **模块信息推送**：通过 WebSocket 向浏览器发送更新消息，包含受影响模块的 URL。
3. **浏览器处理**：浏览器直接通过原生 ESM 重新请求该模块（或其依赖），无需 manifest。
4. **框架接管**：Vue/React 官方插件会注册 HMR 处理器，保留组件状态并执行增量更新。

### Webpack vs Vite HMR 对比
| 维度 | Webpack HMR | Vite HMR |
| --- | --- | --- |
| 启动方式 | 先整体打包，再由 devServer 提供 bundle | 直接启动 dev server，无需预打包 |
| 更新策略 | 重新编译受影响模块 + 生成 manifest + 请求增量 chunk | 按需编译单个模块，直接发送模块 URL |
| HMR Runtime | `module.hot.accept`；需手动处理未声明的模块 | `import.meta.hot`；Vue/React 插件封装好了组件级热替换 |
| 刷新回退 | 若无模块处理器，最终会整页刷新 | 同样支持整页刷新，但局部更新粒度更细 |
| 性能体验 | 大量依赖时需要重新构建部分依赖，速度较慢 | 利用 ESM 和 esbuild，更新速度更快 |

> 关键信息：Vite 利用原生 ESM 按需拉取模块，因此热更新流程更轻量；Webpack 需要依赖 manifest + runtime 的模块替换机制。
