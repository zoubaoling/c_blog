import{_ as l,c as t,o as i,a3 as e}from"./chunks/framework.BmlUaO9n.js";const S=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"http/地址栏输入URL回车.md","filePath":"http/地址栏输入URL回车.md","lastUpdated":1715657339000}'),a={name:"http/地址栏输入URL回车.md"},_=e('<h2 id="说说地址栏输入-url-敲下回车后发生了什么" tabindex="-1">说说地址栏输入 URL 敲下回车后发生了什么? <a class="header-anchor" href="#说说地址栏输入-url-敲下回车后发生了什么" aria-label="Permalink to &quot;说说地址栏输入 URL 敲下回车后发生了什么?&quot;">​</a></h2><p>输入URl回车后的过程：</p><ol><li>URL解析，判断URL是否符合规范</li></ol><ul><li>协议、域名｜IP地址-确定服务器、端口-确定服务器中的具体应用、路径-确定要访问的资源位置</li><li>？之后是对资源更加详细的描述：查询字符串、锚点链接</li></ul><ol start="2"><li>浏览器缓存判断，判断资源是否有缓存，有就不需要向服务器发送新的请求</li><li>DNS解析，获取目标服务器IP</li><li>建立TCP连接，三次握手</li><li>发起HTTP请求</li><li>响应请求</li><li>页面渲染</li></ol><ul><li>首先对资源进行解析，查看响应头做处理，比如重定向，解压gzip，缓存资源等</li><li>解析HTML，生成DOM树；解析CSS树，生成CSSOM树</li><li>合并DOM树和CSSOM树，生成渲染树Render Tree</li><li>Layout,计算各元素的尺寸、位置等几何属性</li><li>Paint，根据计算的几何属性，绘制在页面</li></ul>',6),o=[_];function r(s,n,c,d,p,h){return i(),t("div",null,o)}const R=l(a,[["render",r]]);export{S as __pageData,R as default};
