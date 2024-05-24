## vuex的响应式处理
vuex是vue的状态管理工具
1. vuex的state是响应式的，借助了vue的响应式系统，把state存到vue实例的data中, 利用vue的响应式机制确保state的变化能自动反映到视图上
2. 在vue的methods中，通过dispatch来触发actions中的方法，actions中通过commit会触发mutations，从而修改state里的值，通过getter把数据更新到视图

Vue.use(vuex)，调用install方法，通过applyMixin(vue)在任意组件内执行this.$store就可以访问到store对象。