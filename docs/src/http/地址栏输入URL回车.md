## 地址栏输入 URL 后发生了什么？

### 流程总览
1. **用户输入**：解析 URL，识别协议、域名、端口、路径、查询参数、片段。
2. **浏览器缓存策略**：检查 HSTS、HTTP 缓存、Service Worker 等，命中则直接返回。
3. **DNS 解析**：从浏览器缓存 → 操作系统缓存 → hosts → 运营商/公共 DNS → 根/顶级域/权威服务器逐级查找，得到目标 IP。
4. **建立连接**：
   - TCP 三次握手。
   - 若 HTTPS，还要进行 TLS 握手（协商加密套件、验证证书、生成对称密钥）。
5. **发送 HTTP 请求**：浏览器构造请求行、请求头、可选请求体；携带 Cookie/Token 等凭证。
6. **服务器处理**：负载均衡 → 反向代理 → 应用服务器 → 业务逻辑（查询数据库、调用接口等）。
7. **返回响应**：状态码、响应头（缓存、压缩、CORS）、响应体（HTML/CSS/JS/JSON 等）。
8. **浏览器渲染**：
   - 解析响应头：重定向、缓存、压缩解码（gzip/br）。
   - 构建 DOM 树、CSSOM 树，合并成渲染树。
   - 布局（Layout/Reflow）→ 绘制（Paint）→ 合成层（Composite）。
   - JS 执行：下载 → 解析 → 编译 → 执行；可能触发回流/重绘。
   - 资源加载：遵循优先级、预加载机制；HTTP/2 多路复用可能并发下载。
9. **后续工作**：持久连接复用（HTTP/1.1 keep-alive / HTTP/2）、缓存写入、预加载下一页面资源等。

---

### 关键节点详解
- **缓存命中**：
  - 强缓存（`Cache-Control: max-age`、`Expires`）。
  - 协商缓存（`ETag/If-None-Match`、`Last-Modified/If-Modified-Since`）。
  - Service Worker 可拦截请求本地响应。
- **DNS 优化**：DNS Prefetch、HTTPDNS、缓存 TTL。
- **TCP/TLS**：
  - 三次握手：`SYN → SYN/ACK → ACK`。
  - TLS1.3 一次往返；证书链验证；会话复用（Session Resumption）。
- **HTTP 请求**：
  - 方法（GET/POST 等）、头部（Accept、Cookie、User-Agent）。
  - HTTP/2 头部压缩、多路复用；HTTP/3 基于 QUIC（UDP）。
- **渲染优化**：
  - 关键渲染路径 (Critical Rendering Path)。
  - defer/async 脚本、预加载（`<link rel="preload">`）、懒加载。
  - CSS 阻塞渲染，JS 会阻塞 DOM 解析（除非 async/defer）。
- **安全**：HSTS 强制 HTTPS、CSP 内容安全策略、防 XSS/CSRF。

---

### 面试回答模板
1. **一句话概述**：输入 URL → 浏览器查缓存 → DNS 解析 → 建立 TCP/TLS → 发送 HTTP 请求 → 服务器响应 → 浏览器渲染 → 显示页面。
2. **步骤拆解**：
   1. URL 解析 & 浏览器缓存判断。
   2. DNS 解析（缓存顺序 + 递归/迭代）。
   3. TCP 三次握手 / TLS 握手。
   4. 发送请求 + 服务器处理。
   5. 返回响应：状态码、头、体。
   6. 渲染流程（HTML/CSS/JS）。
   7. 后续优化（缓存、长连接、预加载）。
3. **技巧提升**：提项目中的优化点，如 DNS 预解析、CDN、HTTP/2、Service Worker、首屏优化。

---

### 参考
- [MDN：从输入 URL 到页面呈现](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work)
- [Google Web Fundamentals](https://developers.google.com/web/fundamentals/performance/critical-rendering-path)

   