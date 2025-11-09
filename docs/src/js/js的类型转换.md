## JavaScript 类型转换速记

> 面试聚焦：强制 vs 隐式、常见运算触发点、转换陷阱。

### 显式（强制）转换
- **Number(value)**
  - `undefined → NaN`，`null → 0`，`true → 1`，`false → 0`。
  - 字符串需完全满足数值格式：`'32' → 32`，`'32a' → NaN`，空字符串（含空格）→ `0`。
  - 对象先走 `ToPrimitive`：数组 `[1] → 1`，空数组 `[] → 0`，`Date` 返回时间戳，其余多数 → `NaN`。
  - `Symbol` 转换会抛 `TypeError`。
- **String(value)**
  - 原始类型按字面转换：`undefined → 'undefined'`、`true → 'true'`、`NaN → 'NaN'`。
  - 对象先 `ToPrimitive` 再转字符串：对象默认 `toString()` → `'[object Object]'`；数组走 `join(',')`。
- **Boolean(value)**
  - falsy 列表：`false`、`0/-0/0n`、`''`、`null`、`undefined`、`NaN`。
  - 其他皆为 `true`，包括空数组 `{}`、`[]`、函数、非空字符串等。
- **parseInt(string, radix?)**
  - 自左向右解析数值，遇到首个非法字符停止；无合法数字返回 `NaN`。
  - 常见：`parseInt('22a') → 22`，`parseInt('abc') → NaN`，`parseInt([2,4,'a']) → 2`。

### 隐式（自动）转换
- **布尔语境**：`if` / `while` 条件、逻辑运算符 `!` `&&` `||`、三元 `?:`。调用内部的 `ToBoolean`，falsy 列表同上。
- **算术运算符**
  - `+`：存在任一字符串 → 字符串拼接；否则双方转成 `Number`。
  - `-`、`*`、`/`、`%`：双方转成 `Number` 后计算。
  - 一元 `+value` / `-value`：会尝试转成 `Number`。
- **比较运算符**：`>` `<` `>=` `<=` 触发 `ToPrimitive` → `Number`；若有字符串按字典序比较。
- **`==`**：使用抽象相等算法，包含多步转换（可联动 `==` 章节回答）。强调 `null` 只与 `undefined` 相等。

### `ToPrimitive` 提醒
- 对象转换前会调用内部的 `@@toPrimitive` → `valueOf()` → `toString()`。
- `Date` 是特例：优先 `toString()`，再 `valueOf()`。

### 常见坑位
- `Number([]) → 0`，`Number({}) → NaN`，但 `[] == 0` 为 `true`（隐式转换）。
- `'5' + 1 → '51'`；`'5' - 1 → 4` （减法触发数值转换）。
- `Boolean('0')` 为 `true`，但 `Number('0')` 为 `0`。
- `parseInt(0.0000008)` → `8`（先转字符串 `'8e-7'`，再按指数记法解析），面试常问。

### 面试答题模板
1. 先区分显式 VS 隐式，列举常用 API (`Number/parseInt/String/Boolean`) 与运算触发点。
2. 提到 `ToPrimitive` 顺序、`Date` 特例、`Symbol` 转换异常。
3. 用 2~3 个常见坑（`[] == ![]`、`'5' + 1` 等）收尾，展示理解深度。
