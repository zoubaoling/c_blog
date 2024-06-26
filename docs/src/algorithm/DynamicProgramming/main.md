# 动态规划
## 爬楼梯问题
题目描述：假设你正在爬楼梯。需要 n 阶你才能到达楼顶（给定 n 是一个正整数）

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

示例1:
```md
输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1 阶 + 1 阶
2 阶
```
示例2:
```md
输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1 阶 + 1 阶 + 1 阶
1 阶 + 2 阶
2 阶 + 1 阶
```
### 思路分析
关键特征：
1. 要求达成某个目的的**解法个数**
2. 不要求给出每一个解法对应的具体路径

满足以上两个特征往往通过动态规划求解

#### 递归分析
基于“动态规划”做题，首先想到“倒着分析问题”：
1. 定位到问题的终点--走到第`n`阶楼梯这个目标对应的路径数`f(n)`
2. 站在问题的终点这个视角，思考后退的可能性

**步骤**
题目中说明每次只能前进1步或者2步，即也只能后退1步或者2步，故而分析回退可能性：
1. `f(n) = f(n - 1) + f(n - 2)`
2. `f(n - 1) = f(n - 2) + f(n - 3)`;  `f(n - 2) = f(n - 3) + f(n - 4)`
3. ...直到`f(3) = f(2) + f(1)` ->  `f(1) = 1; f(2) = 2`

**递归条件**
1. **重复内容**: `f(n) = f(n - 1) + f(n - 2)`
2. **边界条件**: `f(1) = 1; f(2) = 2`

#### 记忆化搜索提效
**问题** 在上述递归分析中`f(n) = f(n - 1) + f(n - 2)`和`f(n - 1) = f(n - 2) + f(n - 3)`存在重复计算：`f(n - 1) 和 f(n - 2)`; 递归次数越多，重复计算次数越多

**解决** 添加数组缓存，已经计算过的直接取值，避免重复计算

#### 记忆化搜索转动态规划
1. **记忆化搜索**可以理解为优化后递归，`自顶向下`从一个较大的`未知`量级拆分成较小的`已知`量级
2. **动态规划**是一个`自下而上`的过程，通过定位`已知和未知`的关系，向前推导，进而求得`未知`的值--从`f(1)`和`f(2)`为起点，不断求和，循环递增`n`，求`f(n)`的值

::: details 展开查看爬楼梯代码
<<< @/algorithm/DynamicProgramming/ClimbStairs.ts
:::

## 动态规划题解思路
**动态规划**与**分治**类似，只是分治中的各个子问题之间是独立的，比如子数组的排序并不互相影响；而动态规划的各个子问题是`相互依赖、相互影响`的

**动态规划的关键特征：**
1. 要求达成某个目的的**解法个数**
2. 不要求给出每一个解法对应的具体路径

> 看到求最值考虑动态规划

**动态规划的关键组成**：
1. 最优子结构：问题的最优解包含着子问题的最优解，此后的状态基于当前状态-上次决策产生的最优决策；eg: `f(n) = f(n - 1) + f(n - 2)`--又名`状态转移方程`
2. 重叠子问题：在递归的过程中，出现了重复计算的情况

**对于动态规划问题的分析路径**：
1. 通过递归思想明确树形思维模型：找到问题终点，倒退思考的姿势，可以帮忙快速明确`状态间的关系`--递归边界往往是已知子问题的解
2. 结合记忆化搜索(开辟数组存储前面的最优子结果)，明确`状态转移方程`，自下而上，由已知到未知
3. 递归代码转为迭代(状态转移方程转移到循环里)

### “最值”型问题典范：如何优雅地找硬币
题目描述：给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。

示例1：
```md
输入: coins = [1, 2, 5], amount = 11
输出: 3
解释: 11 = 5 + 5 + 1
```
示例2：
```md
输入: coins = [2], amount = 3
输出: -1
```
:::tip
**最值问题**是动态规划的常见对口题型
:::

#### 思路分析
**1. 倒退分析确认状态转移**

假设已有amount=36的硬币，不清楚硬币个数，假设硬币为c1, c2, ...cn, 目的为：将amount=36的硬币变为amount=0
- 后退一步，拿走一枚硬币，可能是c1, c2, ...cn
- 那么最小硬币数`f(amount=36) = Math.min(f(36-c1) + 1, f(36-c2) + 1, ...f(36-cn) + 1)`
- 继续倒退再拿走一枚硬币`f(amount=36-c1) = Math.min(f(36-c1-c2) + 1, f(36 - c1 - c3) + 1, ...f(36-c1-cn) + 1)`
- 直到倒退到`f(amount=0) = 0`

**状态转移方程**: `f(amount) = Math.min(f(amount - c1) + 1, f(amount - c2) + 1, ...f(amount-cn) + 1)`

**2. 已知的最基本字问题**
递归后退的边界条件为硬币总额为0的情况：`f[0] = 0`
::: details 展开查看最小硬币组合代码
<<< @/algorithm/DynamicProgramming/FindCoin.ts
:::

## 0-1背包模型
> 有 n 件物品，物品体积用一个名为 w 的数组存起来，物品的价值用一个名为 value 的数组存起来；每件物品的体积用 w[i] 来表示，每件物品的价值用 value[i] 来表示。现在有一个容量为 c 的背包，问你如何选取物品放入背包，才能使得背包内的物品总价值最大？

> 注意：每种物品都只有1件

背包模型核心特征：`背包体积容量C`, `n个物品`, `物品体积数组w`, `物品价值数组value`, **求背包装入物品的最大价值**

1. **倒退分析**
  
背包装了i(0-i任意个)个物品的最大价值为j, 表示为dp[i][j], 而dp[i][j]取决于i-1个物品的最大价值，回退分析：
- 如果`物品i体积>j`，那么dp[i][j]时无法装入物品i，则物品i不影响最大价值`dp[i][j] = dp[i - 1][j]`(dp[i-1]时分配的体积也是j)
- 如果`物品i体积<j`,那么有两种选择，`背包里放了物品i`或者`背包里没有放入物品i`，取两种选择的最大价值
  - 背包里没放物品i, 那么物品i也不影响最大价值`dp[i][j] = dp[i - 1][j]`
  - 背包里放入了物品i, 回退取出物品i时，分配给i-1个物品的容量为`j - w[i]`, 最大价值为`dp[i][j] = dp[i-1][j-w[i]] + values[i]`(前i-1个物品的最大价值 + 物品i的价值)

2. **递推公式**
  
`dp[i][j] = Math.max(dp[i-1][j], dp[i-1][j-w[i]] + values[i])`

- `dp[i][j]`: 表示背包体积为j时，在0-i个物品中任意选择(一个或多个)装入的最大价值
- dp[i][j]是一个二维数组，比如横向为背包体积，纵向为物品
- 由递推公式可知dp[i][j]由前一行的数据计算来，与当前行数据无关：正上方和左上角(方向，不是正45度角)的数据
- 绘制二维表格，可以得知无论是先遍历背包还是物品，都不影响当前物品的最大价值(正上方和左上角)

3. **初始化**
- 当j=0即背包体积为0时，最大价值为0
- 当i=0时即第一个物品，比对物品体积和背包体积，物品体积 < 背包体积时最大价值为`第一个物品体积的价值`, 反之无法装入物品则为0

4. **遍历**
  
二维数组遍历：物品遍历 + 背包体积遍历

先物品后背包或者先背包后物品都可以，且数组已经初始化过了，所以两个遍历都是从索引1开始

|  | 0 | 1 | 2 | 3 | 4 |
| --- | --- | --- | --- | --- | --- |
| 物品0 | 0 | 15 | 15 | 15 | 15 |
| 物品1 | 0 | 15 | 15 | 20 | 35 |
| 物品2 | 0 | 15 | 15 | 20 | 35 |

**二维遍历模版**
```js
for (let i = 1; i < 物品数量; i++) { // 遍历物品
  for (let j = 1; j < 背包体积; j++) { // 遍历体积
    // 递归式
  }
}
```
### 滚动数组优化--一维数组
通过上述二维表格，可以简单的看作当前行的数据由上一行计算(正上方和左上方)，那么可以将多维数组压成一维数组，计算在同一行操作

1. 将前一行的数据拷贝到当前行
2. 当前行从后往前开始遍历计算
3. 可以将数组分为两部分：`旧数据/上一行遗留的数据` 和 `新数据/当前行已经重新计算的数据`
4. 可以看作`dp[j] = Math.max(dp[j], dp[j - w[i] + values[i]])`--因为压成一维，可以看作由二维递归公式的[i]去掉了，数组为背包体积0-j
5. 初始化一维数组：体积为0时最大价值为0， 其他情况为`非负`的最小值0
6. 由3的新旧数据可得，计算数据必须`从后往前开始遍历`
7. 需要先遍历物品，再遍历背包体积
::: details 展开查看0-1背包的两种解法
<<< @/algorithm/DynamicProgramming/KnapSack.ts
:::

[代码随想录视频](https://www.bilibili.com/video/BV1BU4y177kY/?spm_id_from=333.788&vd_source=584665597dd0dc2e3610474af2f4b063)

[代码随想录网站](https://programmercarl.com/%E8%83%8C%E5%8C%85%E7%90%86%E8%AE%BA%E5%9F%BA%E7%A1%8001%E8%83%8C%E5%8C%85-1.html#%E5%85%B6%E4%BB%96%E8%AF%AD%E8%A8%80%E7%89%88%E6%9C%AC)

[hello算法](https://www.hello-algo.com/chapter_dynamic_programming/knapsack_problem/#2)

## 最长上升子序列模型
```md
题目描述：给定一个无序的整数数组，找到其中`最长`上升子序列的`长度`
```
```md
示例:
输入: [10,9,2,5,3,7,101,18]
输出: 4
解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4
```

```md
说明:
可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。 你算法的时间复杂度应该为 O(n^2) 。
进阶: 你能将算法的时间复杂度降低到 O(n log n) 吗
```

### 思路分析
**序列动态规划**不是通过自顶向下的倒推来明确状态, 以索引为线索构造一个一维或者二维的状态数组

:::tip
子序列：原序列删除0个或多个元素，而不改变原序列顺序，剩下的序列则为子序列

上升子序列：子序列为升序
:::

1. `dp[i]`: 以序列中第i个元素为结尾的前i个元素(0-i)的`最长上升子序列`的长度
2. `dp[j]`: j的范围在0-i之间，以序列中第j个元素为结尾的前j个元素的`最长上升子序列`的长度
3. `状态转移方程`: `dp[i+1]`(0-i+1个元素之间的最长上升子序列长度)由`dp[i]`决定 -> `dp[i+1]和dp[i]`的关系可以推演为`dp[i]和dp[j]`, j<=i, 子序列可以是删除多个元素而来，i-j无论等于多少，序列0-j加上第i个元素后，最长上升子序列的长度都+1
   - nums[i + 1] > nums[i], 递增，nums[i + 1]可以加入上升子序列，所以`dp[i + 1] = dp[i] + 1`
   - nums[i + 1] < nums[i], 递减，nums[i + 1]不加入上升子序列，所以`dp[i + 1] = dp[i]`
   - 遍历nums[0]-nums[i]之间的最长子序列，比较取最大值为dp[i]
   - `状态转移方程`: `if (nums[i] > nums[j]) dp[i] = Math.max(dp[i], dp[j] + 1)`
4. `dp[i]的初始化`: 每一个i对应最小的序列为本身`[nums[i]]`，所以最小的最长上升子序列长度为1
5. `遍历顺序`: 遍历子序列(i) + 遍历当前子序列的子序列(j)
   - dp[i]: 是由前面的0-i个元素的最长上升子序列长度推导，所以必须`从前往后`; dp[i]由前面的序列决定计算并赋值，索引0已经初始化，所以从1开始遍历计算并赋值
   - dp[j]: 遍历0-(i-1)，计算对应的每个元素为尾端的最长上升子序列的长度，没有相互关联的关系，所以`从前往后或从后往前都可`, 默认从前往后; dp[j]是用来比较并处理后赋值给dp[i]，所以要从0开始遍历, `j:[0-i)`

::: details 展开查看上升子序列的代码
<<< @/algorithm/DynamicProgramming/LengthOfLTS.ts
:::

