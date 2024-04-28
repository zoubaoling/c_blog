## 常用的辅助函数
> mapState | mapGetters | MapMutations | mapActions ｜ createNamespacedHelpers

### 使用
1. mapState
将vuex中state属性映射到computed中,通过数组方式或对象方式
```js{4}
computed: {
  ...mapState(['userinfo', 'routedata']),
  ...mapState({
    userinfo: state => state.userinfo
  })
}
```
2. mapActions
将vuex中的action映射到methods中，数组或对象形式
```js{4}
methods: {
  ...mapActions(['getUserInfo', 'getList]),
  ...mapActions({
    // 别名
    getUserInfoNew: 'getUserInfo'
  })
}
```
等价于
```js{4}
methods: {
  getUserInfoNew () {
    this.$store.dispatch('getUserInfo')
  }
}
```
3. mapMutatioins
将vuex的mutation映射到methods中，与mapActions类似，只是是简单的数据处理，不涉及异步操作
4. mapGetters
将vuex的getters映射到computed中，与mapState类似
5. modules + namespaced
每一个模块相当于一个小型的vuex, 都有各自的state action getter mutation等
开启命名空间namespaced: true，根据名称访问每个空间module
不同模块的同名函数不互相影响
命名空间声明：
```js{4}
{
  state: {},
  modules: {
    person: {
      namespaced: true
      state: {},
      mutations: {}
      ...
    }
  }
}
```
通过辅助函数使用
```js{4}
mapState('空间名称', ['属性1', '属性2'])
mapState('空间名称', {
  'newName': 'oldName'
})
```
6. createNamespacedHelpers
模块化的vuex中创建命名空间辅助函数
```js{4}
const { mapState } = createNamespacedHelpers('空间模块名称')
```

### vue3使用
1. 使用mapState等辅助函数
```js{4}
// script setup模式下不用单独导出
import { mapActions } from 'vuex'
const { action1, action2 } = mapActions(['action1', 'action2'])
```
2. 使用组合式API
```js{4}
import { useStore } from 'vuex'
import { ref } from 'vue'
const store = useStore()
import { useStore } from 'vuex';
import { ref } from 'vue';
const store = useStore();
// 访问 state || computed
const count = ref(store.state.count);

// 访问 mutation
const increment = () => {
    store.commit('increment');
};
// 访问 action
const fetchData = () => {
    store.dispatch('fetchData');
};

```
### 含义
- state 可以看作数据库，响应式
- actions 可以看作controller层，做数据的业务逻辑，一般异步
- mutations 可以看作model层，做数据的增删改查操作，一般同步
[题目参考](https://fe.ecool.fun/topic/b3e35cf9-1939-4c79-8415-8168c5532779?orderBy=updateTime&order=desc&tagId=14)