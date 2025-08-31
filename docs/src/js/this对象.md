## 谈谈this对象的理解
大多数情况，函数的调用方式决定了this的值（运行时绑定）

this关键字是函数运行时自动生成的一个内部对象，只能在函数内部使用，指向调用它的对象

**this指向**
1. 全局对象中的this指向
     - 指向的是window, 严格模式是undefined
2. 全局作用域或者普通函数中的this
     - 指向全局window，严格模式是undefined
3. 作为对象的方法调用，this永远指向最后调用它的那个对象(在不是箭头函数的情况下)
4. new 关键词改变了this的指向，箭头函数不可修改
     - 构建函数返回了一个对象，this指向的是这个对象
     - 否则，this指向的是实例对象
5. apply,call,bind
      - 可以改变this指向，箭头函数不可修改
6. 箭头函数中的this
     - 箭头函数的this指向在定义的时候就已经确定了
     - 箭头函数它没有this, 看外层是否有普通函数，有就是外层普通函数的this，没有就是window
7. 匿名函数中的this
     - 永远指向了window,匿名函数的执行环境具有全局性，因此this指向window

new > call apply bind > 其他

### addEventListener
1. 使用非箭头函数绑定
`element.addEventListener('click', function() {})`: this绑定的是element，监听事件的元素
2. 使用箭头函数
`element.addEventListener('click', () => {})`: this绑定的是window，箭头函数声明在全局作用域下，外部没有函数作用域