/**
 * @description: “最值”型问题典范：如何优雅地找硬币
 * 题目描述：给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1
 * 示例1：
 * 输入: coins = [1, 2, 5], amount = 11
 * 输出: 3
 * 解释: 11 = 5 + 5 + 1
 * 
 * 示例2：
 * 输入: coins = [2], amount = 3
 * 输出: -1
 */
export const findCoin = (coins: number[], amount: number): number => {
  // i为面额，f[i]存储的是面额对应的组成硬币的最少个数
  let f = []
  f[0] = 0
  for (let i = 1; i < amount; i++) {
    // 要取最小值，所以先初始化为Infinity
    f[i] = Infinity
    for (let j = 0; j < coins.length; j++) {
      // 当前硬币面额比总额小的话，可以进行计算
      if (i > coins[j]) {
        // 状态转移方程f(amount) = Math.min(f(amount - c1) + 1, f(amount - c2) + 1, ...f(amount - cn) + 1);
        // amount/i: 总额； cn/coins[j]: 当前的硬币面额
        // 可以存储在一个数组里遍历完最后比较获取最小值，也可以每次和上一次最小值比较并更新，减少存储空间
        f[i] = Math.min(f[i], f[i - coins[j]] + 1)
      }
    }
  }
  // 如果f[amount]组成个数是初始化的Infinity，那么没有被处理过，也就是无法组成对应的总额，直接返回-1
  if (f[amount] === Infinity) return -1
  return f[amount]
}
