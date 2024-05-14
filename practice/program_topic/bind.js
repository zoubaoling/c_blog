/**
 * @description 自定义bind
 * 1. 返回函数
 * 2. 组合参数
 * 3. 修改this, 如果是new，是函数实例的this
 */
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== 'function') return new TypeError('invalid error')
  const fun = this;
  return function Fn (...newArgs) {
    const combineArts = [...args, ...newArgs]
    // this: 当前实例
    const newContext = this instanceof Fn ? this : context
    console.log(this)
    const res = fun.apply(newContext, combineArts);
    return res
  }
}
const obj = {
  name: 'name',
  age: 20
}
const test = function (name = '', name2 = '') {
  const age = 18
  this.name = name2
}
const F2 = test.myBind(obj, 'create')
const jn = new F2('name')
console.log(jn)

