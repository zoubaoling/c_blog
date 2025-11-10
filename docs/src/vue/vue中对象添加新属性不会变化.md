## 动态给 Vue 的 `data` 添加新属性时会发生什么？怎样解决

### 现象
动态添加的属性数据会更新，但是视图不会更新

### 原因
Vue 2 在数据初始化的时候遍历对象所有的属性，通过 `Object.defineProperty` 对已有的属性进行拦截处理成响应式，后续动态添加的属性没有被拦截，不是响应式，所以视图不会被更新

### 面试速记
- **现象**：`this.user.age = 18`，控制台数据变化但模板不刷新。
- **核心原因**：初始化阶段才会把属性变成响应式，后加的属性没做依赖收集。
- **解决思路**：让 Vue 重新走响应式流程，或者强制刷新本组件。
- **Vue 3**：基于 Proxy，新增属性天然响应式（除非破坏引用）。

### 常用解决方案
1. **`Vue.set` / `vm.$set(target, key, value)`**
   ```js
   this.$set(this.user, 'age', 18)
   Vue.set(this.profile, 'nickName', 'Ling')
   ```
   - 官方推荐做法，适合新增少量字段。
   - Vue 会立刻为新属性补上 getter/setter。

2. **替换为新对象触发依赖**
   ```js
   this.user = {
     ...this.user,
     age: 18,
   }
   // 或 Object.assign({}, this.user, { age: 18 })
   ```
   - 通过改变引用触发 getter，适合批量新增或需要重置对象。

3. **`this.$forceUpdate()` 兜底**
  ```js
  this.user.level = 'vip'
  this.$forceUpdate()
  ```
  - 强制当前组件及插槽内容重渲染，不会层层刷新子组件。
  - 仅作为临时解决办法；最好让数据保持响应式。

### 数组类似问题如何处理
- 指定索引：`this.$set(list, index, value)`
- 使用响应式变更方法：`splice`、`push`、`pop` 等 Vue 已重写，可触发更新。
- 重新赋值新数组：`this.list = [...this.list, item]`
- 兜底方案：`this.$forceUpdate()`

### Vue 3 如何回答
- Vue 3 使用 `Proxy`，新增属性天然响应式；问题多半出在解构、副本等破坏响应式引用的操作。
- 组合式 API 下依旧可以通过 `reactive`、`ref`、`toRefs` 保持引用稳定。

### 面试回答模板
1. 描述现象 + 原因（初始化劫持、后续无依赖）。
2. 列举三个解决方案，并指出各自使用场景。
3. 提醒数组也有相同问题，给出常用写法。
4. 最后补一句：Vue 3 的 Proxy 已解决该限制，展示版本知识面。
