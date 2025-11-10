## computed VS watcher
computed 是计算属性，watch 是监听属性

watch和computed都是以vue的依赖追踪机制为基础的，当依赖的某个数据变化时，其相关的数据相应变化或执行相应处理方法

### 使用上
1. computed基于data和props中的数据进行计算；watch基于props、data和computed中的数据，监听的数据变化时，进行其他处理
2. computed 具有缓存性，只有当其依赖的数据发生变化时，才会重新计算，否则取缓存；watch不存在缓存性，监听数据变化时，直接触发响应操作
3. computed不支持异步操作，watch支持异步操作，可以在数据变化时进行异步处理业务逻辑操作
4. computed定义的计算属性，和data类似，以属性访问的形式访问。watch是监听数据变化时，执行对应的回调函数
5. computed可以是一个包含get和set的对象，或者一个函数-默认作为get方法，必须有一个返回值；watch接受一个包括handler的对象或者回调函数，回调函数两个参数分别为新值和旧值
6. computed一般用于复杂的逻辑运算，一个数据受一个或多个数据影响，比如模版中的复杂表达式；watch一般处理一个属性变化时，需要执行哪些具体的业务操作，一般用于异步操作或者开销比较大的情况，或一个数据影响多个数据时

### 原理上
1. computed和watch都是在initState中初始化，computed 初始化完初始化 watch
2. computed本质是computed watcher，watch本质是user watcher($watch,执行回调函数时，会捕获处理错误)

### computed watcher
1. render渲染访问到某个computed时, 触发computed的get, 渲染watcher订阅了computed watcher
2. 初始化computed时，第一次计算数据时，会触发依赖数据的get，将所依赖的数据的dep添加到当前的computed watcher中
3. 依赖的数据变化时，通知对应订阅了的computed watcher，执行watcher.update > getAndInvoke
4. getAndInvoke会通过get计算新值，比对最终的新值和旧值，变化时才会执行回调：dep.notify > 订阅了当前computed watcher的渲染watcher重新渲染

[源码解析参考](https://ustbhuangyi.github.io/vue-analysis/v2/reactive/computed-watcher.html#watcher-options)
[题目参考](https://fe.ecool.fun/topic/f8de3a13-fb8b-44fd-9a8c-460a36998902?orderBy=updateTime&order=desc&tagId=14)