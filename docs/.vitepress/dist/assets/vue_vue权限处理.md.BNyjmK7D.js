import{_ as s,c as i,o as a,a3 as e}from"./chunks/framework.BmlUaO9n.js";const E=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"vue/vue权限处理.md","filePath":"vue/vue权限处理.md","lastUpdated":1714384646000}'),t={name:"vue/vue权限处理.md"},l=e(`<h2 id="vue的权限处理" tabindex="-1">vue的权限处理 <a class="header-anchor" href="#vue的权限处理" aria-label="Permalink to &quot;vue的权限处理&quot;">​</a></h2><ul><li>接口权限，从接口层面，对无权限的请求直接拦截</li><li>路由权限，没有权限的路由不允许访问</li><li>菜单权限，没有权限的菜单页面不展示</li><li>按钮权限，控制页面中无权限的按钮块不展示</li></ul><h3 id="接口权限" tabindex="-1">接口权限 <a class="header-anchor" href="#接口权限" aria-label="Permalink to &quot;接口权限&quot;">​</a></h3><p>一般来说第一次登陆后，用户的信息会通过cookie或者token在每次发送请求前自动带上，响应拦截器中根据协商的状态码进行处理，登陆状态过期就跳转到登陆页面</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">axios.interceptors.response.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">use</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">res</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // code</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  router.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">push</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;/login&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line highlighted"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><h3 id="路由权限-菜单权限" tabindex="-1">路由权限 + 菜单权限 <a class="header-anchor" href="#路由权限-菜单权限" aria-label="Permalink to &quot;路由权限 + 菜单权限&quot;">​</a></h3><p>路由在前端定义，菜单由接口返回，根据当前登陆的用户信息返回有权限的菜单，在全局路由守卫中router.beforeEach中处理：</p><ul><li>还没拿到菜单信息时，通过接口获取用户的菜单信息</li><li>有菜单信息，将当前路由的name和菜单的name（或者menuCode）进行比对，存在则有权限允许访问，否则跳转到权限页面。但是需要前端和后端协商码保持一致 便于直接在平台上配置菜单信息，前端不用重新编译，动态获取展示即可</li></ul><p>路由也可以由后端接口返回，但是前后端配合更高，在路由导航守卫中获取，然后addRoutes</p><h3 id="按钮权限" tabindex="-1">按钮权限 <a class="header-anchor" href="#按钮权限" aria-label="Permalink to &quot;按钮权限&quot;">​</a></h3><ul><li>直接通过v-if来判断展示，将当前的用户和权限列表比对，或者当前用户的操作权限与当前操作等对比</li><li>使用自定义指令来处理，具体处理逻辑同上</li></ul><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">el.parentNode?.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">removeChild</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(el)</span></span></code></pre></div>`,12),n=[l];function h(p,r,o,d,k,c){return a(),i("div",null,n)}const g=s(t,[["render",h]]);export{E as __pageData,g as default};
