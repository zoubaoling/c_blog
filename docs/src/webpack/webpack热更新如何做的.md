## 说说webpack的热更新是如何做到的？原理是什么？
> HMR(Hot Module Replacement)模块热更新，在应用程序运行过程中替换、添加、删除模块，只将修改的模块实时替换到应用中，而无需重新刷新整个应用

配置：devServer.host:true

*CSS能默认支持热更新，而JS仍然是自动刷新(整个页面)，不是开箱即用，需要额外的操作*

### 原理
基础：webpack-dev-server创建两个服务器：静态资源的服务和Socket服务
  - Bundle Server: 负责直接提供静态资源的服务（打包后的资源直接被浏览器请求和解析）
  - Socket Server: 是一个 websocket 的长连接，双方可以通信,在HMR Server和HMR Runtime间建立连接
  
**启动阶段**
1. Webpack Compile将源代码和HMR Runtime一起编译成bundle文件，传输给Bundle Server静态资源服务器
2. 浏览器请求和解析bundle文件

**更新阶段**
1. 某个文件或者模块变化时，webpack监听到文件变化重新编译打包，并生成唯一的hash值，作为下次热更新的标识
2. 根据变化的内容生成两个补丁文件: chunk.js模块和manifest(hash + chunkId,说明变化的内容)
3. 文件变化时，socket服务器会将生成的Hash值从服务端推送给浏览器，浏览器会和上一次的对比
4. 如果hash变化，浏览器发送Ajax请求获取manifest文件，拿到变动内容：hash + chunk.js
5. 浏览器拿到两个新的文件后，通过HMR runtime机制，加载这两个文件，并且针对修改的模块进行更新
