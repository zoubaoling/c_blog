## Vue中的过滤器了解吗？过滤器的应用场景有哪些?
过滤器不改变原数据，对数据进行过滤处理返回过滤后的数据，vue可以自定义过滤器，常用于文本格式处理, vue3已经废弃了

**vue3废弃原因**：过滤器会增加`模版编译和渲染的复杂性`，导致`性能下降`；虽然方便数据处理，但是会使`模版变得复杂和难以维护`，vue3中可以通过`computed和methods`更好的替代

### 使用位置
- 模版的双花括号中: `msg | capitalize`
- v-bind的表达式中: `v-bind:id="(id | formatId)"`
  
应该被添加到表达式的尾部，用 `｜` 表示

### 定义方式
1. 局部定义
  
在filters选项中定义
```js{4}
filters: {
  formatTime (val) { return '' }
}
```
2. 全局定义
   
通过`Vue.filter('name', (value) => return '')`

### 要点
- 如果局部和全局存在同名过滤器，使用局部过滤器
- 过滤器可以链式使用，每个过滤器自动接受前一个表达式的值或者链式结果作为第一个参数，第一个参数是`|`前面的结果，其余参数需按顺序在调用时提供
  
### 应用场景
常用于文本格式化：时间格式化、数字格式化、单位转换等

### 示例

```vue
<template>
  <span>{{ price | currency('¥') }}</span>
  <span>{{ price | currency2('€', 0, true) }}</span>
</template>

<script>
export default {
  data: () => ({ price: 99.99 }),
  filters: {
    currency(value, symbol = '$') {
      return symbol + Number(value).toFixed(2)
    },
    currency2(value, symbol = '$', decimals = 2, withThousands = false) {
      const formatted = Number(value || 0).toFixed(decimals)
      return withThousands
        ? symbol + formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        : symbol + formatted
    }
  }
}
</script>
```

[解析参考](https://vue3js.cn/interview/vue/filter.html#%E5%9B%9B%E3%80%81%E5%8E%9F%E7%90%86%E5%88%86%E6%9E%90)