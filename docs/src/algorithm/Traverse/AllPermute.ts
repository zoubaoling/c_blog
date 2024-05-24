/**
 * @description 全排列问题
 * 题目描述：给定一个没有重复数字的序列，返回其所有可能的全排列
 * 示例：   
 * 输入: [1,2,3]
 * 输出: [
 * [1,2,3],
 * [1,3,2],
 * [2,1,3],
 * [2,3,1],
 * [3,1,2],
 * [3,2,1]
 * ]
 * 数学解释：
 * 从n个不同元素中任取m（m≤n）个元素，按照一定的顺序排列起来，叫做从n个不同元素中取出m个元素的一个排列。当m=n时所有的排列情况叫全排列
 * 穷举出数组中 n 个数的所有排列方式
 */
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
// 入参是一个数组
export const AllPermute = (nums: number[]): number[][] => {
  let res: number[][] = []
  let len: number = nums.length
  let curArr: number[] = []
  const dfs = (n: number): void => {
    if (n === len) {
      res.push([...curArr])
      return
    }
    for (let i = 0; i < len; i++) {
      if (curArr.includes(nums[i])) continue
      curArr.push(nums[i])
      dfs(n + 1)
      curArr.pop()
    }
  }
  dfs(0)
  return res
}
AllPermute([1, 2, 3])