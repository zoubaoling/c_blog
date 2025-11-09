## 解释一下什么是 JSON？

> JavaScript Object Notation —— 一种轻量、文本式的数据交换格式。

### 核心特点
- 语言无关：几乎所有语言都内置或提供解析库，跨平台传输无障碍。
- 结构简单：仅支持 `Object`、`Array`、字符串、数字、布尔、`null` 基本类型。
- 可读性强：键值对形式，易写易懂，适合人机共读。
- 纯数据：本质上是字符串，不包含方法或逻辑，可存入 `.json` 文件、数据库、Cookie。

### 语法速览
```json
{
  "name": "Alice",
  "age": 28,
  "skills": ["JS", "React"],
  "active": true,
  "address": null
}
```

### 常用 API
- `JSON.parse(str)`: 把 JSON 字符串转为 JS 对象，若格式错误会抛出异常。
- `JSON.stringify(obj, replacer?, space?)`: 把对象序列化成 JSON 字符串，可通过 `replacer` 过滤字段，用 `space` 增加缩进便于调试。

### 典型场景
- **接口通信**：前后端返回/接收统一格式的数据。
- **配置驱动**：如 `package.json`、`tsconfig.json`。
- **数据持久化**：缓存、日志、离线数据存储。
- **结构化日志**：后端或前端埋点上传统一的 JSON 事件。

### 面试提示
- JSON 与 JS 对象的区别：JSON 为字符串；JS 对象是运行时数据结构。
- 注意循环引用、`undefined`、`Symbol` 等无法直接序列化。
- 了解 `localStorage`、`fetch`、`FormData` 等与 JSON 搭配使用的常见套路。