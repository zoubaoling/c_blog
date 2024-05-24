/**
 * @description 层序遍历
 * 题目描述：给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。
 * 示例： 二叉树：[3,9,20,null,null,15,7],
 *   3
 *  / \
 * 9  20
 *   /  \
 *  15   7
 * 返回其层次遍历结果：
 * [
 * [3],
 * [9,20],
 * [15,7]
 * ]
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

export const levelOrder = (root: NodeList): number[][] => {
  let res: number[][] = []
  let stack: NodeList[] = []
  if (!root) return res
  stack.push(root)
  while (stack.length) {
    let level: number[] = []
    let len: number = stack.length
    for (let i = 0; i < len; i++) {
      const top: NodeList = stack.shift()!
      level.push(top.val)
      if (top.left) stack.push(top.left)
      if (top.right) stack.push(top.right)
    }
    res.push(level)
  }
  return res
}
