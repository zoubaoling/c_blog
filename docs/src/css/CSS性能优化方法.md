## 如果要做优化，CSS提高性能的方法有哪些？
> 主要从三个层面考虑：加载层面、选择器层面和渲染层面
1. 加载层面，减少CSS阻塞渲染
     - 合并和压缩 CSS 文件, 减小请求数和文件体积，降低浏览器加载时间
     - 使用link而不要使用@import，@import会造成额外的阻塞和延迟
       - link 在 HTML 解析时就会并行请求 CSS，而 @import 要等到主 CSS 文件加载并解析后才会去请求里面指定的文件，造成额外的阻塞和延迟
           - 比如index.css中有@import，会先下载、解析、执行index.css，再下载解析执行内部引入的css文件
       - link 功能更强，比如可以引入 icon、设置 media 属性，而 @import 只能引入 CSS。兼容性上，老浏览器对 @import 支持不好
     - 内联首屏关键CSS
       - html下载完就能立刻渲染，使渲染时间提前，不用等css文件下载完
       - 但是较大的css不适合内联，其余代码可以采用外部引用方式
     - 非关键CSS可以异步加载，比如给link加media或者loadCSS
2. 选择器层面，减少计算开销（css匹配是从右往左匹配，嵌套层级越多，匹配花费时间越多）
     - 避免使用过多复杂选择器，最好不要超过三层，层级越多性能越差
     - 尽量用类选择器、ID 选择器，避免使用效率比较低的标签选择器、属性选择器
     - 减少嵌套，保持样式规则扁平化
3. 渲染层面（减少重绘和回流）
     - 减少频繁触发布局的属性（如 width、height、padding、margin、top/left 等）
     - 用 transform 代替 top/left 来移动元素（只触发合成，不触发回流）
     - 用 opacity 代替 visibility/display 做动画（避免回流）
4. 其他
     - 合理使用图片，尽量使用SVG或IconFont替代大图背景

### 异步加载CSS的方式
1. 可以用 media 属性，比如 media="none" 然后在 onload="this.media='all'" 切换为 all
2. 用 JavaScript 动态插入 <link>，实现按需加载
   ```javascript
      // 这种方式不会阻塞 HTML 解析，可以按需加载 CSS。常用于 按需加载、路由级别的样式。
      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "style.css";
      document.head.appendChild(link);
   ```
3. 现代浏览器支持 <link rel="preload" as="style">，配合 onload 转换成 stylesheet
  ```html
   <!-- preload: 提前下载但不渲染，加载完再改成stylesheet -->
   <link rel="preload" href="style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  ```

[link标签要放在script前](/html/async和defer)
