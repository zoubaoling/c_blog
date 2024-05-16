## css选择器有哪些？优先级？哪些属性可以继承？
> CSS的特性：继承性、层叠性、优先级

优先级：写CSS样式的时候，会给同一个元素添加多个样式，此时谁的权重高就显示谁的样式

标签/伪元素、类/伪类/属性、行内样式、id、!important

优先级顺序： !important > 行内样式 > id > 类/伪类/属性 > 标签/伪元素

### 选择器
- id选择器: `#box`
- css选择器: `.box`
- 标签选择器: `span`
- 后代选择器: `#box .one`, 空格表示，父元素内部的所有.one元素--支持深层
- 子选择器: '.one > .one_1', > 表示，父元素直接子元素中的.one_1元素--只支持直接子元素
- 相邻同胞选择器: `.one + .two`, +表示，紧接着.one的.two元素
- 群组选择器: `div, p`, 逗号拼接，选择div和p的所有元素
- 伪类选择器: 选择处于特定状态或者条件的元素----:link :hover :focus :visited : active :first-child :last-child :first-of-type :disabled :checked :not() :empty :enabled
  - :link ：选择未被访问的链接
  - :visited：选取已被访问的链接
  - :active：选择活动链接,鼠标按键激活
  - :hover ：鼠标指针浮动在上面的元素 定义顺序LVHA：link - visited - hover - active,link和visited互斥，且会被hover和active覆盖
  - :focus ：选择具有焦点的,比如input框
  - :first-child：父元素的首个子元素,是同级兄弟元素的一种，作用于目标元素的特定同级元素且元素是其父元素中的首个标签元素;eg: `p:fist-child`第一个p标签,但是P必须是子元素的第一个标签元素(一组兄弟元素中的第一个，且在父元素中也是第一个，不限标签类型)
  - :last-child: 父元素的最后一个子元素
  - :first-of-type: 父元素中的第一个具有相同类型的子元素。
  - :last-of-type: 父元素中的最后一个具有相同类型的子元素。
  - :nth-child(n): 选择父元素的第 n 个子元素。取决于在其兄弟元素中的位置，再结合指定选择器;eg: .label:nth-child(odd)-在.label所有的兄弟元素中（其父元素中排列，排列是所有子元素，不仅仅指定选择器元素）排列基数的类名为.label的元素
  - :nth-last-child(n): 选择父元素的倒数第 n 个子元素,从后往前匹配
  - :nth-of-type(n): 选择父元素中的第 n 个具有相同类型的子元素。和nth-child类似，只是排列顺序是父元素中所有相同标签类型的兄弟元素(如果是标签，就是所有标签兄弟元素；如果是其他选择器，就是所有相同选择器的兄弟元素)
  - :nth-last-of-type(n): 选择父元素中的倒数第 n 个具有相同类型的子元素。
  :fist-child|last-child|nth-child|nth-last-child｜nth-of-type|nth-last-of-type:都是从指定选择器的父元素中根据其位置去查找指定元素（在其兄弟元素中的位置）
- 伪元素选择器: 选择元素中不是由单独HTML标签表示的部分----::before ::after ::first-letter ::first-line ::placeholder
  - ::placeholder input中text和textarea占位部分
- 属性选择器:
  - `[attribute]`: 带attribute属性的元素;
  - `[attribute=value]`: attribute=value的元素，值只有value---attr="value"
  - `[attribute~=value]`: 匹配带有一个attribute=value的元素或者带有一个attribute属性，其值至少有一个和value匹配的元素(多个值用空格分割)----attr="value value2"
  - `[attribute|=value]`: 匹配一个attribute正好只等于value的元素(后接多个值不匹配)，或者第一个值是以value-开头，其后可接其他值;eg: attr="zh" attr="zh-cn en"
  - `^=`: 属性值字符串以value开头--class="abc"; `$=`: 属性值字符串以value结尾--attr="bca"; `*=`: 属性值字符串包括value

### 优先级
写CSS样式的时候，会给同一个元素添加多个样式，此时谁的权重高就显示谁的样式

优先级顺序： !important > 行内样式 > id > 类/伪类/属性 > 标签/伪元素

**权重计算规则**
四个层级：A B C D
- A: 行内样式，有-1，没有-0
- B: ID选择器出现的次数
- C: 类选择器 属性选择器 伪类选择器出现的总次数
- D: 标签选择器 和 伪元素 出现的总次数、
(A, B, C, D)
比较规则：
1. 从左往右比较A B C D,较大者优先级更高
2. 如果相等，右移一位进行比较
3. 如果4位全部相等，后面的覆盖前面的

### 继承属性
**子元素可以继承父类元素的样式**
1. 字体的一些属性：font font-family font-weight font-size font-style
2. 文本的一些属性：text-indent text-align line-height letter-spacing color word-spacing
3. 元素的可见性：visibility:hidden
4. 表格布局的属性：border-spacing border-collapse
5. 列表的属性：list-style list-style-type list-style-position
6. 光标属性：cursor
6. 页面样式属性：page
7. 声音的样式属性
> a标签的字体颜色不能继承；h1-h6标签字体的大小不能继承

**不能继承的属性**
可以继承之外的属性
1. display
2. 定位属性: position float clear
3. 盒模型的属性: width height padding margin border
4. 背景属性: 背景颜色 背景位置 背景图片等
5. 轮廓样式: outline outline-style outline-width outline-color
6. z-index
7. overflow
...
