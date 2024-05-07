## DOM的常见操作有哪些
### DOM
文档对象模型，是HTML和XML文档的编程接口, 提供了对文档的结构化表述，定义了一种方式可以从程序中对结构进行访问，并改变文档的结构，样式和内容

任何HTML文档都可以用DOM表示为一个有节点构成的层级结构

- 元素节点
- 文本节点
- 属性节点
- ...

### 常见操作
- 创建节点
  - 创建元素（元素标签名）`createElement('div')`
  - 创建文本节点 `createTextNode('content')`
  - 创建文档碎片，轻量级，存储临时节点，一次性添加到DOM`createDocumentFragment()`,插入的不是其本身，而是所有子孙节点
  - 创建属性节点`createAtrribute('custom')`
- 查询节点
  - querySelector(.elment | #element | div | div + p > span | [name="username"])，无就返回null，有返回首个匹配元素
  - querySelectorAll，无返回空节点列表，有返回匹配element节点列表，静态快照，不是实时查询
  - getElementById: el, getElementsByClassName: NodeList, getElementsByTagName: NodeList, getElementsByName: NodeList
  - document.documentElement: HTML标签
  - document.body: body标签
  - parentNode > el; firstChild | lastChild > el; childNodes > NodeList; previousSibling | nextSibling > el
- 更新节点
  - innerHTML
  - innerText textContent: 自动对字符串进行HTML编码，无法设置HTML标签；innerText不返回隐藏元素的文本，textContent返回所有文本
  - style: 元素的style对应所有css,可以直接获取或设置，`-`需要转换为驼峰命名: style.propertyName = value
  - setAttribute
- 添加节点
  - innerHTML: 修改DOM节点的内容或替换DOM节点的内容`el.innterHTML='<span></span>'`
  - appendChild:子节点添加到父节点的最后一个子节点 `parent.appendChild(el)`
  - insertBefore: 子节点插入到指定元素之前`parentElement.insertBefore(newEl, referenceElement)`
  - setAttribute(attrname, value): 添加或修改节点属性
- 删除节点
  - 先获取要删除节点的父节点，调用父节点的方法删除自己: `self.parentElement.removeChild(self)`,返回删除的节点
  - 删除指定的属性：`removeAttribute(attribute)`
