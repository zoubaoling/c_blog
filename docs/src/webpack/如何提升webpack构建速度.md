## 如何提高webpack的构建速度
1. 优化loader配置
     - 限制loader的文件范围：include exclude确定范围，避免不必要的文件处理
     - 缓存loader转换的结果， options.cacheDirectory, 比如babel-loader这样的资源密集型，可以避免每次构建时重新编译已处理过的文件(文件没有改变就直接从缓存读取)
2. 只构建需要的东西
     - 减少解析：resolve.extensions和resolve.alias减少文件解析时间
       - alias通过配置别名减少路径查找的复杂性和步骤，减少目录解析可能涉及的磁盘操作
       - extensions默认是[.js, .json]，通过指定的类型从左往右查找解析对应文件。缩减扩展名列表和优化扩展名的顺序来减少不必要的文件系统访问，加快解析速度
     - 排除不需要处理的模块: module.noParser: /jquery|lodash/，配置的文件或模块不会进行依赖解析，需要确保排除的文件或库不依赖其他模块，否则会导致运行时错误
3. 开发环境优化
     - devtool: cheap-eval-source-map(`eval`: 不生成单独的sourcemap文件，模块末尾通过Data URL内联，会大但快; `cheap`: 只包含行，不包含列;)
     - 开启HMR，更新模块，不完全刷新devServer.hot:true--开发模式下默认开启
4. 使用cache-loader
     - 开销较大的loader前添加cache-loader，可以将结果缓存到磁盘，提高第二次构建速度。（保存和读取缓存会有时间开销，所以只对开销较大的Loader使用）
5. 优化resolve.modules
     - 配置哪些目录下去找第三方模块，减少搜索步骤