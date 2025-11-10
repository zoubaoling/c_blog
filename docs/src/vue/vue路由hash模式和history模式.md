## Vue 路由的 Hash 与 History 模式如何比较？

### 面试速记
- **Hash**：URL 里有 `#`，`#` 之后的内容不会发给服务器，依靠浏览器 `hashchange` 事件实现 SPA 跳转。
- **History**：使用 HTML5 的 `history.pushState/replaceState`，URL 更干净，但必须由后端或静态服务器兜底到 `index.html`，否则刷新/直达会 404。

### 主要差异
| 对比项 | Hash 模式 | History 模式 |
| --- | --- | --- |
| URL 形态 | `https://xxx.com/#/login` | `https://xxx.com/login` |
| 与服务器交互 | `#` 后内容不发送到服务器，天然避免 404 | 需要服务器配置 `try_files` 等将任意路径重定向到入口文件 |
| 浏览器支持 | 兼容 IE9 及更低版本 | 依赖 HTML5 History API，现代浏览器支持 |
| SEO | 搜索引擎通常忽略 `#` 后的内容，SEO 较差 | 更符合语义 URL，SEO 更友好，需要预渲染/SSR 配合 |
| 前端实现 | 监听 `hashchange` 即可 | 需监听 `popstate` 并自行处理导航守卫 |
| 历史记录控制 | 通过修改 `location.hash` | 使用 `pushState`、`replaceState` 可添加/替换历史记录 |

### 优缺点总结
- **Hash 模式优点**：无需额外服务端配置、兼容性好、实现简单。缺点是 URL 不美观、SEO 差、可能受浏览器限制（如长度受限）。
- **History 模式优点**：URL 语义好、可自定义状态对象、能配合 SSR/预渲染提升 SEO。缺点是需要服务端配合，老旧浏览器不支持。

### 选择建议
1. **快速上线/静态托管/无需 SEO**：选 Hash，省去服务器改造。
2. **对外产品/要求 SEO**：选 History，并确保服务器加 SPA fallback（如 Nginx `try_files $uri $uri/ /index.html;`）。
3. Vue Router 默认模式是 Hash；在创建 Router 时 `createWebHashHistory()` vs `createWebHistory()`，面试时可以顺便提及。

### 延伸提问可能
- 如何配置 Nginx/Apache 以支持 History 模式？（答：所有路径回退到 `index.html`）
- `pushState` 和 `replaceState` 的区别？（答：是否新增历史记录 + 可携带 `state` 数据）
- SSR/静态预渲染如何与 History 模式配合？（强调 SEO 场景）
- Vue Router 4 中还有 `createMemoryHistory`，用于非浏览器环境（如 SSR）。