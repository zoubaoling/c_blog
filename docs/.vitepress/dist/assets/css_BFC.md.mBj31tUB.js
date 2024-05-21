import{_ as t,c as o,o as l,a5 as i}from"./chunks/framework.B102yH4G.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"css/BFC.md","filePath":"css/BFC.md","lastUpdated":1715839678000}'),a={name:"css/BFC.md"},e=i('<h2 id="谈谈对bfc的理解" tabindex="-1">谈谈对BFC的理解? <a class="header-anchor" href="#谈谈对bfc的理解" aria-label="Permalink to &quot;谈谈对BFC的理解?&quot;">​</a></h2><p>BFC:Block Formatting Context，块级格式上下文，是页面中的一块渲染区域，有自己的渲染规则，目的是形成一个相对于外界完全独立的空间，内部的元素不会影响到外部的元素</p><h3 id="渲染规则" tabindex="-1">渲染规则 <a class="header-anchor" href="#渲染规则" aria-label="Permalink to &quot;渲染规则&quot;">​</a></h3><ol><li>Box垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的margin会发生重叠。</li><li>计算BFC的高度时，浮动子元素也参与计算</li><li>BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素</li><li>内部的Box会在垂直方向上一个接一个放置</li><li>BFC的区域不会与float box重叠</li><li>每个元素的margin box 的左边，与包含块border box的左边相接触,即使存在浮动</li></ol><h3 id="触发条件" tabindex="-1">触发条件 <a class="header-anchor" href="#触发条件" aria-label="Permalink to &quot;触发条件&quot;">​</a></h3><ul><li>浮动元素，float: left|right</li><li>overflow不为visible, 为auto scroll hidden</li><li>display, inline-block flex inline-flex grid inline-grid table inline-table</li><li>position: absolute | fixed</li><li>根元素, html</li></ul><h3 id="应用场景" tabindex="-1">应用场景 <a class="header-anchor" href="#应用场景" aria-label="Permalink to &quot;应用场景&quot;">​</a></h3><ol><li><p>防止外边距重叠（塌陷）</p><p><strong>外边距重叠现象</strong>: 相邻两个元素垂直方向上如果都设置了margin,实际渲染是取最大margin，而不是两个margin相加</p><p><strong>应用原理</strong>: 同一个BFC里，两个相邻的盒子margin会发生重叠</p><p><strong>实现</strong>：其中一个盒子外包一层容器，并触发生成一个BFC，那么就属于两个BFC，不会发生重叠，不会相互影响</p></li><li><p>清除浮动解决父元素高度塌陷的问题</p><p><strong>现象</strong>: 如果父元素内部存在float浮动元素，且父元素高度未设置，那么父元素的高度会塌陷，其中浮动子元素高度不计算，无法撑起父元素</p><p><strong>原理</strong>: 计算BFC的高度时，浮动子元素也参与计算</p><p><strong>实现</strong>：将父元素触发为BFC，比如:overflow: hidden</p></li><li><p>自适应两列布局</p><p><strong>现象</strong>: .left左浮动高度塌陷，.right div和.left同行，且占满整行，而不是只占据右侧宽度</p><p><strong>应用原理</strong>: BFC的区域不会与float box重叠</p><p><strong>实现</strong>：将.right触发为BFC,就不会和.left重叠了，不占满整行，与左侧浮动元素隔离开，不会环绕在浮动元素周围</p></li></ol><blockquote><p>float:文本环绕，元素按照在普通流的位置出现，然后按照浮动方向偏移</p></blockquote>',9),r=[e];function n(s,p,c,d,g,h){return l(),o("div",null,r)}const B=t(a,[["render",n]]);export{_ as __pageData,B as default};
