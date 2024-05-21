import { isValidBracket } from './stack'
import { dailyTemperatures } from './dailyTemprature'
import { OptimiseMinStack } from './minStack'
import { describe, it, expect, beforeEach } from 'vitest'
describe('测试用栈实现有效括号判断', () => {
  // toBe toEqual
  it ('有效括号：()', () => {
    const value = isValidBracket('()')
    expect(value).toBe(true)
  })
  it.concurrent('有效括号：()[]{}', async ({ expect }) => {
    expect(isValidBracket('()[]{}')).toBe(true)
  })
  it ('有效括号：(]', () => {
    expect((isValidBracket('(]'))).toBe(false)
  })
  it ('有效括号：([)]', () => {
    expect((isValidBracket('([)]'))).toBe(false)
  })
  it ('有效括号：{[]}', () => {
    expect((isValidBracket('{[]}'))).toBe(true)
  })
})

describe('测试栈', () => {
  it ('每日温度用例1', () => {
    expect(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])).toEqual([1, 1, 4, 2, 1, 1, 0, 0])
  })
})

describe('MinStack', () => {
  let stack: OptimiseMinStack;

  beforeEach(() => {
    stack = new OptimiseMinStack();
  });

  it('should push elements onto the stack', () => {
    stack.push(1);
    expect(stack.top()).toBe(1);
    stack.push(2);
    expect(stack.top()).toBe(2);
  });

  it('should pop elements from the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.pop();
    expect(stack.top()).toBe(1);
    stack.pop();
    expect(stack.top()).toBeUndefined();
  });

  it('should get the top element of the stack', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.top()).toBe(2);
  });

  it('should get the minimum element of the stack', () => {
    stack.push(2);
    stack.push(1);
    stack.push(3);
    expect(stack.getMin()).toBe(1);
    stack.pop();
    expect(stack.getMin()).toBe(1);
    stack.pop();
    expect(stack.getMin()).toBe(2);
  });

  it('should handle multiple operations correctly', () => {
    stack.push(2);
    stack.push(0);
    stack.push(3);
    stack.push(0);
    expect(stack.getMin()).toBe(0);
    stack.pop();
    expect(stack.getMin()).toBe(0);
    stack.pop();
    expect(stack.getMin()).toBe(0);
    stack.pop();
    console.log(stack)
    expect(stack.getMin()).toBe(2);
  });
});
