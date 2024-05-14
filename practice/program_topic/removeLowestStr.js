/**
 * @description 去除字符串中出现次数最少的字符，不改变原字符串的顺序
 * 实现删除字符串中出现次数最少的字符，若出现次数最少的字符有多个，则把出现次数最少的字符都删除。输出删除这些单词后的字符串，字符串中其它字符保持原来的顺序
 * “ababac” —— “ababa”
 * “aaabbbcceeff” —— “aaabbb”
 * 
 * 使用Map存储单个字符出现次数以及每个次数对应的字符和出现的起始位置，通过split删除
 */
const removeLowestStr = (str) => {
  let strArr = str.split('')
  const tmpMap = new Map()
  strArr.forEach((s, i) => {
    let count = 1
    let start = i
    let end = i
    if (tmpMap.has(s)) {
      let { count, ...rest } = tmpMap.get(s)
      count = count + 1
      tmpMap.set(s, { ...rest, count, end })
    } else {
      tmpMap.set(s, { count, start, end })
    }
  });
  const delMap = new Map()
  const minCounts = Math.min.apply(null, [...tmpMap.values()].map(({ count, ...restInfo }) => {
    if (!delMap.has(count)) delMap.set(count, [])
    const cArr = delMap.get(count)
    cArr.push(restInfo)
    return count
  }))
  const toDeleteItems = delMap.get(minCounts)
  for (let i = toDeleteItems.length - 1; i >=0; i--) {
    const { start, end } = toDeleteItems[i]
    strArr.splice(start, end - start + 1)
  }
  return strArr.join('')
}
const str = 'aaabbbcceeff'
const s = removeLowestStr(str)
console.log(s)
/**
 * ChatGpt修正版
 * 简化操作
 * 一个Map存储字符出现字数
 * 遍历字符串，与最小次数比对，拼接新的字符串
 */
const removeLowestStrOptimizeByGpt = (str) => {
  const charCountMap = new Map()
  for (const char of str) {
    charCountMap.set(char, (charCountMap.get(char) || 0) + 1)
  }

  const minCounts = Math.min(...charCountMap.values())

  let result = ''
  for (const char of str) {
    if (charCountMap.get(char) !== minCounts) result += char
  }
  return result
}