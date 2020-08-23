import LinkedListNode from '../linked-list/linked-list-node';

class DoubleLinkedListNode<T> extends LinkedListNode<T> {
  next?: DoubleLinkedListNode<T>;
  prev?: DoubleLinkedListNode<T>;

  constructor(value: T, next?: DoubleLinkedListNode<T>, prev?: DoubleLinkedListNode<T>) {
    super(value, next);
    this.prev = prev;
  }
}

export default DoubleLinkedListNode;
