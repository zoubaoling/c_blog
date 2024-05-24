import { AllPermute } from "./AllPermute";
import { CombinePermute } from "./CombinePermute";
import { describe, it, expect } from "vitest";
import _ from 'lodash'
const sortArray = (arr: number[][]) => {
  return arr.map(row => [...row].sort()).sort()
}
describe('测试全队列-深度优先搜索', () => {
  it('测试用例1', () => {
    const arr = [1, 2, 3]
    expect(AllPermute(arr)).toEqual([
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1]
    ])
  })
})

describe('测试组合队列-递归', () => {
  it('测试用例1', () => {
    const res1 = CombinePermute(4, 2)
    const expectRes1 = [
        [ 1, 2 ], [ 1, 3 ], [ 1, 4 ], [ 2, 3 ],
        [ 3, 4 ],
        [ 2, 4 ], 
      ]
    // expect(res1).toEqual()
    expect(_.isEqual(sortArray(res1), sortArray(expectRes1))).toBe(true)
  })
})