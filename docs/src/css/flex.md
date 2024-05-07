## flex
设置 display:flex，将元素变为容器，容器内的元素为项目。
容器有两个轴：主轴和交叉轴。主轴默认 row，从左到右；交叉轴默认从上到下
项目默认沿主轴方向排列

**容器属性：**
- flex-direction:设置主轴方向 row column row-reverse column-reverse
- justify-content:项目在主轴方向的排列方式；
  - flex-start;flex-end;enter
  - space-between:两边对齐（紧贴容器边缘）项目间等间距
  - space-around:项目左右两侧间隔相等。非边缘项目间的间距是边缘项目到容器边距的2倍
  - space-evenly:间隔相等。项目之间、项目与容器边距相等
- align-items:项目在交叉轴上的排列方式
  - flex-start;flex-end;center
  - stretch:未设置项目在交叉轴上的长度时，自动拉伸填满容器
  - baseline…
- align-content:适用于多行项目，设置多行项目在交叉轴上的对齐方式
  - flex-start;flex-end;center
  - strecth space-between space-around
- flex-wrap：是否换行；wrap,nowrap,wrap-reverse，按交叉轴方向排列
- flex-flow:flex-direction flex-wrap

**项目属性：**
- align-self:设置单个项目在交叉轴上的对齐方式，覆盖 align-items
- order:元素顺序，默认为0，数字越小约在前面。数字相等时，按文档流顺序
- flex-grow:放大，默认为0；0-不放大；1-放大;
  - A：100px flex-grow: 1，B: 150px flex-grow: 2，C: 100px flex-grow: 3
  - 容器宽500px，子元素总和350，剩余空间150（x)
  - 每隔元素可以分配的剩余空间：150 * 单个 grow 值/总 grow 值
  - A：瓜分大小：150 * 1 / (1+ 2+ 3) = 25; 实际大小：100 + 25
- flex-shrink:缩小，默认为1；0-不缩小；1-缩小
  - 计算超出部分：子元素总宽度之和-容器宽度=需要压缩、超出的宽度
  - 计算每个子元素的压缩因子：压缩因子=flex-shrink 值 * 子元素原始宽度
  - 计算总的压缩因子：子元素压缩因子之和
  - 计算每个子元素的压缩宽度：压缩宽度=（子元素压缩因子/总的压缩因子）* 需要压缩的总宽度
  - 计算最终宽度=子元素的原始宽度 - 压缩宽度
  - 第二种方式
  - 计算超出部分，按照真正占用空间计算（实际盒子宽度），注意盒模型,content-box要加上 padding 和 border
  - 计算超出部分各元素的实际分配比例(实际 content 大小，不包含 padding,border-box 元素要减去 padding.border): 元素实际 content * shrink 值做比
  - 计算实际缩减的大小：计算的超出部分*比例
  - 计算实际宽：实际盒子宽度(content-box 要加) - 缩减宽度
- flex-basis:项目分配剩余空间前的大小。默认 auto,项目的本来大小。权重比 width 大
  - min-width/max-width > flex-basis > width > box
- flex: flex-grow flex-shrink flex-basis
  - flex:initial → flex: 0 1 auto
  - flex:auto → flex: 1 1 auto
  - flex: none → flex: 0 0 none
  - flex: 单个数值-无数字单位(grow) → flex: 数值 1 0%
  - flex: 单个数值-有数字单位(basis) → flex: 1 1 数值
  - flex: 双值-两个没有单位的数字(grow,shrink) → flex: 数值 数值 0%
  - flex: 双值-1个带单位（basis)，1个不带单位(grow) → flex: 数值 1 数值
  - flex:三值

> flex-basis 为0时告诉伸缩不需要考虑元素尺寸，为 auto 时告诉伸缩需要考虑元素尺寸


[一道前端面试题：flex空间分配规则 - 掘金](https://juejin.cn/post/6844904066078736391?searchId=20240319175030F17ED9F2BE52B9B59C5D)

[深入理解 flex-grow、flex-shrink、flex-basis - 掘金](https://juejin.cn/post/6844904016439148551?searchId=20240319170428F8840672E25633AF1E3A)

[一文吃透 CSS Flex 布局 - 掘金](https://juejin.cn/post/7245898637779157052?searchId=20240319170428F8840672E25633AF1E3A#heading-16)

column-gap;row-gap;gap: row-gap column-gap