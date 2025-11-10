## Vue.observable你有了解过吗？说说看

### 一句话回答
`Vue.observable` 是 Vue 2 提供的一个 API，用来把普通对象转换成响应式对象，通常用于轻量的跨组件状态共享。

### 做了什么 & 为什么需要它
- 基于 Vue 2 内部的响应式系统（`defineReactive` + 依赖收集）直接对传入对象打补丁，让它具备 `getter/setter` 的依赖追踪能力。
- 在没有引入 Vuex、Pinia 这类状态管理库时，提供一个最小可用的“全局”状态存储容器。
- Vue 3 中官方改用 `reactive`，同时不再推荐 `Vue.observable`，但理解它能帮助回答面试对响应式核心原理的追问。

### 使用示例
```js
// store.js
import Vue from 'vue'

export const state = Vue.observable({
  count: 0,
  user: null,
})

export const mutations = {
  increment() {
    state.count += 1
  },
  setUser(data) {
    state.user = data
  },
}
```

```vue
<!-- AnyComponent.vue -->
<template>
  <section>
    <p>count: {{ state.count }}</p>
    <button @click="mutations.increment">+1</button>
  </section>
</template>

<script>
import { state, mutations } from './store'

export default {
  setup() {
    return { state, mutations }
  },
}
</script>
```

### 适用场景与限制
- 适用：简单的跨组件状态同步、快速原型、临时性需求。
- 不适用：复杂业务、需要模块拆分或调试工具支持的场景——应考虑 Vuex/Pinia。
- 限制：没有 mutation 记录、无法和 Vue Devtools 的 time-travel 调试结合、难以做权限和数据流追踪。

### 常见面试延伸问题
- **为什么 Vue 3 用 `reactive` 替代？** 使用 Proxy 可避免直接修改原对象、支持更多数据类型，且与组合式 API 搭配更自然。
- **和 Vuex 有什么区别？** Vuex 提供规范化的 state/mutation/action 流程、模块化、插件生态；`Vue.observable` 只是底层响应式能力的暴露。
- **和 `provide/inject`、事件总线相比？** `observable` 是“状态共享 + 响应式更新”；`provide/inject` 适合祖先-后代依赖注入；事件总线更多用于消息广播，状态要手动维护。

### 原理要点速记
- 对象：遍历属性，使用 `Object.defineProperty` 拦截 `get/set`，依赖收集 + 通知更新。
- 数组：重写变更方法（`push`、`splice` 等），在调用后手动触发依赖更新。
- 依赖管理：使用 `Dep` 依赖栈保存当前激活的 Watcher，在 `get` 时收集，`set` 时通知。

### 回答提纲（面试快速说辞）
1. 定义：Vue 2 暴露的轻量状态共享 API，本质是把对象转成响应式。
2. 场景：小项目或无状态管理库时的跨组件通信。
3. 与 Vuex/Pinia 区别：没有规范化数据流和调试能力，适合简单场景。
4. Vue 3 变化：被 `reactive` 取代，通过 Proxy 实现更强的响应式能力。
5. 原理关键字：`defineReactive`、依赖收集、数组方法劫持。

### 参考资料
- [Vue.observable 官方文档（归档）](https://v2.cn.vuejs.org/v2/api/#Vue-observable)
- [Vue3 响应式原理解析](https://vue3js.cn/interview/vue/observable.html#%E4%B8%89%E3%80%81%E5%8E%9F%E7%90%86%E5%88%86%E6%9E%90)