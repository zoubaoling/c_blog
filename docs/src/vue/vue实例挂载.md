## vue的实例挂载过程

### new Vue的过程
1. 初始化生命周期、事件中心（初始化的是父组件在模板中使用v-on或@注册的监听子组件内触发的事件）、渲染函数
2. beforeCreate
3. 初始化: injection > state(props > methods > data > computed > watch) > provide
4. created
5. $mount 挂载: 编译$mount > 运行$mount（模版编译 -> 模版挂载）

### 模版编译阶段
1. 编译$mount: 将template中的原生HTML和非原生HTML内容找出来，经过一系列逻辑处理成渲染函数render，就是编译
2. template -> 模版编译 -> render -> VNode -> patch -> 视图
   1. 模版编译：template -> 模版编译 -> render
   2. 虚拟DOM：VNode -> patch -> 视图

#### 模版编译
1. `parse模版解析`，将template解析生成AST语法树
     - parse: parseHTML -> parseText parseFilters
        - 文本
        - 注释<!-- -->
        - DOCTYPE <! DOCTYPE html>
        - 开始标签
        - 结束标签
     - 标签根据内容去匹配，使用正则匹配，匹配完创建AST节点。
     - 文本解析是将parseHTML解析出来的文本内容进一步处理，文本中如果存在变量提取出来二次加工
2. `optimize优化阶段`：遍历AST语法树，将静态节点打上标记 
     - 找出静态节点和静态根节点并打上标记 -> 在patch阶段，静态节点就不需要比对
     - 模版解析过程中会对节点判断添加type值
3. `generate代码生成阶段`：将AST语法树转换成渲染函数 
     - 递归遍历根据tag data children生成对应的字符串`h(tag, data, children)`，再将对应字符串转换为可执行的方法


### 模版挂载阶段
vm.$mount：编译时 > 运行时
> beforeMount > 创建vm.$el并替换el > mounted

1. vm.$mount方法--编译时,模版编译
     1. 不能挂载到body和html中(document.body document.documentElement)
     2. options.render存在，处理传入的template
     3. 处理template
          - 存在templaet,解析vue模版文件
              - 如果是字符串类型且以#开头，作为ID获取元素
              - 如果是节点，直接获取节点内容innerHTML
              - 否则抛出警告，template不合法
          - 不存在template，根据el选择器获取template outerHTML
     4. 编译解析template，得到render函数
          - 将template解析成ast语法树ast tree
          - ast tree转换成render语法字符串
          - render语法字符串转换成render方法
2. 调用mount.call() -> Vue.prototype.$mount(public mount method)方法--运行时，模版挂载
     1. 执行mountComponent
     2. 无render，生成空的虚拟节点
     3. callHook: beforeMount(模版编译解析完成，但是未挂载)
     4. 定义updateComponent更新渲染视图的方法:vm._update(vm._render())-lifecycleMixin中定义的
          - render: 生成虚拟节点VNode
          - update: `patch`节点,VNode转换为真实的DOM，并更新到页面
     5. 创建监听器`new Watcher(vm, updateComponent,...)`，开启对模版中数据的监控,组件数据变化执行updateComponent函数，并触发 `beforeUpdate`钩子函数
          - updateComponent执行使用的数据会被getter拦截，将当前watcher实例添加到数据依赖列表中
          - 数据变化时通知依赖列表里的依赖，依赖（watcher实例）接收到通知后，执行回调函数，更新视图，触发beforeUpdate