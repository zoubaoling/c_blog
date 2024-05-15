import{_ as e,c as s,o as i,a3 as a}from"./chunks/framework.BmlUaO9n.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"ES6/Map和Set的用法以及区别.md","filePath":"ES6/Map和Set的用法以及区别.md","lastUpdated":1714567771000}'),l={name:"ES6/Map和Set的用法以及区别.md"},t=a(`<h2 id="set和map" tabindex="-1">set和map <a class="header-anchor" href="#set和map" aria-label="Permalink to &quot;set和map&quot;">​</a></h2><ul><li>set是集合，类似数组，存储不重复的值，常用于去重</li><li>map类似JSON对象，以键值对的形式存储数据</li></ul><h3 id="使用上" tabindex="-1">使用上 <a class="header-anchor" href="#使用上" aria-label="Permalink to &quot;使用上&quot;">​</a></h3><ul><li>set <ul><li><code>new Set([val1, val2])</code>作为构造函数接受一个一维数组, 数组内容可以为基本类型，也可以是引用类型</li><li>常用方法：<code>add</code>, <code>delete</code>, <code>has</code>, <code>clear</code>, <code>size</code>, add是链式操作，返回最新set</li><li>遍历方法：<code>keys</code>, <code>values</code>, <code>entries</code>, <code>forEach</code>,Set遍历的结果key和value相同，且前三种方法遍历出来的<code>keys()</code>是迭代器，类数组，需要用扩展运算符或者Array.from处理成数组，或者for/of</li><li>添加值时不会发生类型转换，5和‘5’不同，判断类似===， NaN特殊，不严格等于自身，但是set看作同一个值 Object.is</li><li>遍历顺序是插入顺序</li></ul></li><li>map <ul><li><code>new Map([[key1, value1]])</code>作为构造函数接收一个二维数组，键值可以是任何类型的数据</li><li>常用方法：<code>set</code>, <code>get</code>,<code>delete</code>, <code>has</code>, <code>size</code>, <code>clear</code>, set是链式操作，返回最新map</li><li>遍历方法：<code>keys</code>, <code>values</code>, <code>entries</code>, <code>forEach</code>,前三种结果都是迭代器，类数组，需要使用扩展运算符或者Array.from转成数组，或者for/of</li><li>如果键值为简单类型，两个值严格相等才判定为一个键，包括0和-0，NaN不严格相等，但仍然视为一个键 Object.is</li><li>遍历顺序是插入顺序</li><li>适用于频繁取用的数据</li></ul></li></ul><h4 id="weakset和weakmap" tabindex="-1">WeakSet和WeakMap <a class="header-anchor" href="#weakset和weakmap" aria-label="Permalink to &quot;WeakSet和WeakMap&quot;">​</a></h4><ul><li>weakset类似set <ul><li>成员只能是引用类型，且为弱引用，其他地方不存在对成员对象的引用后，会被垃圾回收机制回收，成员会消失，所以weakset的成员个数不可预测，不可以遍历，没有遍历方法和<code>.size</code>、<code>clear</code></li><li>常用方法：<code>add</code>, <code>has</code>, <code>delete</code>,没有size和clear</li><li>没有遍历方法</li><li>构造函数接收一维数组，数组元素需要是引用类型</li></ul></li><li>weakmap类似map <ul><li>key只能是引用类型，弱引用同weakset</li><li>常用方法：<code>set</code>, <code>get</code>, <code>has</code>, <code>delete</code>, 没有size和clear</li><li>没有遍历方法</li><li>构造函数为二维数组，数组元素需要是引用类型 场景：</li></ul></li></ul><ol><li>weakset和weakmap可以用于DOM节点的管理，DOM在页面删除时，数据会被垃圾回收 比如：DOM的事件绑定</li></ol><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> el</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getElementById</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;app&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> listeners</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> WeakMap</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> handler1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {}</span></span>
<span class="line highlighted"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">listeners.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">set</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(el, handler1)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">el.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">addEventListener</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(el, listeners.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">get</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(el), </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span></code></pre></div><ol start="2"><li>私有对象数据，私有变量管理在weakmap中<code>map.set(this, {})</code>,通过map获取，当实例销毁时，相关数据不在存在，不可被其他地方使用 实际使用与生命周期管理分离的对象添加额外信息</li></ol><blockquote><p>垃圾回收机制-引用计数：引用次数不为0，垃圾回收机制不会释放内存</p></blockquote>`,10),d=[t];function h(n,o,k,p,c,r){return i(),s("div",null,d)}const y=e(l,[["render",h]]);export{g as __pageData,y as default};
