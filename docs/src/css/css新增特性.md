## CSS3新增了哪些新特性
1. 新增选择器：属性选择器、伪类选择器、伪元素选择器
  - 属性选择器: ^= $= *=
  - 伪类选择器 :last-child nth-child... first-of-type..
2. 增加了媒体查询
3. 样式
  - 边框：border-radius border-shadow border-image
  - 元素阴影：box-shadow
  - 背景：background-clip|size|origin|break; 
    - size: contain缩小，能展示完全，可能重复；cover 放大，可能展示不完全，保持比
    - origin: 左上角对齐方式 padding-box | border-box | content-box
  - 文字： word-wrap:normal|break-word|break-all; text-overflow; text-decoration; text-shadow
  - 颜色：rgba hsla
6. 盒模型box-sizing
7. 渐变 linear-gradient线性渐变 radial-gradient径向渐变
8. 过渡 transition: css属性，花费时间，效果曲线（默认ease），延迟时间（默认0）
9. 转换 transform: scale translate rotate skew; transform-origin围绕的点(不支持行内元素)
10. 自定义动画 animation-name|duration|delay| timing-function | direction | iteration-count | fill-mode | play-state
11. flex grid
12. 2D和3D