## 说说Loader和Plugin的区别？编写Loader，Plugin的思路
### 区别
- loader是一个转换器，将非JS文件转换成webpack能识别的文件，从而实现资源模块化；plugin是对loader功能的扩展
plugin 赋予了 webpack 各种灵活的功能，例如打包优化、资源管理、环境变量注入等，目的是解决 loader 无法实现的其他事
- loader运行在打包文件之前，plugins在整个编译周期都起作用，在Webpack生命周期中会广播许多事件，Plugin可以监听这些事件，在合适的时机通过Webpack提供的API改变输出结果

### 编写
- loader本质是一个函数,返回loader处理后的文件内容
  - 函数接受一个参数，为webpack传递过来的文件源内容
  - this是webpack提供的对象，不能写为箭头函数
  - 异步操作：this.callback(error, returnContent: string | Buffer, sourceMap, ast)
- plugin本质是一个包含apply方法的对象
  - apply方法接受一个参数，为webpack的compiler对象
  - webpack基于发布订阅模式，插件可以监听这些事件，执行自己的任务
  - compiler: webpack的配置信息(options loader plugin 生命周期钩子), compilation: plugin内置事件回调，包含当前的模块资源、编译生成资源、变化的文件及被跟踪依赖的状态信息
  - emit发生时，源文件的转换和组装已经完成

**语法**
```js
module.exports = function (source) {
  // transfer source content
  const content = source
  this.callback(null, content) // 异步
  return content // 同步
}
```
**plugin**
```js
class MyPlugin {
  apply (compiler) {
    // hooks.entry-option|run|compile|compilation||after-compile|emit|after-emit|done|failed
    compiler.hooks.emit.tap('MyPluginName', compilation => {
      // do something
    })
  }
}
```
#### 示例
**loader: md转为html**
```js
const markdownIt = require('markdown-it')();
module.exports = function(markdown) {
  // 将 Markdown 转换为 HTML
  const html = markdownIt.render(markdown);
  // 返回标准的 JavaScript 模块字符串
  return `module.exports = ${JSON.stringify(html)};`;
};

```

**plugin: 输出构建耗时**
```js
class BuildTimePlugin {
  apply(compiler) {
    compiler.hooks.done.tap('BuildTimePlugin', (stats) => {
      // 计算并输出构建时间
      const buildTime = stats.endTime - stats.startTime;
      console.log(`Build completed in ${buildTime} ms`);
    });
  }
}
module.exports = BuildTimePlugin;
```
