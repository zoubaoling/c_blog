import{_ as l,c as t,o as i,a3 as e}from"./chunks/framework.BmlUaO9n.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"http/http1.0和1.1和2.0的区别.md","filePath":"http/http1.0和1.1和2.0的区别.md","lastUpdated":1715169354000}'),a={name:"http/http1.0和1.1和2.0的区别.md"},o=e('<h2 id="说说-http1-0-1-1-2-0-的区别" tabindex="-1">说说 HTTP1.0/1.1/2.0 的区别 <a class="header-anchor" href="#说说-http1-0-1-1-2-0-的区别" aria-label="Permalink to &quot;说说 HTTP1.0/1.1/2.0 的区别&quot;">​</a></h2><ul><li>HTTP1.0： <ul><li>浏览器与服务器只保持短暂的连接(处理完即断开)，浏览器的每次请求都需要与服务器建立一个TCP连接</li><li>如果需要建立长连接，需要设置非标准的Connection字段 Connection: keep-alive</li></ul></li><li>HTTP1.1： <ul><li>默认支持长连接（Connection: keep-alive），即TCP连接默认不关闭，可以被多个请求复用</li><li>在同一个TCP连接里面，客户端可以同时发送多个请求，不用等待上一次请求结果返回；但是服务器端必须按照接收到客户端请求的先后顺序依次回送响应结果，只有处理完一个请求，才会接着处理下一个请求。如果前面的处理特别慢，后面就会有许多请求排队等着</li><li>新增了一些请求方法：put delete options:</li><li>新增了一些请求头和响应头: <ul><li>缓存相关： If-Match, If-None-Match</li></ul></li></ul></li><li>HTTP2.0： <ul><li>多路复用：一个连接里，客户端和服务器都可以同时发送多个请求或响应，而且不用按照顺序一一发送。避免了HTTP队头阻塞，但是TCP的队头阻塞依旧存在</li><li>二进制分帧：1.1的解析是基于文本，2.0使用二进制，将请求和响应分割为更小的帧，从而实现多路复用 <ul><li>消息由一个或多个帧组成。多个帧之间可以乱序发送，根据帧首部的流标识可以重新组装，这是多路复用同时发送数据的实现条件</li></ul></li><li>头部信息压缩：使用报头压缩，降低开销 <ul><li>1.1每次请求都会带上所有信息，比如Cookie，这样会很浪费性能</li><li>2.0引入头部压缩，一方面将头部信息使用gzip压缩后再发送，另一方面客户端和服务器同时维护一张头部信息表，所有字段都会存入这张表，生成索引，只发送索引就可以。</li></ul></li><li>服务器推送: 允许服务器向客户端主动发送资源，只限于静态资源如css，img等</li></ul></li></ul>',2),_=[o];function n(c,s,p,r,h,u){return i(),t("div",null,_)}const P=l(a,[["render",n]]);export{d as __pageData,P as default};
