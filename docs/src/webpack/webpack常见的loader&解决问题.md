## 说说webpack中常见的Loader？解决了什么问题
> webpack只认识js和json文件，像css|less|png等文件，在import时loader会对这些文件进行转换翻译使得webpack能继续处理。所以任何文件都可以看作模块

**配置**
```js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: [ { loader: 'style-loader' } ]}
    ]
  }
}
```
**特性**
1. 链式调用，loader会处理之前已经处理过的资源。执行顺序为从右向左、从下向上
2. 可以同步，也可以是异步
3. plugin可以为Loader带来更多的特性
4. 运行在NodeJS中
5. 转换和预处理功能：ts > js; sass/scss > css
6. 非JS文件模块化
  
### 常见的loader
  - style-loader: 将css通过注入style标签添加到DOM，结合css-loader，将其生成的内容，用style挂载到head中
  - css-loader :解析CSS文件中@import和url()为import/require() 方式，解析它们所依赖的资源并合并成一个CSS
  - less-loader: less > css
  - sass-loader: sass > css
  - postcss-loader: 用postcss来处理CSS,自动化添加浏览器前缀(plugin: autoprefixer)、使用最新的CSS语法（转换向下兼容）(plugin: postcss-plugin-env)、优化压缩(plugin: cassnano)
    - 结合各种插件:postcss.config.js postcss-loader>options>postcssOptions>plugins
  - file-loader: 把识别出的资源模块(图片、字体)，移动到指定的输出⽬目录，并返回这输出目录的地址(字符串)
  - url-loader: 可以做file-loader所有事情，但是可以设置文件limit大小限制，小于限制可以转成base64格式的字符串并打包到JS中（1M: 1024 * 1024）
  - babel-loader: ES6+ 的代码转换成向后兼容的JS代码，兼容旧的浏览器或环境
  - html-minify-loader: 压缩HTML