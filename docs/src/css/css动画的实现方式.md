## css动画的实现方式有哪些
> transition animation transform

### transition(过渡)
在指定的时间内平滑的过渡css属性，适合简单的状态变化，比如hover效果、元素颜色或位置的变化,需要事件触发，比如hover或JS修改样式

`transition: transition-property(css属性) transition-duration transition-timing-function(过渡函数) transition transition-delay`
```css
.box {
  transition: width 2s, height 2s, background-color 2s;
}
```

### keyframes/animation(动画)
通过`@keyframes`定义一系列的关键帧，描述动画的各个阶段，适用于复杂的连续动画效果，比如多步骤动画、循环动画
```css
@keyframes example {
  0% { background-color: red; left: 0px; top: 0px; }
  25% { background-color: yellow; left: 200px; top: 0px; }
  50% { background-color: blue; left: 200px; top: 200px; }
  75% { background-color: green; left: 0px; top: 200px; }
  100% { background-color: red; left: 0px; top: 0px; }
}
.box {
  width: 100px;
  height: 100px;
  position: relative;
  animation: example 5s infinite;
}
```

### transform(变形) + transition/animation
用于元素的2D或3D变化，包括旋转、缩放、移动和倾斜，适合用于与过渡或动画结合，创造复杂的效果
性能更好，只触发重绘不触发重排

`transform: rotate translate scale skew matrix`

## 总结
1. `transition`适合简单的单一状态变化，比如鼠标悬停、点击等触发效果，比较简洁，不能控制中间的动画过程
2. `animation`适合复杂的、多步骤的动画效果，通过`@keyframes`定义多个阶段的状态，非常灵活，但相对比较复杂
3. `transform`通常和`transition`和`animation`结合，用于元素的几何变化，适合创建旋转、缩放等效果