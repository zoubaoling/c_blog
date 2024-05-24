/**
 * @description 遍历二叉树：前序 中序 后序
 * 二叉树结构：{ val: 'A', left: { val: 'B', left: {}, right: {} }, right: {} }
 * 输入：[1, null, 2, 3]是伪数组简写 -> { val: 1, left: null, right: { val: 2, left: { val: 3 }, right: null }}
 * 输出：[1, 2, 3] 是真数组 遍历结果是节点的值，而不是节点对象
 */
// 通用二叉树节点
export class NodeList {
  val: number
  left: NodeList | null
  right: NodeList | null
  constructor (val: number) {
    this.val = val
    this.left = this.right = null
  }
}
// 前序：根左右
export const preorderTraversal = (root: NodeList): number[] => {
  const res: number[] = []
  const stack: NodeList[] = []

  if (!root) return res
  stack.push(root)
  while (stack.length) {
    const node = stack.pop()!
    res.push(node.val)
    if (node?.right) stack.push(node.right)
    if (node?.left) stack.push(node.left)
  }

  return res
}
// 后序遍历：左右根
export const postorderTraversal = (root: NodeList): number[] => {
  let res: number[] = []
  let stack: NodeList[] = []
  if (!root) return res
  stack.push(root)
  while (stack.length) {
    const node = stack.pop()!
    res.unshift(node.val)
    if (node?.left) stack.push(node.left)
    if (node?.right) stack.push(node.right)
  }
  return res
}

// 中序遍历：左中右
export const inorderTraversal = (root: NodeList): number[] => {
  let res: number[] = []
  let stack: NodeList[] = []
  let cur: NodeList | null = root
  while (cur || stack.length) {
    while (cur) {
      stack.push(cur)
      cur = cur.left
    }
    cur = stack.pop()!
    res.push(cur.val)
    cur = cur.right
  }
  return res
}