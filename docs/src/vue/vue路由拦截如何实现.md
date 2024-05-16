## 路由拦截是怎么实现的？
1. 路由拦截 axios拦截
2. 需要在路由配置中添加一个字段，它是用于判断路由是否需要拦截
```js
{
 name:'index',
 path:'/index',
 component:Index,
 meta:{
     requirtAuth:true
 }
}
router.beforeEach((to,from,next) => {
 if(to.meta.requirtAuth){
     if( store.satte.token ){
         next()
     }else{
         
     }
 }
})
```
### 导航守卫

1. 全局守卫: router.beforeEach(to, from, next) beforeResolve(to, from, next) afterEach(to, from)--路由实例上操作
  - beforeEach: 全局前置守卫，路由正式进入前执行，可以决定是否完成或取消导航--单个路由配置
  - beforeResolve: 全局解析守卫, 导航确认前，同时在所有组件内守卫和异步路由组件解析后执行
  - afterEach: 全局后置钩子, 不会改变导航本身，但可用于访问控制之后的逻辑处理
2. 路由独享守卫(routes配置中与path同级的属性): beforeEnter(to,from, next)
  - beforeEnter: 路由独享守卫, 可用于控制特定路由的访问权限
3. 组件内守卫（钩子函数）: beforeRouteEnter beforeRouteUpdate beforeRouteLeave
  - beforeRouteEnter: 无法获取this实例，此时组件实例还没被创建
  - beforeRouteUpdate: 当前路由改变，但是该组件被复用时调用
  - beforeRouteLeave: 导航离开该组件的对应路由时调用，可以访问组件实例 this
