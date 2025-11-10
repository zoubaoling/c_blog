## vue3 原理
> [在线编译器](https://template-explorer.vuejs.org/) · 面试视角精读

### 面试速答提纲
- 三件套：**响应式 (Reactive)**、**编译器 (Compiler)**、**渲染器 (Renderer)**。
- 主流程：`createApp/setup → 渲染 effect → track 收集 → patch 挂载 → trigger 更新 → scheduler 批量执行`。
- 升级点：Proxy 响应式、静态提升 + Patch Flag、Block Tree、Fragment/Suspense、自定义渲染器。
- 答题顺序：总览 → 拆解三块（响应式/编译/渲染）→ 举 diff 例子 → 补充调度与优化。

### 核心流程速览
1. 初始化：`createApp` + `setup` 生成响应式 state / computed / watch。
2. 渲染 effect：effect 包裹 render，访问响应式数据触发 `track`。
3. 挂载 patch：`render` → `patch` 把 vnode 转真实 DOM，记录更新函数。
4. 更新调度：`set` → `trigger` → scheduler 入队；`nextTick` 等待 DOM 同步完。
5. Diff 策略：双端比较 + Patch Flag 跳过静态节点，中间乱序配合 LIS。

### 三大模块拆解

#### 响应式系统（Reactive）
- 目标：把任意对象/值转换成可追踪的 Proxy 或 Ref，并在数据变化时触发副作用。
- 关键词：`effect`（副作用）、`track`（依赖收集）、`trigger`（触发更新）、`scheduler`（调度）。

::: details 深入细节
- `reactive`：通过 Proxy 拦截 `get/set`，`get` 时根据 `target → key → dep` 建立依赖，`set` 时触发依赖集合。
- `ref`：本质是带有 `.value` 的响应式盒子，`get value`/`set value` 内部调用 `track/trigger`。
- `computed`：懒执行 effect，内部维护 `dirty` 标记和缓存值，只有依赖改变时才重新计算。
- `watch/watchEffect`：构造自定义 effect，支持 `flush` 选项控制执行时机；`watch` 有新旧值，`watchEffect` 自动依赖收集。
- 依赖存储：`WeakMap(target) -> Map(key) -> Set(effects)`，避免内存泄漏，支持按需清理。
:::

#### 编译器（Compiler）
- 目标：把模板编译成高效的渲染函数（`render`），并为渲染器提供静态标记信息。
- 流程：`parse (AST) → transform (静态提升/patch flag) → generate (render 函数)`。

::: details 深入细节
- `parse`：生成含标签、属性、指令、文本等节点的 AST。
- `transform`：
  - **静态标记**：标识无需参与 diff 的节点。
  - **静态提升**：将静态子树 hoist 到顶层，只创建一次。
  - **事件缓存**：缓存内联事件处理函数，避免重复创建。
- `generate`：输出 `render` 函数；结合 Vite 可做到按需编译、热更新。
- Vue2 vs Vue3：同样 parse → optimize → codegen，但 Vue 3 引入 Patch Flag/Hoist/缓存等优化，生成 render 函数的方式更灵活。
:::

#### 渲染器（Renderer）
- 目标：根据生成的 vnode 描述，创建/更新真实 DOM；渲染器可被自定义（SSR、Native）。
- 核心：`createRenderer` 返回 `render` 与 `patch`；支持元素、组件、Fragment、Teleport、Suspense 等类型。

::: details 深入细节
- `mountComponent`：执行 `setup`，创建渲染 effect，把组件更新函数作为副作用存入响应式依赖。
- `patch`：区分元素/组件/文本/注释/Fragment，多分支处理。
- `diff`：
  - 先处理相同前缀/后缀节点；中间乱序部分用 Map+LIS 确定移动。
  - 静态节点跳过比对，高效更新子树。
- `scheduler`：所有 effect 进入微任务队列，合并多次状态更新；`nextTick` 在更新刷完后执行回调。
:::

### 与 Vue 2 的关键差异
- **响应式实现**：Proxy 替代 `Object.defineProperty`，无需 `Vue.set/delete`，数组索引天生支持。
- **模板编译**：Patch Flag、静态提升、事件缓存让 diff 更精准。
- **渲染结构**：Block Tree + Fragment，减少无用容器，提高 patch 效率。
- **API 设计**：组合式 API、`createApp` 实例化、全局 API 可 Tree-shake。
- **生态工具**：Vite、Pinia、TypeScript 支持更好。

### 画龙点睛：调度 & 组合式
- `effect` 支持自定义 scheduler（如过渡动画、keep-alive 刷新顺序）。
- `nextTick` 基于 Promise 微任务，确保在 DOM 更新后执行回调。
- 组合式 API（`setup/useXxx`）基于响应式核心实现，逻辑复用更轻量。

### 面试总结技巧
1. **结构**：用“三件套 + 流程”开场，证明你掌握宏观架构。
2. **细节**：挑一两处深入讲（如响应式依赖表、diff LIS），避免面面俱到却浅显。
3. **对比**：顺带提 Vue 2 的局限和 Vue 3 的优势，体现迁移经验。
4. **实践**：可举项目优化案例（如大列表 diff 优化、动态路由懒加载）呼应理论。

---

> 下方为原始拆解笔记，按需查阅。

::: details 原始笔记（响应式、编译、渲染、diff 详解）
### 核心模块
1. `Reactive`: 响应式处理
   - 使用`track, trigger, effect`跟踪收集依赖并触发变化
   - `proxy`代理, `get`: track, `set`: trigger
   - `effect`: 用于组件渲染、computed数据、watch数据, 类似vue2的watch，添加数据响应时的副作用(重新渲染、重新计算、调用侦听回调函数)
2. `Compiler`: 编译模版，将HTML编译成render/h渲染函数
3. `mount`: 根据渲染函数生成VNode，将组件渲染挂载到web页面上
   - `createVNode`: 执行`createAppAPI/createApp/app/mount/createVNode`获取VNode
   - `render`: 接收VNode,执行render渲染器, 进行DOM操作挂载到页面
   - `patch`: 接收新旧两个VNode, 进行diff比对，进行局部更新

#### 一个简单组件的执行
1. vite编译阶段：`Compiler`模版编译将HTML/Template编译成渲染函数, 将脚本编译成可执行函数(script setup会编译成setup函数)，编译样式并添加scoped处理
2. createApp执行，初始化应用
3. `baseCreateRenderer`, 创建更新渲染函数和渲染effect, 将组件更新渲染函数作为副作用传入渲染effect，方便后期更新
4. 默认执行`effect.run`: 将`activeEffect`设置为this-渲染effect, 然后执行更新渲染函数(执行完毕弹出activeEffect)
5. mountComponent/setupComponent/setupComponent初始化，执行编译后的setup函数(包括业务代码内容)，根据setup函数内容创建响应式数据(proxy代理)、watch、computed等
6. 渲染函数执行
   - 读取响应式数据，被get拦截，调用`track`进行依赖收集,将渲染effect-(副作用为更新渲染函数)添加进数据属性的依赖池里
   - `render`函数返回一个虚拟DOM节点
7. 挂载阶段`mount`, 将虚拟节点挂载到web
8. 后续响应数据变化，执行`trigger`触发更新, 根据数据属性的依赖池遍历执行effect--更新渲染函数
9. 执行path，进行diff比对

### 响应式
#### reactive
reactive.ts: 整体思想和vue2类似，对数据通过拦截进行响应式处理，`get`收集依赖，`set`触发依赖
1. `reactive.ts`中使用`proxy`进行代理，`proxy(target, handler)`
2. `baseHandlers.ts`中对各类操作进行代理
   - `get`使用`track`收集依赖, 通过Map管理，添加activeEffect-渲染effect, computed effect, watch effect
   - `set`使用`trigger`触发事件, 触发对应的effect添加的副作用-重新渲染，重新计算计算属性，调用侦听函数

#### ref
ref可以看作reactive的变形版本`{value: toReactive(value)}`，class类实现
1. 使用`reactive`将值转换为响应式
2. 设置`get value`，使用track收集依赖，并返回处理后的响应式对象
3. 设置`set value`, 使用trigger触发依赖

#### computed
和`ref`类似
1. 处理参数，可以是getter方法, 也可以是包含[get, set]的对象
2. 初始化一个`ComputedRefImpl`实例
  1. 创建一个computed effect, 将`getter(this._value)`函数作为副作用传入computed effect, 便于后期触发依赖重新计算computed
  2. 设置类`get value`, 所以使用类似ref，通过.value获取
      - 获取原始对象
      - 检查是否需要重新计算(比对_value和effect.run--getter)，如果需要则执行trigger执行前面传入的`getter(this._value)`即重新计算值并更新值
      - 执行track收集对计算属性的依赖，比如渲染effect
      - 返回_value
  3. 设置类`set value`, 执行初始化传入的option.set函数

:::: tip
1. computed effect订阅其中使用的响应式数据，当响应式数据变化时重新执行computed effect的getter(_value)重新计算值--在第一次渲染计算值的时候会访问响应式数据
2. 渲染effect订阅computed effect，computed更新时重新执行渲染effect的更新渲染函数--第一次渲染初始化时订阅
3. computed变量在模版中使用时，才会计算其变量。渲染effect的更新函数中根据`effect.dirty(triggerComputed(dep.computed) > computed.value)`来判断执行`effect.run`
::::

#### watch
- 根据传入来源参数形式处理`getter`
- 根据`flush`参数处理`schedule`
- 创建watch effect，传入`getter和schedule`--当前渲染watcher监听watch effect
  - 执行effect.run-> getter，重新计算监听值，将新值和旧值传入回调函数，`watchEffect`则直接执行副作用
  - 计算值时，访问其他响应式变量，当前watch effect订阅响应式变量属性
  
### 编译 & 渲染
**vue3里编译和渲染是分开的，编译由vite构建工具执行， 开发时可以快速的热更新**
1. `编译` compile.ts/baseCompile对模块进行编译, 获取渲染函数`h()`: parse > optimize > generate
   1. 编译是vite构建工具执行的，开发时按需编译，构建时构建整个应用
   2. 根据入口配置，将import相关的文件经过解析、优化、生成代码，最终编译成渲染函数`h()`
   3. 各模块编译后的渲染函数会存储在vite本地开发服务器内存中, 由vite将编译后的渲染函数提供给渲染器
2. `渲染` createApp, 将编译后的渲染函数`h()`通过渲染器render转换成虚拟DOM节点，再mount处理为真实DOM并挂载在页面上
   1. 浏览器访问URL
   2. 访问入口文件，执行`createApp(App)`,此时获取到的是vite提供的编译后的根模块的渲染函数
   3. 将编译后的入口模块返回给浏览器
   4. 渲染器渲染根文件的渲染函数，并根据依赖关系使用渲染器渲染编译后的各子模块的渲染函数`h()`
   5. 浏览器里页面按需加载成功
   6. 修改文件，渲染器根据之前编译处理得到的渲染函数来进行重新渲染，而不是重新编译
   7. 重新执行vite编译命令会重新编译
  
::::tip 编译：vue2 VS vue3
1. 大阶段都为解析为AST，优化、生成代码
2. vue3的优化更灵活，引入了静态标记、静态提升和内联函数缓存等，提高了渲染性能和开发体验
3. 最终都会生成渲染函数，vue2主要是通过`new Function`来生成字符串形式的函数; vue3则更加灵活，具体实现有所不同
::::

### 编译
#### 核心步骤
`compile.ts/baseCompile`
1. `parse`解析，模版字符串转换为AST语法树，包括标签、属性、指令、文本等
2. `optimization/transform`优化，遍历AST，标记静态节点、静态提升、内联函数缓存
   - `静态标记` traverseNode/nodeTransforms 遍历AST语法树，进行静态标记和内联函数缓存
     - 静态节点: 后期更新diff时不被比对; eg: transformElement, transformText
     - 内联函数缓存: 追踪和优化变量引用，不会每次都创建内联函数，只需创建一次; eg: transformExpression
   - `静态提升 hoistStatic` 遍历AST树，找出静态子树并提升到root.hoists中即顶级作用域，这样静态节点只需要在组件初始渲染时执行一次，减少不必要的计算和创建
3. `generation`代码生成，将标记后的AST转换成可执行的渲染函数render

### mount
创建应用实例 -> 将应用实例挂载到容器上 -> 创建虚拟节点 -> 执行渲染函数 -> 将虚拟节点转换为真实DOM并挂载到页面上 -> 后续数据更新时通过更新函数重新渲染
将渲染函数转换为VNode，将VNode转换为真实DOM挂载到页面，数据更新后，会patch比对更新页面
1. `createApp/baseCreateRender`里初始化
   1. `createApp`创建应用实例，并设置全局配置
   2. `baseCreateRender`创建渲染器，初始化render、patch、mountXxx、updateXxx等方法,返回`render createApp/createAppAPI(render, ..)`
2. 根据创建的app实例, 初始化实例的`mount`等方法
   1. 处理container容器: element | string等，然后执行mount(createAppAPI里声明)
      1. createVNode创建虚拟节点
      2. 执行render函数结合编译后的模块render渲染函数属性
         1. patch函数，根据类型(组件、元素、节点等)将VNode转换为真实DOM并挂载，初始挂载时会创建渲染effect并绑定更新函数
         2. 更新的话则会执行对应的更新函数

### diff
#### 优化点
1. 静态标记，更新过程中跳过对静态节点的比对
2. 递归更新，更新一个节点会递归的更新子节点，高效处理嵌套结构，vue2是迭代的
3. 动态选择算法，根据节点的动态特征选择合适的比对算法，比如，只有属性变化没有子节点变化的节点，采用快速路径跳过子节点的比对
4. fragments优化

#### 主要方向
1. 相同节点复用
2. 创建并插入新增的节点
3. 元素位置变化，移动需要移动的元素

#### 实现
同层比较，子节点主要分为有key和无key: `patchChildren: patchKeyedChildren + patchUnkeyedChildren`
  
##### patchUnkeyedChildren
1. 直接轮训，头从遍历children节点，进行patch，比对新旧节点
   1. 类型相同则复用，还要继续比对虚拟DOM的属性、内容等，递归比对
   2. 节点类型不同，删除旧节点，创建新节点
2. 轮训完后，如果新子节点有余则添加节点，如果旧子节点有余则删除节点

##### patchKeyedChildren
1. `从前往后比对`: `while`i = 0且小于两数组长度，`从前往后`比对新旧节点，节点类型和key相同复用; 当节点不同时break，停止对比--`i++`
2. `从后往前比对`: `while`i = 0且小于两数组长度，`从后往前`比对新旧节点，节点类型和key相同复用; 当节点不同时break，停止对比--`e1--;e2--`
3. `新节点列表有新增节点`: `i > e1 && i < e2`时，新节点列表有要新增的节点，patch新增节点
4. `旧节点列表有需要删除的节点`: `i > e2 && i < e1`时，新节点列表有要删除的节点，unmount卸载节点
5. `中间乱序节点比对`: `i < e1 && i < e2`时，首位两次比对新旧都未被全部覆盖到，中间存在乱序节点(ab[cde]fg、ab[edch]fg)
   1. 新增指针`s1和s2`，分别指向i停止的地方
   2. 从s2开始遍历新节点列表，将中间的乱序部分存储在映射表Map中
   3. 从s1开始遍历旧节点列表，查找映射表中是否存在该元素: 通过key，没有key则再次遍历新节点列表进行比对获取新节点索引，删除或patch(o, n)更新新旧节点
   4. 从新节点乱序结束的位置开始递减遍历
      1. 上述未处理过的节点(标记为0)就是新增的节点，patch(null, n)新增节点
      2. 上述中如果标记存在移动节点，移动节点顺序

:::: tip diff: v3 VS v2
1. vue2是同层比较、深度优先，循环从两边向中间聚拢
2. vue3是从前往后、从后往前的双端比较策略，针对`中间乱序(LIS最长递增子序列)`进行高效处理
3. 都会双端比对
   1. vue2是对比四个端点后复用并移动后，从新列表索引开始往后查询旧列表中要删除、新增或移动的节点; 
   2. vue3是比对两端可复用的多个前置和后置节点，中间乱序部分查找删除、新增货移动的节点
4. vue3通过静态提升、静态标记、内联函数缓存等提升了性能，vue2相对逊色
::::

**参考链接**

[vue3 diff算法参考](https://segmentfault.com/a/1190000044835898)

[vue2和vue3diff比对](https://blog.csdn.net/weixin_42254016/article/details/138678730)
:::

