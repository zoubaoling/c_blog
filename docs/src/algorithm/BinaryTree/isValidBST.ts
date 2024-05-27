/**
 * @description 二叉搜索树
 * 1. 空树
 * 2. 包括根节点、左子树、右子树；左 <= 根 <= 右
 */
export class NodeList {
  val: number
  left: NodeList | null
  right: NodeList | null
  constructor (val: number) {
    this.val = val
    this.left = this.right = null
  }
}
export const isValidBST = (root: NodeList): boolean => {
  const dfs = (root: NodeList, minValue: number, maxValue: number): boolean => {
    if (!root) return true
    // 若右孩子不大于根结点值，或者左孩子不小于根结点值，则不合法
    if (root.val <= minValue || root.val >= maxValue) return false
    // 左右子树必须都符合二叉搜索树的数据域大小关系
    return dfs(root.left!, minValue, root.val) && dfs(root.right!, root.val, maxValue)
  }
  // 初始化最小值和最大值为极小或极大
  return dfs(root, -Infinity, Infinity)
}