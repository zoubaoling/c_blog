## 如何提升 webpack 构建速度（面试速记）

### 一、Loader 减负
- **限定范围**：`include/exclude` 确保 Loader 只处理必要文件，避免全量扫描。
- **缓存结果**：如 `babel-loader` 开启 `cacheDirectory`，`vue-loader`/`ts-loader` 支持 `cache-loader`，减少重复编译。

### 二、解析优化（Resolve）
- **alias**：为常用路径配置别名（`@`、`components`），降低递归查找开销。
- **extensions**：精简扩展名列表并优先常用项（`.js`、`.json`），减少多余文件系统访问。
- **noParse**：对无需解析依赖的库（如 `jquery`）设置 `module.noParse`，跳过 AST 构建。
- **modules**：自定义模块查找目录（如 `resolve.modules = ['src', 'node_modules']`），减少搜索层级。

### 三、构建范围与依赖
- **拆分构建**：使用 `DllPlugin`（老项目）或 `SplitChunks`、按需加载模块。
- **忽略本地化/多余依赖**：`IgnorePlugin`（例如去掉 moment 的语言包）。

### 四、开发环境提升
- **SourceMap**：合理选择 `devtool`（`cheap-module-source-map`/`eval-source-map`）在速度与调试间折中。
- **HMR + 缓存**：开启 `HotModuleReplacementPlugin`；借助 `webpack-dev-server` 缓存（`hot`、`liveReload`）。
- **增量编译**：`watchOptions.ignored` 排除变化少的目录，如 `node_modules`。

### 五、硬件与并行
- **多进程 Loader**：如 `thread-loader`、`HappyPack`（针对 Babel、TS 编译）。
- **持久化缓存**：Webpack 5 自带 `cache: { type: 'filesystem' }`，减少启动冷启动时间。

### 面试总结套路
1. 先说“减少重复工作”：限定 Loader、使用缓存、持久化缓存。
2. 再说“减少解析成本”：alias、extensions、noParse、IgnorePlugin。
3. 补充“开发模式优化”：HMR、合适的 SourceMap、watch 配置。
4. 若有实践经验，提项目具体方案：如 `cache-loader`、`thread-loader`、`SplitChunks` 优化案例。