/**
 * @description 接雨水问题
 * 
 * 题目描述：给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水
 * 示例：
 * 输入: [0,1,0,2,1,0,1,3,2,1,2,1]
 * 输出: 6
 *
 * 解析：
 * 两侧都有有高度的柱子才能接雨水，称为凹槽，所有第一个柱子和最后一个柱子不能接雨水
 * 凹槽能接多少雨水取决于其左右两侧最高(不一定紧邻)的柱子高度，去较矮的高度为雨水上限，再与雨水下限(凹槽柱子的高度)相减
 * 
 * 解决方案：
 * 1. 暴力遍历 2. 备忘录优化 3. 双指针-对撞指针 4. 单调栈
 */ 

// 暴力遍历
export const trapByForce = (heights: number[]): number => {
  let sum: number = 0
  const len: number = heights.length
  for (let i = 1; i < len - 1; i++) {
    let leftIndex: number = i - 1
    let rightIndex: number = i + 1
    // 从当前柱子向两侧出发计算最高的柱子
    let leftMax: number = heights[i]
    let rightMax: number = heights[i]
    // 查找左侧的最高高度，所以要遍历完
    while (leftIndex >= 0) {
      leftMax = Math.max(heights[leftIndex], leftMax)
      leftIndex--
    }
    // 查找左侧的最高高度，所以要遍历完
    while (rightIndex < len) {
      rightMax = Math.max(heights[rightIndex], rightMax)
      rightIndex++
    }
    const min: number = Math.min(leftMax, rightMax)
    // 左右两侧的柱子必须都比其高才能形成凹槽接雨水
    const diff: number = min - heights[i]
    if (diff > 0) sum += diff
  }
  return sum
}

// 备忘录优化法
export const trapByHash = (heights: number[]): number => {
  const len: number = heights.length
  let sum: number = 0
  const leftMaxArr: number[] = new Array(len)
  const rightMaxArr: number[] = new Array(len)
  leftMaxArr[0] = heights[0]
  rightMaxArr[len - 1] = heights[len - 1]
  // 先遍历将柱子的左右最高柱子存储起来
  // 从左往右遍历，记录左侧最高柱子
  for (let i = 1; i < len; i++) {
    leftMaxArr[i] = Math.max(heights[i], leftMaxArr[i - 1])
  }
  // 从右往左遍历，记录右侧最高柱子
  for (let j = len - 2; j >= 0; j--) {
    rightMaxArr[j] = Math.max(heights[j], rightMaxArr[j + 1])
  }
  // 从头遍历柱子，计算雨水量
  for (let k = 1; k < len - 1; k++) {
    const diff = Math.min(leftMaxArr[k], rightMaxArr[k]) - heights[k]
    if (diff > 0) sum += diff
  }
  return sum
}

// 双指针-对撞指针
export const trapByDoubleIndicator = (heights: number[]): number => {
  let len: number = heights.length
  let leftIndex: number = 0
  let rightIndex: number = len - 1
  let leftMax: number = heights[0]
  let rightMax: number = heights[len - 1]
  let sum: number = 0
  // 注意临界值 leftIndex <= rightIndex 相等时，需要处理最后一个柱子
  while (leftIndex <= rightIndex) {
    if (leftMax < rightMax) {
      // 计算左边的值并更新
      leftMax = Math.max(leftMax, heights[leftIndex])
      const diff: number = leftMax - heights[leftIndex]
      if (diff > 0) sum += diff
      leftIndex++
    } else {
      // 计算右边的值并更新
      rightMax = Math.max(rightMax, heights[rightIndex])
      const diff: number = rightMax - heights[rightIndex]
      if (diff > 0) sum += diff
      rightIndex--
    }
  }
  return sum
}

// 单调栈
