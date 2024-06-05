## vuex刷新数据会丢失吗？怎么解决？
vuex会重新获取数据，页面也会丢失数据

### 原因
vuex存储的数据是在内存中管理的，内存中的数据会在页面刷新时重置

### 解决方案
1. 把数据直接保存在浏览器缓存里（cookie  localstorage  sessionstorage）
2. 页面刷新的时候，再次请求数据，并初始化，达到可以动态更新的方法
     - 监听浏览器的刷新事件
     - 在刷新前把vuex数据保存到storage里
     - 刷新后使用接口数据或者storage里的数据初始化vuex状态
     - 存储数据: `beforeRouteLeave beforeDestroy`
     - 恢复数据: `beforeRouteEnter mounted`