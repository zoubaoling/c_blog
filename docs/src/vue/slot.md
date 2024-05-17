## 说说你对slot的理解？slot使用场景有哪些
slot是插槽，在组件模版中占位，当组件以标签形式使用时，标签内部的内容会自动填充

### 使用场景
用户可以使用插槽对组件进行拓展处理，可以更好的复用和定制化组件

如果在复用一个组件时，有少量地方需要修改，重写是不明智的，此时可以使用插槽向组件内部指定位置传递内容，实现组件在不同场景下的复用需求

### 分类
> 默认插槽、具名插槽、作用域插槽

#### 默认插槽
组件内部使用slot，父组件中在组件标签中直接添加内容

#### 具名插槽
子组件中给slot使用name来命名，在父组件中使用`template + v-slot(#):name`向子组件指定插槽传递内容
```js
// Child.vue
<slot name="header"></slot>
// Father.vue
<template v-slot:header>header title</template>
<template #header>header title</template>
```

#### 作用域插槽
在子组件slot作用域上绑定属性传递给父组件使用，父组件中通过v-slot接收子组件的数据,可以进行解构
```js
<slot name="header" tabList="list"></slot>
<template v-slot:header="{ tabList }"></template>
```

### 小结
1. 默认插槽的名称为default, 可以省略，直接使用v-slot
2. 使用简写形式#时，不能省略名称：#default
3. 对子组件传递给父组件的数据，可以使用解构，也可以重命名或者赋默认值
4. v-slot只能在template中使用，只有默认插槽可以在组件标签上使用