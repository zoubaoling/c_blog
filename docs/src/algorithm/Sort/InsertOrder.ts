/**
 * @description 插入排序
 * 基于当前元素之前的序列都是有序的，从后往前找到当前元素在前面序列里的正确位置：靠前的较大数字要为靠后的较小数字腾出位置(交换位置，保持递增，最后找到当前元素位置并赋值)
 */
export const insertSort = (arr: number[]): number[] => {
  for (let i = 1; i < arr.length; i++) {
    let j = i
    const tmp = arr[i]
    while (j > 0 && arr[j - 1] > tmp) {
      arr[j] = arr[j - 1]
      j--
    }
    arr[j] = tmp
  }
  return arr
}