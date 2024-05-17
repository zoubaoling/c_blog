## vite官网阅读记录要点
1. 源码启用协商缓存，依赖启用强缓存
2. 开发环境esbuild编译，生产环境rollup打包
3. vite的插件API与esbuild作为打包器不兼容
4. 预构建，esbuild将CommonJS/UMD转为ESM,提高加载速度
5. 重写导入(import)为合法的Url
6. vite默认转义(esbuild).ts文件，但是ts转义和ts静态检测是分开的，静态检测需要整个依赖图，会降低速度
7. 生产：tsc --noEmit; 开发: tsc --noEmit --watch 或 vite-plugin-checker浏览器中查看上报的类型错误
8. import.meta.env import.meta.hot
9. vite通过postcss-import预内置支持css的@import
10. x.module.css是一个css modules文件，返回一个模块对象,可以操作对象
11. vite内置了对预处理器的支持，不需要安装插件，但是需要安装预处理器依赖
12. import otherStyles from './bar.css?inline'，添加?inline样式不会注入页面，而是按名导入
13. import xx from 'xxx?[url, raw, worker, worker&inline]'; url- 解析后的URL，raw- 加载资源的字符串形式内容
14. import.meta.glob支持导入多个模块: const modules = import.meta.glob('./dir/*.vue'), 批量导入dir下的所有vue文件
      - eager: import.meta.glob('', { eager: true }) 静态导入，默认导入是懒加载：() => import(XXX) > module1.then()
      - `['./dir/*.js', './dir2/*.js']`: 数组形式支持多个匹配
      - { import: 'setup | default'}: 支持加载指定部分内容
      - `'!**/a.js'`反向匹配，忽略
      - `{query: '?raw|url'}`
      - 所有参数必须是字面量，不可以用变量或表达式
15. 字面量动态导入: await import(`./dir${file}.js`)，变量只支持一层，深层会失败
16. node.js中可以通过import导入模块
17. vite预置css代码分割功能，除非关闭否则不需要显示配置--将异步chunk模块中的css抽离成一个单独文件，chunk加载完成后通过Link引入，chunk在css加载完成后再执行
18. 首次执行vite,进行依赖预构建：1. CommonJS和UMD转换ESM 2. 将有许多内部模块的ESM依赖转换为单个模块，比如Lodash内部有几百个内置模块，会发几百个请求，预构建为单个模块，只需要一个请求
19. new URL得到完整解析的静态资源URL: `new URL('', import.meta.url).href`,生产构建时URL需要是静态的
20. public目录在项目根目录
      - 不应该被JS文件引用
      - 必须使用绝对路径(/)引入资源：public/icon.png > /icon.png--
      - 打包时会被复制到目标目录的根目录下
      - 不会被源码引用，保持原有文件名，不会被hash,只是想引用URL
21. 公共基础路径：import.meta.env.BASE_URL
22. build.rollupOptions自定义构建
23. external
24. 环境变量:import.meta.env，构建时被静态替换 import.meta.env.[MODE, BASE_URL, PROD, DEV, SSR]
25. .env文件，添加额外的环境变量
      - .env.[mode] .env.local .env.[mode].local; .local被Git忽略；.[mode]指定模式加载
      - .env[mode] > .env
      - VITE_xx开头的变量才能被源码访问到，且会转换为字符串
26. import.meta.env.xxx > html: `%MODE% %VITE_API_URL%`
27. vite默认开发模式，vite build默认生产模式 --mode MODE_ENV=