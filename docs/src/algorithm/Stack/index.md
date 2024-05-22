## 栈和队列
栈先进后出，队列先进先出
### 有效括号
有效括号：左括号必须用相同类型的右括号闭合，且顺序相同空字符也被看作有效字符

括号成立代表着**对称**,栈的先进后出，后进先出就是对称的
#### 分析
如果是正常括号字符，当出现第一个右括号时，左括号就已经结束了

使用`Map`维护匹配的括号关系，一般key为左括号，value为右括号，那么入栈存储的可以是字符中左括号对应的右括号，方便出栈时比和当前遍历到的右括号直接比对

将左括号入栈，当遇到右括号时，如果此时栈为空，或者出栈的栈顶元素不匹配的话，那么就是false

遍历完成，如果栈内还存在元素，不匹配，如果为0就是正常的
::: details 展开代码
```js
/**
 * @description 有效括号问题
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效
 * 有效字符串需满足： 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合
 * 注意空字符串可被认为是有效字符串
 * 
 * 示例:
 * "()" -> true
 * "()[]{}" -> true
 * "(]" -> false
 * "([)]" -> false
 * "{[]}" -> true
 */
export const isValidBracket = (str: String = ''): boolean => {
  const strStack: string[] = []
  const bracketMap = new Map([['(', ')'], ['{', '}'], ['[', ']']])
  const leftKeys = new Set(bracketMap.keys())
  for ( const bracket of str) {
    if (leftKeys.has(bracket)) {
      strStack.push(bracketMap.get(bracket)!)
    } else {
      if (strStack.length === 0 || strStack.pop() !== bracket) return false
    }
  }
  return strStack.length === 0;
}
```
:::
::: tip
与括号相关的，很有可能与栈相关
:::

### 每日温度问题
1. 倒序遍历数组，从后往前处理数据
2. 定义一个栈管理当前元素右侧所有比它大的数据
   1. 当当前元素比栈顶元素大时，不符合条件，栈顶元素出栈
   2. 处理后当当前元素比栈顶元素小时，当前元素右侧最近的比它大的数据就是栈顶元素，存储索引差值，再将当前元素索引入栈
::: details 展开
```js
/**
 * @description 每日温度问题
 * 题目描述: 根据每日气温列表，请重新生成一个列表，对应位置的输出是需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，请在该位置用 0 来代替
 * 示例：
 *  [73, 74, 75, 71, 69, 72, 76, 73] -> [1, 1, 4, 2, 1, 1, 0, 0]
 * tip: 气温列表长度范围是[1, 30000], 每个气温的值为华氏度，在[30, 100]内的整数
 * 
 * JS数组实现栈：push入栈，pop出栈, 栈顶: 数组最后一位数据, 栈底：数组第一位元素
 * 
 * 思路：
 * 1. 倒序遍历数组
 * 2. 栈存储当前元素右侧所有比之大的元素，所以遍历栈，将比栈中比当前元素小的出栈，剩下的栈顶元素就是当前元素最近的比其大的元素
 */
export const dailyTemperatures = (T: number[]): number[] => {
  let res: number[] = new Array(T.length).fill(0)
  // 存储当前元素右侧所有比其大的元素
  const stack: number[] = []
  for (let i = T.length - 1; i >= 0; i--) {
    while (stack.length && T[i] >= T[stack[stack.length - 1]]) {
      stack.pop()
    }
    res[i] = stack.length === 0 ? 0 : stack[stack.length - 1] - i
    stack.push(i)
  }
  return res
}
```
:::

[Youtube解析](https://www.youtube.com/watch?v=4Gf7s8QqO-k)
::: tip
JS实现栈，栈顶就是数组尾部，栈底就是数组头部，push是入栈,pop是出栈
:::
### 最小栈
支持快速获取栈中最小元素，除`Math.min`外设计
1. 添加辅助栈，存储当前的最小值，栈从底部到顶部为递减，即栈顶元素为最小值
2. 数据入栈时，数据如果比辅助栈栈顶元素还小则入辅助栈或者辅助栈为空
3. 数据出栈时，出栈的数据如果和辅助栈栈顶元素相等，辅助栈栈顶也出栈
4. `Math.min`的时间复杂度为O(n), 辅助栈的时间复杂度为O(1)
::: details 展开代码
```js
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
    if (this.descendStack.length === 0 || this.top() >= number) this.descendStack.push(number)
  }
  pop () {
    if (this.stack.pop() === this.top()) this.descendStack.pop()
  }
  top () {
    return this.stack[this.stack.length - 1]
  }
  getMin () {
    return this.descendStack[this.descendStack.length - 1]
  }
}
```
:::