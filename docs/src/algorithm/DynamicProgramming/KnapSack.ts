/**
 * @description 0-1背包问题
 * 有 n 件物品，物品体积用一个名为 w 的数组存起来，物品的价值用一个名为 value 的数组存起来；每件物品的体积用 w[i] 来表示，每件物品的价值用 value[i] 来表示。现在有一个容量为 c 的背包，问你如何选取物品放入背包，才能使得背包内的物品总价值最大？
 * 每种物品只有1件
 */
// 二维数组实现
export const KnapSackTwoDimense = (weight: number[], value: number[], size: number): number => {
  // 初始化二维数组dp[i][j] i:0-i个物品，j:背包体积，dp[i][j]：背包体积为j时，在0-i个物品间任选(一个或多个)装入的最大价值
  const dp: number[][] = new Array(weight.length).fill(0)
    .map(_ => new Array(size + 1).fill(0))
  // 初始化二维数组的值：背包体积为0时价值为0, 第一个物品的价值为0 和 第一个物品的价值(物品体积 <= 背包体积)
  for (let i = weight[0]; i < size; i++) {
    // 初始化第一个物品在各背包体积下的价值, 第一个物品体积大小之后开始赋值
    dp[0][i] = weight[0]
  }
  // 遍历物品 + 背包
  for (let i = 1; i < weight.length; i++) { // 遍历物品，初始化中处理了i=0,所以从1开始
    for (let j = 1; j <= size; j++) { // 遍历背包体积，初始化中处理了j=0，所以从1开始
      if (value[i] > j) {
        dp[i][j] = dp[i - 1][j]
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i])
      }
    }
  }
  return dp[weight.length - 1][size]
}
// test
const weight = [1, 3, 4];
const value = [15, 20, 30];
const size = 4;
console.log(KnapSackTwoDimense(weight, value, size));

// 一维数组实现
export const KnapSack = (weight: number[], value: number[], size: number): number => {
  // 初始化一维数组，存储背包体积0-size对应的最大价值
  const dp: number[] = new Array(size + 1).fill(0)
  for (let i = 0; i < weight.length; i++) { // 遍历物品, 初始化只初始化了体积，物品没有初始化，所以i从0开始
    for (let j = size; j > weight[i]; j--) { // 遍历体积，倒叙遍历
      dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i])
    }
  }
  return dp[size]
}