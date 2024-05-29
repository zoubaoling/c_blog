/**
 * @description 根据一棵树的后序遍历数组和中序遍历数组构造一棵二叉树/根据一棵树的前序遍历数组和中序遍历数组构造一棵二叉树
 * 前序：中 左 右
 * 中序：左 中 右
 * 后序：左 右 中
 */
export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor (val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
    this.val = val
    this.left =left
    this.right = right
  }
}
// 根据一棵树的后序遍历数组和中序遍历数组构造一棵二叉树
export const buildTreeByInPostOrder = (inOrder: number[], postOrder: number[]): TreeNode | null => {
  const postLen: number = postOrder.length
  if (postLen === 0 || inOrder.length === 0) return null
  const root: TreeNode = new TreeNode(postOrder[postLen - 1])
  // 递归边界：后序遍历只有一个数字，即为根节点-叶子节点
  if (postLen === 1) return root
  // 查找切割点：中序数组中根节点的索引位置
  const rootInorderIndex: number = inOrder.indexOf(root.val)
  // 根据根节点切割中序数组获取：左中序 和 右中序
  const [leftInorder, rightInorder] = [inOrder.slice(0, rootInorderIndex), inOrder.slice(rootInorderIndex + 1)]

  // 切割后序数组 (...left, ...right) -> left right
  const [leftPostorder, rightPostorder] = [postOrder.slice(0, leftInorder.length), postOrder.slice(leftInorder.length, postOrder.length - 1)]
  root.left = buildTreeByInPostOrder(leftInorder, leftPostorder)
  root.right = buildTreeByInPostOrder(rightInorder, rightPostorder)
  return root
}

// 根据一棵树的前序遍历数组和中序遍历数组构造一棵二叉树
export const buildTreeByPreInOrder = (preorder: number[], inorder: number[]): TreeNode | null => {
  const preLen: number = preorder.length
  // 空节点
  if (preLen === 0 || inorder.length === 0) return null
  const root: TreeNode | null = new TreeNode(preorder[0])
  // 叶子节点
  if (preLen === 1) return root
  // 查找中序数组的切割索引
  const inorderIndex = inorder.indexOf(root.val)
  // 切割中序数组
  const [leftInorder, rightInorder] = [inorder.slice(0, inorderIndex), inorder.slice(inorderIndex + 1)]
  // 切割前序数组
  const [leftPreorder, rightPreorder] = [preorder.slice(1, leftInorder.length + 1), preorder.slice(leftInorder.length + 1)]
  root.left = buildTreeByPreInOrder(leftPreorder, leftInorder)
  root.right = buildTreeByPreInOrder(rightPreorder, rightInorder)
  return root
}