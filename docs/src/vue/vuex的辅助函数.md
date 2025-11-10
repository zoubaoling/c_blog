## Vuex 常用辅助函数

> `mapState`、`mapGetters`、`mapMutations`、`mapActions`、`createNamespacedHelpers`

### 1. `mapState`
将 `state` 映射到计算属性，支持数组和对象写法。
```js
computed: {
  ...mapState(['userInfo', 'routeData']),
  ...mapState({ currentUser: (state) => state.userInfo }),
}
```

### 2. `mapGetters`
把 `getters` 映射到 `computed`。
```js
computed: {
  ...mapGetters(['doneTodos', 'todoCount']),
}
```

### 3. `mapMutations`
把 `mutations` 映射到 `methods`，适合同步修改。
```js
methods: {
  ...mapMutations(['setUser']),
  ...mapMutations({ setName: 'setUserName' }),
}
```

### 4. `mapActions`
映射 `actions` 到 `methods`，可处理异步。
```js
methods: {
  ...mapActions(['getUserInfo', 'getList']),
  ...mapActions({ reload: 'getUserInfo' }),
}
```

### 5. 命名空间（`modules + namespaced`）
```js
const store = new Vuex.Store({
  modules: {
    user: {
      namespaced: true,
      state: () => ({ info: null }),
      getters: { isLogin: (state) => !!state.info },
      actions: { fetchInfo: async ({ commit }) => {} },
      mutations: { setInfo: (state, payload) => (state.info = payload) },
    },
  },
})
```

使用带命名空间的辅助函数：
```js
computed: {
  ...mapState('user', ['info']),
  ...mapGetters('user', ['isLogin']),
}
methods: {
  ...mapActions('user', ['fetchInfo']),
}
```

### 6. `createNamespacedHelpers`
```js
const { mapState, mapActions } = createNamespacedHelpers('user')
computed: {
  ...mapState(['info']),
}
methods: {
  ...mapActions(['fetchInfo']),
}
```

### Vue 2 vs Vue 3 使用差异

| 项目 | Vue 2 写法 | Vue 3 写法 |
| --- | --- | --- |
| 安装 | `Vue.use(Vuex)` | `const app = createApp(App); app.use(store)` |
| 组件使用 | 选项式：`computed` + `mapState`、`methods` + `mapActions` | 仍可用选项式；组合式中可 `const store = useStore()` + `computed(() => store.state.xxx)` |
| 脚手架 | Vue CLI 默认集成 Vuex | Vite 模板默认不带，需要手动安装或改用 Pinia |

#### Vue 2 组件示例
```js
import { mapState, mapActions } from 'vuex'
export default {
  computed: { ...mapState(['count']) },
  methods: {
    ...mapActions(['incrementAsync']),
  },
}
```

#### Vue 3 组合式示例
```vue
<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const count = computed(() => store.state.count)
const increment = () => store.commit('increment')
const fetch = () => store.dispatch('incrementAsync')
</script>

<template>
  <button @click="increment">Count: {{ count }}</button>
  <button @click="fetch">Async Increment</button>
</template>
```

### Vuex 各角色速记
- **state**：全局响应式数据源。
- **getters**：基于 state 的派生数据。
- **mutations**：同步修改 state。
- **actions**：异步逻辑或批处理，最终提交 mutation。
- **modules**：拆分业务域，可配命名空间隔离。

面试提示：可以先列核心辅助函数，再补充 Vue 2 / Vue 3 写法差异，并解释各角色职责，最后提一句 Pinia 是 Vue 3 官方推荐的轻量替代。