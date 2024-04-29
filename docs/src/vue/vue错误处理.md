## 如何处理Vue的错误
- 接口错误
- 代码错误

### 接口错误
在axios响应拦截器里进行处理,根据接口返回的状态吗进行路由跳转到错误页面或者提示对应信息
```js{4}
axios.interceptors.response.use(
  res => res,
  err => new Promise.reject(err)
)
```

### 代码错误
接受组件渲染和观察期间未被捕获的错误，包括三个参数：error：错误信息 vm：错误实例 info: string(错误来源：钩子函数 on-click等)
- Vue.config.errorHandler | app.config.errorHandler
- errorCaptured | onErrorCaptured
  捕获来自子组件未被捕获的错误，逐级向上直到errorHandler，如果返回false，就不会传递到errorHandler
- try catch捕获可预见的错误，比如接口调用数据异常时对于loading或者数据状态的处理

JS 2
ES 1
CSS 1
WEBPACK 1