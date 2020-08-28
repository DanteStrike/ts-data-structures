import LinkedListNode from './linked-list-node';
import { Position } from '../../enum';

class LinkedList<T> {
  protected head?: LinkedListNode<T>;
  protected tail?: LinkedListNode<T>;
  protected size = 0;

  constructor(values?: T[]) {
    if (values) {
      this.push(...values);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  protected createNode(value: T, nextNode?: LinkedListNode<T>): LinkedListNode<T> {
    return new LinkedListNode(value, nextNode);
  }

  private addFirstNode(value: T): void {
    const firstListNode = this.createNode(value);
    this.head = firstListNode;
    this.tail = firstListNode;
    this.size += 1;
  }

  private addBeforeHead(value: T): void {
    this.head = this.createNode(value, this.head);
    this.size += 1;
  }

  protected addAfterNode(value: T, listNode: LinkedListNode<T>): void {
    const dNode = listNode;
    const newLinkedListNode = this.createNode(value, dNode.next);
    dNode.next = newLinkedListNode;
    if (dNode === this.tail) {
      this.tail = newLinkedListNode;
    }
    this.size += 1;
  }

  protected deleteHeadNode(listNode: LinkedListNode<T>): void {
    if (listNode === this.tail) {
      this.clear();

      return;
    }

    this.head = listNode.next;
    this.size -= 1;
  }

  protected deleteNode(listNode: LinkedListNode<T>): void {
    const referenceNode = this.findNode((node) => node.next === listNode);

    if (!referenceNode) {
      return;
    }

    referenceNode.next = listNode.next;
    if (listNode === this.tail) {
      this.tail = referenceNode;
    }
    this.size -= 1;
  }

  getHead(): LinkedListNode<T> | undefined {
    return this.head;
  }

  getTail(): LinkedListNode<T> | undefined {
    return this.tail;
  }

  getSize(): number {
    return this.size;
  }

  push(...values: T[]): this {
    values.forEach((value) => {
      this.add(value);
    });

    return this;
  }

  pop(): this {
    this.delete();

    return this;
  }

  pushFront(...values: T[]): this {
    values.forEach((value) => {
      this.add(value, Position.BEFORE, this.head);
    });

    return this;
  }

  popFront(): this {
    this.delete(this.head);

    return this;
  }

  forEach(cb: (node: LinkedListNode<T>, index?: number, list?: this) => void): this {
    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      cb(currentNode, index, this);
      currentNode = currentNode.next;
      index += 1;
    }

    return this;
  }

  findNode(cb: (node: LinkedListNode<T>, index?: number, list?: this) => boolean): LinkedListNode<T> | null {
    let currentNode = this.head;
    let resultNode;
    let index = 0;

    while (currentNode) {
      if (cb(currentNode, index, this)) {
        resultNode = currentNode;
        break;
      }
      currentNode = currentNode.next;
      index += 1;
    }

    if (!resultNode) {
      // eslint-disable-next-line unicorn/no-null
      return null;
    }

    return resultNode;
  }

  findNodes(cb: (node: LinkedListNode<T>, index?: number, list?: this) => boolean): LinkedListNode<T>[] {
    const foundedList: LinkedListNode<T>[] = [];
    this.forEach((node, index, list) => {
      if (cb(node, index, list)) {
        foundedList.push(node);
      }
    });

    return foundedList;
  }

  add(value: T, pos: Position = Position.AFTER, listNode: LinkedListNode<T> | null | undefined = this.tail): this {
    if (!listNode || !this.tail) {
      this.addFirstNode(value);

      return this;
    }

    if (listNode === this.head && pos === Position.BEFORE) {
      this.addBeforeHead(value);

      return this;
    }

    let referenceNode;

    if (pos === Position.BEFORE) {
      referenceNode = this.findNode((node) => node.next === listNode);
    }

    if (pos === Position.AFTER) {
      if (listNode === this.tail) {
        referenceNode = this.tail;
      } else {
        referenceNode = this.findNode((node) => node === listNode);
      }
    }

    if (referenceNode) {
      this.addAfterNode(value, referenceNode);
    }

    return this;
  }

  delete(listNode: LinkedListNode<T> | null | undefined = this.tail): this {
    if (!listNode) {
      return this;
    }

    if (listNode === this.head) {
      this.deleteHeadNode(listNode);

      return this;
    }

    this.deleteNode(listNode);

    return this;
  }

  clear(): this {
    this.head = undefined;
    this.tail = undefined;
    this.size = 0;

    return this;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  toArray(): T[] {
    const list: T[] = [];

    this.forEach((node) => {
      list.push(node.value);
    });

    return list;
  }

  toString(): string {
    let resultStr = '';

    this.forEach((node) => {
      if (resultStr === '') {
        resultStr += node.toString();
      } else {
        resultStr += `,${node.toString()}`;
      }
    });

    return resultStr;
  }
}

export default LinkedList;
