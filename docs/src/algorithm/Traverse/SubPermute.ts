/**
 * 题目描述：给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）
 * 
 * 说明：解集不能包含重复的子集
 * 
 * 示例: 输入: nums = [1,2,3]
 * 输出:
 * [
 * [3],
 * [1],
 * [2],
 * [1,2,3],
 * [1,3],
 * [2,3],
 * [1,2],
 * []
 * ]
 */
export const SubPermute = (nums: number[]): number[][] => {
  let result: number[][] = []
  let tmpArr: number[] = []
  const dfs = (dept: number): void => {
    result.push([...tmpArr])
    for (let i = dept; i < nums.length; i++) {
      tmpArr.push(nums[i])
      dfs(i + 1)
      tmpArr.pop()
    }
  }
  dfs(0)
  return []
}
SubPermute([1, 2, 3])