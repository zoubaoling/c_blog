import { describe, it, expect } from "vitest";
import { copyRandomList, Node } from "../ts/CopyRandomList";

describe('测试复制带随机指针的链表', () => {
  it('测试用例1', () => {
    // Create a list: 7 -> 13 -> 11 -> 10 -> 1 with random pointers
    const node1 = new Node(7);
    const node2 = new Node(13);
    const node3 = new Node(11);
    const node4 = new Node(10);
    const node5 = new Node(1);

    node1.next = node2;
    node2.next = node3;
    node3.next = node4;
    node4.next = node5;

    node1.random = null;
    node2.random = node1;
    node3.random = node5;
    node4.random = node3;
    node5.random = node1;

    const copiedList = copyRandomList(node1);

    // Verify the copied list
    expect(copiedList).toBeDefined();
    expect(copiedList?.val).toBe(7);
    expect(copiedList?.next?.val).toBe(13);
    expect(copiedList?.next?.next?.val).toBe(11);
    expect(copiedList?.next?.next?.next?.val).toBe(10);
    expect(copiedList?.next?.next?.next?.next?.val).toBe(1);

    expect(copiedList?.random).toBeNull();
    expect(copiedList?.next?.random?.val).toBe(7);
    expect(copiedList?.next?.next?.random?.val).toBe(1);
    expect(copiedList?.next?.next?.next?.random?.val).toBe(11);
    expect(copiedList?.next?.next?.next?.next?.random?.val).toBe(7);
  })
  it('should handle an empty list', () => {
    const copiedList = copyRandomList(null);
    expect(copiedList).toBeNull();
  });
})