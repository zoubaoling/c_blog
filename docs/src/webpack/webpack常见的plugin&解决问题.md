## Webpack 常见 Plugin 与解决问题

> Plugin 负责扩展 Webpack 的编译流程。与 loader 只处理单个文件不同，插件能够在任意生命周期钩子上注入逻辑，完成优化、生成资源、注入变量等任务。

### Plugin 的共性
- **基于钩子系统**：Webpack 使用 tapable 广播事件，插件可在 `compiler` 或 `compilation` 的任意阶段介入。
- **高度可定制**：可以自动化清理目录、生成 HTML、注入环境变量、压缩代码、按需拆分 chunk 等。
- **与 Loader 协同**：Loader 转换文件，Plugin 统筹整个构建流程，处理 Loader 无法覆盖的场景。

### 配置示例
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' })
  ]
}
```

### 常见 Plugin 速查

| 插件 | 主要解决的问题 | 关键点 |
| --- | --- | --- |
| `HtmlWebpackPlugin` | 打包时自动生成 HTML，并注入打包后的 JS/CSS | 支持模板、title、meta 注入；与 `html-loader` 结合处理资源引用 |
| `CleanWebpackPlugin`（或 `output.clean: true`） | 构建前清理旧文件，保持输出目录整洁 | 避免遗留历史构建产物 |
| `DefinePlugin`（内置） | 在编译阶段注入全局常量，如环境变量 | 值会被直接替换到代码里，需使用 JSON.stringify |
| `MiniCssExtractPlugin` | 将 CSS 抽离成独立文件，便于缓存 | 开发用 `style-loader`，生产用该插件抽离 |
| `HotModuleReplacementPlugin`（内置） | 支持 HMR，提升开发体验 | 结合 devServer，实现代码热替换 |
| `TerserWebpackPlugin` | 压缩 JS（Webpack5 默认使用） | 支持去除 console、多线程压缩、source map 控制 |
| `CssMinimizerPlugin`（Webpack5 推荐） | 压缩 CSS，替代旧的 `optimize-css-assets-webpack-plugin` | 与 `MiniCssExtractPlugin` 联合使用 |
| `CopyWebpackPlugin` | 原样复制静态资源到输出目录 | 适合公共文件、第三方库、mock 数据等 |
| `BundleAnalyzerPlugin` | 分析 bundle 体积，查定位量大包 | 构建后生成可视化报告 |
| `ProvidePlugin`（内置） | 解决全局变量引入（如 $、React 等） | 避免手动 import，但不建议滥用 |
| `CompressionWebpackPlugin` | 生成 gzip/br 压缩文件，供服务器按需开启 | 生产环境常用，配合 CDN/服务器配置 |

### Plugin 编写示例
```js
class ConsoleLogPlugin {
  apply(compiler) {
    compiler.hooks.run.tap('ConsoleLogPlugin', () => {
      console.log('[Webpack] 构建开始…')
    })

    compiler.hooks.done.tap('ConsoleLogPlugin', stats => {
      const time = stats.endTime - stats.startTime
      console.log(`[Webpack] 构建结束，用时 ${time}ms`)
    })
  }
}
module.exports = ConsoleLogPlugin
```

- `compiler`：全局编译对象。常用钩子有 `run`、`compile`、`emit`、`done`。
- `compilation`：某一次构建的上下文。可在 `compilation.hooks.processAssets.tap` 等处读取/修改产物。

### 面试应答模板
1. 先说明 Loader vs Plugin 的职责差异（Loader 转换文件，Plugin 扩展流程）。
2. 按功能举例：**生成 HTML**、**抽离 CSS**、**压缩优化**、**注入环境变量**、**分析 bundle** 等。
3. 若被深挖，描述 tapable 钩子机制：`compiler.hooks.xxx.tap('PluginName', handler)`。
4. 分享实践经验：如生产构建 `MiniCssExtractPlugin + CssMinimizerPlugin`、`DefinePlugin` 注入环境变量、`BundleAnalyzerPlugin` 排查包体积等。

掌握这些插件的作用与搭配方式，可在面试中快速阐述 Webpack 构建链路的优化思路。


