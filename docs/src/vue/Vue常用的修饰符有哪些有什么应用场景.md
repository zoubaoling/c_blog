## Vue常用的修饰符有哪些有什么应用场景
### 修饰符类型
- 表单修饰符
- 事件修饰符
- 鼠标按键修饰符
- 键盘修饰符
- v-bind修饰符

#### 表单修饰符
- lazy
- number
- trim

1. lazy
默认情况下，v-model会在input事件后更新数据，使用.lazy可以在每次change后更新数据

2. number
将用户的输入自动转换为数字，如果不能通过parseFloat处理，那么返回原始值。type = number时，会自动启用number修饰符

3. trim
会去掉用户输入收尾的空格，中间的空格不会删除

#### 事件修饰符
修饰符可以链式使用
- .stop 阻止事件冒泡，event.stopPropagation
- .prevent 阻止事件默认行为，event.preventDefault，比如：
  - 
- .self 只有当event.target是当前自身元素触发事件，注意顺序
  - .prevent.self 会阻止所有点击
  - .self.prevent 会阻止元素自身的点击
- .once 绑定事件后只触发一次，第二次不会出发
- .capture 使用捕获模式，从这个元素出发，自上而下触发

#### 鼠标按键修饰符
- .left 左键点击
- .right 右键点击
- .middle 中键点击

#### 键盘修饰符
用来修饰键盘事件（onKeyup, onKeydown）的
```javascript
<input @keyup.keycode="doSomething" />
```
keycode有很多种，vue提供了一些通用别名
- 普通键: enter up delete esc tab space
- 系统键： ctrl shift alt meta

#### v-bind修饰符
- .sync
- .prop
- .camel

#### .sync
.sync可以对props进行双向绑定
```js{4}
// Father.vue
<com :propName.sync="bar" />
// Child.vue
emit('update:propName', value)
```
相当于下面的简写
```js{4}
// Father.vue
<com :propName.sync="bar" @update:propName="doBar" />
const doBar = () => {}

// Child.vue
emit('update:propName', value)
```
1. 使用.sync时，子组件事件必须使用update:value的形式，value必须与子组件中props中声明的名称一致
2. 使用.sync的v-bind不能和表达式一起
3. v-bind.sync使用在字面量上是无效的：v-bind="{ age: 18 }"