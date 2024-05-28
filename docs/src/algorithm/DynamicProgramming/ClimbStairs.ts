/**
 * @description 爬楼梯问题
 * 题目描述：假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
 * 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * 
 * 注意：给定 n 是一个正整数。
 * 
 * 示例 1：
 * 
 * 输入： 2
 * 输出： 2
 * 解释： 有两种方法可以爬到楼顶。
 * 
 * 1 阶 + 1 阶
 * 2 阶
 * 示例 2：
 * 输入： 3
 * 输出： 3
 * 解释： 有三种方法可以爬到楼顶。
 * 
 * 1 阶 + 1 阶 + 1 阶
 * 1 阶 + 2 阶
 * 2 阶 + 1 阶
 */
// 1. 递归分析：重复--f(n) = f(n - 1) + f(n - 2); 终点--f(1) = 1; f(2) = 2--------自上而下，由未知到已知
export const climbStairsByRecur = (n: number): number => {
  // 递归边界
  if (n === 1) return 1
  if (n === 2) return 2
  // 递归计算
  return climbStairsByRecur(n - 1) + climbStairsByRecur(n - 2)
}
// 2. 记忆化搜索-优化递归分析：递归过程中，存在重复计算，维护一个数组存储计算值，避免重复计算
export const climbStairsByMemo = (n: number, memo: number[] = []): number => {
  if (n === 1) return 1
  if (n === 2) return 2
  if (!memo[n]) memo[n] = climbStairsByMemo(n - 1, memo) + climbStairsByMemo(n - 2, memo)
  return memo[n]
}
// 3. 动态规划：自上而下，通过已知和未知的关系，循环遍历，由已知开始得到未知
export const climbStairsByDp = (n: number): number => {
  const f: number[] = []
  f[1] = 1
  f[2] = 2
  // 动态更新每一层的结果
  for (let i = 3; i <= n; i++) {
    f[n] = f[i] + f[i - 1]
  }
  return f[n]
}