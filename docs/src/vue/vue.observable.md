## Vue.observable你有了解过吗？说说看
### 做了什么
Vue.observable将一个对象变成响应式对象，数据更新时，视图可随之更新。
vue2中是直接对原对象进行修改，vue3不会修改原对象，而是返回一个代理对象(observable遗弃，变更为reactive)

### 使用场景
非父子组件通信时，可以作为最小单位（简单）的跨组件通信状态存储器
- 使用Vue.observable创建state
- 创建mutations方法修改state的值
- template中直接使用state和mutation

### 原理
实际上就是vue内部的响应式实现
- 数组：数组方法进行重写，从而拦截
- 对象：遍历对象属性，每个属性进行拦截，get收集依赖，set通知观察者
[解析参考](https://vue3js.cn/interview/vue/observable.html#%E4%B8%89%E3%80%81%E5%8E%9F%E7%90%86%E5%88%86%E6%9E%90)