## Vue 3 面试速查

> 按主题归纳高频知识点，避免面试时背“长串列表”。记住关键差异、常见坑和 API 使用方式即可。

### 响应式基础
- `ref` 自动解包：作为 `reactive` 对象属性会自动解包；放在 `reactive` 的数组/Map/Set 内不会自动解包，需要 `.value`。
- 模板只自动解包顶层 `ref`；`{ foo: ref('') }` 中的 `foo` 仍需 `.value`。
- `reactive` 解构会丢失响应性；配合 `toRefs/toRef` 保持联动。
- `computed` 返回的是 `ref`，读取 `.value`；默认带缓存。
- `readonly`/`shallowReactive`/`shallowRef` 等偏门 API：知道它们只读、浅层的作用即可。
- `triggerRef` 强制触发 `shallowRef` 更新。
- `toRaw` 取到代理前的原始对象，`isReactive/isReadonly/isProxy` 用来调试， ref变量需要先`.value`才能拿到内部原始值。

### 侦听体系
- `watch` 数据源：`ref`、`reactive`、getter、数据源数组；不能直接写 `reactive.foo`，需用 getter。
- 常用选项：`immediate` 默认 `false`；`deep` 深度；`flush` 控制回调执行时机（默认 `'pre'`，和渲染同一批异步队列，在 DOM 更新前运行；`'post'` 在 DOM 更新后；`'sync'` 立刻执行，跳过调度，可能导致多次触发甚至递归更新，慎用）。
- `watchEffect` 自动收集依赖，立即执行；只在同步执行阶段追踪依赖，异步 `await` 之后的访问不会被追踪。
- `watchEffect` 还有别名：`watchPostEffect`（等价 `flush: 'post'`）、`watchSyncEffect`。
- 侦听器在 `script setup` 顶层创建会自动销毁；返回的 `stop` 可手动停止。`const stop = watch(...); stop()`
- watch 更适合精确监听特定源，watchEffect 用于快速响应整体依赖；多利用选项（immediate/deep/flush）和 onCleanup，可以避免大部分踩坑

### 模板与指令注意点
- 同级使用 `v-if` + `v-for` 时，`v-if` 先执行，无法访问 `v-for` 作用域变量，推荐拆分。
- 内联事件传 `event`：直接写 `$event` 或箭头函数。
- `ref` 模板引用：在 `onMounted` 之后才有值；`v-for` 的 `ref` 是数组，但顺序可能与原数组不同。
- `keep-alive` 缓存动态组件；`Teleport` 把内容渲染到外部 DOM；`Suspense`（实验）用于异步加载兜底。
- `v-bind="$attrs"` 可把未消费的属性透传到指定元素；`useAttrs()` 获取 `$attrs`（非响应式）。
- 多根节点组件要显式分配 `$attrs`，否则会有 warning。
- `v-slot`/作用域插槽：`#slotName="slotProps"`，子组件通过 `v-bind(:)` 暴露数据。
  ```vue
  <!-- Child.vue -->
  <template>
    <slot name="row" :user="user" />
  </template>

  <!-- Parent.vue -->
  <Child v-slot:row="{ user }">
    <p>{{ user.name }} - {{ user.email }}</p>
  </Child>
  ```

### `script setup` & 组件通信
- `defineProps`/`defineEmits` 无需手动导入。
- `withDefaults`、`defineExpose`、`defineOptions`、`defineSlots`、`defineModel` 也属于 `<script setup>` 编译宏，同样只需在顶层调用即可使用。
- 组件通过 `defineExpose` 暴露实例属性给父组件引用。
- 模板中直接用 `$emit`。
- `defineOptions({ inheritAttrs: false })` 禁用自动继承 attribute。
- 传给子组件的 props/事件名称在模板中用 kebab-case。
- import 的组件在 `script setup` 中可直接使用，无需在 `components` 注册；未使用的局部注册可被 tree-shaking。
- 组件命名统一 PascalCase，模板中也建议 PascalCase。
- 全局注册的组件如果未使用不会被 tree-shaking，注意控制范围。

### `v-model` 与 `defineModel`
- `defineModel()` 返回一个可读写的 `ref`，等价于 `modelValue + emit('update:modelValue')`。
  ```vue
  <!-- Child.vue -->
  <script setup>
  const value = defineModel()
  </script>
  <template>
    <input v-model="value" />
  </template>
  
  <!-- Parent.vue -->
  <Child v-model="form.name" />
  ```
- 支持多个模型：`v-model:first-name` 对应 `defineModel('firstName')`。
  ```vue
  const firstName = defineModel('firstName')
  const lastName = defineModel('lastName')
  ```
- 可以接收默认值：`const checked = defineModel({ default: false })`。
- `defineModel` 会自动根据修饰符生成第二个返回值：
  ```vue
  const [value, modifiers] = defineModel({ local: true })
  if (modifiers.capitalize) {
    value.value = value.value.toUpperCase()
  }
  ```
- 仍可手动使用 `defineProps`/`defineEmits` 实现自定义 `v-model`，`defineModel` 只是语法糖，适合快速封装表单组件。

### 组件属性与插槽
- props 为单向数据流，子组件直接修改会警告；需复制或用 `emit` 通知父层。
- `provide/inject`：注入 `ref` 不会自动解包，可保留响应关系，必要时手动 `.value`。
- 条件插槽：可用 `v-if` 判断 `$slots.xxx` 是否存在。
- 插槽作用域仅能访问定义时的数据，需使用作用域插槽传递。

### 动态与异步组件
- `<component :is="Comp">` 支持注册名或组件对象。
- 原生标签上使用组件需加 `vue:` 前缀：`<tr is="vue:row-comp" />`。
- 异步组件：`defineAsyncComponent(() => import('./Comp.vue'))`，可配置 `loading`、`error`、`timeout`、`delay`。

### 组合式 API 习惯
- 组合式函数建议返回多个 `ref`，而非一个 `reactive` 对象，方便解构且保持响应性。
- 纯逻辑复用用组合式函数；复用逻辑+视图时用无渲染组件。
- 自定义指令命名：文件名 `VFocus` → 模板中 `v-focus`，`script setup` 无需额外注册。
- `script setup` 自动根据文件名生成组件名，无需额外 `name`。
- 顶层 `await` 可直接使用，不需 `async`。
- 插件对象需包含 `install(app, options?)` 方法，使用时调用 `app.use(plugin)`，内部可注册组件/指令或挂载全局属性。