 # 开发问题

### `cannot find module '' or its corresponding type declaration`
> 前情：`vue create`创建项目，routes目录下新建模块的路由配置文件，import文件时报错`cannot find module '' or its corresponding type declaration`

1. vue3+vite脚手架默认情况
- src下默认有一个src/vite-env.d.ts文件（无，测试后无影响）
- 内容为,让TS识别Vite的环境变量（import.meta.env等），**但不会解决.vue文件类型的问题**
  ```ts
  /// <reference types="vite/client" />
  ```

2. 解决`.vue`文件类型报错
- 额外创建`env.d.ts`文件，推荐src下，和vite-env.d.ts，不冲突
- 内容, 声明后ts可以识别vue文件
```ts
// src/env.d.ts
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
```

### `'import type' declaration can only be used in Typescript files`
> 前情：`<script setup lang="ts">`中使用`import type { Ref } from 'vue'`,报错

1. `tsconfig.json`配置文件支持对`.vue`文件类型的支持
```json
{
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.vue"]
}
```

### `v-model.lazy` 
> `.lazy`表示输入框失去焦点或者回车时才结束输入，修改绑定字符，即出发change事件, 会导致change时拿到的绑定的值时上一次的值，没更新到最新输入

1. 在@input事件中取`e.target.value`
2. 不用`.lazy`，手动控制@change触发
3. `v-model:value` + `debounce(handleSearch, 300)`防抖控制，不依赖`.lazy`不会延迟

搜索框场景下适合防抖方式

### defineModel('', { type: Array as () => string[] }, default: [])
> defineModel的type属性时构造函数，而不是一个具体的类型，所以不能直接为Array,是运行时类型检查

### v-for和defineModel
错误示范如下
```js
<TaskCard
  v-for="task in tasks"
  :key="task.id"
  v-model:task="task" <--! 报错 -->
/>
```

报错原因：`v-model cannot be used on v-for or v-slot scope variables because they are not writable`
- v-for遍历出来的task是迭代变量，本身只读
- vue不可以在迭代变量上使用v-model, 迭代变量不可以写入
- tasks是响应式数组，task本身也不是ref，无法追踪赋值

解决方案
- 通过索引绑定`v-model:task=tasks[index]`
- 子组件使用`defineModel`

### dayjs引入导入使用问题
> 直接使用`import dayjs from 'dayjs'`和`dayjs()`报错can only be default-imported using the 'esModuleInterop' flag

1. 修改tsconfig.json的配置
```json
{
  "compilerOptions": {
    "esModuleInterop": true, // 启用对ES模块和CommonJS模块之间互操作性支持，生成额外代码处理默认导入和命名空间导入之间的差异。比如允许ES语法导入CommonJS的模块
    "allowSyntheticDefaultImports": true
  }
}
```

2. 使用命名空间导入`import * as dayjs from 'dayjs'`
需要通过`dayjs.default()`调用, dayjs是一个命名空间对象，默认导出背挂载到default属性上

### props和toRefs和withDefaults
1. 使用`const props = defineProps<>({})`获得的props属性在模版中会自动解构，不需要`props.`,但是只读；在script中需要使用`props.xx`来用，比较繁琐
2. 使用`const { name } = toRefs(props)`来解构并保持响应式（直接解构会丢失响应式），简化代码，避免频繁访问props，便于组合式API的使用
3. `const nameRef = toRef(props, 'name')`可以解构指定属性
4. `withDefaults(defineProps<>(), {type: Array, default: []})`中`withDefaults`可以处理默认值，同时进行类型推断

### template ref
> 给template标签设置一个ref名称，在script中声明对应变量，就可以在script中操作DOM元素
```vue
// 1. template中命名ref='name-subname'
<template>
  <a-input ref='task-edit-area' />
</template>
// 2. script中声明并使用, 使用useTemplateRef命名一个模版中同名的ref变量
<script lang="ts" setup>
  import { useTemplateRef } from 'vue'
  const editAreaRef = useTemplateRef('task-edit-area')
  editAreaRef.value.focus()
</script>
```

### defineModel
> 前提：使用v-model+defineModel实现组件的数据绑定

**无论父组件传如的是`reactive`还是普通对象，都会被`defineModel`包装成`Ref`, 子组件就可以通过`.value`来修改**

### toRaw
> `toRaw`获取一个reactive或者readonly对象或者ref.value是对象/数组的原始非响应式对象，没有proxy包裹，用于存储非响应式快照，比如保存表单数据

### 场景：使用一个公共组件展示，但是每次新建都是独立的数据编辑，不要固定同一个reactive对象，每次新建都生成新的reactive对象
```ts
let newTask // 使用let声明，后续新建生成新的reactive对象，可以重新赋值
newTask = reactive({})
const createNewTask = () => {
  // 生成新的reactive对象
  newTask = reactive({...obj, id: 2})
}
// 存储数据时使用toRaw处理，获得非响应式快照
```

### watch
1. 监听ref变量
   - 默认会自动解开.value，直接监听就行
   - 回调函数里的(newVal, oldVal)也是解包之后的值，不是ref对象
   - 使用`watch(refVal, (newVal, oldVal) => ())`
2. 监听reactive变量
   - 默认监听对象的引用，不会深度监听内部属性变化，需要加`{deep: true}`
   - deep配置深度监听会递归追踪对象所有属性，有性能损耗
   - 监听某一个属性，使用getter函数：() => state.age, 比deep更搞笑更直观
  
**watch默认lazy，只在依赖变化时触发。第一次不会自动执行，可以设置{ immediate: true }**

### v-if nextTick
> v-if控制的组件：修改状态 > DOM未挂载 > 等待nextTick > 操作 DOM

1. vue3 是异步DOM更新的，修改状态时先修改响应式状态，下一轮微任务才会把模版渲染到真实DOM
2. 状态修改之后，DOM还没渲染，不可操作DOM
3. 使用nextTick，会把回调推到DOM更新之后执行
 