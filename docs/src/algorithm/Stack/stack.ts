/**
 * @description 有效括号问题
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效
 * 有效字符串需满足： 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合
 * 注意空字符串可被认为是有效字符串
 * 
 * 示例:
 * "()" -> true
 * "()[]{}" -> true
 * "(]" -> false
 * "([)]" -> false
 * "{[]}" -> true
 */
export const isValidBracket = (str: String = ''): boolean => {
  const strStack: string[] = []
  const bracketMap = new Map([['(', ')'], ['{', '}'], ['[', ']']])
  const leftKeys = new Set(bracketMap.keys())
  for ( const bracket of str) {
    if (leftKeys.has(bracket)) {
      strStack.push(bracketMap.get(bracket)!)
    } else {
      if (strStack.length === 0 || strStack.pop() !== bracket) return false
    }
  }
  return strStack.length === 0;
}