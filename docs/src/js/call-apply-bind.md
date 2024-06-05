## bind、call、apply 区别？如何实现一个bind?
- 都可以用改变函数的this，第一个参数都是this，没有参数或者是null | undefined，就指向window
- apply和call是立即执行，bind是返回一个改变了this指向的函数
- apply传参是数组，call是参数列表，都是一次性传入。bind是参数列表，可以多次传入(bind时和执行时，最终会将多次传入的参数拼接)

> bind是永久改变，一个函数连续多次bind，绑定的this是第一次绑定的值，多次绑定无效

### 实现bind
- 修改this指向：apply
- 动态传参，可以多次传递
- 兼容new关键字 暂不考虑
```js
Function.prototype.myBind = function (context, ...bindArts) {
  if (typeof this !== 'function') throw new TypeError('Error')
  const fn = this
  return function Fn () {
    // 考虑new,context > this instanceof Fn ? this : context
    return fn.apply(context, [...bindArts, ...arguments])
  }
}
```

### 实现apply
- 修改this指向，基于this原理，作为对象的方法调用，指向的是对象
- 支持参数列表
- 立即执行并返回结果
```js
Function.prototype.myApply = function(context = window, args = []) {
  if (typeof this !== 'function') throw new TypeError('Error')
  const fn = Symbol('fn')
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result
}
```
### 实现call
与apply主要区别是参数处理
```js
Function.prototype.myApply = function(context = window, ...args) {
  if (typeof this !== 'function') throw new TypeError('Error')
  const fn = Symbol('fn')
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result
}
```