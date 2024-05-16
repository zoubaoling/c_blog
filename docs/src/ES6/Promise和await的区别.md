## promise和async await的区别是什么？
1. 都是处理异步请求的方式
2. promise是ES6，async await 是ES7的语法, 是promise + generator的语法糖，它和promise都是非阻塞性的

**优缺点**
1. promise是返回对象，要用then、catch方法去处理和捕获异常，并且书写方式是链式，容易造成代码重叠，不好维护，async await 是通过try catch进行捕获异常
2. async await能让代码看起来像同步一样，只要遇到await就会立刻返回结果，然后再执行后面的操作，而promise.then()的方式返回，会出现请求还没返回，就执行了后面的操作

### await的实现
async await是generator + promise 的语法糖
::: details await实现
```js
function* readFileWithGen() {
  try {    
    const content1 = yield readFileWithPromise('/etc/passwd', 'utf8')
    console.log(content1)
    const content2 = yield readFileWithPromise('/etc/profile', 'utf8')
    console.log(content2)
    return 'done'
  } catch (err) {
    console.error(err)
    return 'fail'
  }
}

const run = generator => {
  return new Promise((resolve, reject) => {
    const g = generator()
    const next = res => {
      const result = g.next(res)
      if (result.done) {
        return resolve(result.value)
      }
      // result.value(next)
      // 如果是异步接口请求，后接的是一个promise, 接口请求正常则next，异常则error
      result.value
        .then(
          next,
          err => reject(gen.throw(err).value)
        )
    }
    next()
  })
}

run(readFileWithGen)
  .then(res => console.log(res))
  .catch(err => console.log(err))
```