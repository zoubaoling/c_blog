## 自定义指令怎么写？哪些场景适用？

### 一句话回答
当需要直接操作 DOM 或复用 DOM 级逻辑时，可以封装自定义指令（`v-xxx`）来复用。例如自动聚焦、输入过滤、权限控制等。Vue 3 依然支持指令，但有了组合式 API，常把“数据逻辑”放到 Hook，把“DOM 操作”交给指令。

---

### 典型使用场景
- **聚焦/选择文本**：`v-focus`、`v-select`，表单组件挂载后自动处理输入。
- **权限/展示控制**：根据用户权限隐藏或禁用某些按钮（`v-permission`）。
- **点击外部（click-outside）**：用于关闭弹窗、菜单。
- **防抖/节流**：对按钮点击或输入事件做 DOM 层的节流。
- **拖拽、滚动、Intersection Observer**：原生 API 交互封装。
- **第三方库桥接**：如给图片懒加载、光标定位等。

---

### 注册方式对比
| 注册 | Vue 2 | Vue 3 |
| --- | --- | --- |
| 全局 | `Vue.directive('name', def)` | `const app = createApp(); app.directive('name', def)` |
| 局部（Options API） | `directives: { focus: def }` | 同上 |
| `<script setup>` | — | 直接声明 `const vFocus = { mounted(el) { ... } }` |
| 使用 | `v-name` / `v-name:arg` / `v-name.mod` / `v-name="value"` | 写法相同 |

> 定义时不要带 `v-` 前缀；对象写法可提供多个生命周期钩子，函数写法默认等价于 `mounted + updated`。

---

### 生命周期钩子对照
| Vue 2 | Vue 3 | 触发时机 |
| --- | --- | --- |
| `bind` | `created` | 指令第一次绑定到元素（组件还未挂载） |
| `inserted` | `beforeMount` / `mounted` | 元素插入 DOM 前 / DOM 后，可安全访问元素 |
| `update` | `beforeUpdate` / `updated` | 绑定值更新，`oldValue` 可用；需自行判断是否真正变化 |
| `componentUpdated` | — | Vue 3 合并为 `updated` |
| `unbind` | `beforeUnmount` / `unmounted` | 指令解绑，清理事件或定时器 |

> 大多数 DOM 操作放在 `mounted` / `updated`；销毁逻辑放在 `beforeUnmount` / `unmounted`。

---

### 钩子函数参数
- `el`：真实 DOM 节点，可直接操作。
- `binding`：当前绑定的配置对象
  - `value` / `oldValue`：指令传入的新旧值
  - `arg`：参数（`v-copy:success="..."` → `arg === 'success'`）
  - `modifiers`：修饰符对象（`v-debounce.enter.once` → `{ enter: true, once: true }`）
  - Vue 3 特有 `instance`（组件实例 proxy）、`dir`（指令定义对象）
- `vnode`：当前虚拟节点，调试用。
- `prevNode`：上一次的虚拟节点（仅更新钩子）。

> 若需要在钩子之间共享数据，可用 `el._xxx = ...` 或 `el.dataset.xxx`.

---

### 常见示例
```js
// v-focus：自动聚焦
const vFocus = {
  mounted(el) {
    el.focus()
  },
}

// v-permission：根据权限隐藏元素
const vPermission = {
  mounted(el, { value, instance }) {
    const hasAuth = instance.$store.getters.perms.includes(value)
    if (!hasAuth) el.parentNode?.removeChild(el)
  },
}

// v-debounce：按钮防抖
const vDebounce = {
  created(el, { value, arg = 300 }) {
    let timer
    el.addEventListener('click', (...args) => {
      clearTimeout(timer)
      timer = setTimeout(() => value.apply(null, args), Number(arg) || 300)
    })
  },
  beforeUnmount(el) {
    // 清理事件
  },
}
```
> Vue 3 `<script setup>` 中直接 `const vFocus = ...`，模板里 `v-focus` 即可使用。

---

### 最佳实践 & 注意事项
- **优先考虑组合式函数/组件复用**：只有需要直接操作 DOM 或跨组件复用 DOM 逻辑时才写指令。
- **必须清理副作用**：事件、定时器、MutationObserver 等要在 `beforeUnmount`/`unmounted` 清理。
- **避免逻辑过重**：指令只关心 DOM 操作，业务数据处理放在组件或 store。
- **使用 key 和参数时加判断**：在 `update` 中比较 `binding.value !== binding.oldValue`，防止重复执行。
- **在多根组件上使用**：Vue 3 中指令只作用于根节点；多根组件会被忽略并警告。
- **TypeScript**：可为指令定义类型 `Directive<HTMLElement, ValueType>`。

---

### 面试答题模板
1. **定义**：指令用于封装 DOM 级别的复用逻辑，如焦点、权限、点击外部等。
2. **注册方式**：全局/局部；Vue 3 支持在 `<script setup>` 中直接定义 `const vXxx = ...`。
3. **生命周期**：`mounted/updated/unmounted` 最常用，提及两代命名差异。
4. **钩子参数**：`el`、`binding.value/arg/modifiers`、`instance`（Vue 3）。
5. **实践经验**：举一个常用指令案例，强调清理、可复用性。
6. **Vue 3 差异**：滤掉 `ComponentUpdated`，增加 `instance`、支持多根组件等。

---

### 参考资源
- [官方指令指南（Vue 3）](https://cn.vuejs.org/guide/reusability/custom-directives.html)
- [Vue 2 自定义指令](https://v2.cn.vuejs.org/v2/guide/custom-directive.html)
- 常用库：`@vueuse/gesture`（手势）、`vue3-click-away`（点击外部）等。

