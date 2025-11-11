## package.json 里的 `dependencies` VS `devDependencies`

> 面试常考：区分这两个字段的含义、安装行为、部署影响，并举例说明常见包的归属。

### 核心区别速览
- `dependencies`：生产环境也必须存在的依赖，应用在运行时需要它们（框架、UI 库、HTTP 库等）。
- `devDependencies`：仅开发/构建阶段使用的工具（打包器、测试框架、Lint、类型检查等），最终产物不直接依赖。

| 对比项 | `dependencies` | `devDependencies` |
| --- | --- | --- |
| 安装命令 | `npm install xxx` 默认会写入 | `npm install xxx --save-dev`/`-D` |
| 生产部署 | `npm install --production` 或 `NODE_ENV=production` 时会安装 | 不会安装（除非显式加 `--include=dev`） |
| 包含内容 | 运行库、SDK、与业务运行直接相关的包 | 构建、打包、测试、校验、发布等辅助工具 |
| 打包/部署 | 通常会被打进 bundle 或部署到服务器 | 只在构建阶段使用，产物不会依赖 |
| 示例 | `vue`、`react`、`axios`、`lodash` | `vite`、`webpack`、`typescript`、`eslint`、`jest` |

### 安装行为
- 默认 `npm install` / `pnpm install` 会同时装 `dependencies` + `devDependencies`。
- 线上部署常使用 `npm ci --only=production` 或 `pnpm install --prod`，仅保留运行时依赖。
- CI 环境如果需要运行测试/构建，就必须安装 dev 依赖。

### 常见误区
- **把构建工具放进 `dependencies`**：增加线上体积，甚至暴露潜在安全风险。
- **把运行库放进 `devDependencies`**：部署时被省略，导致应用启动报错（`Cannot find module ...`）。
- **Monorepo**：根目录工具通常放在 dev；各子包运行时需要的包仍写在子包的 dependencies。

### 面试回答模板
1. 定义两者的作用域（运行 vs 开发）。
2. 提及安装行为与生产部署差异（`--production` 不装 dev）。
3. 举典型包示例，并提醒常见错误分类。这样既回答概念，又展现实践经验。