## JavaScript 数据类型速记

> 面试常考：有哪些类型、内存存储差异、判断方式、转换陷阱。

### 八种原始类型（Primitive）
- **Number**：含整数、浮点数、`NaN`（任何比较都为 `false`）、`Infinity`。
- **String**：文本，支持模板字面量 `` `` ``。
- **Boolean**：`true` / `false`，常用于条件转换。
- **Undefined**：声明未赋值的默认值。
- **Null**：空指针占位。经典坑：`typeof null === 'object'`。
- **Symbol**：唯一标识符，适合作为对象私有键；`Symbol.for`/`Symbol.keyFor` 可操作全局注册表。
- **BigInt**：任意精度整数，用 `123n`、`BigInt()` 创建，不能与 Number 直接混算。
- **（ES 提到的）`null`/`undefined` 特殊合并**：`null == undefined` → `true`，`===` 则 `false`。

> 原始值不可变、按值传递，通常存放在栈或寄存器。

### 引用类型（Objects）
- 统称 `Object`，包括 `Object`、`Array`、`Function`、`Date`、`RegExp`、`Map`、`Set`、`WeakMap`、`WeakSet` 等。
- 存在堆内存，变量里保存的是指向堆上实体的“引用地址”。
- 赋值/传参时复制的是引用，多处变量指向同一个对象。

### 存储 & 复制区别
- **原始类型**：值写入栈，复制即值复制，互不影响。
- **引用类型**：地址写入栈，指针指向堆；复制时复制指针，指向同一对象。

### 真值表（常见 falsy）
| falsy 值 | 备注 |
| --- | --- |
| `false` | 布尔值本身 |
| `0`、`-0`、`0n` | 包含 BigInt 的 `0n` |
| `''`、`""`、```` | 空字符串 |
| `null`、`undefined` | 空值、未定义 |
| `NaN` | 非数值 |

其余都为 truthy，包括空数组 `{}`、`[]`、`function(){}`、任意非空字符串等。

### 类型判断速览
- `typeof`：原始类型 + `function`；`typeof null` 特例为 `'object'`。
- `instanceof`：检测原型链，适合对象与构造函数关系。
- `Object.prototype.toString.call(value)`：输出 `[object Type]`，精确识别内建对象。
- `Array.isArray`、`Number.isNaN` 等原生方法更语义化。

### 面试答题模板
1. 先列“七种原始类型 + BigInt”与“对象类型”。
2. 补充存储差异、赋值机制（值 vs 引用）。
3. 点出常见坑：`typeof null`、`NaN` 不等于自身、BigInt 不能直接与 Number 运算。
4. 给出判别或转换建议，比如 `JSON.stringify` 只处理可枚举属性、`==` 隐式转换风险等。