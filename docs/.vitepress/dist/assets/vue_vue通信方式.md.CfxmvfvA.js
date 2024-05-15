import{_ as i,c as s,o as a,a3 as t}from"./chunks/framework.BmlUaO9n.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"vue/vue通信方式.md","filePath":"vue/vue通信方式.md","lastUpdated":1714384646000}'),e={name:"vue/vue通信方式.md"},n=t(`<h2 id="通信方式有哪些" tabindex="-1">通信方式有哪些 <a class="header-anchor" href="#通信方式有哪些" aria-label="Permalink to &quot;通信方式有哪些&quot;">​</a></h2><ul><li>vue2: props emit ref attrs provide/inject vuex $on $listeners EventBus</li><li>vue3 props emit ref(expose) attrs provide/inject vuex</li></ul><h3 id="通信关系" tabindex="-1">通信关系 <a class="header-anchor" href="#通信关系" aria-label="Permalink to &quot;通信关系&quot;">​</a></h3><ul><li>父子通信：props emit ref $on</li><li>兄弟通信：EentBus $parent</li><li>祖孙后代通信: provide/inject attrs</li><li>非关系： vuex</li></ul><h4 id="props" tabindex="-1">props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;props&quot;">​</a></h4><p>vue2选项式写法：props: {} vue3组合式写法：defineProps({})</p><h4 id="emit" tabindex="-1">emit <a class="header-anchor" href="#emit" aria-label="Permalink to &quot;emit&quot;">​</a></h4><p>vue2选项式写法：this.$emit(&#39;&#39;) vue3组合式写法：defineEmits([&#39;&#39;]) emit(&#39;&#39;)</p><h4 id="ref" tabindex="-1">ref <a class="header-anchor" href="#ref" aria-label="Permalink to &quot;ref&quot;">​</a></h4><p>vue2选项式写法：直接通过ref获取子组件数据 vue3组合式写法：ref + defineExpose抛出指定变量</p><h4 id="attrs" tabindex="-1">attrs <a class="header-anchor" href="#attrs" aria-label="Permalink to &quot;attrs&quot;">​</a></h4><p>没有在props中声明的其他属性，通过v-bind的方式传递给子组件，一般结合inheritAttrs使用，默认为true vue2: v-bind=$attrs vue3: useAttrs() &gt; v-bind</p><p>inheritAttrs配置：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">inheritAttrs</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">defineOptions</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({</span></span>
<span class="line highlighted"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  inheritAttrs: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">})</span></span></code></pre></div><h4 id="provide-inject" tabindex="-1">provide/inject <a class="header-anchor" href="#provide-inject" aria-label="Permalink to &quot;provide/inject&quot;">​</a></h4><p>通过provide将指定数据传递给子孙后代，子孙后代中通过inject接受</p><h4 id="eventbus" tabindex="-1">EventBus <a class="header-anchor" href="#eventbus" aria-label="Permalink to &quot;EventBus&quot;">​</a></h4><p>中央消息总线，vue3没有（可以用三方插件mitt.js替代）</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> bus</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Vue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">({})</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">Vue</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">prototype</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.$bus </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> bus</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.$bus.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$on</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">this</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.$bus.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$emit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><h4 id="parent" tabindex="-1">$parent <a class="header-anchor" href="#parent" aria-label="Permalink to &quot;$parent&quot;">​</a></h4><p>适用于兄弟组件间通过$parent用$on $emit来通信 sibling1: $parent.$emit(&#39;&#39;) sibling2: $parent.$on(&#39;&#39;)</p><h4 id="listeners" tabindex="-1">$listeners <a class="header-anchor" href="#listeners" aria-label="Permalink to &quot;$listeners&quot;">​</a></h4><p>包含了父作用域中（不被.native修饰的）的v-on事件监听器，子组件中通过<code>v-on=&quot;$listeners&quot;</code></p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Father.vue</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">com</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> @input=&quot;handleInput&quot;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> @change=&quot;handleChange&quot;/&gt;</span></span>
<span class="line"></span>
<span class="line highlighted"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Child.vue</span></span>
<span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">&lt;input</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> @input=&quot;$emit(&#39;input&#39;,</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> $event)&quot;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> @change=&quot;$emit(&#39;change&#39;,</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;"> $event)&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// Child.vue $listeners 替换多个原生事件的绑定，向外透传</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">input</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> v-on</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;$listeners&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /&gt;</span></span></code></pre></div>`,24),l=[n];function h(p,r,k,d,o,c){return a(),s("div",null,l)}const E=i(e,[["render",h]]);export{g as __pageData,E as default};
