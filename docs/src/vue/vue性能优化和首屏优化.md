## vue的性能优化和首屏优化
### 性能优化
1. 编码优化
     - 不要把所有数据都放在data中
     - keep-alive缓存组件
     - 尽可能拆分组件，提高复用性、维护性
     - key值要保证唯一
     - 合理使用路由懒加载，异步组件
     - 数据持久化存储的使用尽量用防抖、节流优化
2. 加载优化
     - 按需加载
     - 内容懒加载
     - 图片懒加载
3. 用户体验
     - 骨架屏
     - loading
4. SEO优化
     - 预渲染
     - 服务端渲染ssr
5. 打包优化
     - CDN形式加载第三方模块
     - 多线程打包
     - 抽离公共文件
6. 缓存和压缩
     - 客户端缓存、服务端缓存
     - 服务端Gzip压缩
  
### 首屏优化该如何去做
   1. 使用路由懒加载
   2. 非首屏组件使用异步组件
   3. 首屏不重要的组件延迟加载
   4. 减少首屏上JS、CSS等资源文件的大小
   5. 尽量减少DOM的数量和层级
   6. 使用精灵图请求
   7. 做一些loading
   8.  图片懒加载
   9.  开启Gzip压缩
   10. 静态资源放在CDN上
   11. 使用服务端渲染