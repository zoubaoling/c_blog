## DOM 的常见操作有哪些？

> DOM（Document Object Model）是把 HTML/XML 文档抽象成树形节点的编程接口，开发者可以创建、查询、更新、删除以及监听这些节点。

### 节点类型速记
- 元素节点（Element）
- 文本节点（Text）
- 属性节点（Attr）
- 注释节点（Comment）

### 创建节点
- `document.createElement("div")`：创建元素节点。
- `document.createTextNode("content")`：创建文本节点。
- `document.createDocumentFragment()`：创建文档碎片，适合批量插入。
- `document.createAttribute("data-id")`：创建属性节点（实际开发多用 `setAttribute`）。

### 查询节点
- CSS 选择器：`querySelector`（首个匹配）、`querySelectorAll`（静态列表）。
- 传统 API：`getElementById`、`getElementsByClassName`、`getElementsByTagName`、`getElementsByName`。
- DOM 定位：`parentNode`、`firstChild`、`lastChild`、`childNodes`、`previousSibling`、`nextSibling`。
- 文档根引用：`document.documentElement`（`<html>`）、`document.body`、`document.head`。

### 更新节点内容/属性
- `element.innerHTML`：读写 HTML 字符串，注意 XSS 风险。
- `element.textContent` / `innerText`：读写纯文本（`textContent` 包含隐藏元素）。
- `element.style.propertyName = value`：直接操作行内样式，`background-color` 转驼峰 `backgroundColor`。
- `element.setAttribute(name, value)` / `getAttribute`：属性读写。
- `classList.add/remove/toggle/contains`：操作类名，优于直接拼接 `className`。

### 插入节点
- `parent.append(child)`：可一次插入多个节点或字符串。
- `parent.appendChild(child)`：把节点放在父节点子列表末尾。
- `parent.insertBefore(newNode, referenceNode)`：插入到指定节点前。
- `parent.replaceChild(newNode, oldNode)`：用新节点替换旧节点。
- 批量插入技巧：先把元素放进 `DocumentFragment`，最后一次性挂载。

### 删除节点
- `parent.removeChild(child)`：从父节点移除指定子节点。
- `node.remove()`：直接删除节点（现代浏览器支持）。
- `element.removeAttribute(name)`：移除属性。

### 事件与监听
- `element.addEventListener(type, handler, options)`：注册监听，`options` 可指定 `capture`/`once`/`passive`。
- `element.removeEventListener(type, handler, options)`：取消监听。
- 事件委托：在父节点监听，使用 `event.target` / `closest` 识别子节点。

### 节点尺寸与位置（常用属性）
- `element.offsetWidth/offsetHeight`：布局尺寸，包含 padding + border。
- `element.clientWidth/clientHeight`：内容 + padding。
- `element.getBoundingClientRect()`：获得元素相对视口的位置信息。

### 面试提示
- 区分 `innerHTML` 和 `textContent` 的安全性与性能。
- 熟悉文档碎片、事件委托等性能优化手段。
- 提及现代 API：`append`/`prepend`/`before`/`after`/`replaceChildren` 增强 DOM 操作体验。
