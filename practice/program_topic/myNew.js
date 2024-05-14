/**
 * @description 自定义实现new
 * 1. 创建空对象
 * 2. 将构造函数和空对象通过原型链连接
 * 3. 修改构造函数this为空对象并执行
 * 4. 根据执行结果返回，执行结果为对象及返回执行结果，否则返回空对象
 */
function myNew (fun, ...args) {
  // const obj = {} Object.setPrototypeOf(fun.prototype)
  const obj = Object.create(fun.prototype)
  const ret = fun.apply(obj, args)
  return ret instanceof Object ? ret : obj
}
function Person (name) {
  this.name = name
}
const p1 = myNew(Person, 'pr')
console.log(p1)