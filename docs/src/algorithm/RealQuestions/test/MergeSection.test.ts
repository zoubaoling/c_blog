import { describe, expect, it } from "vitest";
import { mergeSection } from "../ts/MergeSection";
const testCases = [
  { intervals: [[1,3],[2,6],[8,10],[15,18]], expected: [[1,6],[8,10],[15,18]] },
  { intervals: [[1,4],[4,5]], expected: [[1,5]] },
  { intervals: [[1,4],[0,4]], expected: [[0,4]] },
  { intervals: [[1,4],[0,0]], expected: [[0,0],[1,4]] },
];
describe('测试合并区间', () => {
  testCases.forEach((testCase, index) => {
    it(`测试用例 ${index + 1}`, () => {
        const result = mergeSection(testCase.intervals);
        expect(result).toEqual(testCase.expected);
    });
});
})