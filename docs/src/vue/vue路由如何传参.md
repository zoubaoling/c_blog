## vue路由时怎么传参的？
1. params传参
     - this.$router.push({name:'index',params:{id:item.id}})
     - this.$route.params.id
2. 路由参数
     - 路由配置 { path:'/index:id' }
     - this.$router.push({name:'/index/${item.id}'})
     - 获取：this.$route.params
3. query传参（可以解决页面刷新参数丢失的问题）
     - this.$router.push({ name:'index', query:{id:item.id}})
     - 获取：this.$route.query
4. 路由的state vue-router3.x开始
     - this.$router.push({ name: '', state: {}})，不会在URL中显示
     - 获取: history.state

:::tip
1. name和path不能同时使用
2. params不能和path一起使用
3. name + path; name + query; path + query
:::
- vue2.x - vue-router3.x
- vue3.x - vue-router4.x

