import { describe, it, expect } from "vitest";
import { lengthOfLTS } from './LengthOfLTS'

describe('测试最长上升子序列', () => {
  it('测试用例1', () => {
    const arr = [10,9,2,5,3,7,101,18]
    expect(lengthOfLTS(arr)).toBe(4)
  })
})