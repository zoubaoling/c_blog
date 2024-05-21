import{_ as s,c as i,o as a,a5 as n}from"./chunks/framework.B102yH4G.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"ES6/Generator和Iterator.md","filePath":"ES6/Generator和Iterator.md","lastUpdated":1715864760000}'),t={name:"ES6/Generator和Iterator.md"},e=n(`<h2 id="说说你对-iterator-generator-和-async-await-的理解" tabindex="-1">说说你对 Iterator, Generator 和 Async/Await 的理解 <a class="header-anchor" href="#说说你对-iterator-generator-和-async-await-的理解" aria-label="Permalink to &quot;说说你对 Iterator, Generator 和 Async/Await 的理解&quot;">​</a></h2><h2 id="iterator-迭代器" tabindex="-1">Iterator 迭代器 <a class="header-anchor" href="#iterator-迭代器" aria-label="Permalink to &quot;Iterator 迭代器&quot;">​</a></h2><p>迭代器是一个特殊对象，有一个next()方法，每次调用都会返回结果对象，包括value和done，value是下一个要返回的值，done表示是否还有要返回的值，没有则为true</p><p>可迭代对象有<code>Symbol.iterator</code>属性,通过指定函数返回一个作用于附属对象的迭代器，ES6中的集合：数组、Set和Map以及字符串都是可迭代对象</p><p><code>生成器</code>默认会为<code>Symbol.iterator</code>赋值，所有通过生成器创建的迭代器都是可迭代对象</p><p>展开运算符可以将可迭代对象转换为数组</p><h3 id="for-of与迭代器" tabindex="-1">for-of与迭代器 <a class="header-anchor" href="#for-of与迭代器" aria-label="Permalink to &quot;for-of与迭代器&quot;">​</a></h3><p>for-of只可用于可迭代对象，否则会报错</p><ul><li>调用可迭代对象的Symbol.iterator方法来获取迭代器</li><li>每一次循环时调用迭代器的next方法，将返回的value存储到变量中</li><li>循环结束时，返回的done为true,退出循环</li></ul><h3 id="内置迭代器" tabindex="-1">内置迭代器 <a class="header-anchor" href="#内置迭代器" aria-label="Permalink to &quot;内置迭代器&quot;">​</a></h3><p><strong>集合对象迭代器</strong> ES6中数组、Set、Map内建了三种迭代器(<code>keys|values|entries</code>), 其结果需要结合for-of或者...来处理，与普通对象对应的方法分别开来，结果不是数组</p><p>for-of中set默认的迭代器是values，map是entries，所以解构可以根据对应值解构</p><p><strong>字符串迭代器</strong> for-of</p><p><strong>NodeList迭代器</strong> for-of: <code>document.getElementByClass()</code></p><h3 id="迭代器高级用法" tabindex="-1">迭代器高级用法 <a class="header-anchor" href="#迭代器高级用法" aria-label="Permalink to &quot;迭代器高级用法&quot;">​</a></h3><ul><li>给迭代器传参，在next中传入数据，会替换生成器上一条yield返回的值</li><li>迭代器抛出错误<code>iterator.throw(new Error)</code>，在生成器内部可以用try/catch捕获</li></ul><h2 id="generator-生成器" tabindex="-1">Generator 生成器 <a class="header-anchor" href="#generator-生成器" aria-label="Permalink to &quot;Generator 生成器&quot;">​</a></h2><p>是一个返回迭代器的函数，在function关键字后用*号表示，函数内使用yield关键字，标识要返回的值和顺序</p><p>生成器执行返回一个迭代器（可迭代对象），执行迭代器的next方法返回value和done，执行语句遇到yield就停止，执行到yield后的语句并返回，手动执行next继续执行</p><p>*可以紧挨着function关键字，也可以在中间添加一个空格</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function*</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fun</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fun</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">obj </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  *</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fun</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="生成器return返回语句" tabindex="-1">生成器return返回语句 <a class="header-anchor" href="#生成器return返回语句" aria-label="Permalink to &quot;生成器return返回语句&quot;">​</a></h3><ul><li>.next可以获取到return的值，迭代到此结束，后续next会返回undefined</li><li>for-of循环会跳过return语句，不会读取return返回的值，并停止</li></ul><h3 id="委托生成器" tabindex="-1">委托生成器 <a class="header-anchor" href="#委托生成器" aria-label="Permalink to &quot;委托生成器&quot;">​</a></h3><p>合并多个迭代器，可以创建一个生成器，生成器内部通过yield和*号组合多个迭代器,按顺序迭代，还可以结合第一个迭代器结果传参给第二个迭代器</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">colorIterator</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">numberIterator</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {}</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">function</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">combineIterator</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> colors</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> yield</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">colorIterator</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  yield</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> *</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">numberIterator</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(colors)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  yield</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="简单任务执行器" tabindex="-1">简单任务执行器 <a class="header-anchor" href="#简单任务执行器" aria-label="Permalink to &quot;简单任务执行器&quot;">​</a></h3><p>自动执行生成器的next</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> run</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (task) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  const gen </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> task</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  let result </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gen.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">next</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  const </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">run</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">result.done) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      result </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> gen.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">next</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      run</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  run</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="async-await" tabindex="-1">async/await <a class="header-anchor" href="#async-await" aria-label="Permalink to &quot;async/await&quot;">​</a></h2><p>是promise + 生成器的语法糖</p><ul><li>async相当于*</li><li>await相当于yield</li></ul><p>可以自执行，内部调用next，形成了同步代码方式写异步代码</p>`,33),l=[e];function h(p,r,k,o,d,E){return a(),i("div",null,l)}const y=s(t,[["render",h]]);export{g as __pageData,y as default};
