## v-if和v-for的优先级是什么
- v-if 是条件渲染，条件为true时，才会渲染组件
- v-for是基于数组渲染列表，最好每一项给一个唯一key，方便diff算法

### 优先级
v-for 的优先级比v-if高，会先判断v-for，再判断v-if

如果同时存在v-for和v-if时，会先执行v-for,列表的每一项中再执行v-if

### 注意事项
- v-for和v-if不要同时使用，会带来性能的浪费：v-for的每一项都会使用v-if判断
- 如果要避免同时出现的情况，可以在外部包裹template（不会渲染DOM），然后用v-if判断，内部再使用v-for遍历
- 如果条件出现在循环内部，可以先使用computed对列表进行过滤

::: tip
1. vue2的v-for优先级高于v-if, 如果v-if为false，那么v-for会执行进行遍历，导致不必要的性能开销
2. vue3的v-if优先级高于v-for, 如果v-if为false，那么v-for不会执行，可以通过v-if跳过循环，提高性能
:::