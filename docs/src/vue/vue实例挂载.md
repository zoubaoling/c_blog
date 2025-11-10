## Vue 实例挂载流程

### 一句话概览
- `new Vue(options)` → 初始化内部能力 → 执行 `beforeCreate/created` → `$mount` 把模板转为渲染函数 → 首次 `render → patch` 挂载 DOM → `mounted`。

### 生命周期顺序（创建阶段）
1. **初始化**：注入组件实例的生命周期、事件、渲染函数占位。
2. **beforeCreate**：此时 props/data 尚未可访问。
3. **初始化状态**：注入 `injection → props → methods → data → computed → watch → provide`。
4. **created**：数据/方法已经就绪，但 DOM 未生成。
5. **$mount**：进入编译与挂载阶段。

### `$mount` 编译流程
- 若传入 `render` 函数，直接使用。
- 否则处理 `template`：
  - 模板可来自字符串、选择器（`#app`）、或 `el` 元素的 `outerHTML`。
  - Vue 会警告不允许挂载到 `document.body/html`。
- 模板编译三步（只在运行时编译版本发生）：
  1. **parse**：把 template 解析成 AST，识别标签、属性、文本、插值。
  2. **optimize**：找出静态节点并标记，后续 diff 可跳过。
  3. **generate**：把 AST 转成 `render` 函数字符串，再生成真正的渲染函数。

### 挂载执行（运行时）
1. 调用 `mount.call(vm)`，实际执行 `Vue.prototype.$mount`。
2. `mountComponent(vm, el)`：若无 `render` 返回空 VNode。
3. 触发 `beforeMount` 钩子。
4. 定义 `updateComponent = () => vm._update(vm._render())`：
   - `_render()`：执行渲染函数，生成最新 VNode。
   - `_update()`：调用平台 `patch`，把 VNode 同步到真实 DOM。
5. 创建渲染 watcher：`new Watcher(vm, updateComponent, ...)`。
   - 首次执行触发 `_render → _update`，生成 DOM，触发 `mounted`。
   - 后续依赖变更时 watcher 重新运行，进入 `beforeUpdate → updated`。

### 面试速记要点
- 记住钩子触发顺序：`beforeCreate → created → beforeMount → mounted`（以及数据更新时的 `beforeUpdate/updated`）。
- 模板编译是 `template → AST → render`，挂载是 `VNode → patch → DOM`。
- 渲染 watcher 负责把响应式数据变化转换成视图更新。
- 运行时版本需编译模板，构建版本可提前将模板编译成 render 函数以提升性能。