import { expect, it, describe } from "vitest";
import { TreeNode, buildTreeByInPostOrder, buildTreeByPreInOrder } from '../ts/BuildTreeByTraverseQuence'

describe('测试中序和后序数组构建二叉树', () => {
  it('测试用例', () => {
    const inorder = [9, 3, 15, 20, 7];
    const postorder = [9, 15, 7, 20, 3];

    const expectedTree = new TreeNode(
      3,
      new TreeNode(9),
      new TreeNode(20, new TreeNode(15), new TreeNode(7))
    );
    const resultTree = buildTreeByInPostOrder(inorder, postorder);

    expect(resultTree).toEqual(expectedTree);
  })
  it('should return null for empty arrays', () => {
    expect(buildTreeByInPostOrder([], [])).toBeNull();
  });

  it('should construct a single node tree for arrays with one element', () => {
    const inorder = [1];
    const postorder = [1];

    const expectedTree = new TreeNode(1);

    const resultTree = buildTreeByInPostOrder(inorder, postorder);

    expect(resultTree).toEqual(expectedTree);
  });
})

describe('测试前序和中序数组构建二叉树', () => {
  it ('测试用例1', () => {
    const preOrder1 = [3, 9, 20, 15, 7];
    const inOrder1 = [9, 3, 15, 20, 7];
    const root = buildTreeByPreInOrder(preOrder1, inOrder1);
    expect(root).toEqual(
      new TreeNode(3,
        new TreeNode(9),
        new TreeNode(20,
          new TreeNode(15),
          new TreeNode(7)
        )
      )
    );
  })
  it ('测试用例2', () => {
    const preOrder2 = [1, 2, 4, 5, 3];
    const inOrder2 = [4, 2, 5, 1, 3];
    const root = buildTreeByPreInOrder(preOrder2, inOrder2);
    expect(root).toEqual(
      new TreeNode(1,
        new TreeNode(2,
          new TreeNode(4),
          new TreeNode(5)
        ),
        new TreeNode(3)
      )
    );
  })
})