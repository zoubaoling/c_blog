## 说说如何借助webpack来优化前端性能？
1. tree-shaking: mode: production开启,使用ES6模块语法，打包时删除未引用的代码，减少最终bundle的大小
2. 减少解析成本: resolve.alias resolve.extensions
3. 使用CDN加速，配置externals来设置为外部依赖，利用CDN的缓存和速度
4. 代码分割: 将代码分离到不同的bundle中，然后按需加载或者并行加载，提高代码的加载性能----已默认支持splitChunksPlugins插件，只需配置optimization.splitChunks
  - chunks: 'all|async｜initial'，默认支持异步，动态导入import()的模块分割成独立的chunk，需要的时候才加载
  - minChunks: number被引入的次数，默认是1，大于指定次数会被分割成独立的chunk
  - minSize｜maxSize拆分包的限制，超出限制不会拆分
5. 图片压缩
  - image-webpack-loader
6. css代码压缩: css-minimizer-webpack-plugin(vue-cli内置),基于postcss，优化和压缩Css文件，比如去除空白符和注释、优化CSS语法
7. JS代码压缩: TerserWebpackPlugin(vue-cli内置)，生产模式下去除无用代码、压缩变量名、删除死代码和注释等
8. html代码压缩: HtmlWebpackPlugin(vue-cli内置)，生成HTML时可选压缩项，压缩空白字符、删除注释

代码压缩如果要自定义添加配置在optimization: { minimize: true, minimizer: [] }