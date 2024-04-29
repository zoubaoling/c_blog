## 通信方式有哪些
- vue2: props emit ref attrs provide/inject vuex $on $listeners EventBus
- vue3 props emit ref(expose) attrs provide/inject vuex

### 通信关系
- 父子通信：props emit ref $on
- 兄弟通信：EentBus $parent
- 祖孙后代通信: provide/inject attrs
- 非关系： vuex 

#### props
vue2选项式写法：props: {}
vue3组合式写法：defineProps({})

#### emit
vue2选项式写法：this.$emit('')
vue3组合式写法：defineEmits(['']) emit('')

#### ref
vue2选项式写法：直接通过ref获取子组件数据
vue3组合式写法：ref + defineExpose抛出指定变量

#### attrs
没有在props中声明的其他属性，通过v-bind的方式传递给子组件，一般结合inheritAttrs使用，默认为true
vue2: v-bind=$attrs
vue3: useAttrs() > v-bind

inheritAttrs配置：
```js{4}
inheritAttrs: true

defineOptions({
  inheritAttrs: true
})
```

#### provide/inject
通过provide将指定数据传递给子孙后代，子孙后代中通过inject接受

#### EventBus
中央消息总线，vue3没有（可以用三方插件mitt.js替代）
```js{4}
const bus = new Vue({})
Vue.prototype.$bus = bus

this.$bus.$on('')
this.$bus.$emit('')
```

#### $parent
适用于兄弟组件间通过$parent用$on $emit来通信
sibling1: $parent.$emit('')
sibling2: $parent.$on('')


#### $listeners
包含了父作用域中（不被.native修饰的）的v-on事件监听器，子组件中通过`v-on="$listeners"`
```js{4}
// Father.vue
<com @input="handleInput" @change="handleChange"/>

// Child.vue
<input @input="$emit('input', $event)" @change="$emit('change', $event)" />
// Child.vue $listeners 替换多个原生事件的绑定，向外透传
<input v-on="$listeners" />
```