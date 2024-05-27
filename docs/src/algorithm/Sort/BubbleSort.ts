/**
 * @description 冒泡排序
 * 从第一个元素开始，重复比较相邻的两个元素，如果第一项比第二项大，交换两个位置，反之不动
 * 每一轮从头到尾遍历数组，对比+交换相邻元素
 * 数组元素有多少个，就要从头到尾遍历多少轮
 */
// 基本冒泡实现
export const bubbleSort = (arr: number[]): number[] => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [ arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}
// 改进版：每一轮遍历完，数组尾端的元素都会变为已排序的，所以后续轮次时不需要额外处理
export const betterBubbleSort = (arr: number[]): number[] => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [ arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}
// 最好版：如果遍历完一轮后，发现数组已经是有序的了，可以提前退出遍历
// 如果一轮遍历中，一次都没有交换，那么数组是有序的，直接跳过返回有序数组即可
export const bestBubbleSort = (arr: number[]): number[] => {
  for (let i = 0; i < arr.length; i++) {
    let flag: boolean = true
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [ arr[j + 1], arr[j]]
        flag = false
      }
    }
    if (!flag) return arr
  }
  return arr
}