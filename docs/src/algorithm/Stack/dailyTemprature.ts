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
dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])