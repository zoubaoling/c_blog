import{_ as a,c as n,o as l,a3 as i,l as s}from"./chunks/framework.BmlUaO9n.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"webpack/webpack模块联邦的了解.md","filePath":"webpack/webpack模块联邦的了解.md","lastUpdated":1715657339000}'),e={name:"webpack/webpack模块联邦的了解.md"},t=i('<h2 id="说说你对-webpack5-模块联邦的了解" tabindex="-1">说说你对 webpack5 模块联邦的了解 <a class="header-anchor" href="#说说你对-webpack5-模块联邦的了解" aria-label="Permalink to &quot;说说你对 webpack5 模块联邦的了解&quot;">​</a></h2><p>模块联邦（Module Federation）:</p><ul><li>允许一个JS应用动态地运行来自另一个应用的代码，无需重新编译或重新部署, 从而共享模块和代码，在微前端架构中尤其有用</li><li>可以使不同团队独立开发和部署应用的部分（子应用或组件），然后这些独立部署的部分可以被合并成一个单一的应用</li></ul><h3 id="工作原理" tabindex="-1">工作原理 <a class="header-anchor" href="#工作原理" aria-label="Permalink to &quot;工作原理&quot;">​</a></h3><p>核心思想是允许构建时将应用分解成独立的、可以独立加载的部分。每个部分（称为容器）都可以独立构建，拥有自己的依赖，它们可以暴露给其他容器使用，或者消费其他容器暴露的模块 <strong>主要组件</strong></p><ul><li>Host（宿主）：加载其他远程容器中的模块的应用</li><li>Remote（远程）：暴露模块给宿主或其他远程使用的应用</li></ul><p><strong>使用</strong></p>',7),p=s("ul",null,[s("li",null,"ModuleFederationPlugin"),s("li",null,"remote: name(应用名称) filename(远程入口文件名) expose: object(暴露的组件), shared(共享的库，避免重复打包)"),s("li",{"remoteApp:":"","name@urlfilename":""},"host: name shared remotes:")],-1),h=i(`<p><strong>示例</strong> remote</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ModuleFederationPlugin</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;webpack/lib/container/ModuleFederationPlugin&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ModuleFederationPlugin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;app_remote&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 远程应用的名称</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      filename: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;remoteEntry.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 远程入口文件名</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      exposes: {</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">        &#39;./Button&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;./src/Button&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 暴露 Button 组件 -&gt; app_remote/Button</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      shared: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;react&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;react-dom&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 声明共享的库，避免重复打包</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><p>host</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> ModuleFederationPlugin</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> require</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;webpack/lib/container/ModuleFederationPlugin&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  plugins: [</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ModuleFederationPlugin</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      name: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;app_host&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      remotes: {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        remoteApp: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;app_remote@http://localhost:3001/remoteEntry.js&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 从哪里加载远程应用</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      shared: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;react&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;react-dom&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }),</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ],</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><h3 id="主要优势" tabindex="-1">主要优势 <a class="header-anchor" href="#主要优势" aria-label="Permalink to &quot;主要优势&quot;">​</a></h3><ul><li>多个应用程序之间可以共享代码和模块，从而减少重复代码量。</li><li>应用程序可以更加灵活地划分为更小的子应用程序，从而降低应用程序的复杂度。</li><li>独立部署：各个团队可以独立开发和部署自己的应用部分，不需要等待其他部分完成</li><li>可以支持应用程序的动态加载和升级，从而实现更好的版本管理和迭代。</li><li>可以避免在应用程序之间传递大量数据，从而提高应用程序的性能和效率。</li></ul>`,6),k=[t,p,h];function E(r,d,o,g,c,y){return l(),n("div",null,k)}const _=a(e,[["render",E]]);export{u as __pageData,_ as default};
