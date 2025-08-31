## Javascript如何实现继承?
### 继承
子类可以继承父类的属性和方法，但是不需要重新编码

### 实现方法
主要是依托原型与原型链的概念来实现的
- 原型链继承，子类的原型指向父类实例
- 构造函数继承，借助call apply
- 组合继承
- 寄生组合式继承
- ES6 class extends关键字 super

#### 原型链继承
子类的原型指向父类实例，子类实例找不到属性和方法时，会往原型对象上找，也就是父类实例上找，从而实现继承

**缺点：**
  1. 所有的子类实例原型指向的是同一个对象，子类某一个实例修改来自原型上的引用数据时会影响所有的子类实例
  2. 创建子类实例时，无法向父类构造函数传参

*基础类型在原型链继承中，不会共享修改 —— 因为赋值时会在实例对象上创建新的同名属性，屏蔽原型上的值，访问的是值的副本（属性遮蔽）*

*引用类型在原型链继承中，会共享修改 —— 因为所有实例共享的其实是同一个对象的引用*

#### 构造函数继承
在子类的构造函数中执行父类的构造函数，并为其绑定子类的this,让父类的构造函数把属性和方法挂载到子类的this上，避免实例间共享同一个原型实例，又可以向父类构造方法传参

缺点：
  1. 无法继承父类原型上的方法和属性

#### 组合继承
结合原型继承和构造函数继承

解决了上面的问题：可以继承父类原型上的方法，可以给父类传参，父类中引用类型数据的修改不会影响多个实例对象

**问题：**
  1. Parent执行了两次
  2. 父类原型上引用类型的修改仍然会相互影响

#### 寄生组合式继承
解决构造函数执行两次的问题，将指向父类实例改成指向父类原型，只执行一次

使用Object.create(Parent.prototype)，而不直接使用原型是为了避免在Child.prototype上修改方法或添加属性会影响到父类以及父类的其他子类

#### class
[class](/ES6/es6的class)使用extends继承，必须使用super,来调用父类的构造函数，初始化子类的this

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