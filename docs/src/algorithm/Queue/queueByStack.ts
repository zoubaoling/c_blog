/**
 * @description 使用栈实现一个队列，可以实现以下操作
 * push(x) -- 将一个元素放入队列的尾部。
 * pop() -- 从队列首部移除元素。
 * peek() -- 返回队列首部的元素。
 * empty() -- 返回队列是否为空
 */
export class QueueByStack {
  stack1: number[]
  stack2: number[]
  constructor () {
    this.stack1 = []
    this.stack2 = []
  }
  push (n: number) {
    this.stack1.push(n)
  }
  empty () {
    return this.stack1.length === 0 && this.stack2.length === 0
  }
  pop () {
    if (this.stack2.length === 0) {
      while (this.stack1.length) {
        this.stack2.push(this.stack1.pop()!)
      }
    }
    return this.stack2.pop()
  }
  peek () {
    if (this.stack2.length === 0) {
      while (this.stack1.length) {
        this.stack2.push(this.stack1.pop()!)
      }
    }
    return this.stack2[this.stack2.length - 1]
  }
}
