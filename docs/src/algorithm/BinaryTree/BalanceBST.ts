/**
 * @description 将一个给定的二叉搜索树构造为平衡二叉树
 * 二叉搜索树的中序遍历是有序的
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
export const balanceBST = (root: any) => {
  const nums: number[] = []
  const inorder = (root: any) => {
    if (!root) return
    inorder(root.left)
    nums.push(root.val)
    inorder(root.right)
  }
  const buildAVL = (low: number, high: number) => {
    if (low > high) return null
    const mid = Math.floor(low + (high - low) / 2)
    const cur = new NodeList(nums[mid])
    cur.left = buildAVL(low, mid - 1)
    cur.right = buildAVL(mid + 1, high)
    return cur
  }
  inorder(root)
  return buildAVL(0, nums.length - 1)
}