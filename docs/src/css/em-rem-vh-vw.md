## 说说em/px/rem/vh/vw
- 相对单位: em/px/rem/vh/vw/%/vmin/vmax
- 绝对单位: px pt

### 区别
1. px
  - 是像素，显示器上给我们呈现的画面，每个像素单位大小一样，绝对单位长度
2. em
  - 相对单位长度，相对于父级元素尺寸大小,不固定。如果父级元素font-size=32px; 1em -->> 32px
  - 如果父级元素（祖先元素）没有设置字体大小，则相对于浏览器的默认字体尺寸：1em = 16px
  - 16px * 62.5% = 10px, 方便计算可以声明font-size: 62.5%
  - 存在级联性，会去查找最近的设置了字体大小的祖先元素，直到根元素
3. rem
  - 相对单位长度，相对于根元素html的font-size来计算大小，通常用于移动端适配
  - 16px * 62.5% = 10px, 方便计算可以声明html: font-size: 62.5% > 1.5rem = 10 * 1.5
  - 与em相比，rem是相对于根元素，而em使用级联的方式，寻找最近的设置了font-size的祖先元素
4. vm vh
  - 以窗口大小为基础计算，分成100等分，100vw就是满宽,vh则为高度
  - PC端，窗口指浏览器的可视区域；移动端，窗口指的是布局视口
  - window.innerWidth & window.innerHeight
5. %
  - 相对于父元素
  - 普通元素: 父元素; absolute: 相对于已定位的父元素; fixed: 相对于可视窗口ViewPort
