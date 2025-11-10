## Vuex 的响应式处理如何实现？

### 核心结论
- Vuex 依托 Vue 自身的响应式系统：`state` 被注入到 Vue 实例（或 `reactive` 对象）中，因此数据变化会驱动视图更新。
- 修改 state 必须通过 mutation，保证变更来源可追踪并与 Devtools 打通。
- Vuex 3（配 Vue 2）使用 `Object.defineProperty`；Vuex 4（配 Vue 3）使用 Proxy，无需手动补充新属性。

### 初始化阶段
1. 调用 `Vue.use(Vuex)` 时执行插件 `install`，把 `store` 挂到每个组件实例的 `this.$store` 上。
2. `new Vuex.Store()` 会把 `state` 包装成响应式：
   - Vue 2：利用 `Vue.util.defineReactive(store, 'state', options.state)`。
   - Vue 3：通过 `reactive`/`ref` 创建响应式对象。
3. Modules 的嵌套 state 会递归注册，保持整个状态树响应式。

### 修改流程
1. 组件内 `dispatch('action')` 执行异步/业务逻辑。
2. `action` 中调用 `commit('mutation')`。
3. mutation 同步修改 state：`state.count++`。
4. state 改变 → Vue 的响应式系统触发依赖更新 → 组件重新渲染。
5. Devtools 记录 mutation 日志，支持时间旅行与快照回滚。

### 为什么必须通过 mutation？
- 统一入口；便于在 Devtools 中看到每一次状态变更，方便调试 / 回滚。
- 避免直接修改 state 造成来源不明、无法追踪的问题。
- 严格模式（`strict: true`）下直接修改 state 会抛错。

### Vue 2 与 Vue 3 的差异
| 版本 | 响应式实现 | 新增属性支持 | 使用方式 |
| --- | --- | --- | --- |
| Vuex 3 + Vue 2 | `Object.defineProperty` | 需要 `Vue.set` | `Vue.use(Vuex)` + `new Vue({ store })` |
| Vuex 4 + Vue 3 | Proxy + `reactive` | 自动支持 | `const app = createApp(App); app.use(store)` |

### 面试答题模板
1. Vuex 通过把 state 注入到 Vue 响应式系统中实现自动更新。
2. mutation 是唯一修改入口，配合 Devtools 追踪、调试。
3. Vue 3 之后使用 Proxy，新增属性无需 `Vue.set`。
4. 补充：与 Pinia 比较（轻量、直接操作 state）也是常见延伸题。