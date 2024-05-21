import{_ as t,c as e,o as l,a5 as i}from"./chunks/framework.B102yH4G.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"http/即时通信几种方案.md","filePath":"http/即时通信几种方案.md","lastUpdated":1716005365000}'),o={name:"http/即时通信几种方案.md"},a=i('<h2 id="即时通讯的实现-短轮询、长轮询、sse-和-websocket-间的区别" tabindex="-1">即时通讯的实现：短轮询、长轮询、SSE 和 WebSocket 间的区别？ <a class="header-anchor" href="#即时通讯的实现-短轮询、长轮询、sse-和-websocket-间的区别" aria-label="Permalink to &quot;即时通讯的实现：短轮询、长轮询、SSE 和 WebSocket 间的区别？&quot;">​</a></h2><ol><li><code>短轮询</code>: 浏览器每隔一段时间向浏览器发送http请求，服务器端在收到请求后，不论是否有数据更新，都直接进行响应 <ul><li>比较简单，易于理解</li><li>需要不断的建立 http 连接，浪费了服务器端和客户端的资源。当用户增加时，服务器端的压力就会变大</li></ul></li><li><code>长轮询</code>: <ul><li>客户端发送请求后，服务器不立即响应，将请求刮起，服务器检测到数据更新时或达到超时时才返回响应。客户端处理完响应后，立即发起新的请求，重新建立连接</li><li>长轮询和短轮询比起来，明显减少了很多不必要的 http 请求次数，相比之下节约了资源。长轮询的缺点在于，连接挂起也会导致资源的浪费。</li></ul></li><li><code>SSE</code>： 服务器使用流信息向服务器推送信息-视频播放 <ul><li>严格地说，http 协议无法做到服务器主动推送信息。但是服务器向客户端声明，接下来要发送的是流信息，会连续不断地发送过来</li><li>客户端不会关闭连接，会一直等着服务器发过来的新的数据流</li><li>基于 http 协议，目前除了 IE/Edge，其他浏览器都支持</li><li>相对于前面两种方式来说，不需要建立过多的 http 请求，相比之下节约了资源</li></ul></li><li><code>WebSocket</code>: 全双工双向通信</li></ol><h3 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h3><p>上面的四个通信协议，前三个都是基于HTTP协议的</p><ul><li>从性能的角度来看 WebSocket &gt; 长连接（SEE） &gt; 长轮询 &gt; 短轮询</li><li>考虑浏览器的兼容性： 短轮询 &gt; 长轮询 &gt; 长连接（SEE） &gt; WebSocket</li></ul>',5),c=[a];function _(s,d,r,h,n,p){return l(),e("div",null,c)}const b=t(o,[["render",_]]);export{u as __pageData,b as default};
