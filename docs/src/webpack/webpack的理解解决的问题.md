## 说说你对webpack的理解？解决了什么问题？
> `webpack`是一个用于现代JavaScript应用程序的`静态模块`打包工具

静态模块: 开发阶段可以被webpack直接引用的资源（可以直接被获取打包进bundle.js的资源）
处理过程: 在内部构建一个依赖图，此依赖图对应映射到项目所需的每个模块（不再局限js文件），并生成一个或多个 bundle

### 能力
- 模块打包：所有资源、依赖关系、打包
- Loader: 转换JS外的其他类型文件，使其能够被webpack识别打包--babel-loader css-loader file-loader url-loader
- Plugins: 扩展webpack的功能，可以涉及打包优化、环境变量注入、压缩、功能增强等--HtmlWebpackPlugin MiniCssExtractPlugin CleanWebpackPlugin
- 代码拆分: 将代码分割成chunks，这些chunks可以懒加载，从而加速初始加载时间。利用动态import()语句，可以实现组件级的懒加载
- HMR: 在开发运行时更新各种模块，而无需进行完全刷新, 提高开发效率
- 性能优化: 代码压缩 tree-shaking
- 跨平台兼容: babel将JS转义为向后兼容，确认各种浏览器中都正常运行
- 自定义配置
- 环境变量: mode--development  production  (process.env.NODE_ENV)
  - .env(.env.development .env.production)文件中定义变量 VUE_APP_XX -->> process.env.VUE_APP_XX
  - NODE_ENV可以在打包脚本中配置 dev build


### 解决的问题
- 模块依赖管理
  - 通过解析依赖关系，自动地将所需的模块打包成一个或多个 bundle，便于浏览器加载和解释
- 代码组织，以模块化的方式来开发
  - 有助于保持代码的结构清晰，还便于维护和测试
- 资源加载
	- 除JS外，还支持将HTML CSS 图片等资源文件转换为有效的模块。任何资源都可以看作模块
- 使用高级特性提高开发效率或安全性：ES6+ sass less ts
- 性能优化
  - 代码拆分、资源压缩、模块合并、树摇等，有助于减少应用的加载时间和运行时的性能开销
  - 只有用户实际需要的代码和资源才会被加载，从而提高了应用的整体性能
- 环境切换
  - 支持多种环境的构建配置(开发环境和生产环境),不同的环境指定不同的构建和优化策略
  - 在开发环境中启用热模块替换HMR提高开发效率，在生产环境中启用代码压缩和优化以提高应用性能
- 插件系统
  - 提供了高度的可扩展性，允许创建可重用的解决方案，解决打包过程中遇到的各种特定问题
  - 通过插件，开发者可以添加自定义功能到构建流程中，如自动生成 HTML 文件、清理构建目录、进行性能分析