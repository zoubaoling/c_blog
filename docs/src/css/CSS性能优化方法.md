## 如果要做优化，CSS提高性能的方法有哪些？
- 内联首屏关键CSS
  - html下载完就能立刻渲染，使渲染时间提前，不用等css文件下载完
  - 但是较大的css不适合内联，其余代码可以采用外部引用方式
- 资源压缩，使用webpack等打包工具将代码压缩，减小文件体积，降低浏览器加载时间
- 雪碧图，小的icon图片转成base64编码或者使用字体文件，减少HTTP请求
- 合理使用选择器
  - css匹配是从右往左匹配，嵌套层级越多，匹配花费时间越多
  - 不要使用过多复杂选择器，最好不要超过三层
  - 使用ID选择器就没必要进行嵌套
  - 标签选择器、属性选择器效率比较低，避免使用
- 减少重排操作，以及不必要的重绘
- 动画和过渡尽量使用transform和opacity实现，不要使用left和top
- 使用预处理起简化代码，使用后处理器PostCSS，自动添加浏览器前缀、压缩文件，提高代码兼容性和效率
- 不要使用@import，会影响浏览器的并行下载，增加额外的延迟
  - 比如index.css中有@import，会先下载、解析、执行index.css，再下载解析执行内部引入的css文件
- 设置HTTP缓存头信息，可以使用本地缓存，减少服务器请求次数
- 非关键CSS可以异步加载
  - js创建link，并添加到head最后: link ref="stylesheet" href  insertBefore document.head
  - 预加载不阻塞文档渲染：rel=preload onload="this.onload=null;this.rel='stylesheet'"

### 总结
重要从选择器嵌套、减少http请求方面考虑，还要注意CSS加载顺序


[link标签要放在script前](/html/async和defer)
