import { it, describe, expect } from 'vitest'
import { QueueByStack } from './queueByStack'
import { maxSlidingWindow, maxSlidingWindowDqueue } from './slidingWindow'

describe('测试用栈编写队列', () => {
  it ('用例1', () => {
    const queue = new QueueByStack()
    queue.push(1)
    queue.push(2)
    expect(queue.peek()).toBe(1)
    expect(queue.pop()).toBe(1)
    expect(queue.peek()).toBe(2)
    expect(queue.pop()).toBe(2)
    expect(queue.empty()).toBe(true)
  })
})

describe('测试滑动窗口', () => {
  it ('测试双指针实现方法：', () => {
    const nums = [1, 3, -1, -3, 5, 3, 6, 7]
    const k = 3
    expect(maxSlidingWindow(nums, k)).toEqual([3,3,5,5,6,7])

    const nums2 = [1, 4, 2, 3, 4, 5, 5]
    expect(maxSlidingWindow(nums2, 3)).toEqual([4, 4, 4, 5, 5])

    const nums4 = [10, 9, 20, 5, 10, 20]
    expect(maxSlidingWindow(nums4, 4)).toEqual([20, 20, 20])
  })
  it ('测试双端队列实现方法：', () => {
    const nums = [1, 3, -1, -3, 5, 3, 6, 7]
    const k = 3
    expect(maxSlidingWindowDqueue(nums, k)).toEqual([3,3,5,5,6,7])

    const nums2 = [1, 4, 2, 3, 4, 5, 5]
    expect(maxSlidingWindowDqueue(nums2, 3)).toEqual([4, 4, 4, 5, 5])

    const nums4 = [10, 9, 20, 5, 10, 20]
    expect(maxSlidingWindowDqueue(nums4, 4)).toEqual([20, 20, 20])
  })
})