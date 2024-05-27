/**
 * @description 有序数组转为二叉搜索树
 * 1. 左子树 <= 根 <= 右
 * 2. 平衡二叉树: 任何一个节点的左右子树的高度差不超过1
 * 
 * 将中间数据取出为根节点
 * 
 * 题目描述：将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
 * 本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。
 * 
 * 示例: 给定有序数组: [-10,-3,0,5,9],
 * 一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：
 *       0
 *      / \
 *    -3   9
 *    /   /
 *  -10  5
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
export const SortedAarryToBST = (nums: number[]): NodeList | null=> {
  if (!nums.length) return null
  const buildBST = (low: number, high: number) => {
    if (low > high) return null
    const mid = Math.floor(low + (high - low) / 2)
    const cur = new NodeList(nums[mid])
    cur.left = buildBST(low, mid - 1)
    cur.right = buildBST(mid + 1, high)
    return cur
  }
  return buildBST(0, nums.length - 1)
}