## 说说webpack中常见的Plugin？解决了什么问题
> plugin赋予其各种灵活的功能，解决loader无法实现的其他事, 运行在webpack的不同阶段（钩子/生命周期），贯穿了webpack整个编译周期

**解决的问题：**
  - 环境变量注入
  - 代码分割
  - 自动刷新和HMR
  - 优化资源，打包优化
  - 生成静态资源

配置
```js
module.exports = {
  ...
  plugins: [
    new HtmlWebpackPlugin({template: ''})
  ]
}
```
### 特性
1. `钩子系统`：Webpack提供了一个丰富的钩子系统，允许插件在构建过程的不同阶段介入，执行操作（如优化、定义变量等）
2. `定制性和灵活性`：通过插件，可以定制和扩展Webpack的功能，包括但不限于加载、打包、输出等过程
3. `自动化任务`：插件可以自动化许多构建相关的任务，提高效率，减少重复劳动

### 常见的Plugin
- HtmlWebpackPlugin: 打包结束后，根据指定模版文件⾃动生成⼀个html文件，并把打包生成的js和CSS模块引⼊到html中---title filename template <%=htmlWebpackPlugin.options.XXX%>
- clean-webpack-plugin: 每次构建前清理/删除构建文件夹，保证输出目录中只有用到的文件
- mini-css-extract-plugin: 提取 CSS 到一个单独的文件中--MiniCssExtractPlugin.loader; new MiniCssExtractPlugin({ filename: '[name].css' })
- copy-webpack-plugin: 复制文件或目录到构建目录-- from to globOptions.ignore; vue-cli中需要手动添加
- DefinePlugin: 在编译时创建配置的全局对象，是一个webpack内置的插件，不需要安装--- new DefinePlugin({ BASE_URL: './' }) >>> <link rel="icon" href="<%= BASE_URL%>favicon.ico>"
- terser-webpack-plugin: 压缩JS，移除无用代码。
- optimize-css-assets-webpack-plugin: 优化和压缩CSS资源
- HotModuleReplacementPlugin: HMR


### 实现
本质是一个包含apply方法的js对象，会被webpack compiler调用，整个编译声明周期都可以访问编译对象
```js
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';
class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    // hooks.entry-option|run|compile|compilation||after-compile|emit|after-emit|done|failed
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log('webpack 构建过程开始！');
    });
  }
}
module.exports = ConsoleLogOnBuildWebpackPlugin;
```


