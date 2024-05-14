## 说说webpack proxy工作原理？为什么能解决跨域
主要是webpack-dev-server提供的，基于http-proxy-middleware这个中间件，实现请求转发，只适用于开发阶段，提高效率

1. 开发阶段，webpack-dev-server会启动一个本地开发服务器，应用运行在localhost的一个端口上
2. 本地发送请求时，本地服务器接受请求并根据devServer.prox中的配置将请求转发给指定的后端服务器
3. 本地服务器接受后端服务器的响应，再转发给浏览器
4. 服务器和服务器之间的通信不存在跨域行为，而浏览器和本地服务器二者同源，也不存在跨域行为

**配置**
```js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.example.com', // 后端服务实际地址
        changeOrigin: true,  // 表示是否更新代理后请求的 headers 中host地址
        pathRewrite: { '^/api': '' },  // 重写路径，去掉匹配路径中的 `/api`
        secure: true // 默认情况下不接收转发到https的服务器上，如果希望支持，可以设置为false
      }      
    }
  }
}
```