/**
 * @description 最小栈问题
 * 题目描述：设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈
 * push(x) —— 将元素 x 推入栈中。
 * pop() —— 删除栈顶的元素。
 * top() —— 获取栈顶元素。
 * getMin() —— 检索栈中的最小元素。
 * 示例:
 * MinStack minStack = new MinStack();
 * minStack.push(-2);
 * minStack.push(0);
 * minStack.push(-3);
 * minStack.getMin(); --> 返回 -3.
 * minStack.pop();
 * minStack.top(); --> 返回 0.
 * minStack.getMin(); --> 返回 -2.
 */
export class MinStack {
  stack: number[]
  constructor () {
    this.stack = []
  }
  push (number: number) {
    this.stack.push(number)
  }
  pop () {
    if (this.stack.length === 0) return
    this.stack.pop()
  }
  top () {
    return this.stack[this.stack.length - 1]
  }
  getMin1 () {
    return Math.min(...this.stack)
  }
  getMin2 () {
    let min = Infinity
    for (let i of this.stack) {
      if (i <= min) min = i
    }
    return min
  }
}
const minStack = new MinStack()
minStack.push(-2)
minStack.push(0)
minStack.push(-5)
console.log(minStack.getMin2())

export class OptimiseMinStack {
  stack: number[]
  // 辅助栈：存储一个栈底到栈顶递减的数据，即栈顶最小，通过栈顶比较最小值
  descendStack: number[]
  constructor () {
    this.stack = []
    this.descendStack = []
  }
  push (number: number) {
    this.stack.push(number)
    if (this.descendStack.length === 0 || this.descendStack[this.descendStack.length - 1] >= number) this.descendStack.push(number)
  }
  pop () {
    if (this.stack.pop() === this.descendStack[this.descendStack.length - 1]) this.descendStack.pop()
  }
  top () {
    return this.stack[this.stack.length - 1]
  }
  getMin () {
    return this.descendStack[this.descendStack.length - 1]
  }
}