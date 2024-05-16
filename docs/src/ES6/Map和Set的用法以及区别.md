## set和map
- set是集合，类似数组，存储不重复的值，常用于去重
- map类似JSON对象，以键值对的形式存储数据

### 使用上
- set
  - `new Set([val1, val2])`作为构造函数接受一个一维数组, 数组内容可以为基本类型，也可以是引用类型
  - 常用方法：`add`, `delete`, `has`, `clear`, `size`, add是链式操作，返回最新Set
  - 遍历方法：`keys`, `values`, `entries`, `forEach`,Set遍历的结果key和value相同，且前三种方法遍历出来的是迭代器，类数组，需要用扩展运算符或者Array.from处理成数组，或者for-of遍历
  - 添加值时不会发生类型转换，5和‘5’不同，判断类似===， NaN特殊，不严格等于自身，但是set看作同一个值 Object.is
  - 遍历顺序是插入顺序
- map
  - `new Map([[key1, value1]])`作为构造函数接收一个二维数组，键值可以是任何类型的数据
  - 常用方法：`set`, `get`,`delete`, `has`, `size`, `clear`, set是链式操作，返回最新Map
  - 遍历方法：`keys`, `values`, `entries`, `forEach`,前三种结果都是迭代器，类数组，需要使用扩展运算符或者Array.from转成数组，或者for-of遍历
  - 如果键值为简单类型，两个值严格相等才判定为一个键，包括0和-0，NaN不严格相等，但仍然视为一个键 Object.is
  - 遍历顺序是插入顺序
  - 适用于频繁取用的数据

## WeakSet和WeakMap
1. WeakSet类似Set
     - 成员只能是引用类型，且为弱引用，其他地方不存在对成员对象的引用后，会被垃圾回收机制回收，成员会消失，所以WeakSet的成员个数不可预测，不可以遍历，没有遍历方法和`.size`、`.clear`
     - 常用方法：`add`, `has`, `delete`,没有size和clear
     - 没有遍历方法
     - 构造函数接收一维数组，数组元素需要是引用类型
2. WeakMap类似Map
     - key只能是引用类型，弱引用同WeakSet
     - 常用方法：`set`, `get`, `has`, `delete`, 没有size和clear
     - 没有遍历方法
     - 构造函数为二维数组，数组元素需要是引用类型
  
### 场景
1. WeakSet和WeakMap可以用于DOM节点的管理，DOM在页面删除时，数据会被垃圾回收
比如：DOM的事件绑定
```js
const el = document.getElementById('app')
const listeners = new WeakMap()
const handler1 = () => {}
listeners.set(el, handler1)
el.addEventListener('click', listeners.get(el), false)
```
2. 私有对象数据，私有变量管理在WeakMap中`map.set(this, {})`,通过map获取，当实例销毁时，相关数据不在存在，不可被其他地方使用
  
实际使用与生命周期管理分离的对象添加额外信息
> 垃圾回收机制-引用计数：引用次数不为0，垃圾回收机制不会释放内存