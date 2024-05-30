import { expect, it, describe } from "vitest";
import { numIslands, numIslandsBFS } from "../ts/numIslands";

const testCases = [
  {
    matrix: [
      ['1', '1', '0', '0', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '0', '1', '1']
    ],
    output: 3
  },
  {
    matrix: [
      ['1', '0', '0', '1'],
      ['0', '1', '1', '0'],
      ['0', '0', '0', '0'],
      ['1', '1', '0', '1']
    ],
    output: 5
  },
  {
    matrix: [
      ['0', '0', '0', '0'],
      ['0', '0', '0', '0'],
      ['0', '0', '0', '0'],
      ['0', '0', '0', '0']
    ],
    output: 0
  },
  {
    matrix: [
      ['1', '1', '1', '1'],
      ['1', '1', '1', '1'],
      ['1', '1', '1', '1'],
      ['1', '1', '1', '1']
    ],
    output: 1
  }
]



describe('测试岛屿数量-DFS', () => {
  testCases.forEach(({ matrix, output }, index) => {
    it(`测试用例${index + 1}`, () => {
      expect(numIslands(JSON.parse(JSON.stringify(matrix)))).toEqual(output)
    })
  })
})
describe('测试岛屿数量-BFS', () => {
  testCases.forEach(({ matrix, output }, index) => {
    it(`测试用例${index + 1}`, () => {
      expect(numIslandsBFS(JSON.parse(JSON.stringify(matrix)))).toEqual(output)
    })
  })
})