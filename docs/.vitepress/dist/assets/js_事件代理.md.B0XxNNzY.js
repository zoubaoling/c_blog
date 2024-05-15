import{_ as e,c as o,o as t,a3 as l}from"./chunks/framework.BmlUaO9n.js";const f=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"js/事件代理.md","filePath":"js/事件代理.md","lastUpdated":1714909193000}'),s={name:"js/事件代理.md"},a=l('<h2 id="什么是事件代理-应用场景" tabindex="-1">什么是事件代理，应用场景 <a class="header-anchor" href="#什么是事件代理-应用场景" aria-label="Permalink to &quot;什么是事件代理，应用场景&quot;">​</a></h2><blockquote><p><em>事件代理也叫事件委托</em><strong>原理</strong> 利用了事件冒泡的机制来实现，也就是说把子元素的事件绑定｜委托到了父元素的身上，在外层元素上执行事件，如果子元素阻止了事件冒泡，那么委托也就不成立</p></blockquote><p>阻止事件冒泡</p><ul><li>event.stopPropagation()</li><li>addEventListener(&#39;click&#39;,函数名，true/false) 默认是false（事件冒泡），true（事件捕获）</li></ul><p><strong>应用场景</strong></p><ul><li>大量子元素：当存在一个列表，列表中有大量的列表项，需要点击时响应时间，如果每个列表项一一绑定事件，内存消耗比较大，就可以使用事件委托，绑定在父元素上，执行事件的时候再去匹配</li><li>动态增删元素：当存在一个列表，列表项不多，但是存在动态增删元素时，如果是一一绑定，在列表变化时，需要去给新增的元素绑定，给删除的元素解绑，如果在外层绑定就不需要这些处理</li></ul><p><strong>优点</strong> 适合事件委托的事件：<code>click</code>, <code>mousedown</code>, <code>mouseup</code>, <code>keydown</code>, <code>keyup</code>, <code>keypress</code></p><ol><li>动态绑定，减少重复工作</li><li>减少了事件的绑定，减少了内存的占用，提升了整体性能</li></ol><p><strong>局限性</strong></p><ul><li>focus blur没有事件冒泡机制，无法委托</li><li>mousemove mouseout这样的事件有冒泡，但是需要不断通过位置计算定位，性能消耗比较高，不适合事件委托</li><li>不能盲目的所有事件都用委托，可能会出现误判</li></ul>',10),c=[a];function i(r,n,d,_,p,u){return t(),o("div",null,c)}const h=e(s,[["render",i]]);export{f as __pageData,h as default};
