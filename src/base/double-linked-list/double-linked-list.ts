import LinkedList from '../linked-list/linked-list';
import DoubleLinkedListNode from './double-linked-list-node';
import { Position } from '../../enum';

class DoubleLinkedList<T> extends LinkedList<T> {
  protected head?: DoubleLinkedListNode<T>;
  protected tail?: DoubleLinkedListNode<T>;

  // eslint-disable-next-line class-methods-use-this
  protected createNode(
    value: T,
    nextNode?: DoubleLinkedListNode<T>,
    prevNode?: DoubleLinkedListNode<T>
  ): DoubleLinkedListNode<T> {
    return new DoubleLinkedListNode(value, nextNode, prevNode);
  }

  protected addAfterNode(value: T, listNode: DoubleLinkedListNode<T>): void {
    super.addAfterNode(value, listNode);
    const newLinkedListNode = listNode.next;

    if (newLinkedListNode) {
      newLinkedListNode.prev = listNode;
    }
  }

  protected deleteHeadNode(listNode: DoubleLinkedListNode<T>): void {
    super.deleteHeadNode(listNode);
  }

  protected deleteNode(listNode: DoubleLinkedListNode<T>): void {
    super.deleteNode(listNode);
  }

  getHead(): DoubleLinkedListNode<T> | undefined {
    return super.getHead();
  }

  getTail(): DoubleLinkedListNode<T> | undefined {
    return super.getTail();
  }

  forEach(cb: (node: DoubleLinkedListNode<T>, index?: number, list?: this) => void): this {
    // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
    return super.forEach(cb);
  }

  findNode(
    cb: (node: DoubleLinkedListNode<T>, index?: number, list?: this) => boolean
  ): DoubleLinkedListNode<T> | null {
    return super.findNode(cb);
  }

  findNodes(cb: (node: DoubleLinkedListNode<T>, index?: number, list?: this) => boolean): DoubleLinkedListNode<T>[] {
    return super.findNodes(cb);
  }

  add(
    value: T,
    pos: Position = Position.AFTER,
    listNode: DoubleLinkedListNode<T> | null | undefined = this.tail
  ): this {
    return super.add(value, pos, listNode);
  }

  delete(listNode: DoubleLinkedListNode<T> | null | undefined = this.tail): this {
    return super.delete(listNode);
  }
}

export default DoubleLinkedList;
