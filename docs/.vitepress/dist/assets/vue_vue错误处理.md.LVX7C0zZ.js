import{_ as s,c as a,o as i,a3 as e}from"./chunks/framework.BmlUaO9n.js";const E=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"vue/vue错误处理.md","filePath":"vue/vue错误处理.md","lastUpdated":1714384646000}'),t={name:"vue/vue错误处理.md"},r=e(`<h2 id="如何处理vue的错误" tabindex="-1">如何处理Vue的错误 <a class="header-anchor" href="#如何处理vue的错误" aria-label="Permalink to &quot;如何处理Vue的错误&quot;">​</a></h2><ul><li>接口错误</li><li>代码错误</li></ul><h3 id="接口错误" tabindex="-1">接口错误 <a class="header-anchor" href="#接口错误" aria-label="Permalink to &quot;接口错误&quot;">​</a></h3><p>在axios响应拦截器里进行处理,根据接口返回的状态吗进行路由跳转到错误页面或者提示对应信息</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">axios.interceptors.response.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">use</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  res</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> res,</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">  err</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> Promise</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">reject</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(err)</span></span>
<span class="line highlighted"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h3 id="代码错误" tabindex="-1">代码错误 <a class="header-anchor" href="#代码错误" aria-label="Permalink to &quot;代码错误&quot;">​</a></h3><p>接受组件渲染和观察期间未被捕获的错误，包括三个参数：error：错误信息 vm：错误实例 info: string(错误来源：钩子函数 on-click等)</p><ul><li>Vue.config.errorHandler | app.config.errorHandler</li><li>errorCaptured | onErrorCaptured 捕获来自子组件未被捕获的错误，逐级向上直到errorHandler，如果返回false，就不会传递到errorHandler</li><li>try catch捕获可预见的错误，比如接口调用数据异常时对于loading或者数据状态的处理</li></ul><p>JS 2 ES 1 CSS 1 WEBPACK 1</p>`,9),n=[r];function l(h,p,o,d,k,c){return i(),a("div",null,n)}const _=s(t,[["render",l]]);export{E as __pageData,_ as default};
