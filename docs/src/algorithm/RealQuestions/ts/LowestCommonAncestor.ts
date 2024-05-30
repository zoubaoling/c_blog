/**
 * @description 查找二叉树最近公共祖先节点
 * 题目描述： 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先
 * 示例 1:
 * 输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
 * 输出: 3
 * 解释: 节点 5 和节点 1 的最近公共祖先是节点 3。
 * 
 * 示例 2:
 * 输入: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
 * 输出: 5
 * 解释: 节点 5 和节点 4 的最近公共祖先是节点 5。因为根据定义最近公共祖先节点可以为节点本身。
 */
export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor (val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}
// 递归
// 查找祖先 -> 自下而上 -> 后序遍历：左右中
export const lowestCommonAncestor = (root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null => {
  if (root === null || root === p || root === q) return root

  // 递归查找左子树里的目标节点或目标节点的祖先节点
  const left: TreeNode | null = lowestCommonAncestor(root.left, p, q)
  // 递归查找右子树里的目标节点或目标节点的祖先节点
  const right: TreeNode | null = lowestCommonAncestor(root.right, p, q)

  // 目标节点分别为左右节点 或者 分别在左子树或者右子树里
  if (left && right) return root

  // 目标节点在左子树或者右子树里返回，以便递归到上层和另一个目标节点一起判断公共祖先节点
  return left || right
}