## Vue 中如何做强制刷新？

### 一句话回答
常见做法：浏览器层面用 `location.reload()`，路由层面用 `this.$router.go(0)`，组件层面通过切换 `key`、`v-if` 或调用 `this.$forceUpdate()` 强制重新渲染，但要根据业务选择最小影响范围。

### 浏览器整体刷新
- **`location.reload()`**：刷新整个页面，走标准页面生命周期，适合全局状态失效或与后端同步。
- **优点**：最彻底，确保所有资源重新加载。
- **缺点**：用户体验差，前端状态全部丢失。

### 单页面应用路由刷新
- **`this.$router.go(0)`**（Vue Router 2 / 3）：等价于浏览器的后退再前进，重新执行当前路由的导航守卫与组件创建。
- **优点**：保持 SPA 的路由逻辑，局部刷新。
- **缺点**：依赖路由；离开当前路由的缓存或全局状态仍需手动处理。
- Vue Router 4（Vue 3）写法相同：`router.go(0)`。

### 组件级重新渲染
1. **切换 `key`**：更改组件的 `key`，让 Vue 认为是全新节点，从而销毁并重建。
   ```vue
   <child-component :key="componentKey" />
   // 刷新
   this.componentKey = Date.now()
   ```
   - 场景：需要重置组件内部状态（表单、第三方插件）。
   - 优点：只影响目标组件。
   - 构造函数、生命周期重新走一遍。

2. **`v-if` 切换**：通过条件渲染控制组件挂载/卸载。
   ```vue
   <child-component v-if="visible" />

   refresh() {
     this.visible = false
     this.$nextTick(() => (this.visible = true))
   }
   ```
   - 适合重置组件树或临时释放资源。

3. **`this.$forceUpdate()`**：强制当前组件重新渲染模板，但不会重建子组件，也不会触发完整生命周期。
   - 用于依赖非响应式数据时的兜底方案。
   - Vue 3 对应组合式 API：`getCurrentInstance().proxy.$forceUpdate()`，但官方更推荐让数据响应式化。

### 面试说法建议
1. 先问清需求：是刷新整页、当前路由，还是仅重置某个组件。
2. 按影响范围从大到小列举：`location.reload()` → `router.go(0)` → `key` / `v-if` / `$forceUpdate`。
3. 强调 `$forceUpdate` 只重渲染本组件、不会更新子组件，慎用；最佳实践是让数据响应式。
4. Vue 3 场景说明：路由写法一致，组合式 API 下切换 `key`、`v-if` 仍然适用。