## 说说你对 Iterator, Generator 和 Async/Await 的理解
**Iterator 迭代器**
迭代器是一个特殊对象，有一个next()方法，每次调用都会返回结果对象，包括value和done，value是下一个要返回的值，done表示是否还有要返回的值，没有则为true

可迭代对象有Symbol.iterator属性,通过指定函数返回一个作用于附属对象的迭代器，ES6中的集合：数组、Set和Map以及字符串都是可迭代对象
生成器默认会为Symbol.iterator赋值，所有通过生成器创建的迭代器都是可迭代对象
展开运算符可以将可迭代对象转换为数组

**for/of与迭代器**
for/of只可用于可迭代对象，否则会报错
- 调用可迭代对象的Symbol.iterator方法来获取迭代器
- 每一次循环时调用迭代器的next方法，将返回的value存储到变量中
- 循环结束时，返回的done为true,退出循环

### 内置迭代器
**集合对象迭代器**
ES6中数组、Set、Map内建了三种迭代器, 结果需要结合for/of或者...来处理（与对象的方法分别开来）
- keys()
- values()
- entries()
for/of中set默认的迭代器是values，map是entries，所以解构可以根据对应值解构

**字符串迭代器**
for/of

**NodeList迭代器**
for/of: `document.getElementByClass()`

**迭代器高级用法**
- 给迭代器传参，在next中传入数据，会替换生成器上一条yield返回的值
- 迭代器抛出错误`iterator.throw(new Error)`，在生成器内部可以用try/catch捕获

**Generator 生成器**
是一个返回迭代器的函数，在function关键字后用*号表示，函数内使用yield关键字，标识要返回的值和顺序
生成器执行返回一个迭代器（可迭代对象），执行迭代器的next方法返回value和done，执行语句遇到yield就停止，执行到yield后的语句并返回，手动执行next继续执行

*可以紧挨着function关键字，也可以在中间添加一个空格
```js{4}
function* fun() {}
function *fun() {}
function *() {}
obj = {
  *fun() {}
}
```
**生成器return返回语句**
- .next可以获取到return的值，迭代到此结束，后续next会返回undefined
- for-of循环会跳过return语句，不会读取return返回的值，并停止

**委托生成器**
合并多个迭代器，可以创建一个生成器，生成器内部通过yield和*号组合多个迭代器,按顺序迭代，还可以结合第一个迭代器结果传参给第二个迭代器
```js{4}
function *colorIterator () {}
function *numberIterator () {}
function *combineIterator () {
  const colors = yield *colorIterator()
  yield *numberIterator(colors)
  yield true
}
```

**简单任务执行器**
自动执行生成器的next
```js{4}
const run = (task) {
  const gen = task()
  let result = gen.next()
  const run = () => {
    if (!result.done) {
      result = gen.next()
      run()
    }
  }
  run()
}
```
### async/await
是生成器的语法糖
- async相当于*
- await相当于yield
只是可以自执行，内部调用next，形成了同步代码方式写异步代码