## vue3 问题简要整理
1. ref变量作为reactive的一个属性会被自动解包，不需要.value，否则会失去响应式
2. ref变量作为reactive的数组或者set map集合中的一项，不会被自动解包，需要.value
3. 模版中，只有顶级的ref才会被自动解包,{ name: ref('')}的name不是顶级的，不会被解包
4. reactive直接解构，解构后的变量不存在响应性，原变量的修改不会影响其变化
5. computed返回一个ref类型数据
6. 组件有多个根节点时，可通过$attrs.class来获取父组件中传入的class
7. vue3中，同时存在v-if和v-for，if会先执行，v-if无法访问v-for中定义的变量
8. 内联事件中传event可以使用$event或者内联箭头函数传入event
9. watch数据源：ref, reactive, getter, 多个数据源组成的数组;不能直接obj.property，可以使用getter
10. watch属性：deep immediate once, immediate默认为false
11. watchEffect(() => ({}))自动追踪依赖的数据变化，回调立即执行，不需要设置immediate,适用于有多个依赖项
12. watchEffect只在同步执行期间追踪依赖。使用异步回调时，只有第一个await正常工作前访问到的属性才会被追踪，后面的不会追踪数据变化
13. watch回调会在父组件更新之后，所属组件DOM更新之前调用，如果回调中访问所属组件的DOM，是更新之前的内容
14. 如果想在watch中访问到更新后的DOM，可以配置属性{flush: 'post'},watchEffect 有方便的别名：watchPostEffect
15. 同步侦听器，在组件更新之前触发：{ flush: 'sync' } 或者 watchSyncEffect; 同步侦听不会批量处理，每次数据变化时，都会触发，最好监听简单的Boolean，避免在可能多次同步修改数组等数据源上使用
16. script setup中创建的侦听器在组件销毁时会自动停止，但是必须是同步语句创建，不能异步语句：setTimeout。手动停止则为调用watch返回的函数：const unwatch = watch() -> unwatch()
17. 模版引用ref，手动声明，只有在组件挂载后才能访问，初始挂载前访问不到
18. v-for中的模版引用是数组，但是不保证与原数组相同顺序 ---?
19. 组件引用，引用script seupt模式的组件，需要使用defineExpose暴露数据，才能被父组件引用
20. script setup中 defineProps | defineEmits 不需要显示导入
21. 模版中可以使用$emit
22. 动态组件component is可以传注册的组件名和导入的组件对象
23. 传给子组件的属性名、事件名模版中可以写为kebab-case
24. `<tr is="vue:blog-post-row"></tr>`：自定义组blog-post-row作为html元素tr的内容，使用在原生HTML上时，is的值需要加前缀`vue:`才能解析为vue组件
25. 全局注册未使用的组件无法被tree-shaking，局部注册未使用的可以
26. script setup中导入的组件直接在模版中使用，不需要注册
27. 组件注册名格式：PascalCase 使用时也使用PascalCase格式
28. 绑定多个prop，v-bind="{ id: '', title: ''}"等价于 :id="obj.id" :title="obj.title"
29. props是单项数据流，子组件中不可以修改prop，会警告
30. defineModel返回一个ref值，可以被修改和访问，起到在父组件和当前组件双向绑定的作用。等同于defineProps['modelValue'] + defineEmits['update:modelValue']
31. defineModel('title', { required: true, default: 0 })
32. 可以同时使用多个v-model，`v-model:first-name` `v-model:last-name` -> `const firstName = defineModel('firstName')`，需要指定名称
33. v-model自定义修饰符`v-model.capitalize` -> `const [model, modifiers] = defineModel({get(), set()})`,defineModel还可以传入get set的对象,读取modifiers内容做响应逻辑处理
34. 带参数的修饰符`v-model:first-name.capitalize=""` -> `const [fistName, firstNameModifiers] = defineModel('firstName')`
35. defineOptions({inheritAttrs: false}) 禁用继承attribute
36. 透传的attribute可以在模版中通过$attrs访问，包括class style v-on props等，但还未被消费过
37. v-bind=“$attrs" 使头转应用到指定目标元素
38. 有多个根节点，没有显式的通过v-bind绑定，会警告
39. js中 useAttrs()获取透传的attributes，不是响应式的
40. 插槽作用域无法访问子组件数据，除非使用作用域插槽-模版中表达式只能访问定义时的作用域
41. 条件插槽：子组件可以通过v-if和$slot实现：$slot.header
42. 作用域插槽子组件slot上可以通过v-bind来传递所有数据
43. v-slot:slotName="slotProps || {}" -> #slotName
44. provide('name', value), inject('name', 'default value'),如果注入的是ref，不会自动解包，可以保持响应连接
45. 异步组件`defineAsyncComponent`,接受一个返回Promise的函数，ES模块导入返回的也是一个Promise，可以动态导入组件`defineAsyncComponent(() => import('a.vue'))`
46. 异步组件可以配置各种选项`defineAsyncComponent({ loader: () => import(), loadingComponent: 加载异步时使用的组件, delay: 200, errorComponent: '', timeout: Infinity })`
47. 组合式函数中推荐返回多个ref值，而不是reactive,这样解构后不会失去响应
48. 纯逻辑复用时使用组合式函数，同时复用逻辑和视图布局时使用无渲染组件
49. VFocus -> v-focus,script setup中无需注册
50. 插件：包括install(app, options)方法的对象，app.use使用
51. script setup会自动根据文件名生name，不需要手动声明
52. 动态组件切换时默认销毁重建，可以用keep-alive缓存
53. `Teleport`传送组件，传送到组件的DOM解构外的位置, to="body"- css选择器字符(#id, .class)或者DOM元素对象；disabled
54. Suspense 实验性。两个插槽：#default和#fallback。遇到异步代码为挂起状态，挂起期间展示后备内容：#fallback比如loading...，异步完成进入完成状态，展示默认插槽内容#default
55. script setup顶层await可以直接使用，不需要添加async 
56. readonly()接受一个对象，返回一个只读代理，只读代理不可更改
57. isRef判断是否为ref;unref返回原值，等同于`val = isRef(val) ? val.value : val`;
58. toRef将reactive变量属性转换为ref，保持连接`toRef(reactive, 'name')`,可以结合Props使用
59. toRefs将reactive转换为普通对象，每个属性都是一个Ref，且与源连接。解构对象而不失去响应性
60. isProxy判断是否为reactive readonly shallowReactive shallowReadonly创建
61. isReactive: reactive shallowReactive
62. isReadonly: readonly shallowReadonly
63. toValue(函数或者值) unref：toValue(source) => isFunction(source) ? source() : unref(source),两者差不多，一个支持getter方法
64. toRaw返回由`reactive` `shallowReactive` `readonly` `shallowReadonly`创建的代理对应的原始对象
65. shallowReactive，只有根级别的属性是响应的
66. triggerRef强制触发shallowRef的副作用