## CSS 性能优化面试速记

> 三大方向：**加载速度**、**匹配效率**、**渲染成本**。回答时先概括，再挑关键招式展开。

### 1. 加载优化（Critical Rendering Path）
- **减少请求**：合并/压缩 CSS，开启 HTTP/2 后仍可按页面拆分但保持体积小。
- **避免 `@import`**：`link` 标签可并行请求，还能配 `media`、`rel` 属性，兼容更好。
  > 提示：`@import` 需等主样式表解析完成才触发下一次请求，首屏阻塞更严重；`<link>` 在 HTML 解析阶段即可并行下载。
- **关键 CSS 内联**：首屏样式放 `<style>` 内，其余用外链；平衡体积与缓存。
- **延迟非关键样式**：
  ```html
  <link rel="preload" href="theme.css" as="style" onload="this.rel='stylesheet'">
  <link rel="stylesheet" href="print.css" media="print">
  ```
- **按需加载**：路由级样式使用 JS 动态插入 `link`，避免首屏阻塞。

### 2. 选择器优化（Style Recalc）
- 浏览器从右向左匹配规则，尽量保持选择器扁平：`.card h3` ≈ 2 层已够用。
- 优先使用类、ID；慎用层级过深、通配、属性等低效选择器。
- 模块化命名（BEM、CSS Modules）既利于维护也避免深层嵌套。

### 3. 渲染优化（Layout & Paint）
- **减少回流**：避免频繁读写布局属性，批量操作 DOM；用 `requestAnimationFrame` 包裹。
- **使用合成层**：平移动画改用 `transform: translate3d`，透明度动画用 `opacity`。
- **降低重绘**：复杂阴影、渐变数量控制在必要范围，可用 `will-change` 预热但适量。
- **避免抖动**：动画时锁定尺寸（`width/height`），减少因内容变化触发 reflow。

### 4. 资源与策略补充
- 图标优先 SVG/IconFont；大图懒加载，`background` 图精灵/裁剪。
- 结合 `content-visibility: auto;`、`contain` 限定影响范围。
- 使用构建工具自动化（PostCSS、cssnano、CriticalCSS）保持一致性。

### 异步加载常用写法
```html
<!-- onload 切换 media -->
<link rel="stylesheet" href="print.css" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="print.css"></noscript>

<!-- JS 动态引入 -->
<script>
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/dashboard.css';
  document.head.appendChild(link);
</script>
```

### 面试提示
- 回答结构：加载 → 选择器 → 渲染 → 具体实践（如关键 CSS、`transform` 动画）。
- 主动提及检测手段：Chrome Performance、Lighthouse、`CSS Triggers`、`coverage` 面板。
- 补充团队经验：设计系统、CSS 变量、按路由拆分打包，体现系统化思维。
