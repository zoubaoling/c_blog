/**
 * @description 最长上升子序列
 * 题目描述：给定一个无序的整数数组，找到其中最长上升子序列的长度。
 * 示例:
 * 输入: [10,9,2,5,3,7,101,18]
 * 输出: 4
 * 解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
 * 
 * 说明:
 * 可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。 你算法的时间复杂度应该为 O(n^2) 。
 */
// dp[i] = Math.max(dp[i], dp[j] + 1)
export const lengthOfLTS = (nums: number[]): number => {
  // dp[i]:0-i元素之间的的最长上升子序列的长度; i <= 序列长度
  // 每一个元素都可以是一个子序列，最小的子序列长度为1，所以初始化为1
  const dp: number[] = new Array(nums.length).fill(1)
  // 最小的上升子序列长度为1 
  let maxLength: number = 1
  for (let i = 1; i < nums.length; i++) { // 遍历序列的子序列
    for (let j = 0; j < i; j++) { // j < i,遍历序列i以内的子序列及每个元素对应的最长上升子序列
      if (nums[i] > nums[j]) { // 当前元素比前面的元素大，可以添加到上升子序列中
        // 本质上是在遍历j时使用数组存储0-j间每个子序列的最长上升子序列的长度，遍历完获取最大值为dp[i]
        // 规避单独开辟一个数组存储最大值最终比较，直接在for循环里比较 当前子序列的dp值 和 之前存储的最大dpz值 然后存储以便后续比较
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
    maxLength = Math.max(maxLength, dp[i])
  }
  return maxLength
}