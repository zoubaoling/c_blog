## 原型 & 原型链速记

> 面试主线：构造函数（`prototype`）→ 实例（`__proto__`）→ 链式查找规则。

### 基本概念
- **原型（Prototype）**：供同一构造函数的实例共享属性/方法的对象。
- **`prototype` 属性**：函数独有，指向其原型对象，可在此挂载共享成员。
- **`constructor`**：原型对象上的引用，回指构造函数本身（可手动重设）。
- **`__proto__` / `[[Prototype]]`**：实例持有的隐藏指针，指向创建它的原型；现代推荐用 `Object.getPrototypeOf()` 读取。

### 原型链查找流程
1. 访问实例属性，先查自身。
2. 找不到则沿 `__proto__` 指向的原型继续查。
3. 逐级上溯，直到 `Object.prototype`。
4. 再往上是 `null`，表示链尾。未命中属性返回 `undefined`。

> 这条“由对象指向其原型再指向更高层原型”的链式结构就是原型链。

### 图示记忆
```
构造函数 Foo()
        │
        ├── Foo.prototype  ← constructor → Foo
        │
    实例 foo.__proto__ ───────────────┘
```

### 常见提问点
- **“所有对象最终都继承自谁？”** → `Object.prototype`，其原型为 `null`。
- **“函数是怎么来的？”** → 所有函数本身都是 `Function` 的实例，因此继承自 `Function.prototype`。
- **“原型能否动态修改？”** → 可以；修改 `Foo.prototype` 会影响之后创建的实例，已有实例若原型被替换需注意 `constructor` 丢失。
- **“如何判断对象的原型？”** → `Object.getPrototypeOf(obj)`、`obj instanceof Constructor`（检查原型链）。

### 面试答题模板
1. 先定义“原型”与“原型链”，说明实例如何通过原型共享方法。
2. 描述属性查找流程（自身→原型→…→`null`）。
3. 补充 `Object.prototype`、`Function.prototype` 的顶层关系。
4. 若被追问可展示 `new` 流程：创建对象 → 赋 `__proto__` → 执行构造函数 → 返回实例。