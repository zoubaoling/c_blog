## 请描述下你对vue生命周期的理解？在created和mounted这两个生命周期中请求数据有什么区别呢
### 基本API
组合式API中：beforeCreate和created在setup中，直接写逻辑即可

vue3要用import导入，选项式写法是写在methods中
| 生命周期函数 | 描述 | vue3 |
| ---- | ---- | ---- |
| beforeCreate | 执行时组件实例还未创建，通常用于插件开发中执行一些初始化任务(生命周期)，数据观测和事件等未初始化 | setup |
| created	| 创建实例后调用，此时实例的数据观测、事件等已经初始化完成，各种数据可以使用，常用于异步数据获取 initState: props methods data computed watch | setup |
| beforeMount	| 挂载实例之前调用，此时模板已经编译完成，但是还未挂载到DOM| onBeforeMounted |
| mounted	| 挂载实例后调用，此时实例已经挂载到DOM，可以进行DOM操作| onMounted |
| beforeUpdate | 数据更新之前调用，可用于获取更新前各种状态 | onBeforeUpdate |
| updated |	数据更新后调用，此时DOM已经完成更新，可以进行DOM操作| onUpdated |
| beforeDestroy |	销毁前，可用于一些定时器或订阅的取消，实例仍然可用 | onBeforeUnmount |
| destroyed |	组件已销毁，实例已经完全卸载 | onUnmounted |

以上为基本的生命周期，2 -> 3的主要变化是 destroy -> unmount, script setup的写法是在前面加上on

### keep-alive生命周期
- activated | onActivated：keep-alive包裹的组件激活时调用
- deactivated | onDeactivated：keep-alive包裹的组件停用时调用

### errorCaptured | onErrorCaptured
捕获来自组件及子孙组件的错误

### onRenderTracked onRenderTriggered
vue3新增的仅在开发模式下使用的钩子函数
- onRenderTracked: 组件渲染时追踪到响应式依赖时调用
- onRenderTriggered: 响应式依赖变更触发了组件渲染时调用

### 父子组件生命周期顺序
父组件先初始化，执行到beforeMount,去获取父组件的虚拟DOM，然后进行patch
  - patch过程中如果子组件是组件类型，那么就会进入子组件的初始化流程，走到beforeMount
      - 如果存在子组件一样进入子组件初始化流程
      - 如果不存在则当前子组件mounted完
  - 父组件mounted完
> 初始化、更新等过程中，父子组件是深度递归创建、更新子组件的过程
1. 父组件 -> beforeMount(beforeUpdate beforeUnmount)
2. 子组件 -> beforeMount(beforeUpdate beforeUnmount)
3. 子组件 -> mounted(updated unmmounted)
4. 父组件 -> mounted(updated unmounted)

#### 注意事项
1. 生命周期钩子函数中的this指向的是引用的实例，不可以用箭头函数
2. setup是唯一可以使用组合式钩子函数的地方，其他地方会运行时错误。但是可以写在其他地方，执行时上下文是setup即可


### created VS mounted
- created组件实例创建完成，但是DOM未渲染；mounted DOM渲染完成，可以拿到DOM数据，都可以拿到属性和方法
- 在mounted时使用接口可能存在页面闪动问题，但是如果需要对接口请求完对DOM进行处理，可以在mounted中，否则使用created，不会存在闪动问题
- 请求数据与DOM无关，在created中，需要访问DOM，在mounted中