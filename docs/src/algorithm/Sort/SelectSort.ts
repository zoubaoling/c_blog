/**
 * @description 选择排序
 * 循环遍历数组，每次找出范围内的最小值，将其放在范围的头部，然后缩小排序范围，继续重复上述操作
 */
export const selectSort = (arr: number[]): number[] => {
  let minIndex: number
  for (let i = 0; i < arr.length; i++) {
    minIndex = i
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j
    }
    if (minIndex !== i) [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
  return arr
}