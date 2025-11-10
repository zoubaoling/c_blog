## Vue 双向绑定是怎么实现的？

### 核心概念速记
- 双向绑定 = **响应式系统（Observer） + 模板编译（Compiler）**。
- 观察数据变化 → 收集使用该数据的视图依赖 → 数据变更时通知视图刷新。
- Vue 2 使用 `Object.defineProperty`；Vue 3 则用 Proxy 实现响应式。

### 响应式对象如何生成（Observer）
1. **初始化阶段**：`new Vue()` 时深度遍历 `data`，通过 `Object.defineProperty` 给每个属性注入 `getter/setter`。
2. 每个属性关联一个依赖收集器 `Dep`，保存所有依赖此属性的 `Watcher`。
3. `Dep.target` 始终指向当前正在计算的 `Watcher`（全局栈维护）。

### 依赖收集流程（以渲染为例）
1. 组件 `mount` 时会 `new Watcher(vm, updateComponent)`。
2. `Watcher.get()` → `pushTarget(this)` → 执行 `updateComponent()`（等价于 `render + patch`）。
3. 渲染过程中访问响应式数据触发 `getter`：
   - `getter` 内部执行 `dep.depend()`。
   - `dep.depend()` → `Dep.target.addDep(dep)` → `dep.addSub(watcher)`。
4. `popTarget()` 还原栈顶，完成依赖收集。

### 派发更新流程
1. 数据修改触发 `setter` → 调用 `dep.notify()`。
2. `notify` 遍历 `subs`（依赖该属性的 watchers），调用 `watcher.update()`。
3. `watcher.update()` 将自身推入异步队列 `queueWatcher`，利用 `nextTick` 批量刷新。
4. `flushSchedulerQueue()` 按规则执行 `watcher.run()`（父级优先、用户 watcher 优先）。
5. `run()` 内部再次 `getter()`，对比新旧值：
   - 渲染 watcher → 重新执行 `updateComponent`，更新视图。
   - 用户 watcher（`watch`/`computed`）→ 根据配置执行回调或更新缓存。
6. 刷新结束后重置状态，等待下一次变更。

### 补充要点
- 队列去重保证同一属性多个修改只触发一次视图更新。
- 深度监听（`deep: true`）通过递归收集子属性的依赖。
- 计算属性本质是带缓存的特殊 watcher（`lazy` + `dirty` 标记）。

### Vue 3 的实现思路
1. **Proxy 劫持整对象**：`reactive` 返回 `Proxy`，统一拦截 `get/set/delete`，新增属性、数组索引天然响应。
2. **依赖容器**：`targetMap = WeakMap<object, Map<key, Set<effect>>>`，结构化管理依赖，自动随垃圾回收释放。
3. **track**：访问响应式属性时调用 `track(target, key)`，把当前活跃的 `effect` 收集进依赖集合。
4. **trigger**：写入时执行 `trigger(target, key, type)`，根据操作类型（ADD/SET/DELETE）找到对应的依赖并调度。
5. **effect + scheduler**：`effect` 类似 watcher，默认同步执行；可传入 `scheduler` 实现去重、批量更新（`flushPreFlushCbs` 等），`computed`/`watch` 都基于它封装。
6. **模板更新**：依然是 `render → diff → patch`，只是渲染函数由编译器生成的 `effect` 自动追踪依赖。

> 面试提示：Vue 3 去掉了 `Dep/Watcher` 这些类名，但核心链路仍是“依赖收集 + 触发更新”，重点在于 `Proxy` 能覆盖更多场景、数据结构更灵活。

### 常见面试追问
1. **为什么 Vue 2 不能监听数组索引和对象新增属性？** 初始化时只劫持已有属性，数组通过重写变更方法解决（`push/splice` 等）。
2. **Vue 3 做了哪些改进？** 使用 Proxy 拦截整个对象，新增/删除属性、数组索引都可响应；依赖跟踪由 `effect`/`track`/`trigger` 实现。
3. **`nextTick` 为什么能批量更新？** watcher 更新放入微任务队列，事件循环中合并执行，避免重复渲染。
4. **和 `Object.observe`、手写发布订阅有何区别？** Vue 自建依赖收集与调度体系，粒度更细、性能更好且可做优化（去重、优先级）。

### Vue 2 vs Vue 3 响应式简表
| 对比点 | Vue 2 | Vue 3 |
| --- | --- | --- |
| 核心 API | `Object.defineProperty` + `Dep/Watcher` | `Proxy` + `effect/track/trigger` |
| 初始化策略 | 递归遍历已有属性 | 懒包裹：访问子对象时再代理 |
| 新增/删除属性 | 需要 `Vue.set` / `Vue.delete` | 自动响应，无需额外 API |
| 数组索引拦截 | 重写变更方法 | 直接通过 `set` 拦截 |
| 依赖容器 | `Dep`（每个属性一个） | `WeakMap(Map(Set))`，结构更灵活 |
| watcher | 渲染/计算/用户 Watcher | `effect` + scheduler，可自定义调度 |
| computed 实现 | `Watcher` with lazy + dirty | `computed` 基于 `effect` 的惰性求值 |
| 内存清理 | 手动维护 `deps` | 自动利用 GC，弱引用管理 |

面试时先描述“响应式原理 + 依赖收集 + 派发更新”，再补充差异点（Vue 2 vs Vue 3，数组/对象坑、nextTick），即可覆盖大部分追问。
  
