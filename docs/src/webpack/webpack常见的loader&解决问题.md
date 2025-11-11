## Webpack 常见 Loader 与对应问题

> 核心思路：Webpack 只原生理解 JS/JSON。其余资源都要通过 Loader 转换成模块，因此“Loader = 转换器”。

### Loader 的共性
- **链式执行**：同一资源可配置多个 loader，从右到左（自后向前）处理。
- **同步/异步皆可**：支持 `return` 或 `this.callback`。
- **运行在 Node.js 环境**，只负责转换源码，不会生成额外文件（除 `emitFile`）。
- **可组合 Plugin**：部分 loader 通过插件扩展（如 PostCSS + autoprefixer）。

### 配置示例
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',      // 把 CSS 注入到 <style>
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader'     // 可自动补全前缀或启用未来语法
        ]
      }
    ]
  }
}
```

### 常见 Loader 及解决的问题

| Loader | 主要作用 | 解决的问题 / 补充说明 |
| --- | --- | --- |
| `style-loader` | 将编译后的 CSS 通过 `<style>` 标签插入页面 | 适合开发环境热更新；生产可换成 `MiniCssExtractPlugin.loader` 抽离 CSS |
| `css-loader` | 解析 `@import` / `url()`，将 CSS 转换为 JS 模块 | 让 CSS 可以和 JS 一样被 `import`，并处理依赖关系 |
| `less-loader` / `sass-loader` | 预处理语言 → CSS | 支持 Less/Sass 语法；常与 `postcss-loader`、`css-loader` 搭配 |
| `postcss-loader` | 利用 PostCSS 插件对 CSS 做二次处理 | 常用插件：`autoprefixer`（补前缀）、`postcss-preset-env`（启用未来语法）、`cssnano`（压缩） |
| `babel-loader` | 调用 Babel 将 ES6+/TSX 等转换成兼容 JS | 解决兼容性问题，可结合 `@babel/preset-env`、`core-js` 做按需 polyfill |
| `ts-loader` / `babel-loader` + `@babel/preset-typescript` | TypeScript → JS | 选择 TS 官方编译器或 Babel 方案；根据需求决定类型检查方式 |
| `file-loader`（Webpack 5 推荐 `type: 'asset/resource'`） | 将文件复制到输出目录，返回 URL | 处理图片、字体等静态资源，支持自定义文件名与路径 |
| `url-loader`（Webpack 5 推荐 `type: 'asset/inline'`） | 小文件内联为 base64，大文件走 file-loader | 减少请求数，同时保留按大小分流的能力 |
| `html-loader` / `html-minify-loader` | 解析 HTML 中的资源引用、可压缩 HTML | 配合 `HtmlWebpackPlugin` 使用，支持压缩、处理 `<img src>` 等 |
| `vue-loader` / `@ngtools/webpack` 等 | 解析框架单文件组件 | 让 `.vue`、`.svelte` 等文件被识别并分离出模板、脚本、样式 |
| `raw-loader` / `json5-loader` 等 | 将任意文本/格式转成字符串/对象 | 适合加载自定义文本、配置文件等 |

### 面试回答模板
1. 先说明 Loader 的职责（资源转换）+ 执行顺序（链式，从右到左）。
2. 按类别举例：样式相关（style/css/postcss）、预处理（less/sass）、脚本（babel/ts）、资源（url/file）、模板（html/vue）。
3. 补充 Loader 的典型场景/问题：兼容性、减少请求、模块化资源、支持框架等。
4. 若被追问，可深入讲 `postcss-loader` 插件配置、`url-loader` 的 `limit` 参数、Webpack5 的 `asset module` 替代等。

掌握这些 Loader 的用途与搭配方式，就能在面试中快速展示对 Webpack 构建链路的理解。