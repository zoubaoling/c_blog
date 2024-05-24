import { Nullable } from "vitest"

/**
 * @description 翻转二叉树
 * 将每一棵树的左右孩子交换，即为重复，就涉及到了递归
 */
class NodeList {
  val: number
  left: NodeList | null
  right: NodeList | null
  constructor (val: number) {
    this.val = val
    this.left = this.right = null
  }
}
export const InverseTree = (root: NodeList | null): NodeList | null => {
  if (!root) return root
  const left: NodeList | null = InverseTree(root.left)
  const right: NodeList | null = InverseTree(root.right)
  root.left = right
  root.right = left
  return root
}
