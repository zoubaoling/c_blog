## Vuex 和 Pinia 的区别（面试速记）

### 核心对比
| 维度 | Vuex | Pinia |
| --- | --- | --- |
| 模型设计 | 基于 Flux，`state` + `getter` + `mutation` + `action` 四段式 | 类组合式 Store，直接读写响应式 state，无需 mutation |
| 写法 | 选项式 API 为主，需注册模块 | `defineStore` 函数式定义，懒加载 store |
| TypeScript 支持 | 需要额外泛型、辅助函数 | 内建类型推导，TS 体验好 |
| DevTools | 支持时间旅行、快照 | 对应插件同样支持，功能更轻量 |
| 学习/维护成本 | 概念多、样板代码多 | API 简洁、与组合式 API 配合自然 |
| Vue 版本 | Vue 2 官方推荐（Vue 3 用 Vuex4） | Vue 3 官方推荐，也兼容 Vue 2（需组合式 API 插件） |

### 什么时候选哪一个？
- **老项目 / 已大量使用 Vuex**：沿用 Vuex，逐步封装辅助函数减轻负担。
- **新项目（Vue 3 + TS）**：首选 Pinia，省去 mutation 样板，自然支持 TS、代码分割。
- **需要严格跟踪状态变更**：Vuex mutation 记录清晰；Pinia 可借助插件或手动封装日志。

### Vuex 最小示例（Vue 2/3 通用）
```js
// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: () => ({ count: 0 }),
  mutations: {
    increment(state) {
      state.count += 1
    },
  },
  actions: {
    asyncIncrement({ commit }) {
      setTimeout(() => commit('increment'), 300)
    },
  },
})
```
```js
// 组件中
import { mapState, mapActions } from 'vuex'
export default {
  computed: { ...mapState(['count']) },
  methods: { ...mapActions(['asyncIncrement']) },
}
```

### Pinia 最小示例（Vue 3 推荐）
```js
// stores/counter.ts
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count += 1
    },
    reset() {
      this.count = 0
    },
  },
})
```
```vue
<!-- Counter.vue（组合式 API 使用示例） -->
<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()
const { count, double } = storeToRefs(counter) // 解构时保持响应式

const add = () => counter.increment()
const reset = () => counter.reset()
</script>

<template>
  <button @click="add">Count: {{ count }}</button>
  <p>Double: {{ double }}</p>
  <button @click="reset">Reset</button>
</template>
```

#### Pinia 的两种定义方式
| 类型 | 写法 | 适用场景 |
| --- | --- | --- |
| Options Store（上例） | `defineStore('id', { state, getters, actions })` | 与 Vuex 思路接近，便于迁移，支持 `this` 访问 state/action |
| Setup Store | `defineStore('id', () => { const count = ref(0); ...; return { count, double, increment } })` | 完全拥抱组合式 API，可引入自定义 hooks、直接使用 `ref/computed` |

```ts
// Setup Store 示例
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  return { count, double, increment }
})
```

> 两种写法底层等价，可根据团队习惯选择；Options Store 迁移成本低，Setup Store 更灵活，天然支持解构与组合式复用。

### 常见面试延伸
- **Pinia 为什么不需要 mutation？** 直接利用 Proxy 追踪 state 变更，action 可同步/异步任意逻辑。
- **如何在 Pinia 中实现模块拆分和持久化？** 使用多个 store，配合插件（如 `pinia-plugin-persistedstate`）。
- **Vuex 是否会淘汰？** 官方仍维护，但新文档默认推荐 Pinia；Vuex 更适合需严格变更记录的场景。
- **从 Vuex 迁移到 Pinia 需要注意什么？** 数据结构可平移，mutation 改为 action；注意命名空间与辅助函数的替换。
