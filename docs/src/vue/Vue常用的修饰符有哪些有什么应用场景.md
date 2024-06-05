## Vue常用的修饰符有哪些有什么应用场景
### 修饰符类型
- 表单修饰符: `lazy number trim`
- 事件修饰符: `stop prevent self once capture`
- 鼠标按键修饰符: `left right middle`
- 键盘修饰符: `enter up delete esc tab space ctrl shift alt meta`
- v-bind修饰符: `sync prop camel`

`sync camel` vue3已经废弃

#### 表单修饰符
1. `lazy`
默认情况下，v-model会在input事件后更新数据，使用.lazy可以在每次change(修改且失焦)后更新数据

2. `number`
将用户的输入自动转换为数字，如果不能通过parseFloat处理，那么返回原始值。type = number时，会自动启用number修饰符

3. `trim`
会去掉用户输入首尾的空格，中间的空格不会删除

#### 事件修饰符
修饰符可以链式使用
1. `.stop` 阻止事件冒泡，event.stopPropagation
2. `.prevent` 阻止事件默认行为，event.preventDefault，比如：点击事件、表单提交事件、键盘事件等
     - 点击事件：点击a标签、按钮点击事件等，可以阻止链接跳转或按钮的默认提交行为
     - 表单提交事件：当用户提交表单时（type为submit的input或者button），浏览器会执行默认提交行为，刷新页面或发送表单数据到服务器
     - 键盘事件：鼠标右键会显示菜单，可以阻止并自定义右键菜单；如果焦点在表单元素上（input textarea），敲击键盘会自动输入，可以阻止过滤数据输入
  > [!TIP]
  > `preventDefault`只会阻止默认行为，而不会阻止事件传播。事件处理函数中返回false也可以阻止默认行为，但是只对DOM0级模型有效（直接在元素上通过onClick等形式绑定事件处理）
3. `.self` 只有当event.target是当前自身元素触发事件，注意顺序
     - .prevent.self 会阻止所有点击
     - .self.prevent 会阻止元素自身的点击
4. `.once` 绑定事件后只触发一次，第二次不会触发
5. `.capture` 使用捕获模式，自上而下触发

#### 鼠标按键修饰符
1. `.left` 左键点击
2. `.right` 右键点击
3. `.middle` 中键点击

#### 键盘修饰符
用来修饰键盘事件（onKeyup, onKeydown）的
```js
<input @keyup.keycode="doSomething" />
```
keycode有很多种，vue提供了一些通用别名
- 普通键: `enter up delete esc tab space`
- 系统键: `ctrl shift alt meta`

自定义键码: `Vue.config.keyCode = {}`

#### v-bind修饰符
`sync prop camel`

 **.sync** 语法糖，在子组件改变变量时更新父组件的状态(vue2)
```js
// Father.vue
<com :propName.sync="bar" />
// Child.vue
emit('update:propName', value)
```
相当于下面的简写
```js
// Father.vue
<com :propName.sync="bar" @update:propName="doBar" />
const doBar = () => {}

// Child.vue
emit('update:propName', value)
```
1. 使用.sync时，子组件事件必须使用update:value的形式，value必须与子组件中props中声明的名称一致
2. 使用.sync的v-bind不能和表达式一起
3. v-bind.sync使用在字面量上是无效的：v-bind="{ age: 18 }"

**.camel** 绑定的短分割线kebab-case属性名转换为驼峰式camelCase: `:view-box.camel` -> `:viewBox`

**.prop** 声明绑定时的是DOM属性(property: 不固定，是值)而不是HTML特性(attribute: 固定，比如type='text'的type)