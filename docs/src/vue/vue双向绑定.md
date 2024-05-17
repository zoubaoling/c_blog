## 双向绑定
> 拦截器 + 编译器

### 依赖收集
使用`Object.defineProperty`来进行拦截处理，new Vue时对数据属性遍历拦截
1. dep: 依赖收集器`new Dep`，每一个属性都有一个依赖收集器，收集所有使用了该数据的`watcher`
2. Dep.target: 当前永远只存在一个`watcher`
3. dep.depend: get中执行，收集依赖 -> Dep.target.depend -> watcher.addDep -> wather.newDeps.push + dep.addSub(this|watcher)
4. Watcher: 监听器，$mount挂载时会`new Watcher(vm, updateComponent)`;`updateComponent: update(render)`
     - new Watcher初始化构造函数中执行this.getter=updateComponent和this.get()
     - this.get会执行pushTarget: Dep.target = this(watcher) -> this.getter | updateComponent -> popTarget -> cleanupDeps
     - 上述中updateComponent会进行对模版进行编译更新渲染，过程中会使用数据，触发拦截器get进行依赖收集 -> dep.depend: dep.addSub(渲染watcher)

### 派发更新
1. dep.notify: 通知依赖的watcher列表进行更新, subs.forEach(sub => sub|watch.update)
2. watch.update -> queueWatcher:维护一个watcher队列，在nextTick中执行更新flushSchedulerQueue，不是每个数据修改就更新
3. flushSchedulerQueue: 队列排序，watcher.run，重置 
     - 队列排序：从小到大 > 组件更新由父到子, 用户自定义Watcher优先于渲染Watcher,组件在其父组件watcher run期间被销毁，可以跳过其watcher
     - run
       - 上述依赖收集的this.get，修改dep.Target和执行value = getter（渲染Watcher会执行updateComponent,更新视图）
       - 计算结果与之前结果不一致 ｜ 计算结果为对象 ｜ deep: 修改值，执行watcher的回调函数，并传入新值和旧值
     - 重置相关状态

> [!IMPORTANT]
> [详见实例挂载](/vue/vue实例挂载)
  
