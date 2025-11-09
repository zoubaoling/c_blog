## `call` / `apply` / `bind` 速记

> 面试重点：`this` 绑定方式、执行时机、参数差异、`bind` 的二次调用。

### 核心区别
- **共同点**：第一个参数都是要绑定的 `this`。传 `null/undefined` 时，非严格模式退回全局对象（浏览器为 `window`）。
- **`call`**：立即执行，参数按列表顺序传入：`fn.call(ctx, arg1, arg2)`。
- **`apply`**：立即执行，参数打包数组：`fn.apply(ctx, [arg1, arg2])`。
- **`bind`**：返回一个“永久绑定 `this` 和部分参数”的新函数，需要显式调用才执行，可多次传参，类似柯里化。

> `bind` 的 `this` 绑定只生效第一次；后续再 `bind` 不会变，但参数会继续叠加。

### `bind` 实现（含 `new` 兼容）
```js
Function.prototype.myBind = function (context, ...bindArgs) {
  if (typeof this !== 'function') throw new TypeError('Target is not callable')
  const fn = this
  function boundFn(...callArgs) {
    const realThis = this instanceof boundFn ? this : context
    return fn.apply(realThis, [...bindArgs, ...callArgs])
  }
  boundFn.prototype = Object.create(fn.prototype) // 保留原型链
  return boundFn
}
```

### `apply` / `call` 手写思路
```js
Function.prototype.myApply = function (context = globalThis, args = []) {
  if (typeof this !== 'function') throw new TypeError('Target is not callable')
  const fnKey = Symbol('fn')
  context[fnKey] = this
  const result = context[fnKey](...args)
  delete context[fnKey]
  return result
}

Function.prototype.myCall = function (context = globalThis, ...args) {
  if (typeof this !== 'function') throw new TypeError('Target is not callable')
  const fnKey = Symbol('fn')
  context[fnKey] = this
  const result = context[fnKey](...args)
  delete context[fnKey]
  return result
}
```

### 面试提示
- 先比较“执行时机 + 传参形式”，再点出 `bind` 可叠加参数、配合 `new` 使用时 `this` 指向最新实例。
- 强调 `new` 绑定优先级最高：`new (fn.bind(obj))()` 中，`this` 会指向新实例而不是 `obj`。
- 提醒现代替代方案：`Reflect.apply(fn, context, args)` 能统一 `call/apply` 的场景。
