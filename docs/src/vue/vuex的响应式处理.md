## vuex的响应式处理
vuex: vue的状态管理工具
1. vuex的state是响应式的，借助的就是vue的data，把state存到vue实例组件的data中,借助了vue的响应式
2. 在vue中触发methods中的方法，vuex是通过dispatch来访问actions中的方法，actions中的commit会触发mutations中的方法从而修改state里的值，通过getter把数据更新到视图

Vue.use(vuex)，调用install方法，通过applyMixin(vue)在任意组件内执行this.$store就可以访问到store对象。