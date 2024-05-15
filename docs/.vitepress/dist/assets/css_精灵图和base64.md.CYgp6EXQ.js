import{_ as e,c as a,o as s,a3 as t}from"./chunks/framework.BmlUaO9n.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"css/精灵图和base64.md","filePath":"css/精灵图和base64.md","lastUpdated":1715169354000}'),l={name:"css/精灵图和base64.md"},i=t('<h2 id="精灵图和base64的区别是什么" tabindex="-1">精灵图和base64的区别是什么？ <a class="header-anchor" href="#精灵图和base64的区别是什么" aria-label="Permalink to &quot;精灵图和base64的区别是什么？&quot;">​</a></h2><ul><li>精灵图：把多张小图整合到一张大图上，利用定位的一些属性把小图显示在页面上 <ul><li>可以减少请求数量，提高加载速度</li></ul></li><li>base64：传输8Bit字节代码的编码方式，把原本二进制形式（图像文件）转为64个字符串的编码方式， <ul><li>直接嵌入到HTML和CSS中，减少HTTP请求，快速渲染-小图像，减少跨域问题</li><li>若base64体积比原图片大，不利于css的加载-一般来说base64编码数据会比原始二进制数据大约33%</li><li>无法被浏览器缓存为单独的文件，每次加载页面时可能会重新加载图像数据</li></ul></li></ul><ol><li>精灵图适用于图像数量多且体积小的情况，比如图标或按钮</li><li>base64适用于图像体积小，不经常变更的图像，避免缓存问题(&lt;10kb)</li></ol><p>字体文件可缩放，不失真，不需要多次HTTP请求，多色图标实现比较复杂</p>',4),_=[i];function o(c,r,n,d,b,p){return s(),a("div",null,_)}const T=e(l,[["render",o]]);export{h as __pageData,T as default};
