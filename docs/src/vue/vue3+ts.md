## vue3中使用TS
开启TS`<script setup lang="ts">`
### 类型引入
当引入一个外部声明的类型，比如`interface`，直接引入会报错, `import`后需要添加`type`关键字
```sh
'Job' is a type and must be imported using a type-only import when 'verbatimModuleSyntax' is enabled
```
正确使用
```js
import type { Job } from 'xx'
import type { PropType } from 'vue';
```

### props类型
普通声明是的type是运行时检测的，是普通JS的类型，而不是TS的类型
```js
defineProps({
  name: {
    required: true,
    type: String
  },
  list: {
    required: true,
    type: Array
  }
})
```
当props只是普通声明时，模版中`v-for`遍历一个数组，并使用数组对象数据，会提示`'job' is of type 'unknown'`
![v-for prop提示](/assets/props-vfor-ts-error.png)

声明方式：
1. `PropType + as断言`
2. 泛型声明`defineProps<>()`
3. 泛型声明 + `withDefaults`: `withDefaults(defineProps<CustomType>, { msg: 'hello' })`

#### 使用`PropType + as断言`声明props类型
```js
import type { PropType } from 'vue';
import type { Job } from '../types/Job'
// PropType是可以在props上用断言的方式
defineProps({
  jobs: {
    required: true,
    // 运行时，指定的是js类型，而不是TS的类型
    type: Array as PropType<Job[]>
  }
})
```
#### 直接在defineProps后面接泛型使用
使用泛型声明时，括号中不可以传入初始值，声明和初始化不可以同时进行❌
```js
defineProps<{
  name: string,
  msg: string
}>()
```
#### 泛型 + `withDefaults`
使用泛型声明，使用`withDefaults`初始化值

`withdefaults`和`defineProps`一样，不需要导入，默认支持
```js
withDefaults(defineProps<{ msg: string }>, { msg: 'hello' })
```

### as断言
对象属性中需要使用断言`as`, `ref和reactive`包裹后的值不能使用as断言
```js
const name: string | number = ''
const age = 10 as string | number
const user = {
  name: 'John' as string | number
}
```

### ref
1. 声明变量时使用`Ref<>`泛型
2. 调用`ref<>`时使用泛型
`ref和reactive`使用范型`<>`, 对象属性可使用断言，或者直接范型里使用接口等高级类型
```js
import type { Ref } from 'vue'
const name0: Ref<string | number> = ''
const name = ref<string | number>('')
const age = reactive<number | string>({
  age: 20,
  name: 'John' as string | number
})
```
### reactive
声明时使用接口等高级类型，不建议使用泛型
```js
interface user {
  name: string
}
const u1: user = reactive({ name: 'John' })
```

### computed
使用泛型显示指定类型`computed<number>()`

### 事件函数
1. 事件函数建议显示指定类型
2. 访问事件函数参数时也需要指定类型
```js
const handleClick = (e: Event): void => {
  const target = event.target as HTMLInputElement
  console.log(target.value)
}
```
### 模版ref引用
通过`ref泛型和初始值null`设置
```js
const tableEl = ref<HTMLInputElement | null>(null)
```

### 组件ref引用
1. 使用`ref泛型` + `InstanceType<typeof 组件>`
2. 使用`ref泛型` + `ComponentPublicInstance`
```js
import { ref } from 'vue'
// 方案1
import MyModal from './MyModal.vue'
const modal = ref<InstanceType<typeof MyModal> | null>(null)
// 方案2
import type { ComponentPublicInstance } from 'vue'
const child = ref<ComponentPublicInstance | null>(null)
</script>
```

### defineEmits声明类型
使用泛型，同样不需要显示导入
```js
// 方案1
defineEmits<{
  (e: 'change', id: number): void,
  (e: 'update', value: string): void
}>()
// 方案2
defineEmits<{
  change: [id: number],
  update: [value: string]
}>()
```