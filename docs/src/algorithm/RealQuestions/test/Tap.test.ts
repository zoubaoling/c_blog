import { describe, it, expect } from "vitest";
import { trapByForce, trapByHash, trapByDoubleIndicator } from "../ts/Trap";


const testCases = [
  {
    input: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
    output: 6
  },
  {
    input: [2,0,2],
    output: 2
  },
  {
    input: [4, 2, 0, 3, 2, 5],
    output: 9
  },
  {
    input: [],
    output: 0
  },
  {
    input: [1, 1, 1, 1],
    output: 0
  }
]
describe('测试接雨水问题-暴力解法', () => {
  testCases.forEach(({ input, output}, index) => {
    it(`测试用例${index+1}: ${input}的结果应该为${output}`, () => {
      expect(trapByForce(input)).toEqual(output)
    })
  })
})
describe('测试接雨水问题-备忘录优化法', () => {
  testCases.forEach(({ input, output}, index) => {
    it(`测试用例${index+1}: ${input}的结果应该为${output}`, () => {
      expect(trapByHash(input)).toEqual(output)
    })
  })
})
describe('测试接雨水问题-双指针法', () => {
  testCases.forEach(({ input, output}, index) => {
    it(`测试用例${index+1}: ${input}的结果应该为${output}`, () => {
      expect(trapByDoubleIndicator(input)).toEqual(output)
    })
  })
})