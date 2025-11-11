## 你对 Webpack 的理解？它解决了什么问题

> Webpack 是一款“静态模块打包器”：把一切资源视为模块，依据依赖关系打包输出一个或多个 bundle，既能开发调试，又能优化上线产物。

### 核心能力
- **模块化打包**：自动分析 `import/require` 依赖，构建依赖图，输出 bundle；不仅限于 JS，CSS/图片/字体等都能纳入。
- **Loader 系统**：转换非 JS 资源（如 ESNext、TS、CSS 预处理）为可打包模块，例如 `babel-loader`、`css-loader`、`file-loader`。
- **Plugin 生态**：在生命周期钩子中扩展功能，如 `HtmlWebpackPlugin`、`DefinePlugin`、`MiniCssExtractPlugin`、`CompressionPlugin`。
- **代码拆分 & 懒加载**：支持 `splitChunks`、`dynamic import()`，按需加载减少首屏体积。
- **开发效率**：内置 DevServer、HMR，让模块热替换、实时刷新成为可能。
- **性能优化**：Tree Shaking、scope hoisting、代码压缩、资源压缩，帮助生成高性能产物。
- **环境配置**：`mode` 或自定义环境变量，实现开发/生产差异化构建（开启调试 vs 压缩优化）。

### 解决的问题
1. **复杂依赖管理**：无需人工维护 `<script>` 顺序或手动拷贝库，Webpack 自动根据依赖关系输出 bundle。
2. **资源模块化**：统一把 CSS/图片/字体/模板等转成 JS 模块，前端“万物皆模块”。
3. **现代语法兼容**：通过 Babel/TypeScript 等 Loader 将新语法编译为兼容代码，让开发与上线兼顾。
4. **构建自动化**：插件体系支持自动生成 HTML、注入环境变量、清理目录、压缩产物、分析体积等。
5. **性能与体验优化**：代码拆分、懒加载、Tree Shaking 缩减包体；HMR、SourceMap 提升开发体验。
6. **多环境构建**：针对 dev/prod/test 等环境提供差异化配置，使调试和上线策略更灵活。

### 面试答题建议
1. **先下定义**：Webpack 是模块打包器，构建依赖图并输出 bundle。
2. **列能力 + 举例**：Loader 转换、Plugin 扩展、代码拆分、HMR、优化手段等。
3. **说明解决的问题**：依赖管理、资源模块化、跨环境构建、性能优化。
4. **实践经验加分**：提到实际配置过的优化方案（如拆分 vendor、使用 `BundleAnalyzerPlugin`、按需加载）或团队场景。

这样回答既能展现对 Webpack 的整体认知，也能体现对具体功能的落地理解。