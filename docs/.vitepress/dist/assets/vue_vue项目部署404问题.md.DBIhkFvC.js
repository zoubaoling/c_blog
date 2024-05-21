import{_ as a,c as s,o as n,a5 as e}from"./chunks/framework.B102yH4G.js";const x=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"vue/vue项目部署404问题.md","filePath":"vue/vue项目部署404问题.md","lastUpdated":1715938250000}'),p={name:"vue/vue项目部署404问题.md"},i=e(`<h2 id="问题" tabindex="-1">问题 <a class="header-anchor" href="#问题" aria-label="Permalink to &quot;问题&quot;">​</a></h2><p>vue项目本地运行时正常，history模式开发成果物放到服务器中，刷新页面404</p><p>nginx 配置</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>server {</span></span>
<span class="line"><span>  listen  80;</span></span>
<span class="line"><span>  server_name  www.xxx.com;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  location / {</span></span>
<span class="line"><span>    index  /data/dist/index.html;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p>访问www.xxx.com时，会请求dist/index.html文件，然后跳转路由到www.xxx.com/login中</p><p>在login页面中进行刷新时会404，因为nginx中没有www.xxx.com/login的配置</p><h3 id="hash模式" tabindex="-1">hash模式 <a class="header-anchor" href="#hash模式" aria-label="Permalink to &quot;hash模式&quot;">​</a></h3><p>hash模式为www.xxx.com/#/login，虽然路由出现在url中，但是接口请求中只会包括has符号之前的内容，对服务端没有影响，所以不配置也不会404</p><h3 id="解决方案" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案" aria-label="Permalink to &quot;解决方案&quot;">​</a></h3><p>后端配置，将任意页面路由都重定向到index.html，前端处理路由</p><p>对nginx配置文件.conf修改，添加try_files $uri $uri/ /index.html;</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>server {</span></span>
<span class="line"><span>  listen  80;</span></span>
<span class="line"><span>  server_name  www.xxx.com;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  location / {</span></span>
<span class="line"><span>    index  /data/dist/index.html;</span></span>
<span class="line"><span>    try_files $uri $uri/ /index.html;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div><p><a href="https://vue3js.cn/interview/vue/404.html#%E4%B8%80%E3%80%81%E5%A6%82%E4%BD%95%E9%83%A8%E7%BD%B2" target="_blank" rel="noreferrer">解析参考</a></p>`,13),t=[i];function l(c,o,r,h,d,_){return n(),s("div",null,t)}const m=a(p,[["render",l]]);export{x as __pageData,m as default};
