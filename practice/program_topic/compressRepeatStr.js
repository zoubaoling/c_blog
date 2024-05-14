/**
 * @description 利用字符重复出现的次数，编写一种方法，实现基本的字符串压缩功能
 * aabcccccaaa -> a2b1c5a3
 * 
 * 从索引0开始遍历，当前与当后相比，不等添加count并重置，相等增加计数
 */
const compressRepeatString = (str) => {
  if (str === null || str === undefined) return
  let count = 1
  let compress = ''
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      count++
    } else {
      compress = compress + str[i] + count
      count = 1
    }
  }
  return compress.length < str.length ? compress : str
}
compressRepeatString('aabcccccaaa')
console.log(compressRepeatString('abcdefg'))