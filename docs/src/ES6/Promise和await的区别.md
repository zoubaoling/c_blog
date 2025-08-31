## promise和async await的区别是什么？
1. 都是处理异步请求的方式
2. promise是ES6，async await 是ES7的语法, 是promise + generator的语法糖，它和promise都是非阻塞性的

**优缺点**
1. 语法风格，promise链式调用，逻辑复杂时容易造成代码堆叠。`async/await`是同步方式的写法，更直观方便维护
2. 错误处理，promise通过链式调用`.catch`来处理错误，可能分散在多个`catch`中。`async/await`通过`try/catch`来处理错误
3. 执行流程，使用`.then`时，后面的代码会立即执行（可能出现请求还没返回就执行后面操作的情况）。`async await`遇到`await`等待promise完成，代码按顺序执行，代码看起来像同步一样

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