## 你是怎么理解ES6中 Promise的？使用场景有哪些？
promise是异步编程的一种解决方案，比传统的方式(eg: 回调函数)更加强大、合理, 解决了回调地狱的问题

相对来说：
- 其链式操作降低了编码的难度
- 代码可读性和可维护性增强

Promise有三种状态：`pending fulfilled rejected`

其状态一旦改变，不会发生变更
- pending > fulfilled
- pending > rejected

### 用法
Promise对象是一个构造函数，用来生成promise实例，接收两个参数resolve和reject
- resolve将状态由pending > fulfilled
- reject将状态由pending > rejected

**实例方法**
- `then` 状态变更时的回调，第一个参数fulfilled状态的回调函数，第二个参数是rejected状态的回调函数。then返回一个新的Promise实例，所以可以链式调用
- `catch` 指定发生错误时的回调 reject状态,promise的错误有冒泡性质，直到被捕获。promise的错误不会传递到外面，只能在内部捕获
- `finally` 不管状态怎么样，最后都会执行的操作

**构造函数方法**
- `Promise.all`: 接受一个Promise数组作为参数，数组所有元素都fulfilled,才会返回结果，一旦有一个reject，就会被捕获。如果实例内部有catch，会先被内部捕获
- `Promise.race`: 接受多个Promise实例，最先改变状态的实例的结果和状态会先返回
- `Promise.allSettled`：接受多个Promise实例，等所有实例都返回结果,正常或异常，才会返回 status reason value
- `Promise.resolve`: 返回一个resolve状态的promise对象
- `Promise.reject`：返回一个reject状态的promise对象
