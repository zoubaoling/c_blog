## Vuex 刷新后数据会丢失吗？如何处理？

### 现象与根因
- 浏览器刷新（F5 / Cmd+R）后，Vue 应用重新实例化，内存中的 Vuex state 被重置为初始值；所有非持久化数据都会丢失。
- Vuex 默认不做持久化，除非手动将数据保存到本地存储或重新请求。

### 常见解决方案
1. **刷新时重新拉取数据**
   - 在入口文件或关键路由的 `beforeEnter` / `onMounted` 中重新调用接口。
   - 适合敏感或易变数据，保证刷新后拿到最新信息。

2. **持久化到浏览器存储**
   - `localStorage` / `sessionStorage` / `IndexedDB` 等。
   - 刷新前写入（如在 Vuex `subscribe` 中监听 mutation），初始化时读出再 `commit` 回 Vuex。
   - 可使用插件：`vuex-persistedstate`、`pinia-plugin-persistedstate`。

3. **混合策略**
   - 对登录态、基础配置使用本地存储保底；对频繁变化的数据刷新后重新请求。

### 示例：使用 `vuex-persistedstate`
```js
// store/index.js
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: 'my-app',
      paths: ['user', 'settings'], // 只持久化部分模块
    }),
  ],
  state: { user: null, settings: {} },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
  },
})
```

### 实战提示
- 别把过大或敏感数据直接放进 localStorage（有跨域和安全风险）。
- 记得处理缓存失效（如 token 过期）和版本更新（可存储版本号，切换时清理）。
- 如果项目已经使用 Pinia，可直接使用其持久化插件，写法更简单。

一句话总结：Vuex state 默认只存在内存，刷新会丢失；解决办法要么在刷新后重新请求，要么结合浏览器存储或持久化插件保存关键状态。