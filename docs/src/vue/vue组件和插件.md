## Vue中组件和插件有什么区别
1. `组件` 由图形和非图形的逻辑组合在一起开发，以.vue格式结尾的文件都可以看作一个组件
2. `插件` 插件通常用于给vue添加全局功能，功能范围一般没有限制，比如：添加全局组件(app.component)、指令(app.directives)、过滤器 ，添加注入资源(app.provide), 全局添加方法或属性(app.config.globalProperties)等
3. 组件主要是实现业务功能，目标是App.vue，插件主要是功能模块，对vue功能的增强和补充

### 区别
`编写方式, 注册方式, 使用场景`

#### 编写方式
1. 组件
组件主要以.vue结尾，内容包括template script style，由图形和非图形逻辑组成
2. 插件
插件由一个包括install方法的对象实现，install方法接受两个参数，第一个为vue实例，第二个参数是配置对象

#### 注册方式
1. 全局注册
   - 组件的全局注册是`Vue.component('')`或`app.component()`
   - 插件的全局注册是`Vue.use()`或`app.use()`，重复注册也只会注册一次,vue会自动阻止后续的注册

2. 局部注册
   - 组件的局部注册: vue2和vue3选项式写法中在选项components中注册，vue3 setup模式导入后可以直接使用
