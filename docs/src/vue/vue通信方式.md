## Vue 组件通信方式梳理（面试速记）

- 先判断组件关系：父 ↔ 子、兄弟、祖孙/跨层级、全局状态、特殊/历史 API。
- 回答结构：**方式 → 适用场景 → Vue 2 / Vue 3 写法差异 → 优缺点或注意点**。
- Vue 3 推荐组合式 API（`defineProps`、`defineEmits`、`defineExpose`、`useAttrs`）与 Pinia；Vue 2 有实例事件与 `$listeners` 等遗留方案。

### 1. 父 ↔ 子通信

**`props` + `emit`**

```vue
// Vue 2
<com-child :user="user" @close="visible = false" />
export default { props: { user: Object }, methods: { close() { this.$emit('close') } } }
```
```vue
// Vue 3
const props = defineProps<{ user: User }>()
const emit = defineEmits(['close'])
emit('close')
```

**`v-model` 语法糖**

```vue
// Vue 2
<BaseInput v-model="value" />
props: ['value']
this.$emit('input', nextValue)
```
```vue
// Vue 3（多模型）
<BaseInput v-model="value" v-model:title="title" />
const props = defineProps(['modelValue', 'title'])
const emit = defineEmits(['update:modelValue', 'update:title'])
emit('update:modelValue', nextValue)
```

**`ref` 获取子组件实例**

```vue
// Vue 2
<Modal ref="modal" />
this.$refs.modal.open()
```
```vue
// Vue 3（子组件暴露）
// Modal.vue
const open = () => {}
defineExpose({ open })
// Parent.vue
const modalRef = ref()
modalRef.value?.open()
```

**作用域插槽**

```vue
// Vue 2
<List :items="items">
  <template slot-scope="{ item }">{{ item.name }}</template>
</List>
```
```vue
// Vue 3
<List :items="items" v-slot="{ item }">{{ item.name }}</List>
```

### 2. 兄弟组件通信

**状态提升到父级（推荐）**

```vue
<ChildA :count="count" @increment="count++" />
<ChildB :count="count" />
```

**事件总线 / `mitt`**

```js
// Vue 2
themeBus.$emit('toggle')
themeBus.$on('toggle', handler)
```
```js
// Vue 3
import mitt from 'mitt'
const bus = mitt()
bus.emit('toggle')
bus.on('toggle', handler)
```

### 3. 祖孙 / 跨层级通信

**`provide` / `inject`**

```js
// Vue 2
provide() { return { theme: this.theme } }
inject: ['theme']
```
```js
// Vue 3（配合响应式）
provide('theme', reactive(theme))
const theme = inject('theme')
```

**`$attrs` / `useAttrs` 透传**

```vue
// Vue 2
export default { inheritAttrs: false }
<input v-bind="$attrs" />
```
```vue
// Vue 3
const attrs = useAttrs()
<input v-bind="attrs" />
defineOptions({ inheritAttrs: false })
```


**上下文透传（`useSlots` / `useAttrs`）**
- Vue 3 利用组合式 API 将中间层包装成 Hook，便于跨层传递回调或配置。

### 4. 全局 / 跨页面通信

**集中式状态管理**

```js
// Vuex
actions: { async login({ commit }, payload) { ... } }
computed(() => store.state.user)
```
```js
// Pinia
const useUserStore = defineStore('user', { state: () => ({ info: null }) })
const userStore = useUserStore()
userStore.info = profile
```

**浏览器存储 / 路由**

```js
localStorage.setItem('token', token)
const id = route.params.id
```

**跨 Tab / 跨应用**

```js
const channel = new BroadcastChannel('demo')
channel.postMessage({ type: 'refresh' })
channel.onmessage = ({ data }) => {}
```

**实时通讯**
- WebSocket、SSE、GraphQL Subscriptions 等适用于前后端之间的状态同步。

### 5. 特殊或历史 API（Vue 2 为主）

- **`$parent/$root/$children`**：直接访问父/根实例，耦合度高，Vue 3 不推荐。
- **`$listeners`**：Vue 2 用于透传事件，Vue 3 改用 `emits` 选项 + `useAttrs()`。
- **实例事件 `$on/$off/$once`**：Vue 2 存在，Vue 3 已移除，改用组合式 API 或第三方事件库。

### 选型建议速背

1. 父子简单数据 → `props` + `emit` / `v-model`。
2. 需要调用子组件方法 → `ref` + `defineExpose`。
3. 多层级/主题配置 → `provide/inject` + 响应式对象。
4. 多组件共享复杂状态 → Pinia / Vuex。
5. 临时广播 → 父级中转或 `mitt`。