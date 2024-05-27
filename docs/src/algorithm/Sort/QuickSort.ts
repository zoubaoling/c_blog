/**
 * @description 快速排序
 * 通过左右指针和基准值将数组划分为两个一大一小的数组，并递归排序两个子数组
 */
/**
 * 将数组分隔为一大一小的两个数组，左指针左侧数据都小于基准数据，右指针右侧都大于基准数据
 * 左指针大于右指针时，分隔完成
 * 1. 初始化左右指针在两端，以及基准值为中间值
 * 2. 循环当左指针数据 < 基准数据时，左指针右移， while
 * 3. 循环右指针数据 > 基准数据时，右指针右移， while
 * 4. 当左指针小于等于右指针时，说明基准值左边存在较大数据，或者右边存在较小数据，交换左右指针对应的数据，保证有序性，左右指针向中间移动
 * 5. 继续2-4步骤直到遍历到左指针>右指针时，数组分隔完成（2-4执行一次可能只处理了两侧部分数据-有序性，剩下中间的部分还需要继续处理2-4）
 */
const partion = (arr: number[], left: number, right: number): number => {
  const privateValue = arr[Math.floor(left + (right - left) / 2)];
  let i = left
  let j = right
  while (i <= j) {
    while (arr[i] < privateValue) {
      i++
    }
    while (arr[j] > privateValue) {
      j--
    }
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]
      i++
      j--
    }
  }
  return i
}
export const quickSort = (arr: number[], left: number = 0, right: number = arr.length - 1): number[] => {
  if (arr.length > 1) {
    const lineIndex = partion(arr, left, right)
    // 左边数组长度不小于1
    if (left < lineIndex - 1) {
      quickSort(arr, left, lineIndex - 1)
    }
    // 右边长度不小于1
    if (lineIndex < right) {
      quickSort(arr, lineIndex, right)
    }
  }
  return arr
}
const arr = [3, 5, 1, 5, 2, 9, 0]
quickSort(arr)
