import { expect } from "vitest";
import { lowestCommonAncestor, TreeNode } from "../ts/LowestCommonAncestor";

// 创建二叉树
const tree = new TreeNode(3);
tree.left = new TreeNode(5);
tree.right = new TreeNode(1);
tree.left.left = new TreeNode(6);
tree.left.right = new TreeNode(2);
tree.left.right.left = new TreeNode(7);
tree.left.right.right = new TreeNode(4);
tree.right.left = new TreeNode(0);
tree.right.right = new TreeNode(8);
test('查找二叉树最近公共祖先，目标节点为：5 和 1', () => {
  expect(lowestCommonAncestor(tree, tree.left, tree.right)).toBe(tree); // LCA of 5 and 1 is 3
});

test('查找二叉树最近公共祖先，目标节点为：5 和 4', () => {
  expect(lowestCommonAncestor(tree, tree.left, tree.left!.right!.right)).toBe(tree.left); // LCA of 5 and 4 is 5
});

test('查找二叉树最近公共祖先，目标节点为：6 和 4', () => {
  expect(lowestCommonAncestor(tree, tree.left!.left, tree.left!.right!.right)).toBe(tree.left); // LCA of 6 and 4 is 5
});

test('查找二叉树最近公共祖先，目标节点为：7 和 8', () => {
  expect(lowestCommonAncestor(tree, tree.left!.right!.left, tree.right!.right)).toBe(tree); // LCA of 7 and 8 is 3
});

test('查找二叉树最近公共祖先，目标节点为：0 和 8', () => {
  expect(lowestCommonAncestor(tree, tree.right!.left, tree.right!.right)).toBe(tree.right); // LCA of 0 and 8 is 1
});