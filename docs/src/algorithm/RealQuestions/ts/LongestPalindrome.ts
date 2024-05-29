/**
 * @description 最大回文子串问题
 * 题目描述：给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
 * 示例 1：
 * 输入: "babad"
 * 输出: "bab"
 * 注意: "aba" 也是一个有效答案。
 * 
 * 示例 2：
 * 输入: "cbbd"
 * 输出: "bb"
 * 
 * 动态规划：双层遍历 + 递推公式
 */

/** 动态规划方案: 序列
 * 最优子结构: s[i,j]取决于s[i+1, j-1], 判断是否为回文子串 0<i<n, 0<j<n, i和j可以相等
 * dp[i][j]: s[i,j]是否为回文子串，存储布尔值，对于递推更方便
 * 递推公式: if (s[i] === s[j] && dp[i + 1][j - 1]) dp[j][j] = true
 * 初始化：使用递推公式判断时，字符串长度>=3,所以要先初始化字符串长度为1，2的状态
 *        字符串长度为1: dp[i][i] = true，一个字符串本身为回文子串
 *        字符串长度为2: dp[i][i+1] 如果两个字符相等则为回文子串
 */
export const longestPalindromeByDp = (str: string): string => {
  const len: number = str.length
  if (len < 2) return str
  // dp[i][j]: s[i,j]是否为回文子串
  // Array.from遍历二维数组，第二个参数map处理; Array(len)等价于new Array(len)，只是前者更简洁
  const dp: boolean[][] = Array.from({ length: len}, () => Array(len).fill(false))

  // 最长子字符串长度
  let maxLength: number = 1
  // 最长回文子串的起始位置
  let start: number = 0
  // 初始化长度为1的字符串
  for (let i = 0; i < len; i++) {
    dp[i][i] = true
  }
  // 初始化长度为2的字符串
  for (let i = 0; i < len - 1; i++) {
    dp[i][i+1] = str[i] === str[i+1]
    maxLength = 2
    start = i
  }

  // 遍历字符串长度 + 长度对应的所有子字符串
  for (let n = 3; n <= len; n++) {
    // 遍历子字符串 起始位置, 每次都是将数组从头开始遍历，遍历所有的对应长度的字符串
    for (let i = 0; i < len - n + 1; i++) {
      // 字符串结束位置
      const j = i + n - 1
      // 递推公式
      if (str[i] === str[j] && dp[i+1][j-1]) {
        dp[i][j] = true
        start = i
        maxLength = n
      }
    }
  }
  return str.substring(start, start + maxLength)
}
// 双指针-中心扩散法
export const longestPalindromeByExpandCenter = (s: string): string => {
  let start: number = 0
  let end: number = 0
  // 根据指定的中心点(一个字符或者两个字符)向两边扩散获取最大的回文子串长度
  const getlongestPalindromeByCenter = (left: number, right: number, s: string): number => {
    while (left >=0 && right < s.length && s[left] === s[right]) {
      left--
      right++
    }
    return right - left - 1
  }
  for (let center = 0; center < s.length; center++) {
    // 以一个字符为中心扩散 获取最长回文子串的长度
    const len1: number = getlongestPalindromeByCenter(center, center, s)
    // 以两个点为中心扩散 获取最长回文子串的长度
    const len2: number = getlongestPalindromeByCenter(center, center + 1, s)
    // 新的回文子串的长度
    const maxLength = Math.max(len1, len2)
    // maxLength > end - start和 maxLength > end - start + 1都可，前者判断为新的回文子串长度>=当前回文子串时更新数据，后者判断新旧相等时不会更新数据
    if (maxLength > end - start) {
      // 通过中心点和字符串长度获取字符串起始位置
      start = center - Math.floor((maxLength - 1) / 2)
      end = center + Math.floor(maxLength / 2)
    }
  }
  return s.substring(start, end + 1)
}