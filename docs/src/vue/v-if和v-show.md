### v-if和v-show的共同点
都是控制元素在页面的显隐，为true时，页面上展示；为false，不在页面上展示

### 不同点
- 控制手段不同
- 编译过程不同
- 编译条件不同
- 性能消耗不同

1. `控制手段`: `v-show`是通过css的display属性控制的元素的显隐；`v-if`是控制DOM元素的增加和删除
2. `编译过程`: `v-show`只涉及到简单的CSS切换；`v-if`如果其中包裹组件的话，会涉及到销毁和重建内部的事件监听和子组件
3. `编译条件`: `v-if`是真正的条件渲染，只有条件为true时，组件才会渲染；
     - v-show切换时，不会触发组件的生命周期
     - v-if由false > true时，会触发子组件的beforeCreate,create,beforeMount,mount；由true > false时，会触发子组件的beforeDestroy,destroyed
4. `性能消耗`: `v-if`有更高的切换消耗，`v-show`有更高的初始渲染消耗（不管初始条件是什么，组件总会被渲染）

### 使用场景
- `v-if`适用于条件很少改变的情况
- `v-show`适用于条件频繁改变的情况