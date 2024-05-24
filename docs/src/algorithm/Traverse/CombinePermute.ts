/**
 * @description 限定组合问题：及时回溯，即为“剪枝”  
 * 题目描述：给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。
 * 示例: 输入: n = 4, k = 2
 * 输出:
 * [
 * [2,4],
 * [3,4],
 * [2,3],
 * [1,2],
 * [1,3],
 * [1,4],
 * ]
 */
export const CombinePermute = (n: number, k: number): number[][] => {
  let res: number[][] = []
  let subset: number[] = []
  const dfs = (index: number): void => {
    if (subset.length === k) {
      res.push([...subset])
      return
    }
    for (let i = index; i <= n; i++) {
      subset.push(i)
      dfs(i + 1)
      subset.pop()
    }
  }
  dfs(1)
  console.log(res)
  return res
}
CombinePermute(4, 2)