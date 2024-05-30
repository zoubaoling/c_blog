/**
 * @description 岛屿数量问题
 * 题目描述：给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
 * 岛屿总是被水包围，并且每座岛屿只能由水平方向或竖直方向上相邻的陆地连接形成。
 * 此外，你可以假设该网格的四条边均被水包围。
 * 
 * 示例 1:
 * 输入:
 * 11110
 * 11010
 * 11000
 * 00000
 * 输出: 1
 * 
 * 示例 2:
 * 输入:
 * 11000
 * 11000
 * 00100
 * 00011
 * 输出: 3
 * 解释: 每座岛屿只能由水平和/或竖直方向上相邻的陆地连接而成
 * 
 * 翻译：上下左右相连的1才是岛屿，所以判断陆地是否被水包围时，判断陆地上下左右四个方向即可
 * 
 * 解决方案：BFS 和 DFS
 * 
 * 1. DFS深度优先遍历-递归
 * 遍历二维数组，以当前网格为中心，上下左右四个方向处理与其相连的网格，0回退，1递归处理为0，二维数组遍历一个元素处理完岛屿树+1
 * 将与岛屿相连的1处理为0，是为了避免重复下一个陆地相连的网格。第一个岛屿块里的陆地递归完后都处理为0，下一次遍历时不会重复计算
 * 
 * 2. BFS广度优先搜索-迭代、队列、先进先出
 * 核心思想与DFS与之，以陆地为起点，将其周围的陆地处理为0，继续寻找下一个岛屿
 * 
 * 队列首部出队，迭代处理：遍历队列首部上下左右四个网格，符合陆地条件的入队并处理为0，继续出队迭代，直到队列为空
 */
type islandsType = string | number

export const numIslands =(nums: islandsType[][]): number => {
  if (nums.length === 0) return 0
  const rows: number = nums.length;
  const cols: number = nums[0].length
  // 岛屿个数
  let count: number = 0

  const dfs = (nums: islandsType[][], i: number, j: number): void => {
    if (i < 0 || j < 0 || i >= rows || j >= cols || nums[i][j] == 0) return
    // 上下左右才算相连，递归处理上下左右的网格：0就退回，1就处理为0并继续递归处理相连网格
    // 岛屿内的陆地处理为0，标记已处理，遍历下一个岛屿的陆地时不会重新计算
    nums[i][j] = 0
    // 上 下 左 右
    dfs(nums, i - 1, j)
    dfs(nums, i + 1, j)
    dfs(nums, i, j - 1)
    dfs(nums, i, j + 1)
  }

  for (let i = 0; i < rows; i++) { // 遍历行
    for (let j = 0; j < cols; j++) { // 遍历列
      if (nums[i][j] == 1) {
        // 遇到陆地1，岛屿个数+1
        count++
        // 递归处理陆地上下左右相连的陆地为0，避免后续遍历时重复计算为岛屿
        dfs(nums, i, j)
      }
    }
  }
  return count
}
// BFS 广度优先搜索 队列 迭代
export const numIslandsBFS = (matrix: islandsType[][]): number => {
  if (matrix.length === 0) return 0
  const rows: number = matrix.length;
  const cols: number = matrix[0].length
  const queue: number[][] = []
  let count: number = 0

  // 迭代 while
  const bfs = (queue: number[][], i: number, j: number): void => {
    queue.push([i, j])
    matrix[i][j] = 0

    // 上下左右对应的[i, j]坐标
    const directions: number[][] = [[-1, 0], [1, 0], [0, -1], [0, 1]]

    while (queue.length) {
      const top: islandsType[] = queue.shift()!
      // 获取四个方向的数据，符合条件入队
      for (let [x, y] of directions) {
        const newX: number = Number(top[0]) + x
        const newY: number = Number(top[1]) + y
        if (newX >= 0 && newX < rows && newY >= 0 && newY <cols && matrix[newX][newY] == 1) {
          console.log(matrix[newX][newY])
          queue.push([newX, newY])
          matrix[newX][newY] = 0
        }
      }
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (matrix[i][j] == 1) {
        count++
        bfs(queue, i, j)
      }
    }
  }
  return count
}