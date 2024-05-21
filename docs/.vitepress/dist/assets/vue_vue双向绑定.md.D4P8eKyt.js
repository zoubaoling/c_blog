import{_ as e,c as t,o as a,a5 as l}from"./chunks/framework.B102yH4G.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"vue/vue双向绑定.md","filePath":"vue/vue双向绑定.md","lastUpdated":1715938250000}'),o={name:"vue/vue双向绑定.md"},r=l('<h2 id="双向绑定" tabindex="-1">双向绑定 <a class="header-anchor" href="#双向绑定" aria-label="Permalink to &quot;双向绑定&quot;">​</a></h2><blockquote><p>拦截器 + 编译器</p></blockquote><h3 id="依赖收集" tabindex="-1">依赖收集 <a class="header-anchor" href="#依赖收集" aria-label="Permalink to &quot;依赖收集&quot;">​</a></h3><p>使用<code>Object.defineProperty</code>来进行拦截处理，new Vue时对数据属性遍历拦截</p><ol><li>dep: 依赖收集器<code>new Dep</code>，每一个属性都有一个依赖收集器，收集所有使用了该数据的<code>watcher</code></li><li>Dep.target: 当前永远只存在一个<code>watcher</code></li><li>dep.depend: get中执行，收集依赖 -&gt; Dep.target.depend -&gt; watcher.addDep -&gt; wather.newDeps.push + dep.addSub(this|watcher)</li><li>Watcher: 监听器，$mount挂载时会<code>new Watcher(vm, updateComponent)</code>;<code>updateComponent: update(render)</code><ul><li>new Watcher初始化构造函数中执行this.getter=updateComponent和this.get()</li><li>this.get会执行pushTarget: Dep.target = this(watcher) -&gt; this.getter | updateComponent -&gt; popTarget -&gt; cleanupDeps</li><li>上述中updateComponent会进行对模版进行编译更新渲染，过程中会使用数据，触发拦截器get进行依赖收集 -&gt; dep.depend: dep.addSub(渲染watcher)</li></ul></li></ol><h3 id="派发更新" tabindex="-1">派发更新 <a class="header-anchor" href="#派发更新" aria-label="Permalink to &quot;派发更新&quot;">​</a></h3><ol><li>dep.notify: 通知依赖的watcher列表进行更新, subs.forEach(sub =&gt; sub|watch.update)</li><li>watch.update -&gt; queueWatcher:维护一个watcher队列，在nextTick中执行更新flushSchedulerQueue，不是每个数据修改就更新</li><li>flushSchedulerQueue: 队列排序，watcher.run，重置 <ul><li>队列排序：从小到大 &gt; 组件更新由父到子, 用户自定义Watcher优先于渲染Watcher,组件在其父组件watcher run期间被销毁，可以跳过其watcher</li><li>run <ul><li>上述依赖收集的this.get，修改dep.Target和执行value = getter（渲染Watcher会执行updateComponent,更新视图）</li><li>计算结果与之前结果不一致 ｜ 计算结果为对象 ｜ deep: 修改值，执行watcher的回调函数，并传入新值和旧值</li></ul></li><li>重置相关状态</li></ul></li></ol><div class="important custom-block github-alert"><p class="custom-block-title">IMPORTANT</p><p><a href="/c_blog/vue/vue实例挂载.html">详见实例挂载</a></p></div>',8),c=[r];function d(i,u,h,p,n,s){return a(),t("div",null,c)}const m=e(o,[["render",d]]);export{g as __pageData,m as default};
