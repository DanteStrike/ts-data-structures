import LinkedListNode from './linked-list-node';
import { Position } from './enum';

// interface ILinkedList {
//   pushFront: (value: any) => void;
//   popFront: () => void;
//   getFirst: () => LinkedListNode | null;
//
//   push: (value: any) => void;
//   pop: () => void;
//   getLast: () => LinkedListNode | null;
//
//   add: (listNode: LinkedListNode, value: any, pos: Position) => void;
//
//   // addBefore: (listNode: LinkedListNode, value: any) => void,
//   // addAfter: (listNode: LinkedListNode, value: any) => void,
//
//   // find: (value: any) => LinkedListNode,
//   // findIndex: (value: any) => number,
//
//   // isEmpty: () => boolean,
//   getSize: () => number;
//
//   // delete: (listNode: LinkedListNode) => void
// }

class LinkedList<T> {
  private head?: LinkedListNode<T>;
  private tail?: LinkedListNode<T>;
  private size = 0;

  constructor(values?: Array<T>) {
    if (values) {
      this.push(...values);
    }
  }

  getFirst(): LinkedListNode<T> | undefined {
    return this.head;
  }

  getLast(): LinkedListNode<T> | undefined {
    return this.tail;
  }

  getSize(): number {
    return this.size;
  }

  push(...values: Array<T>): void {
    values.forEach((value) => {
      if (!this.tail) {
        this.addFirstNode(value);

        return;
      }

      const newLinkedListNode: LinkedListNode<T> = new LinkedListNode(value);
      this.tail.next = newLinkedListNode;
      this.tail = newLinkedListNode;
    });

    this.size += values.length;
  }

  pop(): void {
    if (!this.tail) {
      return;
    }

    if (this.head === this.tail) {
      this.resetListPointers();

      return;
    }

    this.tail = this.findNode(this.tail, (node, target) => node.next === target);

    this.size -= 1;
  }

  pushFront(...values: Array<T>): void {
    values.forEach((value) => {
      if (!this.head) {
        this.addFirstNode(value);

        return;
      }

      const newLinkedListNode: LinkedListNode<T> = new LinkedListNode(value);
      newLinkedListNode.next = this.head;
      this.head = newLinkedListNode;
    });

    this.size += values.length;
  }

  popFront(): void {
    if (!this.head) {
      return;
    }

    if (this.head === this.tail) {
      this.resetListPointers();

      return;
    }

    this.head = this.head.next;
    this.size -= 1;
  }

  findNode(
    target: LinkedListNode<T> | T,
    compareCB?: (node: LinkedListNode<T>, target: LinkedListNode<T> | T) => boolean
  ): LinkedListNode<T> | undefined {
    let comparer;

    if (!compareCB) {
      comparer = (node: LinkedListNode<T>, targetValue: LinkedListNode<T> | T): boolean => node.value === targetValue;
    } else {
      comparer = compareCB;
    }

    let foundedNode = this.head;
    while (foundedNode) {
      if (comparer(foundedNode, target)) {
        break;
      }

      foundedNode = foundedNode.next;
    }

    return foundedNode;
  }

  add(value: T, pos: Position = Position.AFTER, listNode: LinkedListNode<T> | undefined = this.tail): void {
    if (listNode === undefined) {
      this.addFirstNode(value);
      this.size += 1;

      return;
    }

    if (listNode === this.head && pos === Position.BEFORE) {
      const newLinkedListNode: LinkedListNode<T> = new LinkedListNode(value);
      newLinkedListNode.next = this.head;
      this.head = newLinkedListNode;
      this.size += 1;

      return;
    }

    let referenceNode;
    switch (pos) {
      case Position.BEFORE:
        referenceNode = this.findNode(listNode, (node, target) => node.next === target);
        break;

      case Position.AFTER:
        if (listNode === this.tail) {
          referenceNode = this.tail;
        } else {
          referenceNode = this.findNode(listNode, (node, target) => node === target);
        }
        break;

      default:
        break;
    }

    if (!referenceNode) {
      throw new Error('not found');
    }

    const newLinkedListNode: LinkedListNode<T> = new LinkedListNode(value);
    newLinkedListNode.next = referenceNode.next;
    referenceNode.next = newLinkedListNode;
    this.size += 1;

    if (referenceNode === this.tail) {
      this.tail = newLinkedListNode;
    }
  }

  toArray(): Array<T> {
    const list = [];
    let currentListNode: LinkedListNode<T> | undefined = this.head;

    while (currentListNode) {
      list.push(currentListNode.value);
      currentListNode = currentListNode.next;
    }

    return list;
  }

  toString(): string {
    const list = this.toArray();

    return list.join(`,`);
  }

  private resetListPointers(): void {
    this.head = undefined;
    this.tail = undefined;
  }

  private addFirstNode(value: T): void {
    const firstListNode: LinkedListNode<T> = new LinkedListNode(value);
    this.head = firstListNode;
    this.tail = firstListNode;
  }
}

export default LinkedList;
