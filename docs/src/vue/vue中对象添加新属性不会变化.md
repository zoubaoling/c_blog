## 动态给vue的data添加一个新的属性时会发生什么？怎样解决
### 现象
动态添加的属性数据会更新，但是视图不会更新

### 原因
vue2在数据初始化的时候遍历对象所有的属性，通过Object.defineProperty对已有的属性进行拦截处理成响应式，后续动态添加的属性没有被拦截，不是响应式，所以视图不会被更新

### 解决方案
1. `Vue.set | vm.$set (target, propertyName, value)`
   - 给指定对象新增一个属性，新增的属性会进行响应式处理
2. `Object.assign`
   - 将旧对象和新属性合并起来成一个新对象，赋给原对象，触发对象的getter
3. `$forceUpdate`
   - $forceUpdate重新渲染组件，只会影响实例本身和插入插槽内容的子组件，不是所有子组件

### 小结
- 如果是添加少量的属性，可以采用set方法
- 如果要添加大量的新属性，可以使用Object.assign
- 不知道怎么办，可以使用$forceUpdate，但是一般此时就可以看看代码哪里是不是写的不合适了

:::tip
如果是数组：
1. `Vue.set|vm.$set(arr, index, value)`
2. 整个数组重新赋值
3. `$forceUpdate`
:::
