/**
 * @default 给出一个区间的集合，请合并所有重叠的区间
 * 示例 1:
 * 输入: [[1,3],[2,6],[8,10],[15,18]]
 * 输出: [[1,6],[8,10],[15,18]]
 * 解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 * 
 * 示例 2:
 * 输入: [[1,4],[4,5]]
 * 输出: [[1,5]]
 * 解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
 */
export const mergeSection = (section: number[][]): number[][] => {
  if (section.length === 0) return []
  section.sort((a: number[], b: number[]): number => a[0] - b[0])
  const res: number[][] = []
  res.push(section[0])
  for (let i = 1; i < section.length; i++) {
    const prev: number[] = res[res.length - 1]
    const cur: number[] = section[i]
    // 比对前后数组，查看是否可以合并
    if (cur[0] <= prev[1]) {
      // 区间重叠，更新前一个区间的结束元素
      prev[1] = Math.max(prev[1], cur[1])
    } else {
      // 不重叠
      res.push(cur)
    }
  }
  return res
}