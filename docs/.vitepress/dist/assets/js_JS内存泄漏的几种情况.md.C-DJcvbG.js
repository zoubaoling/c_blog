import{_ as a,c as e,o as l,a5 as i}from"./chunks/framework.B102yH4G.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"js/JS内存泄漏的几种情况.md","filePath":"js/JS内存泄漏的几种情况.md","lastUpdated":1715864760000}'),r={name:"js/JS内存泄漏的几种情况.md"},t=i('<h2 id="说说js内存泄漏的几种情况" tabindex="-1">说说JS内存泄漏的几种情况 <a class="header-anchor" href="#说说js内存泄漏的几种情况" aria-label="Permalink to &quot;说说JS内存泄漏的几种情况&quot;">​</a></h2><h3 id="解释" tabindex="-1">解释 <a class="header-anchor" href="#解释" aria-label="Permalink to &quot;解释&quot;">​</a></h3><p>JS里已经分配内存地址的对象，但是由于长时间没有释放或者没办法清除，造成长期占用内存的现象，会让内存资源大幅浪费，最终导致运行速度慢，甚至崩溃的情况</p><h3 id="垃圾回收机制" tabindex="-1">垃圾回收机制 <a class="header-anchor" href="#垃圾回收机制" aria-label="Permalink to &quot;垃圾回收机制&quot;">​</a></h3><p>JS有自动垃圾回收机制(GC: Garbage Collecation)</p><ul><li>执行环境会负责管理代码执行过程中使用的内存</li><li>垃圾收集器会定期-周期性找出不再继续使用的变量，然后释放内存</li></ul><h4 id="分类" tabindex="-1">分类 <a class="header-anchor" href="#分类" aria-label="Permalink to &quot;分类&quot;">​</a></h4><ol><li>引用计数</li><li>标记清除 - JS最常用的回收机制</li></ol><h4 id="标记清除" tabindex="-1">标记清除 <a class="header-anchor" href="#标记清除" aria-label="Permalink to &quot;标记清除&quot;">​</a></h4><p>变量进入执行环境就标记为“进入环境”，进入环境的变量内存无法释放，变量离开环境时，标记为离开环境</p><p>垃圾回收机制运行时，会标记内存中所有存储的变量，将存在于上下文中的变量，以及被上下文中变量引用的变量的标记清除掉</p><p>剩下的有标记的变量就是需要删除的，上下文的变量没有访问到</p><p>随后垃圾回收程序做一次内存管理，销毁带标记的变量及其内存</p><h4 id="引用计数" tabindex="-1">引用计数 <a class="header-anchor" href="#引用计数" aria-label="Permalink to &quot;引用计数&quot;">​</a></h4><p>JS维护一张表，记录所有值的引用次数，当一个值的引用次数为0的时候，就表示其没有被引用，可以释放内存</p><p>如果一个值没有被使用，但是引用次数不为0，垃圾回收机制就无法回收这块内存，可能造成内存泄漏，可以赋值为null，释放内存</p><h3 id="常见泄漏的情况" tabindex="-1">常见泄漏的情况 <a class="header-anchor" href="#常见泄漏的情况" aria-label="Permalink to &quot;常见泄漏的情况&quot;">​</a></h3><ul><li>全局变量过多，通常是变量未定义或者胡乱引用了全局变量(全局变量在整个运行期间都是可访问的，始终存在于内存中)</li><li>未清除的定时器</li><li>事件监听未移除</li><li>一些引用元素没有清除，比如对DOM元素的引用</li><li>过度的闭包，局部变量无法释放。可以将闭包返回的函数设置为null,手动解除引用</li></ul><h3 id="如何检查js中的内存泄漏" tabindex="-1">如何检查JS中的内存泄漏 <a class="header-anchor" href="#如何检查js中的内存泄漏" aria-label="Permalink to &quot;如何检查JS中的内存泄漏&quot;">​</a></h3><p><a href="https://zhuanlan.zhihu.com/p/322356761" target="_blank" rel="noreferrer">参考文章</a></p><p>chrome开发工具的performance和memory</p><ol><li>performance</li></ol><ul><li>勾选memory字段，点击录制，正常操作，然后停止</li><li>录制结束后，如果内存曲线不断升高，就可能内存泄漏了，就可以结合Memory面板进一步定位</li></ul><ol start="2"><li>memory</li></ol><ul><li>点击左侧原点记录当前堆内存快照(heat snapshot)</li><li>操作可能发生泄漏的操作，再记录</li><li>重复操作，再记录多个快照</li><li>顶部all objects切换Object allcated between,比对新生成的对象，以及retaining tree中没释放的对象</li></ul><h4 id="memory面板参数" tabindex="-1">memory面板参数 <a class="header-anchor" href="#memory面板参数" aria-label="Permalink to &quot;memory面板参数&quot;">​</a></h4><p>shallow size:对象本身大小</p><p>retained size: 对象回收后释放的内存大小</p><p>retained size &gt; shallow size需要注意</p><p>当生成多个快照后，可以切换到Comparison视图比对两份快照差异：</p><ul><li>新创建的对象</li><li>销毁的对象</li><li>差值</li><li>...</li></ul>',31),o=[t];function h(n,s,p,c,d,m){return l(),e("div",null,o)}const b=a(r,[["render",h]]);export{_ as __pageData,b as default};
