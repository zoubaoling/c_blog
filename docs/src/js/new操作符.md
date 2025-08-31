## 说说new操作符具体干了什么
1. 先创建一个空对象
2. 把空对象和构造函数通过原型链进行链接
3. 把构造函数的this绑定为新的空对象身上
4. 执行构造函数并根据执行结果返回的类型判断
     - 如果是值类型，则返回新创建的对象
     - 如果是引用类型，就要返回这个引用类型

### 实现
```js
function myNew (func, ...args) {
  const obj = {}
  obj.__proto__ = func.prototype
  // const obj = Object.create(func.prototype)
  // Object.setPrototypeOf(func.prototype)
  const result = func.apply(obj, args)
  return result instanceof Object ? result : obj
}
```

### new fn和new fn()
- new fn和new fn()功能上是等价的
- `new fn().prop`和`new fn.key`不等价，前者正常，后者报错，先执行fn.key,再执行new

### new与箭头函数
- 不可修改箭头函数的this指向
- 箭头函数不能用new，会报错
- 箭头函数没有原型，内部无法绑定，且箭头函数没有this

### new与Object.create
都用于创建对象
|  | new | Object.create |
| --- | --- | --- |
| 构造函数 | 保留构造函数属性 | 丢失原构造函数属性 |
| 原型链 | 构造函数的prototype | 原构造函数/对象本身 |
| 作用对象 | 构造函数 | 构造函数和对象 |

Object.create一般主要接受对象

### new.target
检测函数是否通过new调用的
  - 普通函数调用时返回undefined
  - 作为new调用时，返回构造函数的引用

### 确保函数被new调用，而不能普通调用
- this instanceof Constructor: true是此方法是构造函数实例，即是new调用;false可以抛出错误
- new.target
- es6 class