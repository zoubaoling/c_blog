import{_ as e,c as a,o as t,a3 as l}from"./chunks/framework.BmlUaO9n.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"webpack/webpack热更新如何做的.md","filePath":"webpack/webpack热更新如何做的.md","lastUpdated":1715657339000}'),o={name:"webpack/webpack热更新如何做的.md"},c=l('<h2 id="说说webpack的热更新是如何做到的-原理是什么" tabindex="-1">说说webpack的热更新是如何做到的？原理是什么？ <a class="header-anchor" href="#说说webpack的热更新是如何做到的-原理是什么" aria-label="Permalink to &quot;说说webpack的热更新是如何做到的？原理是什么？&quot;">​</a></h2><blockquote><p>HMR(Hot Module Replacement)模块热更新，在应用程序运行过程中替换、添加、删除模块，只将修改的模块实时替换到应用中，而无需重新刷新整个应用</p></blockquote><p>配置：devServer.host:true <em>CSS能默认支持热更新，而JS仍然是自动刷新(整个页面)，不是开箱即用，需要额外的操作</em></p><h3 id="原理" tabindex="-1">原理 <a class="header-anchor" href="#原理" aria-label="Permalink to &quot;原理&quot;">​</a></h3><p>基础：webpack-dev-server创建两个服务器：静态资源的服务和Socket服务</p><ul><li>Bundle Server: 负责直接提供静态资源的服务（打包后的资源直接被浏览器请求和解析）</li><li>Socket Server: 是一个 websocket 的长连接，双方可以通信,在HMR Server和HMR Runtime间建立连接</li></ul><p><strong>启动阶段</strong></p><ol><li>Webpack Compile将源代码和HMR Runtime一起编译成bundle文件，传输给Bundle Server静态资源服务器</li><li>浏览器请求和解析bundle文件</li></ol><p><strong>更新阶段</strong></p><ol><li>某个文件或者模块变化时，webpack监听到文件变化重新编译打包，并生成唯一的hash值，作为下次热更新的标识</li><li>根据变化的内容生成两个补丁文件: chunk.js模块和manifest(hash + chunkId,说明变化的内容)</li><li>文件变化时，socket服务器会将生成的Hash值从服务端推送给浏览器，浏览器会和上一次的对比</li><li>如果hash变化，浏览器发送Ajax请求获取manifest文件，拿到变动内容：hash + chunk.js</li><li>浏览器拿到两个新的文件后，通过HMR runtime机制，加载这两个文件，并且针对修改的模块进行更新</li></ol>',10),r=[c];function i(s,n,p,_,d,h){return t(),a("div",null,r)}const b=e(o,[["render",i]]);export{u as __pageData,b as default};
