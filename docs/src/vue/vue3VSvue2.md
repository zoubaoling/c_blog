## Vue 3 和 Vue 2 有哪些核心区别？

| 维度 | Vue 2 | Vue 3 | 面试要点 |
| --- | --- | --- | --- |
| 响应式原理 | `Object.defineProperty`，初始化时需遍历属性，数组/新增属性需 `Vue.set` | `Proxy`，按需代理，天然支持新增/删除属性与数组索引 | Vue 3 避免了 Vue 2 的 `Vue.set`、性能更好 |
| API 风格 | 选项式（`data/methods/computed`）为主 | 组合式 API（`setup`、`ref`、`reactive`）+ 选项式并存 | 组合式更利于逻辑复用、Tree-shaking |
| 生命周期钩子 | `beforeCreate/created/.../destroyed` | `setup` 替代 early 阶段；销毁改为 `unmounted`；增加 `onActivated/onRenderTracked` 等 | 注意新旧名称映射（如 `mounted ↔ onMounted`） |
| 模板特性 | 单根节点；无 Fragment；Filter 可直接使用 | 支持 Fragment（多根）、Teleport、Suspense；过滤器被移除（改用计算属性/方法） | 记住被移除或新增的内置特性 |
| 全局 API | 大量挂在 `Vue.xxx` 上（`Vue.use`、`Vue.mixin`） | 通过 `createApp` 返回实例；全局配置、注册需通过 `app` | Vue 3 支持多应用实例、更易 Tree-shake |
| 指令 & 事件 | 支持 `.native` 修饰；内置 `keyCode`；全局事件总线常用 | `.native` 被移除；推荐 `emits` 声明；内置 keyCode 被移除，改用标准键名；事件总线不再内置需自行实现（如 `mitt`） | 强调 API 清理后的影响 |
| 类型支持 | TS 体验一般，需要外部声明 | 从设计之初支持 TS，组合式 API 类型友好 | Pinia + Vue 3 TS 体验更优 |
| 性能 & 体积 | 静态节点每次 diff；整体打包体积较大 | 编译器静态提升、Patch Flag、事件缓存；模块支持 Tree-shaking；Proxy 响应式 | 提供具体优化点（静态提升 / Patch Flag） |
| 生态 | Vue CLI + Webpack 为主；Vuex 默认状态管理 | Vite 官方推荐；Pinia 成官方状态库；周边库逐步转向 Vue 3 | 注意新生态关键词 |

### 快速回答示例
1. 先概述“响应式、API、性能”三大差异。
2. 补充举例：Vue 3 组合式写法、Teleport/Suspense、Tree-shaking。
3. 指出被移除/替代的 API：`filters`、`$on`、`Vue.set`、`EventBus` 等。
4. 结尾可以提一句生态变化（Vite、Pinia、TS 友好）。

这样回答既结构清晰，又能展开细节。