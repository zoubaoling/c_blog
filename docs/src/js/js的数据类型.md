## 说说JavaScript中的数据类型？存储上的差别？
 - 基本类型
 - 引用类型
基本类型和引用类型的区别主要是存储位置不同

### 基本类型
- String: "双引号 '单引号 `反引号
- Number: 包括整数和浮点数
  - 存在一个特殊数值`NaN`,不是数值，表示本来要返回数值的操作失败了
- Boolean: 布尔值，可以通过`Boolean`将其他数据转换成布尔型
  - 可以转为false的：'', undefined, null, 0, -0, +0, NaN

| 数据类型 | 转为false | 转为true |
| --- | --- | --- |
| String | ''(不能含空格) | 非空字符串 |
| Number | (+-)0,NaN | 非0数值，包括无穷数值 |
| Object | null | 任意对象 |
| Undefined | undefined | - |
- Undefined: 特殊值，声明了变量但未初始化值就是undefined
- null: 特殊值，空值，一个空对象指针
  - 是一个空对象指针，typeof null === 'object'
  - undefined由null派生，所以==结果为true，严格判断为false
  - 当变量要保存一个变量，但是当时没那个变量可以保存，就可以用`null`来填充
- Symbol：唯一标识符，用于对象属性的键名,不可变
  - Symbol不能用作构造函数
  - Symbol()中即使传递相同的内容也是不同的值
  - 全局注册Symbol.for(key)，根据符号去找，如果注册过就返回对应symbol，如果没有就注册并返回
  - Symbol.keyFor(symbol)，查询全局注册表，传入symbol值，查找对应的key,只能查找通过Symbol.for注册的，否则会报错
### 引用类型
统称为`Object`,常见的是：`Object` `Array` `Function`
还有`Date`, `Map`, `Set`, `RegExp`

**创建方式**
- Object
  1. 对象字面量：`const obj = {}`
  2. 构造函数，也可以包括类: `const p = new Person()`
  3. Object.create(), 指定原型对象创建对象
- Array
  1. 数组字面量：`const arr = []`
  2. Array构造函数：`const arr = new Array(1, 2, 3)`
  3. Array.from: 从类数组和可迭代对象创建数组
  4. 扩展运算符，同Array.from
- Function
  1. 函数声明：function关键字`function fun(){}`
  2. 函数表达式：函数赋值给变量`const myFun = function(){}`
  3. 箭头函数

### 区别
- 基础类型存储在栈中，存放的是值
- 引用类型数据存储在堆中，栈中存储的是指向堆内存的引用地址

- 简单类型赋值是复制了一份值并在栈中开辟内存存储值
- 引用类型复制是复制了一份引用地址并在栈中开辟内存存储引用地址，复制前后的对象的地址指向的是堆中的同一个对象