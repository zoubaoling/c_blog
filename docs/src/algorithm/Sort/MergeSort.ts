/**
 * @description 归并排序
 * 拆分 + 有序合并
 * 重复 + 有去有回：迭代
 */
const mergeArr = (arr1: number[], arr2: number[]): number[] => {
  const len1: number = arr1.length
  const len2: number = arr2.length
  let i = 0
  let j = 0
  let res: number[] = []
  while (i < len1 && j < len2) {
    if (arr1[i] < arr2[j]) {
      res.push(arr1[i])
      i++
    } else {
      res.push(arr2[j])
      j++
    }
  }
  if (i < len1) {
    res.concat(arr1.slice(i))
  } else {
    res.concat(arr2.slice(j))
  }
  return res
}
export const mergeSort = (arr: number[]): number[] => {
  const len: number = arr.length;
  if (len <= 1) return arr
  const mid: number = Math.floor(len / 2)
  const leftArr: number[] = mergeSort(arr.slice(0, mid))
  const rightArr: number[] = mergeSort(arr.slice(mid))
  const merged: number[] = mergeArr(leftArr, rightArr)
  return merged
}
const arr = [2, 5, 1, 9]
mergeSort(arr)