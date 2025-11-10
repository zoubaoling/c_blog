## 请描述你对 Vue 生命周期的理解？created 和 mounted 请求数据的区别？

### 面试速记
- 生命周期 = 组件从创建 → 挂载 → 更新 → 卸载的完整旅程。
- Vue 2 选项式中使用 `beforeCreate` 等钩子；Vue 3 组合式用 `setup` + `onMounted` 等函数。
- `created` 数据已可用但 DOM 未生成；`mounted` DOM 已渲染，适合需要操作页面的逻辑。

### 全量生命周期速览
| 阶段 | 时机 | 常见用途 | Vue 3 Hook |
| --- | --- | --- | --- |
| beforeCreate | 组件实例刚初始化，`data/props` 未就绪 | 少用，插件初始化 | (已合并进 `setup`) |
| created | 实例创建完成，数据/方法可访问，DOM 尚未挂载 | 发起接口请求、初始化定时器 | `setup()` 本身 |
| beforeMount | 模板编译完成，即将挂载真实 DOM | 查看编译后的虚拟 DOM | `onBeforeMount` |
| mounted | 初次渲染结束，DOM 已可操作 | DOM 查询、第三方库初始化 | `onMounted` |
| beforeUpdate | 响应式数据即将更新 DOM | 记录更新前状态 | `onBeforeUpdate` |
| updated | DOM 更新完毕 | 依赖最新 DOM 的操作（避免频繁） | `onUpdated` |
| beforeDestroy/destroyed | 即将销毁 / 已销毁组件 | 清理定时器、事件监听 | `onBeforeUnmount` / `onUnmounted` |

> Vue 3 将 `destroy` 重命名为 `unmount`，并强调在 `setup` 中集中编写逻辑。

### keep-alive 相关钩子
- `activated` / `onActivated`：被 `<keep-alive>` 缓存的组件重新激活。
- `deactivated` / `onDeactivated`：被缓存的组件被切换到背景时调用。
- 适合保存表单、Tab 页等状态，避免重复创建。

### 其它常见场景钩子
- `errorCaptured` / `onErrorCaptured`：捕获子组件抛出的错误，Vue 3 推荐使用。
- `onRenderTracked` / `onRenderTriggered`：开发模式下调试响应式依赖（定位性能问题）。
- 路由守卫（`beforeRouteEnter` 等）和自定义指令（`beforeMount`、`updated`、`unmounted`）也与生命周期紧密相关。

### 父子组件生命周期顺序
1. 父：`beforeCreate → created → beforeMount`
2. 子：`beforeCreate → created → beforeMount → mounted`
3. 父：`mounted`
4. 更新/销毁阶段同理，父钩子会包裹住子钩子。

### created vs mounted 请求数据的选择
- **created**：数据已就绪但 DOM 未挂载；适合与视图无关的接口请求，能减少首屏闪烁。
- **mounted**：DOM 已渲染，可以获取元素尺寸、调用第三方库。适合接口结果需要同步操作 DOM（如图表渲染、滚动定位）。
- 实践建议：优先在 `created/setup` 中拉数据，如果要在接口完成后操作 DOM，再放到 `mounted` 或接口回调中处理。

### 注意事项
- 生命周期钩子里的 `this` 指向组件实例；不要使用箭头函数（组合式 API 除外）。
- `setup` 是组合式 API 唯一合法注册生命周期钩子的地方；如果封装在函数中，需要确保在 `setup` 调用。
- 使用 `<script setup>` 时，直接调用 `onMounted(() => {})` 即可注册钩子，无需显式导入组件实例。