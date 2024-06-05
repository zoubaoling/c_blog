## 谈谈 JavaScript 中的类型转换机制
代码运行时，在计算过程中，如果变量的类型与预期不符，就会触发类型转换
- 强制转换/显示转换
- 自动转换/隐式转换

### 强制转换
- Number
  - undefined > NaN
  - null, false > 0, true > 1
  - Symbol报错
  - string,必须完全是数字才能转换为数字，否则为NaN；'32' > 32, '32a' > NaN,空字符串为0（含空格）
  - object，单个数字元素的数组可以转为数字`[4] > 4`和Date转换为时间戳，其他都转为NaN, 空数组转为0
- Boolean
  - 转换为false的值：false, '', 0, +0, -0, undefined, null, NaN
- String: 任意类型的值转换为字符串
  - undefined > 'undefined', null > 'null', true > 'true', false > 'false'
  - 数字型: 0 > '0', Infinity > 'infinity', -Infinity > '-Infinity', NaN > 'NaN'
  - Symbol(key) -> 'Symbol(key)'
  - Object: 先调用toPrimitive,再调用toNumber
    - {} > '[object Object]'，对象会调用toString()
    - [1, 2, 'x'] > '1, 2, x',数组会调用join()，默认逗号拼接
    - new Set([1, 2]) > '[object Set]', 调用toString,Map|WeakMap|WeakSet同理
    - new Function > 'function...'，返回源代码字符串
    - new Date > 'Ar...'，调用toString()，返回日期和时间信息
- parseInt: 逐个解析字符，不能转换的就停止,字符串和第一个元素是数值类型元素数组可以转换，其他都为NaN
  - parseInt('22a') > 22
  - parseInt('abc2' | [] | ['a', 2]) > NaN
  - [2, 4, 'a'] > 2
  - '' > NaN

### 隐式转换
在遇到运算符的时候，运算符两边类型不一致时会发生转换
- 比较运算符：< > == != if while需要布尔值的地方
- 算术运算符：+ - * / %

1. 自动转为布尔值
> 需要布尔值的地方会自动转为布尔值，会调用Boolean函数：if while for 逻辑非! 逻辑与&& 逻辑或|| 三元运算符条件部分

只有几种会转为false,其他都为true: `null, undefined, 0, -0, +0, NaN, '', false`

2. 自动转为字符串
   
现将复合类型转为原始类型，再将原始类型转为字符串，常用于` +`，如果存在字符串，就会进行字符串拼接; `模版字符串`

具体转换规则见上强制转换中的string型

3. 自动转为数字

算术运算符、一元运算符(`+'5'`)、比较运算符(< >)都会自动转为数值，除了+遇到字符时

数值转换规则见上强制转换中的number型，注意undefined和null
