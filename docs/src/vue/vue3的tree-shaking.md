
## vue3.0的tree-shaking特性是什么，并举例说明
### 定义
找出无用的代码并删除，从而减小代码打包的体积
vue3源码引入tree-shaking特性，使用ES module编写将全局API分块，可以按需引入，如果没有使用，不会出现在构建成果物中
```js{4}
import { ref } from 'vue'
```
### 如何做
利用ES6的模版语法（import export）,模块的依赖关系在编译时就可以确认，从而编译时找出无用的代码并删除
- 编译时利用ES6模版语法判断哪些模块已经加载
- 编译时判断哪些变量没有被引用或者被使用，进而删除
### 好处
- 更小：减小程序体积
- 更快：减少程序执行时间
- 更友好：便于将来对程序架构进行优化

### 构建工具
tree-shaking是构建工具的功能，不是vue3的特性
- Wepack4.0以上版本在mode为production时，会自动开启Tree shaking

- [] 构建工具的具体配置

[解析示例](https://vue3js.cn/interview/vue3/treeshaking.html#%E4%BA%8C%E3%80%81%E5%A6%82%E4%BD%95%E5%81%9A)