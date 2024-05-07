## 如果要做优化，CSS提高性能的方法有哪些？
- 内联首屏关键CSS
  - html下载完就能立刻渲染，使渲染时间提前，不用等css文件下载完
  - 但是较大的css不适合内联，其余代码可以采用外部引用方式
- 资源压缩，使用webpack等打包工具将代码压缩，减小文件体积，降低浏览器加载时间
- 合理使用选择器
  - css匹配是从右往左匹配，嵌套层级越多，匹配花费时间越多
  - 不要使用过多复杂选择器，最好不要超过三层
  - 使用ID选择器就没必要进行嵌套
  - 标签选择器、属性选择器效率比较低，避免使用
- 不要使用@import，会影响浏览器的并行下载，增加额外的延迟
  - 比如index.css中有@import，会先下载、解析、执行index.css，再下载解析执行内部引入的css文件
- 雪碧图，小的icon图片转成base64编码或者使用字体文件，减少HTTP请求
- 减少重排操作，以及不必要的重绘
- 动画和过渡尽量使用transform和opacity实现，不要使用left和top
- 使用预处理起简化代码，使用后处理器PostCSS，自动添加浏览器前缀、压缩文件，提高代码兼容性和效率
- 设置HTTP缓存头信息，可以使用本地缓存，减少服务器请求次数
- 非关键CSS可以异步加载
  - js创建link，并添加到head最后: link ref="stylesheet" href  insertBefore document.head
  - 预加载不阻塞文档渲染：rel=preload onload="this.onload=null;this.rel='stylesheet'"

### 总结
重要从选择器嵌套、减少http请求方面考虑，还要注意CSS加载顺序


link标签要放在script前
- 先加载CSS，确保JS执行前，样式已经就位，避免JS操作DOM时无样式内容，减少渲染过程的闪烁或者样式跳边
- 防止JS阻塞渲染，JS可能修改DOM和CSSOM，所以会阻塞后续资源的下载和处理

1. css和同步script无论前后，不会相互影响下载，下载一般是并行
2. css在script前，不阻塞JS下载，但是会阻塞JS的执行- JS可能操作CSSOM，需要等前面的css加载解析完再执行
3. script在css前，阻塞CSS解析-JS可能操作CSSOM，需要前面执行完再执行JS
4. async: CSS和JS同步下载，下载完立即执行，不用等待其他脚本或CSS解析完成，执行可能在CSS处理前中后，取决于下载速度
5. defer: CSS和JS同步下载, 整个文档解析完成后，DOMContentLoaded之前执行