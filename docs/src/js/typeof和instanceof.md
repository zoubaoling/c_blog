## typeof 和instanceof的区别
都是用于判断数据类型

1. typeof返回变量的基本类型字符，instanceof返回的是一个布尔值，判断一个对象是否为一个构造函数的实例
2. instanceof可以准确的判断引用类型的数据类型，但是不能用于基础数据类型
3. typeof可以判断null除外(===object)的基本数据类型，引用类型中除了function类型，其他类型都返回`object`，无法准确判断

> instanceof 检测一个构造函数的prototype属性是否出现在某个实例对象的原型链上：object instanceof constructor
```js{4}
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol // 'symbol'
typeof null 'object'
typeof [] {} // 'object'
typeof new Function() // 'function'
```
### instanceof实现
```js{4}
function myInstanceof = (left, right) {
  if (typeof left !== 'object' || left === null) return false
  let proto = Object.getPrototypeOf(left)
  while () {
    if (proto === null) return false
    if (proto === right.prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}
```
### Object.prototype.toString.call
`Object.prototype.toString`统一返回格式'[object Xxx]'的字符串 -> Object.prototype.toString.call()
- 其他类型必须使用call,否则统一返回`[object Object]`
- [object `Object|Number|String|Boolean|Function|Array|Null|Undefined|RegExp|Date|HTMLDocument|Window`]

**实现获取类型的方法**
```js{4}
function getType(obj) {
  const type = typeof(obj)
  if (type !== 'object') return type
  return Object.prototype.toString().call(obj).replace(/^\[object (\S+)\]$/, '$1')
  // \S匹配非空白字符，\s匹配空白字符：空格 制表符 换行符
  // $1第一个捕获组
}
```
