### 定义
keep-alive是vue的内置组件，在组件切换过程中将状态保存在内存中，避免重复渲染DOM
使用keep-alive包裹动态组件时，会缓存不活动的组件实例而不是销毁
可以配置以下属性：
- include: 正则或字符串，名称匹配的组件会缓存
- exclude: 正则或字符串，名称匹配的组件不会被缓存
- max: 最多缓存的组件个数
名称查找首先会找组件的name,如果name不可用，会去匹配局部注册名称（父组件中components中注册的key）

被包裹的组件会多两个生命周期：activated deactivated
首次进入组件：beforeRouteEnter > beforeCreate > created> mounted > activated > ... ... > beforeRouteLeave > deactivated
再次进入组件：beforeRouteEnter >activated > ... ... > beforeRouteLeave > deactivated

### 使用场景
比如列表页进入详情页，再回到列表页，列表页可以使用keep-alive保存状态
```js{4}
// router.js
{
  path: '',
  name: '',
  meta: {
    keepAlive: true
  }
}
// app.vue
<div id="app" class='wrapper'>
  <keep-alive>
      <!-- 需要缓存的视图组件 --> 
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 不需要缓存的视图组件 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
</div>
```

### 使用keepalive后获取数据
1. 每次组件渲染都会执行beforeRouterEnter
2. 组件每次激活时，都会执行activated

### 原理
- keepalive没有使用template，而是使用render函数
- 获取组件name，与include exclude进行比对，判断是否缓存，不缓存，直接返回VNode
- 获取组件ID，和cache对象比对，存在即命中缓存，返回组件实例；调整组件key的顺序，原地删除并重新放在keys的最后
- 如果cache中没有命中，将组件存入cache中，并将key存入keys中；并与max配置比对，如果超过了，删除cache中第一个缓存的组件