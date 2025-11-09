## JavaScript 继承方式速览

> 核心：依托原型与原型链，可选多种组合策略。面试常对比优缺点与应用场景。

### 常见方案
- **原型链继承**：子类原型指向父类实例。
- **构造函数继承**：在子类构造函数中调用父类构造函数（`call/apply`）。
- **组合继承**：原型链继承 + 构造函数继承。
- **寄生组合式继承**：`Object.create` 优化组合继承，避免父构造函数执行两次。
- **ES6 `class extends`**：语法糖，底层仍是原型链。

### 原型链继承
- 思路：`Child.prototype = new Parent()`。
- 优势：能复用父类原型上的方法。
- 缺点：
  - 所有子实例共享父类实例上的引用属性，互相影响。
  - 无法向父构造函数传参。
- Tips：基本类型写时遮蔽（赋值会在实例上生成新属性）；引用类型共享同一地址。

### 构造函数继承
- 思路：`Parent.call(this, ...)` 在子构造函数内执行。
- 优势：每个子实例有独立属性，可传参。
- 缺点：拿不到父类原型上的方法。

### 组合继承
- 思路：父构造函数赋值实例属性 + 原型链继承父原型方法。
- 典型写法：
  ```js
  function Parent(name) { this.name = name }
  function Child() { Parent.apply(this, arguments) }
  Child.prototype = new Parent()
  Child.prototype.constructor = Child
  ```
- 缺点：父构造函数执行两次（一次 `apply`，一次新建原型）。

### 寄生组合式继承
- 优化：`Child.prototype = Object.create(Parent.prototype)`，只调用一次父构造函数。
- 记得 `Child.prototype.constructor = Child`。
- 优势：既继承父原型方法，又避免重复执行父构造函数，是 ES5 里最推荐的写法。

### ES6 `class extends`
- 语法糖，`class Child extends Parent { constructor() { super(); } }`。
- 必须在 `constructor` 里调用 `super()` 后才能使用 `this`。
- 支持 `super.method()` 调用父类原型方法，底层依旧是寄生组合式继承。

### 代码示例
::::code-group
```js [原型链继承]
function Parent() {
  this.flag = false
  this.user = { age: 18 }
}
function Child() {}
Child.prototype = new Parent()
Child.prototype.constructor = Child
```

```js [构造函数继承]
function Parent(name) {
  this.name = name
}
function Child() {
  Parent.apply(this, arguments)
}
```

```js [组合继承]
function Parent(name) { this.name = name }
function Child() {
  Parent.apply(this, arguments)
}
Child.prototype = new Parent()
Child.prototype.constructor = Child
```

```js [寄生组合式]
function Parent(name) { this.name = name }
function Child() {
  Parent.apply(this, arguments)
}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child
```
::::

### 面试提示
1. 先列方案，再对比优缺点与演进关系。
2. 强调寄生组合式是 ES5 最佳实践，`class` 是其语法糖。
3. 如果被问“为什么不用直接 `Child.prototype = Parent.prototype`？”答：会共享同一个原型，修改子类原型会影响父类。

:::code-group
```js [原型链继承]
function Parent () {
  this.flag = false
  this.user = {
    sex: 'female',
    age: 18
  }
}
function Child () {}
Child.prototype = new Parent()
Child.prototype.constructor = Child

const c1 = new Child()
const c2 = new Child()
c1.user.age = 20
c1.flag = true
console.log(c2.user.age) // 20
console.log(c2.flag) // false 基本类型不会影响
```

```js [构造函数继承]
function Parent (name) {
  this.name = name;
}
function Child () {
  // 1. 将Parent的构造函数this绑定为Child 2. 执行Parent()，this.name初始化，this已修改赋值到了Child上
  Parent.apply(this, arguments);
}
const c = new Child('hi');
console.log(c.name) // hi
```

```js [组合式继承]
function Parent (name) {
  this.name = name
}
function Child () {
  Parent.apply(this, arguments)
}
Child.prototype = new Parent()
Child.prototype.constructor = Child
const c1 = new Child('c1')
const c2 = new Child('c2')
```

```js [寄生组合式继承]
function Parent (name) {
  this.name = name
}
function Child () {
  Parent.apply(this, arguments)
}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child
const c1 = new Child('c1')
const c2 = new Child('c2')
```
:::