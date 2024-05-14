## vuex在什么场景会去使用？属性有哪些？
- state: 存储变量
- getters: state的计算属性
- mutations: 提交更新数据的方法
- actions: 和mutations差不多，他是提交mutations来修改数据，可以包括异步操作
- modules: 模块化vuex

使用场景：
逻辑比较复杂的模块：用户的个人信息、购物车模块、订单模块