/**
 * @description 复制带随机指针的链表
 *  题目描述：给定一个链表，每个节点包含一个额外增加的随机指针，该指针可以指向链表中的任何节点或空节点。要求返回这个链表的 深拷贝。
 * 我们用一个由 n 个节点组成的链表来表示输入/输出中的链表。每个节点用一个 [val, random_index] 表示：
 * val：一个表示 Node.val 的整数。
 * random_index：随机指针指向的节点索引（范围从 0 到 n-1）；如果不指向任何节点，则为  null 。
 * next_index
 * random_index
 * 
 * 1. 节点深拷贝
 * 2. 使用Map存储节点
 * 3. 一次遍历复制链表，创建拷贝的新节点(只处理值，不处理索引)，并存储旧节点和拷贝的新节点的映射关系，存储的是一个个单个的节点，不存在连接关系
 * 4. 二次遍历复制链表，通过旧节点、next节点、random节点获取对应拷贝的新节点，并处理新节点的next和random映射关系
 */
export class Node {
  val: number | null
  next: Node | null
  random: Node | null
  constructor (val: number | null = null, next: Node | null = null, random: Node | null = null) {
    this.val = val
    this.next = next
    this.random = random
  }
}
export const copyRandomList = (head: Node | null): Node | null => {
  if (!head) return null
  let tmpHead: Node | null = head
  const nodeMap: Map<Node | null, Node | null> = new Map()
  // 遍历旧链表，存储新节点[旧节点，新节点]
  while (tmpHead) {
    nodeMap.set(tmpHead, new Node(tmpHead.val))
    tmpHead = tmpHead.next
  }
  // 遍历旧链表，处理random和next
  tmpHead = head
  while (tmpHead) {
    const tmpNewNode = nodeMap.get(tmpHead)
    if (tmpNewNode) {
      // A ?? B表示：如果A是null或者undefined则返回B,否则返回A
      tmpNewNode.next = tmpHead.next ? nodeMap.get(tmpHead.next) ?? null : null
      tmpNewNode.random = tmpHead.random ? nodeMap.get(tmpHead.random) ?? null : null
    }
    tmpHead = tmpHead.next
  }
  return nodeMap.get(head) ?? null
}