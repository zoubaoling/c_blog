import{_ as t,c as d,o as i,a3 as a}from"./chunks/framework.BmlUaO9n.js";const m=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"css/隐藏元素的方式.md","filePath":"css/隐藏元素的方式.md","lastUpdated":1714991694000}'),e={name:"css/隐藏元素的方式.md"},l=a('<h2 id="css中有哪些方式可以隐藏页面元素-区别" tabindex="-1">css中有哪些方式可以隐藏页面元素？区别? <a class="header-anchor" href="#css中有哪些方式可以隐藏页面元素-区别" aria-label="Permalink to &quot;css中有哪些方式可以隐藏页面元素？区别?&quot;">​</a></h2><h3 id="方式" tabindex="-1">方式 <a class="header-anchor" href="#方式" aria-label="Permalink to &quot;方式&quot;">​</a></h3><ul><li>display: none <ul><li>元素在页面上消失，不占据空间, 无法响应点击事件, 触发重排和重绘</li></ul></li><li>visibility: hidden <ul><li>让元素消失，一种不可见的状态, 占据空间位置，DOM结果仍然存在，无法响应点击事件，触发重绘</li></ul></li><li>opacity: 0 <ul><li>设置了元素的透明度为0，元素不可见，占据空间位置, 可以响应点击事件，一般会触发重绘，animation中修改不会触发重绘</li></ul></li><li>position: absolute，将元素移出可视区域，元素不可见, 触发重排</li><li>clip-path: 裁剪，元素不可见，占据空间，无法响应点击事件, 触发重绘<code>clip-path: circle(50% at center)``clip-path: rect(0, 0, 100px, 100px)</code></li><li>width/height: 盒模型相关属性设置为0，内部子元素设置为overflow:hidden隐藏子元素。元素不可见，不占据空间，不响应点击事件，触发重排</li></ul><p><strong>区别</strong></p><table><thead><tr><th></th><th>display: none</th><th>visibility: hidden</th><th>opacity: 0</th></tr></thead><tbody><tr><td>页面中</td><td>不存在</td><td>存在</td><td>存在</td></tr><tr><td>重排</td><td>会</td><td>不会</td><td>不会</td></tr><tr><td>重绘</td><td>会</td><td>会</td><td>不一定</td></tr><tr><td>自身绑定事件</td><td>不触发</td><td>不触发</td><td>可触发</td></tr><tr><td>子元素可复原</td><td>不能</td><td>能</td><td>不能</td></tr><tr><td>transition</td><td>不能</td><td>能</td><td>不能</td></tr></tbody></table>',5),r=[l];function s(o,c,n,h,_,p){return i(),d("div",null,r)}const b=t(e,[["render",s]]);export{m as __pageData,b as default};
