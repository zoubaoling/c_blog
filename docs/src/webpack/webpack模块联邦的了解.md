## 说说你对 webpack5 模块联邦的了解
`模块联邦（Module Federation）`
  - 允许一个JS应用动态地运行来自另一个应用的代码，无需重新编译或重新部署, 从而共享模块和代码，在微前端架构中尤其有用
  - 可以使不同团队独立开发和部署应用的部分（子应用或组件），然后这些独立部署的部分可以被合并成一个单一的应用

### 工作原理
核心思想是允许构建时将应用分解成独立的、可以独立加载的部分。每个部分（称为容器）都可以独立构建，拥有自己的依赖，它们可以暴露给其他容器使用，或者消费其他容器暴露的模块

**主要组件**
- Host（宿主）：加载其他远程容器中的模块的应用
- Remote（远程）：暴露模块给宿主或其他远程使用的应用

**使用**
- ModuleFederationPlugin
- remote: name(应用名称) filename(远程入口文件名) expose: object(暴露的组件), shared(共享的库，避免重复打包)
- host: `name shared remotes: { remoteApp: name@url/filename }`
  
**示例**

remote
```js
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'app_remote', // 远程应用的名称
      filename: 'remoteEntry.js', // 远程入口文件名
      exposes: {
        './Button': './src/Button', // 暴露 Button 组件 -> app_remote/Button
      },
      shared: ['react', 'react-dom'], // 声明共享的库，避免重复打包
    }),
  ],
};
```

host
```js
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'app_host',
      remotes: {
        remoteApp: 'app_remote@http://localhost:3001/remoteEntry.js', // 从哪里加载远程应用
      },
      shared: ['react', 'react-dom'],
    }),
  ],
};
```

### 主要优势
  - 多个应用程序之间可以共享代码和模块，从而减少重复代码量
  - 应用程序可以更加灵活地划分为更小的子应用程序，从而降低应用程序的复杂度
  - 独立部署：各个团队可以独立开发和部署自己的应用部分，不需要等待其他部分完成
  - 可以支持应用程序的动态加载和升级，从而实现更好的版本管理和迭代。
  - 可以避免在应用程序之间传递大量数据，从而提高应用程序的性能和效率。