## CSS 选择器速记

> 三大特性：继承、层叠、优先级。面试常考“有哪些选择器”“权重怎么算”“哪些属性可继承”。

### 选择器家族
- **基础**：`#id`，`.class`，`tag`。
- **组合**：`A B` 后代，`A > B` 子级，`A + B` 相邻兄弟，`A ~ B` 通用兄弟，`A, B` 群组。
- **属性**：`[attr]`、`[attr=value]`、`[attr~=value]`、`[attr|=value]`、`[attr^=val]`、`[attr$=val]`、`[attr*=val]`。

:::details 属性选择器速查（点击展开）
- `[attr]`：匹配任意带 `attr` 属性的元素，常用于筛选启用某属性的节点。
- `[attr=value]`：属性值完全等于 `value`，用于精准锁定属性值。
- `[attr~=value]`：属性值由空格分隔的单词列表，匹配其中包含 `value` 的元素，常用于多类名场景。
- `[attr|=value]`：属性值等于 `value` 或以 `value-` 开头，适合语言/地区标识。
- `[attr^=val]`：属性值以 `val` 开头，可做前缀匹配（如 URL 前缀）。
- `[attr$=val]`：属性值以 `val` 结尾，多用于文件类型、后缀匹配。
- `[attr*=val]`：属性值包含子串 `val`，用于模糊匹配自定义属性。
:::
- **伪类**
  - **状态类**：`:link/:visited/:hover/:active/:focus`（记 LVHA 顺序）。`:visited` 可改属性有限（出于安全限制）。
  - **结构类**：`:first-child/:last-child/:nth-child()`、`:first-of-type` 等，匹配的是“位置”而不是“类型”；`nth-child` 系列会把所有兄弟节点一起计数，别忘了注释文本节点也算一个位置。
:::details 结构伪类注意事项（点击展开）
- `:first-child` / `:last-child`：锁定父元素的首/末个“元素节点”；若前面有文本或注释节点会匹配失败。
- `:only-child` / `:only-of-type`：要求父元素仅有一个子元素或仅有一种标签类型的子元素，常用于表单特判。
- `:nth-child(an+b)`：对所有兄弟节点按顺序计数，`odd/even` 同样包含文本节点；需要限制类型时可结合 `:not()`。
- `:nth-of-type(an+b)`：只统计相同标签名的兄弟节点；即使写成 `.item:nth-of-type()`，实际按标签维度计数。
- `:nth-last-child` / `:nth-last-of-type`：从末尾倒序计数，阅读复杂结构时更易理解。
- `:empty`：仅匹配没有任何子节点的元素（包括文本节点），空格或换行都会让匹配失效。

> 调试结构伪类时，可在 DevTools 中启用文本节点显示，或清理多余空白节点。
:::
- **逻辑类**：`:not(selector)` 权重由内部 selector 决定；`:is()`、`:where()`（新特性）能更优雅组合选择器，其中 `:where()` 权重固定为 0。
- **表单类**：`:checked/:disabled/:enabled/:required/:valid` 侧重表单状态；`:placeholder-shown` 匹配当前展示占位提示的输入框。
- **伪元素**：`::before`、`::after`、`::first-letter`、`::first-line`、`::selection`、`::placeholder` 等，用于选中文字节点的特定部分；`:before/:after` 默认需配合 `content`。

### 优先级 & 权重
- **比较链**：`!important` > 行内样式 > `#id` > `.class/伪类/属性` > `tag/伪元素` > 继承/通配符。
- **权重四元组 (A,B,C,D)**  
  - `A`：行内样式存在记 1，否则 0。  
  - `B`：ID 选择器数量。  
  - `C`：类、伪类、属性选择器数量。  
  - `D`：标签、伪元素数量。  
 逐位比较，高者胜；完全相等则后写覆盖先写。

### 继承速览
- **可继承**：字体 `font*`，文本 `color/line-height/text-align/text-indent/letter-spacing/word-spacing`，`visibility`，表格 `border-collapse/border-spacing`，列表 `list-style*`，`cursor` 等。
- **常见例外**：链接颜色默认不继承父级；标题默认字号不继承。
- **不可继承（需显式声明）**：盒模型 `display/width/height/padding/margin/border`，定位 `position/float/clear`，背景 `background*`，`outline`，`overflow`，`z-index` 等。

### 面试答题框架
1. 按类别列举主流选择器，补充关键示例。
2. 给出权重从高到低，并说明 (A,B,C,D) 计算口径。
3. 总结继承规律，点出常见陷阱（如 a 链接颜色、标题字号）。
