## 二叉树
:::tip
1. 迭代：重复执行一组命令，直到满足某个条件，通常用`while for`实现迭代。每次重复执行都会更新某些变量状态直到满足终止条件
2. 递归：调用自身函数来解决问题，包括基本情况(终止条件)和递归情况(函数调用自身的地方)
:::
### 先序遍历
> 遍历规则：根节点 > 左孩子 > 右孩子

1. 根节点入栈
2. 取出栈顶节点，节点值添加进数组
3. 若栈顶节点有右孩子，右孩子入栈
4. 若栈顶节点有左孩子，左孩子入栈
重复234步骤，直到栈为空

### 后序遍历
> 遍历规则：左孩子 > 右孩子 > 根节点

结合先序遍历修改, 使用`unshift`添加结果，那么出栈顺序为`右左`，则入栈顺序为`左右`，都是先处理根节点，再处理孩子节点

### 后序遍历
> 遍历规则：左节点 > 中节点 > 右节点

**迭代法实现二叉树遍历**
::: details 展开查看二叉树的迭代遍历
<<< @/algorithm/BinaryTree/TraverseBinaryTree.ts
:::

### 层序遍历衍生
题目描述：给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。

示例： 二叉树：[3,9,20,null,null,15,7],
```
  3
 / \
9  20
  /  \
 15   7
```
返回其层次遍历结果：
[
[3],
[9,20],
[15,7]
]
:::details 展开查看代码
<<< @/algorithm/BinaryTree/LevelOrder.ts
:::

### 翻转二叉树
每一棵子树的左孩子和右孩子都发生了交换，即表示存在重复，就涉及了递归

思路：以递归的方式，遍历树的每一个节点，将每一个节点左右孩子进行交换
示例：
输入：
```
     4
   /   \
  2     7
 / \   / \
1   3 6   9
```
输出：
```
     4
   /   \
  7     2
 / \   / \
9   6 3   1
```
::: details 展开查看代码
<<< @/algorithm/BinaryTree/InverseBinaryTree.ts
:::

## BST二叉搜索树
二叉搜索树(`BST-Binary Search Tree `)
1. 可以是一颗空树
2. 也可以由右根节点、左子树、右子树组成， 且左子树和右子树都是二叉搜索树。每一颗子树都满足：`左孩子 <= 根节点 <= 右孩子`

二叉搜索树的中序遍历是有序的

二叉搜索树的高频操作：
1. 查找数据为某一个值的节点
2. 插入新节点
3. 删除指定节点
   1. 需要删除的目标节点是一个叶子节点，删除没有影响，直接删除即可
   2. 需要删除的目标节点存在左子树，在左子树里找最大值的节点，用最大值节点的值覆盖目标节点，并递归删除最大值的节点
   3. 需要删除的目标节点存在右子树，在右子树里找最小值的节点，用最小值节点的值覆盖目标节点，并递归删除最小值的节点
   4. 需要删除的目标节点如果同时存在左右子树，就在上述中二选一

::: details 展开删除置顶节点的步骤
```
        5
       / \
      3   7
     / \   \
    2   4   8
```
要删除的节点是5
1. 找到左子树中最大值：4
2. 覆盖目标节点的值：5的值变为4
3. 递归删除该最大节点：左子树中删除节点4
:::

::: details 展开查看高频操作代码
::: code-group
```ts [查找数据]
const search = (root: Node, n: number): Node => {
  if (!root) return root
  if (root.val) {
    return root
  } else if (root.val > n) {
    return search(roo.left, n)
  } else {
    return search(root.right, n)
  }
}
```

```js [插入新节点]
function insertIntoBST(root, n) {
    // 若 root 为空，说明当前是一个可以插入的空位
    if(!root) { 
        // 用一个值为n的结点占据这个空位
        root = new TreeNode(n)
        return root
    }
    
    if(root.val > n) {
        // 当前结点数据域大于n，向左查找
        root.left = insertIntoBST(root.left, n)
    } else {
        // 当前结点数据域小于n，向右查找
        root.right = insertIntoBST(root.right, n)
    }
    // 返回插入后二叉搜索树的根结点
    return root
}
```

```js [删除指定节点]
function deleteNode(root, n) {
    // 如果没找到目标结点，则直接返回
    if(!root) {
        return root
    }
    // 定位到目标结点，开始分情况处理删除动作
    if(root.val === n) {
        // 若是叶子结点，则不需要想太多，直接删除
        if(!root.left && !root.right) {
            root = null
        } else if(root.left) {
            // 寻找左子树里值最大的结点
            const maxLeft = findMax(root.left)
            // 用这个 maxLeft 覆盖掉需要删除的当前结点  
            root.val = maxLeft.val
            // 覆盖动作会消耗掉原有的 maxLeft 结点
            root.left = deleteNode(root.left, maxLeft.val)
        } else {
            // 寻找右子树里值最小的结点
            const minRight = findMin(root.right)
            // 用这个 minRight 覆盖掉需要删除的当前结点  
            root.val = minRight.val
            // 覆盖动作会消耗掉原有的 minRight 结点
            root.right = deleteNode(root.right, minRight.val)
        }
    } else if(root.val > n) {
        // 若当前结点的值比 n 大，则在左子树中继续寻找目标结点
        root.left = deleteNode(root.left, n)
    } else  {
        // 若当前结点的值比 n 小，则在右子树中继续寻找目标结点
        root.right = deleteNode(root.right, n)
    }
    return root
}

// 寻找左子树最大值
function findMax(root) {
    while(root.right) {
        root = root.right
    }
    return root 
}

// 寻找右子树的最小值
function findMin(root) {
    while(root.left) {
        root = root.left
    }
    return root
}
```
:::

### 二叉搜索树的验证
题目描述：给定一个二叉树，判断其是否是一个有效的二叉搜索树

假设一个二叉搜索树具有如下特征：

节点的左子树只包含小于当前节点的数。

节点的右子树只包含大于当前节点的数。

所有左子树和右子树自身必须也是二叉搜索树。
```
    5
   / \
  1   4
     / \
    3   6
```
输入: [5,1,4,null,null,3,6]; 输出: false

根节点的值为 5 ，但是其右子节点值为 4 
:::details  展开查看解析代码
<<< @/algorithm/BinaryTree/isValidBST.ts
:::

### 排序数组转为二叉搜索树
题目描述：将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。

本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

示例1: 给定有序数组: [-10,-3,0,5,9],

一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：
```
      0
     / \
   -3   9
   /   /
 -10  5
```
示例2: [-10,-3,0,5,9]
输出：
```
      0
     / \
   -3   9
   /   /
 -10  5
```
#### 思路分析
1. 给定的数组就是`目标二叉树的中序遍历序列（有顺序）`: 左中右
2. 平衡二叉树：每个节点的左右两个子树的高度差绝对值不超过1

以中间元素为根节点，将数组提成树
::: details 展开查看代码
<<< @/algorithm/BinaryTree/SortedArrayToBST.ts
:::

## 平衡二叉树
平衡二叉树(AVL Tree)是二叉搜索树的特例，任意节点的左右子树的高度差绝对值都不大于1的二叉搜索树

### 平衡二叉树的判定
题目描述：给定一个二叉树，判断它是否是高度平衡的二叉树

本题中，一棵高度平衡二叉树定义为： 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1

示例 1: 给定二叉树 [3,9,20,null,null,15,7]
```
    3
   / \
  9  20
    /  \
   15   7
```
返回 true 

示例 2: 给定二叉树 [1,2,2,3,3,null,null,4,4]
```
       1
      / \
     2   2
    / \
   3   3
  / \
 4   4
```
返回 false 

### 思路分析
1. 任意节点 -> 重复 -> `递归`
2. 左右子树的高度差绝对值不大于1
3. 二叉搜索树
::: details 展开查看代码
<<< @/algorithm/BinaryTree/IsBalancedBinaryTree.ts
:::

### 平衡二叉树的构造
题目描述：给你一棵二叉搜索树，请你返回一棵平衡后的二叉搜索树，新生成的树应该与原来的树有着相同的节点值

如果一棵二叉搜索树中，每个节点的两棵子树高度差不超过 1 ，我们就称这棵二叉搜索树是平衡的

如果有多种构造方法，请你返回任意一种

输入：root = [1,null,2,null,3,null,4,null,null]

输出：[2,1,3,null,null,null,4]

解释：这不是唯一的正确答案，[3,1,4,null,2,null,null] 也是一个可行的构造方案

提示：树节点的数目在 1 到 10^4 之间。 树节点的值互不相同，且在 1 到 10^5 之间

#### 思路分析
> 二叉搜索树的中序遍历是有序的

1. 中序遍历得到有序数组
2. 逐个将二分出的数组子序列提出来变成二叉搜索树
::: details 展开查看代码
<<< @/algorithm/BinaryTree/BalanceBST.ts
:::
