## 你有写过自定义指令吗？自定义指令的应用场景有哪些?
### 定义
以`v-`开头的行内属性都是指令，不同的指令可以实现不同的功能，可以实现功能复用，一般适用于涉及到需要修改底层DOM时使用

### 使用
- v-directname 直接使用，不传递值、参数、修饰符等
- v-direct:arg 以冒号形式传递参数
- v-direc.modify 以点运算符形式添加修饰符，支持多个
- v-direct="" 给指令赋值

#### 指令注册
1. 全局注册
   
vue2: Vue.directive
```js
Vue.directive('name', { inserted () {}})
Vue.directive('name',() => {})
```

vue3: app.directive
```js
const app = createApp()
app.directive('name', { inserted () {}})
app.directive('name',() => {})
```
2. 局部注册
   
vue2和vue3选项式模式: 在选项directives中声明
```js
directives: {
  focus () {}
  focus: {
    inserted () {}
  }
}
```
vue3 script setup模式时：以v开头的驼峰式变量
```js
const vFocus = {
  mounted: () => {}
}
```
**定义形式**
- 名称不包括v-前缀
- 定义时可以以包括生命周期钩子函数的对象形式，也可以是函数形式，只需要在`inserted`和`update`中执行行为时(vue2)；`mounted`和`updated`(vue3)

### 钩子函数
vue2: `bind inserted update componentUpdate unbind`

vue3: `created beforeMount mounted beforeUpdate updated beforeUnmount unmounted`

`vue2`
- bind: 只调用一次，当指令绑定到元素时，可以进行初始化
- inserted: 元素插入到父节点时调用（只保证插入到父节点中，不一定插入到文档流中）
- update: 组件的`VNode`变化时调用，子组件的`VNode`可能没更新，可以比较前后值忽略不必要的更新
- componentUpdate: 组件和子组件的`VNode`都更新完调用
- unbind: 只调用一次，指令和元素解绑时调用

`vue3`
- created: 组件setup执行后，beforeMount前执行，可以操作属性和方法，模版未被编译并挂载
- beforeMount: 元素插入到DOM前
- mounted: 绑定元素的父组件和他自己的所有子组件挂载完调用
- beforeUpdate: 绑定元素的父组件更新前
- update: 绑定元素的父组件和其所有的子组件更新后调用
- beforeUnmount: 绑定元素的父组件卸载前调用
- unmounted: 绑定元素的父组件卸载后调用

#### 钩子函数参数
`el binding vnode preVnode`
1. el: 绑定到的DOM元素，可以操作, 其他均不可操作，如果要共享信息，可以在元素的dataset(data-开头)中实现
2. binding: 对象，vue2和vue3有区别
   - 相同属性：
     - value: 绑定的值
     - oldValue: 绑定的前一个值，只在`update` `componentUpdated` | `beforeUpdate` `updated`中可用
     - arg: 参数，可以是动态[arg] `v-focus:foo -> arg: foo`
     - modifiers: 修饰符对象 `v-focus.foo.bar -> { foo: true, bar: true }`
   - 不同属性：`vue2: name expression; vue3: instance dir`
     - name: 指令名，不包括v-前缀
     - expression: 字符串形式的指令表达式 `v-focus="name"` -> name
     - instance: 使用指令的实例组件, `Proxy{}`
     - dir: 指定的定义对象，`{beforeMount: f}`
3. vnode: 当前虚拟节点
4. preVnode: 更新前的虚拟节点
参数只有一个，需要在修饰符前面声明，否则会被检测为修饰符
### 组件中使用
作用于组件的根节点，如果存在多个根节点，指令会被忽略并抛出警告

### 常见自定义指令
`v-highlight v-debounce v-throttle v-clickout `

