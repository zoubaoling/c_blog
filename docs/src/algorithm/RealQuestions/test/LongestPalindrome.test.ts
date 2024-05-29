import { describe, it, expect } from "vitest";
import { longestPalindromeByDp, longestPalindromeByExpandCenter } from '../ts/LongestPalindrome'

describe('测试最长回文子串', () => {
  it ('测试动态规划：babad -> bab|aba', () => {
    const input = 'babad'
    const possibleOutput = ['bab', 'aba']
    const result = longestPalindromeByDp(input)
    const isValidOutput = possibleOutput.includes(result)
    expect(isValidOutput).toBe(true)
  })
  it ('测试中心扩散：babad -> bab|aba', () => {
    const input = 'babad'
    const possibleOutput = ['bab', 'aba']
    const result = longestPalindromeByExpandCenter(input)
    const isValidOutput = possibleOutput.includes(result)
    expect(isValidOutput).toBe(true)
  })
})