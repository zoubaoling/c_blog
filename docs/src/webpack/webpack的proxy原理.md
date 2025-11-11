## Webpack DevServer Proxy 原理（面试速记）

> 目标：在开发环境解决浏览器同源策略带来的跨域限制，避免后端改动或本地手动配置 hosts。

### 核心原理
1. **本地开发服务器**：`webpack-dev-server` 启动后，本地运行在 `http://localhost:<port>`。
2. **代理中间件**：DevServer 内部使用 `http-proxy-middleware` 拦截前端发出的请求。
3. **请求转发**：当请求 URL 命中 `devServer.proxy` 的规则时，DevServer 不直接响应，而是把请求转发给目标后端（如 `http://api.example.com`）。
4. **返回给浏览器**：后端返回的响应再由 DevServer 转发给浏览器。
5. **为何不跨域**：
   - 浏览器只看到自己访问的是 `localhost`（同源），因此不会触发跨域限制。
   - 真正跨域的是 DevServer（一个 Node 服务）与后端的通信，服务器之间请求没有同源限制。

### 配置示例
```js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://api.example.com',   // 指向真实后端
        changeOrigin: true,                 // 修改请求头中的 host/origin
        pathRewrite: { '^/api': '' },       // 重写路径，把 /api 去掉
        secure: false,                      // 若目标是 https，设为 false 以允许自签名证书
        logLevel: 'debug',                  // 调试时可开启日志
      }      
    }
  }
}
```

### 常见配置说明
- **`target`**：代理目标后端地址，支持字符串或函数。
- **`changeOrigin`**：默认 false；为 true 时会把请求头的 `Host`、`Origin` 修改为目标地址，很多后端需要此设置。
- **`pathRewrite`**：在转发前修改请求路径，例如 `/api/user` → `/user`。
- **`secure`**：是否验证 https 证书；自签证书/测试环境常设为 false。
- **`ws`**：是否代理 websocket 请求（默认 false）。
- **`bypass`**：可自定义函数决定是否绕过代理，直接返回本地 mock。

### 面试答题模板
1. **先解释同源策略**：浏览器限制跨域，但服务器之间通信无此限制。
2. **说明 Proxy 流程**：本地 DevServer 接管请求 → 命中规则转发 → 后端响应再返回给浏览器。
3. **指出关键配置**：`target`、`changeOrigin`、`pathRewrite`、`secure` 等的作用与场景。
4. **补充实践经验**：提到调试 `logLevel`、代理 websocket (`ws: true`)、或临时 mock（`bypass`）。

掌握这套逻辑即可快速回答“为什么 proxy 能解决跨域”和“如何配置”。