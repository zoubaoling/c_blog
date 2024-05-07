## 谈谈对BFC的理解?
BFC:Block Formatting Context，块级格式上下文，是页面中的一块渲染区域，有自己的渲染规则，目的是形成一个相对于外界完全独立的空间，内部的元素不会影响到外部的元素

### 渲染规则
1. Box垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的margin会发生重叠。
2. 计算BFC的高度时，浮动子元素也参与计算
3. BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素
4. 内部的Box会在垂直方向上一个接一个放置
5. BFC的区域不会与float box重叠
6. 每个元素的margin box 的左边，与包含块border box的左边相接触,即使存在浮动

### 触发条件
- 浮动元素，float: left|right
- overflow不为visible, 为auto scroll hidden
- display, inline-block flex inline-flex grid inline-grid table inline-table
- position: absolute | fixed
- 根元素, html

### 应用场景
1. 防止外边距重叠（塌陷）
**外边距重叠现象**
  相邻两个元素垂直方向上如果都设置了margin,实际渲染是取最大margin，而不是两个margin相加
**应用原理**
  同一个BFC里，两个相邻的盒子margin会发生重叠
  实现：其中一个盒子外包一层容器，并触发生成一个BFC，那么就属于两个BFC，不会发生重叠，不会相互影响

2. 清除浮动解决父元素高度塌陷的问题
**现象**
如果父元素内部存在float浮动元素，且父元素高度未设置，那么父元素的高度会塌陷，其中浮动子元素高度不计算，无法撑起父元素
**原理**
  计算BFC的高度时，浮动子元素也参与计算
  实现：将父元素触发为BFC，比如:overflow: hidden
  
3. 自适应两列布局
**现象**
  .left左浮动高度塌陷，.right div和.left同行，且占满整行，而不是只占据右侧宽度
**应用原理**
  BFC的区域不会与float box重叠
  实现：将.right触发为BFC,就不会和.left重叠了，不占满整行，与左侧浮动元素隔离开，不会环绕在浮动元素周围


float:文本环绕，元素按照在普通流的位置出现，然后按照浮动方向偏移