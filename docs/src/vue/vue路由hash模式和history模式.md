## vue路由的hash模式和history模式有什么区别？
1. hash的路由地址上有#号，history模式没有
2. 在做回车刷新的时候，hash模式会加载对应页面，history会报错404（服务器没有配置代理的话）
3. hash模式支持低版本浏览器，history不支持，因为是H5新增的API
4. history需要后台配置
5. history有历史记录，H5新增了pushState和replaceState()去修改历史记录，并不会立刻发送请求
6. hash不会重新加载页面，单页面应用必备