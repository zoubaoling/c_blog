/**
 * @description 滑动窗口
 * 题目描述：给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值
 * 示例: 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3 输出: [3,3,5,5,6,7]
 * 解释: 滑动窗口的位置
 * [1 3 -1] -3 5 3 6 7
 * 1 [3 -1 -3] 5 3 6 7
 * 1 3 [-1 -3 5] 3 6 7
 * 1 3 -1 [-3 5 3] 6 7
 * 1 3 -1 -3 [5 3 6] 7
 * 1 3 -1 -3 5 [3 6 7]
 * 最大值分别对应：
 * 3 3 5 5 6 7
 * 提示：你可以假设 k 总是有效的，在输入数组不为空的情况下，1 ≤ k ≤ 输入数组的大小
 * 
 * 解法：1. 双指针 + 遍历法；2. 双端队列法
 */

// 方案1: 双指针(约束范围：窗口开端和终端) + 遍历
const calcWindows = (nums: number[], left: number, right: number): number => {
  let max = nums[left]
  while (left <= right) {
    if (nums[left] > max) max = nums[left]
    left++
  }
  return max
}
export const maxSlidingWindow = (nums: number[], k: number): number[] => {
  let left: number = 0
  let right: number = k - 1
  let maxNums: number[] = []
  while (right < nums.length) {
    maxNums.push(calcWindows(nums, left, right))
    // maxNums.push(Math.max(...nums.slice(left, right + 1)))
    left++
    right++
  }
  return maxNums
}
// 方案2: 双端队列
export const maxSlidingWindowDqueue = (nums: number[], k: number): number[] => {
  let stack: number[] = []
  let res: number[] = []
  for (let i = 0; i < nums.length; i++) {
    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      stack.pop()
    }
    stack.push(i)
    while (stack.length && stack[0] <= i - k) {
      stack.shift()
    }
    if (i >= k - 1) {
      res.push(nums[stack[0]])
    }
  }
  return res
}
maxSlidingWindowDqueue([1, 3, -1, -3, 5, 3, 6, 7], 3)