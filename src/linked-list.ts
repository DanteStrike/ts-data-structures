import LinkedListNode from './linked-list-node';
import { Position } from './enum';

class LinkedList<T> {
  private head?: LinkedListNode<T>;
  private tail?: LinkedListNode<T>;
  private size = 0;

  constructor(values?: Array<T>) {
    if (values) {
      this.push(...values);
    }
  }

  private resetListPointers(): void {
    this.head = undefined;
    this.tail = undefined;
  }

  private addFirstNode(value: T): void {
    const firstListNode: LinkedListNode<T> = new LinkedListNode(value);
    this.head = firstListNode;
    this.tail = firstListNode;
    this.size += 1;
  }

  private addBeforeHead(value: T): void {
    const newLinkedListNode: LinkedListNode<T> = new LinkedListNode(value);
    newLinkedListNode.next = this.head;
    this.head = newLinkedListNode;
    this.size += 1;
  }

  private addAfterNode(value: T, listNode: LinkedListNode<T>): void {
    const dNode = listNode;
    const newLinkedListNode: LinkedListNode<T> = new LinkedListNode(value);
    newLinkedListNode.next = dNode.next;
    dNode.next = newLinkedListNode;
    if (dNode === this.tail) {
      this.tail = newLinkedListNode;
    }
    this.size += 1;
  }

  private deleteLastNode(): void {
    this.resetListPointers();
    this.size -= 1;
  }

  private deleteHeadNode(listNode: LinkedListNode<T>): void {
    this.head = listNode.next;
    this.size -= 1;
  }

  private deleteNode(listNode: LinkedListNode<T>): void {
    const referenceNode = this.findNode(listNode, (node, target) => node.next === target);

    if (!referenceNode) {
      throw new Error('listNode not found');
    }

    if (listNode === this.tail) {
      this.tail = referenceNode;
      referenceNode.next = undefined;
    } else {
      referenceNode.next = listNode.next;
    }

    this.size -= 1;
  }

  // private swapNeighbors(aListNode: LinkedListNode<T>, bListNode: LinkedListNode<T>): void {
  //
  // };
  //
  // private swapNodes(aListNode: LinkedListNode<T>, bListNode: LinkedListNode<T>): void {
  //
  // };

  getHead(): LinkedListNode<T> | undefined {
    return this.head;
  }

  getTail(): LinkedListNode<T> | undefined {
    return this.tail;
  }

  getSize(): number {
    return this.size;
  }

  push(...values: Array<T>): void {
    values.forEach((value) => {
      this.add(value);
    });
  }

  pop(): void {
    this.delete();
  }

  pushFront(...values: Array<T>): void {
    values.forEach((value) => {
      this.add(value, Position.BEFORE, this.head);
    });
  }

  popFront(): void {
    this.delete(this.head);
  }

  findNode(
    target: LinkedListNode<T> | T,
    compareCB = (node: LinkedListNode<T>, targetValue: LinkedListNode<T> | T): boolean => node.value === targetValue
  ): LinkedListNode<T> | undefined {
    let foundedNode = this.head;
    while (foundedNode) {
      if (compareCB(foundedNode, target)) {
        break;
      }

      foundedNode = foundedNode.next;
    }

    return foundedNode;
  }

  add(value: T, pos: Position = Position.AFTER, listNode = this.tail): void {
    if (!listNode) {
      this.addFirstNode(value);

      return;
    }

    if (listNode === this.head && pos === Position.BEFORE) {
      this.addBeforeHead(value);

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
      throw new Error('listNode not found');
    }

    this.addAfterNode(value, referenceNode);
  }

  delete(listNode = this.tail): void {
    if (!listNode) {
      return;
    }

    if (listNode === this.head && listNode === this.tail) {
      this.deleteLastNode();

      return;
    }

    if (listNode === this.head) {
      this.deleteHeadNode(listNode);

      return;
    }

    this.deleteNode(listNode);
  }

  // swap(aListNode: LinkedListNode<T>, bListNode: LinkedListNode<T>) {
  //
  // }

  toArray(): Array<T> {
    const list = [];
    let currentListNode = this.head;

    while (currentListNode) {
      list.push(currentListNode.value);
      currentListNode = currentListNode.next;
    }

    return list;
  }

  toString(): string {
    let resultStr = '';
    let currentListNode = this.head;

    while (currentListNode) {
      if (resultStr === '') {
        resultStr += currentListNode.toString();
      } else {
        resultStr += `,${currentListNode.toString()}`;
      }

      currentListNode = currentListNode.next;
    }

    return resultStr;
  }
}

export default LinkedList;
