## `typeof` vs `instanceof` vs `Object.prototype.toString`

> 面试核心：检测目标是什么、能识别哪些类型、常见陷阱。

### 快速对比
- **`typeof`**
  - 返回字符串：`'number' | 'string' | 'boolean' | 'undefined' | 'symbol' | 'bigint' | 'function' | 'object'`。
  - 能识别所有原始类型（`null` 除外，返回 `'object'`），函数返回 `'function'`。
  - 其他引用类型（数组、正则、日期等）统一是 `'object'`，辨识度有限。
- **`instanceof`**
  - 返回布尔值：检测对象原型链上是否能找到构造函数的 `prototype`。
  - 只能作用于对象（`null`、原始类型直接返回 `false`）。
  - 受原型链影响，跨 iframe/realm 或手动改原型链时可能失真。
- **`Object.prototype.toString.call()`**
  - 统一返回 `[object Type]`，能区分绝大多数内建对象，包括 `Array`、`Date`、`RegExp`、`Null`、`Undefined`。
  - 需要手动调用并解析字符串，是较可靠的通用方案。

### 使用示例
```js
typeof 42              // 'number'
typeof null            // 'object'  ← 经典陷阱
[] instanceof Array    // true
({}) instanceof Object // true
Object.prototype.toString.call([])        // '[object Array]'
Object.prototype.toString.call(null)      // '[object Null]'
Object.prototype.toString.call(undefined) // '[object Undefined]'
```

### 手写 `instanceof` 思路
```js
function myInstanceof(left, right) {
  if ((typeof left !== 'object' && typeof left !== 'function') || left === null) {
    return false
  }
  let proto = Object.getPrototypeOf(left)
  while (proto) {
    if (proto === right.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
  return false
}
```

### 面试答题模板
1. 先说明各自定位：`typeof` 判原始类型，`instanceof` 判原型链关系，`toString` 判具体内建对象。
2. 再点出坑位：`typeof null === 'object'`、跨 iframe `instanceof` 失效、自定义原型链可能被篡改。
3. 给实践建议：日常先用 `typeof` 兜底原始类型，判数组等复杂对象时用 `Array.isArray` 或 `Object.prototype.toString.call`；遇到继承结构再考虑 `instanceof`。
