import{_ as e,c as a,o as t,a5 as i}from"./chunks/framework.B102yH4G.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"vue/vue3的tree-shaking.md","filePath":"vue/vue3的tree-shaking.md","lastUpdated":1715938250000}'),s={name:"vue/vue3的tree-shaking.md"},r=i('<h2 id="vue3-0的tree-shaking特性是什么-并举例说明" tabindex="-1">vue3.0的tree-shaking特性是什么，并举例说明 <a class="header-anchor" href="#vue3-0的tree-shaking特性是什么-并举例说明" aria-label="Permalink to &quot;vue3.0的tree-shaking特性是什么，并举例说明&quot;">​</a></h2><h3 id="定义" tabindex="-1">定义 <a class="header-anchor" href="#定义" aria-label="Permalink to &quot;定义&quot;">​</a></h3><p>找出无用的代码并删除，从而减小代码打包的体积</p><p>vue3源码引入tree-shaking特性，使用ES module编写将全局API分块，可以按需引入，如果没有使用，不会出现在构建成果物中</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { ref } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vue&#39;</span></span></code></pre></div><h3 id="如何做" tabindex="-1">如何做 <a class="header-anchor" href="#如何做" aria-label="Permalink to &quot;如何做&quot;">​</a></h3><p>利用ES6的模版语法（import export）,模块的依赖关系在编译时就可以确认，从而编译时找出无用的代码并删除</p><ul><li>编译时利用ES6模版语法判断哪些模块已经加载</li><li>编译时判断哪些变量没有被引用或者被使用，进而删除</li></ul><h3 id="好处" tabindex="-1">好处 <a class="header-anchor" href="#好处" aria-label="Permalink to &quot;好处&quot;">​</a></h3><ul><li>更小：减小程序体积</li><li>更快：减少程序执行时间</li><li>更友好：便于将来对程序架构进行优化</li></ul><h3 id="构建工具" tabindex="-1">构建工具 <a class="header-anchor" href="#构建工具" aria-label="Permalink to &quot;构建工具&quot;">​</a></h3><p>tree-shaking是构建工具的功能，不是vue3的特性</p><ul><li>Wepack4.0以上版本在mode为production时，会自动开启Tree shaking</li></ul><p><a href="https://vue3js.cn/interview/vue3/treeshaking.html#%E4%BA%8C%E3%80%81%E5%A6%82%E4%BD%95%E5%81%9A" target="_blank" rel="noreferrer">解析示例</a></p>',14),l=[r];function n(h,o,p,d,u,c){return t(),a("div",null,l)}const g=e(s,[["render",n]]);export{_ as __pageData,g as default};
