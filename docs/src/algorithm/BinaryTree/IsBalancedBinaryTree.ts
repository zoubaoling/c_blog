/**
 * @description 判定是否为平衡二叉树
 * 1. 任意节点的左右子树的高度都不大于1
 */
export const isBalanced = (root: any): boolean => {
  let flag = true
  const dfs = (root: any): number => {
    if (!root || !flag) return 0
    const left = dfs(root.left)
    const right = dfs(root.right)
    if (Math.abs(left - right) > 1) {
      flag = false
      return 0
    }
    return Math.max(left, right) + 1
  }
  dfs(root)
  return flag
}