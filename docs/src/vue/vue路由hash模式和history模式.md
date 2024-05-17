## vue路由的hash模式和history模式有什么区别？
1. hash的路由地址上有#号，#后面的内容不会发送到服务器，history模式没有
2. hash模式支持低版本浏览器，history不支持，因为是H5新增的API
3. 在回车刷新的时候，hash模式会正确加载对应页面，history会报错404（服务器没有配置代理的话）
4. history需要后台配置
5. history有历史记录(router.history)，H5新增了pushState和replaceState()去修改历史记录